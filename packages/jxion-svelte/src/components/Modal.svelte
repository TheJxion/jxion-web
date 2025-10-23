<script lang="ts">
  import styles from "@jxion/design/src/components/modal.module.scss";
  import { modalTemplate, TemplateRenderer } from "@jxion/core";
  
  export let isOpen: boolean;
  export let title: string = "";
  export let bodyContent: string = "";
  export let showFooter: boolean = false;
  export let footerContent: string = "";
  export let size: string = "md";
  export let onClose: () => void = () => {};
  export let onBackdropClick: () => void = () => {};
  export let onContentClick: (e: Event) => void = () => {};
  export let testId: string = "modal";

  $: variables = {
    isOpen: "modal--open",
    size,
    title,
    bodyContent,
    footerContent,
    onBackdropClick: onBackdropClick ? "onBackdropClick" : "",
    onContentClick: onContentClick ? "onContentClick" : "",
    onClose: onClose ? "onClose" : "",
    testId,
  };

  $: renderedTemplate = (() => {
    let rendered = TemplateRenderer.render({
      template: modalTemplate.html,
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

{#if isOpen}
  <div class="modal-wrapper">
    {@html renderedTemplate}
  </div>
{/if}

<style>
  @import "@jxion/design/src/components/modal.module.scss";
</style>
