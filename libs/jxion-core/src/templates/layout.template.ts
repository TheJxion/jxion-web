/**
 * @fileoverview Layout Component Template
 *
 * Professional HTML template for Layout components across all frameworks.
 * Located in @jxion-core - templates only, no styles.
 */

export const layoutTemplate = {
  html: `
    <div class="layout" data-lang="{{lang}}" data-theme="{{theme}}">
      <header class="layout__header">
        <div class="layout__container">
          <div class="layout__content">
            {{headerContent}}
          </div>
        </div>
      </header>
      <main class="layout__main">
        <div class="layout__container">
          <div class="layout__content">
            {{mainContent}}
          </div>
        </div>
      </main>
      <footer class="layout__footer">
        <div class="layout__container">
          <div class="layout__content">
            {{footerContent}}
          </div>
        </div>
      </footer>
    </div>
  `,
  variables: ["lang", "theme", "headerContent", "mainContent", "footerContent"],
};
