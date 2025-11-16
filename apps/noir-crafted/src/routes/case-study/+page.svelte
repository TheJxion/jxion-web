<!--
  Case Study Showcase Page
  React Developer Case Study - Final Deliverable
  
  This page demonstrates the power of the Jxion architecture by showcasing:
  1. GSAP Cinematic Header Animation
  2. AI-Powered Component Generator
  3. AI-Assisted Content Editor
  
  Phase: Phase 5 — React Case Study Delivery
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import LocalReactWrapper from '$lib/components/jxion/LocalReactWrapper.svelte';
  
  // Dynamically import React components
  let headerModule: any = null;
  let contentModule: any = null;
  let componentsLoaded = false;

  onMount(async () => {
    try {
      // Import React components (without .tsx extension for SvelteKit)
      headerModule = await import('$lib/components/organisms/HeaderAnimation');
      contentModule = await import('$lib/components/organisms/ContentEditor');
      componentsLoaded = true;
    } catch (error) {
      console.error('Error loading React components:', error);
    }
  });
</script>

<svelte:head>
  <title>Case Study Demo - Jxion Framework</title>
  <meta name="description" content="React Developer Case Study showcase demonstrating AI-assisted component generation and content creation" />
</svelte:head>

<div class="case-study-demo">
  <!-- Section 1: The Cinematic Header -->
  <section class="hero-section">
    {#if componentsLoaded && headerModule}
      <LocalReactWrapper 
        componentModule={headerModule}
        componentName="HeaderAnimation"
        props={{ className: 'full-viewport' }}
      />
    {:else}
      <div class="hero-placeholder">
        <div class="loading-spinner"></div>
        <p>Loading GSAP Header Animation...</p>
      </div>
    {/if}
  </section>

  <!-- Section 2: The AI-Powered Development Assistant -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Q3 (AI Layer): AI-Powered Development Assistant</h2>
        <p class="section-description">
          This component (built for the admin panel) uses AI to generate new React components from text 
          and convert them between frameworks. It demonstrates the Jxion framework's ability to enable 
          rapid development through AI-assisted automation.
        </p>
        <div class="info-box">
          <p>
            <strong>Note:</strong> The full Component Generator is available in the 
            <a href="/admin/components" class="link">noir-admin panel</a>. 
            This showcases the framework's multi-app architecture where shared components 
            can be used across different applications.
          </p>
        </div>
      </div>
      
      <!-- Component Generator Preview -->
      <div class="component-preview">
        <div class="preview-card">
          <h3 class="preview-title">Component Generator Features</h3>
          <ul class="feature-list">
            <li>✨ AI-assisted component generation from natural language</li>
            <li>🔄 Framework conversion (React → Svelte, Vue, etc.)</li>
            <li>📦 Component metadata extraction</li>
            <li>💾 Code export (copy/download)</li>
            <li>🎯 Integration with Jxion component registry</li>
          </ul>
          <a href="/admin/components" class="cta-button" target="_blank">
            Open Component Generator →
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 3: The AI-Assisted Content Editor -->
  <section class="section content-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Q3 (AI Layer): AI-Assisted Content Generation</h2>
        <p class="section-description">
          This component uses an LLM (Gemini API) with a specific system prompt to generate 
          on-brand copy for 'Noir Crafted'. The AI is instructed to maintain the brand's 
          elegant, poetic voice while celebrating feminine power and Turkish heritage.
        </p>
      </div>
      
      {#if componentsLoaded && contentModule}
        <LocalReactWrapper 
          componentModule={contentModule}
          componentName="ContentEditor"
          props={{ className: 'content-editor-wrapper' }}
        />
      {:else}
        <div class="loading-placeholder">
          <div class="loading-spinner"></div>
          <p>Loading AI Content Editor...</p>
        </div>
      {/if}
    </div>
  </section>

  <!-- Section 4: Architecture Overview -->
  <section class="section architecture-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Jxion Architecture Overview</h2>
        <p class="section-description">
          The Jxion framework demonstrates a unified, scalable architecture that addresses 
          all requirements of the React Developer Case Study.
        </p>
      </div>
      
      <div class="architecture-grid">
        <div class="arch-card">
          <h3 class="arch-title">Unified Architecture</h3>
          <p class="arch-description">
            Component registry + shared design tokens enable consistency across multiple apps
          </p>
        </div>
        
        <div class="arch-card">
          <h3 class="arch-title">Reusable Modules</h3>
          <p class="arch-description">
            @jxion-core, @jxion-design, @jxion-styles shared across React, Svelte, Vue
          </p>
        </div>
        
        <div class="arch-card">
          <h3 class="arch-title">Fast Iteration</h3>
          <p class="arch-description">
            Nx task runner, hot reload, template system for rapid development
          </p>
        </div>
        
        <div class="arch-card">
          <h3 class="arch-title">AI Integration</h3>
          <p class="arch-description">
            Component Generator + Content Editor demonstrate AI-assisted workflows
          </p>
        </div>
        
        <div class="arch-card">
          <h3 class="arch-title">Multi-Framework</h3>
          <p class="arch-description">
            React, Svelte, Vue from single source of truth
          </p>
        </div>
        
        <div class="arch-card">
          <h3 class="arch-title">Quality & Performance</h3>
          <p class="arch-description">
            Vitest, Playwright, Lighthouse CI for testing and monitoring
          </p>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .case-study-demo {
    min-height: 100vh;
    background: #000000;
    color: #f8f8f8;
  }

  /* Hero Section */
  .hero-section {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    position: relative;
    overflow: hidden;
  }

  .hero-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: radial-gradient(circle at center, #434343 0%, #000000 100%);
    color: #f8f8f8;
    font-family: 'Inter', sans-serif;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 215, 0, 0.2);
    border-top-color: #ffd700;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Sections */
  .section {
    padding: 4rem 0;
    background: #000000;
  }

  .content-section {
    background: rgba(67, 67, 67, 0.1);
  }

  .architecture-section {
    background: rgba(255, 215, 0, 0.05);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.88rem;
    font-weight: 700;
    color: #f8f8f8;
    margin-bottom: 1rem;
  }

  .section-description {
    font-family: 'Inter', sans-serif;
    font-size: 1.125rem;
    color: #e2e2e2;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
  }

  /* Info Box */
  .info-box {
    margin-top: 2rem;
    padding: 1.5rem;
    background: rgba(255, 215, 0, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 0.5rem;
    font-family: 'Inter', sans-serif;
    color: #e2e2e2;
  }

  .link {
    color: #ffd700;
    text-decoration: underline;
    transition: color 0.2s;
  }

  .link:hover {
    color: #ffc700;
  }

  /* Component Preview */
  .component-preview {
    margin-top: 2rem;
  }

  .preview-card {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
  }

  .preview-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: #f8f8f8;
    margin-bottom: 1.5rem;
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
    font-family: 'Inter', sans-serif;
    color: #e2e2e2;
  }

  .feature-list li {
    padding: 0.75rem 0;
    font-size: 1.125rem;
    line-height: 1.6;
  }

  .cta-button {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: #ffd700;
    color: #000000;
    border-radius: 9999px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
  }

  .cta-button:hover {
    background: #ffc700;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  }

  /* Loading Placeholder */
  .loading-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    gap: 1rem;
    color: #e2e2e2;
    font-family: 'Inter', sans-serif;
  }

  /* Architecture Grid */
  .architecture-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .arch-card {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    transition: all 0.3s;
  }

  .arch-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 215, 0, 0.3);
    transform: translateY(-4px);
  }

  .arch-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffd700;
    margin-bottom: 1rem;
  }

  .arch-description {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    color: #e2e2e2;
    line-height: 1.6;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .section-title {
      font-size: 2rem;
    }

    .container {
      padding: 0 1rem;
    }

    .architecture-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

