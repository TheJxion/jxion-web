/**
 * Jxion Stack — Dictionary Helper
 * Phase Reference: Phase 1 — Dynamic Content Foundations
 * Description: Helper function to get nested dictionary values (matching ustad pattern)
 */

export type Dictionary = Record<string, any>;

/**
 * Get nested value from dictionary using path array
 * Example: getCorrectFromDictionary(dict, ['home', 'hero', 'title'], 'fallback')
 */
export const getCorrectFromDictionary = (
  dictionary: Dictionary | undefined,
  path: string[],
  fallback: string = ""
): string => {
  if (!dictionary) return fallback;

  let current: any = dictionary;
  for (const key of path) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return fallback;
    }
  }

  if (typeof current === "string") {
    return current;
  }

  return fallback;
};
