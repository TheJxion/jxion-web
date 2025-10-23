import { createMemo } from "solid-js";
import styles from "@jxion/design/src/components/modal.module.scss";
import { modalTemplate, TemplateRenderer } from "@jxion/core";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  bodyContent?: string;
  showFooter?: boolean;
  footerContent?: string;
  size?: string;
  onClose?: () => void;
  onBackdropClick?: () => void;
  onContentClick?: (e: Event) => void;
  testId?: string;
}

export const Modal = (props: ModalProps) => {
  const variables = createMemo(() => ({
    isOpen: "modal--open",
    size: props.size || "md",
    title: props.title || "",
    bodyContent: props.bodyContent || "",
    footerContent: props.footerContent || "",
    onBackdropClick: props.onBackdropClick ? "onBackdropClick" : "",
    onContentClick: props.onContentClick ? "onContentClick" : "",
    onClose: props.onClose ? "onClose" : "",
    testId: props.testId || "modal",
  }));

  const renderedTemplate = createMemo(() => {
    let rendered = TemplateRenderer.render({
      template: modalTemplate.html,
      variables: variables(),
    });

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

    return rendered;
  });

  return props.isOpen ? <div innerHTML={renderedTemplate()} /> : null;
};
