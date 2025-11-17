<script lang="ts">
  import { onMount } from 'svelte';
  import LocalReactWrapper from '$lib/components/jxion/LocalReactWrapper.svelte';

  let JxionInput: any = null;
  let JxionButton: any = null;
  let componentsLoaded = false;

  let isLogin = true;
  let email = '';
  let password = '';
  let confirmPassword = '';
  let name = '';
  let errors: Record<string, string> = {};
  let isSubmitting = false;

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
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!name.trim()) errors.name = 'Name is required';
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!validateForm()) return;

    isSubmitting = true;
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isSubmitting = false;
    // Handle success (redirect, show message, etc.)
    alert(isLogin ? 'Login successful!' : 'Account created!');
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
  const handlePasswordChange = (val: string) => {
    password = val;
    delete errors.password;
  };
  const handleConfirmPasswordChange = (val: string) => {
    confirmPassword = val;
    delete errors.confirmPassword;
  };
</script>

<svelte:head>
  <title>{isLogin ? 'Login' : 'Sign Up'} - Noir Crafted</title>
</svelte:head>

<div
  class="min-h-screen flex items-center justify-center py-16"
  style="background-color: var(--color-noir-background-primary);"
>
  <div class="w-full max-w-md px-6">
    <div
      class="p-8 rounded-xl border"
      style="background-color: var(--color-noir-background-secondary); border-color: var(--color-noir-border);"
    >
      <h1
        class="text-3xl font-bold mb-2"
        style="color: var(--color-noir-secondary);"
      >
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h1>
      <p class="mb-6" style="color: var(--color-noir-text-muted);">
        {isLogin ? 'Sign in to your account' : 'Sign up to get started'}
      </p>
      {#if componentsLoaded && JxionInput && JxionButton}
        <form on:submit={handleSubmit}>
          {#if !isLogin}
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
          {/if}
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
              label: 'Password',
              type: 'password',
              value: password,
              onChange: handlePasswordChange,
              error: errors.password,
              required: true,
            }}
          />
          {#if !isLogin}
            <LocalReactWrapper
              componentModule={{ JxionInput }}
              componentName="JxionInput"
              props={{
                label: 'Confirm Password',
                type: 'password',
                value: confirmPassword,
                onChange: handleConfirmPasswordChange,
                error: errors.confirmPassword,
                required: true,
              }}
            />
          {/if}
          <LocalReactWrapper
            componentModule={{ JxionButton }}
            componentName="JxionButton"
            props={{
              variant: 'primary',
              type: 'submit',
              disabled: isSubmitting,
              fullWidth: true,
              className: 'mt-4',
              children: isSubmitting
                ? 'Processing...'
                : isLogin
                  ? 'Sign In'
                  : 'Sign Up',
            }}
          />
        </form>
        <div class="mt-6 text-center">
          <button
            on:click={() => {
              isLogin = !isLogin;
              errors = {};
            }}
            class="text-sm font-medium hover:opacity-80 transition-opacity"
            style="color: var(--color-noir-primary);"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      {:else}
        <div class="loading-placeholder">
          <div class="loading-spinner"></div>
          <p>Loading form components...</p>
        </div>
      {/if}
    </div>
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

