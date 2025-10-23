/**
 * Jxion Design System
 */

// SCSS Component Styles (for direct import)
export './components/hero.module.scss';
export './components/button.module.scss';
export './components/card.module.scss';
export './components/input.module.scss';
export './components/layout.module.scss';
export './components/cta.module.scss';
export './components/header.module.scss';
export './components/modal.module.scss';
export './components/section.module.scss';
export './components/footer.module.scss';
export './components/makeup.module.scss';
export './components/navbar.module.scss';
export './components/sidebar.module.scss';

// Design Tokens SCSS
export './tokens/design-tokens.scss';
export './tokens/typography.scss';

// Design Tokens (TypeScript)
export * from './tokens/index';

// Version info
export const version = '1.0.0';
export const name = '@jxion/design';

// Main export object
export default {
  version,
  name,
  tokens: () => import('./tokens/index')
};