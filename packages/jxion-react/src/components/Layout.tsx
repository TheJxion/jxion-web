import React from "react";
import styles from "@jxion/design/src/components/UstadLayout.module.scss";

interface LayoutProps {
  params: {
    lang: string;
    theme: string;
  };
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ params, children }) => {
  return (
    <div className={styles.layout} data-lang={params.lang} data-theme={params.theme}>
      {children}
    </div>
  );
};

export default Layout;
