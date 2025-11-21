<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Layout from '$lib/components/jxion/Layout.svelte';
  import Button from '$atoms/Button.svelte';
  import { content as defaultContent } from '$lib/i18n/content';
  import {
    contentStore,
    ensureContentStore,
    refreshContentStore,
  } from '$lib/stores/contentStore';
  import styles from '@jxion/design/styles/modules/AuthNoir.module.scss';

  let contentData = defaultContent;
  let loading = true;
  let error: string | null = null;
  let unsubscribeStore: (() => void) | null = null;

  let isLogin = true;
  let email = '';
  let password = '';
  let confirmPassword = '';
  let name = '';
  let errors: Record<string, string> = {};
  let isSubmitting = false;
  let successMessage: string | null = null;

  $: authCopy = contentData?.auth ?? defaultContent.auth;
  $: uiCopy = contentData?.ui ?? defaultContent.ui;
  $: currentView = isLogin ? authCopy.login : authCopy.register;

  const validateForm = () => {
    errors = {};

    if (!email.trim()) {
      errors.email = authCopy.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = authCopy.validation.emailInvalid;
    }

    if (!password.trim()) {
      errors.password = authCopy.validation.passwordRequired;
    } else if (password.length < 6) {
      errors.password = authCopy.validation.passwordLength;
    }

    if (!isLogin) {
      if (!name.trim()) {
        errors.name = authCopy.validation.nameRequired;
      }
      if (!confirmPassword.trim()) {
        errors.confirmPassword = authCopy.validation.confirmPasswordRequired;
      } else if (password !== confirmPassword) {
        errors.confirmPassword = authCopy.validation.passwordsMismatch;
      }
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    if (!validateForm()) return;

    isSubmitting = true;
    successMessage = null;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isSubmitting = false;
    successMessage = currentView.successMessage;
  };

  const toggleMode = () => {
    isLogin = !isLogin;
    errors = {};
    successMessage = null;
  };

  onMount(() => {
    ensureContentStore();
    unsubscribeStore = contentStore.subscribe(($state) => {
      contentData = $state.content;
      loading = $state.loading;
      error = $state.error;
    });
  });

  onDestroy(() => {
    unsubscribeStore?.();
  });
</script>

<svelte:head>
  <title>{currentView.title} - Noir Crafted</title>
</svelte:head>

{#if loading}
  <div class={styles.authPage__state}>
    <p>{uiCopy.loading}</p>
  </div>
{:else if error}
  <div class={styles.authPage__state}>
    <div>
      <p>{error}</p>
      <button on:click={refreshContentStore}>{uiCopy.tryAgain}</button>
    </div>
  </div>
{:else}
  <Layout lang="tr-TR" theme="dark">
    <section class={styles.authPage}>
      <div class={styles.authPage__container}>
        <div class={styles.authPage__card}>
          <h1 class={styles.authPage__title}>{currentView.title}</h1>
          <p class={styles.authPage__subtitle}>{currentView.subtitle}</p>

          {#if successMessage}
            <div class={styles.authPage__alert}>{successMessage}</div>
          {/if}

          <form class={styles.authPage__form} on:submit={handleSubmit}>
            {#if !isLogin}
              <div>
                <label class={styles.authPage__label} for="auth-name">
                  {authCopy.form.name}
                </label>
                <input
                  id="auth-name"
                  class={styles.authPage__input}
                  type="text"
                  bind:value={name}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {#if errors.name}
                  <small class={styles.authPage__error}>{errors.name}</small>
                {/if}
              </div>
            {/if}

            <div>
              <label class={styles.authPage__label} for="auth-email">
                {authCopy.form.email}
              </label>
              <input
                id="auth-email"
                class={styles.authPage__input}
                type="email"
                bind:value={email}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {#if errors.email}
                <small class={styles.authPage__error}>{errors.email}</small>
              {/if}
            </div>

            <div>
              <label class={styles.authPage__label} for="auth-password">
                {authCopy.form.password}
              </label>
              <input
                id="auth-password"
                class={styles.authPage__input}
                type="password"
                bind:value={password}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {#if errors.password}
                <small class={styles.authPage__error}>{errors.password}</small>
              {/if}
            </div>

            {#if !isLogin}
              <div>
                <label class={styles.authPage__label} for="auth-confirm-password">
                  {authCopy.form.confirmPassword}
                </label>
                <input
                  id="auth-confirm-password"
                  class={styles.authPage__input}
                  type="password"
                  bind:value={confirmPassword}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                />
                {#if errors.confirmPassword}
                  <small class={styles.authPage__error}>{errors.confirmPassword}</small>
                {/if}
              </div>
            {/if}

            <Button
              variant="primary"
              size="lg"
              type="submit"
              href={undefined}
              className="button--full-width"
              disabled={isSubmitting}
            >
              {isSubmitting ? uiCopy.loading : currentView.submitLabel}
            </Button>
          </form>

          <div class={styles.authPage__switch}>
            <button type="button" on:click={toggleMode}>
              {isLogin ? authCopy.login.switchLabel : authCopy.register.switchLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  </Layout>
{/if}

