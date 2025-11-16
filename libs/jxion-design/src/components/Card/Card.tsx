/**
 * Jxion Stack — Card Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Card component (matching ustad UstadCard pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Card/UstadCard/index.tsx
 */

"use client";
/** Core Imports */
import { ReactNode, useState } from "react";
/** Style Imports */
import styles from "../../styles/modules/Card.module.scss";
/** Props Interface */
export interface CardProps {
  variant?: "default" | "withTabs";
  tabs?: { label: string; content: ReactNode; isActive?: boolean }[];
  children?: ReactNode;
  className?: string;
}
/** Test ID */
export const CARD_TEST = {
  CONTAINER: "card",
  TABS: "card-tabs",
  TAB: "card-tab",
  CONTENT: "card-content",
};

const Card = ({
  variant = "default",
  tabs,
  children,
  className,
}: CardProps) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div
      className={`${styles.card} ${styles[`card--${variant}`]} ${
        className || ""
      }`}
      data-testid={CARD_TEST.CONTAINER}
    >
      {variant === "withTabs" && tabs && (
        <>
          <div className={styles["card__tabs"]} data-testid={CARD_TEST.TABS}>
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`${styles["tabs__item"]} ${
                  activeTab === index ? styles["tabs__item--active"] : ""
                }`}
                onClick={() => setActiveTab(index)}
                data-testid={CARD_TEST.TAB}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div
            className={styles["card__content"]}
            data-testid={CARD_TEST.CONTENT}
          >
            {tabs[activeTab].content}
          </div>
        </>
      )}
      {variant === "default" && children}
    </div>
  );
};

export default Card;
