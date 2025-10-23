/**
 * @fileoverview Input Component Template
 *
 * Professional HTML template for Input components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 */

export const inputTemplate = {
  html: `
    <div class="input-wrapper" data-testid="input-wrapper">
      {{#if label}}
      <label for="{{id}}" class="input-label" data-testid="input-label">{{label}}</label>
      {{/if}}
      <input 
        type="{{type}}"
        id="{{id}}"
        name="{{name}}"
        class="input {{variant}} {{size}} {{#if error}}input--error{{/if}} {{#if success}}input--success{{/if}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        {{#if required}}required{{/if}}
        {{#if disabled}}disabled{{/if}}
        data-testid="input"
        onchange="{{onChange}}"
        oninput="{{onInput}}"
      />
      {{#if error}}
      <div class="input-error" data-testid="input-error">{{error}}</div>
      {{/if}}
      {{#if helpText}}
      <div class="input-help" data-testid="input-help">{{helpText}}</div>
      {{/if}}
    </div>
  `,
  variables: [
    "label",
    "id",
    "type",
    "name",
    "variant",
    "size",
    "placeholder",
    "value",
    "required",
    "disabled",
    "error",
    "success",
    "helpText",
    "onChange",
    "onInput",
  ],
};
