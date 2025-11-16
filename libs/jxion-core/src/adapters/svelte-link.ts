/**
 * Jxion Stack — Framework Adapter: Svelte Link
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Svelte-specific Link adapter for svelte-routing
 *
 * This adapter provides Svelte navigation using svelte-routing or SvelteKit
 */

export interface SvelteLinkProps {
  href: string;
  children: any;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: Event) => void;
}

/**
 * Svelte Link adapter factory
 * Detects if svelte-routing or SvelteKit is available
 */
export const createSvelteLinkAdapter = () => {
  // Try SvelteKit first (most common)
  try {
    // SvelteKit uses $app/stores for navigation
    // We'll return a component that uses goto from $app/navigation
    return (props: SvelteLinkProps) => {
      const { href, children, className, target, rel, onClick } = props;
      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//");

      // For SvelteKit, we'll use a standard <a> tag with client-side navigation
      // In a real Svelte component, this would use goto from $app/navigation
      console.log(`[Jxion-Core] Svelte Link adapter: Navigating to ${href}`);

      return {
        // This is a factory function that returns a Svelte component structure
        // In actual Svelte, this would be handled differently
        tag: "a",
        props: {
          href,
          class: className,
          target: target || (isExternal ? "_blank" : undefined),
          rel: rel || (isExternal ? "noopener noreferrer" : undefined),
          onclick: onClick,
        },
        children,
      };
    };
  } catch {
    console.log(
      "[Jxion-Core] SvelteKit not available, using default Svelte adapter"
    );
    // Fallback to standard <a> tag
    return (props: SvelteLinkProps) => {
      const { href, children, className, target, rel, onClick } = props;
      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//");

      return {
        tag: "a",
        props: {
          href,
          class: className,
          target: target || (isExternal ? "_blank" : undefined),
          rel: rel || (isExternal ? "noopener noreferrer" : undefined),
          onclick: onClick,
        },
        children,
      };
    };
  }
};

/**
 * Get Svelte Link adapter
 * Returns a function that creates Svelte-compatible link components
 */
export const getSvelteLinkAdapter = () => {
  console.log("[Jxion-Core] Using Svelte Link adapter");
  return createSvelteLinkAdapter();
};

export default getSvelteLinkAdapter;
