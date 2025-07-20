import type { FormData, ValidationError, ValidationResult } from '../types';
import { VALIDATION_RULES, ERROR_MESSAGES } from './constants';

/**
 * Validates an email address using regex pattern
 * @param email - The email address to validate
 * @returns true if email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const trimmedEmail = email.trim();
  return VALIDATION_RULES.email.pattern.test(trimmedEmail);
};

/**
 * Validates a name using length and pattern constraints
 * @param name - The name to validate
 * @returns true if name is valid, false otherwise
 */
export const isValidName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  
  const trimmedName = name.trim();
  const { minLength, maxLength, pattern } = VALIDATION_RULES.name;
  
  return (
    trimmedName.length >= minLength &&
    trimmedName.length <= maxLength &&
    pattern.test(trimmedName)
  );
};

/**
 * Validates a phone number using regex pattern
 * @param phone - The phone number to validate
 * @returns true if phone is valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return true; // Optional field
  
  const trimmedPhone = phone.trim();
  if (trimmedPhone === '') return true; // Empty is valid for optional field
  
  return VALIDATION_RULES.phone.pattern.test(trimmedPhone);
};

/**
 * Validates a message using length constraints
 * @param message - The message to validate
 * @returns true if message is valid, false otherwise
 */
export const isValidMessage = (message: string): boolean => {
  if (!message || typeof message !== 'string') return true; // Optional field
  
  const trimmedMessage = message.trim();
  if (trimmedMessage === '') return true; // Empty is valid for optional field
  
  const { minLength, maxLength } = VALIDATION_RULES.message;
  return trimmedMessage.length >= minLength && trimmedMessage.length <= maxLength;
};

/**
 * Validates a company name using length constraints
 * @param company - The company name to validate
 * @returns true if company name is valid, false otherwise
 */
export const isValidCompany = (company: string): boolean => {
  if (!company || typeof company !== 'string') return true; // Optional field
  
  const trimmedCompany = company.trim();
  if (trimmedCompany === '') return true; // Empty is valid for optional field
  
  const { minLength, maxLength } = VALIDATION_RULES.company;
  return trimmedCompany.length >= minLength && trimmedCompany.length <= maxLength;
};

/**
 * Sanitizes input by removing leading/trailing whitespace and HTML tags
 * @param input - The input string to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' '); // Normalize whitespace
};

/**
 * Sanitizes email by converting to lowercase and trimming
 * @param email - The email to sanitize
 * @returns Sanitized email
 */
export const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return '';
  
  return email.trim().toLowerCase();
};

/**
 * Sanitizes name by capitalizing first letter of each word
 * @param name - The name to sanitize
 * @returns Sanitized name
 */
export const sanitizeName = (name: string): string => {
  if (!name || typeof name !== 'string') return '';
  
  const sanitized = sanitizeInput(name);
  return sanitized
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Validates a single form field and returns validation error if invalid
 * @param field - The field name to validate
 * @param value - The field value to validate
 * @returns ValidationError object if invalid, null if valid
 */
export const validateField = (
  field: keyof FormData,
  value: string | boolean | undefined
): ValidationError | null => {
  const rules = VALIDATION_RULES[field as keyof typeof VALIDATION_RULES];
  
  if (!rules) {
    return {
      field,
      message: ERROR_MESSAGES.invalidFormat(field),
      code: 'INVALID_FIELD',
    };
  }

  // Handle boolean fields (like subscribed_newsletter)
  if (typeof value === 'boolean') {
    return null; // Boolean fields don't need validation
  }

  // Handle undefined values
  if (value === undefined) {
    if (rules.required) {
      return {
        field,
        message: ERROR_MESSAGES.required(field),
        code: 'REQUIRED_FIELD',
      };
    }
    return null; // Optional field can be undefined
  }

  const stringValue = value as string;
  const trimmedValue = stringValue.trim();

  // Check required field
  if (rules.required && (!trimmedValue || trimmedValue === '')) {
    return {
      field,
      message: ERROR_MESSAGES.required(field),
      code: 'REQUIRED_FIELD',
    };
  }

  // Skip validation for empty optional fields
  if (!rules.required && (!trimmedValue || trimmedValue === '')) {
    return null;
  }

  // Check minimum length
  if ('minLength' in rules && rules.minLength && trimmedValue.length < rules.minLength) {
    return {
      field,
      message: ERROR_MESSAGES.minLength(field, rules.minLength),
      code: 'MIN_LENGTH',
    };
  }

  // Check maximum length
  if ('maxLength' in rules && rules.maxLength && trimmedValue.length > rules.maxLength) {
    return {
      field,
      message: ERROR_MESSAGES.maxLength(field, rules.maxLength),
      code: 'MAX_LENGTH',
    };
  }

  // Check pattern
  if ('pattern' in rules && rules.pattern && !rules.pattern.test(trimmedValue)) {
    let message = ERROR_MESSAGES.invalidFormat(field);
    
    if (field === 'email') {
      message = ERROR_MESSAGES.invalidEmail;
    } else if (field === 'phone') {
      message = ERROR_MESSAGES.invalidPhone;
    } else if (field === 'name') {
      message = ERROR_MESSAGES.invalidName;
    }

    return {
      field,
      message,
      code: 'INVALID_PATTERN',
    };
  }

  return null;
};

/**
 * Validates complete form data and returns validation result
 * @param formData - The form data to validate
 * @returns ValidationResult object with validation status and errors
 */
export const validateFormData = (formData: FormData): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate each field
  Object.keys(formData).forEach((key) => {
    const field = key as keyof FormData;
    const value = formData[field];
    
    const error = validateField(field, value);
    if (error) {
      errors.push(error);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitizes complete form data
 * @param formData - The form data to sanitize
 * @returns Sanitized form data
 */
export const sanitizeFormData = (formData: FormData): FormData => {
  return {
    name: sanitizeName(formData.name),
    email: sanitizeEmail(formData.email),
    subscribed_newsletter: formData.subscribed_newsletter,
    message: formData.message ? sanitizeInput(formData.message) : undefined,
    company: formData.company ? sanitizeInput(formData.company) : undefined,
    phone: formData.phone ? sanitizeInput(formData.phone) : undefined,
  };
};

/**
 * Validates and sanitizes form data in one operation
 * @param formData - The form data to validate and sanitize
 * @returns Object containing validation result and sanitized data
 */
export const validateAndSanitizeFormData = (formData: FormData) => {
  const sanitizedData = sanitizeFormData(formData);
  const validationResult = validateFormData(sanitizedData);

  return {
    ...validationResult,
    sanitizedData,
  };
};

/**
 * Creates a validation error object
 * @param field - The field name
 * @param message - The error message
 * @param code - The error code
 * @returns ValidationError object
 */
export const createValidationError = (
  field: keyof FormData,
  message: string,
  code: string
): ValidationError => ({
  field,
  message,
  code,
});

/**
 * Checks if a value is empty or whitespace only
 * @param value - The value to check
 * @returns true if value is empty or whitespace only
 */
export const isEmpty = (value: string): boolean => {
  return !value || typeof value !== 'string' || value.trim() === '';
};

/**
 * Checks if a value is not empty
 * @param value - The value to check
 * @returns true if value is not empty
 */
export const isNotEmpty = (value: string): boolean => {
  return !isEmpty(value);
}; 