<script lang="ts">
  import styles from "@jxion/design/src/components/section.module.scss";
  import { sectionTemplate, TemplateRenderer } from "@jxion/core";
  
  export let title: string = "";
  export let subtitle: string = "";
  export let description: string = "";
  export let content: string = "";
  export let variant: string = "";
  export let size: string = "";
  export let showHeader: boolean = true;
  export let showFooter: boolean = false;
  export let footerContent: string = "";
  export let testId: string = "section";

  $: variables = {
    variant,
    size,
    title,
    subtitle,
    description,
    content,
    footerContent,
    testId,
  };

  $: renderedTemplate = (() => {
    let rendered = TemplateRenderer.render({
      template: sectionTemplate.html,
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

<div class="section-wrapper">
  {@html renderedTemplate}
</div>

<style>
  @import "@jxion/design/src/components/section.module.scss";
</style>
