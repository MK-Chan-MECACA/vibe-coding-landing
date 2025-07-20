import React from 'react';

/**
 * Typography component variants
 */
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextVariant = 'body' | 'lead' | 'small' | 'caption' | 'overline';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

/**
 * Heading component props interface
 */
interface HeadingProps {
  /** Heading level (h1-h6) */
  level: HeadingLevel;
  /** Heading content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Text color variant */
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'error';
  /** Font weight */
  weight?: TextWeight;
  /** Whether to use responsive typography */
  responsive?: boolean;
  /** Custom ID for anchor links */
  id?: string;
}

/**
 * Paragraph component props interface
 */
interface ParagraphProps {
  /** Paragraph content */
  children: React.ReactNode;
  /** Text variant */
  variant?: TextVariant;
  /** Additional CSS classes */
  className?: string;
  /** Text color variant */
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'error';
  /** Font weight */
  weight?: TextWeight;
  /** Whether to use responsive typography */
  responsive?: boolean;
  /** Maximum number of lines (truncates with ellipsis) */
  maxLines?: number;
}

/**
 * Text component props interface
 */
interface TextProps {
  /** Text content */
  children: React.ReactNode;
  /** Text variant */
  variant?: TextVariant;
  /** Additional CSS classes */
  className?: string;
  /** Text color variant */
  color?: 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'error';
  /** Font weight */
  weight?: TextWeight;
  /** Whether to use responsive typography */
  responsive?: boolean;
  /** HTML element to render */
  as?: 'span' | 'div' | 'p' | 'strong' | 'em' | 'small';
}

/**
 * Color class mapping
 */
const colorClasses = {
  default: 'text-gray-900',
  muted: 'text-gray-600',
  primary: 'text-blue-600',
  secondary: 'text-gray-500',
  success: 'text-green-600',
  error: 'text-red-600',
};

/**
 * Weight class mapping
 */
const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

/**
 * Responsive heading size mapping
 */
const responsiveHeadingSizes = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  h3: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  h4: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h5: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  h6: 'text-base sm:text-lg md:text-xl lg:text-2xl',
};

/**
 * Static heading size mapping
 */
const staticHeadingSizes = {
  h1: 'text-5xl',
  h2: 'text-4xl',
  h3: 'text-3xl',
  h4: 'text-2xl',
  h5: 'text-xl',
  h6: 'text-lg',
};

/**
 * Text variant size mapping
 */
const textVariantSizes = {
  body: 'text-base sm:text-lg',
  lead: 'text-lg sm:text-xl',
  small: 'text-sm sm:text-base',
  caption: 'text-xs sm:text-sm',
  overline: 'text-xs uppercase tracking-wider',
};

/**
 * Reusable heading component with responsive typography
 * 
 * @example
 * ```tsx
 * <Heading level="h1" responsive color="primary">
 *   Main Title
 * </Heading>
 * ```
 */
export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
  color = 'default',
  weight = 'bold',
  responsive = true,
  id,
}) => {
  const Component = level;
  const sizeClasses = responsive ? responsiveHeadingSizes[level] : staticHeadingSizes[level];
  
  const classes = [
    sizeClasses,
    weightClasses[weight],
    colorClasses[color],
    'leading-tight',
    'tracking-tight',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} id={id}>
      {children}
    </Component>
  );
};

/**
 * Reusable paragraph component with different variants
 * 
 * @example
 * ```tsx
 * <Paragraph variant="lead" color="muted">
 *   This is a lead paragraph with larger text.
 * </Paragraph>
 * ```
 */
export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  variant = 'body',
  className = '',
  color = 'default',
  weight = 'normal',
  responsive = true,
  maxLines,
}) => {
  const sizeClasses = responsive ? textVariantSizes[variant] : textVariantSizes[variant].split(' ')[0];
  
  const classes = [
    sizeClasses,
    weightClasses[weight],
    colorClasses[color],
    'leading-relaxed',
    maxLines && `line-clamp-${maxLines}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <p className={classes}>
      {children}
    </p>
  );
};

/**
 * Reusable text component for inline text styling
 * 
 * @example
 * ```tsx
 * <Text variant="small" color="muted" as="span">
 *   Additional information
 * </Text>
 * ```
 */
export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  className = '',
  color = 'default',
  weight = 'normal',
  responsive = true,
  as: Component = 'span',
}) => {
  const sizeClasses = responsive ? textVariantSizes[variant] : textVariantSizes[variant].split(' ')[0];
  
  const classes = [
    sizeClasses,
    weightClasses[weight],
    colorClasses[color],
    'leading-relaxed',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
};

/**
 * Predefined heading components for common use cases
 */
export const H1: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level="h1" {...props} />
);

export const H2: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level="h2" {...props} />
);

export const H3: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level="h3" {...props} />
);

export const H4: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level="h4" {...props} />
);

export const H5: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level="h5" {...props} />
);

export const H6: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level="h6" {...props} />
);

/**
 * Predefined text components for common use cases
 */
export const LeadText: React.FC<Omit<ParagraphProps, 'variant'>> = (props) => (
  <Paragraph variant="lead" {...props} />
);

export const SmallText: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="small" {...props} />
);

export const CaptionText: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="caption" {...props} />
);

export const OverlineText: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="overline" {...props} />
); 