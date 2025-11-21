import { createSignal } from 'solid-js';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';

export default function App() {
  const [modalOpen, setModalOpen] = createSignal(false);
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);

  const navItems = [
    { text: 'Home', href: '/', active: true },
    { text: 'Components', href: '/components' },
    { text: 'Documentation', href: '/docs' },
  ];

  const socialLinks = [
    { href: '#', icon: '🐙' },
    { href: '#', icon: '📦' },
    { href: '#', icon: '💬' },
  ];

  const footerSections = [
    {
      title: 'Components',
      links: [
        { text: 'Hero', href: '#hero' },
        { text: 'Card', href: '#card' },
        { text: 'Button', href: '#button' },
      ],
    },
    {
      title: 'Frameworks',
      links: [
        { text: 'React', href: '#react' },
        { text: 'Vue', href: '#vue' },
        { text: 'Svelte', href: '#svelte' },
      ],
    },
  ];

  const legalLinks = [
    { text: 'Privacy Policy', href: '#privacy' },
    { text: 'Terms of Service', href: '#terms' },
  ];

  const componentCount = 10;

  const componentShowcaseContent = () => `
    <div class="components-grid">
      <div class="card">
        <h3>Card Component</h3>
        <p>Template from @jxion-core</p>
        <p>This card is rendered using the cardTemplate from @jxion-core with proper CSS module styling.</p>
        <div class="card-stats">
          <span class="stats-value">100%</span>
          <span class="stats-label">Type Safe</span>
        </div>
      </div>
      <div class="card">
        <h3>Design System</h3>
        <p>Unified Styling</p>
        <p>All styling comes from @jxion-design SCSS modules and design tokens.</p>
        <div class="card-stats">
          <span class="stats-value">400+</span>
          <span class="stats-label">Tokens</span>
        </div>
      </div>
    </div>
  `;

  const templateSystemContent = () => `
    <div class="template-system">
      <div class="card">
        <h3>Template Rendering</h3>
        <p>Variable Substitution</p>
        <p>All components use HTML templates with {{variable}} substitution from @jxion-core.</p>
        <div class="card-stats">
          <span class="stats-value">⚡</span>
          <span class="stats-label">Fast</span>
        </div>
      </div>
      <div class="card">
        <h3>Framework Adapters</h3>
        <p>Multi-Framework Support</p>
        <p>Automatic detection and adaptation for React, Vue, Svelte, and SolidJS.</p>
        <div class="card-stats">
          <span class="stats-value">4+</span>
          <span class="stats-label">Frameworks</span>
        </div>
      </div>
    </div>
  `;

  const utilitiesDemoContent = () => `
    <div class="utilities-demo">
      <div class="card">
        <h3>Template Renderer</h3>
        <p>Dynamic Processing</p>
        <p>Framework: SolidJS | Version: 1.0.0</p>
        <div class="card-stats">
          <span class="stats-value">⚡</span>
          <span class="stats-label">Fast</span>
        </div>
      </div>
      <div class="card">
        <h3>Component Registry</h3>
        <p>Available Components</p>
        <p>Total Components: ${componentCount}</p>
        <div class="card-stats">
          <span class="stats-value">10+</span>
          <span class="stats-label">Components</span>
        </div>
      </div>
    </div>
  `;

  const handleCtaClick = () => {
    console.log('CTA clicked!');
    setModalOpen(true);
  };

  const handleMobileToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen());
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Layout params={{ lang: 'en', theme: 'light' }}>
      <Header
        logoText="Jxion Framework"
        logoHref="/"
        navItems={navItems}
        actionsContent="<button class='button primary'>Get Started</button>"
        onMobileToggle={handleMobileToggle}
        mobileMenuOpen={mobileMenuOpen()}
      />

      <Hero
        title="Jxion Framework Demo"
        subtitle="SolidJS Integration"
        description="Comprehensive demo showcasing all components, utilities, and rendering engine from @jxion-core with proper template rendering and styling."
        ctaText="Explore Components"
        statsValue="10+"
        statsLabel="Components"
        cardSubtitle="Multi-framework component library"
        onCtaClick={handleCtaClick}
      />

      <Section
        title="Component Showcase"
        subtitle="All Jxion Components"
        description="Demonstrating the complete component library with template rendering from @jxion-core"
        variant="default"
        content={componentShowcaseContent()}
      />

      <Section
        title="Template System"
        subtitle="HTML Templates & Renderers"
        description="Showcasing the template rendering system with variable substitution and framework adapters"
        variant="accent"
        content={templateSystemContent()}
      />

      <Section
        title="Framework Engine"
        subtitle="@jxion-core Utilities"
        description="Showcasing TemplateRenderer, frameworkConfigs, and componentRegistry from the core engine"
        variant="dark"
        content={utilitiesDemoContent()}
      />

      <Footer
        logoText="Jxion Framework"
        logoHref="/"
        description="Multi-framework component library with centralized templates and design system."
        socialLinks={socialLinks}
        sections={footerSections}
        copyright="© 2025 Jxion Framework. All rights reserved."
        copyrightYear="2025"
        legalLinks={legalLinks}
      />

      <Modal
        isOpen={modalOpen()}
        title="Jxion Framework Demo"
        bodyContent="This modal demonstrates the complete Jxion Framework integration with template rendering from @jxion-core and proper event handling."
        showFooter={true}
        footerContent="<div class='modal-actions'><button class='button secondary'>Close</button><button class='button primary'>Continue</button></div>"
        onClose={handleModalClose}
        onBackdropClick={handleModalClose}
      />
    </Layout>
  );
}
