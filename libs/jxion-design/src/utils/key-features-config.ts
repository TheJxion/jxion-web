/**
 * Jxion Stack — Key Features Configuration
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Key features configuration utility (matching ustad pattern)
 * MIGRATED FROM: ustad-web/shared/src/utils/key-features-config.ts
 */

import {
  faUsers,
  faCalendar,
  faClipboardCheck,
  faMoneyBill,
  faFileAlt,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface KeyFeature {
  icon?: IconProp;
  title: string;
  description: string;
  ctaText?: string;
  footnote?: string;
  variant?: "default" | "highlighted" | "minimal";
  link?: string;
  external?: boolean;
}

export interface KeyFeaturesConfig {
  icon: any;
  keyPrefix: string; // Prefix for dictionary keys (e.g., 'kursiyer_yonetimi')
  defaultTitle: string;
  defaultDescription: string;
  defaultCtaText: string;
  defaultFootnote: string;
  variant?: "default" | "highlighted" | "minimal";
}

export const KEY_FEATURES_CONFIG: KeyFeaturesConfig[] = [
  {
    icon: faUsers,
    keyPrefix: "kursiyer_yonetimi",
    defaultTitle: "Kursiyer Yönetimi",
    defaultDescription: "Kursiyer başvuru, sınav, aktarma ve belge takibi",
    defaultCtaText: "Detayları Gör",
    defaultFootnote: "MTSK uyumlu belge kontrolü",
  },
  {
    icon: faCalendar,
    keyPrefix: "kurs_yonetimi",
    defaultTitle: "Kurs Yönetimi",
    defaultDescription: "Dönem, grup ve şube yönetimi ve otomatik planlama",
    defaultCtaText: "Detayları Gör",
    defaultFootnote: "Otomatik ders planı",
  },
  {
    icon: faClipboardCheck,
    keyPrefix: "sinav_yonetimi",
    defaultTitle: "Sınav Yönetimi",
    defaultDescription:
      "Teorik ve uygulamalı sınav süreçlerini kolayca yönetin",
    defaultCtaText: "Detayları Gör",
    defaultFootnote: "Otomatik sonuç takibi",
  },
  {
    icon: faMoneyBill,
    keyPrefix: "finansal_yonetim",
    defaultTitle: "Finansal Yönetim",
    defaultDescription:
      "Ücretlendirme, ödeme planı ve borç takibinizi basitleştirin",
    defaultCtaText: "Detayları Gör",
    defaultFootnote: "Taksit planı",
  },
  {
    icon: faFileAlt,
    keyPrefix: "belge_yonetimi",
    defaultTitle: "Belge Yönetimi",
    defaultDescription: "Belge yükleme, kontrol ve MTSK uyumluluğunu sağlayın",
    defaultCtaText: "Detayları Gör",
    defaultFootnote: "MTSK uyumlu",
  },
  {
    icon: faCar,
    keyPrefix: "arac_yonetimi",
    defaultTitle: "Araç Yönetimi",
    defaultDescription:
      "Eğitim araçları, simülatör ve bakım takibinizi kolaylaştırın",
    defaultCtaText: "Detayları Gör",
    defaultFootnote: "Bakım takibi",
  },
];

/**
 * Returns default features for KeyFeatures, localized according to the given dictionary.
 * @param dict - Dictionary object from getDictionary (can be nested or flat)
 * @returns KeyFeature[]
 */
export function getDefaultKeyFeatures(dict: Record<string, any>): KeyFeature[] {
  // Navigate to keyFeatures in dictionary - check both nested (home.keyFeatures) and flat structures
  const keyFeaturesDict =
    dict?.["home"]?.["keyFeatures"] || dict?.["keyFeatures"] || dict || {};

  return KEY_FEATURES_CONFIG.map((config) => {
    // Try multiple key patterns for flexibility
    const titleKey = `keyFeatures_${config.keyPrefix}_title`;
    const descKey = `keyFeatures_${config.keyPrefix}_desc`;
    const ctaKey = `keyFeatures_${config.keyPrefix}_cta`;
    const footnoteKey = `keyFeatures_${config.keyPrefix}_footnote`;

    // Also try without keyFeatures prefix (for nested structure)
    const simpleTitleKey = `${config.keyPrefix}_title`;
    const simpleDescKey = `${config.keyPrefix}_desc`;
    const simpleCtaKey = `${config.keyPrefix}_cta`;
    const simpleFootnoteKey = `${config.keyPrefix}_footnote`;

    return {
      icon: config.icon,
      title:
        keyFeaturesDict[titleKey] ||
        keyFeaturesDict[simpleTitleKey] ||
        config.defaultTitle,
      description:
        keyFeaturesDict[descKey] ||
        keyFeaturesDict[simpleDescKey] ||
        config.defaultDescription,
      ctaText:
        keyFeaturesDict[ctaKey] ||
        keyFeaturesDict[simpleCtaKey] ||
        config.defaultCtaText,
      footnote:
        keyFeaturesDict[footnoteKey] ||
        keyFeaturesDict[simpleFootnoteKey] ||
        config.defaultFootnote,
      variant: config.variant || "default",
    };
  });
}
