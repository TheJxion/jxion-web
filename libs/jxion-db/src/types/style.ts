/**
 * Jxion Stack — Database Types
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: TypeScript types for style database schema
 * Date: 2025-11-14
 *
 * These types match the Go structs in apps/jxion-api/internal/models/
 */

export interface StyleRow {
  id: number;
  component_id: string;
  variant?: string | null;
  theme: string;
  css: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateStyleInput {
  component_id: string;
  variant?: string;
  theme: string;
  css: string;
}

export interface UpdateStyleInput {
  component_id: string;
  variant?: string;
  theme: string;
  css: string;
}

