import { createMemo } from "solid-js";
import styles from "@jxion/design/src/components/section.module.scss";
import { sectionTemplate, TemplateRenderer } from "@jxion/core";

interface SectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  variant?: string;
  size?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  footerContent?: string;
  testId?: string;
}

export const Section = (props: SectionProps) => {
  const variables = createMemo(() => ({
    variant: props.variant || "",
    size: props.size || "",
    title: props.title || "",
    subtitle: props.subtitle || "",
    description: props.description || "",
    content: props.content || "",
    footerContent: props.footerContent || "",
    testId: props.testId || "section",
  }));

  const renderedTemplate = createMemo(() => {
    let rendered = TemplateRenderer.render({
      template: sectionTemplate.html,
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

  return <div innerHTML={renderedTemplate()} />;
};
