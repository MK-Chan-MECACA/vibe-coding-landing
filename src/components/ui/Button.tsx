import React, { forwardRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component props interface
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Loading text to display when loading */
  loadingText?: string;
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right icon component */
  rightIcon?: React.ReactNode;
  /** Full width button */
  fullWidth?: boolean;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Reusable Button component with multiple variants and states
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * <Button variant="secondary" loading loadingText="Saving...">
 *   Save Changes
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Base button classes
    const baseClasses = [
      'inline-flex items-center justify-center',
      'font-medium rounded-lg',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95',
    ];

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    // Variant classes
    const variantClasses = {
      primary: [
        'bg-blue-500 text-white',
        'hover:bg-blue-600 focus:ring-blue-500',
        'active:bg-blue-700',
      ],
      secondary: [
        'bg-gray-100 text-gray-800 border border-gray-300',
        'hover:bg-gray-200 focus:ring-gray-500',
        'active:bg-gray-300',
      ],
      ghost: [
        'bg-transparent text-gray-700',
        'hover:bg-gray-100 focus:ring-gray-500',
        'active:bg-gray-200',
      ],
      danger: [
        'bg-red-500 text-white',
        'hover:bg-red-600 focus:ring-red-500',
        'active:bg-red-700',
      ],
    };

    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';

    // Combine all classes
    const buttonClasses = [
      ...baseClasses,
      sizeClasses[size],
      ...variantClasses[variant],
      widthClasses,
      className,
    ].join(' ');

    // Determine if button should be disabled
    const isDisabled = disabled || loading;

    // Loading text or children
    const buttonContent = loading && loadingText ? loadingText : children;

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <LoadingSpinner
            size="sm"
            className="mr-2"
            color={variant === 'primary' || variant === 'danger' ? 'white' : 'gray'}
          />
        )}

        {/* Left icon */}
        {!loading && leftIcon && (
          <span className="mr-2 flex-shrink-0">{leftIcon}</span>
        )}

        {/* Button content */}
        <span className="flex-shrink-0">{buttonContent}</span>

        {/* Right icon */}
        {!loading && rightIcon && (
          <span className="ml-2 flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; 