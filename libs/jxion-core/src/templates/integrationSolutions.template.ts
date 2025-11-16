/**
 * @fileoverview IntegrationSolutions Component Template
 *
 * Professional HTML template for IntegrationSolutions components across all frameworks.
 * Located in @jxion/core - templates only, no styles.
 */

export const integrationSolutionsTemplate = {
  html: `
    <section class="integration-solutions" data-testid="integration-solutions">
      <div class="integration-solutions__container">
        <div class="integration-solutions__header">
          <h2 class="integration-solutions__title">{{title}}</h2>
          <p class="integration-solutions__subtitle">{{subtitle}}</p>
        </div>
        <div class="integration-solutions__grid" data-testid="integration-solutions-grid">
          <!-- Solutions will be rendered dynamically from translation data -->
        </div>
        <div class="integration-solutions__footer">
          <a href="{{common_cta_link}}" class="integration-solutions__cta">
            {{common_cta}}
          </a>
        </div>
      </div>
    </section>
  `,
  variables: ['title', 'subtitle', 'common_cta', 'common_cta_link', 'items'],
};
