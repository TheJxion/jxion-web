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
      description="Comprehensive demo showcasing all components, utilities, hooks, and engine from @jxion-core with proper template rendering and styling."
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
      title="Backend Integration"
      subtitle="tRPC & Services"
      description="Demonstrating backend integration with useMessages and useGreetings hooks"
      variant="accent"
      :content="backendIntegrationContent"
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
import { onMounted, ref, computed } from "vue";
import { Layout } from "./components/Layout.vue";
import { Header } from "./components/Header.vue";
import { Hero } from "./components/Hero.vue";
import { Card } from "./components/Card.vue";
import { Input } from "./components/Input.vue";
import { CTA } from "./components/CTA.vue";
import { Section } from "./components/Section.vue";
import { Footer } from "./components/Footer.vue";
import { Modal } from "./components/Modal.vue";
import { messageService, greetingService } from "@jxion/core";

// Global state management
const messages = ref<Array<{ id: string; user: string; message: string }>>([]);
const greeting = ref<{ message: string } | null>(null);
const isLoadingMessages = ref(false);
const isLoadingGreeting = ref(false);
const messagesError = ref<string | null>(null);
const greetingError = ref<string | null>(null);

// Local state
const modalOpen = ref(false);
const inputValue = ref("");
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

const componentCount = ref(10);

// HTML content for sections (using templates from @jxion-core)
const componentShowcaseContent = computed(
  () => `
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
`
);

const backendIntegrationContent = computed(
  () => `
  <div class="backend-integration">
    ${
      isLoading.value
        ? '<div class="loading">Loading backend data...</div>'
        : ""
    }
    ${error.value ? `<div class="error">Error: ${error.value}</div>` : ""}
    ${
      greeting.value
        ? `
      <div class="card">
        <h3>Greeting</h3>
        <p>From tRPC Backend</p>
        <p>${greeting.value.message}</p>
        <div class="card-stats">
          <span class="stats-value">API</span>
          <span class="stats-label">Connected</span>
        </div>
      </div>
    `
        : ""
    }
    <div class="messages-section">
      <h3>Messages (${messages.value.length})</h3>
      <div class="messages">
        ${messages.value
          .map(
            (message) => `
          <div class="message">
            <strong>${message.user}:</strong> ${message.message}
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  </div>
`
);

const utilitiesDemoContent = computed(
  () => `
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
      <p>Total Components: ${componentCount.value}</p>
      <div class="card-stats">
        <span class="stats-value">10+</span>
        <span class="stats-label">Components</span>
      </div>
    </div>
  </div>
`
);

// Backend functions
const fetchMessages = async () => {
  try {
    isLoadingMessages.value = true;
    messagesError.value = null;
    const data = await messageService.getMessages();
    messages.value = data;
  } catch (err: any) {
    messagesError.value = err?.message ?? "Failed to fetch messages";
  } finally {
    isLoadingMessages.value = false;
  }
};

const fetchGreeting = async () => {
  try {
    isLoadingGreeting.value = true;
    greetingError.value = null;
    const data = await greetingService.getGreeting();
    greeting.value = data;
  } catch (err: any) {
    greetingError.value = err?.message ?? "Failed to fetch greeting";
  } finally {
    isLoadingGreeting.value = false;
  }
};

// Event handlers
const handleCtaClick = () => {
  console.log("CTA clicked!");
  modalOpen.value = true;
};

const handleButtonClick = () => {
  console.log("Button clicked!");
};

const handleInputChange = (value: string) => {
  inputValue.value = value;
};

const handleMobileToggle = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleModalClose = () => {
  modalOpen.value = false;
};

// Computed
const isLoading = computed(
  () => isLoadingMessages.value || isLoadingGreeting.value
);
const error = computed(() => messagesError.value || greetingError.value);

onMounted(() => {
  fetchGreeting();
  fetchMessages();
});
</script>

<style scoped>
/* All styling comes from @jxion-design SCSS modules. */
</style>
