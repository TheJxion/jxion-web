/**
 * @fileoverview Header Component Template
 *
 * Professional HTML template for Header components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 */

export const headerTemplate = {
  html: `
    <header class="header" data-testid="header">
      <div class="header__container">
        <a href="{{logoHref}}" class="header__logo" data-testid="header-logo">
          {{logoText}}
        </a>
        <nav class="header__nav" data-testid="header-nav">
          {{navItems}}
        </nav>
        <div class="header__actions" data-testid="header-actions">
          {{actionsContent}}
        </div>
        <button class="header__mobile-toggle" data-testid="mobile-toggle" onclick="{{onMobileToggle}}">
          ☰
        </button>
      </div>
      <div class="header__mobile-menu {{mobileMenuOpen}}" data-testid="mobile-menu">
        <nav class="header__mobile-nav">
          {{navItems}}
        </nav>
      </div>
    </header>
  `,
  variables: [
    "logoHref",
    "logoText",
    "navItems",
    "actionsContent",
    "onMobileToggle",
    "mobileMenuOpen",
  ],
};
