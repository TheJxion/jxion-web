/**
 * Jxion Stack — MakeUp Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: MakeUp component (matching ustad UstadMakeUp pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/MakeUp/UstadMakeUp/index.tsx
 */

"use client";
/** Style Imports */
import styles from "../../styles/modules/MakeUp.module.scss";
/** Core Imports */
import { ReactNode, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/** Icon Imports */
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
/** Language Imports */
import type { Locale } from "@jxion/i18n";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
/** Props Interface */
export interface MakeUpProps {
  announcementId?: string;
  message?: string;
  phoneNumber?: string;
  contactLabel?: string;
  params: { lang: Locale; theme: string };
  children?: ReactNode;
  className?: string;
}
/** Test ID */
export const MAKEUP_TEST = {
  CONTAINER: "makeup",
  LEFT_SECTION: "makeup-left-section",
  RIGHT_SECTION: "makeup-right-section",
  PHONE_GROUP: "makeup-phone-group",
  WHATSAPP_ICON: "makeup-whatsapp-icon",
  PHONE_ICON: "makeup-phone-icon",
  CONTACT_GROUP: "makeup-contact-group",
  ALERT_ICON: "makeup-alert-icon",
  MESSAGE: "makeup-message",
  PHONE_NUMBER: "makeup-phone-number",
};

const MakeUp = ({
  announcementId,
  message,
  phoneNumber,
  contactLabel,
  params,
  className,
}: MakeUpProps) => {
  const { dictionary } = useDictionary(params.lang);
  const makeUpDictionary = useMemo(() => {
    const homeDictionary = (dictionary as Record<string, unknown> | undefined)?.[
      "home"
    ] as Record<string, unknown> | undefined;
    return homeDictionary?.["makeUp"] as
      | Record<string, unknown>
      | undefined;
  }, [dictionary]);
  const translatedMessage =
    message ??
    announcementId ??
    getCorrectFromDictionary(makeUpDictionary, ["message"], "");
  const translatedPhoneNumber =
    phoneNumber ??
    getCorrectFromDictionary(makeUpDictionary, ["phoneNumber"], "");
  const translatedContactLabel =
    contactLabel ??
    getCorrectFromDictionary(makeUpDictionary, ["contactLabel"], "");
  return (
    <div
      className={`${styles["makeup"]} ${className || ""}`}
      data-testid={MAKEUP_TEST.CONTAINER}
    >
      <div
        className={`${styles["leftSection"]} ${className || ""}`}
        data-testid={MAKEUP_TEST.LEFT_SECTION}
      >
        <FontAwesomeIcon
          icon={faInfoCircle}
          className={`${styles["alertIcon"]} ${className || ""}`}
          data-testid={MAKEUP_TEST.ALERT_ICON}
        />
        <span
          className={`${styles["message"]} ${className || ""}`}
          data-testid={MAKEUP_TEST.MESSAGE}
        >
          {translatedMessage}
        </span>
      </div>
      <div
        className={`${styles["rightSection"]} ${className || ""}`}
        data-testid={MAKEUP_TEST.RIGHT_SECTION}
      >
        <div
          className={`${styles["phoneGroup"]} ${className || ""}`}
          data-testid={MAKEUP_TEST.PHONE_GROUP}
        >
          <FontAwesomeIcon
            icon={faWhatsapp}
            className={`${styles["whatsappIcon"]} ${className || ""}`}
            data-testid={MAKEUP_TEST.WHATSAPP_ICON}
          />
          <span
            className={`${styles["phoneNumber"]} ${className || ""}`}
            data-testid={MAKEUP_TEST.PHONE_NUMBER}
          >
            {translatedPhoneNumber}
          </span>
        </div>
        <div
          className={`${styles["contactGroup"]} ${className || ""}`}
          data-testid={MAKEUP_TEST.CONTACT_GROUP}
        >
          <FontAwesomeIcon
            icon={faPhone}
            className={`${styles["phoneIcon"]} ${className || ""}`}
            data-testid={MAKEUP_TEST.PHONE_ICON}
          />
          <span>{translatedContactLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default MakeUp;

