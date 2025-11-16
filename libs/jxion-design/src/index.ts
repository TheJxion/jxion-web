/**
 * Jxion Stack — Design Package
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Component library (matching ustad lib/ pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/
 *
 * This package provides:
 * - UI primitive components (Button, Card, Hero, etc.)
 * - SCSS component styles
 * - Design tokens (colors, typography, spacing)
 * - Framework-agnostic component definitions
 *
 * All components follow the ustad pattern with direct SCSS imports
 */

// Layout Components
export { Hero } from "./components/Hero";
export type { HeroProps } from "./components/Hero";

export { Layout } from "./components/Layout";
export type { LayoutProps } from "./components/Layout";

export { Header } from "./components/Header";
export type { HeaderProps, NavItemProps } from "./components/Header";

export { Footer } from "./components/Footer";
export type { FooterProps } from "./components/Footer";

// Atom Components
export { Button } from "./components/Button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from "./components/Button";

export { Card } from "./components/Card";
export type { CardProps } from "./components/Card";

export { CTA } from "./components/CTA";
export type { CTAProps } from "./components/CTA";

// Section Components
export { FAQ } from "./components/FAQ";
export type { FAQProps } from "./components/FAQ";

export { KeyFeatures } from "./components/KeyFeatures";
export type { KeyFeaturesProps, KeyFeature } from "./components/KeyFeatures";

export { MakeUp } from "./components/MakeUp";
export type { MakeUpProps } from "./components/MakeUp";

export { WhatsOurImpact } from "./components/WhatsOurImpact";
export type { WhatsOurImpactProps } from "./components/WhatsOurImpact";

export { WhyYesildefter } from "./components/WhyYesildefter";
export type { WhyYesildefterProps } from "./components/WhyYesildefter";

export { IntegrationSolutions } from "./components/IntegrationSolutions";
export type { IntegrationSolutionsProps } from "./components/IntegrationSolutions";

export { NextSteps } from "./components/NextSteps";
export type { NextStepsProps, NextStepItem } from "./components/NextSteps";

export { FeaturesCarousel } from "./components/FeaturesCarousel";
export type {
  FeaturesCarouselProps,
  CarouselFeature,
} from "./components/FeaturesCarousel";

// Utilities
export { getDefaultKeyFeatures } from "./utils/key-features-config";
export type { KeyFeaturesConfig } from "./utils/key-features-config";
