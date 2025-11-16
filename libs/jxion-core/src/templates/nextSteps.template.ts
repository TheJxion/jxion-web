/**
 * @fileoverview NextSteps Component Template
 *
 * Professional HTML template for NextSteps components across all frameworks.
 * Located in @jxion/core - templates only, no styles.
 */

export const nextStepsTemplate = {
  html: `
    <section class="next-steps" data-testid="next-steps">
      <div class="next-steps__container">
        <div class="next-steps__header">
          <h2 class="next-steps__title">{{title}}</h2>
          <p class="next-steps__subtitle">{{subtitle}}</p>
        </div>
        <div class="next-steps__list" data-testid="next-steps-list">
          <!-- Steps will be rendered dynamically from translation data -->
        </div>
      </div>
    </section>
  `,
  variables: ['title', 'subtitle', 'list'],
};
