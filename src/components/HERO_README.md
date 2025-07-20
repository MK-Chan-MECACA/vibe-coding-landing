# Hero Section & Layout Components

This document provides comprehensive documentation for the main hero section and layout components created for the Vibe Coding landing page.

## 📁 File Structure

```
src/components/
├── HeroSection.tsx          # Main hero section component
├── Layout.tsx               # Page layout wrapper with SEO
├── Typography.tsx           # Reusable typography components
└── HERO_README.md          # This documentation file
```

## 🎯 HeroSection Component

### Overview
The `HeroSection` component is the main hero section for the Vibe Coding landing page, featuring a responsive two-column layout with content on the left and a form on the right.

### Features
- ✅ **Responsive Grid Layout**: 60% content, 40% form on desktop
- ✅ **Mobile-First Design**: Stacks vertically on mobile devices
- ✅ **Form Integration**: Uses `InterestForm` and `SocialProof` components
- ✅ **Professional Typography**: Uses custom typography components
- ✅ **Social Proof**: Real-time submission counter
- ✅ **Trust Indicators**: Money-back guarantee, lifetime access, certificate
- ✅ **CTA Buttons**: Primary and secondary action buttons
- ✅ **Accessibility**: Proper ARIA labels and semantic HTML
- ✅ **Customizable**: Props for title, subtitle, description, and callbacks

### Props Interface

```typescript
interface HeroSectionProps {
  className?: string;                    // Additional CSS classes
  title?: string;                       // Custom title
  subtitle?: string;                    // Custom subtitle
  description?: string;                 // Custom description
  formSource?: string;                  // Form source identifier
  showNewsletter?: boolean;             // Whether to show newsletter subscription
  successMessage?: string;              // Custom success message
  onFormSuccess?: (data: any) => void;  // Form success callback
  onFormError?: (error: string) => void; // Form error callback
}
```

### Default Content
```typescript
const defaultContent = {
  title: 'Vibe Coding Course',
  subtitle: 'Release your MVP within a month',
  description: 'Learn the essential skills and frameworks to build and launch your minimum viable product in just 30 days. Join thousands of developers who\'ve transformed their ideas into reality.',
  formSource: 'hero_section',
  successMessage: 'Welcome aboard! You\'ll be the first to know when we launch.',
};
```

### Usage Examples

#### Basic Usage
```tsx
import { HeroSection } from '../components/HeroSection';

<HeroSection />
```

#### Custom Content
```tsx
<HeroSection
  title="Custom Course Title"
  subtitle="Custom subtitle"
  description="Custom description text"
  formSource="custom_source"
/>
```

#### With Callbacks
```tsx
<HeroSection
  formSource="landing_page"
  onFormSuccess={(data) => {
    console.log('Form submitted:', data);
    // Track conversion or redirect
  }}
  onFormError={(error) => {
    console.error('Form error:', error);
    // Show error message
  }}
/>
```

### Variants

#### CompactHeroSection
A smaller version for limited space:
```tsx
import { CompactHeroSection } from '../components/HeroSection';

<CompactHeroSection />
```

#### HeroSectionWithBackground
Version with background image:
```tsx
import { HeroSectionWithBackground } from '../components/HeroSection';

<HeroSectionWithBackground
  backgroundImage="/path/to/image.jpg"
  // ... other props
/>
```

## 🏗️ Layout Component

### Overview
The `Layout` component provides a complete page wrapper with SEO optimization, semantic HTML structure, and responsive navigation.

### Features
- ✅ **SEO Optimization**: Meta tags, Open Graph, Twitter Cards
- ✅ **Font Loading**: Optimized Inter font loading
- ✅ **Structured Data**: JSON-LD for courses
- ✅ **Security Headers**: XSS protection, content type options
- ✅ **Responsive Navigation**: Mobile-friendly navigation
- ✅ **Semantic HTML**: Proper ARIA landmarks and roles
- ✅ **Customizable**: Header/footer content, SEO data
- ✅ **Performance**: Preconnect, preload optimizations

### Props Interface

```typescript
interface LayoutProps {
  children: React.ReactNode;           // Page content
  seo?: SEOMetaData;                  // SEO meta data
  className?: string;                 // Additional CSS classes
  showHeader?: boolean;               // Whether to show header
  showFooter?: boolean;               // Whether to show footer
  headerContent?: React.ReactNode;    // Custom header content
  footerContent?: React.ReactNode;    // Custom footer content
}

interface SEOMetaData {
  title?: string;                     // Page title
  description?: string;               // Page description
  keywords?: string[];                // Page keywords
  canonical?: string;                 // Canonical URL
  ogImage?: string;                   // Open Graph image
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  author?: string;                    // Author name
  type?: 'website' | 'article' | 'course' | 'product';
  publishedAt?: string;               // Published date
  modifiedAt?: string;                // Modified date
}
```

### Default SEO Configuration
```typescript
const defaultSEO: SEOMetaData = {
  title: 'Vibe Coding Course - Release your MVP within a month',
  description: 'Learn the essential skills and frameworks to build and launch your minimum viable product in just 30 days. Join thousands of developers who\'ve transformed their ideas into reality.',
  keywords: ['coding', 'MVP', 'development', 'course', 'programming', 'web development', 'startup'],
  type: 'course',
  author: 'Vibe Coding',
  twitterCard: 'summary_large_image',
};
```

### Usage Examples

#### Basic Usage
```tsx
import Layout from '../components/Layout';

<Layout>
  <YourPageContent />
</Layout>
```

#### With Custom SEO
```tsx
<Layout
  seo={{
    title: 'Custom Page Title',
    description: 'Custom page description',
    keywords: ['custom', 'keywords'],
    type: 'article',
  }}
>
  <YourPageContent />
</Layout>
```

#### Without Header/Footer
```tsx
<Layout showHeader={false} showFooter={false}>
  <YourPageContent />
</Layout>
```

#### With Custom Header
```tsx
<Layout
  headerContent={
    <nav className="custom-nav">
      {/* Custom navigation */}
    </nav>
  }
>
  <YourPageContent />
</Layout>
```

## 📝 Typography Component

### Overview
The `Typography` component provides a comprehensive set of reusable text components with consistent styling and responsive typography.

### Features
- ✅ **Responsive Typography**: Scales with screen size
- ✅ **Consistent Spacing**: 8px base unit system
- ✅ **Color Variants**: Default, muted, primary, secondary, success, error
- ✅ **Weight Options**: Normal, medium, semibold, bold, extrabold
- ✅ **Text Variants**: Body, lead, small, caption, overline
- ✅ **Accessibility**: Proper heading hierarchy
- ✅ **Line Clamping**: Text truncation with ellipsis
- ✅ **TypeScript**: Full type safety

### Component Types

#### Heading Components
```tsx
import { Heading, H1, H2, H3, H4, H5, H6 } from '../components/Typography';

// Generic heading
<Heading level="h1" color="primary" weight="bold">
  Main Title
</Heading>

// Predefined headings
<H1 color="primary">Main Title</H1>
<H2 weight="semibold">Section Title</H2>
<H3>Subsection Title</H3>
```

#### Paragraph Components
```tsx
import { Paragraph, LeadText } from '../components/Typography';

// Regular paragraph
<Paragraph variant="body" color="muted">
  Regular paragraph text
</Paragraph>

// Lead paragraph
<LeadText color="muted">
  Lead paragraph with larger text
</LeadText>
```

#### Text Components
```tsx
import { Text, SmallText, CaptionText, OverlineText } from '../components/Typography';

// Inline text
<Text variant="small" color="muted" as="span">
  Small inline text
</Text>

// Predefined text variants
<SmallText>Small text</SmallText>
<CaptionText>Caption text</CaptionText>
<OverlineText>Overline text</OverlineText>
```

### Typography Scale

#### Responsive Heading Sizes
```css
h1: text-4xl sm:text-5xl md:text-6xl lg:text-7xl
h2: text-3xl sm:text-4xl md:text-5xl lg:text-6xl
h3: text-2xl sm:text-3xl md:text-4xl lg:text-5xl
h4: text-xl sm:text-2xl md:text-3xl lg:text-4xl
h5: text-lg sm:text-xl md:text-2xl lg:text-3xl
h6: text-base sm:text-lg md:text-xl lg:text-2xl
```

#### Text Variant Sizes
```css
body: text-base sm:text-lg
lead: text-lg sm:text-xl
small: text-sm sm:text-base
caption: text-xs sm:text-sm
overline: text-xs uppercase tracking-wider
```

### Color Variants
```typescript
type ColorVariant = 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'error';

// Color mappings
default: text-gray-900
muted: text-gray-600
primary: text-blue-600
secondary: text-gray-500
success: text-green-600
error: text-red-600
```

### Usage Examples

#### Responsive Typography
```tsx
<H1 responsive={true}>
  This title scales with screen size
</H1>
```

#### With Line Clamping
```tsx
<Paragraph maxLines={2}>
  This text will be truncated after 2 lines with ellipsis
</Paragraph>
```

#### Custom Styling
```tsx
<H2 
  className="mb-8 text-center"
  color="primary"
  weight="extrabold"
  responsive={false}
>
  Custom styled heading
</H2>
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)

### Spacing Scale
Based on 8px base unit:
- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 16px (1rem)
- **lg**: 24px (1.5rem)
- **xl**: 32px (2rem)
- **2xl**: 48px (3rem)
- **3xl**: 64px (4rem)

### Typography Scale
- **Base**: 16px (1rem)
- **Small**: 14px (0.875rem)
- **Large**: 18px (1.125rem)
- **XL**: 20px (1.25rem)
- **2XL**: 24px (1.5rem)
- **3XL**: 30px (1.875rem)
- **4XL**: 36px (2.25rem)
- **5XL**: 48px (3rem)
- **6XL**: 60px (3.75rem)
- **7XL**: 72px (4.5rem)

## 🔧 Technical Implementation

### Dependencies
- **React**: 18+ with TypeScript
- **Next.js**: 14+ for routing and optimization
- **TailwindCSS**: Utility-first styling
- **Inter Font**: Google Fonts for typography

### Performance Optimizations
- **Font Preloading**: Optimized font loading
- **Image Optimization**: Next.js image optimization
- **Code Splitting**: Automatic code splitting
- **SEO**: Meta tags and structured data
- **Accessibility**: ARIA labels and semantic HTML

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile
- **Accessibility**: Screen readers, keyboard navigation

## 🧪 Testing

### Test Pages
- `/hero-test` - HeroSection component test
- `/test` - General component test
- `/simple-test` - Basic functionality test

### Manual Testing Checklist
- [ ] Responsive design on all screen sizes
- [ ] Form submission and validation
- [ ] Social proof counter updates
- [ ] Typography scaling
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] SEO meta tags
- [ ] Performance (Core Web Vitals)

### Automated Testing
```bash
# Run tests
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 🚀 Deployment

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS
- **SEO Score**: Lighthouse audit
- **Accessibility**: WCAG 2.1 compliance
- **Mobile Performance**: Mobile-first optimization

## 📚 Additional Resources

### Documentation
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Design Resources
- [Inter Font](https://rsms.me/inter/)
- [Heroicons](https://heroicons.com/)
- [Color Palette Generator](https://coolors.co/)

### Performance Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

## 🤝 Contributing

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent formatting
- **JSDoc**: Comprehensive documentation

### Git Workflow
1. Create feature branch
2. Make changes with tests
3. Update documentation
4. Submit pull request
5. Code review and merge

### Component Guidelines
- **Props Interface**: Always define TypeScript interfaces
- **JSDoc Comments**: Document all public APIs
- **Accessibility**: Include ARIA labels and roles
- **Responsive**: Mobile-first design approach
- **Performance**: Optimize for Core Web Vitals

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: Vibe Coding Team 