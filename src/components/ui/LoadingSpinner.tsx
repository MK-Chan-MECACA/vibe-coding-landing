import React from 'react';

/**
 * Loading spinner size types
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Loading spinner color types
 */
export type SpinnerColor = 'white' | 'gray' | 'blue' | 'red';

/**
 * LoadingSpinner component props interface
 */
export interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Color of the spinner */
  color?: SpinnerColor;
  /** Additional CSS classes */
  className?: string;
  /** Accessibility label */
  'aria-label'?: string;
}

/**
 * LoadingSpinner component with smooth animation and configurable options
 * 
 * @example
 * ```tsx
 * <LoadingSpinner size="md" color="blue" />
 * <LoadingSpinner size="lg" color="white" aria-label="Loading content" />
 * ```
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'gray',
  className = '',
  'aria-label': ariaLabel = 'Loading',
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  // Color classes
  const colorClasses = {
    white: 'text-white',
    gray: 'text-gray-500',
    blue: 'text-blue-500',
    red: 'text-red-500',
  };

  // Combine classes
  const spinnerClasses = [
    'animate-spin',
    sizeClasses[size],
    colorClasses[color],
    className,
  ].join(' ');

  return (
    <svg
      className={spinnerClasses}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
      role="status"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}; 