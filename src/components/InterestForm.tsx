import React, { useState, useCallback } from 'react';
import { Button, Input, Checkbox, Alert } from './ui';
import { useFormValidation } from '../hooks/useFormValidation';
import { useFormSubmission, useEmailCheck } from '../hooks/useSupabase';
import { useSupabaseConnection } from '../hooks/useSupabase';
import type { FormData } from '../types';

/**
 * Interest form component props interface
 */
interface InterestFormProps {
  /** Form source identifier */
  source?: string;
  /** Custom success message */
  successMessage?: string;
  /** Custom error message */
  errorMessage?: string;
  /** Whether to show newsletter subscription option */
  showNewsletter?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Callback when form is successfully submitted */
  onSuccess?: (data: FormData) => void;
  /** Callback when form submission fails */
  onError?: (error: string) => void;
}

/**
 * Default form data
 */
const defaultFormData: FormData = {
  name: '',
  email: '',
  subscribed_newsletter: false,
};

/**
 * Main interest form component with validation and Supabase integration
 * 
 * @example
 * ```tsx
 * <InterestForm
 *   source="landing_page"
 *   showNewsletter={true}
 *   onSuccess={(data) => console.log('Form submitted:', data)}
 * />
 * ```
 */
export const InterestForm: React.FC<InterestFormProps> = ({
  source = 'landing_page',
  successMessage = "Thanks! We'll notify you when we launch.",
  errorMessage = 'Something went wrong. Please try again.',
  showNewsletter = true,
  className = '',
  onSuccess,
  onError,
}) => {
  // Form validation hook
  const {
    formData,
    updateField,
    handleFieldBlur,
    getFieldError,
    shouldShowFieldError,
    isValid,
    isDirty,
    resetForm,
    clearAllErrors,
  } = useFormValidation({
    initialData: defaultFormData,
    validateOnBlur: true,
    validateOnChange: false,
  });

  // Form submission hook
  const { submit, loading, success, error, reset: resetSubmission } = useFormSubmission();

  // Email existence check hook
  const { checkEmail, exists: emailExists, loading: emailLoading } = useEmailCheck({
    debounceMs: 500,
  });

  // Supabase connection status
  const { isConnected, lastError: connectionError } = useSupabaseConnection();

  // Local state
  const [showSuccess, setShowSuccess] = useState(false);
  const [duplicateEmailError, setDuplicateEmailError] = useState<string | null>(null);

  /**
   * Handles form field changes
   */
  const handleFieldChange = useCallback((
    field: keyof FormData,
    value: string | boolean
  ) => {
    updateField(field, value);
    
    // Clear duplicate email error when email changes
    if (field === 'email' && duplicateEmailError) {
      setDuplicateEmailError(null);
    }
    
    // Check email existence when email changes
    if (field === 'email' && typeof value === 'string' && value.length > 0) {
      checkEmail(value);
    }
  }, [updateField, duplicateEmailError, checkEmail]);

  /**
   * Handles form submission
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    
    // Clear previous errors
    clearAllErrors();
    setDuplicateEmailError(null);
    
    // Check if email already exists
    if (emailExists) {
      setDuplicateEmailError('This email is already registered. Please use a different email address.');
      return;
    }
    
    // Basic validation - check if required fields are filled
    if (!formData.name || !formData.email) {
      console.log('Validation failed - missing required fields');
      // Trigger validation for required fields
      if (!formData.name) {
        handleFieldBlur('name');
      }
      if (!formData.email) {
        handleFieldBlur('email');
      }
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      console.log('Validation failed - invalid email format');
      handleFieldBlur('email');
      return;
    }
    
    console.log('Validation passed, proceeding with submission');
    console.log('Form data:', formData);
    console.log('Form state:', { loading, isDirty, isValid, emailExists });
    
    try {
      console.log('Submitting form with data:', formData);
      
      // Submit form data
      const result = await submit(formData, source);
      
      if (result.success) {
        setShowSuccess(true);
        resetForm();
        onSuccess?.(formData);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        onError?.(result.errors?.[0]?.message || errorMessage);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : errorMessage;
      onError?.(errorMsg);
    }
  }, [
    isValid,
    formData,
    emailExists,
    submit,
    source,
    clearAllErrors,
    resetForm,
    onSuccess,
    onError,
    errorMessage,
    handleFieldBlur,
  ]);

  /**
   * Handles form reset
   */
  const handleReset = useCallback(() => {
    resetForm();
    resetSubmission();
    setShowSuccess(false);
    setDuplicateEmailError(null);
    clearAllErrors();
  }, [resetForm, resetSubmission, clearAllErrors]);

  // Show connection error if Supabase is not connected
  if (!isConnected && connectionError) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
        <Alert
          variant="error"
          title="Connection Error"
          message="Unable to connect to our servers. Please check your internet connection and try again."
        />
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm ${className}`}>
      {/* Success Message */}
      {showSuccess && (
        <Alert
          variant="success"
          title="Success!"
          message={successMessage}
          dismissible
          onDismiss={() => setShowSuccess(false)}
          className="mb-6"
        />
      )}

      {/* Error Message */}
      {error && (
        <Alert
          variant="error"
          title="Submission Error"
          message={error}
          dismissible
          onDismiss={resetSubmission}
          className="mb-6"
        />
      )}

      {/* Duplicate Email Error */}
      {duplicateEmailError && (
        <Alert
          variant="error"
          title="Email Already Registered"
          message={duplicateEmailError}
          dismissible
          onDismiss={() => setDuplicateEmailError(null)}
          className="mb-6"
        />
      )}

      {/* Form */}
      <form 
        onSubmit={(e) => {
          console.log('Form submitted!');
          handleSubmit(e);
        }} 
        className="space-y-4" 
        noValidate
      >
        {/* Name Field */}
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          onBlur={() => handleFieldBlur('name')}
          error={shouldShowFieldError('name') ? getFieldError('name') : undefined}
          required
          fullWidth
          disabled={loading}
          aria-describedby="name-error"
        />

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          onBlur={() => handleFieldBlur('email')}
          error={shouldShowFieldError('email') ? getFieldError('email') : undefined}
          required
          fullWidth
          disabled={loading}
          aria-describedby="email-error"
          rightIcon={
            emailLoading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            ) : emailExists ? (
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : formData.email && !shouldShowFieldError('email') ? (
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : undefined
          }
        />

        {/* Newsletter Subscription */}
        {showNewsletter && (
          <Checkbox
            label="Subscribe to our newsletter"
            checked={formData.subscribed_newsletter}
            onChange={(e) => handleFieldChange('subscribed_newsletter', e.target.checked)}
            helperText="Get notified about new features, updates, and exclusive content"
            disabled={loading}
          />
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          loadingText="Submitting..."
          disabled={loading || emailExists === true}
          fullWidth
          className="mt-6"
        >
          Join the Waitlist
        </Button>

        {/* Reset Button (only show if form has been submitted successfully) */}
        {showSuccess && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
            fullWidth
            className="mt-2"
          >
            Submit Another Response
          </Button>
        )}
      </form>

      {/* Form Footer */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms" className="text-blue-600 hover:text-blue-700 underline">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </div>
  );
}; 