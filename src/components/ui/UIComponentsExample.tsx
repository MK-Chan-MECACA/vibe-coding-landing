import React, { useState } from 'react';
import { Button, Input, Checkbox, LoadingSpinner, Alert } from './index';

/**
 * Example component demonstrating all UI components
 */
export const UIComponentsExample: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subscribed: false,
  });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setAlertVariant('success');
    setShowAlert(true);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">UI Components Example</h2>

      {/* Loading Spinner Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Loading Spinners</h3>
        <div className="flex items-center space-x-4">
          <LoadingSpinner size="xs" color="blue" />
          <LoadingSpinner size="sm" color="gray" />
          <LoadingSpinner size="md" color="red" />
          <LoadingSpinner size="lg" color="blue" />
          <LoadingSpinner size="xl" color="gray" />
        </div>
      </div>

      {/* Alert Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Alerts</h3>
        <div className="space-y-2">
          <Alert variant="success" title="Success!" message="Operation completed successfully." />
          <Alert variant="error" title="Error!" message="Something went wrong. Please try again." />
          <Alert variant="warning" title="Warning!" message="Please review your input." />
          <Alert variant="info" title="Info" message="Here's some helpful information." />
          
          <Alert 
            variant="success" 
            dismissible 
            onDismiss={() => console.log('Alert dismissed')}
          >
            <p>This is a dismissible alert with custom content.</p>
          </Alert>
        </div>
      </div>

      {/* Button Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Buttons</h3>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="sm">Primary Small</Button>
            <Button variant="primary" size="md">Primary Medium</Button>
            <Button variant="primary" size="lg">Primary Large</Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button loading loadingText="Loading...">Loading Button</Button>
            <Button disabled>Disabled Button</Button>
            <Button fullWidth>Full Width Button</Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
            >
              With Left Icon
            </Button>
            
            <Button 
              rightIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              With Right Icon
            </Button>
          </div>
        </div>
      </div>

      {/* Form Example */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Form Example</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            fullWidth
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={formData.email && !formData.email.includes('@') ? 'Please enter a valid email' : undefined}
            required
            fullWidth
          />
          
          <Checkbox
            label="Subscribe to newsletter"
            checked={formData.subscribed}
            onChange={(e) => handleInputChange('subscribed', e.target.checked)}
            helperText="Receive updates about new features and announcements"
          />
          
          <Button 
            type="submit" 
            loading={loading}
            loadingText="Submitting..."
            fullWidth
          >
            Submit Form
          </Button>
        </form>
      </div>

      {/* Dynamic Alert */}
      {showAlert && (
        <Alert
          variant={alertVariant}
          title="Form Submitted!"
          message="Thank you for your submission. We'll get back to you soon."
          dismissible
          onDismiss={() => setShowAlert(false)}
        />
      )}

      {/* Error State Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Error States</h3>
        <Input
          label="Username"
          placeholder="Enter username"
          error="Username is already taken"
          fullWidth
        />
        
        <Checkbox
          label="Accept terms and conditions"
          error="You must accept the terms to continue"
          required
        />
      </div>

      {/* Helper Text Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Helper Text</h3>
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          helperText="Password must be at least 8 characters long"
          fullWidth
        />
        
        <Checkbox
          label="Remember me"
          helperText="Stay signed in for 30 days"
        />
      </div>
    </div>
  );
}; 