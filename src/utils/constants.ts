import type { BreakpointConfig, AnimationConfig } from '../types';

// Application constants

export const SITE_CONFIG = {
  name: 'Vibe Coding',
  description: 'Your gateway to modern web development',
  url: 'https://vibe-coding.com',
  email: 'contact@vibe-coding.com',
  phone: '+1 (555) 123-4567',
  address: '123 Tech Street, Silicon Valley, CA 94025',
} as const;

export const NAVIGATION = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/vibecoding',
  github: 'https://github.com/vibecoding',
  linkedin: 'https://linkedin.com/company/vibecoding',
  instagram: 'https://instagram.com/vibecoding',
  youtube: 'https://youtube.com/@vibecoding',
} as const;

/**
 * Form validation rules and constraints
 */
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
  message: {
    minLength: 10,
    maxLength: 1000,
    required: false,
  },
  company: {
    minLength: 2,
    maxLength: 100,
    required: false,
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    required: false,
  },
} as const;

/**
 * Error messages for form validation
 */
export const ERROR_MESSAGES = {
  required: (field: string) => `${field} is required`,
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters long`,
  maxLength: (field: string, max: number) => `${field} must be no more than ${max} characters long`,
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number',
  invalidName: 'Name can only contain letters, spaces, hyphens, and apostrophes',
  invalidFormat: (field: string) => `Invalid ${field} format`,
  networkError: 'Network error. Please try again.',
  serverError: 'Server error. Please try again later.',
  unknownError: 'An unexpected error occurred.',
} as const;

/**
 * Success messages for user feedback
 */
export const SUCCESS_MESSAGES = {
  formSubmitted: 'Thank you! Your message has been sent successfully.',
  newsletterSubscribed: 'Successfully subscribed to our newsletter!',
  contactCreated: 'Contact information saved successfully.',
  profileUpdated: 'Profile updated successfully.',
  passwordChanged: 'Password changed successfully.',
  emailSent: 'Email sent successfully.',
} as const;

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  testimonials: '/api/testimonials',
  projects: '/api/projects',
  blog: '/api/blog',
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
  },
} as const;

/**
 * Animation durations and configurations
 */
export const ANIMATIONS: Record<string, AnimationConfig> = {
  fadeIn: {
    duration: 300,
    easing: 'ease-in-out',
  },
  slideUp: {
    duration: 400,
    easing: 'ease-out',
  },
  slideDown: {
    duration: 400,
    easing: 'ease-in',
  },
  scale: {
    duration: 200,
    easing: 'ease-in-out',
  },
  bounce: {
    duration: 600,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  shake: {
    duration: 500,
    easing: 'ease-in-out',
  },
} as const;

/**
 * Breakpoint values for responsive design
 */
export const BREAKPOINTS: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Color palette for consistent theming
 */
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    900: '#0f172a',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
  },
} as const;

/**
 * Z-index values for consistent layering
 */
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

/**
 * Spacing scale for consistent layout
 */
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
} as const;

/**
 * Border radius values
 */
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
} as const; 