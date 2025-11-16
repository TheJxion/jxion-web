/**
 * @fileoverview Newsletter Component Template
 *
 * Professional HTML template for Newsletter components across all frameworks.
 * Located in @jxion/core - templates only, no styles.
 */

export const newsletterTemplate = {
  html: `
    <section class="newsletter" data-testid="newsletter">
      <div class="newsletter__container">
        <div class="newsletter__header">
          <h2 class="newsletter__title">{{title}}</h2>
          <p class="newsletter__description">{{description}}</p>
        </div>
        <form class="newsletter__form">
          <input 
            type="email" 
            class="newsletter__input" 
            placeholder="{{placeholder}}"
            required
          />
          <button type="submit" class="newsletter__button">
            {{button}}
          </button>
        </form>
      </div>
    </section>
  `,
  variables: ['title', 'description', 'placeholder', 'button'],
};
