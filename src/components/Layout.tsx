import React from 'react';
import Head from 'next/head';

/**
 * SEO meta data interface
 */
interface SEOMetaData {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Page keywords */
  keywords?: string[];
  /** Canonical URL */
  canonical?: string;
  /** Open Graph image */
  ogImage?: string;
  /** Twitter card type */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Author name */
  author?: string;
  /** Page type for structured data */
  type?: 'website' | 'article' | 'course' | 'product';
  /** Published date */
  publishedAt?: string;
  /** Modified date */
  modifiedAt?: string;
}

/**
 * Layout component props interface
 */
interface LayoutProps {
  /** Page content */
  children: React.ReactNode;
  /** SEO meta data */
  seo?: SEOMetaData;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show header */
  showHeader?: boolean;
  /** Whether to show footer */
  showFooter?: boolean;
  /** Custom header content */
  headerContent?: React.ReactNode;
  /** Custom footer content */
  footerContent?: React.ReactNode;
}

/**
 * Default SEO configuration
 */
const defaultSEO: SEOMetaData = {
  title: 'Vibe Coding Course - Release your MVP within a month',
  description: 'Learn the essential skills and frameworks to build and launch your minimum viable product in just 30 days. Join thousands of developers who\'ve transformed their ideas into reality.',
  keywords: ['coding', 'MVP', 'development', 'course', 'programming', 'web development', 'startup'],
  type: 'course',
  author: 'Vibe Coding',
  twitterCard: 'summary_large_image',
};

/**
 * Page layout wrapper with SEO optimization and semantic HTML structure
 * 
 * @example
 * ```tsx
 * <Layout
 *   seo={{
 *     title: 'Custom Page Title',
 *     description: 'Custom page description',
 *   }}
 * >
 *   <YourPageContent />
 * </Layout>
 * ```
 */
export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  seo = {},
  className = '',
  showHeader = true,
  showFooter = true,
  headerContent,
  footerContent,
}) => {
  // Merge default SEO with provided SEO
  const finalSEO = { ...defaultSEO, ...seo };
  
  // Generate full title
  const fullTitle = finalSEO.title 
    ? `${finalSEO.title} | Vibe Coding`
    : 'Vibe Coding - Build MVPs Faster';
  
  // Generate keywords string
  const keywordsString = finalSEO.keywords?.join(', ') || '';
  
  // Generate canonical URL - SSR safe
  const canonicalUrl = finalSEO.canonical || '';

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={finalSEO.description} />
        <meta name="keywords" content={keywordsString} />
        <meta name="author" content={finalSEO.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#3B82F6" />
        
        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {!canonicalUrl && <link rel="canonical" href="https://vibecoding.com" />}
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Font Preloading */}
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />
        <link 
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={finalSEO.description} />
        <meta property="og:type" content={finalSEO.type} />
        <meta property="og:url" content={canonicalUrl || 'https://vibecoding.com'} />
        <meta property="og:site_name" content="Vibe Coding" />
        {finalSEO.ogImage && <meta property="og:image" content={finalSEO.ogImage} />}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={finalSEO.twitterCard} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={finalSEO.description} />
        {finalSEO.ogImage && <meta name="twitter:image" content={finalSEO.ogImage} />}
        <meta name="twitter:site" content="@vibecoding" />
        <meta name="twitter:creator" content="@vibecoding" />
        
        {/* Structured Data */}
        {finalSEO.type === 'course' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Course",
                "name": "Vibe Coding Course",
                "description": finalSEO.description,
                "provider": {
                  "@type": "Organization",
                  "name": "Vibe Coding",
                  "url": "https://vibecoding.com"
                },
                "courseMode": "online",
                "educationalLevel": "beginner",
                "inLanguage": "en-US",
                "datePublished": finalSEO.publishedAt,
                "dateModified": finalSEO.modifiedAt,
                "author": {
                  "@type": "Person",
                  "name": finalSEO.author
                }
              })
            }}
          />
        )}
        
        {/* Performance Optimizations */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </Head>
      
      <div className={`min-h-screen bg-white flex flex-col ${className}`}>
        {/* Header */}
        {showHeader && (
          <header 
            className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
            role="banner"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {headerContent || (
                  <nav className="flex items-center justify-between w-full">
                    <div className="text-2xl font-bold text-gray-900">
                      <a 
                        href="/" 
                        className="hover:text-blue-600 transition-colors duration-200"
                        aria-label="Vibe Coding Home"
                      >
                        Vibe Coding
                      </a>
                    </div>
                    <div className="hidden md:flex space-x-8">
                      <a 
                        href="/" 
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        Home
                      </a>
                      <a 
                        href="/#hero-form" 
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        Course
                      </a>
                      <a 
                        href="/ui-components" 
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        Components
                      </a>
                      <a 
                        href="/#contact" 
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        Contact
                      </a>
                    </div>
                    <div className="md:hidden">
                      <button
                        type="button"
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        aria-label="Open mobile menu"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </nav>
                )}
              </div>
            </div>
          </header>
        )}
        
        {/* Main Content */}
        <main className="flex-1" role="main">
          {children}
        </main>
        
        {/* Footer */}
        {showFooter && (
          <footer 
            className="bg-gray-50 border-t border-gray-200"
            role="contentinfo"
          >
            {footerContent || (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Company Info */}
                  <div className="col-span-1 md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Vibe Coding
                    </h3>
                    <p className="text-gray-600 mb-4 max-w-md">
                      Empowering developers to build and launch their MVPs faster with comprehensive courses and practical guidance.
                    </p>
                    <div className="flex space-x-4">
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        aria-label="Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        aria-label="GitHub"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  {/* Quick Links */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                      <li>
                        <a 
                          href="/" 
                          className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a 
                          href="/ui-components" 
                          className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                          UI Components
                        </a>
                      </li>
                      <li>
                        <a 
                          href="/test" 
                          className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                          Test Page
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Contact */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Contact</h4>
                    <ul className="space-y-2">
                      <li>
                        <a 
                          href="mailto:contact@vibecoding.com" 
                          className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                          contact@vibecoding.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; 2024 Vibe Coding. All rights reserved.</p>
                    <div className="flex space-x-6">
                      <a 
                        href="/privacy" 
                        className="hover:text-gray-700 transition-colors duration-200"
                      >
                        Privacy Policy
                      </a>
                      <a 
                        href="/terms" 
                        className="hover:text-gray-700 transition-colors duration-200"
                      >
                        Terms of Service
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </footer>
        )}
      </div>
    </>
  );
};

export default Layout; 