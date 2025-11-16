/**
 * Jxion Stack — CTA Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: CTA component (matching ustad UstadCTA pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/CTA/UstadCTA/index.tsx
 */

"use client";
/** Style Imports */
import styles from "../../styles/modules/CTA.module.scss";
/** Component Imports */
import Button from "../Button/Button";
import type { Locale } from "@jxion/i18n";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
/** Props Interface */
export interface CTAProps {
  title?: string;
  buttonText?: string;
  className?: string;
  locale?: Locale | string;
}
/** Test ID */
export const CTA_TEST = {
  CONTAINER: "cta",
  CONTENT: "cta-content",
  TITLE: "cta-title",
  BUTTON: "cta-button",
  DECORATIONS: "cta-decorations",
};

const CTA = ({ title, buttonText, className, locale }: CTAProps) => {
  const { dictionary } = useDictionary(locale);

  const resolvedTitle =
    title ??
    getCorrectFromDictionary(
      dictionary ?? undefined,
      ["cta", "title"],
      "Ready to build your new copilot together?"
    );
  const resolvedButtonText =
    buttonText ??
    getCorrectFromDictionary(
      dictionary ?? undefined,
      ["cta", "button"],
      "Book a Demo →"
    );
  const highlightText = getCorrectFromDictionary(
    dictionary ?? undefined,
    ["cta", "highlight"],
    "together?"
  );

  return (
    <section
      className={`${styles["cta"]} ${className || ""}`}
      data-testid={CTA_TEST.CONTAINER}
    >
      <div className={styles["cta__content"]} data-testid={CTA_TEST.CONTENT}>
        <h2 className={styles["cta__title"]} data-testid={CTA_TEST.TITLE}>
          <span>{resolvedTitle}</span>{" "}
          <div className={styles["title__highlight"]}>
            <span className={styles["title__highlight--text"]}>Copilot</span>{" "}
            <div className={styles["title__highlight--decoration"]}>
              <img src="/images/decorations/copilot-highlight.svg" alt="" />{" "}
            </div>{" "}
          </div>{" "}
          <span>{highlightText}</span>{" "}
        </h2>{" "}
        <Button
          variant="cta"
          size="large"
          className={styles["cta__button"]}
          data-testid={CTA_TEST.BUTTON}
        >
          {resolvedButtonText}
        </Button>{" "}
      </div>{" "}
      <div
        className={styles["cta__decorations"]}
        data-testid={CTA_TEST.DECORATIONS}
      >
        <div className={styles["decorations__item"]}>
          <img src="/images/decorations/chart-1.svg" alt="" />{" "}
        </div>{" "}
        <div className={styles["decorations__item"]}>
          <img src="/images/decorations/chart-2.svg" alt="" />{" "}
        </div>{" "}
        <div className={styles["decorations__item"]}>
          <img src="/images/decorations/chart-3.svg" alt="" />{" "}
        </div>{" "}
        <div className={styles["decorations__item"]}>
          <img src="/images/decorations/dots.svg" alt="" />{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};

export default CTA;
