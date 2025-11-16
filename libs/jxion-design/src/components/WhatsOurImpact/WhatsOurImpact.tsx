/**
 * Jxion Stack — WhatsOurImpact Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: WhatsOurImpact component (matching ustad UstadWhatsOurImpact pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Section/UstadWhatsOurImpact/index.tsx
 */

"use client";
/** Core Imports */
import { useMemo } from "react";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
import type { Locale } from "@jxion/i18n";
/** Style Imports */
import styles from "../../styles/modules/WhatsOurImpact.module.scss";
/** Props Interface */
export interface WhatsOurImpactProps {
  params: {
    lang: Locale;
    theme: string;
  };
  stats?: {
    value: string;
    label: string;
    color: string;
  }[];
}

export const WHATS_OUR_IMPACT_TEST = {
  SECTION: "whats-our-impact",
  CONTAINER: "whats-our-impact-container",
  TITLE: "whats-our-impact-title",
  TITLE_REGULAR: "whats-our-impact-title-regular",
  TITLE_HIGHLIGHT: "whats-our-impact-title-highlight",
  TITLE_REGULAR_CONTINUED: "whats-our-impact-title-regular-continued",
  STATS: "whats-our-impact-stats",
  STAT: "whats-our-impact-stat",
  STAT_VALUE: "whats-our-impact-stat-value",
  STAT_LABEL: "whats-our-impact-stat-label",
} as const;

const WhatsOurImpact = ({ params, stats: statsProp }: WhatsOurImpactProps) => {
  const { lang } = params;
  const { dictionary, isLoading, isError } = useDictionary(lang);
  const homeDictionary = useMemo(() => {
    if (!dictionary) return undefined;
    const home = (dictionary as Record<string, unknown> | undefined)?.["home"];
    if (!home || typeof home !== "object" || Array.isArray(home)) {
      return undefined;
    }
    return home as Record<string, unknown>;
  }, [dictionary]);
  const whatsOurImpactDictionary = useMemo(() => {
    if (!homeDictionary) return undefined;
    const whatsOurImpact = homeDictionary["whatsourimpact"];
    if (
      !whatsOurImpact ||
      typeof whatsOurImpact !== "object" ||
      Array.isArray(whatsOurImpact)
    ) {
      return undefined;
    }
    return whatsOurImpact as Record<string, unknown>;
  }, [homeDictionary]);
  const translatedTitleRegular = useMemo(() => {
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "whatsourimpact", "title", "regular"],
      ""
    );
  }, [dictionary]);
  const translatedTitleHighlight = useMemo(() => {
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "whatsourimpact", "title", "highlight"],
      ""
    );
  }, [dictionary]);
  const translatedTitleRegularContinued = useMemo(() => {
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "whatsourimpact", "title", "regularcontiniued"],
      ""
    );
  }, [dictionary]);
  const stats = useMemo(() => {
    if (statsProp && statsProp.length > 0) return statsProp;
    if (!whatsOurImpactDictionary) return [];
    const dictStats = whatsOurImpactDictionary["stats"];
    if (!Array.isArray(dictStats) || dictStats.length === 0) {
      return [];
    }
    const safeFallback = {
      value: "",
      label: "",
      color: "green",
    };
    return dictStats.map((stat) => {
      const statRecord = stat as Record<string, unknown>;
      return {
        value:
          typeof statRecord["value"] === "string"
            ? (statRecord["value"] as string)
            : safeFallback.value,
        label:
          typeof statRecord["label"] === "string"
            ? (statRecord["label"] as string)
            : safeFallback.label,
        color:
          typeof statRecord["color"] === "string"
            ? (statRecord["color"] as string)
            : safeFallback.color,
      };
    });
  }, [statsProp, whatsOurImpactDictionary]);
  if (isLoading || isError || !dictionary || !homeDictionary) {
    return <div>Loading...</div>;
  }
  return (
    <section
      className={styles["section"]}
      data-testid={WHATS_OUR_IMPACT_TEST.SECTION}
    >
      <div className={styles["container"]}>
        <h2
          className={styles["title"]}
          data-testid={WHATS_OUR_IMPACT_TEST.TITLE}
        >
          <span
            className={styles["title__regular"]}
            data-testid={WHATS_OUR_IMPACT_TEST.TITLE_REGULAR}
          >
            {translatedTitleRegular}
          </span>
          <span
            className={styles["title__highlight"]}
            data-testid={WHATS_OUR_IMPACT_TEST.TITLE_HIGHLIGHT}
          >
            {translatedTitleHighlight}
          </span>
          <span
            className={styles["title__regular"]}
            data-testid={WHATS_OUR_IMPACT_TEST.TITLE_REGULAR_CONTINUED}
          >
            {translatedTitleRegularContinued}
          </span>
        </h2>
        <div
          className={styles["stats"]}
          data-testid={WHATS_OUR_IMPACT_TEST.STATS}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={styles["stat"]}
              data-testid={`${WHATS_OUR_IMPACT_TEST.STAT}-${index}`}
            >
              <div
                className={`${styles["stat__value"]} ${
                  styles[`stat__value--${stat.color}`]
                }`}
                data-testid={`${WHATS_OUR_IMPACT_TEST.STAT_VALUE}-${index}`}
              >
                {stat.value}
              </div>
              <div
                className={styles["stat__label"]}
                data-testid={`${WHATS_OUR_IMPACT_TEST.STAT_LABEL}-${index}`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsOurImpact;
