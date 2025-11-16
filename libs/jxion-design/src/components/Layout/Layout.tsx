/**
 * Jxion Stack — Layout Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Layout component (matching ustad UstadLayout pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Layout/UstadLayout/index.tsx
 */

"use client";
/** Type Imports */
import type { Locale } from "@jxion/i18n";
/** Style Imports */
import styles from "../../styles/modules/Layout.module.scss";
/** Core Imports */
import { Suspense } from "react";
import { useDictionary, getCorrectFromDictionary } from "@jxion/i18n";
/** Component Imports */
import { Header } from "../Header";
import { Footer } from "../Footer";

export interface LayoutProps {
  children: React.ReactNode;
  params: { lang: Locale; theme: string };
  user?: {
    name: string;
    email: string;
    firmName: string;
    firmGUID: string;
  };
  className?: string;
}
/** Test ID */
export const LAYOUT_TEST = {
  CONTAINER: "layout",
  HEADER: "layout-header",
  MAIN: "layout-main",
  FOOTER: "layout-footer",
};

const Layout = ({ children, params, user, className }: LayoutProps) => {
  const { dictionary } = useDictionary(params?.lang);
  const loadingText = getCorrectFromDictionary(
    dictionary ?? undefined,
    ["common", "loading"],
    "Loading..."
  );

  return (
    <div
      className={`${styles["layout"]} ${className || ""}`}
      data-testid={LAYOUT_TEST.CONTAINER}
    >
      <Suspense fallback={<div>{loadingText}</div>}>
        <Header params={params} user={user} className={className} />
      </Suspense>
      <main
        className={`${styles["layout__main"]} ${className}`}
        data-testid={LAYOUT_TEST.MAIN}
      >
        {children}
      </main>
      <Footer
        params={params}
        className={`${styles["layout__footer"]} ${className}`}
      />
    </div>
  );
};

export default Layout;

