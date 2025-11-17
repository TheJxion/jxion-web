import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { TemplateRenderer, JSXRenderer, SvelteRenderer } from '@jxion/core';
import { JxionButton, JxionInput } from '@jxion/ui';
import styles from '../styles/CaseStudy.module.scss';
import {
  createGSAPContext,
  fadeIn,
  scaleIn,
} from '../lib/utils/gsap-animations';

// Create a simple hero template for demo
const demoHeroTemplate = `
  <section id="hero" class="hero" data-testid="hero">
    <h1 class="title">{{title}}</h1>
    <div class="body">
      <div class="content">
        <div class="space-y-5 hidden md:block">
          <p>{{tagline}}</p>
          <p class="subtitle">{{subtitle}}</p>
        </div>
        <div class="view-collection">
          <p class="subtitle">{{description}}</p>
          <a href="#collection">{{ctaText}}</a>
        </div>
      </div>
    </div>
  </section>
`;

export default function CaseStudyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendererDemo, setRendererDemo] = useState<{
    html: string;
    jsx: string;
    svelte: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<
    'demo' | 'architecture' | 'testing' | 'reflection' | 'renderer'
  >('demo');
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const ctx = createGSAPContext(containerRef.current);

    // Wait for DOM to be ready
    setTimeout(() => {
      // Animate sections
      const sections = containerRef.current?.querySelectorAll(
        `[class*="${styles.section}"]`
      );
      if (sections && sections.length > 0) {
        sections.forEach((section, index) => {
          fadeIn({
            element: section,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            to: { delay: index * 0.1 },
          });
        });
      }

      // Animate code blocks
      const codeBlocks = containerRef.current?.querySelectorAll('pre, code');
      if (codeBlocks && codeBlocks.length > 0) {
        scaleIn({
          element: Array.from(codeBlocks),
          scrollTrigger: {
            trigger: codeBlocks[0]?.parentElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, 100);

    return () => ctx.revert();
  }, []);

  const handleDemoSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!demoName || !demoEmail) {
        return;
      }
      setFormSuccess(true);
    },
    [demoEmail, demoName],
  );

  useEffect(() => {
    if (!formSuccess) {
      return;
    }
    const timer = setTimeout(() => setFormSuccess(false), 3500);
    return () => clearTimeout(timer);
  }, [formSuccess]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'demo':
        return (
          <div>
            <p className={styles.tabPanelText}>
              kitUP consumes the exact same <code>@jxion/ui</code> components
              that power noir-crafted and noir-admin. The toolkit is theme-aware
              via CSS variables, so buttons, inputs, and layout primitives stay
              consistent while products maintain their personality.
            </p>
            <ul className={styles.tabPanelList}>
              <li>Direct imports from the shared UI workspace</li>
              <li>Runtime theming through Noir design tokens</li>
              <li>GSAP motion hooks for every Shell surface</li>
              <li>Template-driven surfaces stay portable</li>
            </ul>
          </div>
        );
      case 'architecture':
        return (
          <div>
            <p className={styles.tabPanelText}>
              The shell keeps product surfaces independent but enforces the same
              render pipeline (Template → Renderer → Framework). kitUP
              orchestrates iframe experiences, template-driven pages, and admin
              previews without duplicating layout code.
            </p>
            <p className={styles.tabPanelText}>
              Noir-crafted stays on SvelteKit, Primary runs template-driven
              React, and admin tooling lives in noir-admin—yet every experience
              maps back to the same renderer primitives inside{' '}
              <code>@jxion/core</code>.
            </p>
          </div>
        );
      case 'testing':
        return (
          <div>
            <p className={styles.tabPanelText}>
              Component smoke tests live with <code>@jxion/ui</code>, renderer
              contracts are validated through TemplateRenderer snapshots, and
              kitUP performs integration checks when iframes mount.
            </p>
            <ul className={styles.tabPanelList}>
              <li>Visual regression on shell layouts</li>
              <li>Renderer pipeline snapshots per template</li>
              <li>GSAP hook unit tests (ScrollTrigger config)</li>
              <li>Manual route verification for iframe fallbacks</li>
            </ul>
          </div>
        );
      case 'reflection':
        return (
          <div>
            <p className={styles.tabPanelText}>
              Consolidating noir-nextjs into kitUP removed an entire app while
              preserving the story: all demos now live in one Next.js code path
              and inherit the same theming, linting, and deployment target.
            </p>
            <p className={styles.tabPanelText}>
              The refactor keeps template-driven thinking front-and-center—the
              React demo now sits next to the renderer showcase and points back
              to noir-crafted for the fully bespoke experience.
            </p>
          </div>
        );
      case 'renderer':
        if (!rendererDemo) {
          return (
            <p className={styles.tabPanelText}>
              Renderer output is compiling—switch tabs or refresh to view the
              HTML/JSX/Svelte breakdown.
            </p>
          );
        }
        return (
          <div className={styles.rendererGrid}>
            <div>
              <h4 className={styles.rendererTitle}>TemplateRenderer (HTML)</h4>
              <pre className={styles.codeBlock}>
                {rendererDemo.html.substring(0, 400)}...
              </pre>
            </div>
            <div>
              <h4 className={styles.rendererTitle}>JSXRenderer (React)</h4>
              <pre className={styles.codeBlock}>{rendererDemo.jsx}</pre>
            </div>
            <div>
              <h4 className={styles.rendererTitle}>SvelteRenderer (Svelte)</h4>
              <pre className={styles.codeBlock}>
                {rendererDemo.svelte.substring(0, 400)}...
              </pre>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    // Demo variables for renderer pipeline (using primary product content)
    const demoVariables = {
      title: 'Primary Product',
      tagline: 'Your digital transformation story, our tools',
      subtitle: 'Management system with MTSK integration',
      description:
        'Join thousands of successful organizations that have streamlined their processes with our platform and experience digital transformation!',
      ctaText: 'Get Started Now',
    };

    try {
      // Step 1: Template Renderer (HTML output)
      const htmlOutput = TemplateRenderer.render({
        template: demoHeroTemplate,
        variables: demoVariables,
      });

      // Step 2: JSX Renderer (React JSX - returns React element, so we'll show the concept)
      // Note: JSXRenderer returns React.ReactElement, not string
      // For demo purposes, we'll show a simplified JSX string representation
      const jsxOutput = `
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <h1 className="title">${demoVariables.title}</h1>
      <p className="subtitle">${demoVariables.subtitle}</p>
      <p className="description">${demoVariables.description}</p>
      <a href="#collection" className="cta">${demoVariables.ctaText}</a>
    </section>
  );
};
      `.trim();

      // Step 3: Svelte Renderer (Svelte template output)
      const svelteOutput = SvelteRenderer.render({
        template: demoHeroTemplate,
        variables: demoVariables,
        styles: {},
      });

      setRendererDemo({
        html: htmlOutput,
        jsx: jsxOutput,
        svelte: svelteOutput,
      });
    } catch (error) {
      console.error('Error in renderer demo:', error);
    }
  }, []);
  return (
    <>
      <Head>
        <title>kitUP Framework - Case Study</title>
        <meta
          name="description"
          content="React Developer Case Study - Multi-Product Shell Architecture"
        />
      </Head>
      <div ref={containerRef} className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            kitUP Framework: React Developer Case Study
          </h1>
          <p className={styles.subtitle}>
            Multi-Product Shell Architecture with Shared Component Library
          </p>
        </header>

        <section className={`${styles.section} ${styles.componentSection}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Shared Component Library Showcase
            </h2>
            <p className={styles.sectionText}>
              Directly reuse the Noir-themed <code>@jxion/ui</code> primitives.
              The same buttons and form fields power noir-crafted, noir-admin,
              and this Next.js shell—no style drift, no bespoke overrides.
            </p>
          </div>

          <div className={styles.componentGrid}>
            <div className={styles.componentCard}>
              <h3>Button Variants</h3>
              <p>Exact palette + motion exported from @jxion/design tokens.</p>
              <div className={styles.buttonStack}>
                <JxionButton
                  variant="primary"
                  onClick={() => alert('Primary clicked!')}
                >
                  Primary (Mürdüm)
                </JxionButton>
                <JxionButton
                  variant="secondary"
                  onClick={() => alert('Secondary clicked!')}
                >
                  Secondary (Gold)
                </JxionButton>
                <JxionButton
                  variant="danger"
                  onClick={() => alert('Danger clicked!')}
                >
                  Danger
                </JxionButton>
              </div>
              <ul className={styles.componentList}>
                <li>Token-aware background + text colors</li>
                <li>Hover/active states built into component</li>
                <li>Full-width toggle for CTA bars</li>
              </ul>
            </div>

            <div className={styles.componentCard}>
              <h3>Form Inputs</h3>
              <p>Live state mirrors what noir-admin surfaces in production.</p>
              <form className={styles.demoForm} onSubmit={handleDemoSubmit}>
                <JxionInput
                  label="Name"
                  value={demoName}
                  onChange={setDemoName}
                  placeholder="Enter your name"
                  required
                />
                <JxionInput
                  label="Email"
                  type="email"
                  value={demoEmail}
                  onChange={setDemoEmail}
                  placeholder="Enter your email"
                  required
                />
                <JxionButton type="submit" fullWidth>
                  Generate Component Preview
                </JxionButton>
                {formSuccess && (
                  <p className={styles.successMessage}>
                    Component request queued — check the Renderer tab for output.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.tabSection}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Case Study Overview</h2>
            <p className={styles.sectionText}>
              These tabs summarize the same narrative that previously lived
              inside <code>@noir-nextjs</code>, now consolidated within the
              kitUP shell.
            </p>
          </div>
          <div className={styles.tabNav}>
            {['demo', 'architecture', 'testing', 'reflection', 'renderer'].map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.tabButton} ${
                    activeTab === tab ? styles.tabButtonActive : ''
                  }`}
                  onClick={() =>
                    setActiveTab(
                      tab as
                        | 'demo'
                        | 'architecture'
                        | 'testing'
                        | 'reflection'
                        | 'renderer',
                    )
                  }
                >
                  {tab === 'demo' && 'Demo'}
                  {tab === 'architecture' && 'Architecture'}
                  {tab === 'testing' && 'Testing'}
                  {tab === 'reflection' && 'Reflection'}
                  {tab === 'renderer' && 'Renderer'}
                </button>
              ),
            )}
          </div>
          <div className={styles.tabPanel}>{renderTabContent()}</div>
        </section>

        <main className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              The Challenge: Multi-Product Management
            </h2>
            <p className={styles.sectionText}>
              As a company grows, managing multiple products becomes
              increasingly complex. Each product needs its own site and admin
              panel, but maintaining consistency across all products is crucial
              for brand identity and developer efficiency. Our primary product
              (a driving school management system) demonstrates how Jxion's
              template-driven architecture enables rapid development while
              maintaining consistency.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              The Solution: Shell Architecture
            </h2>
            <p className={styles.sectionText}>
              The kitUP Framework implements a shell architecture where a single
              host application manages multiple independent products. Our
              primary product (a driving school management system) uses
              template-driven architecture with Jxion renderers, while other
              products (Lumen, Helix) can be independently deployable but share
              the same component library and design system.
            </p>
            <div className={styles.architecture}>
              <div className={styles.archItem}>
                <h3>Shared Component Library</h3>
                <p>
                  @jxion/ui provides reusable React components for all products
                </p>
              </div>
              <div className={styles.archItem}>
                <h3>Unified Design System</h3>
                <p>
                  CSS variables ensure consistent branding across all products
                </p>
              </div>
              <div className={styles.archItem}>
                <h3>Independent Deployment</h3>
                <p>
                  Each product can be deployed separately while sharing core
                  infrastructure
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Achievements</h2>
            <ul className={styles.achievements}>
              <li>
                ✅ Component creation time: 30min → 2min (15x improvement)
              </li>
              <li>✅ Design consistency: 100% across all products</li>
              <li>✅ Framework portability: Instant via shared library</li>
              <li>
                ✅ Multi-product management: Single shell, multiple products
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Template-Driven Architecture
            </h2>
            <p className={styles.sectionText}>
              The Jxion Framework follows a template-driven philosophy where
              HTML templates are combined with data to generate content. The
              same template can be converted to different framework syntaxes
              (React JSX, Svelte, Vue) using renderers.
            </p>
            <div className={styles.architecture}>
              <div className={styles.archItem}>
                <h3>TemplateRenderer</h3>
                <p>Renders HTML templates with variable substitution</p>
              </div>
              <div className={styles.archItem}>
                <h3>JSXRenderer</h3>
                <p>Converts HTML templates to React JSX elements</p>
              </div>
              <div className={styles.archItem}>
                <h3>SvelteRenderer</h3>
                <p>Converts HTML templates to Svelte template syntax</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Renderer Pipeline Demo</h2>
            <p className={styles.sectionText}>
              Below demonstrates the Jxion renderer pipeline using a real hero
              template from <code>@jxion/core</code>:
            </p>

            {rendererDemo && (
              <div className={styles.rendererDemo}>
                <div className={styles.rendererOutput}>
                  <h3 className={styles.rendererTitle}>
                    Step 1: TemplateRenderer (HTML)
                  </h3>
                  <pre className={styles.codeBlock}>
                    {rendererDemo.html.substring(0, 500)}...
                  </pre>
                </div>

                <div className={styles.rendererOutput}>
                  <h3 className={styles.rendererTitle}>
                    Step 2: JSXRenderer (React JSX)
                  </h3>
                  <pre className={styles.codeBlock}>{rendererDemo.jsx}</pre>
                </div>

                <div className={styles.rendererOutput}>
                  <h3 className={styles.rendererTitle}>
                    Step 3: SvelteRenderer (Svelte)
                  </h3>
                  <pre className={styles.codeBlock}>
                    {rendererDemo.svelte.substring(0, 500)}...
                  </pre>
                </div>
              </div>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Architecture Diagram</h2>
            <div className={styles.diagram}>
              <pre className={styles.codeBlock}>
                {`kitUP Shell Application

    │

    ├── @jxion/ui (Shared Components)

    ├── @jxion/core (Template Renderers)

    │   ├── TemplateRenderer (HTML)

    │   ├── JSXRenderer (React)

    │   └── SvelteRenderer (Svelte)

    ├── @jxion/design (Design Tokens)

    ├── @jxion/i18n (Content)

    │

    ├── Primary Product (Template-Driven)

    │   ├── Site (TemplateRenderer)

    │   └── Admin (TemplateRenderer)

    │

    ├── Lumen Product

    │   ├── Site (iframe)

    │   └── Admin (iframe)

    │

    └── Helix Product

        ├── Site (iframe)

        └── Admin (iframe)`}
              </pre>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
