/**
 * @fileoverview WhyNoir Component Template
 *
 * Professional HTML template for WhyNoir components across all frameworks.
 * Located in @jxion/core - templates only, no styles.
 */

export const whyNoirTemplate = {
  html: `
    <section class="why-noir" data-testid="why-noir">
      <div class="why-noir__container">
        <div class="why-noir__header">
          <h2 class="why-noir__title">{{title}}</h2>
        </div>
        <div class="why-noir__sections" data-testid="why-noir-sections">
          {{sections}}
        </div>
      </div>
    </section>
  `,
  variables: ['title', 'sections'],
};
