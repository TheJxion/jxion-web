import React from "react";
import styles from "@jxion/design/src/components/layout.module.scss";

/**
 * Layout Component - React Implementation
 *
 * Simple wrapper component using SCSS from @jxion-design
 */
export interface LayoutProps {
  params: {
    lang: string;
    theme: string;
  };
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ params, children }) => {
  return (
    <div
      className={styles.layout}
      data-lang={params.lang}
      data-theme={params.theme}
    >
      {children}
    </div>
  );
};

export default Layout;
