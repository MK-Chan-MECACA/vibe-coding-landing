import React, { useState } from 'react';
import type { FormData, ValidationError } from '../types';
import { validateAndSanitizeFormData, createValidationError } from '../utils/validation';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants';

interface ContactFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subscribed_newsletter: false,
    message: '',
    company: '',
    phone: '',
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  /**
   * Handles input changes and updates form data
   */
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear field-specific error when user starts typing
    setErrors(prev => prev.filter(error => error.field !== field));
  };

  /**
   * Validates a single field on blur
   */
  const handleFieldBlur = (field: keyof FormData) => {
    const { isValid, errors: validationErrors } = validateAndSanitizeFormData(formData);
    
    if (!isValid) {
      const fieldError = validationErrors.find(error => error.field === field);
      if (fieldError) {
        setErrors(prev => [...prev.filter(error => error.field !== field), fieldError]);
      }
    }
  };

  /**
   * Handles form submission with validation
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Validate and sanitize form data
      const { isValid, errors: validationErrors, sanitizedData } = validateAndSanitizeFormData(formData);

      if (!isValid) {
        setErrors(validationErrors);
        setSubmitMessage({
          type: 'error',
          message: 'Please fix the errors below and try again.',
        });
        return;
      }

      // Call onSubmit callback if provided
      if (onSubmit) {
        await onSubmit(sanitizedData);
      }

      // Show success message
      setSubmitMessage({
        type: 'success',
        message: SUCCESS_MESSAGES.formSubmitted,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subscribed_newsletter: false,
        message: '',
        company: '',
        phone: '',
      });
      setErrors([]);

    } catch (error) {
      setSubmitMessage({
        type: 'error',
        message: ERROR_MESSAGES.unknownError,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Gets error message for a specific field
   */
  const getFieldError = (field: keyof FormData): string | undefined => {
    return errors.find(error => error.field === field)?.message;
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
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
          onBlur={() => handleFieldBlur('name')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('name') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your full name"
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
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={() => handleFieldBlur('email')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('email') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your email address"
        />
        {getFieldError('email') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
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
          onBlur={() => handleFieldBlur('company')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('company') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your company name"
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
          onBlur={() => handleFieldBlur('phone')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('phone') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your phone number"
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
          onBlur={() => handleFieldBlur('message')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            getFieldError('message') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tell us about your project..."
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
        />
        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
          Subscribe to our newsletter for updates and insights
        </label>
      </div>

      {/* Submit Message */}
      {submitMessage && (
        <div className={`p-4 rounded-md ${
          submitMessage.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitMessage.message}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm; 