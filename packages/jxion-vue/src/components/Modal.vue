<template>
  <div v-if="isOpen" v-html="renderedTemplate"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import styles from "@jxion/design/src/components/modal.module.scss";
import { modalTemplate, TemplateRenderer } from "@jxion/core";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  bodyContent?: string;
  showFooter?: boolean;
  footerContent?: string;
  size?: string;
  onClose?: () => void;
  onBackdropClick?: () => void;
  onContentClick?: (e: Event) => void;
  testId?: string;
}

const props = withDefaults(defineProps<ModalProps>(), {
  title: "",
  bodyContent: "",
  showFooter: false,
  footerContent: "",
  size: "md",
  onClose: undefined,
  onBackdropClick: undefined,
  onContentClick: undefined,
  testId: "modal",
});

const variables = computed(() => ({
  isOpen: "modal--open",
  size: props.size,
  title: props.title,
  bodyContent: props.bodyContent || "",
  footerContent: props.footerContent || "",
  onBackdropClick: props.onBackdropClick ? "onBackdropClick" : "",
  onContentClick: props.onContentClick ? "onContentClick" : "",
  onClose: props.onClose ? "onClose" : "",
  testId: props.testId,
}));

const renderedTemplate = computed(() => {
  let rendered = TemplateRenderer.render({
    template: modalTemplate.html,
    variables: variables.value,
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
</script>

<style scoped>
@import "@jxion/design/src/components/modal.module.scss";
</style>
