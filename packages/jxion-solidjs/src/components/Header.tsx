import { createMemo } from "solid-js";
import styles from "@jxion/design/src/components/header.module.scss";
import { headerTemplate, TemplateRenderer } from "@jxion/core";

interface NavItem {
  text: string;
  href: string;
  active?: boolean;
}

interface HeaderProps {
  logoText: string;
  logoHref: string;
  navItems: NavItem[];
  actionsContent?: string;
  onMobileToggle?: () => void;
  mobileMenuOpen?: boolean;
  testId?: string;
}

export const Header = (props: HeaderProps) => {
  const navItemsHtml = createMemo(() =>
    props.navItems
      .map(
        (item, index) =>
          `<a href="${item.href}" class="header__nav__item ${
            item.active ? "header__nav__item--active" : ""
          }" data-testid="nav-${index}">${item.text}</a>`
      )
      .join("")
  );

  const variables = createMemo(() => ({
    logoHref: props.logoHref,
    logoText: props.logoText,
    navItems: navItemsHtml(),
    actionsContent: props.actionsContent || "",
    onMobileToggle: props.onMobileToggle ? "onMobileToggle" : "",
    mobileMenuOpen: props.mobileMenuOpen ? "header__mobile-menu--open" : "",
    testId: props.testId || "header",
  }));

  const renderedTemplate = createMemo(() => {
    let rendered = TemplateRenderer.render({
      template: headerTemplate.html,
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
