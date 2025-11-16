/**
 * Jxion Stack — Framework Adapters Index
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Centralized adapter exports and initialization
 */

import * as React from "react";
import { getLinkAdapter, type LinkProps } from "./link";
import { getImageAdapter, type ImageProps } from "./image";

// Initialize adapters once (singleton pattern)
let LinkAdapter: React.ComponentType<LinkProps> | null = null;
let ImageAdapter: React.ComponentType<ImageProps> | null = null;

/**
 * Get or initialize Link adapter
 * Caches the adapter after first initialization
 */
export const getLink = (): React.ComponentType<LinkProps> => {
  if (!LinkAdapter) {
    LinkAdapter = getLinkAdapter();
    console.log("[Jxion-Core] Link adapter initialized");
  }
  return LinkAdapter as React.ComponentType<LinkProps>;
};

/**
 * Get or initialize Image adapter
 * Caches the adapter after first initialization
 */
export const getImage = (): React.ComponentType<ImageProps> => {
  if (!ImageAdapter) {
    ImageAdapter = getImageAdapter();
    console.log("[Jxion-Core] Image adapter initialized");
  }
  return ImageAdapter as React.ComponentType<ImageProps>;
};

// Re-export types and functions
export * from "./link";
export * from "./image";
export * from "./svelte-link";
export * from "./svelte-image";
export * from "./vue-link";
export * from "./vue-image";

// Default exports for convenience
export { getLink as Link, getImage as Image };
