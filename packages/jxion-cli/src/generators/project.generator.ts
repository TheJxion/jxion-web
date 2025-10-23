/**
 * @fileoverview Project Generator
 *
 * High-performance project scaffolding for the Jxion framework.
 * Generates complete project structures with framework-specific configurations.
 */

import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";

export interface ProjectOptions {
  name: string;
  framework: "vue" | "react" | "svelte" | "solidjs" | "angular";
  backend: "trpc" | "go" | "python-flask" | "none";
  metaFramework?: "next" | "nuxt" | "sveltekit" | "solidstart" | "angular-ssr";
  typescript: boolean;
  eslint: boolean;
  husky: boolean;
  designTokens: boolean;
}

export class ProjectGenerator {
  private projectPath: string;

  constructor(projectName: string) {
    this.projectPath = path.join(process.cwd(), projectName);
  }

  async generate(options: ProjectOptions): Promise<void> {
    const spinner = ora(`Creating ${options.name} project...`).start();

    try {
      // Create project directory
      await fs.ensureDir(this.projectPath);

      // Generate package.json
      await this.generatePackageJson(options);

      // Generate framework-specific files
      await this.generateFrameworkFiles(options);

      // Generate backend files if needed
      if (options.backend !== "none") {
        await this.generateBackendFiles(options);
      }

      // Generate meta-framework files if specified
      if (options.metaFramework) {
        await this.generateMetaFrameworkFiles(options);
      }

      // Generate configuration files
      await this.generateConfigFiles(options);

      // Generate design tokens
      if (options.designTokens) {
        await this.generateDesignTokens(options);
      }

      // Generate README
      await this.generateReadme(options);

      spinner.succeed(
        chalk.green(`✅ Project "${options.name}" created successfully!`)
      );
    } catch (error) {
      spinner.fail(chalk.red("❌ Failed to create project"));
      throw error;
    }
  }

  private async generatePackageJson(options: ProjectOptions): Promise<void> {
    const packageJson = {
      name: options.name,
      version: "0.1.0",
      private: true,
      scripts: this.getScripts(options),
      dependencies: this.getDependencies(options),
      devDependencies: this.getDevDependencies(options),
      ...(options.typescript && {
        typescript: "~5.4.0",
      }),
    };

    await fs.writeJSON(
      path.join(this.projectPath, "package.json"),
      packageJson,
      {
        spaces: 2,
      }
    );
  }

  private getScripts(options: ProjectOptions): Record<string, string> {
    const baseScripts = {
      dev: "jxion dev",
      build: "jxion build",
      test: "jxion test",
    };

    switch (options.framework) {
      case "vue":
        return {
          ...baseScripts,
          dev: "vite",
          build: "vite build",
          preview: "vite preview",
        };
      case "react":
        return {
          ...baseScripts,
          dev: "vite",
          build: "vite build",
          preview: "vite preview",
        };
      case "svelte":
        return {
          ...baseScripts,
          dev: "vite",
          build: "vite build",
          preview: "vite preview",
        };
      case "solidjs":
        return {
          ...baseScripts,
          dev: "vite",
          build: "vite build",
          preview: "vite preview",
        };
      case "angular":
        return {
          ...baseScripts,
          dev: "ng serve",
          build: "ng build",
          test: "ng test",
        };
      default:
        return baseScripts;
    }
  }

  private getDependencies(options: ProjectOptions): Record<string, string> {
    const baseDeps: Record<string, string> = {
      "@jxion/core": "latest",
      "@jxion/design": "latest",
      "@jxion/shared": "latest",
    };

    // Framework-specific dependencies
    switch (options.framework) {
      case "vue":
        return {
          ...baseDeps,
          "@jxion/vue": "latest",
          vue: "^3.4.0",
          "@vitejs/plugin-vue": "^5.0.0",
        };
      case "react":
        return {
          ...baseDeps,
          "@jxion/react": "latest",
          react: "^18.2.0",
          "react-dom": "^18.2.0",
          "@vitejs/plugin-react": "^4.2.0",
        };
      case "svelte":
        return {
          ...baseDeps,
          "@jxion/svelte": "latest",
          svelte: "^4.2.0",
          "@sveltejs/vite-plugin-svelte": "^3.1.0",
        };
      case "solidjs":
        return {
          ...baseDeps,
          "@jxion/solidjs": "latest",
          "solid-js": "^1.8.0",
          "solid-js/web": "^1.8.0",
          "vite-plugin-solid": "^2.8.0",
        };
      case "angular":
        return {
          ...baseDeps,
          "@jxion/angular": "latest",
          "@angular/core": "^18.0.0",
          "@angular/common": "^18.0.0",
          "@angular/platform-browser": "^18.0.0",
          "@angular/platform-browser-dynamic": "^18.0.0",
        };
    }

    // Backend dependencies
    if (options.backend === "trpc") {
      return {
        ...baseDeps,
        "@jxion/backend": "latest",
        "@trpc/client": "^10.45.0",
        "@trpc/server": "^10.45.0",
      };
    }

    return baseDeps;
  }

  private getDevDependencies(options: ProjectOptions): Record<string, string> {
    const baseDevDeps: Record<string, string> = {
      vite: "^5.4.0",
      typescript: "~5.4.0",
    };

    if (options.eslint) {
      baseDevDeps["@typescript-eslint/eslint-plugin"] = "^7.0.0";
      baseDevDeps["@typescript-eslint/parser"] = "^7.0.0";
      baseDevDeps["eslint"] = "^8.57.0";
    }

    if (options.husky) {
      baseDevDeps["husky"] = "^9.0.0";
      baseDevDeps["lint-staged"] = "^15.2.0";
    }

    return baseDevDeps;
  }

  private async generateFrameworkFiles(options: ProjectOptions): Promise<void> {
    const srcDir = path.join(this.projectPath, "src");
    await fs.ensureDir(srcDir);

    switch (options.framework) {
      case "vue":
        await this.generateVueFiles(srcDir);
        break;
      case "react":
        await this.generateReactFiles(srcDir);
        break;
      case "svelte":
        await this.generateSvelteFiles(srcDir);
        break;
      case "solidjs":
        await this.generateSolidJSFiles(srcDir);
        break;
      case "angular":
        await this.generateAngularFiles(srcDir);
        break;
    }
  }

  private async generateVueFiles(srcDir: string): Promise<void> {
    // Main Vue files
    await fs.writeFile(
      path.join(srcDir, "main.ts"),
      `import { createApp } from 'vue'
import App from './App.vue'
import '@jxion/design/src/tokens/design-tokens.scss'

createApp(App).mount('#app')
`
    );

    await fs.writeFile(
      path.join(srcDir, "App.vue"),
      `<template>
  <div id="app">
    <Hero 
      title="Welcome to Jxion"
      subtitle="Multi-Framework Components"
      description="Build amazing applications with our component library"
      cta-text="Get Started"
      @cta-click="handleCtaClick"
    />
  </div>
</template>

<script setup lang="ts">
import { Hero } from '@jxion/vue'

const handleCtaClick = () => {
  console.log('CTA clicked!')
}
</script>
`
    );

    await fs.writeFile(
      path.join(this.projectPath, "index.html"),
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jxion Vue App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`
    );

    await fs.writeFile(
      path.join(this.projectPath, "vite.config.ts"),
      `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  }
})
`
    );
  }

  private async generateReactFiles(srcDir: string): Promise<void> {
    await fs.writeFile(
      path.join(srcDir, "main.tsx"),
      `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@jxion/design/src/tokens/design-tokens.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`
    );

    await fs.writeFile(
      path.join(srcDir, "App.tsx"),
      `import React from 'react'
import { Hero } from '@jxion/react'

function App() {
  const handleCtaClick = () => {
    console.log('CTA clicked!')
  }

  return (
    <div className="App">
      <Hero 
        title="Welcome to Jxion"
        subtitle="Multi-Framework Components"
        description="Build amazing applications with our component library"
        ctaText="Get Started"
        onCtaClick={handleCtaClick}
      />
    </div>
  )
}

export default App
`
    );

    await fs.writeFile(
      path.join(this.projectPath, "index.html"),
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jxion React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
    );

    await fs.writeFile(
      path.join(this.projectPath, "vite.config.ts"),
      `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  }
})
`
    );
  }

  private async generateSvelteFiles(srcDir: string): Promise<void> {
    await fs.writeFile(
      path.join(srcDir, "main.ts"),
      `import './app.css'
import App from './App.svelte'
import '@jxion/design/src/tokens/design-tokens.scss'

const app = new App({
  target: document.getElementById('app'),
})

export default app
`
    );

    await fs.writeFile(
      path.join(srcDir, "App.svelte"),
      `<script lang="ts">
  import { Hero } from '@jxion/svelte'
  
  const handleCtaClick = () => {
    console.log('CTA clicked!')
  }
</script>

<main>
  <Hero 
    title="Welcome to Jxion"
    subtitle="Multi-Framework Components"
    description="Build amazing applications with our component library"
    ctaText="Get Started"
    onCtaClick={handleCtaClick}
  />
</main>
`
    );

    await fs.writeFile(
      path.join(srcDir, "app.css"),
      `/* Global styles */
body {
  margin: 0;
  padding: 0;
}
`
    );

    await fs.writeFile(
      path.join(this.projectPath, "index.html"),
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jxion Svelte App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`
    );

    await fs.writeFile(
      path.join(this.projectPath, "vite.config.ts"),
      `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3002
  }
})
`
    );
  }

  private async generateSolidJSFiles(srcDir: string): Promise<void> {
    await fs.writeFile(
      path.join(srcDir, "index.tsx"),
      `import { render } from 'solid-js/web'
import App from './App'
import '@jxion/design/src/tokens/design-tokens.scss'

render(() => <App />, document.getElementById('root')!)
`
    );

    await fs.writeFile(
      path.join(srcDir, "App.tsx"),
      `import { Hero } from '@jxion/solidjs'

export default function App() {
  const handleCtaClick = () => {
    console.log('CTA clicked!')
  }

  return (
    <div>
      <Hero 
        title="Welcome to Jxion"
        subtitle="Multi-Framework Components"
        description="Build amazing applications with our component library"
        ctaText="Get Started"
        onCtaClick={handleCtaClick}
      />
    </div>
  )
}
`
    );

    await fs.writeFile(
      path.join(this.projectPath, "index.html"),
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jxion SolidJS App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
`
    );

    await fs.writeFile(
      path.join(this.projectPath, "vite.config.ts"),
      `import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 3004
  }
})
`
    );
  }

  private async generateAngularFiles(srcDir: string): Promise<void> {
    // Angular has a more complex structure, so we'll create the essential files
    await fs.writeFile(
      path.join(srcDir, "main.ts"),
      `import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import '@jxion/design/src/tokens/design-tokens.scss'

bootstrapApplication(AppComponent)
`
    );

    await fs.writeFile(
      path.join(srcDir, "app/app.component.ts"),
      `import { Component } from '@angular/core'
import { HeroComponent } from '@jxion/angular'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent],
  template: \`
    <jx-hero 
      title="Welcome to Jxion"
      subtitle="Multi-Framework Components"
      description="Build amazing applications with our component library"
      ctaText="Get Started"
      (onCtaClick)="handleCtaClick()"
    />
  \`
})
export class AppComponent {
  handleCtaClick() {
    console.log('CTA clicked!')
  }
}
`
    );
  }

  private async generateBackendFiles(options: ProjectOptions): Promise<void> {
    const backendDir = path.join(this.projectPath, "backend");
    await fs.ensureDir(backendDir);

    switch (options.backend) {
      case "trpc":
        await this.generateTrpcFiles(backendDir);
        break;
      case "go":
        await this.generateGoFiles(backendDir);
        break;
      case "python-flask":
        await this.generateFlaskFiles(backendDir);
        break;
    }
  }

  private async generateTrpcFiles(backendDir: string): Promise<void> {
    await fs.writeFile(
      path.join(backendDir, "index.ts"),
      `import { initTRPC } from '@trpc/server'
import { createHTTPServer } from '@trpc/server/adapters/standalone'

const t = initTRPC.create()

const appRouter = t.router({
  greeting: t.procedure.query(() => {
    return { message: 'Hello from Jxion tRPC!' }
  })
})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
  router: appRouter,
})

server.listen(3005)
console.log('tRPC server running on port 3005')
`
    );
  }

  private async generateGoFiles(backendDir: string): Promise<void> {
    await fs.writeFile(
      path.join(backendDir, "main.go"),
      `package main

import (
    "encoding/json"
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/api/greeting", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]string{
            "message": "Hello from Jxion Go backend!",
        })
    })

    log.Println("Go server running on port 3005")
    log.Fatal(http.ListenAndServe(":3005", nil))
}
`
    );
  }

  private async generateFlaskFiles(backendDir: string): Promise<void> {
    await fs.writeFile(
      path.join(backendDir, "app.py"),
      `from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/greeting')
def greeting():
    return jsonify({"message": "Hello from Jxion Python Flask backend!"})

if __name__ == '__main__':
    app.run(port=3005, debug=True)
`
    );

    await fs.writeFile(
      path.join(backendDir, "requirements.txt"),
      `Flask==3.0.0
flask-cors==4.0.0
`
    );
  }

  private async generateMetaFrameworkFiles(
    options: ProjectOptions
  ): Promise<void> {
    // Meta-framework integration would go here
    // This is a placeholder for future implementation
  }

  private async generateConfigFiles(options: ProjectOptions): Promise<void> {
    // TypeScript config
    if (options.typescript) {
      await fs.writeFile(
        path.join(this.projectPath, "tsconfig.json"),
        `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`
      );
    }

    // ESLint config
    if (options.eslint) {
      await fs.writeFile(
        path.join(this.projectPath, ".eslintrc.json"),
        `{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
`
      );
    }

    // Husky config
    if (options.husky) {
      await fs.writeFile(
        path.join(this.projectPath, ".husky/pre-commit"),
        `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`
      );

      await fs.writeFile(
        path.join(this.projectPath, ".lintstagedrc.json"),
        `{
  "*.{ts,tsx,js,jsx}": ["eslint --fix"],
  "*.{css,scss}": ["prettier --write"]
}
`
      );
    }
  }

  private async generateDesignTokens(options: ProjectOptions): Promise<void> {
    const tokensDir = path.join(this.projectPath, "src/tokens");
    await fs.ensureDir(tokensDir);

    await fs.writeFile(
      path.join(tokensDir, "design-tokens.scss"),
      `// Custom design tokens for ${options.name}
// Override Jxion design tokens here

:root {
  // Colors
  --jxion-primary: #3b82f6;
  --jxion-secondary: #8b5cf6;
  --jxion-accent: #f59e0b;
  
  // Typography
  --jxion-font-family: 'Inter', sans-serif;
  --jxion-font-size-base: 16px;
  
  // Spacing
  --jxion-spacing-xs: 0.25rem;
  --jxion-spacing-sm: 0.5rem;
  --jxion-spacing-md: 1rem;
  --jxion-spacing-lg: 1.5rem;
  --jxion-spacing-xl: 2rem;
  
  // Border radius
  --jxion-radius-sm: 0.25rem;
  --jxion-radius-md: 0.5rem;
  --jxion-radius-lg: 1rem;
}
`
    );
  }

  private async generateReadme(options: ProjectOptions): Promise<void> {
    const readme = `# ${options.name}

A Jxion Framework project with ${options.framework} and ${
      options.backend
    } backend.

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Project Structure

\`\`\`
${options.name}/
├── src/                    # Source code
├── backend/                # Backend code
├── package.json           # Dependencies
└── README.md              # This file
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run test\` - Run tests

## Framework

- **Frontend**: ${options.framework}
- **Backend**: ${options.backend}
- **Meta-framework**: ${options.metaFramework || "None"}

## Jxion Components

This project uses Jxion Framework components:

\`\`\`typescript
import { Hero } from '@jxion/${options.framework}'
\`\`\`

## Design Tokens

Customize your design by editing \`src/tokens/design-tokens.scss\`.

## Learn More

- [Jxion Framework Documentation](https://github.com/jxion/framework)
- [Component Library](https://jxion.dev/components)
`;

    await fs.writeFile(path.join(this.projectPath, "README.md"), readme);
  }
}
