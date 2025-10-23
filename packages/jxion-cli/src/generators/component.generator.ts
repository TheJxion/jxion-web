/**
 * Component Generator
 * Professional component generation for all frameworks
 */

import fs from "fs";
import path from "path";
import { heroTemplate } from "@jxion/core";

export interface ComponentGeneratorOptions {
  name: string;
  framework: "react" | "vue" | "svelte" | "solidjs" | "angular";
  category:
    | "layout"
    | "navigation"
    | "form"
    | "data-display"
    | "feedback"
    | "overlay"
    | "media"
    | "typography"
    | "utility";
  description?: string;
  props?: Record<string, any>;
}

export class ComponentGenerator {
  private frameworkTemplates: Record<
    string,
    (name: string, options: ComponentGeneratorOptions) => string
  > = {
    react: this.generateReactComponent,
    vue: this.generateVueComponent,
    svelte: this.generateSvelteComponent,
    solidjs: this.generateSolidJSComponent,
    angular: this.generateAngularComponent,
  };

  generateComponent(options: ComponentGeneratorOptions): string {
    const generator = this.frameworkTemplates[options.framework];
    if (!generator) {
      throw new Error(`Unsupported framework: ${options.framework}`);
    }

    return generator(options.name, options);
  }

  private generateReactComponent(
    name: string,
    options: ComponentGeneratorOptions
  ): string {
    const componentName = this.capitalizeFirst(name);
    const kebabName = this.kebabCase(name);

    return `import React from 'react';
import styles from '@jxion/design/src/components/${kebabName}.module.scss';
import type { ${componentName}Props } from '@jxion/shared';

export const ${componentName}: React.FC<${componentName}Props> = ({
  // Add your props here
}) => {
  return (
    <div className={styles.${kebabName}}>
      {/* Your component content */}
    </div>
  );
};

export default ${componentName};`;
  }

  private generateVueComponent(
    name: string,
    options: ComponentGeneratorOptions
  ): string {
    const componentName = this.capitalizeFirst(name);
    const kebabName = this.kebabCase(name);

    return `<template>
  <div :class="styles.${kebabName}">
    <!-- Your component content -->
  </div>
</template>

<script setup lang="ts">
import styles from '@jxion/design/src/components/${kebabName}.module.scss';
import type { ${componentName}Props } from '@jxion/shared';

const props = withDefaults(
  defineProps<${componentName}Props>(),
  {
    // Add your default props here
  }
);
</script>

<style scoped>
/* No styles here; styling comes from @jxion-design SCSS module */
</style>`;
  }

  private generateSvelteComponent(
    name: string,
    options: ComponentGeneratorOptions
  ): string {
    const componentName = this.capitalizeFirst(name);
    const kebabName = this.kebabCase(name);

    return `<script lang="ts">
  import styles from '@jxion/design/src/components/${kebabName}.module.scss';
  import type { ${componentName}Props } from '@jxion/shared';

  // Add your props here
</script>

<div class={styles.${kebabName}}>
  <!-- Your component content -->
</div>`;
  }

  private generateSolidJSComponent(
    name: string,
    options: ComponentGeneratorOptions
  ): string {
    const componentName = this.capitalizeFirst(name);
    const kebabName = this.kebabCase(name);

    return `import { Component } from 'solid-js';
import styles from '@jxion/design/src/components/${kebabName}.module.scss';
import type { ${componentName}Props } from '@jxion/shared';

export const ${componentName}: Component<${componentName}Props> = (props) => {
  return (
    <div class={styles.${kebabName}}>
      {/* Your component content */}
    </div>
  );
};

export default ${componentName};`;
  }

  private generateAngularComponent(
    name: string,
    options: ComponentGeneratorOptions
  ): string {
    const componentName = this.capitalizeFirst(name);
    const kebabName = this.kebabCase(name);

    return `import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import styles from '@jxion/design/src/components/${kebabName}.module.scss';
import type { ${componentName}Props } from '@jxion/shared';

@Component({
  selector: 'jx-${kebabName}',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div [class]="styles.${kebabName}">
      <!-- Your component content -->
    </div>
  \`,
  styleUrls: ['@jxion/design/src/components/${kebabName}.module.scss']
})
export class ${componentName}Component implements ${componentName}Props {
  // Add your inputs and outputs here
  
  styles = {
    ${kebabName}: '${kebabName}'
  };
}`;
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private kebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }

  // Generate SCSS module file
  generateSCSSModule(name: string, options: ComponentGeneratorOptions): string {
    const kebabName = this.kebabCase(name);

    return `@use '../tokens/design-tokens' as tokens;

.${kebabName} {
  // Add your component styles here
  // Use design tokens for consistency
  
  &__element {
    // Nested elements
  }
  
  &--modifier {
    // Modifier classes
  }
  
  @media (max-width: tokens.$breakpoint-md) {
    // Responsive styles
  }
}`;
  }

  // Generate TypeScript types
  generateTypes(name: string, options: ComponentGeneratorOptions): string {
    const componentName = this.capitalizeFirst(name);

    return `export interface ${componentName}Props {
  // Add your component props here
  className?: string;
  children?: React.ReactNode;
}`;
  }

  // Generate component template in @jxion/core
  generateCoreTemplate(
    name: string,
    options: ComponentGeneratorOptions
  ): string {
    const componentName = this.capitalizeFirst(name);
    const kebabName = this.kebabCase(name);

    return `/**
 * ${componentName} Component Template
 * Professional HTML template for all frameworks
 * Located in @jxion/core - templates only, no styles
 */

export const ${kebabName}Template = {
  html: \`
    <div class="${kebabName}">
      <!-- Your component HTML template -->
    </div>
  \`,
  
  react: \`
    import React from 'react';
    import styles from '@jxion/design/src/components/${kebabName}.module.scss';
    import type { ${componentName}Props } from '@jxion/shared';

    export const ${componentName}: React.FC<${componentName}Props> = (props) => {
      return (
        <div className={styles.${kebabName}}>
          {/* Your component content */}
        </div>
      );
    };

    export default ${componentName};
  \`,
  
  vue: \`
    <template>
      <div :class="styles.${kebabName}">
        <!-- Your component content -->
      </div>
    </template>

    <script setup lang="ts">
    import styles from '@jxion/design/src/components/${kebabName}.module.scss';
    import type { ${componentName}Props } from '@jxion/shared';

    const props = withDefaults(
      defineProps<${componentName}Props>(),
      {
        // Add your default props here
      }
    );
    </script>
  \`,
  
  svelte: \`
    <script lang="ts">
      import styles from '@jxion/design/src/components/${kebabName}.module.scss';
      import type { ${componentName}Props } from '@jxion/shared';

      // Add your props here
    </script>

    <div class={styles.${kebabName}}>
      <!-- Your component content -->
    </div>
  \`,
  
  solidjs: \`
    import { Component } from 'solid-js';
    import styles from '@jxion/design/src/components/${kebabName}.module.scss';
    import type { ${componentName}Props } from '@jxion/shared';

    export const ${componentName}: Component<${componentName}Props> = (props) => {
      return (
        <div class={styles.${kebabName}}>
          {/* Your component content */}
        </div>
      );
    };

    export default ${componentName};
  \`,
  
  angular: \`
    import { Component, Input, Output, EventEmitter } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import styles from '@jxion/design/src/components/${kebabName}.module.scss';
    import type { ${componentName}Props } from '@jxion/shared';

    @Component({
      selector: 'jx-${kebabName}',
      standalone: true,
      imports: [CommonModule],
      template: \`
        <div [class]="styles.${kebabName}">
          <!-- Your component content -->
        </div>
      \`,
      styleUrls: ['@jxion/design/src/components/${kebabName}.module.scss']
    })
    export class ${componentName}Component implements ${componentName}Props {
      // Add your inputs and outputs here
      
      styles = {
        ${kebabName}: '${kebabName}'
      };
    }
  \`
};`;
  }
}
