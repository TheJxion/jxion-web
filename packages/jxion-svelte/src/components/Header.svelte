<script lang="ts">
  import styles from "@jxion/design/src/components/header.module.scss";
  import { headerTemplate, TemplateRenderer } from "@jxion/core";
  
  export let logoText: string;
  export let logoHref: string;
  export let navItems: Array<{ text: string; href: string; active?: boolean }>;
  export let actionsContent: string = "";
  export let onMobileToggle: () => void = () => {};
  export let mobileMenuOpen: boolean = false;
  export let testId: string = "header";

  $: navItemsHtml = navItems
    .map(
      (item, index) =>
        `<a href="${item.href}" class="header__nav__item ${
          item.active ? "header__nav__item--active" : ""
        }" data-testid="nav-${index}">${item.text}</a>`
    )
    .join("");

  $: variables = {
    logoHref,
    logoText,
    navItems: navItemsHtml,
    actionsContent,
    onMobileToggle: onMobileToggle ? "onMobileToggle" : "",
    mobileMenuOpen: mobileMenuOpen ? "header__mobile-menu--open" : "",
    testId,
  };

  $: renderedTemplate = (() => {
    let rendered = TemplateRenderer.render({
      template: headerTemplate.html,
      variables,
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
  })();
</script>

<div class="header-wrapper">
  {@html renderedTemplate}
</div>

<style>
  @import "@jxion/design/src/components/header.module.scss";
</style>
