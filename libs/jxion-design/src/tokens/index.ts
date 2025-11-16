/**
 * Design Tokens Export
 * Professional design system tokens
 */

// SCSS imports for design tokens
import './design-tokens.scss';
import './typography.scss';

// Token definitions
export const designTokens = {
  colors: {
    primary: {
      blue: '#667eea',
      purple: '#764ba2',
      indigo: '#4f46e5',
      'indigo-dark': '#4338ca'
    },
    accent: {
      yellow: '#fbbf24'
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
      inverse: '#ffffff'
    },
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6'
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['Fira Code', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: '0 0 #0000'
  }
};

// CSS Custom Properties generator
export const generateCSSVariables = (tokens: typeof designTokens) => {
  const variables: Record<string, string> = {};
  
  const flatten = (obj: any, prefix = '--'): Record<string, string> => {
    const result: Record<string, string> = {};
    
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(result, flatten(obj[key], `${prefix}${key}-`));
      } else {
        result[`${prefix}${key}`] = obj[key];
      }
    }
    
    return result;
  };
  
  return flatten(tokens);
};

// Theme utilities
export const themeUtils = {
  /**
   * Generate CSS custom properties from tokens
   */
  generateCSSVariables,
  
  /**
   * Create theme variant
   */
  createThemeVariant: (baseTokens: typeof designTokens, overrides: Partial<typeof designTokens>) => {
    return { ...baseTokens, ...overrides };
  },
  
  /**
   * Generate responsive styles
   */
  generateResponsiveStyles: (styles: Record<string, string>) => {
    return Object.entries(styles)
      .map(([breakpoint, style]) => {
        const bp = designTokens.breakpoints[breakpoint as keyof typeof designTokens.breakpoints];
        return bp ? `@media (min-width: ${bp}) { ${style} }` : style;
      })
      .join('\n');
  }
};
