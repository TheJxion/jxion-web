-- Jxion Stack — Database Migration
-- Phase Reference: Phase 4 — Persistence & Production
-- Description: Create styles table for component styles
-- Date: 2025-11-14

CREATE TABLE IF NOT EXISTS styles (
  id SERIAL PRIMARY KEY,
  component_id VARCHAR(255) NOT NULL,
  variant VARCHAR(100),
  theme VARCHAR(50) NOT NULL DEFAULT 'light',
  css TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(component_id, variant, theme)
);

CREATE INDEX IF NOT EXISTS idx_styles_component_id ON styles(component_id);
CREATE INDEX IF NOT EXISTS idx_styles_theme ON styles(theme);

