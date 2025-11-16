/**
 * Jxion Stack — Validation Library
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: Shared validation schemas using Zod
 * Date: 2025-11-14
 *
 * This library provides:
 * - Zod schemas for template shapes
 * - Zod schemas for translations
 * - Zod schemas for content
 * - Zod schemas for styles
 * - Validation functions for all data types
 */

export * from "./schemas/template";
export * from "./schemas/translation";
export * from "./schemas/content";
export * from "./schemas/style";
export * from "./validators";

