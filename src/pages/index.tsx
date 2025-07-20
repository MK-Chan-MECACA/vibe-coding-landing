import React from 'react';
import { NextPage } from 'next';
import Layout from '../components/Layout';
import { HeroSection } from '../components/HeroSection';
import { SocialProof } from '../components/SocialProof';
import { FormExample } from '../components/FormExample';
import { H2, H3, LeadText, Paragraph } from '../components/Typography';
import { ErrorBoundary } from '../components/ErrorBoundary';

/**
 * Main landing page for Vibe Coding Course
 */
const HomePage: NextPage = () => {
  // SEO configuration
  const seoConfig = {
    title: 'Vibe Coding Course - Build Your MVP in 30 Days',
    description: 'Learn to build and launch your MVP in just one month. Join thousands of developers mastering rapid development with Vibe Coding Course.',
    keywords: [
      'MVP development',
      'coding course',
      'web development',
      'startup',
      'programming',
      '30-day course',
      'rapid development',
      'full-stack development',
      'React',
      'Next.js',
      'TypeScript'
    ],
    canonical: 'https://vibecoding.com',
    ogImage: 'https://vibecoding.com/og-image.jpg',
    type: 'course' as const,
    publishedAt: '2024-01-01T00:00:00Z',
    modifiedAt: new Date().toISOString(),
  };

  // Structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Vibe Coding Course - Build Your MVP in 30 Days",
    "description": seoConfig.description,
    "provider": {
      "@type": "Organization",
      "name": "Vibe Coding",
      "url": "https://vibecoding.com"
    },
    "courseMode": "online",
    "educationalLevel": "beginner",
    "inLanguage": "en-US",
    "datePublished": seoConfig.publishedAt,
    "dateModified": seoConfig.modifiedAt,
    "author": {
      "@type": "Person",
      "name": "Vibe Coding Team"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "coursePrerequisites": "Basic programming knowledge",
    "educationalCredentialAwarded": "Certificate of Completion"
  };

  return (
    <Layout seo={seoConfig}>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Main Hero Section */}
      <ErrorBoundary fallback={<HeroFallback />}>
        <HeroSection
          formSource="main_landing"
          onFormSuccess={(data) => {
            console.log('Hero form submitted:', data);
            // Track conversion or redirect to thank you page
          }}
          onFormError={(error) => {
            console.error('Hero form error:', error);
            // Handle error (show toast, etc.)
          }}
        />
      </ErrorBoundary>

      {/* Social Proof Section */}
      <ErrorBoundary fallback={<SocialProofFallback />}>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <H2 className="text-gray-900 mb-4">
                Join Thousands of Developers
              </H2>
              <LeadText className="text-gray-600 max-w-3xl mx-auto">
                See how developers are building and launching their MVPs faster with our comprehensive course
              </LeadText>
            </div>
            <SocialProof />
          </div>
        </section>
      </ErrorBoundary>

      {/* Course Benefits Section */}
      <ErrorBoundary fallback={<BenefitsFallback />}>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <H2 className="text-gray-900 mb-4">
                Why Choose Vibe Coding Course?
              </H2>
              <LeadText className="text-gray-600 max-w-3xl mx-auto">
                Our comprehensive approach ensures you have everything needed to build and launch your MVP successfully
              </LeadText>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <H3 className="text-gray-900 mb-2">Rapid Development</H3>
                <Paragraph className="text-gray-600">
                  Learn modern frameworks and tools to build your MVP in just 30 days
                </Paragraph>
              </div>

              {/* Benefit 2 */}
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <H3 className="text-gray-900 mb-2">Proven Methods</H3>
                <Paragraph className="text-gray-600">
                  Industry-tested approaches that have helped thousands launch successfully
                </Paragraph>
              </div>

              {/* Benefit 3 */}
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <H3 className="text-gray-900 mb-2">Community Support</H3>
                <Paragraph className="text-gray-600">
                  Join a community of developers building and launching together
                </Paragraph>
              </div>
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* Course Curriculum Section */}
      <ErrorBoundary fallback={<CurriculumFallback />}>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <H2 className="text-gray-900 mb-4">
                What You'll Learn
              </H2>
              <LeadText className="text-gray-600 max-w-3xl mx-auto">
                A comprehensive curriculum designed to take you from idea to launched MVP
              </LeadText>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Week 1-2 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <H3 className="text-gray-900 mb-4">Weeks 1-2: Foundation</H3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Modern JavaScript & TypeScript
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    React & Next.js Fundamentals
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Database Design & Supabase
                  </li>
                </ul>
              </div>

              {/* Week 3-4 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <H3 className="text-gray-900 mb-4">Weeks 3-4: MVP Development</H3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    User Authentication & Authorization
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    API Development & Integration
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Deployment & Launch Strategy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ErrorBoundary>

      {/* Additional Form Section */}
      <ErrorBoundary fallback={<FormFallback />}>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FormExample />
          </div>
        </section>
      </ErrorBoundary>

      {/* FAQ Section */}
      <ErrorBoundary fallback={<FAQFallback />}>
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <H2 className="text-gray-900 mb-4">
                Frequently Asked Questions
              </H2>
              <LeadText className="text-gray-600">
                Everything you need to know about the Vibe Coding Course
              </LeadText>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <H3 className="text-gray-900 mb-2">How long does the course take?</H3>
                <Paragraph className="text-gray-600">
                  The course is designed to be completed in 30 days, with 2-3 hours of study per day. However, you can work at your own pace.
                </Paragraph>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <H3 className="text-gray-900 mb-2">What prerequisites do I need?</H3>
                <Paragraph className="text-gray-600">
                  Basic programming knowledge is helpful but not required. We start from the fundamentals and build up to advanced concepts.
                </Paragraph>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <H3 className="text-gray-900 mb-2">Do I get a certificate?</H3>
                <Paragraph className="text-gray-600">
                  Yes! Upon completion, you'll receive a certificate of completion that you can add to your portfolio and LinkedIn profile.
                </Paragraph>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <H3 className="text-gray-900 mb-2">What if I&apos;m not satisfied?</H3>
                <Paragraph className="text-gray-600">
                  We offer a 30-day money-back guarantee. If you&apos;re not completely satisfied, we&apos;ll refund your purchase, no questions asked.
                </Paragraph>
              </div>
            </div>
          </div>
        </section>
      </ErrorBoundary>
    </Layout>
  );
};

// Error Boundary Fallback Components
const HeroFallback: React.FC = () => (
  <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <H2 className="text-white mb-4">Vibe Coding Course</H2>
      <Paragraph className="text-blue-100 mb-8">
        Build your MVP in 30 days. Something went wrong loading the full experience.
      </Paragraph>
      <a
        href="#contact"
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
      >
        Get Started
      </a>
    </div>
  </section>
);

const SocialProofFallback: React.FC = () => (
  <div className="text-center py-8">
    <Paragraph className="text-gray-600">Loading community stats...</Paragraph>
  </div>
);

const BenefitsFallback: React.FC = () => (
  <div className="text-center py-8">
    <Paragraph className="text-gray-600">Loading course benefits...</Paragraph>
  </div>
);

const CurriculumFallback: React.FC = () => (
  <div className="text-center py-8">
    <Paragraph className="text-gray-600">Loading curriculum...</Paragraph>
  </div>
);

const FormFallback: React.FC = () => (
  <div className="text-center py-8">
    <Paragraph className="text-gray-600">Loading form...</Paragraph>
  </div>
);

const FAQFallback: React.FC = () => (
  <div className="text-center py-8">
    <Paragraph className="text-gray-600">Loading FAQ...</Paragraph>
  </div>
);

export default HomePage; 