<template>
  <div v-html="renderedTemplate"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
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

const props = withDefaults(defineProps<SectionProps>(), {
  title: "",
  subtitle: "",
  description: "",
  content: "",
  variant: "",
  size: "",
  showHeader: true,
  showFooter: false,
  footerContent: "",
  testId: "section",
});

// Prepare variables for template rendering
const variables = computed(() => ({
  variant: props.variant,
  size: props.size,
  title: props.title,
  subtitle: props.subtitle,
  description: props.description,
  content: props.content || "",
  footerContent: props.footerContent || "",
  testId: props.testId,
}));

// Render template with variables
const renderedTemplate = computed(() => {
  let rendered = TemplateRenderer.render({
    template: sectionTemplate.html,
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
@import "@jxion/design/src/components/section.module.scss";
</style>
