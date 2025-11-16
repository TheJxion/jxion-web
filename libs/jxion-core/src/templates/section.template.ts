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
        </div>
      </div>
    </section>
  `,
  variables: ['variant', 'size', 'title', 'subtitle'],
};
