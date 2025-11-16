-- Jxion Stack — Database Migration
-- Phase Reference: Phase 4 — Persistence & Production
-- Description: Create translation audit log table
-- Date: 2025-11-13

CREATE TABLE IF NOT EXISTS translation_audit (
  id SERIAL PRIMARY KEY,
  translation_id INTEGER REFERENCES translations(id) ON DELETE CASCADE,
  key VARCHAR(255) NOT NULL,
  locale VARCHAR(10) NOT NULL,
  action VARCHAR(20) NOT NULL, -- 'create', 'update', 'delete'
  old_value TEXT,
  new_value TEXT,
  user_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_translation_audit_translation_id ON translation_audit(translation_id);
CREATE INDEX IF NOT EXISTS idx_translation_audit_created_at ON translation_audit(created_at);

