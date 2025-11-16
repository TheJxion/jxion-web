/**
 * Stub for next/link - not available in SvelteKit
 * This prevents Vite from trying to resolve next/link at build time
 */
export default function StubLink({ href, children, ...props }: any) {
  return { href, children, ...props };
}
