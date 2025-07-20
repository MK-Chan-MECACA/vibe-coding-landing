import React from 'react';
import { InterestForm } from './InterestForm';
import { SocialProof, EnhancedSocialProof, CompactSocialProof } from './SocialProof';
import { Alert } from './ui';

/**
 * Example component demonstrating InterestForm and SocialProof usage
 */
export const FormExample: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Join the Vibe Coding Community
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Be among the first to experience our revolutionary MVP development platform.
          Get early access, exclusive updates, and join a community of developers building the future.
        </p>
        
        {/* Social Proof */}
        <div className="mt-6">
          <SocialProof
            messageFormat="Join {count}+ developers building MVPs faster"
            enableRealtime={true}
            refreshInterval={30000}
            className="text-lg font-medium text-blue-600"
          />
        </div>
      </div>

      {/* Main Form Section */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <div>
          <InterestForm
            source="landing_page_example"
            showNewsletter={true}
            successMessage="Welcome to the community! We'll notify you when we launch."
            onSuccess={(data) => {
              console.log('Form submitted successfully:', data);
              // You can add analytics tracking here
            }}
            onError={(error) => {
              console.error('Form submission failed:', error);
              // You can add error tracking here
            }}
          />
        </div>

        {/* Benefits */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Why Join Our Waitlist?
            </h3>
            <ul className="space-y-3 text-sm text-blue-800">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Early access to our MVP development platform</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Exclusive updates and feature announcements</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Join a community of innovative developers</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Special launch discounts for early adopters</span>
              </li>
            </ul>
          </div>

          {/* Enhanced Social Proof */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Community Stats
            </h4>
            <EnhancedSocialProof
              showStats={true}
              statsFormat="{newsletterSubscribers} newsletter subscribers • {thisMonth} joined this month"
              enableRealtime={true}
              refreshInterval={60000}
            />
          </div>
        </div>
      </div>

      {/* Footer Social Proof */}
      <div className="text-center pt-8 border-t border-gray-200">
        <CompactSocialProof
          messageFormat="Already {count}+ developers waiting"
          className="text-sm text-gray-500"
        />
      </div>

      {/* Information Alert */}
      <Alert
        variant="info"
        title="What happens next?"
        message="After joining our waitlist, you'll receive a confirmation email. We'll keep you updated on our progress and notify you as soon as we launch. No spam, just valuable updates about our platform."
        className="max-w-2xl mx-auto"
      />
    </div>
  );
};

/**
 * Compact form example for smaller spaces
 */
export const CompactFormExample: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Get Early Access
        </h2>
        <CompactSocialProof className="text-sm text-gray-600 mb-4" />
      </div>
      
      <InterestForm
        source="compact_example"
        showNewsletter={false}
        successMessage="You're on the list! We'll be in touch soon."
      />
    </div>
  );
};

/**
 * Hero form example for landing pages
 */
export const HeroFormExample: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Build MVPs Faster Than Ever
            </h1>
            <p className="text-xl text-gray-600">
              Join thousands of developers who are already building and launching their ideas faster with our revolutionary platform.
            </p>
            
            <div className="space-y-4">
              <SocialProof
                messageFormat="Join {count}+ developers building MVPs faster"
                className="text-lg font-medium text-blue-600"
              />
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free early access</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <InterestForm
              source="hero_section"
              showNewsletter={true}
              successMessage="Welcome aboard! You'll be the first to know when we launch."
              className="bg-white shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 