/**
 * Jxion Stack — Footer Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Footer component (matching ustad UstadFooter pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Footer/UstadFooter/index.tsx
 */

"use client";

/** Type Imports */
import { useMemo } from "react";
import { getLink } from "@jxion/core/adapters";
import type { Locale } from "@jxion/i18n";
import { useDictionary } from "@jxion/i18n";
/** Style Imports */
import styles from "../../styles/modules/Footer.module.scss";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  links: FooterLink[];
}

interface FooterContent {
  primary: FooterColumn[];
  secondary: FooterColumn[];
}

export interface FooterProps {
  params: {
    lang: Locale;
    theme: string;
  };
  className?: string;
}

const toFooterColumnArray = (
  value: unknown,
  fallback: FooterColumn[]
): FooterColumn[] => {
  if (!Array.isArray(value)) return fallback;
  const sanitizedLinks = value.filter((link): link is FooterLink => {
    return (
      typeof link === "object" &&
      link !== null &&
      typeof (link as FooterLink).label === "string" &&
      typeof (link as FooterLink).href === "string"
    );
  });

  if (sanitizedLinks.length === 0) {
    return fallback;
  }

  return [{ links: sanitizedLinks }];
};

const Footer = ({ className, params }: FooterProps) => {
  // Initialize framework adapter
  const Link = getLink();

  const { lang } = params;
  const { dictionary, isLoading } = useDictionary(lang);

  const footerSection =
    dictionary &&
    typeof dictionary["footer"] === "object" &&
    !Array.isArray(dictionary["footer"])
      ? (dictionary["footer"] as Record<string, unknown>)
      : null;

  const { primary, secondary } = useMemo(() => {
    if (isLoading) {
      return { primary: [], secondary: [] };
    }

    if (!footerSection) {
      return { primary: [], secondary: [] };
    }

    return {
      primary: toFooterColumnArray(footerSection["links"], []),
      secondary: toFooterColumnArray(footerSection["linksSecondary"], []),
    };
  }, [footerSection, isLoading]);

  return (
    <footer className={`${styles["footer"]} ${className || ""}`}>
      <div className={styles["footer__container"]}>
        <div className={styles["footer__content"]}>
          <div className={styles["footer__columns"]}>
            {primary.map((column: FooterColumn, columnIndex: number) => (
              <div key={columnIndex} className={styles["footer__column"]}>
                <div className={styles["footer__links"]}>
                  {column.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className={styles["footer__link"]}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles["footer__columns"]}>
            {secondary.map((column: FooterColumn, columnIndex: number) => (
              <div key={columnIndex} className={styles["footer__column"]}>
                <div className={styles["footer__links"]}>
                  {column.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className={styles["footer__link"]}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
