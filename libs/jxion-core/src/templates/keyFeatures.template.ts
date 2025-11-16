/**
 * @fileoverview KeyFeatures Component Template
 *
 * Professional HTML template for KeyFeatures components across all frameworks.
 * Located in @jxion/core - templates only, no styles.
 */

export const keyFeaturesTemplate = {
  html: `
    <section class="key-features" data-testid="key-features">
      <div class="key-features__container">
        <div class="key-features__header">
          <h2 class="key-features__title">{{title}}</h2>
          <p class="key-features__subtitle">{{subtitle}}</p>
        </div>
        <div class="key-features__grid" data-testid="key-features-grid">
          <!-- Features will be rendered dynamically from translation data -->
        </div>
        <div class="key-features__footer">
          <a href="{{common_cta_link}}" class="key-features__cta">
            {{common_cta}}
          </a>
        </div>
      </div>
    </section>
  `,
  variables: ['title', 'subtitle', 'common_cta', 'common_cta_link'],
};
