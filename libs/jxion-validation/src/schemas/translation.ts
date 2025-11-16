/**
 * Jxion Stack — Translation Validation Schema
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: Zod schema for translation validation
 * Date: 2025-11-14
 */

import { z } from "zod";

// Locale schema (e.g., "tr-TR", "en-US")
export const LocaleSchema = z.string().regex(/^[a-z]{2}-[A-Z]{2}$/, "Invalid locale format (expected: xx-XX)");

// Translation key schema
export const TranslationKeySchema = z.string().min(1, "Translation key is required").max(500, "Translation key too long");

// Translation value schema
export const TranslationValueSchema = z.string().min(0).max(10000, "Translation value too long");

// Translation schema
export const TranslationSchema = z.object({
  key: TranslationKeySchema,
  locale: LocaleSchema,
  value: TranslationValueSchema,
  namespace: z.string().max(100).optional(),
});

// Batch translation schema
export const BatchTranslationSchema = z.array(TranslationSchema).min(1, "At least one translation is required");

export type Locale = z.infer<typeof LocaleSchema>;
export type TranslationKey = z.infer<typeof TranslationKeySchema>;
export type TranslationValue = z.infer<typeof TranslationValueSchema>;
export type Translation = z.infer<typeof TranslationSchema>;
export type BatchTranslation = z.infer<typeof BatchTranslationSchema>;

