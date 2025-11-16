/**
 * @fileoverview Motifs Component Template
 *
 * Professional HTML template for Motifs components across all frameworks.
 * Located in @jxion/core - templates only, no styles.
 */

export const motifsTemplate = {
  html: `
    <section class="motifs" data-testid="motifs">
      <div class="motifs__container">
        <div class="motifs__header">
          <h2 class="motifs__title">{{title}}</h2>
          <p class="motifs__subtitle">{{subtitle}}</p>
        </div>
        <div class="motifs__grid" data-testid="motifs-grid">
          {{items}}
        </div>
      </div>
    </section>
  `,
  variables: ['title', 'subtitle', 'items'],
};
