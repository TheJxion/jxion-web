/**
 * Primary Product Templates
 * Template-driven architecture following Jxion philosophy
 * Based on actual project structure (YesilDefter content, generic naming)
 */

export const primaryTemplates = {
  hero: `
    <section class="hero" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); position: relative; overflow: hidden;">
      <div class="hero__container" style="text-align: center; max-width: 1200px; padding: 2rem; position: relative; z-index: 1;">
        <h1 class="hero__title" style="font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 800; color: #16a34a; margin-bottom: 1rem; line-height: 1.1;">
          {{title}}
        </h1>
        <p class="hero__subtitle" style="font-size: clamp(1.25rem, 4vw, 2rem); color: #ffffff; margin-bottom: 1.5rem; font-weight: 600;">
          {{subtitle}}
        </p>
        <p class="hero__description" style="font-size: clamp(1rem, 2vw, 1.25rem); color: #cccccc; margin-bottom: 2rem; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.7;">
          {{description}}
        </p>
        <a href="#modules" class="hero__cta" style="display: inline-block; padding: 1rem 2.5rem; font-size: 1.125rem; font-weight: 600; background-color: #16a34a; color: #ffffff; border-radius: 0.5rem; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
          {{ctaText}}
        </a>
        <div class="hero__stats" style="margin-top: 3rem; display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap;">
          <div class="hero__stat" style="text-align: center;">
            <span class="hero__stat-value" style="display: block; font-size: 3rem; font-weight: 800; color: #16a34a; line-height: 1;">{{statsValue}}</span>
            <span class="hero__stat-label" style="display: block; font-size: 1rem; color: #999999; margin-top: 0.5rem;">{{statsLabel}}</span>
          </div>
        </div>
      </div>
    </section>
  `,

  modules: `
    <section id="modules" class="modules" style="padding: 6rem 2rem; background-color: #000000;">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <h2 class="modules__title" style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: #16a34a; text-align: center; margin-bottom: 1rem;">
          {{title}}
        </h2>
        <p class="modules__subtitle" style="font-size: 1.25rem; color: #cccccc; text-align: center; margin-bottom: 4rem; max-width: 800px; margin-left: auto; margin-right: auto;">
          {{subtitle}}
        </p>
        <div class="modules__grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
          {{modules}}
        </div>
      </div>
    </section>
  `,

  features: `
    <section class="features" style="padding: 6rem 2rem; background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <h2 class="features__title" style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; color: #16a34a; text-align: center; margin-bottom: 1rem;">
          {{title}}
        </h2>
        <p class="features__subtitle" style="font-size: 1.25rem; color: #cccccc; text-align: center; margin-bottom: 4rem; max-width: 800px; margin-left: auto; margin-right: auto;">
          {{subtitle}}
        </p>
        <div class="features__grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          {{features}}
        </div>
      </div>
    </section>
  `,
};
