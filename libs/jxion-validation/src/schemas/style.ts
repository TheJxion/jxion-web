/**
 * Jxion Stack — Style Validation Schema
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: Zod schema for style validation
 * Date: 2025-11-14
 */

import { z } from "zod";

// Component ID schema
export const ComponentIdSchema = z.string().min(1, "Component ID is required").max(200, "Component ID too long");

// Variant schema
export const VariantSchema = z.string().max(100, "Variant name too long").optional();

// Class name schema
export const ClassNameSchema = z.string().max(500, "Class name too long").optional();

// Tailwind classes schema
export const TailwindClassesSchema = z.string().max(5000, "Tailwind classes too long");

// Custom CSS schema
export const CustomCssSchema = z.string().max(50000, "Custom CSS too long");

// Component style schema
export const ComponentStyleSchema = z.object({
  tailwind: TailwindClassesSchema,
  custom: CustomCssSchema,
});

// Style schema
export const StyleSchema = z.object({
  componentId: ComponentIdSchema,
  variant: VariantSchema,
  className: ClassNameSchema,
  styles: ComponentStyleSchema,
});

export type ComponentId = z.infer<typeof ComponentIdSchema>;
export type Variant = z.infer<typeof VariantSchema>;
export type ClassName = z.infer<typeof ClassNameSchema>;
export type TailwindClasses = z.infer<typeof TailwindClassesSchema>;
export type CustomCss = z.infer<typeof CustomCssSchema>;
export type ComponentStyle = z.infer<typeof ComponentStyleSchema>;
export type Style = z.infer<typeof StyleSchema>;

