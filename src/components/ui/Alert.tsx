import React, { forwardRef, useState } from 'react';

/**
 * Alert variant types
 */
export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

/**
 * Alert component props interface
 */
export interface AlertProps {
  /** Alert variant style */
  variant?: AlertVariant;
  /** Alert title */
  title?: string;
  /** Alert message */
  message?: string;
  /** Custom icon component */
  icon?: React.ReactNode;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Default icons for each alert variant
 */
const defaultIcons = {
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

/**
 * Reusable Alert component with different variants and dismissible functionality
 * 
 * @example
 * ```tsx
 * <Alert variant="success" title="Success!" message="Your changes have been saved." />
 * 
 * <Alert variant="error" dismissible onDismiss={() => setShowError(false)}>
 *   <p>Something went wrong. Please try again.</p>
 * </Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      message,
      icon,
      dismissible = false,
      onDismiss,
      className = '',
      children,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    // Handle dismiss
    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    // Variant classes
    const variantClasses = {
      success: [
        'bg-green-50 border-green-200 text-green-800',
        'focus:ring-green-500',
      ],
      error: [
        'bg-red-50 border-red-200 text-red-800',
        'focus:ring-red-500',
      ],
      warning: [
        'bg-yellow-50 border-yellow-200 text-yellow-800',
        'focus:ring-yellow-500',
      ],
      info: [
        'bg-blue-50 border-blue-200 text-blue-800',
        'focus:ring-blue-500',
      ],
    };

    // Base classes
    const baseClasses = [
      'border rounded-md p-4',
      'transition-all duration-300 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
    ];

    // Animation classes
    const animationClasses = isVisible
      ? 'opacity-100 transform translate-y-0'
      : 'opacity-0 transform -translate-y-2 pointer-events-none';

    // Combine classes
    const alertClasses = [
      ...baseClasses,
      ...variantClasses[variant],
      animationClasses,
      className,
    ].join(' ');

    // Icon classes
    const iconClasses = [
      'flex-shrink-0',
      variant === 'success' && 'text-green-400',
      variant === 'error' && 'text-red-400',
      variant === 'warning' && 'text-yellow-400',
      variant === 'info' && 'text-blue-400',
    ].join(' ');

    // Dismiss button classes
    const dismissButtonClasses = [
      'flex-shrink-0 ml-auto pl-3',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md',
      variant === 'success' && 'focus:ring-green-500',
      variant === 'error' && 'focus:ring-red-500',
      variant === 'warning' && 'focus:ring-yellow-500',
      variant === 'info' && 'focus:ring-blue-500',
    ].join(' ');

    // Use custom icon or default icon
    const alertIcon = icon || defaultIcons[variant];

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={alertClasses}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex">
          {/* Icon */}
          <div className={iconClasses}>{alertIcon}</div>

          {/* Content */}
          <div className="ml-3 flex-1">
            {title && (
              <h3 className="text-sm font-medium mb-1">{title}</h3>
            )}
            
            {message && (
              <div className="text-sm">{message}</div>
            )}
            
            {children && (
              <div className="text-sm mt-1">{children}</div>
            )}
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <div className={dismissButtonClasses}>
              <button
                type="button"
                onClick={handleDismiss}
                className="inline-flex text-current hover:opacity-75 focus:outline-none"
                aria-label="Dismiss alert"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert'; 