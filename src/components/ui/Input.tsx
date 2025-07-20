import React, { forwardRef } from 'react';

/**
 * Input size types
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input component props interface
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Input size */
  size?: InputSize;
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right icon component */
  rightIcon?: React.ReactNode;
  /** Full width input */
  fullWidth?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Input wrapper class name */
  wrapperClassName?: string;
}

/**
 * Reusable Input component with validation states and accessibility
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   error="Please enter a valid email"
 *   required
 * />
 * 
 * <Input
 *   label="Search"
 *   leftIcon={<SearchIcon />}
 *   placeholder="Search..."
 *   size="lg"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      required = false,
      className = '',
      wrapperClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Base input classes
    const baseClasses = [
      'block w-full',
      'border rounded-md',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder-gray-400',
    ];

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    // State classes
    const stateClasses = error
      ? [
          'border-red-300 text-red-900',
          'focus:border-red-500 focus:ring-red-500',
          'bg-red-50',
        ]
      : [
          'border-gray-300 text-gray-900',
          'focus:border-blue-500 focus:ring-blue-500',
          'bg-white',
        ];

    // Icon padding classes
    const iconPaddingClasses = {
      left: leftIcon ? 'pl-10' : '',
      right: rightIcon ? 'pr-10' : '',
    };

    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';

    // Combine input classes
    const inputClasses = [
      ...baseClasses,
      sizeClasses[size],
      ...stateClasses,
      iconPaddingClasses.left,
      iconPaddingClasses.right,
      widthClasses,
      className,
    ].join(' ');

    // Label classes
    const labelClasses = [
      'block text-sm font-medium text-gray-700 mb-1',
      required && 'after:content-["*"] after:ml-0.5 after:text-red-500',
    ].join(' ');

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${wrapperClassName}`}>
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-gray-400">{leftIcon}</div>
            </div>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              [error && errorId, helperText && helperId].filter(Boolean).join(' ') || undefined
            }
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="text-gray-400">{rightIcon}</div>
            </div>
          )}
        </div>

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 