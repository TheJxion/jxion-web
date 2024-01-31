<script lang="ts">
  import { onMount } from 'svelte'
  import Hero from './components/Hero.svelte'
  import { messageService, greetingService } from '@jxion/core'
  
  let messages: Array<{ id: string; user: string; message: string }> = []
  let greeting: { message: string } | null = null
  let isLoadingMessages = false
  let isLoadingGreeting = false
  let messagesError: string | null = null
  let greetingError: string | null = null

  const handleCtaClick = () => {
    console.log('CTA clicked!')
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

<div class="app">
  <Hero
    title="Jxion Framework"
    subtitle="Svelte Integration"
    description="Build scalable applications with our professional component library. Now with Svelte support and tRPC backend integration."
    ctaText="Start Building"
    statsValue="100%"
    statsLabel="Type Safe"
    cardSubtitle="Trusted by developers worldwide"
    onCtaClick={handleCtaClick}
  />
  
  <div class="backend-demo">
    <h2>Backend Integration Demo</h2>
    
    {#if isLoading}
      <div class="loading">Loading...</div>
    {/if}
    
    {#if error}
      <div class="error">Error: {error}</div>
    {/if}
    
    {#if greeting}
      <div class="greetings">
        <h3>Greetings from Backend:</h3>
        <p>{greeting.message}</p>
      </div>
    {/if}
    
    <div class="messages-section">
      <h3>Messages ({messages.length})</h3>
      <div class="messages">
        {#each messages as message (message.id)}
          <div class="message">
            <strong>{message.user}:</strong> {message.message}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

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
