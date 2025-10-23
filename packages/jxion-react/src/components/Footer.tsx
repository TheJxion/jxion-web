import React from "react";
import styles from "@jxion/design/src/components/footer.module.scss";
import { footerTemplate, TemplateRenderer } from "@jxion/core";

/**
 * Footer Component - React Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (footerTemplate.html)
 * - SCSS styles from @jxion-design
 * - TemplateRenderer for dynamic rendering
 */
export interface FooterProps {
  logoText: string;
  logoHref: string;
  description: string;
  socialLinks: Array<{ href: string; icon: string }>;
  sections: Array<{
    title: string;
    links: Array<{ text: string; href: string }>;
  }>;
  copyright: string;
  legalLinks: Array<{ text: string; href: string }>;
  testId?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logoText,
  logoHref,
  description,
  socialLinks,
  sections,
  copyright,
  legalLinks,
  testId = "footer",
}) => {
  // Get the base HTML template from @jxion-core
  const baseTemplate = footerTemplate.html;

  // Process socialLinks for template
  const socialLinksHtml = socialLinks
    .map(
      (link, index) =>
        `<a href="${link.href}" class="footer__social__link" data-testid="social-${index}" target="_blank" rel="noopener noreferrer">${link.icon}</a>`
    )
    .join("");

  // Process sections for template
  const sectionsHtml = sections
    .map(
      (section, sectionIndex) =>
        `<div class="footer__section">
        <h4 class="footer__title">${section.title}</h4>
        <ul class="footer__links">
          ${section.links
            .map(
              (link, linkIndex) =>
                `<li><a href="${link.href}" class="footer__link" data-testid="footer-link-${sectionIndex}-${linkIndex}">${link.text}</a></li>`
            )
            .join("")}
        </ul>
      </div>`
    )
    .join("");

  // Process legalLinks for template
  const legalLinksHtml = legalLinks
    .map(
      (link, index) =>
        `<a href="${link.href}" class="footer__legal__link" data-testid="legal-${index}">${link.text}</a>`
    )
    .join("");

  // Prepare variables for template rendering
  const variables = {
    logoHref,
    logoText,
    description,
    socialLinks: socialLinksHtml,
    sections: sectionsHtml,
    copyright,
    legalLinks: legalLinksHtml,
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

export default Footer;
