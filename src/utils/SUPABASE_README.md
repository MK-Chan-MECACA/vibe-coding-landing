# Supabase Integration Documentation

This document provides comprehensive documentation for the Supabase integration in the Vibe Coding landing page project.

## 📁 File Structure

```
src/
├── utils/
│   ├── supabase.ts           # Supabase client configuration
│   ├── database.ts           # Database operation functions
│   ├── database.types.ts     # TypeScript database types
│   └── SUPABASE_README.md    # This documentation
├── hooks/
│   └── useSupabase.ts        # Custom React hooks for Supabase
└── components/
    └── SupabaseContactForm.tsx # Example implementation
```

## 🏗️ Database Schema

### Interest Submissions Table

```sql
CREATE TABLE interest_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_newsletter BOOLEAN DEFAULT false,
  message TEXT,
  company VARCHAR(100),
  phone VARCHAR(20),
  source VARCHAR(50) DEFAULT 'landing_page',
  submitted_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_interest_submissions_email ON interest_submissions(email);
CREATE INDEX idx_interest_submissions_submitted_at ON interest_submissions(submitted_at);
CREATE INDEX idx_interest_submissions_source ON interest_submissions(source);
CREATE INDEX idx_interest_submissions_newsletter ON interest_submissions(subscribed_newsletter);
```

### Testimonials Table

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  avatar VARCHAR(255),
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  verified BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Service role key for server-side operations
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Supabase Client Setup (`src/utils/supabase.ts`)

The Supabase client is configured with:
- **Type Safety**: Full TypeScript support with database types
- **Error Handling**: Comprehensive error validation
- **Configuration Validation**: Environment variable validation
- **Custom Headers**: Client identification headers
- **Realtime Support**: Configured for real-time subscriptions

```typescript
import { createSupabaseClient, supabase, isSupabaseConfigured } from '../utils/supabase';

// Check if Supabase is configured
if (!isSupabaseConfigured()) {
  console.error('Supabase is not properly configured');
}

// Use the configured client
const { data, error } = await supabase
  .from('interest_submissions')
  .select('*');
```

## 🗄️ Database Operations (`src/utils/database.ts`)

### Core Functions

#### `submitInterestForm(formData, source)`
Submits interest form data to the database with retry logic and error handling.

```typescript
import { submitInterestForm } from '../utils/database';

const formData: FormData = {
  name: 'John Doe',
  email: 'john@example.com',
  subscribed_newsletter: true,
  message: 'Interested in your services',
  company: 'Tech Corp',
  phone: '+1234567890',
};

const result = await submitInterestForm(formData, 'landing_page');

if (result.success) {
  console.log('Submission successful:', result.data);
} else {
  console.error('Submission failed:', result.error);
}
```

#### `getSubmissionCount(filters)`
Gets the total count of submissions with optional filtering.

```typescript
import { getSubmissionCount } from '../utils/database';

// Get all submissions
const allCount = await getSubmissionCount();

// Get filtered submissions
const newsletterCount = await getSubmissionCount({
  subscribed_newsletter: true,
  source: 'landing_page',
  dateFrom: '2024-01-01',
  dateTo: '2024-12-31',
});
```

#### `checkEmailExists(email)`
Checks if an email already exists in the database.

```typescript
import { checkEmailExists } from '../utils/database';

const exists = await checkEmailExists('john@example.com');
console.log('Email exists:', exists.data); // true/false
```

#### `getSubmissionStats()`
Gets comprehensive submission statistics.

```typescript
import { getSubmissionStats } from '../utils/database';

const stats = await getSubmissionStats();
console.log('Total submissions:', stats.data?.total);
console.log('Newsletter subscribers:', stats.data?.newsletterSubscribers);
console.log('This month:', stats.data?.thisMonth);
console.log('Sources breakdown:', stats.data?.sources);
```

### Error Handling

All database operations include:
- **Retry Logic**: Exponential backoff for failed requests
- **Error Classification**: Specific error codes and messages
- **Type Safety**: Proper TypeScript error types
- **Graceful Degradation**: Fallback behavior for network issues

```typescript
// Error handling example
const result = await submitInterestForm(formData);

if (!result.success) {
  switch (result.error?.message) {
    case 'This email is already registered':
      // Handle duplicate email
      break;
    case 'Required fields are missing':
      // Handle validation error
      break;
    case 'Database table not found':
      // Handle configuration error
      break;
    default:
      // Handle unknown error
      break;
  }
}
```

## 🎣 React Hooks (`src/hooks/useSupabase.ts`)

### `useFormSubmission(options)`

Custom hook for form submission with loading states and error handling.

```typescript
import { useFormSubmission } from '../hooks/useSupabase';

const MyForm = () => {
  const { submit, loading, success, error, reset } = useFormSubmission({
    onSuccess: (data) => {
      console.log('Form submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Form submission failed:', error);
    },
    autoReset: true,
    resetDelay: 5000,
  });

  const handleSubmit = async (formData: FormData) => {
    await submit(formData, 'landing_page');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      
      {success && <div>Success!</div>}
      {error && <div>Error: {error}</div>}
    </form>
  );
};
```

### `useSubmissionCount(options)`

Hook for submission count with real-time updates.

```typescript
import { useSubmissionCount } from '../hooks/useSupabase';

const SubmissionStats = () => {
  const { count, stats, loading, refetch } = useSubmissionCount({
    enableRealtime: true,
    refreshInterval: 30000, // Refresh every 30 seconds
    filters: {
      subscribed_newsletter: true,
    },
  });

  return (
    <div>
      <h3>Submission Statistics</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>Total: {stats?.total}</p>
          <p>Newsletter Subscribers: {stats?.newsletterSubscribers}</p>
          <p>This Month: {stats?.thisMonth}</p>
        </div>
      )}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};
```

### `useEmailCheck(options)`

Hook for checking email existence with debouncing.

```typescript
import { useEmailCheck } from '../hooks/useSupabase';

const EmailField = () => {
  const { checkEmail, exists, loading } = useEmailCheck({
    debounceMs: 500,
    onExists: (exists) => {
      if (exists) {
        console.log('Email already registered');
      }
    },
  });

  const handleEmailChange = (email: string) => {
    checkEmail(email);
  };

  return (
    <div>
      <input
        type="email"
        onChange={(e) => handleEmailChange(e.target.value)}
        className={exists ? 'border-yellow-500' : 'border-gray-300'}
      />
      {loading && <span>Checking...</span>}
      {exists && <span>Email already registered</span>}
    </div>
  );
};
```

### `useSupabaseConnection()`

Hook for monitoring Supabase connection status.

```typescript
import { useSupabaseConnection } from '../hooks/useSupabase';

const ConnectionStatus = () => {
  const { isConnected, lastError, retry } = useSupabaseConnection();

  if (!isConnected) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h3>Database Connection Error</h3>
        <p>{lastError}</p>
        <button onClick={retry}>Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-4">
      <h3>Connected to Database</h3>
    </div>
  );
};
```

## 🎯 Usage Examples

### Complete Form Implementation

```typescript
import React, { useState } from 'react';
import { useFormSubmission, useEmailCheck } from '../hooks/useSupabase';
import { validateAndSanitizeFormData } from '../utils/validation';
import type { FormData } from '../types';

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subscribed_newsletter: false,
  });

  const { submit, loading, success, error } = useFormSubmission({
    onSuccess: (data) => {
      console.log('Form submitted:', data);
      // Reset form or show success message
    },
  });

  const { checkEmail, exists: emailExists } = useEmailCheck({
    debounceMs: 500,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const { isValid, errors } = validateAndSanitizeFormData(formData);
    
    if (!isValid) {
      console.error('Validation errors:', errors);
      return;
    }

    // Check for duplicate email
    if (emailExists) {
      console.error('Email already registered');
      return;
    }

    // Submit form
    await submit(formData, 'landing_page');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Name"
        required
      />
      
      <input
        type="email"
        value={formData.email}
        onChange={(e) => {
          setFormData(prev => ({ ...prev, email: e.target.value }));
          checkEmail(e.target.value);
        }}
        placeholder="Email"
        required
        className={emailExists ? 'border-yellow-500' : ''}
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      
      {success && <div>Success!</div>}
      {error && <div>Error: {error}</div>}
    </form>
  );
};
```

### API Route Integration

```typescript
// pages/api/contact.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { submitInterestForm, toApiResponse } from '../../utils/database';
import { validateAndSanitizeFormData } from '../../utils/validation';
import type { FormData } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData: FormData = req.body;

    // Validate and sanitize form data
    const { isValid, errors, sanitizedData } = validateAndSanitizeFormData(formData);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    // Submit to database
    const result = await submitInterestForm(sanitizedData, 'api');

    // Convert to API response format
    const apiResponse = toApiResponse(result);

    return res.status(apiResponse.status).json(apiResponse);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      status: 500,
    });
  }
}
```

## 🚀 Best Practices

### 1. Always Validate Input
```typescript
// ❌ Bad
const result = await submitInterestForm(formData);

// ✅ Good
const { isValid, errors, sanitizedData } = validateAndSanitizeFormData(formData);
if (!isValid) {
  // Handle validation errors
  return;
}
const result = await submitInterestForm(sanitizedData);
```

### 2. Handle Loading States
```typescript
// ❌ Bad
const { submit } = useFormSubmission();

// ✅ Good
const { submit, loading, success, error } = useFormSubmission();
return (
  <button disabled={loading}>
    {loading ? 'Submitting...' : 'Submit'}
  </button>
);
```

### 3. Use Real-time Updates Sparingly
```typescript
// ❌ Bad - Enable real-time for everything
const { count } = useSubmissionCount({ enableRealtime: true });

// ✅ Good - Only for critical data
const { count } = useSubmissionCount({ 
  enableRealtime: true,
  refreshInterval: 30000, // 30 seconds
});
```

### 4. Implement Proper Error Handling
```typescript
// ❌ Bad
const result = await submitInterestForm(formData);

// ✅ Good
const result = await submitInterestForm(formData);
if (!result.success) {
  // Handle specific error types
  switch (result.error?.message) {
    case 'This email is already registered':
      // Handle duplicate email
      break;
    case 'Required fields are missing':
      // Handle validation error
      break;
    default:
      // Handle unknown error
      break;
  }
}
```

### 5. Monitor Connection Status
```typescript
// ✅ Good - Always check connection
const { isConnected } = useSupabaseConnection();

if (!isConnected) {
  return <div>Database connection unavailable</div>;
}
```

## 🔍 Testing

### Unit Testing Database Functions
```typescript
import { submitInterestForm, getSubmissionCount } from '../utils/database';

describe('Database Functions', () => {
  test('submitInterestForm should submit valid data', async () => {
    const formData: FormData = {
      name: 'Test User',
      email: 'test@example.com',
      subscribed_newsletter: true,
    };

    const result = await submitInterestForm(formData);
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  test('getSubmissionCount should return count', async () => {
    const result = await getSubmissionCount();
    expect(result.success).toBe(true);
    expect(typeof result.data).toBe('number');
  });
});
```

### Testing React Hooks
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useFormSubmission } from '../hooks/useSupabase';

describe('useFormSubmission', () => {
  test('should handle form submission', async () => {
    const { result } = renderHook(() => useFormSubmission());

    const formData: FormData = {
      name: 'Test User',
      email: 'test@example.com',
      subscribed_newsletter: false,
    };

    await act(async () => {
      await result.current.submit(formData);
    });

    expect(result.current.loading).toBe(false);
  });
});
```

## 📝 Deployment

### Environment Setup
1. Create a Supabase project
2. Set up the database tables using the provided SQL
3. Configure Row Level Security (RLS) policies
4. Add environment variables to your deployment platform

### RLS Policies Example
```sql
-- Enable RLS
ALTER TABLE interest_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON interest_submissions
  FOR INSERT WITH CHECK (true);

-- Allow anonymous reads for public data
CREATE POLICY "Allow anonymous reads" ON interest_submissions
  FOR SELECT USING (true);
```

### Netlify Deployment
1. Add environment variables in Netlify dashboard
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Deploy

## 🔗 Related Files

- `src/utils/supabase.ts` - Supabase client configuration
- `src/utils/database.ts` - Database operation functions
- `src/utils/database.types.ts` - TypeScript database types
- `src/hooks/useSupabase.ts` - Custom React hooks
- `src/components/SupabaseContactForm.tsx` - Example implementation
- `src/types/index.ts` - TypeScript interfaces
- `src/utils/validation.ts` - Form validation utilities
- `src/utils/constants.ts` - Application constants 