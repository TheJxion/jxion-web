import React from "react";
import styles from "@jxion/design/src/components/cta.module.scss";
import { ctaTemplate, TemplateRenderer } from "@jxion/core";

/**
 * CTA Component - React Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (ctaTemplate.html)
 * - SCSS styles from @jxion-design
 * - TemplateRenderer for dynamic rendering
 */
export interface CTAProps {
  primaryText: string;
  secondaryText?: string;
  variant?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  testId?: string;
}

export const CTA: React.FC<CTAProps> = ({
  primaryText,
  secondaryText,
  variant = "",
  onPrimaryClick,
  onSecondaryClick,
  testId = "cta",
}) => {
  // Get the base HTML template from @jxion-core
  const baseTemplate = ctaTemplate.html;

  // Prepare variables for template rendering
  const variables = {
    variant,
    primaryText,
    secondaryButton: secondaryText
      ? `<button class="cta cta--secondary" data-testid="cta-secondary" onclick="${
          onSecondaryClick ? "onSecondaryClick" : ""
        }">${secondaryText}</button>`
      : "",
    onPrimaryClick: onPrimaryClick ? "onPrimaryClick" : "",
    onSecondaryClick: onSecondaryClick ? "onSecondaryClick" : "",
    testId,
  };

  // Render template with variables
  let rendered = TemplateRenderer.render({ template: baseTemplate, variables });

  // Map CSS module classes
  Object.keys(styles).forEach((className) => {
    const regex = new RegExp(`class="([^"]*\\b${className}\\b[^"]*)"`, "g");
    rendered = rendered.replace(regex, (match, classList) => {
      const mappedClasses = classList
        .split(" ")
        .map((cls: string) => styles[cls] || cls)
        .join(" ");
      return `class="${mappedClasses}"`;
    });
  });

  // Set up click handlers for template
  React.useEffect(() => {
    if (onPrimaryClick) {
      (window as any).ctaPrimaryClick = onPrimaryClick;
    }
    if (onSecondaryClick) {
      (window as any).ctaSecondaryClick = onSecondaryClick;
    }
  }, [onPrimaryClick, onSecondaryClick]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: rendered
          .replace(
            /onclick="onPrimaryClick"/g,
            'onclick="window.ctaPrimaryClick"'
          )
          .replace(
            /onclick="onSecondaryClick"/g,
            'onclick="window.ctaSecondaryClick"'
          ),
      }}
    />
  );
};

export default CTA;
