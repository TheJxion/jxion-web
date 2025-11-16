-- Jxion Stack — Database Migration
-- Phase Reference: Phase 4 — Persistence & Production
-- Description: Create translations table
-- Date: 2025-11-13

CREATE TABLE IF NOT EXISTS translations (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) NOT NULL,
  locale VARCHAR(10) NOT NULL,
  value TEXT NOT NULL,
  namespace VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(key, locale)
);

CREATE INDEX IF NOT EXISTS idx_translations_key_locale ON translations(key, locale);
CREATE INDEX IF NOT EXISTS idx_translations_locale ON translations(locale);

