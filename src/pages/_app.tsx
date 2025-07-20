import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Global CSS imports
import '../styles/globals.css';

/**
 * Custom App component for Next.js
 * Handles global configurations, error boundaries, and performance monitoring
 */
function MyApp({ Component, pageProps }: AppProps) {
  // Global error handler
  const handleGlobalError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error caught:', error, errorInfo);
    }

    // In production, you would send this to an error tracking service
    // Example: Sentry.captureException(error);
    
    // You could also send to your analytics service
    // Example: analytics.track('error', { error: error.message, stack: error.stack });
  };

  // Performance monitoring
  React.useEffect(() => {
    // Track page views
    const trackPageView = () => {
      if (typeof window !== 'undefined') {
        // Example: analytics.track('page_view', { path: window.location.pathname });
        console.log('Page view:', window.location.pathname);
      }
    };

    // Track performance metrics
    const trackPerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const metrics = {
            loadTime: navigation.loadEventEnd - navigation.loadEventStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
            firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
          };
          
          console.log('Performance metrics:', metrics);
          // Example: analytics.track('performance', metrics);
        }
      }
    };

    // Track Core Web Vitals
    const trackCoreWebVitals = () => {
      if ('web-vital' in window) {
        // Example: webVitals.getCLS(console.log);
        // Example: webVitals.getFID(console.log);
        // Example: webVitals.getFCP(console.log);
        // Example: webVitals.getLCP(console.log);
        // Example: webVitals.getTTFB(console.log);
      }
    };

    // Initialize tracking
    trackPageView();
    trackPerformance();
    trackCoreWebVitals();

    // Track route changes
    const handleRouteChange = (url: string) => {
      console.log('Route change:', url);
      // Example: analytics.track('route_change', { url });
    };

    // Add route change listener if available
    if (typeof window !== 'undefined' && 'addEventListener' in window) {
      const handlePopState = () => handleRouteChange(window.location.pathname);
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        // Cleanup listeners
        if (typeof window !== 'undefined' && 'removeEventListener' in window) {
          window.removeEventListener('popstate', handlePopState);
        }
      };
    }
  }, []);

  return (
    <>
      <Head>
        {/* Global meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Font optimization */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          as="style"
          onLoad={(e) => {
            const target = e.target as HTMLLinkElement;
            target.onload = null;
            target.rel = 'stylesheet';
          }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </noscript>
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance optimizations */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* PWA meta tags */}
        <meta name="application-name" content="Vibe Coding" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vibe Coding" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Structured data for the app */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Vibe Coding Course",
              "description": "Learn to build and launch your MVP in just one month",
              "url": "https://vibecoding.com",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </Head>

      {/* Global error boundary */}
      <ErrorBoundary
        onError={handleGlobalError}
        errorMessage="Something went wrong with the application"
        logErrors={process.env.NODE_ENV === 'development'}
      >
        <Component {...pageProps} />
      </ErrorBoundary>

      {/* Global styles for focus management */}
      <style jsx global>{`
        /* Focus management for accessibility */
        *:focus {
          outline: 2px solid #3B82F6;
          outline-offset: 2px;
        }
        
        /* Skip to content link */
        .skip-to-content {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #3B82F6;
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 1000;
        }
        
        .skip-to-content:focus {
          top: 6px;
        }
        
        /* Reduced motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          * {
            border-color: currentColor !important;
          }
        }
      `}</style>
    </>
  );
}

export default MyApp; 