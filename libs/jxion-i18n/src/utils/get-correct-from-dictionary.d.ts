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
export declare const getCorrectFromDictionary: (dictionary: Dictionary | undefined, path: string[], fallback?: string) => string;
//# sourceMappingURL=get-correct-from-dictionary.d.ts.map