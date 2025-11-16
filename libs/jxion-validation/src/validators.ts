/**
 * Jxion Stack — Validation Functions
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: Validation functions for all data types
 * Date: 2025-11-14
 */

import {
  TemplateSchema,
  type Template,
} from "./schemas/template";
import {
  TranslationSchema,
  BatchTranslationSchema,
  type Translation,
  type BatchTranslation,
} from "./schemas/translation";
import {
  ContentSchema,
  ContentFileSchema,
  type Content,
  type ContentFile,
} from "./schemas/content";
import {
  StyleSchema,
  type Style,
} from "./schemas/style";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate a translation key and value
 */
export function validateTranslation(
  key: string,
  value: string
): ValidationResult {
  try {
    TranslationSchema.parse({
      key,
      locale: "tr-TR", // Default locale for validation
      value,
    });
    return { valid: true, errors: [] };
  } catch (error: any) {
    return {
      valid: false,
      errors: error.errors?.map((e: any) => e.message) || [String(error)],
    };
  }
}

/**
 * Validate content JSON
 */
export function validateContent(
  path: string,
  json: any
): ValidationResult {
  try {
    ContentFileSchema.parse({
      path,
      content: json,
    });
    return { valid: true, errors: [] };
  } catch (error: any) {
    return {
      valid: false,
      errors: error.errors?.map((e: any) => e.message) || [String(error)],
    };
  }
}

/**
 * Validate component styles
 */
export function validateStyles(
  componentId: string,
  styles: { tailwind: string; custom: string },
  variant?: string,
  className?: string
): ValidationResult {
  try {
    StyleSchema.parse({
      componentId,
      variant,
      className,
      styles,
    });
    return { valid: true, errors: [] };
  } catch (error: any) {
    return {
      valid: false,
      errors: error.errors?.map((e: any) => e.message) || [String(error)],
    };
  }
}

/**
 * Validate template schema
 */
export function validateTemplate(schema: any): ValidationResult {
  try {
    TemplateSchema.parse(schema);
    return { valid: true, errors: [] };
  } catch (error: any) {
    return {
      valid: false,
      errors: error.errors?.map((e: any) => e.message) || [String(error)],
    };
  }
}

/**
 * Validate batch translations
 */
export function validateBatchTranslations(
  translations: Array<{ key: string; locale: string; value: string }>
): ValidationResult {
  try {
    BatchTranslationSchema.parse(translations);
    return { valid: true, errors: [] };
  } catch (error: any) {
    return {
      valid: false,
      errors: error.errors?.map((e: any) => e.message) || [String(error)],
    };
  }
}

