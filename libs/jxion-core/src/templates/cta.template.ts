/**
 * @fileoverview CTA Component Template
 *
 * Professional HTML template for CTA components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 *
 * @author Jxion Framework Team
 * @version 1.0.0
 */

export const ctaTemplate = {
  html: `
    <div class="cta-group" data-testid="cta-group">
      <button 
        class="cta {{variant}}" 
        data-testid="cta-primary"
        onclick="{{onPrimaryClick}}"
      >
        {{primaryText}}
      </button>
      {{secondaryButton}}
    </div>
  `,
  variables: [
    "variant",
    "primaryText",
    "secondaryButton",
    "onPrimaryClick",
    "onSecondaryClick",
  ],
};
