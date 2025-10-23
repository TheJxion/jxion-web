<template>
  <div v-html="renderedTemplate"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import styles from "@jxion/design/src/components/input.module.scss";
import { inputTemplate, TemplateRenderer } from "@jxion/core";

interface InputProps {
  label?: string;
  id?: string;
  type?: string;
  name?: string;
  variant?: string;
  size?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  success?: boolean;
  helpText?: string;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  testId?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  label: "",
  id: "",
  type: "text",
  name: "",
  variant: "default",
  size: "md",
  placeholder: "",
  value: "",
  required: false,
  disabled: false,
  error: "",
  success: false,
  helpText: "",
  onChange: undefined,
  onInput: undefined,
  testId: "input",
});

// Prepare variables for template rendering
const variables = computed(() => ({
  label: props.label,
  id: props.id || `input-${Math.random().toString(36).substr(2, 9)}`,
  type: props.type,
  name: props.name,
  variant: props.variant,
  size: props.size,
  placeholder: props.placeholder,
  value: props.value,
  required: props.required ? "required" : "",
  disabled: props.disabled ? "disabled" : "",
  error: props.error,
  success: props.success ? "success" : "",
  helpText: props.helpText,
  onChange: props.onChange ? "onChange" : "",
  onInput: props.onInput ? "onInput" : "",
  testId: props.testId,
}));

// Render template with variables
const renderedTemplate = computed(() => {
  let rendered = TemplateRenderer.render({ 
    template: inputTemplate.html, 
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
@import "@jxion/design/src/components/input.module.scss";
</style>
