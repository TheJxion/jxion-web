<!--
  ContentNotFound Component
  Displays a user-friendly message when content is not available
  Shows a placeholder image and message in a clean card layout
-->
<script lang="ts">
  export let title: string = 'Content Not Available';
  export let message: string = 'This content is currently being configured. Please check back soon.';
  export let imageUrl: string = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop';
</script>

<div class="content-not-found">
  <div class="content-not-found__card">
    <div class="content-not-found__image">
      <img src={imageUrl} alt="Content placeholder" loading="lazy" />
    </div>
    <div class="content-not-found__content">
      <h2 class="content-not-found__title">{title}</h2>
      <p class="content-not-found__message">{message}</p>
    </div>
  </div>
</div>

<style lang="scss">
  .content-not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    padding: 2rem;
    background: radial-gradient(
      circle at top,
      rgba(240, 213, 138, 0.08),
      transparent 55%
    ),
      #020202;
  }

  .content-not-found__card {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    background: rgba(247, 245, 239, 0.05);
    border: 1px solid rgba(240, 213, 138, 0.2);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .content-not-found__image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: rgba(240, 213, 138, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.6;
    }
  }

  .content-not-found__content {
    padding: 2rem;
    text-align: center;
  }

  .content-not-found__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #f7f5ef;
    margin: 0 0 1rem;
    letter-spacing: 0.02em;
  }

  .content-not-found__message {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(247, 245, 239, 0.7);
    margin: 0;
  }
</style>

