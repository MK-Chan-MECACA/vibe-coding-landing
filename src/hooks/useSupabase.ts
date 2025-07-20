import { useState, useEffect, useCallback, useRef } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import { submitInterestForm, getSubmissionCount, checkEmailExists, getSubmissionStats } from '../utils/database';
import type { FormData, ApiResponse } from '../types';
import type { Database } from '../utils/database.types';

// Type aliases for better readability
type InterestSubmission = Database['public']['Tables']['interest_submissions']['Row'];

/**
 * Hook state interface for form submission
 */
interface UseFormSubmissionState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: InterestSubmission | null;
}

/**
 * Hook state interface for submission count
 */
interface UseSubmissionCountState {
  count: number | null;
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    newsletterSubscribers: number;
    thisMonth: number;
    sources: Record<string, number>;
  } | null;
}

/**
 * Hook state interface for email check
 */
interface UseEmailCheckState {
  exists: boolean | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for form submission with loading states and error handling
 * @param options - Hook configuration options
 * @returns Form submission state and functions
 */
export const useFormSubmission = (options: {
  onSuccess?: (data: InterestSubmission) => void;
  onError?: (error: string) => void;
  autoReset?: boolean;
  resetDelay?: number;
} = {}) => {
  const [state, setState] = useState<UseFormSubmissionState>({
    loading: false,
    success: false,
    error: null,
    data: null,
  });

  const resetTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  /**
   * Resets the form submission state
   */
  const reset = useCallback(() => {
    setState({
      loading: false,
      success: false,
      error: null,
      data: null,
    });
  }, []);

  /**
   * Submits form data to the database
   * @param formData - Form data to submit
   * @param source - Source of the submission
   * @returns Promise with submission result
   */
  const submit = useCallback(async (
    formData: FormData,
    source: string = 'landing_page'
  ): Promise<ApiResponse<InterestSubmission>> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      success: false,
    }));

    try {
      const result = await submitInterestForm(formData, source);
      
      if (result.success && result.data) {
        setState({
          loading: false,
          success: true,
          error: null,
          data: result.data,
        });

        // Call success callback
        if (options.onSuccess) {
          options.onSuccess(result.data);
        }

        // Auto reset if enabled
        if (options.autoReset !== false) {
          const delay = options.resetDelay || 5000;
          resetTimeoutRef.current = setTimeout(reset, delay);
        }

        return {
          success: true,
          data: result.data,
          message: 'Form submitted successfully',
          timestamp: new Date().toISOString(),
          status: 200,
        };
      } else {
        const errorMessage = result.error?.message || 'Form submission failed';
        
        setState({
          loading: false,
          success: false,
          error: errorMessage,
          data: null,
        });

        // Call error callback
        if (options.onError) {
          options.onError(errorMessage);
        }

        return {
          success: false,
          message: errorMessage,
          timestamp: new Date().toISOString(),
          status: 500,
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      setState({
        loading: false,
        success: false,
        error: errorMessage,
        data: null,
      });

      // Call error callback
      if (options.onError) {
        options.onError(errorMessage);
      }

      return {
        success: false,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        status: 500,
      };
    }
  }, [options, reset]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return {
    ...state,
    submit,
    reset,
  };
};

/**
 * Custom hook for submission count with real-time updates
 * @param options - Hook configuration options
 * @returns Submission count state and functions
 */
export const useSubmissionCount = (options: {
  filters?: {
    source?: string;
    subscribed_newsletter?: boolean;
    dateFrom?: string;
    dateTo?: string;
  };
  enableRealtime?: boolean;
  refreshInterval?: number;
} = {}) => {
  const [state, setState] = useState<UseSubmissionCountState>({
    count: null,
    loading: false,
    error: null,
    stats: null,
  });

  const realtimeChannelRef = useRef<RealtimeChannel | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  /**
   * Fetches submission count and statistics
   */
  const fetchCount = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const [countResult, statsResult] = await Promise.all([
        getSubmissionCount(options.filters),
        getSubmissionStats(),
      ]);

      if (countResult.success && statsResult.success) {
        setState({
          count: countResult.data,
          loading: false,
          error: null,
          stats: statsResult.data,
        });
      } else {
        const errorMessage = countResult.error?.message || statsResult.error?.message || 'Failed to fetch data';
        setState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, [options.filters]);

  /**
   * Sets up real-time subscription for submission count updates
   */
  const setupRealtime = useCallback(() => {
    if (!options.enableRealtime) return;

    // Cleanup existing subscription
    if (realtimeChannelRef.current) {
      supabase.removeChannel(realtimeChannelRef.current);
    }

    // Subscribe to table changes
    realtimeChannelRef.current = supabase
      .channel('submission-count-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'interest_submissions',
        },
        () => {
          // Refresh data when table changes
          fetchCount();
        }
      )
      .subscribe();
  }, [options.enableRealtime, fetchCount]);

  /**
   * Sets up periodic refresh
   */
  const setupRefreshInterval = useCallback(() => {
    if (!options.refreshInterval) return;

    // Cleanup existing interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    // Set up new interval
    refreshIntervalRef.current = setInterval(fetchCount, options.refreshInterval);
  }, [options.refreshInterval, fetchCount]);

  // Initial fetch and setup
  useEffect(() => {
    fetchCount();
    setupRealtime();
    setupRefreshInterval();

    // Cleanup on unmount
    return () => {
      if (realtimeChannelRef.current) {
        supabase.removeChannel(realtimeChannelRef.current);
      }
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [fetchCount, setupRealtime, setupRefreshInterval]);

  // Refetch when filters change
  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  return {
    ...state,
    refetch: fetchCount,
  };
};

/**
 * Custom hook for checking email existence
 * @param options - Hook configuration options
 * @returns Email check state and functions
 */
export const useEmailCheck = (options: {
  debounceMs?: number;
  onExists?: (exists: boolean) => void;
} = {}) => {
  const [state, setState] = useState<UseEmailCheckState>({
    exists: null,
    loading: false,
    error: null,
  });

  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  /**
   * Checks if an email exists in the database
   * @param email - Email to check
   * @param immediate - Whether to check immediately (skip debounce)
   */
  const checkEmail = useCallback(async (email: string, immediate: boolean = false) => {
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    const performCheck = async () => {
      if (!email || email.trim() === '') {
        setState({ exists: null, loading: false, error: null });
        return;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const result = await checkEmailExists(email.trim().toLowerCase());

        if (result.success) {
          setState({
            exists: result.data,
            loading: false,
            error: null,
          });

          // Call callback
          if (options.onExists && result.data !== null) {
            options.onExists(result.data);
          }
        } else {
          setState({
            exists: null,
            loading: false,
            error: result.error?.message || 'Failed to check email',
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        setState({
          exists: null,
          loading: false,
          error: errorMessage,
        });
      }
    };

    if (immediate) {
      await performCheck();
    } else {
      const delay = options.debounceMs || 500;
      debounceTimeoutRef.current = setTimeout(performCheck, delay);
    }
  }, [options]);

  /**
   * Resets the email check state
   */
  const reset = useCallback(() => {
    setState({
      exists: null,
      loading: false,
      error: null,
    });
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    ...state,
    checkEmail,
    reset,
  };
};

/**
 * Custom hook for managing Supabase connection status
 * @returns Connection status and functions
 */
export const useSupabaseConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    // Check initial connection
    const checkConnection = async () => {
      try {
        // In development mode without proper Supabase config, simulate connection
        if (!isSupabaseConfigured()) {
          setIsConnected(true);
          setLastError(null);
          return;
        }

        const { error } = await supabase.from('interest_submissions').select('id').limit(1);
        
        if (error) {
          setIsConnected(false);
          setLastError(error.message);
        } else {
          setIsConnected(true);
          setLastError(null);
        }
      } catch (error) {
        setIsConnected(false);
        setLastError(error instanceof Error ? error.message : 'Connection failed');
      }
    };

    checkConnection();

    // Set up connection monitoring
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    isConnected,
    lastError,
    retry: () => {
      setLastError(null);
      setIsConnected(true);
    },
  };
}; 