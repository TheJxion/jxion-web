/**
 * Jxion Stack — Example Page
 * Phase Reference: All Phases
 * Description: Example page showing the new component usage pattern (matching ustad page.tsx)
 *
 * This demonstrates:
 * - Components imported from @jxion/design (no Ustad prefix)
 * - Dictionary system from @jxion/i18n
 * - Styles loaded from @jxion/styles
 * - Simple page composition (just list components!)
 */

import { Hero, Button } from "@jxion/design";

export default function App() {
  const lang = "tr-TR";
  const theme = "light";

  return (
    <div>
      <Hero params={{ lang, theme }} />
      {/* More components can be added here just like ustad page.tsx */}
    </div>
  );
}
