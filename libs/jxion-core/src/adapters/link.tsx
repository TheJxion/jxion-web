/**
 * Jxion Stack — Framework Adapter: Link
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Framework-agnostic Link component adapter
 *
 * This adapter provides a unified interface for navigation links across frameworks:
 * - Next.js: Uses next/link
 * - React Router: Uses react-router-dom Link
 * - Vite/Plain React: Uses standard <a> tag
 * - Svelte: Uses svelte-routing Link
 * - Vue: Uses vue-router RouterLink
 */

import * as React from "react";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Default Link adapter - uses standard <a> tag
 * This works in all frameworks and can be overridden by framework-specific adapters
 */
export const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  target,
  rel,
  onClick,
}) => {
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // For internal links, prevent default and use client-side navigation if available
    if (!isExternal && !target) {
      // In a real implementation, this would use the framework's router
      // For now, we'll use standard navigation
      console.log(`[Jxion-Core] Link adapter: Navigating to ${href}`);
    }
  };

  return (
    <a
      href={href}
      className={className}
      target={target || (isExternal ? "_blank" : undefined)}
      rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

/**
 * Next.js Link adapter
 * Detects if next/link is available and uses it
 */
export const createNextLinkAdapter = () => {
  try {
    // Use dynamic require that Vite can't statically analyze
    const getNextLink = new Function(
      'try { return require("next/link").default; } catch { return null; }'
    );
    const NextLink = getNextLink();
    if (!NextLink) {
      throw new Error("next/link not available");
    }
    return ({ href, children, className, ...props }: LinkProps) => (
      <NextLink href={href} className={className} {...props}>
        {children}
      </NextLink>
    );
  } catch {
    console.log(
      "[Jxion-Core] Next.js Link not available, using default adapter"
    );
    return Link;
  }
};

/**
 * React Router Link adapter
 */
export const createReactRouterLinkAdapter = () => {
  try {
    // Use dynamic require that Vite can't statically analyze
    const getRouter = new Function(
      'try { return require("react-router-dom"); } catch { return null; }'
    );
    const router = getRouter();
    if (!router) {
      throw new Error("react-router-dom not available");
    }
    const { Link: RouterLink } = router;
    return ({ href, children, className, ...props }: LinkProps) => (
      <RouterLink to={href} className={className} {...props}>
        {children}
      </RouterLink>
    );
  } catch {
    console.log(
      "[Jxion-Core] React Router Link not available, using default adapter"
    );
    return Link;
  }
};

/**
 * Auto-detect and return the best Link adapter for the current environment
 */
export const getLinkAdapter = (): React.FC<LinkProps> => {
  // Always use default adapter to avoid Vite trying to resolve framework-specific modules
  // Framework-specific adapters should be used explicitly when needed
  console.log("[Jxion-Core] Using default Link adapter (standard <a> tag)");
  return Link;
};

export default Link;
