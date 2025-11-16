/**
 * Jxion Stack — Database Types
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: TypeScript types for translation database schema
 * Date: 2025-11-13
 *
 * These types match the Go structs in apps/jxion-api/internal/models/
 */

export interface TranslationRow {
  id: number;
  key: string;
  locale: string;
  value: string;
  namespace?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface TranslationAuditRow {
  id: number;
  translation_id: number | null;
  key: string;
  locale: string;
  action: 'create' | 'update' | 'delete';
  old_value: string | null;
  new_value: string | null;
  user_id: string | null;
  created_at: Date;
}

export interface CreateTranslationInput {
  key: string;
  locale: string;
  value: string;
  namespace?: string;
}

export interface UpdateTranslationInput {
  key: string;
  locale: string;
  value: string;
}

