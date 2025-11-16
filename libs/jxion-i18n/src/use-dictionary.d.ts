/**
 * Jxion Stack — Dictionary Hook
 * Phase Reference: Phase 1 — Dynamic Content Foundations
 * Description: React hook for dictionary (matching ustad use-dictionary.ts pattern)
 */
import type { Locale } from "./i18n-config";
export type Dictionary = Record<string, any>;
type UseDictionaryStatus = "idle" | "loading" | "success" | "error";
export interface UseDictionaryOptions {
    fallbackLocale?: Locale;
    skip?: boolean;
}
export interface UseDictionaryResult {
    dictionary: Dictionary | null;
    status: UseDictionaryStatus;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: unknown;
    locale: Locale;
}
export declare const useDictionary: (locale?: Locale | string, options?: UseDictionaryOptions) => UseDictionaryResult;
export {};
//# sourceMappingURL=use-dictionary.d.ts.map