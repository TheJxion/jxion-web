-- Jxion Stack — Database Migrations
-- Phase 4: Persistence & Production
-- Migration: 004_fix_translations_unique_index
-- Description: Fixes unique constraint for translations to handle NULL namespaces properly

-- Drop the existing unique constraint/index if it exists (from old migration)
DROP INDEX IF EXISTS translations_key_locale_namespace_unique;
ALTER TABLE translations DROP CONSTRAINT IF EXISTS translations_key_locale_namespace_key;

-- Update any existing NULL namespaces to empty strings for consistency
UPDATE translations SET namespace = '' WHERE namespace IS NULL;

-- Create a unique index on (key, locale, namespace)
-- Note: Application code normalizes NULL namespace to empty string
CREATE UNIQUE INDEX IF NOT EXISTS translations_key_locale_namespace_unique 
ON translations(key, locale, namespace);

