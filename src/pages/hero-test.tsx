import React from 'react';
import Layout from '../components/Layout';
import { HeroSection } from '../components/HeroSection';
import { H1, H2, Paragraph } from '../components/Typography';

const HeroTestPage: React.FC = () => {
  return (
    <Layout
      seo={{
        title: 'Hero Section Test',
        description: 'Testing the new HeroSection component',
      }}
    >
      {/* Test the main HeroSection */}
      <HeroSection
        formSource="test_page"
        onFormSuccess={(data) => {
          console.log('Test form submitted:', data);
          alert('Form submitted successfully!');
        }}
        onFormError={(error) => {
          console.error('Test form error:', error);
          alert('Form error: ' + error);
        }}
      />

      {/* Test content below */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <H1 className="mb-4">Hero Section Test</H1>
            <H2 className="mb-4" color="primary">Component Verification</H2>
            <Paragraph className="max-w-2xl mx-auto">
              This page tests the new HeroSection component with all its features including:
              responsive design, form integration, social proof, and typography components.
            </Paragraph>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HeroTestPage; 