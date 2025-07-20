# UI Components Documentation

This document provides comprehensive documentation for the reusable UI components in the Vibe Coding landing page project.

## 📁 File Structure

```
src/components/ui/
├── Button.tsx              # Reusable button component
├── Input.tsx               # Reusable input component
├── Checkbox.tsx            # Reusable checkbox component
├── LoadingSpinner.tsx      # Loading indicator component
├── Alert.tsx               # Alert/notification component
├── index.ts                # Component exports
├── UIComponentsExample.tsx # Example usage component
└── README.md               # This documentation
```

## 🎨 Design Tokens

### Colors
- **Primary Blue**: `#3B82F6` (blue-500)
- **Text Dark**: `#1F2937` (gray-800)
- **Text Medium**: `#6B7280` (gray-500)

### Typography
- **Font Family**: Inter (configured in TailwindCSS)
- **Base Unit**: 8px spacing system

### Border Radius
- **Buttons**: 8px (rounded-lg)
- **Inputs**: 6px (rounded-md)

## 🧩 Components

### Button Component

A versatile button component with multiple variants, sizes, and states.

#### Props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
  // ... all standard button HTML attributes
}
```

#### Usage Examples

```tsx
import { Button } from '../components/ui';

// Basic usage
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>

// Loading state
<Button variant="primary" loading loadingText="Saving...">
  Save Changes
</Button>

// With icons
<Button 
  variant="secondary" 
  leftIcon={<PlusIcon />}
  rightIcon={<ArrowIcon />}
>
  Add Item
</Button>

// Full width
<Button variant="primary" fullWidth>
  Submit Form
</Button>
```

#### Variants

- **Primary**: Blue background with white text
- **Secondary**: Gray background with dark text
- **Ghost**: Transparent background with hover effects
- **Danger**: Red background for destructive actions

#### Sizes

- **Small**: `px-3 py-1.5 text-sm`
- **Medium**: `px-4 py-2 text-sm` (default)
- **Large**: `px-6 py-3 text-base`

### Input Component

A comprehensive input component with validation states, icons, and accessibility features.

#### Props

```typescript
interface InputProps {
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  required?: boolean;
  wrapperClassName?: string;
  // ... all standard input HTML attributes
}
```

#### Usage Examples

```tsx
import { Input } from '../components/ui';

// Basic input
<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
/>

// With error state
<Input
  label="Username"
  error="Username is already taken"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

// With icons
<Input
  label="Search"
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
  placeholder="Search..."
/>

// With helper text
<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
  required
/>
```

#### Features

- **Automatic ID generation** for accessibility
- **Error state styling** with red borders and background
- **Icon support** for left and right positioning
- **Required field indicators** with asterisk
- **Helper text** for additional guidance
- **Full width option** for responsive design

### Checkbox Component

A custom checkbox component with proper accessibility and styling.

#### Props

```typescript
interface CheckboxProps {
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  // ... all standard checkbox HTML attributes
}
```

#### Usage Examples

```tsx
import { Checkbox } from '../components/ui';

// Basic checkbox
<Checkbox
  label="Subscribe to newsletter"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>

// With error state
<Checkbox
  label="Accept terms"
  error="You must accept the terms"
  required
/>

// With helper text
<Checkbox
  label="Remember me"
  helperText="Stay signed in for 30 days"
  checked={rememberMe}
  onChange={(e) => setRememberMe(e.target.checked)}
/>
```

#### Features

- **Custom styling** with TailwindCSS
- **Proper accessibility** with ARIA attributes
- **Error state support** with red styling
- **Helper text** for additional context
- **Required field indicators**

### LoadingSpinner Component

A configurable loading spinner with smooth animations.

#### Props

```typescript
interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'white' | 'gray' | 'blue' | 'red';
  className?: string;
  'aria-label'?: string;
}
```

#### Usage Examples

```tsx
import { LoadingSpinner } from '../components/ui';

// Basic spinner
<LoadingSpinner />

// Different sizes
<LoadingSpinner size="sm" />
<LoadingSpinner size="lg" />

// Different colors
<LoadingSpinner color="blue" />
<LoadingSpinner color="white" />

// With custom label
<LoadingSpinner aria-label="Loading content" />
```

#### Sizes

- **Extra Small**: `w-3 h-3`
- **Small**: `w-4 h-4`
- **Medium**: `w-5 h-5` (default)
- **Large**: `w-6 h-6`
- **Extra Large**: `w-8 h-8`

### Alert Component

A flexible alert component with multiple variants and dismissible functionality.

#### Props

```typescript
interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  children?: React.ReactNode;
}
```

#### Usage Examples

```tsx
import { Alert } from '../components/ui';

// Basic alert
<Alert variant="success" title="Success!" message="Operation completed." />

// With custom content
<Alert variant="error" title="Error!">
  <p>Something went wrong. Please try again.</p>
  <button onClick={retry}>Retry</button>
</Alert>

// Dismissible alert
<Alert
  variant="warning"
  title="Warning"
  message="Please review your input."
  dismissible
  onDismiss={() => setShowAlert(false)}
/>

// With custom icon
<Alert
  variant="info"
  title="Information"
  icon={<CustomIcon />}
  message="Here's some helpful information."
/>
```

#### Variants

- **Success**: Green styling for positive feedback
- **Error**: Red styling for error messages
- **Warning**: Yellow styling for warnings
- **Info**: Blue styling for informational messages

## 🎯 Best Practices

### 1. Accessibility

All components include proper accessibility features:

```tsx
// Proper labeling
<Input label="Email" id="email-input" />

// Error states
<Input error="Invalid email" aria-invalid="true" />

// Loading states
<Button loading aria-label="Loading, please wait" />
```

### 2. Form Validation

Use components with validation utilities:

```tsx
import { validateAndSanitizeFormData } from '../../utils/validation';

const handleSubmit = (formData) => {
  const { isValid, errors, sanitizedData } = validateAndSanitizeFormData(formData);
  
  if (!isValid) {
    // Handle validation errors
    return;
  }
  
  // Submit sanitized data
};
```

### 3. Responsive Design

Use fullWidth prop for responsive layouts:

```tsx
// Mobile-first approach
<Input fullWidth label="Email" />
<Button fullWidth variant="primary">Submit</Button>
```

### 4. State Management

Handle loading and error states properly:

```tsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

return (
  <div>
    {error && <Alert variant="error" message={error} dismissible />}
    <Button loading={loading} disabled={loading}>
      {loading ? 'Saving...' : 'Save'}
    </Button>
  </div>
);
```

## 🔧 Integration with Supabase

### Form Submission Example

```tsx
import { useFormSubmission } from '../../hooks/useSupabase';
import { Button, Input, Alert } from '../ui';

const ContactForm = () => {
  const { submit, loading, success, error } = useFormSubmission();
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit(formData, 'landing_page');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
      />
      
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        required
      />
      
      <Button type="submit" loading={loading} fullWidth>
        Submit
      </Button>
      
      {success && <Alert variant="success" message="Form submitted successfully!" />}
      {error && <Alert variant="error" message={error} />}
    </form>
  );
};
```

## 🎨 Customization

### Theme Customization

Components use TailwindCSS classes that can be customized in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
      },
      borderRadius: {
        'lg': '8px',
        'md': '6px',
      },
    },
  },
};
```

### Component Composition

Components are designed for composition:

```tsx
// Custom button with icon
<Button variant="primary" leftIcon={<CustomIcon />}>
  Custom Action
</Button>

// Custom input with validation
<Input
  label="Custom Field"
  error={customError}
  helperText="Custom helper text"
  leftIcon={<FieldIcon />}
/>
```

## 🧪 Testing

### Component Testing Example

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, Input } from '../ui';

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state', () => {
    render(<Button loading loadingText="Loading...">Submit</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('Input Component', () => {
  test('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  test('shows error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
```

## 📱 Responsive Design

### Mobile-First Approach

All components are designed with mobile-first responsive design:

```tsx
// Responsive form layout
<div className="space-y-4 md:space-y-6">
  <Input fullWidth label="Name" />
  <Input fullWidth label="Email" />
  <Button fullWidth variant="primary">Submit</Button>
</div>
```

### Breakpoint Considerations

- **Mobile**: Full width components, stacked layout
- **Tablet**: Moderate spacing, side-by-side where appropriate
- **Desktop**: Optimal spacing, multi-column layouts

## 🔗 Related Files

- `src/utils/validation.ts` - Form validation utilities
- `src/hooks/useSupabase.ts` - Supabase integration hooks
- `src/types/index.ts` - TypeScript interfaces
- `src/utils/constants.ts` - Application constants
- `tailwind.config.js` - TailwindCSS configuration 