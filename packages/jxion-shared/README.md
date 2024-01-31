# Jxion Shared Components

A professional, cross-platform component library for Vue and React applications.

## Features

- 🎨 **Design System**: Comprehensive design tokens and typography system
- 🔄 **Cross-Platform**: Components for both Vue 3 and React
- 📱 **Responsive**: Mobile-first design with responsive breakpoints
- 🎯 **TypeScript**: Full TypeScript support with proper type definitions
- 🎨 **SCSS Modules**: Scoped styling with CSS modules
- 📦 **Tree Shakeable**: Optimized bundle size with tree shaking support

## Installation

```bash
npm install @jxion/shared
```

## Usage

### Vue 3

```vue
<template>
  <Hero
    title="Welcome to Jxion"
    subtitle="Build Amazing Apps"
    description="A modern framework for building scalable applications"
    cta-text="Get Started"
    @cta-click="handleGetStarted"
  />
</template>

<script setup lang="ts">
import { Hero } from '@jxion/shared';
import '@jxion/shared/dist/styles.css';

const handleGetStarted = () => {
  console.log('Get started clicked!');
};
</script>
```

### React

```tsx
import React from 'react';
import { HeroReact } from '@jxion/shared';
import '@jxion/shared/dist/styles.css';

const App: React.FC = () => {
  const handleGetStarted = () => {
    console.log('Get started clicked!');
  };

  return (
    <HeroReact
      title="Welcome to Jxion"
      subtitle="Build Amazing Apps"
      description="A modern framework for building scalable applications"
      ctaText="Get Started"
      onCtaClick={handleGetStarted}
    />
  );
};

export default App;
```

## Components

### Hero

A hero section component with customizable content and interactive elements.

**Props:**
- `title` (string): Main heading text
- `subtitle` (string): Highlighted subtitle text
- `description` (string): Description paragraph
- `ctaText` (string, optional): Call-to-action button text
- `statsValue` (string | number, optional): Statistics value
- `statsLabel` (string, optional): Statistics label
- `cardSubtitle` (string, optional): Card subtitle text
- `className` (string, optional): Additional CSS classes

**Events:**
- `ctaClick` (Vue) / `onCtaClick` (React): Fired when CTA button is clicked

## Design System

The library includes a comprehensive design system with:

- **Colors**: Primary, secondary, accent, and semantic colors
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation and depth system
- **Breakpoints**: Responsive design breakpoints
- **Transitions**: Smooth animation transitions

## Styling

Components use SCSS modules for scoped styling. Import the main stylesheet to get all component styles:

```css
@import '@jxion/shared/dist/styles.css';
```

Or import individual component styles:

```css
@import '@jxion/shared/src/components/hero/hero.module.scss';
```

## TypeScript Support

The library is built with TypeScript and provides full type definitions for all components and props.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT License - see LICENSE file for details.
