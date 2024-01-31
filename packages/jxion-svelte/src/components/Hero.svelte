<script lang="ts">
  import styles from '@jxion/design/src/components/hero.module.scss';
  import type { HeroProps } from '@jxion/shared';

  export let title: string;
  export let subtitle: string = "";
  export let description: string = "";
  export let ctaText: string = "Get Started";
  export let statsValue: string = "7";
  export let statsLabel: string = "Years Experience";
  export let cardSubtitle: string = "";
  export let testId: string = "hero";
  export let onCtaClick: (() => void) | undefined = undefined;
</script>

<section class={styles.hero} data-testid={testId}>
  <div class={styles.hero__container}>
    <div class={styles.hero__content}>
      <div class={styles.hero__text}>
        <h1 class={styles.hero__title} data-testid={`${testId}-title`}>
          {title}
          <br />
          <span class={styles["hero__title--highlight"]}>
            {subtitle}
          </span>
        </h1>
        <p
          class={styles.hero__description}
          data-testid={`${testId}-description`}
        >
          {description}
        </p>
        <div class={styles["hero__cta-group"]}>
          <button
            class={styles.hero__cta}
            data-testid={`${testId}-cta`}
            on:click={onCtaClick}
          >
            {ctaText}
          </button>
        </div>
      </div>
      <div class={styles.hero__visual}>
        <div class={styles.hero__card} data-testid={`${testId}-card`}>
          <div class={styles["hero__card__header"]}>
            <div class={styles["hero__card__stats"]}>
              <span class={styles["hero__card__stats__value"]}>
                {statsValue}
              </span>
              <span class={styles["hero__card__stats__label"]}>
                {statsLabel}
              </span>
            </div>
          </div>
          <div class={styles["hero__card__subtitle"]}>
            {cardSubtitle}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
