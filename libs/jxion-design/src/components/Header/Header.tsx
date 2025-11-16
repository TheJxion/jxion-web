/**
 * Jxion Stack — Header Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Header component (matching ustad UstadHeader pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Header/UstadHeader/index.tsx
 *
 * Uses framework adapters for Link and Image - works in Next.js, Vite, and other React environments
 */

"use client";
/** Type Imports */
import type { Locale } from "@jxion/i18n";
/** Core Imports */
import { useMemo } from "react";
import { getLink, getImage } from "@jxion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
/** Style Imports */
import styles from "../../styles/modules/Header.module.scss";
/** Component Imports */
import Button from "../Button/Button";
/** Language Imports */
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";

/** Nav Item Interface */
export interface NavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
}

/** Props Interface */
export interface HeaderProps {
  className?: string;
  params: { lang: Locale; theme: string };
  user?: {
    name?: string | null;
    email?: string | null;
    firmName?: string | null;
  } | null;
}

const DEFAULT_NAV_ITEMS: NavItemProps[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Documentation", href: "/documentation" },
  { label: "Purchase", href: "/subscription" },
];

const NAVIGATION_BLUEPRINT: Array<{ key: string; href: string }> = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "documentation", href: "/documentation" },
  { key: "purchase", href: "/subscription" },
];

const isValidNavItemArray = (items: unknown): items is NavItemProps[] => {
  if (!Array.isArray(items)) return false;
  return items.every((item) => {
    if (typeof item !== "object" || item === null) return false;
    const candidate = item as NavItemProps;
    return (
      typeof candidate.label === "string" && typeof candidate.href === "string"
    );
  });
};

const tryParseNavItems = (value: unknown): NavItemProps[] | null => {
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (isValidNavItemArray(parsed)) {
        return parsed;
      }
    } catch {
      return null;
    }
  } else if (isValidNavItemArray(value)) {
    return value;
  }

  return null;
};

const Header = ({ className, params, user }: HeaderProps) => {
  // Initialize framework adapters
  const Link = getLink();
  const Image = getImage();

  const { dictionary } = useDictionary(params.lang);
  const navigationDictionary = useMemo(() => {
    if (!dictionary) return undefined;
    const navigationSection = (
      dictionary as Record<string, unknown> | undefined
    )?.["navigation"];
    if (
      !navigationSection ||
      typeof navigationSection !== "object" ||
      Array.isArray(navigationSection)
    ) {
      return undefined;
    }
    return navigationSection as Record<string, unknown>;
  }, [dictionary]);
  const commonDictionary = useMemo(() => {
    if (!dictionary) return undefined;
    const commonSection = (dictionary as Record<string, unknown> | undefined)?.[
      "common"
    ];
    if (
      !commonSection ||
      typeof commonSection !== "object" ||
      Array.isArray(commonSection)
    ) {
      return undefined;
    }
    return commonSection as Record<string, unknown>;
  }, [dictionary]);
  const isAuthenticated = !!user;
  const navItems = useMemo(() => {
    if (!navigationDictionary) return DEFAULT_NAV_ITEMS;
    const navigationSection = navigationDictionary as Record<string, unknown>;
    const resolvedItems =
      tryParseNavItems(
        "items" in navigationSection ? navigationSection["items"] : undefined
      ) ?? undefined;
    if (resolvedItems && resolvedItems.length > 0) return resolvedItems;
    return NAVIGATION_BLUEPRINT.reduce<NavItemProps[]>((acc, { key, href }) => {
      const labelCandidate = navigationSection[key];
      if (
        typeof labelCandidate === "string" &&
        labelCandidate.trim().length > 0
      ) {
        acc.push({ label: labelCandidate, href });
      }
      return acc;
    }, []);
  }, [navigationDictionary]);

  const contactLabel = getCorrectFromDictionary(
    commonDictionary,
    ["contact"],
    ""
  );
  const exitLabel = getCorrectFromDictionary(commonDictionary, ["exit"], "");
  const userLabel = getCorrectFromDictionary(commonDictionary, ["user"], "");
  const loginLabel = getCorrectFromDictionary(commonDictionary, ["login"], "");
  const logoutLabel = getCorrectFromDictionary(
    commonDictionary,
    ["logout"],
    ""
  );
  const profileLabel = getCorrectFromDictionary(
    commonDictionary,
    ["profile"],
    ""
  );

  return (
    <header className={`${styles["header"]} ${className || ""}`}>
      <div className={styles["header__container"]}>
        <div className={styles["header__logo-wrapper"]}>
          <Link href="/" className={styles["header__logo"]}>
            <Image
              src="/images/logo-2x.png"
              alt="yeşiLdefter"
              width={214}
              height={52}
            />
          </Link>
        </div>
        <div className={styles["header__content"]}>
          <nav className={styles["header__nav"]}>
            {navItems.map((item: NavItemProps, index: number) => (
              <Link
                key={`${item.href}-${index}`}
                href={item.href}
                className={styles["nav__item"]}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && (
              <div className={styles["nav__exit-button"]}>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className={styles["exit-icon"]}
                />
                <span>{exitLabel}</span>
              </div>
            )}
            {isAuthenticated && (
              <div className={styles["nav__user-icon"]}>
                <FontAwesomeIcon
                  icon={faUser}
                  className={styles["user-icon"]}
                />
                <span>{user?.name || user?.email || userLabel}</span>
              </div>
            )}
          </nav>
          <div className={styles["header__actions"]}>
            {isAuthenticated ? (
              <div className={styles["header__user-info"]}>
                {user?.firmName && (
                  <div className={styles["user-info__firm"]}>
                    {user.firmName}
                  </div>
                )}
                <div className={styles["header__user-container"]}>
                  <i
                    className={`${styles["user-icon"]} fas fa-user-circle`}
                  ></i>
                  <span className={styles["user-name"]}>
                    {user?.name || user?.email || userLabel}
                  </span>
                </div>
                <div className={styles["header__cta"]}>
                  <Button variant="cta" className={styles["header__ctaButton"]}>
                    {contactLabel}
                  </Button>
                  <Button variant="cta" className={styles["header__ctaButton"]}>
                    {logoutLabel}
                  </Button>
                  <Button variant="cta" className={styles["header__ctaButton"]}>
                    {profileLabel}
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles["header__cta"]}>
                <Link href="/auth/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="cta"
                    className={`${styles["header__ctaButton"]} ${styles["header__ctaButton--login"]}`}
                  >
                    {loginLabel}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
