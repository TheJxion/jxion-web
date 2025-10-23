import React from "react";
import styles from "@jxion/design/src/components/button.module.scss";
import { buttonTemplate, TemplateRenderer } from "@jxion/core";

/**
 * Button Component - React Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (buttonTemplate.html)
 * - SCSS styles from @jxion-design
 * - TemplateRenderer for dynamic rendering
 */
export interface ButtonProps {
  text: string;
  variant?: string;
  size?: string;
  onClick?: () => void;
  disabled?: boolean;
  testId?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = "",
  size = "",
  onClick,
  disabled = false,
  testId = "button",
}) => {
  // Get the base HTML template from @jxion-core
  const baseTemplate = buttonTemplate.html;

  // Prepare variables for template rendering
  const variables = {
    variant,
    size,
    text,
    onClick: onClick ? "onClick" : "",
    disabled: disabled ? "disabled" : "",
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

  // Set up click handler for template using global events
  React.useEffect(() => {
    if (onClick) {
      (window as any).jxionGlobalEvents = {
        ...(window as any).jxionGlobalEvents,
        buttonClick: onClick,
      };
    }
  }, [onClick]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: rendered.replace(
          /onclick="onClick"/g,
          'onclick="window.jxionGlobalEvents?.buttonClick"'
        ),
      }}
    />
  );
};

export default Button;
