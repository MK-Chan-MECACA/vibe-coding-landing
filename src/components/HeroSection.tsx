import React from 'react';
import { InterestForm } from './InterestForm';
import { SocialProof } from './SocialProof';
import { H1, H2, LeadText, Paragraph } from './Typography';
import { Button } from './ui';

/**
 * Hero section component props interface
 */
interface HeroSectionProps {
  /** Additional CSS classes */
  className?: string;
  /** Custom title */
  title?: string;
  /** Custom subtitle */
  subtitle?: string;
  /** Custom description */
  description?: string;
  /** Form source identifier */
  formSource?: string;
  /** Whether to show newsletter subscription */
  showNewsletter?: boolean;
  /** Custom success message */
  successMessage?: string;
  /** Callback when form is successfully submitted */
  onFormSuccess?: (data: any) => void;
  /** Callback when form submission fails */
  onFormError?: (error: string) => void;
}

/**
 * Default hero content
 */
const defaultContent = {
  title: 'Vibe Coding Course',
  subtitle: 'Release your MVP within a month',
  description: 'Learn the essential skills and frameworks to build and launch your minimum viable product in just 30 days. Join thousands of developers who\'ve transformed their ideas into reality.',
  formSource: 'hero_section',
  successMessage: 'Welcome aboard! You\'ll be the first to know when we launch.',
};

/**
 * Main hero section component with responsive grid layout
 * 
 * @example
 * ```tsx
 * <HeroSection
 *   formSource="landing_page"
 *   showNewsletter={true}
 *   onFormSuccess={(data) => console.log('Form submitted:', data)}
 * />
 * ```
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  className = '',
  title = defaultContent.title,
  subtitle = defaultContent.subtitle,
  description = defaultContent.description,
  formSource = defaultContent.formSource,
  showNewsletter = true,
  successMessage = defaultContent.successMessage,
  onFormSuccess,
  onFormError,
}) => {
  return (
    <section 
      className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-20 lg:py-24 ${className}`}
      aria-labelledby="hero-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content (60% on desktop) */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              New Course Launch
            </div>
            
            {/* Main Title */}
            <div className="space-y-4">
              <H1 
                id="hero-title"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
                weight="extrabold"
              >
                {title}
              </H1>
              
              {/* Subtitle */}
              <H2 
                className="text-xl sm:text-2xl font-semibold text-blue-600 leading-tight"
                weight="semibold"
                color="primary"
              >
                {subtitle}
              </H2>
            </div>
            
            {/* Description */}
            <LeadText 
              className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed"
              color="muted"
            >
              {description}
            </LeadText>
            
            {/* Social Proof */}
            <div className="space-y-4">
              <SocialProof
                messageFormat="Join {count}+ developers building MVPs faster"
                enableRealtime={true}
                refreshInterval={30000}
                className="text-lg font-medium text-blue-600"
              />
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Certificate included</span>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                className="text-base font-semibold px-8 py-4"
                onClick={() => {
                  // Scroll to form
                  const formElement = document.getElementById('hero-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get Early Access
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="text-base font-semibold px-8 py-4"
                onClick={() => {
                  // Open course preview or video
                  window.open('#course-preview', '_blank');
                }}
              >
                Watch Preview
              </Button>
            </div>
          </div>
          
          {/* Right Column - Form (40% on desktop) */}
          <div className="lg:col-span-2">
            <div 
              id="hero-form"
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8"
            >
              {/* Form Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Join the Waitlist
                </h3>
                <Paragraph className="text-gray-600">
                  Be among the first to access this exclusive course
                </Paragraph>
              </div>
              
              {/* Interest Form */}
              <InterestForm
                source={formSource}
                showNewsletter={showNewsletter}
                successMessage={successMessage}
                onSuccess={onFormSuccess}
                onError={onFormError}
                className="space-y-4"
              />
            </div>
          </div>
        </div>
        
        {/* Bottom decoration */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-6">
              <span>Trusted by developers worldwide</span>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"
                    />
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Secure checkout</span>
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Compact hero section for smaller spaces
 */
export const CompactHeroSection: React.FC<HeroSectionProps> = (props) => {
  return (
    <HeroSection
      {...props}
      className="py-12 sm:py-16"
    />
  );
};

/**
 * Hero section with background image
 */
export const HeroSectionWithBackground: React.FC<HeroSectionProps & {
  backgroundImage?: string;
}> = ({ backgroundImage, ...props }) => {
  return (
    <section 
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative">
        <HeroSection {...props} />
      </div>
    </section>
  );
}; 