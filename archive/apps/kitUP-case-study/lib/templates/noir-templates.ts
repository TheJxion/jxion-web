/**
 * Noir E-commerce Templates
 *
 * NOTE: This file is kept for reference/documentation purposes.
 * The noir-site.tsx page now uses an iframe to the deployed noir-crafted SvelteKit app.
 *
 * These templates demonstrate the template-driven architecture pattern
 * and can be used as examples for other template-driven sites.
 */

export const noirTemplates = {
  hero: `
    <section class="noir-hero">
      <div class="noir-hero__container">
        <h1 class="noir-hero__title">{{title}}</h1>
        <p class="noir-hero__subtitle">{{subtitle}}</p>
        <p class="noir-hero__description">{{description}}</p>
        <a href="#collection" class="noir-hero__cta">{{ctaText}}</a>
      </div>
    </section>
  `,

  productGrid: `
    <section id="collection" class="noir-collection">
      <div class="noir-collection__container">
        <div class="noir-collection__header">
          <h2 class="noir-collection__title">{{title}}</h2>
          <p class="noir-collection__subtitle">{{subtitle}}</p>
        </div>
        <div class="noir-collection__grid">
          {{products}}
        </div>
      </div>
    </section>
  `,

  whyNoir: `
    <section class="noir-why">
      <div class="noir-why__container">
        <h2 class="noir-why__title">{{title}}</h2>
        <div class="noir-why__grid">
          {{sections}}
        </div>
      </div>
    </section>
  `,

  motifs: `
    <section class="noir-motifs">
      <div class="noir-motifs__container">
        <div class="noir-motifs__header">
          <h2 class="noir-motifs__title">{{title}}</h2>
          <p class="noir-motifs__subtitle">{{subtitle}}</p>
        </div>
        <div class="noir-motifs__grid">
          {{items}}
        </div>
      </div>
    </section>
  `,

  newsletter: `
    <section class="noir-newsletter">
      <div class="noir-newsletter__container">
        <h2 class="noir-newsletter__title">{{title}}</h2>
        <p class="noir-newsletter__subtitle">{{subtitle}}</p>
        <form class="noir-newsletter__form">
          <input type="email" placeholder="{{placeholder}}" class="noir-newsletter__input" required />
          <button type="submit" class="noir-newsletter__button">{{buttonText}}</button>
        </form>
      </div>
    </section>
  `,

  footer: `
    <footer class="noir-footer">
      <div class="noir-footer__content">
        <div class="noir-footer__brand">
          <h3 class="noir-footer__title">{{brandName}}</h3>
          <p class="noir-footer__tagline">{{tagline}}</p>
        </div>
        {{footerSections}}
      </div>
      <div class="noir-footer__bottom">
        <p class="noir-footer__copyright">{{copyright}}</p>
      </div>
    </footer>
  `,
};
