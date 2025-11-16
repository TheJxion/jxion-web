/**
 * @fileoverview Input Component Template
 *
 * Professional HTML template for Input components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 *
 * @author Jxion Framework Team
 * @version 1.0.0
 */

export const inputTemplate = {
  html: `
    <div class="input-wrapper" data-testid="input-wrapper">
      {{label}}
      <input 
        type="{{type}}"
        id="{{id}}"
        name="{{name}}"
        class="input {{variant}} {{size}} {{errorClass}} {{successClass}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        {{required}}
        {{disabled}}
        data-testid="input"
        onchange="{{onChange}}"
        oninput="{{onInput}}"
      />
      {{error}}
      {{helpText}}
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
    "errorClass",
    "successClass",
    "helpText",
    "onChange",
    "onInput",
  ],
};
