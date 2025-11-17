/**
 * Phase 5 — Component Live Preview
 * Jxion Stack — 2025-11-14
 * Author: Cursor Agent
 *
 * Component Preview Renderer
 * Safely renders Jxion components from @jxion/design with live style application
 */

import React, { useMemo, useEffect, useRef } from "react";
import { getComponent } from "@jxion/core";
import type { ComponentMetadata } from "@jxion/core";
import { PreviewErrorBoundary } from "./ErrorBoundary";
import styles from "./ComponentPreview.module.scss";

// Import all available components from @jxion/design
import {
  Hero,
  Button,
  Card,
  CTA,
  Header,
  Footer,
  Layout,
  FAQ,
  KeyFeatures,
  MakeUp,
  WhatsOurImpact,
  WhyYesildefter,
  IntegrationSolutions,
  NextSteps,
  FeaturesCarousel,
} from "@jxion/design";

// Component map for safe dynamic rendering
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  button: Button,
  card: Card,
  cta: CTA,
  header: Header,
  footer: Footer,
  layout: Layout,
  faq: FAQ,
  keyfeatures: KeyFeatures,
  makeup: MakeUp,
  whatsourimpact: WhatsOurImpact,
  whyyesildefter: WhyYesildefter,
  integrationsolutions: IntegrationSolutions,
  nextsteps: NextSteps,
  featurescarousel: FeaturesCarousel,
};

interface ComponentPreviewProps {
  componentId: string;
  variant?: string;
  tailwind: string;
  customCss: string;
}

/**
 * Get default props for a component based on registry metadata
 */
function getDefaultProps(
  componentId: string,
  variant: string | undefined,
  metadata: ComponentMetadata | undefined
): Record<string, any> {
  if (!metadata) {
    return {};
  }

  const normalizedId = componentId.toLowerCase();

  // Set defaults based on component type
  switch (normalizedId) {
    case "hero":
      // Hero component requires params with lang and theme
      return {
        params: {
          lang: "en-US" as const,
          theme: variant || "default",
        },
        className: "",
      };
    case "button":
      return {
        children: "Click Me",
        variant: variant || "primary",
      };
    case "card":
      return {
        title: "Card Title",
        description: "Card description text",
      };
    case "cta":
      return {
        title: "Ready to Get Started?",
        description: "Join thousands of developers using Jxion",
        buttonText: "Sign Up Now",
      };
    default:
      // For other components, try to infer from props metadata
      const defaults: Record<string, any> = {};
      Object.keys(metadata.props).forEach((key) => {
        const propType = metadata.props[key];
        if (propType === "string") {
          defaults[key] = `Sample ${key}`;
        } else if (propType === "number") {
          defaults[key] = 0;
        } else if (propType === "boolean") {
          defaults[key] = false;
        }
      });
      return defaults;
  }
}

/**
 * ComponentPreview - Safely renders Jxion components with live styles
 */
export function ComponentPreview({
  componentId,
  variant,
  tailwind,
  customCss,
}: ComponentPreviewProps) {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const metadata = useMemo(
    () => getComponent(componentId),
    [componentId]
  );

  // Inject custom CSS into a scoped style tag
  useEffect(() => {
    if (!customCss.trim()) {
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
      return;
    }

    // Create or update style tag
    if (!styleRef.current) {
      const style = document.createElement("style");
      style.setAttribute("data-component-preview", componentId);
      document.head.appendChild(style);
      styleRef.current = style;
    }

    // Scope CSS to preview container
    const scopedCss = `.component-preview-${componentId} { ${customCss} }`;
    styleRef.current.textContent = scopedCss;

    // Cleanup on unmount
    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
    };
  }, [customCss, componentId]);

  // Get the component to render
  const Component = useMemo(() => {
    const normalizedId = componentId.toLowerCase();
    return COMPONENT_MAP[normalizedId] || null;
  }, [componentId]);

  // Get default props for the component
  const defaultProps = useMemo(() => {
    return getDefaultProps(componentId, variant, metadata);
  }, [componentId, variant, metadata]);

  // If component not found, show error
  if (!Component) {
    return (
      <div className={styles.preview}>
        <p className={styles.previewText}>
          Component &quot;{componentId}&quot; not found in preview registry.
        </p>
        <p className={styles.previewCode}>
          Available: {Object.keys(COMPONENT_MAP).join(", ")}
        </p>
      </div>
    );
  }

  // Render component with applied styles (wrapped in error boundary)
  return (
    <PreviewErrorBoundary componentId={componentId}>
      <div
        className={`component-preview-${componentId} ${tailwind || ""}`}
        style={{ minHeight: "200px" }}
      >
        <Component {...defaultProps} />
      </div>
    </PreviewErrorBoundary>
  );
}

