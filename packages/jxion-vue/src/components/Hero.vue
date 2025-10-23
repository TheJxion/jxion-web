<template>
  <!-- Template rendered from @jxion-core -->
  <div v-html="renderedTemplate"></div>
</template>

<script setup lang="ts">
/**
 * Hero Component - Vue Implementation
 *
 * Uses:
 * - HTML template from @jxion-core (heroTemplate.html)
 * - SCSS styles from @jxion-design
 * - Types from @jxion/shared
 *
 * This component renders the actual HTML template from @jxion-core
 * with proper CSS module class mapping.
 */

import { computed } from "vue";
import styles from "@jxion/design/src/components/hero.module.scss";
import { heroTemplate, TemplateRenderer } from "@jxion/core";
import type { HeroProps } from "@jxion/shared";

const props = withDefaults(
  defineProps<HeroProps & { onCtaClick?: () => void }>(),
  {
    subtitle: "",
    description: "",
    ctaText: "Get Started",
    statsValue: "7",
    statsLabel: "Years Experience",
    cardSubtitle: "",
    testId: "hero",
  }
);

const {
  title,
  subtitle,
  description,
  ctaText,
  statsValue,
  statsLabel,
  cardSubtitle,
  testId,
  onCtaClick,
} = props;

// Render the HTML template from @jxion-core
const renderedTemplate = computed(() => {
  const variables = {
    title,
    subtitle,
    description,
    ctaText,
    statsValue,
    statsLabel,
    cardSubtitle,
    testId,
    onCtaClick: onCtaClick ? "onCtaClick" : "",
  };

  // Get the base HTML template from @jxion-core
  const baseTemplate = heroTemplate.html;

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

  return rendered;
});
</script>

<style scoped>
/* Styles come from @jxion-design SCSS module */
</style>
