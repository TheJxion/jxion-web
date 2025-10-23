import { createSignal, createEffect, onMount } from "solid-js";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { Footer } from "./components/Footer";
import { Modal } from "./components/Modal";
import { messageService, greetingService } from "@jxion/core";

export default function App() {
  const [messages, setMessages] = createSignal<
    Array<{ id: string; user: string; message: string }>
  >([]);
  const [greeting, setGreeting] = createSignal<{ message: string } | null>(
    null
  );
  const [isLoadingMessages, setIsLoadingMessages] = createSignal(false);
  const [isLoadingGreeting, setIsLoadingGreeting] = createSignal(false);
  const [messagesError, setMessagesError] = createSignal<string | null>(null);
  const [greetingError, setGreetingError] = createSignal<string | null>(null);
  const [modalOpen, setModalOpen] = createSignal(false);
  const [inputValue, setInputValue] = createSignal("");
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);

  const navItems = [
    { text: "Home", href: "/", active: true },
    { text: "Components", href: "/components" },
    { text: "Documentation", href: "/docs" },
  ];

  const socialLinks = [
    { href: "#", icon: "🐙" },
    { href: "#", icon: "📦" },
    { href: "#", icon: "💬" },
  ];

  const footerSections = [
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
  ];

  const legalLinks = [
    { text: "Privacy Policy", href: "#privacy" },
    { text: "Terms of Service", href: "#terms" },
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

  const backendIntegrationContent = () => `
    <div class="backend-integration">
      ${
        isLoadingMessages() || isLoadingGreeting()
          ? '<div class="loading">Loading backend data...</div>'
          : ""
      }
      ${
        messagesError() || greetingError()
          ? `<div class="error">Error: ${
              messagesError() || greetingError()
            }</div>`
          : ""
      }
      ${
        greeting()
          ? `
        <div class="card">
          <h3>Greeting</h3>
          <p>From tRPC Backend</p>
          <p>${greeting()!.message}</p>
          <div class="card-stats">
            <span class="stats-value">API</span>
            <span class="stats-label">Connected</span>
          </div>
        </div>
      `
          : ""
      }
      <div class="messages-section">
        <h3>Messages (${messages().length})</h3>
        <div class="messages">
          ${messages()
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
  `;

  const utilitiesDemoContent = () => `
    <div class="utilities-demo">
      <div class="card">
        <h3>Template Renderer</h3>
        <p>Dynamic Processing</p>
        <p>Framework: SolidJS | Version: 1.8.0</p>
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
    console.log("CTA clicked!");
    setModalOpen(true);
  };

  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleMobileToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen());
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const fetchMessages = async () => {
    try {
      setIsLoadingMessages(true);
      setMessagesError(null);
      const data = await messageService.getMessages();
      setMessages(data);
    } catch (err: any) {
      setMessagesError(err?.message ?? "Failed to fetch messages");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const fetchGreeting = async () => {
    try {
      setIsLoadingGreeting(true);
      setGreetingError(null);
      const data = await greetingService.getGreeting();
      setGreeting(data);
    } catch (err: any) {
      setGreetingError(err?.message ?? "Failed to fetch greeting");
    } finally {
      setIsLoadingGreeting(false);
    }
  };

  onMount(() => {
    fetchGreeting();
    fetchMessages();
  });

  return (
    <Layout params={{ lang: "en", theme: "light" }}>
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
        description="Comprehensive demo showcasing all components, utilities, hooks, and engine from @jxion-core with proper template rendering and styling."
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
        title="Backend Integration"
        subtitle="tRPC & Services"
        description="Demonstrating backend integration with useMessages and useGreetings hooks"
        variant="accent"
        content={backendIntegrationContent()}
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
