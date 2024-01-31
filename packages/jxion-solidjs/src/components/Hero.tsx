import { Component } from "solid-js";
import styles from "@jxion/design/src/components/hero.module.scss";
import type { HeroProps } from "@jxion/shared";

export const Hero: Component<HeroProps> = (props) => {
  const {
    title,
    subtitle = "",
    description = "",
    ctaText = "Get Started",
    statsValue = "7",
    statsLabel = "Years Experience",
    cardSubtitle = "",
    testId = "hero",
    onCtaClick,
  } = props;

  return (
    <section class={styles.hero} data-testid={testId}>
      <div class={styles.hero__container}>
        <div class={styles.hero__content}>
          <div class={styles.hero__text}>
            <h1 class={styles.hero__title} data-testid={`${testId}-title`}>
              {title}
              <br />
              <span class={styles["hero__title--highlight"]}>{subtitle}</span>
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
                onClick={onCtaClick}
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
              <div class={styles["hero__card__subtitle"]}>{cardSubtitle}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
