/**
 * Case Study Templates
 *
 * HTML templates for the React Developer Case Study route.
 * Uses Jxion TemplateRenderer with {{variable}} syntax.
 * Demonstrates template-driven, framework-agnostic rendering.
 */

export const caseStudyTemplates = {
  hero: `
    <div class="case-study-hero bg-[var(--color-noir-black)] text-[var(--color-noir-text-primary)] py-16 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-5xl md:text-7xl font-serif text-[var(--color-noir-gold)] mb-4">
          {{title}}
        </h1>
        <p class="text-xl md:text-2xl font-sans text-[var(--color-noir-text-secondary)]">
          {{subtitle}}
        </p>
      </div>
    </div>
  `,

  section1: `
    <section class="section bg-[var(--color-noir-black)] text-[var(--color-noir-text-primary)] py-12 px-4">
      <div class="container max-w-4xl mx-auto">
        <h2 class="text-4xl font-serif text-[var(--color-noir-primary)] mb-6">{{title}}</h2>
        <div class="prose prose-invert max-w-none">
          <p class="text-lg text-[var(--color-noir-text-secondary)] mb-4">{{intro}}</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-2">{{metric1Label}}</h3>
              <p class="text-3xl font-bold text-white">{{metric1Value}}</p>
            </div>
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-2">{{metric2Label}}</h3>
              <p class="text-3xl font-bold text-white">{{metric2Value}}</p>
            </div>
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-2">{{metric3Label}}</h3>
              <p class="text-3xl font-bold text-white">{{metric3Value}}</p>
            </div>
          </div>
          <p class="text-[var(--color-noir-text-secondary)]">{{conclusion}}</p>
        </div>
      </div>
    </section>
  `,

  section2: `
    <section class="section bg-[var(--color-noir-black)] text-[var(--color-noir-text-primary)] py-12 px-4">
      <div class="container max-w-4xl mx-auto">
        <h2 class="text-4xl font-serif text-[var(--color-noir-primary)] mb-6">{{title}}</h2>
        <div class="prose prose-invert max-w-none">
          <p class="text-lg text-[var(--color-noir-text-secondary)] mb-4">{{intro}}</p>
          <div class="space-y-6 my-8">
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-2xl font-serif text-[var(--color-noir-primary)] mb-3">{{feature1Title}}</h3>
              <p class="text-[var(--color-noir-text-secondary)]">{{feature1Description}}</p>
            </div>
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-2xl font-serif text-[var(--color-noir-primary)] mb-3">{{feature2Title}}</h3>
              <p class="text-[var(--color-noir-text-secondary)]">{{feature2Description}}</p>
            </div>
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-2xl font-serif text-[var(--color-noir-primary)] mb-3">{{feature3Title}}</h3>
              <p class="text-[var(--color-noir-text-secondary)]">{{feature3Description}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  section3: `
    <section class="section bg-[var(--color-noir-black)] text-[var(--color-noir-text-primary)] py-12 px-4">
      <div class="container max-w-4xl mx-auto">
        <h2 class="text-4xl font-serif text-[var(--color-noir-primary)] mb-6">{{title}}</h2>
        <div class="prose prose-invert max-w-none">
          <p class="text-lg text-[var(--color-noir-text-secondary)] mb-4">{{intro}}</p>
          <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)] my-8">
            <h3 class="text-2xl font-serif text-[var(--color-noir-primary)] mb-4">{{demoTitle}}</h3>
            <p class="text-[var(--color-noir-text-secondary)] mb-4">{{demoDescription}}</p>
            <div class="ai-demo-container">
              <!-- AIContentFetcher will be injected here via LocalReactWrapper -->
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h4 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-2">{{metric1Label}}</h4>
              <p class="text-3xl font-bold text-white">{{metric1Value}}</p>
            </div>
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h4 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-2">{{metric2Label}}</h4>
              <p class="text-3xl font-bold text-white">{{metric2Value}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  section4: `
    <section class="section bg-[var(--color-noir-black)] text-[var(--color-noir-text-primary)] py-12 px-4">
      <div class="container max-w-4xl mx-auto">
        <h2 class="text-4xl font-serif text-[var(--color-noir-primary)] mb-6">{{title}}</h2>
        <div class="prose prose-invert max-w-none">
          <p class="text-lg text-[var(--color-noir-text-secondary)] mb-4">{{intro}}</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-2">Unit Tests</h3>
              <p class="text-2xl font-bold text-white mb-2">{{unitTestCoverage}}</p>
              <p class="text-sm text-[var(--color-noir-text-secondary)]">Tool: {{unitTestTool}}</p>
            </div>
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-2">Integration Tests</h3>
              <p class="text-2xl font-bold text-white mb-2">{{integrationTestCoverage}}</p>
              <p class="text-sm text-[var(--color-noir-text-secondary)]">Tool: {{integrationTestTool}}</p>
            </div>
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-2">E2E Tests</h3>
              <p class="text-2xl font-bold text-white mb-2">100%</p>
              <p class="text-sm text-[var(--color-noir-text-secondary)]">Tool: {{e2eTestTool}}</p>
            </div>
          </div>
          <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)] my-8">
            <h3 class="text-2xl font-serif text-[var(--color-noir-primary)] mb-4">CI/CD Pipeline</h3>
            <p class="text-[var(--color-noir-text-secondary)]">{{cicdDescription}}</p>
          </div>
        </div>
      </div>
    </section>
  `,

  section5: `
    <section class="section bg-[var(--color-noir-black)] text-[var(--color-noir-text-primary)] py-12 px-4">
      <div class="container max-w-4xl mx-auto">
        <h2 class="text-4xl font-serif text-[var(--color-noir-primary)] mb-6">{{title}}</h2>
        <div class="prose prose-invert max-w-none">
          <p class="text-lg text-[var(--color-noir-text-secondary)] mb-6">{{intro}}</p>
          
          <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)] my-8">
            <h3 class="text-2xl font-serif text-[var(--color-noir-primary)] mb-4">Speed vs. Scale: The Balance</h3>
            <p class="text-[var(--color-noir-text-secondary)] mb-4">{{point1}}</p>
          </div>

          <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)] my-8">
            <h3 class="text-2xl font-serif text-[var(--color-noir-primary)] mb-4">Excitement About AI Integration</h3>
            <p class="text-[var(--color-noir-text-secondary)] mb-4">{{point2}}</p>
          </div>

          <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)] my-8">
            <h3 class="text-2xl font-serif text-[var(--color-noir-primary)] mb-4">Biggest Technical Challenge</h3>
            <p class="text-[var(--color-noir-text-secondary)] mb-4">{{technicalChallenge}}</p>
          </div>

          <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)] my-8">
            <h3 class="text-2xl font-serif text-[var(--color-noir-primary)] mb-4">First 30 Days: The Foundation</h3>
            <p class="text-[var(--color-noir-text-secondary)] mb-4">{{point4}}</p>
          </div>

          <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)] my-8">
            <h3 class="text-2xl font-serif text-[var(--color-noir-primary)] mb-4">What Defines a Great Front-End Engineer</h3>
            <p class="text-[var(--color-noir-text-secondary)] mb-4">{{point5}}</p>
          </div>
        </div>
      </div>
    </section>
  `,

  rendererDemo: `
    <section class="section bg-[var(--color-noir-black)] text-[var(--color-noir-text-primary)] py-12 px-4">
      <div class="container max-w-4xl mx-auto">
        <h2 class="text-4xl font-serif text-[var(--color-noir-gold)] mb-6">Jxion Renderer Pipeline Demonstration</h2>
        <div class="prose prose-invert max-w-none">
          <p class="text-lg text-[var(--color-noir-text-secondary)] mb-6">{{intro}}</p>
          
          <div class="space-y-6 my-8">
            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-4">1. Raw Template (HTML with variables)</h3>
              <pre class="bg-black p-4 rounded text-sm overflow-x-auto"><code>{{rawTemplate}}</code></pre>
            </div>

            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-4">2. Rendered HTML (TemplateRenderer)</h3>
              <pre class="bg-black p-4 rounded text-sm overflow-x-auto"><code>{{renderedHtml}}</code></pre>
            </div>

            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-4">3. JSX Output (JSXRenderer)</h3>
              <pre class="bg-black p-4 rounded text-sm overflow-x-auto"><code>{{jsxOutput}}</code></pre>
            </div>

            <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)]">
              <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-4">4. Svelte Output (SvelteRenderer)</h3>
              <pre class="bg-black p-4 rounded text-sm overflow-x-auto"><code>{{svelteOutput}}</code></pre>
            </div>
          </div>

          <div class="p-6 bg-[var(--color-noir-background-secondary)] rounded-lg border border-[var(--color-noir-border)] my-8">
            <h3 class="text-xl font-semibold text-[var(--color-noir-gold)] mb-4">Architectural Benefit</h3>
            <p class="text-[var(--color-noir-text-secondary)]">{{benefit}}</p>
          </div>
        </div>
      </div>
    </section>
  `,
};
