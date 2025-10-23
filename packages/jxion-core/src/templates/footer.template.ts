/**
 * @fileoverview Footer Component Template
 *
 * Professional HTML template for Footer components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 */

export const footerTemplate = {
  html: `
    <footer class="footer" data-testid="footer">
      <div class="footer__container">
        <div class="footer__content">
          <div class="footer__brand">
            <a href="{{logoHref}}" class="footer__logo" data-testid="footer-logo">
              {{logoText}}
            </a>
            <p class="footer__description">{{description}}</p>
            <div class="footer__social">
              {{socialLinks}}
            </div>
          </div>
          {{sections}}
        </div>
        <div class="footer__bottom">
          <p class="footer__copyright">{{copyright}}</p>
          <div class="footer__legal">
            {{legalLinks}}
          </div>
        </div>
      </div>
    </footer>
  `,
  variables: [
    "logoHref",
    "logoText",
    "description",
    "socialLinks",
    "sections",
    "copyright",
    "legalLinks",
  ],
};
