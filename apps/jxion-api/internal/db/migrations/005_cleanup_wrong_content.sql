-- Jxion Stack — Database Migration
-- Phase 4: Persistence & Production
-- Migration: 005_cleanup_wrong_content
-- Description: Remove invalid content from noir-crafted paths that doesn't match expected structure
-- Date: 2025-01-XX

-- Delete content at noir-crafted paths that doesn't have expected structure
-- For noir-crafted/homepage.json: should have 'home' key or direct homepage structure (hero, featured, etc.)
-- For noir-crafted/content.json: should have 'site', 'nav', 'home' keys
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

-- Log the cleanup
DO $$
DECLARE
  deleted_count INTEGER;
BEGIN
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RAISE NOTICE 'Cleaned up % rows of invalid content from noir-crafted paths', deleted_count;
END $$;

