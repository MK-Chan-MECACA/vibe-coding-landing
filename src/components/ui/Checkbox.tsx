import React, { forwardRef } from 'react';

/**
 * Checkbox size types
 */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Checkbox component props interface
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Checkbox label */
  label?: string;
  /** Helper text below the checkbox */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Checkbox size */
  size?: CheckboxSize;
  /** Full width checkbox */
  fullWidth?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Checkbox wrapper class name */
  wrapperClassName?: string;
  /** Label class name */
  labelClassName?: string;
}

/**
 * Reusable Checkbox component with custom styling and accessibility
 * 
 * @example
 * ```tsx
 * <Checkbox
 *   label="Subscribe to newsletter"
 *   checked={subscribed}
 *   onChange={(e) => setSubscribed(e.target.checked)}
 * />
 * 
 * <Checkbox
 *   label="Accept terms and conditions"
 *   error="You must accept the terms"
 *   required
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      required = false,
      className = '',
      wrapperClassName = '',
      labelClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${checkboxId}-error`;
    const helperId = `${checkboxId}-helper`;

    // Size classes
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    // Base checkbox classes
    const baseClasses = [
      'rounded border-2',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'cursor-pointer',
    ];

    // State classes
    const stateClasses = error
      ? [
          'border-red-300',
          'focus:border-red-500 focus:ring-red-500',
          'checked:bg-red-500 checked:border-red-500',
        ]
      : [
          'border-gray-300',
          'focus:border-blue-500 focus:ring-blue-500',
          'checked:bg-blue-500 checked:border-blue-500',
        ];

    // Combine checkbox classes
    const checkboxClasses = [
      ...baseClasses,
      sizeClasses[size],
      ...stateClasses,
      className,
    ].join(' ');

    // Label classes
    const labelClasses = [
      'text-sm font-medium text-gray-700 cursor-pointer select-none',
      error && 'text-red-700',
      labelClassName,
    ].join(' ');

    // Helper text classes
    const helperClasses = [
      'text-sm',
      error ? 'text-red-600' : 'text-gray-500',
    ].join(' ');

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${wrapperClassName}`}>
        <div className="flex items-start">
          {/* Checkbox input */}
          <div className="flex items-center h-5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className={checkboxClasses}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={
                [error && errorId, helperText && helperId].filter(Boolean).join(' ') || undefined
              }
              {...props}
            />
          </div>

          {/* Label and helper text */}
          <div className="ml-3">
            {label && (
              <label htmlFor={checkboxId} className={labelClasses}>
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
            )}

            {/* Helper text */}
            {helperText && !error && (
              <p id={helperId} className={`mt-1 ${helperClasses}`}>
                {helperText}
              </p>
            )}

            {/* Error message */}
            {error && (
              <p id={errorId} className={`mt-1 ${helperClasses}`} role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox'; 