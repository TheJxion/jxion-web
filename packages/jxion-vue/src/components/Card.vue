<template>
  <div v-html="renderedTemplate"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import styles from "@jxion/design/src/components/card.module.scss";
import { cardTemplate, TemplateRenderer } from "@jxion/core";

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  statsValue?: string;
  statsLabel?: string;
  testId?: string;
}

const props = withDefaults(defineProps<CardProps>(), {
  subtitle: "",
  description: "",
  statsValue: "",
  statsLabel: "",
  testId: "card",
});

// Prepare variables for template rendering
const variables = computed(() => ({
  title: props.title,
  subtitle: props.subtitle,
  description: props.description,
  statsValue: props.statsValue,
  statsLabel: props.statsLabel,
  testId: props.testId,
}));

// Render template with variables
const renderedTemplate = computed(() => {
  let rendered = TemplateRenderer.render({ 
    template: cardTemplate.html, 
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
@import "@jxion/design/src/components/card.module.scss";
</style>
