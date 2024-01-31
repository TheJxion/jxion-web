import React from "react";
import styles from "@jxion/design/src/components/hero.module.scss";
import type { HeroProps } from "@jxion/shared";

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle = "",
  description = "",
  ctaText = "Get Started",
  statsValue = "7",
  statsLabel = "Years Experience",
  cardSubtitle = "",
  testId = "hero",
  onCtaClick,
}) => {
  return (
    <section className={styles.hero} data-testid={testId}>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <div className={styles.hero__text}>
            <h1 className={styles.hero__title} data-testid={`${testId}-title`}>
              {title}
              <br />
              <span className={styles["hero__title--highlight"]}>
                {subtitle}
              </span>
            </h1>
            <p
              className={styles.hero__description}
              data-testid={`${testId}-description`}
            >
              {description}
            </p>
            <div className={styles["hero__cta-group"]}>
              <button
                className={styles.hero__cta}
                data-testid={`${testId}-cta`}
                onClick={onCtaClick}
              >
                {ctaText}
              </button>
            </div>
          </div>
          <div className={styles.hero__visual}>
            <div className={styles.hero__card} data-testid={`${testId}-card`}>
              <div className={styles["hero__card__header"]}>
                <div className={styles["hero__card__stats"]}>
                  <span className={styles["hero__card__stats__value"]}>
                    {statsValue}
                  </span>
                  <span className={styles["hero__card__stats__label"]}>
                    {statsLabel}
                  </span>
                </div>
              </div>
              <div className={styles["hero__card__subtitle"]}>
                {cardSubtitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
