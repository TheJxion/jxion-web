/**
 * Jxion Stack — Framework Adapter: Vue Image
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Vue-specific Image adapter
 *
 * This adapter provides Vue image components
 */

export interface VueImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: Record<string, string>;
  loading?: "lazy" | "eager";
}

/**
 * Vue Image adapter factory
 * Creates Vue-compatible image components
 */
export const createVueImageAdapter = () => {
  return {
    name: "JxionImage",
    props: {
      src: String,
      alt: String,
      width: [Number, String],
      height: [Number, String],
      className: String,
      style: Object,
      loading: {
        type: String,
        default: "lazy",
        validator: (value: string) => ["lazy", "eager"].includes(value),
      },
    },
    setup(props: VueImageProps) {
      console.log(`[Jxion-Core] Vue Image adapter: Loading ${props.src}`);

      return () => (
        <img
          src={props.src}
          alt={props.alt}
          width={typeof props.width === "number" ? props.width : undefined}
          height={typeof props.height === "number" ? props.height : undefined}
          className={props.className}
          style={props.style}
          loading={props.loading}
        />
      );
    },
  };
};

/**
 * Get Vue Image adapter
 */
export const getVueImageAdapter = () => {
  console.log("[Jxion-Core] Using Vue Image adapter");
  return createVueImageAdapter();
};

export default getVueImageAdapter;
