import React, { useState } from 'react';
import { useFormSubmission, useEmailCheck, useSubmissionCount, useSupabaseConnection } from '../hooks/useSupabase';
import { validateAndSanitizeFormData } from '../utils/validation';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants';
import type { FormData, ValidationError } from '../types';

interface SupabaseContactFormProps {
  className?: string;
  showStats?: boolean;
  enableRealtime?: boolean;
}

const SupabaseContactForm: React.FC<SupabaseContactFormProps> = ({ 
  className = '',
  showStats = true,
  enableRealtime = true,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subscribed_newsletter: false,
    message: '',
    company: '',
    phone: '',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  // Supabase hooks
  const { submit, loading, success, error, data, reset } = useFormSubmission({
    onSuccess: (data) => {
      console.log('Form submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Form submission failed:', error);
    },
    autoReset: true,
    resetDelay: 5000,
  });

  const { checkEmail, exists: emailExists, loading: emailChecking } = useEmailCheck({
    debounceMs: 500,
    onExists: (exists) => {
      if (exists) {
        setValidationErrors(prev => [
          ...prev.filter(e => e.field !== 'email'),
          {
            field: 'email',
            message: 'This email is already registered',
            code: 'EMAIL_EXISTS',
          },
        ]);
      } else {
        setValidationErrors(prev => prev.filter(e => e.field !== 'email'));
      }
    },
  });

  const { count, stats, loading: statsLoading } = useSubmissionCount({
    enableRealtime,
    refreshInterval: 30000, // Refresh every 30 seconds
  });

  const { isConnected, lastError: connectionError } = useSupabaseConnection();

  /**
   * Handles input changes and updates form data
   */
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear field-specific validation errors
    setValidationErrors(prev => prev.filter(error => error.field !== field));

    // Check email existence when email field changes
    if (field === 'email' && typeof value === 'string') {
      checkEmail(value);
    }
  };

  /**
   * Validates form data before submission
   */
  const validateForm = (): boolean => {
    const { isValid, errors } = validateAndSanitizeFormData(formData);
    
    if (!isValid) {
      setValidationErrors(errors);
      return false;
    }

    // Check for email existence
    if (emailExists) {
      setValidationErrors(prev => [
        ...prev,
        {
          field: 'email',
          message: 'This email is already registered',
          code: 'EMAIL_EXISTS',
        },
      ]);
      return false;
    }

    setValidationErrors([]);
    return true;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      alert('Database connection is not available. Please try again later.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    await submit(formData, 'landing_page');
  };

  /**
   * Gets error message for a specific field
   */
  const getFieldError = (field: keyof FormData): string | undefined => {
    return validationErrors.find(error => error.field === field)?.message;
  };

  /**
   * Resets the form
   */
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subscribed_newsletter: false,
      message: '',
      company: '',
      phone: '',
    });
    setValidationErrors([]);
    reset();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Database Connection Error
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{connectionError || 'Unable to connect to database'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      {showStats && stats && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-lg font-medium text-blue-900 mb-3">Submission Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-700">Total Submissions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.newsletterSubscribers}</div>
              <div className="text-sm text-green-700">Newsletter Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.thisMonth}</div>
              <div className="text-sm text-purple-700">This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{count || 0}</div>
              <div className="text-sm text-orange-700">Current Count</div>
            </div>
          </div>
          {statsLoading && (
            <div className="mt-2 text-sm text-blue-600">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </div>
          )}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              getFieldError('name') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
            disabled={loading}
          />
          {getFieldError('name') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                getFieldError('email') ? 'border-red-500' : emailExists ? 'border-yellow-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
              disabled={loading}
            />
            {emailChecking && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>
          {getFieldError('email') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
          )}
          {emailExists && !getFieldError('email') && (
            <p className="mt-1 text-sm text-yellow-600">This email is already registered</p>
          )}
        </div>

        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company || ''}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              getFieldError('company') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your company name"
            disabled={loading}
          />
          {getFieldError('company') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('company')}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              getFieldError('phone') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your phone number"
            disabled={loading}
          />
          {getFieldError('phone') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message || ''}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              getFieldError('message') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell us about your project..."
            disabled={loading}
          />
          {getFieldError('message') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('message')}</p>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="newsletter"
            checked={formData.subscribed_newsletter}
            onChange={(e) => handleInputChange('subscribed_newsletter', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={loading}
          />
          <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
            Subscribe to our newsletter for updates and insights
          </label>
        </div>

        {/* Submit Message */}
        {success && (
          <div className="bg-green-50 text-green-800 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{SUCCESS_MESSAGES.formSubmitted}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-800 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading || !isConnected}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Form'
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupabaseContactForm; 