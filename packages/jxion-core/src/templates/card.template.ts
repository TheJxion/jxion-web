/**
 * @fileoverview Card Component Template
 *
 * Professional HTML template for Card components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 */

export const cardTemplate = {
  html: `
    <div class="card" data-testid="card">
      <div class="card__header">
        <h3 class="card__title">{{title}}</h3>
        <p class="card__subtitle">{{subtitle}}</p>
      </div>
      <div class="card__content">
        <p class="card__description">{{description}}</p>
      </div>
      <div class="card__footer">
        <div class="card__stats">
          <span class="card__stats__value">{{statsValue}}</span>
          <span class="card__stats__label">{{statsLabel}}</span>
        </div>
      </div>
    </div>
  `,
  variables: [
    "title",
    "subtitle", 
    "description",
    "statsValue",
    "statsLabel"
  ]
};
