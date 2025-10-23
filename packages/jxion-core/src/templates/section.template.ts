/**
 * @fileoverview Section Component Template
 *
 * Professional HTML template for Section components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 */

export const sectionTemplate = {
  html: `
    <section class="section {{variant}} {{size}}" data-testid="section">
      <div class="section__container">
        <div class="section__header">
          <h2 class="section__title" data-testid="section-title">{{title}}</h2>
          <h3 class="section__subtitle" data-testid="section-subtitle">{{subtitle}}</h3>
          <p class="section__description" data-testid="section-description">{{description}}</p>
        </div>
        <div class="section__content" data-testid="section-content">
          {{content}}
        </div>
        <div class="section__footer" data-testid="section-footer">
          {{footerContent}}
        </div>
      </div>
    </section>
  `,
  variables: [
    "variant",
    "size",
    "title",
    "subtitle",
    "description",
    "content",
    "footerContent",
  ],
};
