import { useEffect, useState, useCallback, useMemo } from "react";
import { Hero } from "./components/Hero";
import { Card } from "./components/Card";
import { Layout } from "./components/Layout";
import { CTA } from "./components/CTA";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Modal } from "./components/Modal";
import { Section } from "./components/Section";
import { Footer } from "./components/Footer";
import {
  useMessages,
  useGreetings,
  frameworkConfigs,
  componentRegistry,
} from "@jxion/core";

/**
 * Jxion Framework Demo - React Implementation
 *
 * Demonstrates:
 * - Template rendering from @jxion-core
 * - SCSS styling from @jxion-design
 * - Global event handling for performance
 * - TypeScript optimization with useCallback
 * - Backend integration with tRPC
 */
function App() {
  // Global state management with optimized hooks
  const { messages, fetchMessages } = useMessages();
  const {
    greeting,
    isLoading: greetingLoading,
    error: greetingError,
    fetchGreeting,
  } = useGreetings();

  // Computed values for loading and error states
  const isLoading = greetingLoading;
  const error = greetingError;

  // Local state with performance optimization
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Optimized event handlers with useCallback for performance
  const handleCtaClick = useCallback(() => {
    console.log("CTA clicked!");
    setModalOpen(true);
  }, []);

  const handleButtonClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleMobileToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  // Global event listeners for template rendering
  useEffect(() => {
    // Set up global event handlers for template rendering
    (window as any).jxionGlobalEvents = {
      ctaClick: handleCtaClick,
      buttonClick: handleButtonClick,
      inputChange: handleInputChange,
      mobileToggle: handleMobileToggle,
      modalClose: handleModalClose,
    };

    // Cleanup on unmount
    return () => {
      delete (window as any).jxionGlobalEvents;
    };
  }, [
    handleCtaClick,
    handleButtonClick,
    handleInputChange,
    handleMobileToggle,
    handleModalClose,
  ]);

  // Initialize backend data
  useEffect(() => {
    fetchGreeting();
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  // Memoize static props to prevent unnecessary re-renders
  const navItems = useMemo(
    () => [
      { text: "Home", href: "/", active: true },
      { text: "Components", href: "/components" },
      { text: "Documentation", href: "/docs" },
    ],
    []
  );

  const actionsContent = useMemo(
    () => "<button class='button primary'>Get Started</button>",
    []
  );

  // Memoize footer data to prevent unnecessary re-renders
  const footerData = useMemo(
    () => ({
      logoText: "Jxion Framework",
      logoHref: "/",
      description:
        "A modern, framework-agnostic component library for building beautiful web applications.",
      socialLinks: [
        { href: "https://github.com", icon: "GitHub" },
        { href: "https://twitter.com", icon: "Twitter" },
        { href: "https://linkedin.com", icon: "LinkedIn" },
      ],
      sections: [
        {
          title: "Product",
          links: [
            { text: "Features", href: "/features" },
            { text: "Pricing", href: "/pricing" },
            { text: "Documentation", href: "/docs" },
          ],
        },
        {
          title: "Company",
          links: [
            { text: "About", href: "/about" },
            { text: "Blog", href: "/blog" },
            { text: "Careers", href: "/careers" },
          ],
        },
        {
          title: "Support",
          links: [
            { text: "Help Center", href: "/help" },
            { text: "Contact", href: "/contact" },
            { text: "Status", href: "/status" },
          ],
        },
      ],
      copyright: "© 2024 Jxion Framework. All rights reserved.",
      legalLinks: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Service", href: "/terms" },
      ],
    }),
    []
  );

  return (
    <Layout params={{ lang: "en", theme: "light" }}>
      <Header
        logoText="Jxion Framework"
        logoHref="/"
        navItems={navItems}
        actionsContent={actionsContent}
        onMobileToggle={handleMobileToggle}
        mobileMenuOpen={mobileMenuOpen}
      />

      <Hero
        title="Jxion Framework"
        subtitle="Multi-Framework Component Library"
        description="Build scalable applications with our professional component library. Centralized templates from @jxion-core with framework-specific rendering."
        ctaText="Start Building"
        statsValue="5"
        statsLabel="Frameworks"
        cardSubtitle="Type-safe across all frameworks"
        onCtaClick={handleCtaClick}
      />

      <Section
        title="Component Library"
        subtitle="Professional Components"
        description="All components use HTML templates from @jxion-core with SCSS styling from @jxion-design"
        variant="default"
        content={
          <div className="components-showcase">
            <div className="components-grid">
              <Card
                title="Template Rendering"
                subtitle="@jxion-core Engine"
                description="Dynamic HTML template processing with variable substitution and CSS module mapping."
                statsValue="100%"
                statsLabel="Type Safe"
              />

              <Card
                title="Design System"
                subtitle="@jxion-design Tokens"
                description="400+ design tokens with professional color schemes, typography, and spacing systems."
                statsValue="400+"
                statsLabel="Tokens"
              />

              <Card
                title="Multi-Framework"
                subtitle="Universal Components"
                description="Same components work across React, Vue, Svelte, SolidJS, and Angular with identical APIs."
                statsValue="5"
                statsLabel="Frameworks"
              />
            </div>

            <div className="interactive-demo">
              <Input
                label="Framework Demo"
                type="text"
                placeholder="Type to test template rendering"
                value={inputValue}
                onChange={handleInputChange}
                helpText="This input demonstrates template rendering from @jxion-core"
              />

              <CTA
                primaryText="Explore Components"
                secondaryText="View Documentation"
                onPrimaryClick={handleCtaClick}
                onSecondaryClick={() => console.log("Documentation clicked")}
              />
            </div>
          </div>
        }
      />

      <Section
        title="Backend Integration"
        subtitle="tRPC & Services"
        description="Type-safe backend integration with universal hooks and services"
        variant="accent"
        content={
          <div className="backend-integration">
            {isLoading && (
              <div className="loading">Loading backend data...</div>
            )}
            {error && <div className="error">Error: {error}</div>}

            {greeting && (
              <Card
                title="Backend Greeting"
                subtitle="tRPC Integration"
                description={greeting.message}
                statsValue="✅"
                statsLabel="Connected"
              />
            )}

            <div className="messages-demo">
              <h3>Live Messages ({messages.length})</h3>
              <div className="messages-list">
                {messages.map((message) => (
                  <div key={message.id} className="message-item">
                    <strong>{message.user}:</strong> {message.message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <Section
        title="Framework Engine"
        subtitle="@jxion-core Utilities"
        description="Showcasing TemplateRenderer, frameworkConfigs, and componentRegistry from the core engine"
        variant="dark"
        content={
          <div className="engine-showcase">
            <Card
              title="Template Renderer"
              subtitle="Dynamic Processing"
              description={`Framework: ${
                frameworkConfigs?.react?.name || "React"
              } | Version: ${frameworkConfigs?.react?.version || "18.0.0"}`}
              statsValue="⚡"
              statsLabel="Fast"
            />
            <Card
              title="Component Registry"
              subtitle="Available Components"
              description={`Total Components: ${(() => {
                try {
                  return componentRegistry?.components
                    ? Object.keys(componentRegistry.components).length
                    : 10;
                } catch (error) {
                  console.error("Component registry error:", error);
                  return 10;
                }
              })()}`}
              statsValue="10+"
              statsLabel="Components"
            />
            <Card
              title="Framework Config"
              subtitle="Multi-Framework Support"
              description="React, Vue, Svelte, SolidJS, Angular with unified APIs"
              statsValue="5"
              statsLabel="Frameworks"
            />
          </div>
        }
      />

      <Footer {...footerData} />

      <Modal
        isOpen={modalOpen}
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

export default App;
