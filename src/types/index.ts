// Common types for the application

export interface MetaData {
  title: string;
  description: string;
  keywords?: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Form data interface for contact/newsletter forms
 */
export interface FormData {
  name: string;
  email: string;
  subscribed_newsletter: boolean;
  message?: string;
  company?: string;
  phone?: string;
}

/**
 * API response interface for form submissions
 */
export interface SubmissionResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    created_at: string;
    email: string;
  };
  errors?: ValidationError[];
}

/**
 * Validation error interface for form validation
 */
export interface ValidationError {
  field: keyof FormData;
  message: string;
  code: string;
}

/**
 * Generic API response interface
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationError[];
  timestamp: string;
  status: number;
}

/**
 * Social proof data interface for testimonials/reviews
 */
export interface SocialProofData {
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

/**
 * Form validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Animation configuration interface
 */
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  direction?: 'normal' | 'reverse' | 'alternate';
}

/**
 * Breakpoint configuration interface
 */
export interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

/**
 * Error handling interface
 */
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
  userFriendly?: boolean;
} 