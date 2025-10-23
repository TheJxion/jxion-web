<template>
  <div v-html="renderedTemplate"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
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

const props = withDefaults(defineProps<HeaderProps>(), {
  actionsContent: "",
  onMobileToggle: undefined,
  mobileMenuOpen: false,
  testId: "header",
});

// Process navItems for template
const navItemsHtml = computed(() =>
  props.navItems
    .map(
      (item, index) =>
        `<a href="${item.href}" class="header__nav__item ${
          item.active ? "header__nav__item--active" : ""
        }" data-testid="nav-${index}">${item.text}</a>`
    )
    .join("")
);

// Prepare variables for template rendering
const variables = computed(() => ({
  logoHref: props.logoHref,
  logoText: props.logoText,
  navItems: navItemsHtml.value,
  actionsContent: props.actionsContent || "",
  onMobileToggle: props.onMobileToggle ? "onMobileToggle" : "",
  mobileMenuOpen: props.mobileMenuOpen ? "header__mobile-menu--open" : "",
  testId: props.testId,
}));

// Render template with variables
const renderedTemplate = computed(() => {
  let rendered = TemplateRenderer.render({
    template: headerTemplate.html,
    variables: variables.value,
  });

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

  return rendered;
});
</script>

<style scoped>
@import "@jxion/design/src/components/header.module.scss";
</style>
