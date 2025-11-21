<template>
  <Layout :params="{ lang: 'en', theme: 'light' }">
    <Header
      logo-text="Jxion Framework"
      logo-href="/"
      :nav-items="navItems"
      actions-content="<button class='button primary'>Get Started</button>"
      :on-mobile-toggle="handleMobileToggle"
      :mobile-menu-open="mobileMenuOpen"
    />

    <Hero
      title="Jxion Framework Demo"
      subtitle="Vue Integration"
      description="Comprehensive demo showcasing all components, utilities, and rendering engine from @jxion-core with proper template rendering and styling."
      cta-text="Explore Components"
      stats-value="10+"
      stats-label="Components"
      card-subtitle="Multi-framework component library"
      :on-cta-click="handleCtaClick"
    />

    <Section
      title="Component Showcase"
      subtitle="All Jxion Components"
      description="Demonstrating the complete component library with template rendering from @jxion-core"
      variant="default"
      :content="componentShowcaseContent"
    />

    <Section
      title="Template System"
      subtitle="HTML Templates & Renderers"
      description="Showcasing the template rendering system with variable substitution and framework adapters"
      variant="accent"
      :content="templateSystemContent"
    />

    <Section
      title="Framework Engine"
      subtitle="@jxion-core Utilities"
      description="Showcasing TemplateRenderer, frameworkConfigs, and componentRegistry from the core engine"
      variant="dark"
      :content="utilitiesDemoContent"
    />

    <Footer
      logo-text="Jxion Framework"
      logo-href="/"
      description="Multi-framework component library with centralized templates and design system."
      :social-links="socialLinks"
      :sections="footerSections"
      copyright="© 2025 Jxion Framework. All rights reserved."
      copyright-year="2025"
      :legal-links="legalLinks"
    />

    <Modal
      :is-open="modalOpen"
      title="Jxion Framework Demo"
      body-content="This modal demonstrates the complete Jxion Framework integration with template rendering from @jxion-core and proper event handling."
      :show-footer="true"
      footer-content="<div class='modal-actions'><button class='button secondary'>Close</button><button class='button primary'>Continue</button></div>"
      :on-close="handleModalClose"
      :on-backdrop-click="handleModalClose"
    />
  </Layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Layout from "./components/Layout.vue";
import Header from "./components/Header.vue";
import Hero from "./components/Hero.vue";
import Section from "./components/Section.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";

// Local state
const modalOpen = ref(false);
const mobileMenuOpen = ref(false);

// Navigation data
const navItems = ref([
  { text: "Home", href: "/", active: true },
  { text: "Components", href: "/components" },
  { text: "Documentation", href: "/docs" },
]);

const socialLinks = ref([
  { href: "#", icon: "🐙" },
  { href: "#", icon: "📦" },
  { href: "#", icon: "💬" },
]);

const footerSections = ref([
  {
    title: "Components",
    links: [
      { text: "Hero", href: "#hero" },
      { text: "Card", href: "#card" },
      { text: "Button", href: "#button" },
    ],
  },
  {
    title: "Frameworks",
    links: [
      { text: "React", href: "#react" },
      { text: "Vue", href: "#vue" },
      { text: "Svelte", href: "#svelte" },
    ],
  },
]);

const legalLinks = ref([
  { text: "Privacy Policy", href: "#privacy" },
  { text: "Terms of Service", href: "#terms" },
]);

const componentCount = 10;

const componentShowcaseContent = `
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

const templateSystemContent = `
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

const utilitiesDemoContent = `
  <div class="utilities-demo">
    <div class="card">
      <h3>Template Renderer</h3>
      <p>Dynamic Processing</p>
      <p>Framework: Vue | Version: 3.0.0</p>
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

// Event handlers
const handleCtaClick = () => {
  console.log("CTA clicked!");
  modalOpen.value = true;
};

const handleMobileToggle = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleModalClose = () => {
  modalOpen.value = false;
};
</script>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
