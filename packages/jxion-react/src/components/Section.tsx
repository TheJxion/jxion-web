import React from "react";
import styles from "@jxion/design/src/components/section.module.scss";
import { sectionTemplate, TemplateRenderer } from "@jxion/core";

/**
 * Section Component - React Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (sectionTemplate.html)
 * - SCSS styles from @jxion-design
 * - TemplateRenderer for dynamic rendering
 */
export interface SectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  content: React.ReactNode;
  variant?: string;
  size?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  testId?: string;
}

export const Section: React.FC<SectionProps> = ({
  title = "",
  subtitle = "",
  description = "",
  content,
  variant = "",
  size = "",
  showHeader = true,
  showFooter = false,
  footerContent,
  testId = "section",
}) => {
  // Render React content directly instead of using template
  return (
    <section
      className={`${styles.section} ${styles[variant] || ""} ${
        styles[size] || ""
      }`}
      data-testid={testId}
    >
      <div className={styles.section__container}>
        {showHeader && (
          <div className={styles.section__header}>
            <h2 className={styles.section__title} data-testid="section-title">
              {title}
            </h2>
            {subtitle && (
              <h3
                className={styles.section__subtitle}
                data-testid="section-subtitle"
              >
                {subtitle}
              </h3>
            )}
            {description && (
              <p
                className={styles.section__description}
                data-testid="section-description"
              >
                {description}
              </p>
            )}
          </div>
        )}
        <div className={styles.section__content} data-testid="section-content">
          {content}
        </div>
        {showFooter && (
          <div className={styles.section__footer} data-testid="section-footer">
            {footerContent}
          </div>
        )}
      </div>
    </section>
  );
};

export default Section;
