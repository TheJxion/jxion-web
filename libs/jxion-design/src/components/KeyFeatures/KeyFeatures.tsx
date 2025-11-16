/**
 * Jxion Stack — KeyFeatures Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: KeyFeatures component (matching ustad UstadKeyFeatures pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Section/UstadKeyFeatures/index.tsx
 *
 * NOTE: Simplified version without GSAP animations for initial migration
 * Animations can be added later via @jxion-core animation system
 */

"use client";
/** Core Imports */
import { ReactNode, useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faArrowRight,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
/** Language Imports */
import type { Locale } from "@jxion/i18n";
import { getDefaultKeyFeatures } from "../../utils/key-features-config";
export { getDefaultKeyFeatures };
/** Style Imports */
import styles from "../../styles/modules/KeyFeatures.module.scss";

/** Feature Interface */
export interface KeyFeature {
  icon?: IconProp;
  title: string;
  description: string;
  link?: string;
  external?: boolean;
  variant?: "default" | "highlighted" | "minimal";
  ctaText?: string;
  footnote?: string;
}

/** Key Features Props Interface */
export interface KeyFeaturesProps {
  className?: string;
  title?: string;
  subtitle?: string;
  features?: KeyFeature[];
  variant?: "default" | "featured" | "minimal" | "interactive" | "mobile";
  layout?: "grid" | "list" | "carousel";
  animation?: "fadeIn" | "slideUp" | "stagger" | "none";
  delay?: number;
  showIcons?: boolean;
  showDescriptions?: boolean;
  showCTAs?: boolean;
  showFootnotes?: boolean;
  lang: Locale;
  columns?: 2 | 3 | 4 | 6;
  children?: ReactNode;
  mobileImage?: string;
  mobileImageAlt?: string;
  mobileImagePosition?: "left" | "right";
}

/** Test ID */
export const KEY_FEATURES_TEST = {
  CONTAINER: "key-features",
  TITLE: "key-features-title",
  SUBTITLE: "key-features-subtitle",
  GRID: "key-features-grid",
  FEATURE: "key-features-feature",
  ICON: "key-features-icon",
  CARD_TITLE: "key-features-card-title",
  DESCRIPTION: "key-features-description",
  CTA: "key-features-cta",
  FOOTNOTE: "key-features-footnote",
} as const;

const KeyFeatures = ({
  className,
  title,
  subtitle,
  features: featuresProp,
  variant = "default",
  layout = "grid",
  animation = "stagger",
  delay = 0,
  showIcons = true,
  showDescriptions = true,
  showCTAs = true,
  showFootnotes = true,
  lang,
  columns = 4,
  children,
  mobileImage,
  mobileImageAlt,
  mobileImagePosition = "right",
}: KeyFeaturesProps) => {
  // Variables && Hooks
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const { dictionary, isLoading, isError } = useDictionary(lang);
  const homeDictionary = useMemo(() => {
    if (!dictionary) return undefined;
    const home = (dictionary as Record<string, unknown> | undefined)?.["home"];
    if (!home || typeof home !== "object" || Array.isArray(home)) {
      return undefined;
    }
    return home as Record<string, unknown>;
  }, [dictionary]);
  const translatedTitle = useMemo(() => {
    if (title) return title;
    const dictPath =
      variant === "mobile"
        ? ["home", "mobileFeatures", "title"]
        : ["home", "keyFeatures", "title"];
    return getCorrectFromDictionary(dictionary ?? undefined, dictPath, "");
  }, [title, variant, dictionary]);
  const translatedSubtitle = useMemo(() => {
    if (subtitle) return subtitle;
    const dictPath =
      variant === "mobile"
        ? ["home", "mobileFeatures", "subtitle"]
        : ["home", "keyFeatures", "subtitle"];
    return getCorrectFromDictionary(dictionary ?? undefined, dictPath, "");
  }, [subtitle, variant, dictionary]);
  const localizedDefaultFeatures = useMemo(
    () => getDefaultKeyFeatures(dictionary ?? {}),
    [dictionary]
  );
  const finalFeatures = useMemo(() => {
    const base = featuresProp ?? localizedDefaultFeatures;
    return base.map((feature, index) => {
      const localized = localizedDefaultFeatures[index] ?? {};
      return {
        ...localized,
        ...feature,
        icon: feature?.icon ?? localized.icon ?? faMobile,
      };
    });
  }, [variant, featuresProp, localizedDefaultFeatures]);

  const handleFeatureClick = (feature: KeyFeature) => {
    if (feature.link) {
      if (feature.external) {
        window.open(feature.link, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = feature.link;
      }
    }
  };
  const handleCTAClick = (feature: KeyFeature, e: React.MouseEvent) => {
    e.stopPropagation();
    handleFeatureClick(feature);
  };
  if (isLoading || isError || !dictionary || !homeDictionary) {
    return <div>Loading...</div>;
  }
  const getSectionClasses = () => {
    const baseClasses = [
      styles["keyFeatures"],
      styles[`keyFeatures--${variant}`],
      styles[`keyFeatures--layout-${layout}`],
      styles[`keyFeatures--columns-${columns}`],
    ];
    if (className) baseClasses.push(className);
    return baseClasses.filter(Boolean).join(" ");
  };
  const getGridClasses = () => {
    const baseClasses = [
      styles["keyFeatures__grid"],
      styles[`keyFeatures__grid--${columns}-columns`],
    ];
    if (layout === "list") baseClasses.push(styles["keyFeatures__grid--list"]);
    if (layout === "carousel")
      baseClasses.push(styles["keyFeatures__grid--carousel"]);
    return baseClasses.filter(Boolean).join(" ");
  };
  // Render mobile variant with image
  if (variant === "mobile") {
    console.log(
      `[Jxion-Design] Rendering KeyFeatures mobile variant with image: ${
        mobileImage || "none"
      }`
    );

    const mobileLayoutClasses = [
      styles["keyFeatures__mobileLayout"],
      mobileImagePosition === "right"
        ? styles["keyFeatures__mobileLayout--imageRight"]
        : styles["keyFeatures__mobileLayout--imageLeft"],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <section
        ref={sectionRef}
        className={getSectionClasses()}
        data-testid={KEY_FEATURES_TEST.CONTAINER}
      >
        <div className={styles["keyFeatures__header"]}>
          {translatedTitle && (
            <h2
              className={styles["keyFeatures__title"]}
              data-testid={KEY_FEATURES_TEST.TITLE}
            >
              {translatedTitle}
            </h2>
          )}
          {translatedSubtitle && (
            <p
              className={styles["keyFeatures__subtitle"]}
              data-testid={KEY_FEATURES_TEST.SUBTITLE}
            >
              {translatedSubtitle}
            </p>
          )}
        </div>
        <div className={mobileLayoutClasses}>
          {mobileImagePosition === "left" && mobileImage && (
            <div className={styles["keyFeatures__mobileImageWrapper"]}>
              <img
                src={mobileImage}
                alt={mobileImageAlt || "Mobile app screenshot"}
                className={styles["keyFeatures__mobileImage"]}
              />
            </div>
          )}
          <div
            className={getGridClasses()}
            data-testid={KEY_FEATURES_TEST.GRID}
          >
            {finalFeatures.map((feature, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) featuresRef.current[index] = el;
                }}
                className={`${styles["keyFeatures__card"]} ${
                  styles[`keyFeatures__card--${feature.variant || "default"}`]
                }`}
                data-testid={KEY_FEATURES_TEST.FEATURE}
                onClick={() => handleFeatureClick(feature)}
                role={feature.link ? "button" : undefined}
                tabIndex={feature.link ? 0 : undefined}
              >
                {showIcons && feature.icon && (
                  <div className={styles["keyFeatures__iconWrapper"]}>
                    <FontAwesomeIcon
                      icon={feature.icon}
                      className={styles["keyFeatures__icon"]}
                      data-testid={KEY_FEATURES_TEST.ICON}
                    />
                  </div>
                )}
                <div className={styles["keyFeatures__content"]}>
                  <h3
                    className={styles["keyFeatures__cardTitle"]}
                    data-testid={KEY_FEATURES_TEST.CARD_TITLE}
                  >
                    {feature.title}
                  </h3>
                  {showDescriptions && (
                    <p
                      className={styles["keyFeatures__description"]}
                      data-testid={KEY_FEATURES_TEST.DESCRIPTION}
                    >
                      {feature.description}
                    </p>
                  )}
                  {showCTAs && feature.ctaText && (
                    <div
                      className={styles["keyFeatures__cta"]}
                      data-testid={KEY_FEATURES_TEST.CTA}
                      onClick={(e) => handleCTAClick(feature, e)}
                    >
                      <span className={styles["keyFeatures__ctaText"]}>
                        {feature.ctaText}
                      </span>
                      {feature.external ? (
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className={styles["keyFeatures__ctaIcon"]}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className={styles["keyFeatures__ctaIcon"]}
                        />
                      )}
                    </div>
                  )}
                  {showFootnotes && feature.footnote && (
                    <p
                      className={styles["keyFeatures__footnote"]}
                      data-testid={KEY_FEATURES_TEST.FOOTNOTE}
                    >
                      {feature.footnote}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {mobileImagePosition === "right" && mobileImage && (
            <div className={styles["keyFeatures__mobileImageWrapper"]}>
              <img
                src={mobileImage}
                alt={mobileImageAlt || "Mobile app screenshot"}
                className={styles["keyFeatures__mobileImage"]}
              />
            </div>
          )}
        </div>
        {children && (
          <div className={styles["keyFeatures__children"]}>{children}</div>
        )}
      </section>
    );
  }

  // Default grid/list/carousel variant
  return (
    <section
      ref={sectionRef}
      className={getSectionClasses()}
      data-testid={KEY_FEATURES_TEST.CONTAINER}
    >
      <div className={styles["keyFeatures__header"]}>
        {translatedTitle && (
          <h2
            className={styles["keyFeatures__title"]}
            data-testid={KEY_FEATURES_TEST.TITLE}
          >
            {translatedTitle}
          </h2>
        )}

        {translatedSubtitle && (
          <p
            className={styles["keyFeatures__subtitle"]}
            data-testid={KEY_FEATURES_TEST.SUBTITLE}
          >
            {translatedSubtitle}
          </p>
        )}
      </div>
      <div className={getGridClasses()} data-testid={KEY_FEATURES_TEST.GRID}>
        {finalFeatures.map((feature, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) featuresRef.current[index] = el;
            }}
            className={`${styles["keyFeatures__card"]} ${
              styles[`keyFeatures__card--${feature.variant || "default"}`]
            }`}
            data-testid={KEY_FEATURES_TEST.FEATURE}
            onClick={() => handleFeatureClick(feature)}
            role={feature.link ? "button" : undefined}
            tabIndex={feature.link ? 0 : undefined}
          >
            {showIcons && feature.icon && (
              <div className={styles["keyFeatures__iconWrapper"]}>
                <FontAwesomeIcon
                  icon={feature.icon}
                  className={styles["keyFeatures__icon"]}
                  data-testid={KEY_FEATURES_TEST.ICON}
                />
              </div>
            )}
            <div className={styles["keyFeatures__content"]}>
              <h3
                className={styles["keyFeatures__cardTitle"]}
                data-testid={KEY_FEATURES_TEST.CARD_TITLE}
              >
                {feature.title}
              </h3>
              {showDescriptions && (
                <p
                  className={styles["keyFeatures__description"]}
                  data-testid={KEY_FEATURES_TEST.DESCRIPTION}
                >
                  {feature.description}
                </p>
              )}
              {showCTAs && feature.ctaText && (
                <div
                  className={styles["keyFeatures__cta"]}
                  data-testid={KEY_FEATURES_TEST.CTA}
                  onClick={(e) => handleCTAClick(feature, e)}
                >
                  <span className={styles["keyFeatures__ctaText"]}>
                    {feature.ctaText}
                  </span>
                  {feature.external ? (
                    <FontAwesomeIcon
                      icon={faExternalLinkAlt}
                      className={styles["keyFeatures__ctaIcon"]}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className={styles["keyFeatures__ctaIcon"]}
                    />
                  )}
                </div>
              )}
              {showFootnotes && feature.footnote && (
                <p
                  className={styles["keyFeatures__footnote"]}
                  data-testid={KEY_FEATURES_TEST.FOOTNOTE}
                >
                  {feature.footnote}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {children && (
        <div className={styles["keyFeatures__children"]}>{children}</div>
      )}
    </section>
  );
};

export default KeyFeatures;
