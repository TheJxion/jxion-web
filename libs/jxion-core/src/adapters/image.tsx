/**
 * Jxion Stack — Framework Adapter: Image
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Framework-agnostic Image component adapter
 *
 * This adapter provides a unified interface for images across frameworks:
 * - Next.js: Uses next/image (optimized)
 * - Plain React: Uses standard <img> tag
 * - Other frameworks: Uses standard <img> tag
 */

import * as React from "react";

export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

/**
 * Default Image adapter - uses standard <img> tag
 * This works in all frameworks and can be overridden by framework-specific adapters
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  loading = "lazy",
  ...props
}) => {
  console.log(`[Jxion-Core] Image adapter: Loading ${src}`);

  return (
    <img
      src={src}
      alt={alt}
      width={typeof width === "number" ? width : undefined}
      height={typeof height === "number" ? height : undefined}
      className={className}
      style={{
        width: typeof width === "string" ? width : undefined,
        height: typeof height === "string" ? height : undefined,
        ...style,
      }}
      loading={loading}
    />
  );
};

/**
 * Next.js Image adapter
 * Detects if next/image is available and uses it for optimization
 */
export const createNextImageAdapter = () => {
  try {
    // Use dynamic require that Vite can't statically analyze
    const getNextImage = new Function(
      'try { return require("next/image").default; } catch { return null; }'
    );
    const NextImage = getNextImage();
    if (!NextImage) {
      throw new Error("next/image not available");
    }
    return ({
      src,
      alt,
      width,
      height,
      className,
      style,
      fill,
      sizes,
      quality,
      priority,
      placeholder,
      blurDataURL,
      ...props
    }: ImageProps) => {
      console.log(
        `[Jxion-Core] Next.js Image adapter: Loading ${src} (optimized)`
      );

      if (fill) {
        return (
          <NextImage
            src={src}
            alt={alt}
            fill
            className={className}
            style={style}
            sizes={sizes}
            quality={quality}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            {...props}
          />
        );
      }

      return (
        <NextImage
          src={src}
          alt={alt}
          width={typeof width === "number" ? width : undefined}
          height={typeof height === "number" ? height : undefined}
          className={className}
          style={style}
          sizes={sizes}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          {...props}
        />
      );
    };
  } catch {
    console.log(
      "[Jxion-Core] Next.js Image not available, using default adapter"
    );
    return Image;
  }
};

/**
 * Auto-detect and return the best Image adapter for the current environment
 */
export const getImageAdapter = (): React.FC<ImageProps> => {
  // Always use default adapter to avoid Vite trying to resolve framework-specific modules
  // Framework-specific adapters should be used explicitly when needed
  console.log("[Jxion-Core] Using default Image adapter (standard <img> tag)");
  return Image;
};

export default Image;
