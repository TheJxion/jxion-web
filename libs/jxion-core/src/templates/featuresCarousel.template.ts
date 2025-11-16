/**
 * @fileoverview FeaturesCarousel Component Template
 *
 * Professional HTML template for FeaturesCarousel components across all frameworks.
 * Located in @jxion/core - templates only, no styles.
 */

export const featuresCarouselTemplate = {
  html: `
    <section class="features-carousel" data-testid="features-carousel">
      <div class="features-carousel__container">
        <div class="features-carousel__header">
          <h2 class="features-carousel__title">{{title}}</h2>
          <p class="features-carousel__subtitle">{{subtitle}}</p>
        </div>
        <div class="features-carousel__content" data-testid="features-carousel-content">
          <!-- Carousel items will be rendered dynamically from translation data -->
        </div>
        <div class="features-carousel__footer">
          <button class="features-carousel__cta">
            {{common_cta}}
          </button>
        </div>
      </div>
    </section>
  `,
  variables: ['title', 'subtitle', 'common_cta', 'list'],
};
