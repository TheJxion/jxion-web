<script lang="ts">
  import { onMount } from 'svelte';
  import LocalReactWrapper from '$lib/components/jxion/LocalReactWrapper.svelte';

  let JxionInput: any = null;
  let JxionButton: any = null;
  let componentsLoaded = false;

  let name = '';
  let email = '';
  let message = '';
  let errors: Record<string, string> = {};
  let isSubmitting = false;
  let submitSuccess = false;

  onMount(async () => {
    try {
      const uiModule = await import('@jxion/ui');
      JxionInput = uiModule.JxionInput;
      JxionButton = uiModule.JxionButton;
      componentsLoaded = true;
    } catch (error) {
      console.error('Error loading Jxion UI components:', error);
    }
  });

  const validateForm = () => {
    errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
    }
    if (!message.trim()) errors.message = 'Message is required';
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!validateForm()) return;

    isSubmitting = true;
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isSubmitting = false;
    submitSuccess = true;

    // Reset form after 3 seconds
    setTimeout(() => {
      name = '';
      email = '';
      message = '';
      submitSuccess = false;
    }, 3000);
  };

  // Wrapper functions for onChange handlers
  const handleNameChange = (val: string) => {
    name = val;
    delete errors.name;
  };
  const handleEmailChange = (val: string) => {
    email = val;
    delete errors.email;
  };
  const handleMessageChange = (val: string) => {
    message = val;
    delete errors.message;
  };
</script>

<svelte:head>
  <title>Contact Us - Noir Crafted</title>
</svelte:head>

<div
  class="min-h-screen py-16"
  style="background-color: var(--color-noir-background-primary);"
>
  <div class="max-w-2xl mx-auto px-6">
    <h1
      class="text-4xl font-bold mb-4"
      style="color: var(--color-noir-secondary);"
    >
      Contact Us
    </h1>
    <p class="text-lg mb-8" style="color: var(--color-noir-text-muted);">
      Have a question? We'd love to hear from you.
    </p>
    {#if submitSuccess}
      <div
        class="p-4 rounded-lg mb-6 border"
        style="background-color: var(--color-noir-background-secondary); border-color: var(--color-noir-primary);"
      >
        <p style="color: var(--color-noir-text);">
          Thank you! Your message has been sent successfully.
        </p>
      </div>
    {/if}
    {#if componentsLoaded && JxionInput && JxionButton}
      <form on:submit={handleSubmit}>
        <LocalReactWrapper
          componentModule={{ JxionInput }}
          componentName="JxionInput"
          props={{
            label: 'Name',
            type: 'text',
            value: name,
            onChange: handleNameChange,
            error: errors.name,
            required: true,
          }}
        />
        <LocalReactWrapper
          componentModule={{ JxionInput }}
          componentName="JxionInput"
          props={{
            label: 'Email',
            type: 'email',
            value: email,
            onChange: handleEmailChange,
            error: errors.email,
            required: true,
          }}
        />
        <LocalReactWrapper
          componentModule={{ JxionInput }}
          componentName="JxionInput"
          props={{
            label: 'Message',
            type: 'text',
            value: message,
            onChange: handleMessageChange,
            error: errors.message,
            required: true,
          }}
        />
        <LocalReactWrapper
          componentModule={{ JxionButton }}
          componentName="JxionButton"
          props={{
            variant: 'primary',
            type: 'submit',
            disabled: isSubmitting,
            fullWidth: true,
            children: isSubmitting ? 'Sending...' : 'Send Message',
          }}
        />
      </form>
    {:else}
      <div class="loading-placeholder">
        <div class="loading-spinner"></div>
        <p>Loading form components...</p>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    background-color: var(--color-noir-background-primary);
  }

  .loading-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    gap: 1rem;
    color: var(--color-noir-text-secondary);
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 215, 0, 0.2);
    border-top-color: var(--color-noir-gold);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
