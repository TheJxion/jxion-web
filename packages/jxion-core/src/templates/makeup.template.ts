/**
 * @fileoverview Makeup Component Template
 *
 * Professional HTML template for Makeup components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 */

export const makeupTemplate = {
  html: `
    <div class="makeup" data-testid="makeup">
      <div class="makeup__header">
        <h3 class="makeup__title">{{title}}</h3>
        <p class="makeup__subtitle">{{subtitle}}</p>
      </div>
      <div class="makeup__content">
        <div class="makeup__stats">
          <div class="makeup__stat">
            <span class="makeup__stat__value">{{statValue}}</span>
            <span class="makeup__stat__label">{{statLabel}}</span>
          </div>
        </div>
        <div class="makeup__chart">
          <div class="makeup__progress">
            <div class="makeup__progress__fill"></div>
          </div>
        </div>
      </div>
      <div class="makeup__footer">
        <p class="makeup__description">{{description}}</p>
      </div>
    </div>
  `,
  variables: [
    "title",
    "subtitle",
    "statValue", 
    "statLabel",
    "description"
  ]
};
