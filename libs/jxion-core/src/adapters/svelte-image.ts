/**
 * Jxion Stack — Framework Adapter: Svelte Image
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Svelte-specific Image adapter
 *
 * This adapter provides Svelte image components
 */

export interface SvelteImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: Record<string, string>;
  loading?: "lazy" | "eager";
}

/**
 * Svelte Image adapter factory
 * Creates Svelte-compatible image components
 */
export const createSvelteImageAdapter = () => {
  return (props: SvelteImageProps) => {
    const {
      src,
      alt,
      width,
      height,
      className,
      style,
      loading = "lazy",
    } = props;

    console.log(`[Jxion-Core] Svelte Image adapter: Loading ${src}`);

    return {
      tag: "img",
      props: {
        src,
        alt,
        width: typeof width === "number" ? width : undefined,
        height: typeof height === "number" ? height : undefined,
        class: className,
        style: style
          ? Object.entries(style)
              .map(([k, v]) => `${k}: ${v}`)
              .join("; ")
          : undefined,
        loading,
      },
    };
  };
};

/**
 * Get Svelte Image adapter
 */
export const getSvelteImageAdapter = () => {
  console.log("[Jxion-Core] Using Svelte Image adapter");
  return createSvelteImageAdapter();
};

export default getSvelteImageAdapter;
