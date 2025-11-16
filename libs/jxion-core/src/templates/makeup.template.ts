/**
 * @fileoverview Makeup Component Template
 *
 * Professional HTML template for Makeup components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 */

export const makeupTemplate = {
  html: `
    <div class="makeup" data-testid="makeup">
      <div class="makeup__left-section">
        <div class="makeup__message" data-testid="makeup-message">
          {{message}}
        </div>
      </div>
      <div class="makeup__right-section">
        <div class="makeup__phone-group" data-testid="makeup-phone-group">
          <span class="makeup__phone-number" data-testid="makeup-phone-number">
            {{phoneNumber}}
          </span>
          <a href="#" class="makeup__contact-label" data-testid="makeup-contact-label">
            {{contactLabel}}
          </a>
        </div>
      </div>
    </div>
  `,
  variables: ['message', 'phoneNumber', 'contactLabel'],
};
