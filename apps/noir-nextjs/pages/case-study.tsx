import { useState, useEffect } from 'react';
import Head from 'next/head';
import { JxionButton } from '@jxion/ui';
import { TemplateRenderer } from '@jxion/core';

// Import case study templates and data
// Note: These would need to be copied or shared from noir-crafted
const caseStudyTemplates = {
  hero: `
    <div class="case-study-header py-16 px-4">
      <div class="container max-w-7xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-serif mb-4" style="color: var(--color-noir-secondary);">
          {{title}}
        </h1>
        <p class="text-xl md:text-2xl mb-8" style="color: var(--color-noir-text-muted);">
          {{subtitle}}
        </p>
      </div>
    </div>
  `,
  section1: `
    <section class="py-16 px-4">
      <div class="container max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-6" style="color: var(--color-noir-primary);">
          {{title}}
        </h2>
        <div class="prose prose-invert max-w-none" style="color: var(--color-noir-text);">
          {{content}}
        </div>
      </div>
    </section>
  `,
};

const caseStudyData = {
  hero: {
    title: 'Jxion Framework: React Developer Case Study',
    subtitle: 'Multi-Framework Component Architecture with AI Integration',
  },
  section1: {
    title: 'Architecture Overview',
    content: `
      <p>The Jxion Framework demonstrates a unified monorepo architecture that solves the critical conflict between speed-to-market and architectural consistency.</p>
      <p>Built with Nx, React, and SvelteKit, it showcases multi-framework component reuse, unified design systems, and AI-powered development acceleration.</p>
    `,
  },
};

export default function CaseStudyPage() {
  const [activeTab, setActiveTab] = useState<
    'demo' | 'architecture' | 'testing' | 'reflection' | 'renderer'
  >('demo');
  const [renderedContent, setRenderedContent] = useState<{
    hero: string;
    section1: string;
  }>({ hero: '', section1: '' });

  useEffect(() => {
    // Render templates on mount
    setRenderedContent({
      hero: TemplateRenderer.render({
        template: caseStudyTemplates.hero,
        variables: caseStudyData.hero,
      }),
      section1: TemplateRenderer.render({
        template: caseStudyTemplates.section1,
        variables: caseStudyData.section1,
      }),
    });
  }, []);

  const tabs = [
    { id: 'demo' as const, label: 'Demo' },
    { id: 'architecture' as const, label: 'Architecture' },
    { id: 'testing' as const, label: 'Testing' },
    { id: 'reflection' as const, label: 'Reflection' },
    { id: 'renderer' as const, label: 'Renderer Demo' },
  ];

  return (
    <>
      <Head>
        <title>Jxion Framework - Case Study</title>
        <meta
          name="description"
          content="React Developer Case Study showcasing Jxion's multi-framework component architecture"
        />
      </Head>
      <div
        className="min-h-screen"
        style={{ backgroundColor: 'var(--color-noir-background-primary)' }}
      >
        {/* Breadcrumb Navigation */}
        <nav
          className="sticky top-0 z-50 border-b backdrop-blur-sm"
          style={{
            backgroundColor: 'var(--color-noir-background-primary)',
            borderColor: 'var(--color-noir-border)',
            opacity: 0.8,
          }}
        >
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2 text-sm">
                <a
                  href="/"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--color-noir-text-muted)' }}
                >
                  Home
                </a>
                <span style={{ color: 'var(--color-noir-text-muted)' }}>→</span>
                <span style={{ color: 'var(--color-noir-text)' }}>
                  Case Study
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Header */}
        <header
          className="p-8 border-b"
          style={{ borderColor: 'var(--color-noir-border)' }}
        >
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: 'var(--color-noir-secondary)' }}
          >
            Jxion Framework: React Developer Case Study
          </h1>
          <p
            className="text-xl"
            style={{ color: 'var(--color-noir-text-muted)' }}
          >
            Multi-Framework Component Architecture with AI Integration
          </p>
        </header>

        {/* Tabs */}
        <nav
          className="flex space-x-4 p-6 border-b overflow-x-auto"
          style={{ borderColor: 'var(--color-noir-border)' }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
              style={{
                backgroundColor:
                  activeTab === tab.id
                    ? 'var(--color-noir-primary)'
                    : 'transparent',
                color:
                  activeTab === tab.id
                    ? 'var(--color-noir-text)'
                    : 'var(--color-noir-text-muted)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="p-8">
          {activeTab === 'demo' && (
            <div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--color-noir-primary)' }}
              >
                Component Demo
              </h2>
              <div
                className="p-6 rounded-lg border mb-6"
                style={{
                  backgroundColor: 'var(--color-noir-background-secondary)',
                  borderColor: 'var(--color-noir-border)',
                }}
              >
                <p style={{ color: 'var(--color-noir-text)' }}>
                  This Next.js application demonstrates direct consumption of
                  Jxion UI components from the shared library.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--color-noir-primary)' }}
              >
                Architecture
              </h2>
              <div
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: 'var(--color-noir-background-secondary)',
                  borderColor: 'var(--color-noir-border)',
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: renderedContent.section1 }}
                  style={{ color: 'var(--color-noir-text)' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'testing' && (
            <div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--color-noir-primary)' }}
              >
                Testing Strategy
              </h2>
              <div
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: 'var(--color-noir-background-secondary)',
                  borderColor: 'var(--color-noir-border)',
                }}
              >
                <p style={{ color: 'var(--color-noir-text)' }}>
                  Comprehensive testing strategy including unit tests,
                  integration tests, and E2E tests.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reflection' && (
            <div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--color-noir-primary)' }}
              >
                Reflection
              </h2>
              <div
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: 'var(--color-noir-background-secondary)',
                  borderColor: 'var(--color-noir-border)',
                }}
              >
                <p style={{ color: 'var(--color-noir-text)' }}>
                  Detailed reflection on the development process, challenges
                  faced, and lessons learned.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'renderer' && (
            <div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--color-noir-primary)' }}
              >
                Template Renderer Demo
              </h2>
              <div
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: 'var(--color-noir-background-secondary)',
                  borderColor: 'var(--color-noir-border)',
                }}
              >
                <p style={{ color: 'var(--color-noir-text)' }}>
                  Demonstration of Jxion's template-driven rendering system.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer
          className="mt-32 py-16 border-t"
          style={{ borderColor: 'var(--color-noir-border)' }}
        >
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <p
              className="text-sm"
              style={{ color: 'var(--color-noir-text-muted)' }}
            >
              © 2025 Jxion Framework. Built with React, Next.js, and Nx.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
