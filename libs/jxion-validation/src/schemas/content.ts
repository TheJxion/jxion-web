/**
 * Jxion Stack — Content Validation Schema
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: Zod schema for content validation
 * Date: 2025-11-14
 */

import { z } from "zod";

// Content path schema
export const ContentPathSchema = z.string().min(1, "Content path is required").max(500, "Content path too long");

// Content schema (flexible JSON object)
export const ContentSchema = z.record(z.any());

// Content file schema
export const ContentFileSchema = z.object({
  path: ContentPathSchema,
  content: ContentSchema,
  version: z.number().int().positive().optional(),
});

export type ContentPath = z.infer<typeof ContentPathSchema>;
export type Content = z.infer<typeof ContentSchema>;
export type ContentFile = z.infer<typeof ContentFileSchema>;

