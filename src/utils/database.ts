import { PostgrestError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';
import type { Database } from './database.types';
import type { FormData, ApiResponse } from '../types';

// Type aliases for better readability
type InterestSubmission = Database['public']['Tables']['interest_submissions']['Row'];
type InterestSubmissionInsert = Database['public']['Tables']['interest_submissions']['Insert'];

/**
 * Database operation result interface
 */
interface DatabaseResult<T> {
  data: T | null;
  error: PostgrestError | Error | null;
  success: boolean;
}

/**
 * Retry configuration for database operations
 */
interface RetryConfig {
  maxAttempts: number;
  delayMs: number;
  backoffMultiplier: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  delayMs: 1000,
  backoffMultiplier: 2,
};

/**
 * Delays execution for specified milliseconds
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retries a function with exponential backoff
 * @param fn - Function to retry
 * @param config - Retry configuration
 * @returns Promise with function result
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === config.maxAttempts) {
        throw lastError;
      }
      
      const delayTime = config.delayMs * Math.pow(config.backoffMultiplier, attempt - 1);
      await delay(delayTime);
    }
  }
  
  throw lastError!;
}

/**
 * Handles database errors and returns standardized error format
 * @param error - Database error
 * @returns Standardized error object
 */
const handleDatabaseError = (error: PostgrestError | Error): Error => {
  if (error instanceof Error) {
    return error;
  }
  
  // Handle PostgrestError
  const postgrestError = error as PostgrestError;
  
  switch (postgrestError.code) {
    case '23505': // Unique violation
      return new Error('This email is already registered');
    case '23502': // Not null violation
      return new Error('Required fields are missing');
    case '23503': // Foreign key violation
      return new Error('Referenced record does not exist');
    case '42P01': // Undefined table
      return new Error('Database table not found');
    case '42501': // Insufficient privilege
      return new Error('Insufficient database privileges');
    default:
      return new Error(postgrestError.message || 'Database operation failed');
  }
};

/**
 * Submits interest form data to the database
 * @param formData - Form data to submit
 * @param source - Source of the submission (default: 'landing_page')
 * @returns Promise with submission result
 */
export const submitInterestForm = async (
  formData: FormData,
  source: string = 'landing_page'
): Promise<DatabaseResult<InterestSubmission>> => {
  console.log('submitInterestForm called with:', { formData, source });
  console.log('Supabase configured:', isSupabaseConfigured());
  
  // In development mode without proper Supabase config, simulate successful submission
  if (!isSupabaseConfigured()) {
    console.log('Development mode: Simulating form submission', { formData, source });
    
    // Simulate a delay to make it feel realistic
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockSubmission: InterestSubmission = {
      id: `mock-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      subscribed_newsletter: formData.subscribed_newsletter || false,
      message: formData.message,
      company: formData.company,
      phone: formData.phone,
      source,
      submitted_at: new Date().toISOString(),
    };

    return {
      data: mockSubmission,
      error: null,
      success: true,
    };
  }

  try {
    console.log('Attempting real Supabase submission...');
    const submissionData: InterestSubmissionInsert = {
      name: formData.name,
      email: formData.email,
      subscribed_newsletter: formData.subscribed_newsletter,
      message: formData.message,
      company: formData.company,
      phone: formData.phone,
      source,
      submitted_at: new Date().toISOString(),
    };

    console.log('Submission data:', submissionData);

    const result = await withRetry(async () => {
      console.log('Making Supabase insert request...');
      const { data, error } = await supabase
        .from('interest_submissions')
        .insert(submissionData)
        .select()
        .single();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return data;
    });

    return {
      data: result,
      error: null,
      success: true,
    };
  } catch (error) {
    const handledError = handleDatabaseError(error as PostgrestError | Error);
    
    return {
      data: null,
      error: handledError,
      success: false,
    };
  }
};

/**
 * Gets the total count of interest submissions
 * @param filters - Optional filters for the count
 * @returns Promise with count result
 */
export const getSubmissionCount = async (
  filters?: {
    source?: string;
    subscribed_newsletter?: boolean;
    dateFrom?: string;
    dateTo?: string;
  }
): Promise<DatabaseResult<number>> => {
  // In development mode without proper Supabase config, simulate count
  if (!isSupabaseConfigured()) {
    console.log('Development mode: Simulating submission count', filters);
    
    // Simulate a delay to make it feel realistic
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return a mock count
    const mockCount = 42;

    return {
      data: mockCount,
      error: null,
      success: true,
    };
  }

  try {
    let query = supabase
      .from('interest_submissions')
      .select('id', { count: 'exact', head: true });

    // Apply filters
    if (filters?.source) {
      query = query.eq('source', filters.source);
    }
    if (filters?.subscribed_newsletter !== undefined) {
      query = query.eq('subscribed_newsletter', filters.subscribed_newsletter);
    }
    if (filters?.dateFrom) {
      query = query.gte('submitted_at', filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte('submitted_at', filters.dateTo);
    }

    const result = await withRetry(async () => {
      const { count, error } = await query;

      if (error) {
        throw error;
      }

      return count || 0;
    });

    return {
      data: result,
      error: null,
      success: true,
    };
  } catch (error) {
    const handledError = handleDatabaseError(error as PostgrestError | Error);
    
    return {
      data: null,
      error: handledError,
      success: false,
    };
  }
};

/**
 * Checks if an email already exists in the database
 * @param email - Email to check
 * @returns Promise with existence check result
 */
export const checkEmailExists = async (
  email: string
): Promise<DatabaseResult<boolean>> => {
  // In development mode without proper Supabase config, simulate email check
  if (!isSupabaseConfigured()) {
    console.log('Development mode: Simulating email check for', email);
    
    // Simulate a delay to make it feel realistic
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, simulate that some emails already exist
    const mockExistingEmails = ['test@example.com', 'demo@example.com', 'admin@example.com'];
    const exists = mockExistingEmails.includes(email.toLowerCase());

    return {
      data: exists,
      error: null,
      success: true,
    };
  }

  try {
    const result = await withRetry(async () => {
      const { data, error } = await supabase
        .from('interest_submissions')
        .select('email')
        .eq('email', email.toLowerCase())
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      return !!data;
    });

    return {
      data: result,
      error: null,
      success: true,
    };
  } catch (error) {
    const handledError = handleDatabaseError(error as PostgrestError | Error);
    
    return {
      data: null,
      error: handledError,
      success: false,
    };
  }
};

/**
 * Gets recent interest submissions with pagination
 * @param limit - Number of records to return (default: 10)
 * @param offset - Number of records to skip (default: 0)
 * @param orderBy - Field to order by (default: 'submitted_at')
 * @param orderDirection - Order direction (default: 'desc')
 * @returns Promise with submissions result
 */
export const getRecentSubmissions = async (
  limit: number = 10,
  offset: number = 0,
  orderBy: keyof InterestSubmission = 'submitted_at',
  orderDirection: 'asc' | 'desc' = 'desc'
): Promise<DatabaseResult<InterestSubmission[]>> => {
  // In development mode without proper Supabase config, simulate recent submissions
  if (!isSupabaseConfigured()) {
    console.log('Development mode: Simulating recent submissions', { limit, offset });
    
    // Simulate a delay to make it feel realistic
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockSubmissions: InterestSubmission[] = [
      {
        id: 'mock-1',
        name: 'John Doe',
        email: 'john@example.com',
        subscribed_newsletter: true,
        message: 'Looking forward to the course!',
        company: 'Tech Corp',
        phone: '+1234567890',
        source: 'landing_page',
        submitted_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      },
      {
        id: 'mock-2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        subscribed_newsletter: false,
        message: '',
        company: 'Startup Inc',
        phone: '',
        source: 'hero_section',
        submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
    ];

    return {
      data: mockSubmissions.slice(offset, offset + limit),
      error: null,
      success: true,
    };
  }

  try {
    const result = await withRetry(async () => {
      const { data, error } = await supabase
        .from('interest_submissions')
        .select('*')
        .order(orderBy, { ascending: orderDirection === 'asc' })
        .range(offset, offset + limit - 1);

      if (error) {
        throw error;
      }

      return data || [];
    });

    return {
      data: result,
      error: null,
      success: true,
    };
  } catch (error) {
    const handledError = handleDatabaseError(error as PostgrestError | Error);
    
    return {
      data: null,
      error: handledError,
      success: false,
    };
  }
};

/**
 * Gets submission statistics
 * @returns Promise with statistics result
 */
export const getSubmissionStats = async (): Promise<DatabaseResult<{
  total: number;
  newsletterSubscribers: number;
  thisMonth: number;
  sources: Record<string, number>;
}>> => {
  // In development mode without proper Supabase config, simulate stats
  if (!isSupabaseConfigured()) {
    console.log('Development mode: Simulating submission stats');
    
    // Simulate a delay to make it feel realistic
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mockStats = {
      total: 42,
      newsletterSubscribers: 28,
      thisMonth: 12,
      sources: {
        'landing_page': 25,
        'hero_section': 10,
        'api': 7,
      },
    };

    return {
      data: mockStats,
      error: null,
      success: true,
    };
  }

  try {
    const result = await withRetry(async () => {
      // Get total count
      const { count: total } = await supabase
        .from('interest_submissions')
        .select('id', { count: 'exact', head: true });

      // Get newsletter subscribers count
      const { count: newsletterSubscribers } = await supabase
        .from('interest_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('subscribed_newsletter', true);

      // Get this month's count
      const thisMonthStart = new Date();
      thisMonthStart.setDate(1);
      thisMonthStart.setHours(0, 0, 0, 0);
      
      const { count: thisMonth } = await supabase
        .from('interest_submissions')
        .select('id', { count: 'exact', head: true })
        .gte('submitted_at', thisMonthStart.toISOString());

      // Get sources breakdown
      const { data: sourcesData } = await supabase
        .from('interest_submissions')
        .select('source');

      const sources: Record<string, number> = {};
      sourcesData?.forEach(item => {
        sources[item.source] = (sources[item.source] || 0) + 1;
      });

      return {
        total: total || 0,
        newsletterSubscribers: newsletterSubscribers || 0,
        thisMonth: thisMonth || 0,
        sources,
      };
    });

    return {
      data: result,
      error: null,
      success: true,
    };
  } catch (error) {
    const handledError = handleDatabaseError(error as PostgrestError | Error);
    
    return {
      data: null,
      error: handledError,
      success: false,
    };
  }
};

/**
 * Converts database result to API response format
 * @param result - Database operation result
 * @returns API response format
 */
export const toApiResponse = <T>(
  result: DatabaseResult<T>
): ApiResponse<T> => {
  return {
    success: result.success,
    data: result.data || undefined,
    message: result.error?.message || (result.success ? 'Operation successful' : 'Operation failed'),
    errors: result.error ? [{
      field: 'general' as keyof FormData,
      message: result.error.message,
      code: 'DATABASE_ERROR',
    }] : undefined,
    timestamp: new Date().toISOString(),
    status: result.success ? 200 : 500,
  };
}; 