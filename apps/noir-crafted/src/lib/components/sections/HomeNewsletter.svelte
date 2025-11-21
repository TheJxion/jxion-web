<script lang="ts">
  import styles from '@jxion/design/styles/modules/HomeNewsletterNoir.module.scss';

  export let title: string = '';
  export let description: string = '';
  export let placeholder: string = '';
  export let button: string = '';
</script>

<section class={styles.newsletterSection}>
  <div class={styles.newsletterSection__container}>
    {#if title}<h2>{title}</h2>{/if}
    {#if description}<p>{description}</p>{/if}
    <form class={styles.newsletterForm} on:submit|preventDefault>
      <input type="email" placeholder={placeholder || ''} aria-label={placeholder || 'E-posta'} />
      <button type="submit">{button || 'Abone Ol'}</button>
    </form>
  </div>
</section>

