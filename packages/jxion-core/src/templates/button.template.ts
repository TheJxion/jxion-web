/**
 * @fileoverview Button Component Template
 *
 * Professional HTML template for Button components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 */

export const buttonTemplate = {
  html: `
    <button 
      class="button {{variant}} {{size}}" 
      data-testid="button"
      onclick="{{onClick}}"
      {{#if disabled}}disabled{{/if}}
    >
      {{text}}
    </button>
  `,
  variables: ["variant", "size", "text", "onClick", "disabled"],
};
