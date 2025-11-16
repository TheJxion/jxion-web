/**
 * Jxion Stack — WhyYesildefter Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: WhyYesildefter component (matching ustad UstadWhyYesildefter pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Section/UstadWhyYesildefter/index.tsx
 */

"use client";
/** Core Imports */
import { useMemo } from "react";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
import { getLink } from "@jxion/core/adapters";
import type { Locale } from "@jxion/i18n";
/** Style Imports */
import styles from "../../styles/modules/WhyYesildefter.module.scss";
/** Component Imports */
import Button from "../Button/Button";
/** Props Interface */
export interface WhyYesildefterProps {
  className?: string;
  params: {
    lang: Locale;
    theme: string;
  };
}
/** Test ID */
export const WHY_YESILDEFTER_TEST = {
  CONTAINER: "why-yesildefter",
  CONTENT: "why-yesildefter-content",
  TITLE: "why-yesildefter-title",
  DESCRIPTION: "why-yesildefter-description",
  PLANS: "why-yesildefter-plans",
};

const WhyYesildefter = ({ className, params }: WhyYesildefterProps) => {
  // Initialize framework adapter
  const Link = getLink();

  const { lang } = params;
  const { dictionary, isLoading, isError } = useDictionary(lang ?? "en-US");
  const homeDictionary = useMemo(() => {
    if (!dictionary) return undefined;
    const home = (dictionary as Record<string, unknown> | undefined)?.["home"];
    if (!home || typeof home !== "object" || Array.isArray(home)) {
      return undefined;
    }
    return home as Record<string, unknown>;
  }, [dictionary]);
  const whyYesilDefterDictionary = useMemo(() => {
    if (!homeDictionary) return undefined;
    const whyYesilDefter = homeDictionary["whyYesilDefter"];
    if (
      !whyYesilDefter ||
      typeof whyYesilDefter !== "object" ||
      Array.isArray(whyYesilDefter)
    ) {
      return undefined;
    }
    return whyYesilDefter as Record<string, unknown>;
  }, [homeDictionary]);
  const translatedHighlight = useMemo(() => {
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "whyYesilDefter", "highlight"],
      ""
    );
  }, [dictionary]);
  const translatedTitle = useMemo(() => {
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "whyYesilDefter", "title"],
      ""
    );
  }, [dictionary]);
  const translatedDescription = useMemo(() => {
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "whyYesilDefter", "description"],
      ""
    );
  }, [dictionary]);
  const translatedCTA = useMemo(() => {
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "whyYesilDefter", "cta"],
      ""
    );
  }, [dictionary]);
  const resolvedBenefits = useMemo(() => {
    if (!whyYesilDefterDictionary) return [];
    const dictBenefits = whyYesilDefterDictionary["benefits"];
    if (!Array.isArray(dictBenefits) || dictBenefits.length === 0) {
      return [];
    }
    const safeFallback = {
      name: "",
      features: [] as string[],
    };
    return dictBenefits.map((benefit) => {
      const benefitRecord = benefit as Record<string, unknown>;
      const featureList = Array.isArray(benefitRecord["features"])
        ? (benefitRecord["features"] as unknown[]).filter(
            (feature): feature is string => typeof feature === "string"
          )
        : safeFallback.features;
      return {
        name:
          typeof benefitRecord["name"] === "string"
            ? (benefitRecord["name"] as string)
            : safeFallback.name,
        features: featureList,
      };
    });
  }, [whyYesilDefterDictionary]);
  if (isLoading || isError || !dictionary || !homeDictionary) {
    return <div>Loading...</div>;
  }
  return (
    <section
      className={`${styles["why"]} ${className || ""}`}
      data-testid={WHY_YESILDEFTER_TEST.CONTAINER}
    >
      <div className={styles["why__container"]}>
        <div className={styles["why__header"]}>
          <h2
            className={styles["why__title"]}
            data-testid={WHY_YESILDEFTER_TEST.TITLE}
          >
            <span className={styles["why__title__highlight"]}>
              {translatedHighlight}
            </span>
            {translatedTitle}
          </h2>
          <p className={styles["why__description"]}>{translatedDescription}</p>
        </div>
        <div
          className={styles["why__plans"]}
          data-testid={WHY_YESILDEFTER_TEST.PLANS}
        >
          {resolvedBenefits.map((benefit, index) => (
            <div key={index} className={styles["why__plan"]}>
              <h3 className={styles["why__plan-title"]}>{benefit.name}</h3>
              <ul className={styles["why__plan-features"]}>
                {benefit.features.map(
                  (feature: string, featureIndex: number) => (
                    <li
                      key={featureIndex}
                      className={styles["why__plan-feature"]}
                    >
                      <span className={styles["why__plan-feature-icon"]}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles["why__cta"]}>
          <Link href="/demo-request" style={{ textDecoration: "none" }}>
            <Button variant="cta">{translatedCTA}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyYesildefter;
