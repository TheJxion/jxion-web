/**
 * @fileoverview JSX Template Renderer
 *
 * Renders HTML templates from @jxion-core as React JSX elements.
 * Provides optimized conversion from HTML strings to React components.
 *
 * @author Jxion Framework Team
 * @version 1.0.0
 */

import React from "react";
import { TemplateRenderer } from "./template-renderer";

export interface JSXRenderOptions {
  template: string;
  variables: Record<string, any>;
  styles: Record<string, string>;
  onCtaClick?: () => void;
}

/**
 * JSX renderer for converting HTML templates to React elements
 *
 * @todo(@janberk) Add SSR support for server-side rendering
 * @todo(@janberk) Implement event handler mapping for all event types
 * @todo(@janberk) Add performance optimization for large templates
 */
export class JSXRenderer {
  /**
   * Renders HTML template as React JSX elements
   *
   * @param options - Render options including template, variables, and styles
   * @returns React element
   */
  static render(options: JSXRenderOptions): React.ReactElement {
    const { template, variables, styles, onCtaClick } = options;

    // First render the template with variables
    const renderedTemplate = TemplateRenderer.render({ template, variables });

    // Parse HTML and convert to React elements
    return this.parseHTMLToJSX(renderedTemplate, styles, onCtaClick);
  }

  /**
   * Parses HTML string and converts to React JSX elements
   *
   * @param html - HTML string to parse
   * @param styles - CSS module styles object
   * @param onCtaClick - Optional click handler
   * @returns React element
   */
  private static parseHTMLToJSX(
    html: string,
    styles: Record<string, string>,
    onCtaClick?: () => void
  ): React.ReactElement {
    // Create a temporary DOM element to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html.trim();

    const convertElement = (element: Element): React.ReactElement => {
      const tagName = element.tagName.toLowerCase();
      const props: any = {};

      // Convert attributes
      Array.from(element.attributes).forEach((attr) => {
        const name = attr.name;
        const value = attr.value;

        switch (name) {
          case "class":
            // Map class names to styles object
            const classNames = value
              .split(" ")
              .map((cls: string) => styles[cls] || cls)
              .join(" ");
            props.className = classNames;
            break;
          case "data-testid":
            props["data-testid"] = value;
            break;
          case "onclick":
            if (tagName === "button" && onCtaClick) {
              props.onClick = onCtaClick;
            }
            break;
          default:
            props[name] = value;
        }
      });

      // Convert children
      const children: React.ReactNode[] = [];

      Array.from(element.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent?.trim();
          if (text) {
            children.push(text);
          }
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          children.push(convertElement(child as Element));
        }
      });

      return React.createElement(tagName, props, ...children);
    };

    return convertElement(tempDiv.firstElementChild!);
  }
}
