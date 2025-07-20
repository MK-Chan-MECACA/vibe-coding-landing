import React, { useState, useEffect } from 'react';
import { useSubmissionCount } from '../hooks/useSupabase';
import { LoadingSpinner } from './ui';

/**
 * Social proof component props interface
 */
interface SocialProofProps {
  /** Custom message format */
  messageFormat?: string;
  /** Fallback message when data is unavailable */
  fallbackMessage?: string;
  /** Whether to enable real-time updates */
  enableRealtime?: boolean;
  /** Refresh interval in milliseconds */
  refreshInterval?: number;
  /** Additional CSS classes */
  className?: string;
  /** Custom loading component */
  loadingComponent?: React.ReactNode;
  /** Custom error component */
  errorComponent?: React.ReactNode;
}

/**
 * Default message format
 */
const DEFAULT_MESSAGE_FORMAT = 'Join {count}+ developers building MVPs faster';

/**
 * Default fallback message
 */
const DEFAULT_FALLBACK_MESSAGE = 'Join developers worldwide';

/**
 * Social proof component that displays submission count with real-time updates
 * 
 * @example
 * ```tsx
 * <SocialProof
 *   messageFormat="Join {count}+ developers building MVPs faster"
 *   enableRealtime={true}
 *   refreshInterval={30000}
 * />
 * ```
 */
export const SocialProof: React.FC<SocialProofProps> = ({
  messageFormat = DEFAULT_MESSAGE_FORMAT,
  fallbackMessage = DEFAULT_FALLBACK_MESSAGE,
  enableRealtime = true,
  refreshInterval = 30000,
  className = '',
  loadingComponent,
  errorComponent,
}) => {
  // Local state for animation
  const [displayCount, setDisplayCount] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch submission count
  const { count, loading, error, refetch } = useSubmissionCount({
    enableRealtime,
    refreshInterval,
  });

  /**
   * Animates the count change
   */
  const animateCount = (newCount: number, oldCount: number | null) => {
    if (oldCount === null || oldCount === newCount) {
      setDisplayCount(newCount);
      return;
    }

    setIsAnimating(true);
    
    // Simple count animation
    const duration = 1000; // 1 second
    const steps = 30;
    const stepDuration = duration / steps;
    const increment = (newCount - oldCount) / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const currentCount = Math.round(oldCount + (increment * currentStep));
      setDisplayCount(currentCount);
      
      if (currentStep >= steps) {
        setDisplayCount(newCount);
        setIsAnimating(false);
        clearInterval(timer);
      }
    }, stepDuration);
  };

  // Animate count changes
  useEffect(() => {
    if (count !== null) {
      animateCount(count, displayCount);
    }
  }, [count]);

  /**
   * Formats the message with the count
   */
  const formatMessage = (count: number | null): string => {
    if (count === null) {
      return fallbackMessage;
    }
    
    return messageFormat.replace('{count}', count.toLocaleString());
  };

  /**
   * Handles refresh on error
   */
  const handleRefresh = () => {
    refetch();
  };

  // Loading state
  if (loading && displayCount === null) {
    return (
      <div className={`flex items-center justify-center space-x-2 text-gray-600 ${className}`}>
        {loadingComponent || (
          <>
            <LoadingSpinner size="sm" color="gray" />
            <span className="text-sm">Loading...</span>
          </>
        )}
      </div>
    );
  }

  // Error state
  if (error && displayCount === null) {
    return (
      <div className={`text-center ${className}`}>
        {errorComponent || (
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-gray-500">{fallbackMessage}</p>
            <button
              onClick={handleRefresh}
              className="text-xs text-blue-600 hover:text-blue-700 underline"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    );
  }

  // Success state
  return (
    <div className={`text-center ${className}`}>
      <p className={`text-sm text-gray-600 transition-opacity duration-300 ${
        isAnimating ? 'opacity-75' : 'opacity-100'
      }`}>
        {formatMessage(displayCount)}
      </p>
      
      {/* Loading indicator for real-time updates */}
      {loading && displayCount !== null && (
        <div className="mt-1 flex justify-center">
          <LoadingSpinner size="xs" color="gray" />
        </div>
      )}
    </div>
  );
};

/**
 * Enhanced social proof component with additional statistics
 */
export const EnhancedSocialProof: React.FC<SocialProofProps & {
  /** Whether to show additional statistics */
  showStats?: boolean;
  /** Custom stats format */
  statsFormat?: string;
}> = ({
  showStats = false,
  statsFormat = '{newsletterSubscribers} newsletter subscribers',
  ...props
}) => {
  const { count, stats, loading, error } = useSubmissionCount({
    enableRealtime: props.enableRealtime,
    refreshInterval: props.refreshInterval,
  });

  return (
    <div className="space-y-2">
      {/* Main count */}
      <SocialProof {...props} />
      
      {/* Additional statistics */}
      {showStats && stats && (
        <div className="text-center">
          <p className="text-xs text-gray-500">
            {statsFormat
              .replace('{newsletterSubscribers}', stats.newsletterSubscribers.toLocaleString())
              .replace('{total}', stats.total.toLocaleString())
              .replace('{thisMonth}', stats.thisMonth.toLocaleString())}
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Compact social proof component for small spaces
 */
export const CompactSocialProof: React.FC<SocialProofProps> = (props) => {
  return (
    <SocialProof
      {...props}
      messageFormat={props.messageFormat || 'Join {count}+ developers'}
      className={`text-xs ${props.className || ''}`}
    />
  );
};

/**
 * Large social proof component for prominent display
 */
export const LargeSocialProof: React.FC<SocialProofProps> = (props) => {
  return (
    <SocialProof
      {...props}
      className={`text-lg font-semibold ${props.className || ''}`}
      loadingComponent={
        <div className="flex items-center justify-center space-x-3">
          <LoadingSpinner size="md" color="gray" />
          <span className="text-lg">Loading statistics...</span>
        </div>
      }
    />
  );
}; 