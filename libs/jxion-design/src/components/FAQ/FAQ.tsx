/**
 * Jxion Stack — FAQ Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: FAQ component (matching ustad UstadFAQ pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Section/UstadFAQ/index.tsx
 */

"use client";
/** Core Imports */
import { useState, useMemo } from "react";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
import type { Locale } from "@jxion/i18n";
/** Style Imports */
import styles from "../../styles/modules/FAQ.module.scss";
/** Component Imports */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
/** Props Interface */
export interface FAQProps {
  params: {
    lang: Locale;
    theme?: string;
  };
}
/** FAQ Item Interface */
interface FAQItem {
  question: string;
  answer: string;
}
/** Test IDs */
export const FAQ_TEST = {
  SECTION: "faq",
  TITLE: "faq-title",
  LIST: "faq-list",
  ITEM: "faq-item",
  QUESTION: "faq-question",
  ANSWER: "faq-answer",
  ICON: "faq-icon",
} as const;

const FAQ = ({ params }: FAQProps) => {
  const { lang } = params;
  const { dictionary, isLoading, isError } = useDictionary(lang);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const homeDictionary = useMemo(() => {
    if (!dictionary) return undefined;
    const home = (dictionary as Record<string, unknown> | undefined)?.["home"];
    if (!home || typeof home !== "object" || Array.isArray(home)) {
      return undefined;
    }
    return home as Record<string, unknown>;
  }, [dictionary]);
  const faqDictionary = useMemo(() => {
    if (!homeDictionary) return undefined;
    const faq = homeDictionary["faq"];
    if (!faq || typeof faq !== "object" || Array.isArray(faq)) {
      return undefined;
    }
    return faq as Record<string, unknown>;
  }, [homeDictionary]);
  const translatedTitle = useMemo(() => {
    return getCorrectFromDictionary(
      dictionary ?? undefined,
      ["home", "faq", "title"],
      ""
    );
  }, [dictionary]);
  const faqItems: FAQItem[] = useMemo(() => {
    if (!faqDictionary) return [];
    const items = faqDictionary["items"];
    if (!Array.isArray(items) || items.length === 0) {
      return [];
    }
    const safeFallback: FAQItem = {
      question: "",
      answer: "",
    };
    return items.map((item) => {
      const itemRecord = item as Record<string, unknown>;
      return {
        question:
          typeof itemRecord["question"] === "string"
            ? (itemRecord["question"] as string)
            : safeFallback.question,
        answer:
          typeof itemRecord["answer"] === "string"
            ? (itemRecord["answer"] as string)
            : safeFallback.answer,
      };
    });
  }, [faqDictionary]);
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  if (isLoading || isError || !dictionary || !homeDictionary) {
    return <div>Loading...</div>;
  }
  return (
    <section className={styles["faq"]} data-testid={FAQ_TEST.SECTION}>
      <div className={styles["faq__container"]}>
        <h2 className={styles["faq__title"]} data-testid={FAQ_TEST.TITLE}>
          {translatedTitle}
        </h2>
        <div className={styles["faq__list"]} data-testid={FAQ_TEST.LIST}>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`${styles["faq__item"]} ${
                openIndex === index ? styles["faq__item--open"] : ""
              }`}
              data-testid={`${FAQ_TEST.ITEM}-${index}`}
            >
              <button
                className={styles["faq__question"]}
                data-testid={`${FAQ_TEST.QUESTION}-${index}`}
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
              >
                {item.question}
                <FontAwesomeIcon
                  icon={openIndex === index ? faChevronUp : faChevronDown}
                  className={styles["faq__icon"]}
                  data-testid={`${FAQ_TEST.ICON}-${index}`}
                />
              </button>
              {openIndex === index && (
                <div
                  className={styles["faq__answer"]}
                  data-testid={`${FAQ_TEST.ANSWER}-${index}`}
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
