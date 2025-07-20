import { useState, useCallback, useEffect, useRef } from 'react';
import { validateAndSanitizeFormData, validateField } from '../utils/validation';
import type { FormData, ValidationError } from '../types';

/**
 * Form validation state interface
 */
interface FormValidationState {
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
  touched: Set<keyof FormData>;
}

/**
 * Validation hook options
 */
interface UseFormValidationOptions {
  /** Initial form data */
  initialData: FormData;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Whether to validate on mount */
  validateOnMount?: boolean;
  /** Whether to validate on blur */
  validateOnBlur?: boolean;
  /** Whether to validate on change */
  validateOnChange?: boolean;
}

/**
 * Custom hook for form validation with real-time field validation and debounced updates
 * 
 * @example
 * ```tsx
 * const { formData, errors, isValid, validateField, validateForm, resetForm } = useFormValidation({
 *   initialData: { name: '', email: '', subscribed_newsletter: false },
 *   debounceMs: 300,
 *   validateOnChange: true,
 * });
 * ```
 */
export const useFormValidation = (options: UseFormValidationOptions) => {
  const {
    initialData,
    debounceMs = 300,
    validateOnMount = false,
    validateOnBlur = true,
    validateOnChange = false,
  } = options;

  // Form state
  const [formData, setFormData] = useState<FormData>(initialData);
  
  // Validation state
  const [validationState, setValidationState] = useState<FormValidationState>({
    errors: [],
    isValid: false,
    isDirty: false,
    touched: new Set(),
  });

  // Debounce timer ref
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Validates a single field
   */
  const validateSingleField = useCallback((field: keyof FormData, value: string | boolean | undefined) => {
    const fieldValidation = validateField(field, value);
    
    setValidationState(prev => {
      const newErrors = prev.errors.filter(error => error.field !== field);
      
      if (fieldValidation) {
        newErrors.push(fieldValidation);
      }
      
      return {
        ...prev,
        errors: newErrors,
        isValid: newErrors.length === 0,
      };
    });
  }, []);

  /**
   * Validates the entire form
   */
  const validateForm = useCallback(() => {
    const { isValid, errors } = validateAndSanitizeFormData(formData);
    
    setValidationState(prev => ({
      ...prev,
      errors,
      isValid,
    }));
    
    return { isValid, errors };
  }, [formData]);

  /**
   * Debounced validation function
   */
  const debouncedValidate = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    debounceTimerRef.current = setTimeout(() => {
      validateForm();
    }, debounceMs);
  }, [validateForm, debounceMs]);

  /**
   * Updates form data and triggers validation
   */
  const updateField = useCallback((
    field: keyof FormData,
    value: string | boolean,
    shouldValidate: boolean = true
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    setValidationState(prev => ({
      ...prev,
      isDirty: true,
      touched: new Set([...prev.touched, field]),
    }));

    if (shouldValidate) {
      if (validateOnChange) {
        validateSingleField(field, value);
      } else {
        debouncedValidate();
      }
    }
  }, [validateOnChange, validateSingleField, debouncedValidate]);

  /**
   * Handles field blur events
   */
  const handleFieldBlur = useCallback((field: keyof FormData) => {
    if (validateOnBlur) {
      const value = formData[field];
      if (value !== undefined) {
        validateSingleField(field, value);
      }
    }
  }, [validateOnBlur, validateSingleField, formData]);

  /**
   * Resets the form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setValidationState({
      errors: [],
      isValid: false,
      isDirty: false,
      touched: new Set(),
    });
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  }, [initialData]);

  /**
   * Sets form data and validates
   */
  const setFormDataAndValidate = useCallback((newData: FormData) => {
    setFormData(newData);
    setValidationState(prev => ({
      ...prev,
      isDirty: true,
    }));
    
    if (validateOnChange) {
      const { isValid, errors } = validateAndSanitizeFormData(newData);
      setValidationState(prev => ({
        ...prev,
        errors,
        isValid,
      }));
    } else {
      debouncedValidate();
    }
  }, [validateOnChange, debouncedValidate]);

  /**
   * Gets error message for a specific field
   */
  const getFieldError = useCallback((field: keyof FormData): string | undefined => {
    return validationState.errors.find(error => error.field === field)?.message;
  }, [validationState.errors]);

  /**
   * Checks if a field has been touched
   */
  const isFieldTouched = useCallback((field: keyof FormData): boolean => {
    return validationState.touched.has(field);
  }, [validationState.touched]);

  /**
   * Checks if a field should show error
   */
  const shouldShowFieldError = useCallback((field: keyof FormData): boolean => {
    return isFieldTouched(field) && !!getFieldError(field);
  }, [isFieldTouched, getFieldError]);

  /**
   * Clears error for a specific field
   */
  const clearFieldError = useCallback((field: keyof FormData) => {
    setValidationState(prev => ({
      ...prev,
      errors: prev.errors.filter(error => error.field !== field),
      isValid: prev.errors.filter(error => error.field !== field).length === 0,
    }));
  }, []);

  /**
   * Clears all errors
   */
  const clearAllErrors = useCallback(() => {
    setValidationState(prev => ({
      ...prev,
      errors: [],
      isValid: true,
    }));
  }, []);

  // Initialize validation on mount if requested
  useEffect(() => {
    if (validateOnMount) {
      validateForm();
    }
  }, [validateOnMount, validateForm]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    // Form data
    formData,
    setFormData: setFormDataAndValidate,
    
    // Validation state
    errors: validationState.errors,
    isValid: validationState.isValid,
    isDirty: validationState.isDirty,
    
    // Field management
    updateField,
    handleFieldBlur,
    getFieldError,
    isFieldTouched,
    shouldShowFieldError,
    
    // Validation functions
    validateForm,
    validateField: validateSingleField,
    
    // Error management
    clearFieldError,
    clearAllErrors,
    
    // Form reset
    resetForm,
  };
}; 