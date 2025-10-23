import React, { useMemo } from "react";
import styles from "@jxion/design/src/components/hero.module.scss";
import { heroTemplate, TemplateRenderer } from "@jxion/core";
import type { HeroProps } from "@jxion/shared";

/**
 * Hero Component - React Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (heroTemplate.html)
 * - SCSS styles from @jxion-design
 * - Types from @jxion/shared
 *
 * This component renders the actual HTML template from @jxion-core
 * with proper CSS module class mapping.
 */
export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle = "",
  description = "",
  ctaText = "Get Started",
  statsValue = "7",
  statsLabel = "Years Experience",
  cardSubtitle = "",
  testId = "hero",
  onCtaClick,
}) => {
  // Get the base HTML template from @jxion-core
  const baseTemplate = heroTemplate.html;

  // Memoize template rendering to prevent unnecessary re-renders
  const rendered = useMemo(() => {
    // Prepare variables for template rendering
    const variables = {
      title,
      subtitle,
      description,
      ctaText,
      statsValue,
      statsLabel,
      cardSubtitle,
      testId,
      onCtaClick: onCtaClick ? "onCtaClick" : "",
    };

    // Render template with variables
    let result = TemplateRenderer.render({ template: baseTemplate, variables });

    // Map CSS module classes
    Object.keys(styles).forEach((className) => {
      const regex = new RegExp(`class="([^"]*\\b${className}\\b[^"]*)"`, "g");
      result = result.replace(regex, (match, classList) => {
        const mappedClasses = classList
          .split(" ")
          .map((cls: string) => styles[cls] || cls)
          .join(" ");
        return `class="${mappedClasses}"`;
      });
    });

    return result;
  }, [
    title,
    subtitle,
    description,
    ctaText,
    statsValue,
    statsLabel,
    cardSubtitle,
    testId,
    onCtaClick,
  ]);

  // Set up click handler for template using global events
  React.useEffect(() => {
    if (onCtaClick) {
      (window as any).jxionGlobalEvents = {
        ...(window as any).jxionGlobalEvents,
        heroCtaClick: onCtaClick,
      };
    }
  }, [onCtaClick]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: rendered.replace(
          /onclick="onCtaClick"/g,
          'onclick="window.jxionGlobalEvents?.heroCtaClick"'
        ),
      }}
    />
  );
};

export default Hero;
