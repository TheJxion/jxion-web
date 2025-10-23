import styles from "@jxion/design/src/components/layout.module.scss";

interface LayoutProps {
  params: { lang: string; theme: string };
  children: any;
}

export const Layout = (props: LayoutProps) => {
  return (
    <div
      class={styles.layout}
      data-lang={props.params.lang}
      data-theme={props.params.theme}
    >
      {props.children}
    </div>
  );
};
