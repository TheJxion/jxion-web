/**
 * Jxion Stack — i18n Configuration
 * Phase Reference: Phase 1 — Dynamic Content Foundations
 * Description: Locale configuration matching ustad pattern
 */

export const i18n = {
  defaultLocale: "en-US",
  locales: ["en-US", "tr-TR"],
} as const;
export type Locale = (typeof i18n)["locales"][number];
