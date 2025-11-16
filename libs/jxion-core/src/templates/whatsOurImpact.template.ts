/**
 * @fileoverview WhatsOurImpact Component Template
 *
 * Professional HTML template for WhatsOurImpact components across all frameworks.
 * Located in @jxion/core - templates only, no styles.
 */

export const whatsOurImpactTemplate = {
  html: `
    <section class="whats-our-impact" data-testid="whats-our-impact">
      <div class="whats-our-impact__container">
        <div class="whats-our-impact__header">
          <h2 class="whats-our-impact__title">
            {{title.regular}} <span class="whats-our-impact__title--highlight">{{title.highlight}}</span> {{title.regularcontiniued}}
          </h2>
        </div>
        <div class="whats-our-impact__stats" data-testid="whats-our-impact-stats">
          {{stats}}
        </div>
      </div>
    </section>
  `,
  variables: ['title', 'stats'],
};
