import React from "react";
import styles from "@jxion/design/src/components/input.module.scss";
import { inputTemplate, TemplateRenderer } from "@jxion/core";

/**
 * Input Component - React Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (inputTemplate.html)
 * - SCSS styles from @jxion-design
 * - TemplateRenderer for dynamic rendering
 */
export interface InputProps {
  label?: string;
  id?: string;
  type?: string;
  name?: string;
  variant?: string;
  size?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  success?: boolean;
  helpText?: string;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  testId?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id = "input",
  type = "text",
  name,
  variant = "",
  size = "",
  placeholder,
  value = "",
  required = false,
  disabled = false,
  error,
  success = false,
  helpText,
  onChange,
  onInput,
  testId = "input",
}) => {
  // Get the base HTML template from @jxion-core
  const baseTemplate = inputTemplate.html;

  // Prepare variables for template rendering
  const variables = {
    label: label || "",
    id,
    type,
    name: name || id,
    variant,
    size,
    placeholder: placeholder || "",
    value,
    required: required ? "required" : "",
    disabled: disabled ? "disabled" : "",
    error: error || "",
    success: success ? "input--success" : "",
    helpText: helpText || "",
    onChange: onChange ? "onChange" : "",
    onInput: onInput ? "onInput" : "",
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

  // Set up event handlers for template
  React.useEffect(() => {
    if (onChange) {
      (window as any).inputChange = onChange;
    }
    if (onInput) {
      (window as any).inputInput = onInput;
    }
  }, [onChange, onInput]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: rendered
          .replace(/onchange="onChange"/g, 'onchange="window.inputChange"')
          .replace(/oninput="onInput"/g, 'oninput="window.inputInput"'),
      }}
    />
  );
};

export default Input;
