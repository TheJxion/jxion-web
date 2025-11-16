/**
 * Jxion Stack — Template Validation Schema
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: Zod schema for template validation
 * Date: 2025-11-14
 */

import { z } from "zod";

// Template section schema
export const TemplateSectionSchema = z.object({
  component: z.string().min(1, "Component ID is required"),
  localeKey: z.string().optional(),
  props: z.record(z.any()).optional(),
});

// Template metadata schema
export const TemplateMetadataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  locale: z.string().optional(),
});

// Template schema
export const TemplateSchema = z.object({
  id: z.string().min(1, "Template ID is required"),
  version: z.string().optional(),
  sections: z.array(TemplateSectionSchema).min(1, "At least one section is required"),
  metadata: TemplateMetadataSchema.optional(),
});

export type TemplateSection = z.infer<typeof TemplateSectionSchema>;
export type TemplateMetadata = z.infer<typeof TemplateMetadataSchema>;
export type Template = z.infer<typeof TemplateSchema>;

