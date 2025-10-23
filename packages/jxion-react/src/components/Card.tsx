import React from "react";
import styles from "@jxion/design/src/components/card.module.scss";
import { cardTemplate, TemplateRenderer } from "@jxion/core";

/**
 * Card Component - React Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (cardTemplate.html)
 * - SCSS styles from @jxion-design
 * - TemplateRenderer for dynamic rendering
 */
export interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  statsValue?: string;
  statsLabel?: string;
  testId?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle = "",
  description = "",
  statsValue = "0",
  statsLabel = "Items",
  testId = "card",
}) => {
  // Get the base HTML template from @jxion-core
  const baseTemplate = cardTemplate.html;

  // Prepare variables for template rendering
  const variables = {
    title,
    subtitle,
    description,
    statsValue,
    statsLabel,
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

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: rendered,
      }}
    />
  );
};

export default Card;
