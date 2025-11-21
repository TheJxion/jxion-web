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
  import styles from '@jxion/design/styles/modules/ContactNoir.module.scss';

  let contentData = defaultContent;
  let loading = true;
  let error: string | null = null;
  let unsubscribeStore: (() => void) | null = null;

  let name = '';
  let email = '';
  let phone = '';
  let subject = '';
  let message = '';
  let errors: Record<string, string> = {};
  let isSubmitting = false;
  let submitSuccess = false;

  $: contactCopy = contentData?.contact ?? defaultContent.contact;
  $: uiCopy = contentData?.ui ?? defaultContent.ui;

  const validateForm = () => {
    const required = (label: string) => `${label} zorunludur`;
    errors = {};

    if (!name.trim()) errors.name = required(contactCopy.form.name);
    if (!email.trim()) {
      errors.email = required(contactCopy.form.email);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }
    if (!message.trim()) errors.message = required(contactCopy.form.message);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    if (!validateForm()) return;

    isSubmitting = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isSubmitting = false;
    submitSuccess = true;

    setTimeout(() => {
      name = '';
      email = '';
      phone = '';
      subject = '';
      message = '';
      submitSuccess = false;
    }, 2500);
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
  <title>{contactCopy.title} - Noir Crafted</title>
</svelte:head>

{#if loading}
  <div class={styles.contactPage__state}>
    <p>{uiCopy.loading}</p>
  </div>
{:else if error}
  <div class={styles.contactPage__state}>
    <div>
      <p>{error}</p>
      <button on:click={refreshContentStore}>{uiCopy.tryAgain}</button>
    </div>
  </div>
{:else}
  <Layout lang="tr-TR" theme="light">
    <section class={styles.contactPage}>
      <div class={styles.contactPage__container}>
        <div class={styles.contactPage__header}>
          <p class={styles.contactPage__subtitle}>{contactCopy.subtitle}</p>
          <h1 class={styles.contactPage__title}>{contactCopy.title}</h1>
          <p class={styles.contactPage__description}>{contactCopy.description}</p>
        </div>

        <div class={styles.contactPage__grid}>
          <div class={styles.contactPage__infoCard}>
            <h2 class={styles.contactPage__infoTitle}>İletişim Bilgileri</h2>
            <div class={styles.contactPage__infoList}>
              <div class={styles.contactPage__infoItem}>
                <span class={styles.contactPage__infoIcon}>📍</span>
                <div>
                  <strong>Adres</strong>
                  <p>{contactCopy.info.address}</p>
                </div>
              </div>
              <div class={styles.contactPage__infoItem}>
                <span class={styles.contactPage__infoIcon}>📞</span>
                <div>
                  <strong>Telefon</strong>
                  <p>{contactCopy.info.phone}</p>
                </div>
              </div>
              <div class={styles.contactPage__infoItem}>
                <span class={styles.contactPage__infoIcon}>✉️</span>
                <div>
                  <strong>E-posta</strong>
                  <p>{contactCopy.info.email}</p>
                </div>
              </div>
              <div class={styles.contactPage__infoItem}>
                <span class={styles.contactPage__infoIcon}>🕒</span>
                <div>
                  <strong>Çalışma Saatleri</strong>
                  <p>{contactCopy.info.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div class={styles.contactPage__formCard}>
            {#if submitSuccess}
              <div class={styles.contactPage__alert}>
                {contactCopy.form.success}
              </div>
            {/if}

            <form class={styles.contactPage__form} on:submit={handleSubmit}>
              <div class={styles.contactPage__formGroup}>
                <label class={styles.contactPage__label} for="contact-name">
                  {contactCopy.form.name}
                </label>
                <input
                  id="contact-name"
                  class={styles.contactPage__input}
                  type="text"
                  bind:value={name}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby="contact-name-error"
                />
                {#if errors.name}
                  <small id="contact-name-error" class={styles.contactPage__error}>
                    {errors.name}
                  </small>
                {/if}
              </div>

              <div class={styles.contactPage__formGroup}>
                <label class={styles.contactPage__label} for="contact-email">
                  {contactCopy.form.email}
                </label>
                <input
                  id="contact-email"
                  class={styles.contactPage__input}
                  type="email"
                  bind:value={email}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby="contact-email-error"
                />
                {#if errors.email}
                  <small id="contact-email-error" class={styles.contactPage__error}>
                    {errors.email}
                  </small>
                {/if}
              </div>

              <div class={styles.contactPage__formGroup}>
                <label class={styles.contactPage__label} for="contact-phone">
                  {contactCopy.form.phone}
                </label>
                <input
                  id="contact-phone"
                  class={styles.contactPage__input}
                  type="tel"
                  bind:value={phone}
                />
              </div>

              <div class={styles.contactPage__formGroup}>
                <label class={styles.contactPage__label} for="contact-subject">
                  {contactCopy.form.subject}
                </label>
                <input
                  id="contact-subject"
                  class={styles.contactPage__input}
                  type="text"
                  bind:value={subject}
                />
              </div>

              <div class={styles.contactPage__formGroup}>
                <label class={styles.contactPage__label} for="contact-message">
                  {contactCopy.form.message}
                </label>
                <textarea
                  id="contact-message"
                  class={styles.contactPage__textarea}
                  bind:value={message}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby="contact-message-error"
                ></textarea>
                {#if errors.message}
                  <small id="contact-message-error" class={styles.contactPage__error}>
                    {errors.message}
                  </small>
                {/if}
              </div>

              <div class={styles.contactPage__actions}>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  href={undefined}
                  className="button--full-width"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? contactCopy.form.sending : contactCopy.form.submit}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </Layout>
{/if}
