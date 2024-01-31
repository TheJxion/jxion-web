// Core Types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
}

export interface VariantProps {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
}

export interface ThemeProps {
  theme?: "light" | "dark" | "auto";
}

// Hero Component Types
export interface HeroProps extends ComponentProps, VariantProps, ThemeProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  image?: string;
  imageAlt?: string;
  stats?: Array<{
    value: string;
    label: string;
    color?: "primary" | "secondary" | "success" | "warning" | "error";
  }>;
}

// Card Component Types
export interface CardProps extends ComponentProps, VariantProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  actions?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline";
  }>;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  shadow?: "none" | "sm" | "md" | "lg" | "xl";
}

// Button Component Types
export interface ButtonProps extends ComponentProps, VariantProps {
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

// Input Component Types
export interface InputProps extends ComponentProps, VariantProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

// Layout Component Types
export interface LayoutProps extends ComponentProps, ThemeProps {
  variant?: "default" | "dashboard" | "marketing" | "docs";
  sidebar?: boolean;
  header?: boolean;
  footer?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

// Navigation Component Types
export interface NavigationProps extends ComponentProps, ThemeProps {
  variant?: "header" | "sidebar" | "breadcrumb" | "tabs";
  items: Array<{
    label: string;
    href?: string;
    icon?: React.ReactNode;
    children?: Array<{
      label: string;
      href: string;
      icon?: React.ReactNode;
    }>;
  }>;
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

// Modal Component Types
export interface ModalProps extends ComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closable?: boolean;
  backdrop?: boolean;
  children: React.ReactNode;
}

// Form Component Types
export interface FormProps extends ComponentProps {
  onSubmit: (data: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  validationSchema?: any;
  children: React.ReactNode;
  submitText?: string;
  resetText?: string;
  loading?: boolean;
}

// Table Component Types
export interface TableProps extends ComponentProps {
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    render?: (value: any, row: any) => React.ReactNode;
  }>;
  data: Array<Record<string, any>>;
  loading?: boolean;
  emptyText?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
  selection?: {
    selected: string[];
    onSelectionChange: (selected: string[]) => void;
  };
}

// Footer Component Types
export interface FooterProps extends ComponentProps, ThemeProps {
  variant?: "simple" | "complex" | "marketing";
  links?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  social?: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
  }>;
  copyright?: string;
  logo?: React.ReactNode;
}

// CTA Component Types
export interface CtaProps extends ComponentProps, VariantProps, ThemeProps {
  title: string;
  description?: string;
  primaryAction: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  image?: string;
  imageAlt?: string;
}

// Header Component Types
export interface HeaderProps extends ComponentProps, ThemeProps {
  variant?: "default" | "dashboard" | "marketing";
  logo?: React.ReactNode;
  title?: string;
  navigation?: NavigationProps["items"];
  actions?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  }>;
  user?: {
    name: string;
    avatar?: string;
    menu?: Array<{
      label: string;
      href?: string;
      onClick?: () => void;
    }>;
  };
}

// Makeup Component Types
export interface MakeupProps extends ComponentProps {
  announcementId?: string;
  message?: string;
  closable?: boolean;
  variant?: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

// Section Component Types
export interface SectionProps extends ComponentProps, ThemeProps {
  variant?: "default" | "features" | "testimonials" | "pricing" | "faq";
  title?: string;
  subtitle?: string;
  description?: string;
  columns?: 1 | 2 | 3 | 4;
  background?: "none" | "light" | "dark" | "gradient";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

// Utility Types
export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type Color =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type Position = "top" | "right" | "bottom" | "left";
export type Alignment = "start" | "center" | "end" | "stretch";
export type Direction = "row" | "column" | "row-reverse" | "column-reverse";

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  spacing: Record<Size, string>;
  typography: {
    fontFamily: string;
    fontSize: Record<Size, string>;
    fontWeight: Record<string, number>;
    lineHeight: Record<Size, string>;
  };
  shadows: Record<Size, string>;
  borderRadius: Record<Size, string>;
  breakpoints: Record<Size, string>;
}

// Configuration Types
export interface JxionConfig {
  theme?: Theme;
  components?: Record<string, any>;
  breakpoints?: Record<Size, string>;
  spacing?: Record<Size, string>;
  colors?: Record<string, string>;
}
