import React from "react";
import styles from "@jxion/design/src/components/modal.module.scss";
import { modalTemplate, TemplateRenderer } from "@jxion/core";

/**
 * Modal Component - React Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (modalTemplate.html)
 * - SCSS styles from @jxion-design
 * - TemplateRenderer for dynamic rendering
 */
export interface ModalProps {
  isOpen: boolean;
  title: string;
  bodyContent: React.ReactNode;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  size?: string;
  onClose?: () => void;
  onBackdropClick?: () => void;
  onContentClick?: (e: React.MouseEvent) => void;
  testId?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  bodyContent,
  showFooter = false,
  footerContent,
  size = "",
  onClose,
  onBackdropClick,
  onContentClick,
  testId = "modal",
}) => {
  // Don't render modal if not open
  if (!isOpen) {
    return null;
  }

  // Get the base HTML template from @jxion-core
  const baseTemplate = modalTemplate.html;

  // Prepare variables for template rendering
  const variables = {
    isOpen: "modal--open",
    size,
    title,
    bodyContent: bodyContent ? bodyContent.toString() : "",
    footerContent: footerContent ? footerContent.toString() : "",
    onBackdropClick: onBackdropClick ? "onBackdropClick" : "",
    onContentClick: onContentClick ? "onContentClick" : "",
    onClose: onClose ? "onClose" : "",
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
    if (onBackdropClick) {
      (window as any).modalBackdropClick = onBackdropClick;
    }
    if (onContentClick) {
      (window as any).modalContentClick = onContentClick;
    }
    if (onClose) {
      (window as any).modalClose = onClose;
    }
  }, [onBackdropClick, onContentClick, onClose]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: rendered
          .replace(
            /onclick="onBackdropClick"/g,
            'onclick="window.modalBackdropClick"'
          )
          .replace(
            /onclick="onContentClick"/g,
            'onclick="window.modalContentClick"'
          )
          .replace(/onclick="onClose"/g, 'onclick="window.modalClose"'),
      }}
    />
  );
};

export default Modal;
