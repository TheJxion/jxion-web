-- Jxion Stack — Database Migration
-- Phase 4: Persistence & Production
-- Migration: 006_seed_noir_content
-- Description: Prepare database for Noir Crafted content seeding
-- Date: 2025-01-XX
--
-- This migration ensures the database is ready for content seeding.
-- Actual content seeding is done via:
-- 1. Node.js script: node apps/jxion-api/scripts/seed-noir-content.mjs
-- 2. ContentEditor in noir-admin (automatically extracts from TypeScript source)
-- 3. API PUT requests with proper JSON payload
--
-- Master content source: apps/noir-crafted/src/lib/i18n/content.ts

-- Ensure cleanup has run (idempotent)
-- This removes any invalid content that doesn't match expected structure
DELETE FROM content
WHERE path LIKE 'noir-crafted/%'
  AND (
    -- noir-crafted/homepage.json should have home section or homepage structure
    (path = 'noir-crafted/homepage.json' AND (
      (content->>'home' IS NULL AND content->>'hero' IS NULL AND content->>'featured' IS NULL)
      OR (content::text LIKE '%"faq"%' AND content->>'home' IS NULL)
      OR (content::text LIKE '%"integration"%' AND content->>'home' IS NULL)
    ))
    OR
    -- noir-crafted/content.json should have site, nav, home keys
    (path = 'noir-crafted/content.json' AND (
      content->>'site' IS NULL
      OR content->>'nav' IS NULL
      OR content->>'home' IS NULL
    ))
  );

-- Log cleanup
DO $$
DECLARE
  deleted_count INTEGER;
BEGIN
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  IF deleted_count > 0 THEN
    RAISE NOTICE 'Cleaned up % rows of invalid content from noir-crafted paths', deleted_count;
  END IF;
END $$;

-- Migration complete - database is ready for seeding
-- Next: Run seeding script or use ContentEditor to seed content
