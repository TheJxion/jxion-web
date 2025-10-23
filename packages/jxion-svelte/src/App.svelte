<script lang="ts">
  import { onMount } from 'svelte'
  import { Layout } from './components/Layout.svelte'
  import { Header } from './components/Header.svelte'
  import { Hero } from './components/Hero.svelte'
  import { Section } from './components/Section.svelte'
  import { Footer } from './components/Footer.svelte'
  import { Modal } from './components/Modal.svelte'
  import { messageService, greetingService } from '@jxion/core'
  
  let messages: Array<{ id: string; user: string; message: string }> = []
  let greeting: { message: string } | null = null
  let isLoadingMessages = false
  let isLoadingGreeting = false
  let messagesError: string | null = null
  let greetingError: string | null = null
  let modalOpen = false
  let inputValue = ""
  let mobileMenuOpen = false

  const navItems = [
    { text: "Home", href: "/", active: true },
    { text: "Components", href: "/components" },
    { text: "Documentation", href: "/docs" },
  ]

  const socialLinks = [
    { href: "#", icon: "🐙" },
    { href: "#", icon: "📦" },
    { href: "#", icon: "💬" },
  ]

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
  ]

  const legalLinks = [
    { text: "Privacy Policy", href: "#privacy" },
    { text: "Terms of Service", href: "#terms" },
  ]

  const componentCount = 10

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
  `

  const backendIntegrationContent = `
    <div class="backend-integration">
      ${isLoading ? '<div class="loading">Loading backend data...</div>' : ''}
      ${error ? `<div class="error">Error: ${error}</div>` : ''}
      ${greeting ? `
        <div class="card">
          <h3>Greeting</h3>
          <p>From tRPC Backend</p>
          <p>${greeting.message}</p>
          <div class="card-stats">
            <span class="stats-value">API</span>
            <span class="stats-label">Connected</span>
          </div>
        </div>
      ` : ''}
      <div class="messages-section">
        <h3>Messages (${messages.length})</h3>
        <div class="messages">
          ${messages.map(message => `
            <div class="message">
              <strong>${message.user}:</strong> ${message.message}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `

  const utilitiesDemoContent = `
    <div class="utilities-demo">
      <div class="card">
        <h3>Template Renderer</h3>
        <p>Dynamic Processing</p>
        <p>Framework: Svelte | Version: 4.0.0</p>
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
  `

  const handleCtaClick = () => {
    console.log('CTA clicked!')
    modalOpen = true
  }

  const handleButtonClick = () => {
    console.log('Button clicked!')
  }

  const handleInputChange = (value: string) => {
    inputValue = value
  }

  const handleMobileToggle = () => {
    mobileMenuOpen = !mobileMenuOpen
  }

  const handleModalClose = () => {
    modalOpen = false
  }

  async function fetchMessages() {
    try {
      isLoadingMessages = true
      messagesError = null
      messages = await messageService.getMessages()
    } catch (err) {
      messagesError = (err as any)?.message ?? 'Failed to fetch messages'
    } finally {
      isLoadingMessages = false
    }
  }

  async function fetchGreeting() {
    try {
      isLoadingGreeting = true
      greetingError = null
      greeting = await greetingService.getGreeting()
    } catch (err) {
      greetingError = (err as any)?.message ?? 'Failed to fetch greeting'
    } finally {
      isLoadingGreeting = false
    }
  }

  onMount(() => {
    fetchGreeting()
    fetchMessages()
  })

  $: isLoading = isLoadingMessages || isLoadingGreeting
  $: error = messagesError || greetingError
</script>

<Layout params={{ lang: 'en', theme: 'light' }}>
  <Header
    logoText="Jxion Framework"
    logoHref="/"
    {navItems}
    actionsContent="<button class='button primary'>Get Started</button>"
    onMobileToggle={handleMobileToggle}
    {mobileMenuOpen}
  />

  <Hero
    title="Jxion Framework Demo"
    subtitle="Svelte Integration"
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
    content={componentShowcaseContent}
  />

  <Section
    title="Backend Integration"
    subtitle="tRPC & Services"
    description="Demonstrating backend integration with useMessages and useGreetings hooks"
    variant="accent"
    content={backendIntegrationContent}
  />

  <Section
    title="Framework Engine"
    subtitle="@jxion-core Utilities"
    description="Showcasing TemplateRenderer, frameworkConfigs, and componentRegistry from the core engine"
    variant="dark"
    content={utilitiesDemoContent}
  />

  <Footer
    logoText="Jxion Framework"
    logoHref="/"
    description="Multi-framework component library with centralized templates and design system."
    {socialLinks}
    sections={footerSections}
    copyright="© 2025 Jxion Framework. All rights reserved."
    copyrightYear="2025"
    {legalLinks}
  />

  <Modal
    {isOpen: modalOpen}
    title="Jxion Framework Demo"
    bodyContent="This modal demonstrates the complete Jxion Framework integration with template rendering from @jxion-core and proper event handling."
    showFooter={true}
    footerContent="<div class='modal-actions'><button class='button secondary'>Close</button><button class='button primary'>Continue</button></div>"
    onClose={handleModalClose}
    onBackdropClick={handleModalClose}
  />
</Layout>

<style>
  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .backend-demo {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .loading {
    color: #666;
    font-style: italic;
  }

  .error {
    color: #e74c3c;
    background: #fdf2f2;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #fecaca;
  }

  .greetings {
    background: #f0f9ff;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #bae6fd;
    margin-bottom: 1rem;
  }

  .messages-section {
    margin-top: 2rem;
  }

  .messages {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .message {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f3f4f6;
  }

  .message:last-child {
    border-bottom: none;
  }
</style>
