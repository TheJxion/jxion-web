import React, { useMemo } from "react";
import styles from "@jxion/design/src/components/header.module.scss";
import { headerTemplate, TemplateRenderer } from "@jxion/core";

/**
 * Header Component - React Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (headerTemplate.html)
 * - SCSS styles from @jxion-design
 * - TemplateRenderer for dynamic rendering
 */
export interface HeaderProps {
  logoText: string;
  logoHref: string;
  navItems: Array<{ text: string; href: string; active?: boolean }>;
  actionsContent?: React.ReactNode;
  onMobileToggle?: () => void;
  mobileMenuOpen?: boolean;
  testId?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logoText,
  logoHref,
  navItems,
  actionsContent,
  onMobileToggle,
  mobileMenuOpen = false,
  testId = "header",
}) => {
  // Get the base HTML template from @jxion-core
  const baseTemplate = headerTemplate.html;

  // Memoize template rendering to prevent unnecessary re-renders
  const rendered = useMemo(() => {
    // Process navItems for template
    const navItemsHtml = navItems
      .map(
        (item, index) =>
          `<a href="${item.href}" class="header__nav__item ${
            item.active ? "header__nav__item--active" : ""
          }" data-testid="nav-${index}">${item.text}</a>`
      )
      .join("");

    // Prepare variables for template rendering
    const variables = {
      logoHref,
      logoText,
      navItems: navItemsHtml,
      actionsContent: actionsContent ? actionsContent.toString() : "",
      onMobileToggle: onMobileToggle ? "onMobileToggle" : "",
      mobileMenuOpen: mobileMenuOpen ? "header__mobile-menu--open" : "",
      testId,
    };

    // Render template with variables
    let result = TemplateRenderer.render({ template: baseTemplate, variables });

    // Map CSS module classes
    Object.keys(styles).forEach((className) => {
      const regex = new RegExp(`class="([^"]*\\b${className}\\b[^"]*)"`, "g");
      result = result.replace(regex, (_, classList) => {
        const mappedClasses = classList
          .split(" ")
          .map((cls: string) => styles[cls] || cls)
          .join(" ");
        return `class="${mappedClasses}"`;
      });
    });

    return result;
  }, [
    logoHref,
    logoText,
    navItems,
    actionsContent,
    onMobileToggle,
    mobileMenuOpen,
    testId,
  ]);

  // Set up click handler for template
  React.useEffect(() => {
    if (onMobileToggle) {
      (window as any).headerMobileToggle = onMobileToggle;
    }
  }, [onMobileToggle]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: rendered.replace(
          /onclick="onMobileToggle"/g,
          'onclick="window.headerMobileToggle"'
        ),
      }}
    />
  );
};

export default Header;
