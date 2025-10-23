# Jxion Framework Documentation

## Overview

Jxion is a modern, multi-framework component library that provides a unified development experience across React, Vue, Svelte, SolidJS, and Angular. Built with TypeScript and designed for enterprise-grade applications.

## Key Features

- **Multi-Framework Support**: Works seamlessly with React, Vue, Svelte, SolidJS, and Angular
- **Type Safety**: Full TypeScript support with end-to-end type safety
- **Design System**: Centralized SCSS modules with design tokens
- **Template System**: Centralized HTML templates with framework-specific rendering
- **CLI Tooling**: Powerful CLI for project scaffolding and development
- **Backend Integration**: Built-in support for tRPC, Go, and Python Flask
- **Meta-Framework Support**: Next.js, Nuxt, SvelteKit, SolidStart, and Angular SSR

## Architecture

### Core Packages

- **@jxion/core**: Central business logic, templates, and utilities
- **@jxion/design**: Design system with SCSS modules and tokens
- **@jxion/shared**: Shared types and utilities
- **@jxion/backend**: tRPC backend with type-safe APIs
- **@jxion/cli**: Command-line interface for development

### Framework Packages

- **@jxion/react**: React integration
- **@jxion/vue**: Vue 3 integration
- **@jxion/svelte**: Svelte integration
- **@jxion/solidjs**: SolidJS integration
- **@jxion/angular**: Angular integration

## Getting Started

### Installation

```bash
# Install Jxion CLI globally
npm install -g @jxion/cli

# Create a new project
jxion create my-project --framework react --backend trpc
```

### Quick Start

```typescript
// React
import { Hero } from "@jxion/react";

function App() {
  return (
    <Hero
      title="Welcome to Jxion"
      subtitle="Multi-Framework Components"
      description="Build amazing applications"
      ctaText="Get Started"
    />
  );
}
```

```vue
<!-- Vue -->
<template>
  <Hero
    title="Welcome to Jxion"
    subtitle="Multi-Framework Components"
    description="Build amazing applications"
    cta-text="Get Started"
  />
</template>

<script setup>
import { Hero } from "@jxion/vue";
</script>
```

```svelte
<!-- Svelte -->
<script>
  import { Hero } from '@jxion/svelte'
</script>

<Hero
  title="Welcome to Jxion"
  subtitle="Multi-Framework Components"
  description="Build amazing applications"
  ctaText="Get Started"
/>
```

## Design System

### Design Tokens

Jxion uses a comprehensive design token system built with SCSS:

```scss
// Import design tokens
@import "@jxion/design/src/tokens/design-tokens.scss";

// Use tokens in your components
.my-component {
  color: $color-primary-green;
  font-family: $font-family-base;
  padding: $spacing-md;
  border-radius: $border-radius-lg;
}
```

### Customization

Override design tokens in your project:

```scss
// src/tokens/custom-tokens.scss
:root {
  --jxion-primary: #3b82f6;
  --jxion-secondary: #8b5cf6;
  --jxion-accent: #f59e0b;
}
```

## Component System

### Template Rendering

All components use centralized HTML templates from `@jxion/core`:

```typescript
import { heroTemplate } from "@jxion/core";

// Template is automatically converted to framework-specific syntax
const template = heroTemplate.html;
```

### Component Registry

Discover and explore components:

```typescript
import { getComponent, searchComponents } from "@jxion/core";

// Get component metadata
const heroComponent = getComponent("hero");

// Search components
const layoutComponents = searchComponents("layout");
```

## CLI Commands

### Project Creation

```bash
# Create a new project
jxion create my-project

# With specific options
jxion create my-project --framework vue --backend go --typescript --eslint
```

### Development

```bash
# Start development servers
jxion dev

# Start specific framework
jxion dev --framework react

# Build all packages
jxion build
```

### Component Generation

```bash
# Generate a new component
jxion generate component Button

# Generate with specific options
jxion generate component Card --category layout --framework all
```

## Backend Integration

### tRPC Backend

```typescript
// Backend API
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

const appRouter = t.router({
  greeting: t.procedure.query(() => {
    return { message: "Hello from Jxion!" };
  }),
});

export type AppRouter = typeof appRouter;
```

```typescript
// Frontend usage
import { trpc } from "@jxion/core";

function App() {
  const { data } = trpc.greeting.useQuery();
  return <div>{data?.message}</div>;
}
```

### Go Backend

```go
package main

import (
    "encoding/json"
    "net/http"
)

func main() {
    http.HandleFunc("/api/greeting", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]string{
            "message": "Hello from Jxion Go backend!",
        })
    })

    http.ListenAndServe(":3005", nil)
}
```

## Meta-Framework Support

### Next.js

```bash
jxion create my-project --framework react --meta-framework next
```

### Nuxt

```bash
jxion create my-project --framework vue --meta-framework nuxt
```

### SvelteKit

```bash
jxion create my-project --framework svelte --meta-framework sveltekit
```

## Type Safety

Jxion provides end-to-end type safety:

```typescript
// Shared types
export interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  onCtaClick?: () => void
}

// Framework-specific implementations
// React
export const Hero: React.FC<HeroProps> = (props) => { ... }

// Vue
export const Hero = defineComponent<HeroProps>({ ... })

// Svelte
export let title: string
export let subtitle: string = ""
```

## Best Practices

### Component Development

1. **Use centralized templates**: All HTML should come from `@jxion/core`
2. **Follow design tokens**: Use SCSS variables from the design system
3. **Maintain type safety**: Ensure all props are properly typed
4. **Test across frameworks**: Verify components work in all supported frameworks

### Project Structure

```
my-project/
├── src/
│   ├── components/     # Framework-specific components
│   ├── tokens/        # Custom design tokens
│   └── pages/         # Application pages
├── backend/           # Backend code
├── package.json
└── README.md
```

### Performance

- Use CSS modules for scoped styling
- Leverage framework-specific optimizations
- Implement proper code splitting
- Use design tokens for consistent theming

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- Documentation: [https://jxion.dev/docs](https://jxion.dev/docs)
- GitHub: [https://github.com/jxion/framework](https://github.com/jxion/framework)
- Discord: [https://discord.gg/jxion](https://discord.gg/jxion)
