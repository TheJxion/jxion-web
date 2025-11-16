/**
 * Jxion Stack — Dictionary Loader
 * Phase Reference: Phase 1 — Dynamic Content Foundations
 * Description: Load dictionary files dynamically (matching ustad get-dictionary.ts pattern)
 */
const dictionaries = {
    "en-US": () => import("./dictionary/en-US.json").then((module) => module.default),
    "tr-TR": () => import("./dictionary/tr-TR.json").then((module) => module.default),
};
const normalizeLocale = (locale) => {
    const value = locale?.toString().toLowerCase();
    switch (value) {
        case "tr-tr":
            return "tr-TR";
        case "en-us":
        default:
            return "en-US";
    }
};
export const getDictionary = async (locale) => {
    const normalizedLocale = normalizeLocale(locale);
    const loader = dictionaries[normalizedLocale] ?? dictionaries["en-US"];
    return loader();
};
export const getSupportedLocale = (locale) => {
    return normalizeLocale(locale);
};
//# sourceMappingURL=get-dictionary.js.map