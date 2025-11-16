/**
 * Jxion Stack — Framework Adapter: Vue Link
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Vue-specific Link adapter for vue-router
 *
 * This adapter provides Vue navigation using vue-router
 */

import * as React from "react";

export interface VueLinkProps {
  href: string;
  children: any;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Vue Link adapter factory
 * Detects if vue-router is available
 */
export const createVueLinkAdapter = () => {
  // Try vue-router first
  try {
    // Use dynamic require that Vite can't analyze
    const vueRouter = new Function(
      'try { return require("vue-router"); } catch { return null; }'
    )();
    if (!vueRouter) {
      throw new Error("vue-router not available");
    }
    const { RouterLink } = vueRouter;
    return {
      name: "JxionLink",
      props: {
        href: String,
        className: String,
        target: String,
        rel: String,
      },
      setup(props: VueLinkProps, { slots, emit }: any) {
        const isExternal =
          props.href.startsWith("http://") ||
          props.href.startsWith("https://") ||
          props.href.startsWith("//");

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (props.onClick) {
            props.onClick(e);
          }
          console.log(
            `[Jxion-Core] Vue Link adapter: Navigating to ${props.href}`
          );
        };

        return () => {
          if (isExternal || props.target) {
            return (
              <a
                href={props.href}
                className={props.className}
                target={props.target || (isExternal ? "_blank" : undefined)}
                rel={
                  props.rel || (isExternal ? "noopener noreferrer" : undefined)
                }
                onClick={handleClick}
              >
                {slots.default?.()}
              </a>
            );
          }

          return (
            <RouterLink
              to={props.href}
              className={props.className}
              onClick={handleClick}
            >
              {slots.default?.()}
            </RouterLink>
          );
        };
      },
    };
  } catch {
    console.log(
      "[Jxion-Core] vue-router not available, using default Vue adapter"
    );
    // Fallback to standard <a> tag
    return {
      name: "JxionLink",
      props: {
        href: String,
        className: String,
        target: String,
        rel: String,
      },
      setup(props: VueLinkProps, { slots, emit }: any) {
        const isExternal =
          props.href.startsWith("http://") ||
          props.href.startsWith("https://") ||
          props.href.startsWith("//");

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          if (props.onClick) {
            props.onClick(e);
          }
          console.log(
            `[Jxion-Core] Vue Link adapter: Navigating to ${props.href}`
          );
        };

        return () => (
          <a
            href={props.href}
            className={props.className}
            target={props.target || (isExternal ? "_blank" : undefined)}
            rel={props.rel || (isExternal ? "noopener noreferrer" : undefined)}
            onClick={handleClick}
          >
            {slots.default?.()}
          </a>
        );
      },
    };
  }
};

/**
 * Get Vue Link adapter
 */
export const getVueLinkAdapter = () => {
  console.log("[Jxion-Core] Using Vue Link adapter");
  return createVueLinkAdapter();
};

export default getVueLinkAdapter;
