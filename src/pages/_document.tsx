import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';

/**
 * Custom Document component for Next.js
 * Handles server-side rendering, font preloading, and global HTML structure
 */
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          {/* Character encoding */}
          <meta charSet="utf-8" />
          
          {/* Viewport configuration */}
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          
          {/* Theme color setup */}
          <meta name="theme-color" content="#3B82F6" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#1E40AF" media="(prefers-color-scheme: dark)" />
          
          {/* Color scheme */}
          <meta name="color-scheme" content="light dark" />
          
          {/* Font preloading for performance */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            as="style"
          />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          
          {/* DNS prefetch for external resources */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Favicon and app icons */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          
          {/* PWA meta tags */}
          <meta name="application-name" content="Vibe Coding" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Vibe Coding" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#3B82F6" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          
          {/* Security headers */}
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="DENY" />
          <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
          <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
          
          {/* Performance optimizations */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="format-detection" content="telephone=no" />
          
          {/* Open Graph default meta tags */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Vibe Coding" />
          <meta property="og:locale" content="en_US" />
          
          {/* Twitter Card default meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@vibecoding" />
          <meta name="twitter:creator" content="@vibecoding" />
          
          {/* Structured data for the website */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Vibe Coding",
                "description": "Learn to build and launch your MVP in just one month",
                "url": "https://vibecoding.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://vibecoding.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Vibe Coding",
                  "url": "https://vibecoding.com"
                }
              })
            }}
          />
          
          {/* Critical CSS for above-the-fold content */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                /* Critical CSS for initial render */
                html {
                  scroll-behavior: smooth;
                }
                
                body {
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  line-height: 1.6;
                  color: #1f2937;
                  background-color: #ffffff;
                }
                
                /* Skip to content link */
                .skip-to-content {
                  position: absolute;
                  top: -40px;
                  left: 6px;
                  background: #3B82F6;
                  color: white;
                  padding: 8px 16px;
                  text-decoration: none;
                  border-radius: 4px;
                  z-index: 1000;
                  font-weight: 500;
                }
                
                .skip-to-content:focus {
                  top: 6px;
                }
                
                /* Focus management */
                *:focus {
                  outline: 2px solid #3B82F6;
                  outline-offset: 2px;
                }
                
                /* Reduced motion support */
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
                
                /* Dark mode support */
                @media (prefers-color-scheme: dark) {
                  body {
                    color: #f9fafb;
                    background-color: #111827;
                  }
                }
              `,
            }}
          />
        </Head>
        
        <body className="antialiased">
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          
          {/* Main application */}
          <Main />
          
          {/* Next.js scripts */}
          <NextScript />
          
          {/* Performance monitoring script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Performance monitoring
                if ('performance' in window) {
                  window.addEventListener('load', function() {
                    setTimeout(function() {
                      const navigation = performance.getEntriesByType('navigation')[0];
                      if (navigation) {
                        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
                        console.log('Page load time:', loadTime + 'ms');
                      }
                    }, 0);
                  });
                }
                
                // Error tracking
                window.addEventListener('error', function(e) {
                  console.error('Global error:', e.error);
                });
                
                // Unhandled promise rejection tracking
                window.addEventListener('unhandledrejection', function(e) {
                  console.error('Unhandled promise rejection:', e.reason);
                });
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 