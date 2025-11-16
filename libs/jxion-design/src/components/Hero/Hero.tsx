/**
 * Jxion Stack — Hero Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Hero component template (matching ustad UstadHero pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Hero/UstadHero/index.tsx
 */

"use client";
/** Core Imports */
import { useMemo } from "react";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
import type { Locale } from "@jxion/i18n";
/** Style Imports */
// Note: Direct SCSS import matches ustad pattern
// For runtime style loading, use loadStyles() from @jxion/styles
import styles from "../../styles/modules/Hero.module.scss";
/** Component Imports */
import Button from "../Button/Button";
/** Props Interface */
export interface HeroProps {
  className?: string;
  params: {
    lang: Locale;
    theme: string;
  };
}
/** Test Id */
export const HERO_TEST = {
  HERO: "hero",
  CONTENT: "hero-content",
  TITLE: "hero-title",
  SUBTITLE: "hero-subtitle",
  DESCRIPTION: "hero-description",
  CTA: "hero-cta",
  IMAGE: "hero-image",
  CARD: "hero-card",
};

const Hero = ({ className, params }: HeroProps) => {
  const { dictionary } = useDictionary(params.lang ?? "en-US");
  const heroDictionary = useMemo(() => {
    const homeDictionary = (
      dictionary as Record<string, unknown> | undefined
    )?.["home"] as Record<string, unknown> | undefined;
    return homeDictionary?.["hero"] as Record<string, unknown> | undefined;
  }, [dictionary]);
  const translatedTitle = getCorrectFromDictionary(
    dictionary ?? undefined,
    ["home", "hero", "title"],
    ""
  );
  const translatedSubtitle = getCorrectFromDictionary(
    dictionary ?? undefined,
    ["home", "hero", "subtitle"],
    ""
  );
  const translatedDescription = getCorrectFromDictionary(
    dictionary ?? undefined,
    ["home", "hero", "description"],
    ""
  );
  const descriptionHtml = useMemo(
    () => translatedDescription.replace(/\n/g, "<br />"),
    [translatedDescription]
  );
  const translatedCtaText = getCorrectFromDictionary(
    dictionary ?? undefined,
    ["home", "hero", "cta"],
    ""
  );
  const translatedStatsLabel = getCorrectFromDictionary(
    dictionary ?? undefined,
    ["home", "hero", "statslabel"],
    ""
  );
  const translatedStatsValue = getCorrectFromDictionary(
    heroDictionary,
    ["stats"],
    ""
  );
  return (
    <section
      className={`${styles["hero"]} ${className || ""}`}
      data-testid={HERO_TEST.HERO}
    >
      <div className={styles["hero__container"]}>
        <div className={styles["hero__content"]}>
          <div className={styles["hero__text"]} data-testid={HERO_TEST.CONTENT}>
            <h1 className={styles["hero__title"]} data-testid={HERO_TEST.TITLE}>
              {translatedTitle}
              <br />
              <span
                className={styles["hero__title--highlight"]}
                data-testid={HERO_TEST.SUBTITLE}
              >
                {translatedSubtitle}
              </span>
            </h1>
            <p
              className={styles["hero__description"]}
              data-testid={HERO_TEST.DESCRIPTION}
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
            <div className={styles["hero__cta-group"]}>
              <Button
                variant="cta"
                className={styles["hero__cta"]}
                data-testid={HERO_TEST.CTA}
              >
                {translatedCtaText}
              </Button>
            </div>
          </div>
          <div className={styles["hero__visual"]}>
            <div className={styles["hero__card"]} data-testid={HERO_TEST.CARD}>
              <div className={styles["hero__card__header"]}>
                <div className={styles["hero__card__stats"]}>
                  <span className={styles["hero__card__stats__value"]}>7</span>
                  <span className={styles["hero__card__stats__label"]}>
                    {translatedStatsLabel}
                  </span>
                </div>
              </div>
              <div className={styles["hero__card__chart"]}>
                <div className={styles["hero__progress-bar"]}>
                  <div className={styles["hero__progress-fill"]}></div>
                </div>
                <div className={styles["hero__chart-overlay"]}></div>
              </div>
              <div className={styles["hero__card__subtitle"]}>
                {translatedStatsValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
