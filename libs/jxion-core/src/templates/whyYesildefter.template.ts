/**
 * @fileoverview WhyYesildefter Component Template
 *
 * Professional HTML template for WhyYesildefter components across all frameworks.
 * Located in @jxion/core - templates only, no styles.
 */

export const whyYesildefterTemplate = {
  html: `
    <section class="why-yesildefter" data-testid="why-yesildefter">
      <div class="why-yesildefter__container">
        <div class="why-yesildefter__header">
          <h2 class="why-yesildefter__title">
            <span class="why-yesildefter__highlight">{{highlight}}</span> {{title}}
          </h2>
          <p class="why-yesildefter__subtitle">{{subtitle}}</p>
          <p class="why-yesildefter__description">{{description}}</p>
        </div>
        <div class="why-yesildefter__benefits" data-testid="why-yesildefter-benefits">
          <!-- Benefits will be rendered dynamically from translation data -->
        </div>
        <div class="why-yesildefter__footer">
          <button class="why-yesildefter__cta">
            {{cta}}
          </button>
        </div>
      </div>
    </section>
  `,
  variables: [
    'title',
    'subtitle',
    'description',
    'highlight',
    'cta',
    'benefits',
  ],
};
