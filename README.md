# Jxion Framework

A comprehensive monorepo framework supporting multiple frontend technologies with a unified design system and tRPC backend integration.

## 🚀 Overview

Jxion Framework is a modern, scalable solution for building web applications across multiple frontend frameworks. It provides:

- **Multi-Framework Support**: React, Vue, Svelte, and SolidJS
- **Unified Design System**: Centralized SCSS components and design tokens
- **Type-Safe Backend**: tRPC integration for end-to-end type safety
- **Monorepo Architecture**: Efficient development workflow with shared packages
- **CLI Tooling**: Custom CLI for managing development servers

## 📦 Package Structure

```
packages/
├── jxion-core/          # Business logic and tRPC integration
├── jxion-shared/        # Framework-agnostic types and interfaces
├── jxion-design/        # Centralized styling and design tokens
├── jxion-backend/       # tRPC server implementation
├── jxion-cli/          # Development CLI tool
├── jxion-react/        # React application
├── jxion-vue/          # Vue application
├── jxion-svelte/       # Svelte application
└── jxion-solidjs/      # SolidJS application
```

## 🎨 Design System

### Component SCSS Modules

All styling is centralized in `@jxion/design` with individual component modules:

- `hero.module.scss` - Hero section component
- `card.module.scss` - Card component
- `button.module.scss` - Button component
- `input.module.scss` - Input, textarea, select components
- `layout.module.scss` - Layout utilities and grid system
- `cta.module.scss` - Call-to-action components
- `header.module.scss` - Header component
- `modal.module.scss` - Modal component
- `section.module.scss` - Section component
- `footer.module.scss` - Footer component
- `makeup.module.scss` - Makeup/dashboard component
- `navbar.module.scss` - Navigation bar
- `sidebar.module.scss` - Sidebar navigation

### Design Tokens

Located in `@jxion/design/src/tokens/`:

- `design-tokens.scss` - Core design tokens (colors, spacing, etc.)
- `typography.scss` - Typography system and mixins

## 🔧 Core Packages

### @jxion/core

Business logic and tRPC integration:

- **Services**: `messageService`, `greetingService`
- **tRPC Client**: Configured for backend communication
- **Types**: Business logic types and interfaces

### @jxion/shared

Framework-agnostic types and interfaces:

- **Component Props**: `HeroProps`, `ButtonProps`, `CardProps`, etc.
- **Theme Types**: Complete theme interface
- **Base Types**: Common component interfaces

### @jxion/backend

tRPC server implementation:

- **Router**: tRPC router with procedures
- **Context**: Server context creation
- **Procedures**: `greetings`, `getMessages`, `addMessage`, etc.

## 🛠️ Development

### Prerequisites

- Node.js LTS
- npm with `--legacy-peer-deps` flag

### Installation

```bash
npm install --legacy-peer-deps
```

### Building Packages

```bash
# Build all packages
npm run build

# Build specific package
npm run build -w @jxion/core --legacy-peer-deps
npm run build -w @jxion/shared --legacy-peer-deps
npm run build -w @jxion/backend --legacy-peer-deps
```

### Development Servers

Use the CLI to manage development servers:

```bash
# Start all frameworks
node packages/jxion-cli/dist/cli.js dev --framework all

# Start specific framework
node packages/jxion-cli/dist/cli.js dev --framework react
node packages/jxion-cli/dist/cli.js dev --framework vue
node packages/jxion-cli/dist/cli.js dev --framework svelte
node packages/jxion-cli/dist/cli.js dev --framework solidjs
```

### Development URLs

- **Vue**: http://localhost:3000
- **React**: http://localhost:3001
- **Svelte**: http://localhost:3002
- **SolidJS**: http://localhost:3004
- **Backend**: http://localhost:3005

## 🎯 Framework Implementations

### React (`@jxion/react`)

- Uses React hooks for state management
- Imports styles from `@jxion/design`
- Uses `@jxion/core` services for backend communication

### Vue (`@jxion-vue`)

- Uses Vue's Composition API with `ref` and `onMounted`
- Imports styles from `@jxion/design`
- Uses `@jxion/core` services directly (no React hooks)

### Svelte (`@jxion-svelte`)

- Uses Svelte's reactive primitives (`let` declarations)
- Imports styles from `@jxion/design`
- Uses `@jxion/core` services with `onMount` lifecycle

### SolidJS (`@jxion-solidjs`)

- Uses SolidJS signals (`createSignal`) and effects (`onMount`)
- Imports styles from `@jxion/design`
- Uses `@jxion/core` services directly

## 🔌 Backend Integration

### tRPC Procedures

- `greetings.query()` - Get greeting message
- `getMessages.query(limit)` - Get messages with limit
- `addMessage.mutate({user, message})` - Add new message
- `getMessage.query(id)` - Get specific message
- `deleteMessage.mutate(id)` - Delete message
- `getMessageCount.query()` - Get message count

### Environment Configuration

- Backend port: `process.env.PORT` (default: 3005)
- Frontend ports: 3000-3004 (auto-assigned)

## 📁 File Structure

### Component Implementation Pattern

Each framework implements components following this pattern:

```typescript
// Import styles from design system
import styles from "@jxion/design/src/components/[component].module.scss";

// Import types from shared package
import type { ComponentProps } from "@jxion/shared";

// Framework-specific implementation
export const Component: FrameworkComponent<ComponentProps> = (props) => {
  // Component logic using framework-specific patterns
  return (
    <div className={styles.component}>
      {/* Component JSX */}
    </div>
  );
};
```

## 🚀 CLI Commands

### Development

```bash
# Start all frameworks
jxion dev --framework all

# Start specific framework
jxion dev --framework react
jxion dev --framework vue
jxion dev --framework svelte
jxion dev --framework solidjs
```

### Building

```bash
# Build CLI
cd packages/jxion-cli && npm run build

# Build all packages
npm run build
```

## 🔧 Configuration

### Package.json Structure

Each package follows this structure:

```json
{
  "name": "@jxion/[package-name]",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

### TypeScript Configuration

- **Core**: Dual build (CJS/ESM) with `tsconfig.json` and `tsconfig.esm.json`
- **Shared**: Rollup build with TypeScript plugin
- **Frameworks**: Vite with framework-specific plugins

## 🎨 Styling Architecture

### SCSS Module Pattern

All components use CSS Modules with design tokens:

```scss
@use "../tokens/design-tokens" as tokens;
@use "../tokens/typography" as typography;

.component {
  padding: tokens.$spacing-lg;
  color: tokens.$color-text-primary;
  
  &__element {
    @include typography.heading-1;
  }
}
```

### Design Token Usage

- **Colors**: `tokens.$color-primary-green`, `tokens.$color-text-primary`
- **Spacing**: `tokens.$spacing-sm`, `tokens.$spacing-lg`, `tokens.$spacing-xl`
- **Typography**: `@include typography.heading-1`, `@include typography.paragraph`
- **Breakpoints**: `tokens.$breakpoint-sm`, `tokens.$breakpoint-md`, `tokens.$breakpoint-lg`

## 🧪 Testing

### Manual Testing

1. Start all frameworks: `jxion dev --framework all`
2. Visit each URL to verify:
   - Hero component renders correctly
   - Backend integration works
   - Styling is consistent across frameworks
   - No console errors

### Framework-Specific Testing

Each framework can be tested individually:

```bash
# Test React
curl http://localhost:3001

# Test Vue
curl http://localhost:3000

# Test Svelte
curl http://localhost:3002

# Test SolidJS
curl http://localhost:3004

# Test Backend
curl http://localhost:3005/trpc/greetings
```

## 🚀 Deployment

### Production Build

```bash
# Build all packages
npm run build

# Build specific applications
npm run build -w @jxion/react --legacy-peer-deps
npm run build -w @jxion-vue --legacy-peer-deps
npm run build -w @jxion-svelte --legacy-peer-deps
npm run build -w @jxion-solidjs --legacy-peer-deps
```

### Environment Variables

- `PORT`: Backend server port (default: 3005)
- `NODE_ENV`: Environment mode (`development` | `production`)

## 📝 Best Practices

### Component Development

1. **Use Design System**: Always import styles from `@jxion/design`
2. **Type Safety**: Use interfaces from `@jxion/shared`
3. **Backend Integration**: Use services from `@jxion/core`
4. **Framework Patterns**: Follow framework-specific conventions

### Styling Guidelines

1. **Design Tokens**: Use design tokens for all values
2. **CSS Modules**: Use CSS Modules for component styling
3. **Responsive Design**: Use breakpoint mixins
4. **Consistency**: Maintain consistent naming conventions

### Code Organization

1. **Separation of Concerns**: Keep business logic in `@jxion/core`
2. **Type Definitions**: Keep types in `@jxion/shared`
3. **Styling**: Keep styles in `@jxion/design`
4. **Framework Code**: Keep framework-specific code in respective packages

## 🔍 Troubleshooting

### Common Issues

1. **Import Resolution**: Ensure packages are built (`npm run build`)
2. **Port Conflicts**: Check if ports are available
3. **SCSS Imports**: Verify design token paths are correct
4. **Type Errors**: Check TypeScript configuration

### Debug Commands

```bash
# Check running processes
netstat -tlnp | grep -E "(3000|3001|3002|3004|3005)"

# Check package builds
ls -la packages/*/dist/

# Check dependencies
npm ls --depth=0
```

## 📚 Additional Resources

- [tRPC Documentation](https://trpc.io/)
- [Vite Documentation](https://vitejs.dev/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [SCSS Documentation](https://sass-lang.com/)

## 🤝 Contributing

1. Follow the established patterns
2. Use design tokens for styling
3. Maintain type safety across packages
4. Test across all frameworks
5. Update documentation as needed

---

**Jxion Framework** - Building scalable applications across multiple frontend technologies with a unified design system and type-safe backend integration.
