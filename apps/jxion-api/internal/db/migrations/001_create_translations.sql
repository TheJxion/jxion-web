-- Jxion Stack — Database Migrations
-- Phase 4: Persistence & Production
-- Migration: 001_create_translations
-- Description: Creates translations table with indexes

CREATE TABLE IF NOT EXISTS translations (
    id SERIAL PRIMARY KEY,
    key VARCHAR(500) NOT NULL,
    locale VARCHAR(10) NOT NULL,
    value TEXT NOT NULL,
    namespace VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Unique constraint: key + locale + namespace must be unique
-- NULL namespaces are treated as distinct (PostgreSQL behavior)
-- For our use case, we'll normalize NULL to empty string in application code
CREATE UNIQUE INDEX IF NOT EXISTS translations_key_locale_namespace_unique 
ON translations(key, locale, namespace);

CREATE INDEX IF NOT EXISTS idx_translations_key_locale ON translations(key, locale);
CREATE INDEX IF NOT EXISTS idx_translations_locale ON translations(locale);
CREATE INDEX IF NOT EXISTS idx_translations_namespace ON translations(namespace);

-- Translation audit log
CREATE TABLE IF NOT EXISTS translation_audit (
    id SERIAL PRIMARY KEY,
    translation_id INTEGER REFERENCES translations(id) ON DELETE SET NULL,
    key VARCHAR(500) NOT NULL,
    locale VARCHAR(10) NOT NULL,
    action VARCHAR(20) NOT NULL, -- 'create', 'update', 'delete'
    old_value TEXT,
    new_value TEXT,
    user_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_translation_audit_key_locale ON translation_audit(key, locale);
CREATE INDEX IF NOT EXISTS idx_translation_audit_created_at ON translation_audit(created_at);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_translations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS translations_updated_at ON translations;
CREATE TRIGGER translations_updated_at
    BEFORE UPDATE ON translations
    FOR EACH ROW
    EXECUTE FUNCTION update_translations_updated_at();

