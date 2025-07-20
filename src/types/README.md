# TypeScript Types and Utilities Documentation

This document provides comprehensive documentation for the TypeScript types, constants, and validation utilities created for the Vibe Coding landing page project.

## 📁 File Structure

```
src/
├── types/
│   ├── index.ts          # Main type definitions
│   └── README.md         # This documentation
├── utils/
│   ├── constants.ts      # Application constants
│   ├── validation.ts     # Validation utilities
│   ├── supabase.ts       # Supabase client utilities
│   └── constants.ts      # Application constants
└── components/
    └── ContactForm.tsx   # Example usage component
```

## 🏗️ Type Definitions (`src/types/index.ts`)

### Core Interfaces

#### `FormData`
```typescript
interface FormData {
  name: string;
  email: string;
  subscribed_newsletter: boolean;
  message?: string;
  company?: string;
  phone?: string;
}
```
- **Purpose**: Defines the structure for contact/newsletter form data
- **Usage**: Used in form components and API endpoints
- **Fields**:
  - `name`: Required string (2-50 characters)
  - `email`: Required valid email address
  - `subscribed_newsletter`: Boolean for newsletter subscription
  - `message`, `company`, `phone`: Optional fields

#### `ValidationError`
```typescript
interface ValidationError {
  field: keyof FormData;
  message: string;
  code: string;
}
```
- **Purpose**: Represents validation errors for form fields
- **Usage**: Returned by validation functions
- **Fields**:
  - `field`: The form field that has an error
  - `message`: Human-readable error message
  - `code`: Machine-readable error code

#### `ValidationResult`
```typescript
interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
```
- **Purpose**: Result of form validation
- **Usage**: Returned by `validateFormData()` function

#### `ApiResponse<T>`
```typescript
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationError[];
  timestamp: string;
  status: number;
}
```
- **Purpose**: Generic API response structure
- **Usage**: Standardized API responses across the application

#### `SocialProofData`
```typescript
interface SocialProofData {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  testimonial: string;
  rating: number;
  verified: boolean;
  created_at: string;
  featured?: boolean;
}
```
- **Purpose**: Structure for testimonials and social proof data
- **Usage**: Display customer testimonials and reviews

### Utility Interfaces

#### `AnimationConfig`
```typescript
interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  direction?: 'normal' | 'reverse' | 'alternate';
}
```

#### `BreakpointConfig`
```typescript
interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}
```

#### `AppError`
```typescript
interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
  userFriendly?: boolean;
}
```

## 🔧 Constants (`src/utils/constants.ts`)

### Validation Rules
```typescript
export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    required: true,
  },
  email: {
    minLength: 5,
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true,
  },
  // ... more rules
}
```

### Error Messages
```typescript
export const ERROR_MESSAGES = {
  required: (field: string) => `${field} is required`,
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters long`,
  invalidEmail: 'Please enter a valid email address',
  // ... more messages
}
```

### Success Messages
```typescript
export const SUCCESS_MESSAGES = {
  formSubmitted: 'Thank you! Your message has been sent successfully.',
  newsletterSubscribed: 'Successfully subscribed to our newsletter!',
  // ... more messages
}
```

### API Endpoints
```typescript
export const API_ENDPOINTS = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  testimonials: '/api/testimonials',
  // ... more endpoints
}
```

### Design System Constants
- **Colors**: Primary, secondary, success, error, warning color palettes
- **Spacing**: Consistent spacing scale
- **Breakpoints**: Responsive design breakpoints
- **Z-Index**: Layering system
- **Border Radius**: Consistent border radius values
- **Animations**: Predefined animation configurations

## ✅ Validation Utilities (`src/utils/validation.ts`)

### Individual Field Validation

#### `isValidEmail(email: string): boolean`
```typescript
import { isValidEmail } from '../utils/validation';

const isValid = isValidEmail('user@example.com'); // true
const isInvalid = isValidEmail('invalid-email'); // false
```

#### `isValidName(name: string): boolean`
```typescript
import { isValidName } from '../utils/validation';

const isValid = isValidName('John Doe'); // true
const isInvalid = isValidName('J'); // false (too short)
```

#### `isValidPhone(phone: string): boolean`
```typescript
import { isValidPhone } from '../utils/validation';

const isValid = isValidPhone('+1234567890'); // true
const isInvalid = isValidPhone('abc'); // false
```

### Form Validation

#### `validateFormData(formData: FormData): ValidationResult`
```typescript
import { validateFormData } from '../utils/validation';

const formData: FormData = {
  name: 'John Doe',
  email: 'john@example.com',
  subscribed_newsletter: true,
};

const result = validateFormData(formData);
console.log(result.isValid); // true
console.log(result.errors); // []
```

#### `validateAndSanitizeFormData(formData: FormData)`
```typescript
import { validateAndSanitizeFormData } from '../utils/validation';

const formData: FormData = {
  name: '  john doe  ',
  email: 'JOHN@EXAMPLE.COM',
  subscribed_newsletter: true,
};

const result = validateAndSanitizeFormData(formData);
console.log(result.sanitizedData.name); // "John Doe"
console.log(result.sanitizedData.email); // "john@example.com"
```

### Sanitization Functions

#### `sanitizeInput(input: string): string`
- Removes HTML tags
- Normalizes whitespace
- Trims leading/trailing spaces

#### `sanitizeEmail(email: string): string`
- Converts to lowercase
- Trims whitespace

#### `sanitizeName(name: string): string`
- Capitalizes first letter of each word
- Removes HTML tags
- Normalizes whitespace

## 🎯 Usage Examples

### Basic Form Validation
```typescript
import { FormData, ValidationResult } from '../types';
import { validateFormData, sanitizeFormData } from '../utils/validation';

const handleFormSubmit = (formData: FormData) => {
  // Sanitize input
  const sanitizedData = sanitizeFormData(formData);
  
  // Validate data
  const validation: ValidationResult = validateFormData(sanitizedData);
  
  if (!validation.isValid) {
    // Handle validation errors
    validation.errors.forEach(error => {
      console.error(`${error.field}: ${error.message}`);
    });
    return;
  }
  
  // Proceed with form submission
  submitForm(sanitizedData);
};
```

### API Response Handling
```typescript
import { ApiResponse, FormData } from '../types';

const submitContactForm = async (formData: FormData): Promise<ApiResponse<FormData>> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    const result: ApiResponse<FormData> = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network error occurred',
      timestamp: new Date().toISOString(),
      status: 500,
    };
  }
};
```

### Component Integration
```typescript
import React, { useState } from 'react';
import { FormData, ValidationError } from '../types';
import { validateAndSanitizeFormData } from '../utils/validation';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subscribed_newsletter: false,
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors, sanitizedData } = 
      validateAndSanitizeFormData(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    
    // Submit form with sanitized data
    await submitForm(sanitizedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## 🚀 Best Practices

### 1. Always Sanitize Input
```typescript
// ❌ Bad
const userInput = formData.name;

// ✅ Good
const sanitizedInput = sanitizeName(formData.name);
```

### 2. Validate Before Processing
```typescript
// ❌ Bad
const result = await processData(formData);

// ✅ Good
const validation = validateFormData(formData);
if (!validation.isValid) {
  return { success: false, errors: validation.errors };
}
const result = await processData(formData);
```

### 3. Use Type-Safe Error Handling
```typescript
// ❌ Bad
catch (error) {
  console.error('Something went wrong');
}

// ✅ Good
catch (error) {
  const appError: AppError = {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
    userFriendly: true,
  };
  handleError(appError);
}
```

### 4. Leverage Constants for Consistency
```typescript
// ❌ Bad
const minLength = 2;
const maxLength = 50;

// ✅ Good
import { VALIDATION_RULES } from '../utils/constants';
const { minLength, maxLength } = VALIDATION_RULES.name;
```

## 🔍 Testing

### Unit Testing Validation Functions
```typescript
import { isValidEmail, isValidName } from '../utils/validation';

describe('Validation Functions', () => {
  test('isValidEmail should validate correct emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });

  test('isValidName should validate correct names', () => {
    expect(isValidName('John Doe')).toBe(true);
    expect(isValidName('J')).toBe(false); // too short
  });
});
```

## 📝 Contributing

When adding new types or utilities:

1. **Follow naming conventions**: Use PascalCase for interfaces, camelCase for functions
2. **Add JSDoc comments**: Document all public functions and interfaces
3. **Include examples**: Provide usage examples in documentation
4. **Update tests**: Add corresponding unit tests
5. **Update this documentation**: Keep this README current

## 🔗 Related Files

- `src/components/ContactForm.tsx` - Example implementation
- `src/utils/supabase.ts` - Database utilities
- `src/hooks/useScrollPosition.ts` - Custom React hooks
- `tailwind.config.js` - TailwindCSS configuration
- `next.config.ts` - Next.js configuration 