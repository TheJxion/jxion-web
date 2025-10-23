<template>
  <div v-html="renderedTemplate"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import styles from "@jxion/design/src/components/cta.module.scss";
import { ctaTemplate, TemplateRenderer } from "@jxion/core";

interface CTAProps {
  primaryText: string;
  secondaryText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  testId?: string;
}

const props = withDefaults(defineProps<CTAProps>(), {
  secondaryText: "",
  onPrimaryClick: undefined,
  onSecondaryClick: undefined,
  testId: "cta",
});

// Prepare variables for template rendering
const variables = computed(() => ({
  primaryText: props.primaryText,
  secondaryText: props.secondaryText,
  onPrimaryClick: props.onPrimaryClick ? "onPrimaryClick" : "",
  onSecondaryClick: props.onSecondaryClick ? "onSecondaryClick" : "",
  testId: props.testId,
}));

// Render template with variables
const renderedTemplate = computed(() => {
  let rendered = TemplateRenderer.render({ 
    template: ctaTemplate.html, 
    variables: variables.value 
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
@import "@jxion/design/src/components/cta.module.scss";
</style>
