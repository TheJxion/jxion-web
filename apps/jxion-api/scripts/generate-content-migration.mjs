/**
 * Generate migration SQL from TypeScript content source
 * Extracts content from noir-crafted/src/lib/i18n/content.ts
 * and creates a migration SQL file
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to content file
const contentPath = join(
  __dirname,
  '../../noir-crafted/src/lib/i18n/content.ts'
);

console.log('Reading content from:', contentPath);

try {
  // Read the TypeScript file
  const contentFile = readFileSync(contentPath, 'utf-8');

  // Extract the content object using a simple regex
  // This is a basic extraction - for production, use a proper TypeScript parser
  const contentMatch = contentFile.match(
    /export const content = ({[\s\S]*?});/s
  );

  if (!contentMatch) {
    throw new Error('Could not extract content object');
  }

  // For now, we'll create a migration that uses a helper function
  // The actual content will be seeded via API or a separate seeding script
  console.log('Content structure found. Creating migration template...');

  // Create migration SQL
  const migrationSQL = `-- Jxion Stack — Database Migration
-- Phase 4: Persistence & Production
-- Migration: 006_seed_noir_content
-- Description: Seed database with Noir Crafted content from master source
-- Date: 2025-01-XX
--
-- NOTE: This migration cleans invalid content and prepares for seeding.
-- Actual content seeding should be done via API or seeding script
-- that reads from apps/noir-crafted/src/lib/i18n/content.ts

-- First, ensure cleanup migration has run
-- (This is idempotent - safe to run multiple times)

-- Delete any invalid content at noir-crafted paths
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
  RAISE NOTICE 'Cleaned up % rows of invalid content from noir-crafted paths', deleted_count;
END $$;

-- NOTE: Content seeding should be done via:
-- 1. API PUT /api/content/noir-crafted/content.json (with full content)
-- 2. API PUT /api/content/noir-crafted/homepage.json (with home section)
-- 3. Or via seeding script that reads from TypeScript source
--
-- The content structure is defined in:
-- apps/noir-crafted/src/lib/i18n/content.ts
--
-- To seed manually:
-- 1. Extract content from TypeScript file
-- 2. Use ContentEditor in noir-admin to save the content
-- 3. Or use API directly with proper JSON payload
`;

  const migrationPath = join(
    __dirname,
    '../internal/db/migrations/006_seed_noir_content.sql'
  );
  writeFileSync(migrationPath, migrationSQL);

  console.log('✅ Migration file created:', migrationPath);
  console.log('');
  console.log('Next steps:');
  console.log(
    '1. Run the migration: The API will run it automatically on startup'
  );
  console.log('2. Seed content via ContentEditor in noir-admin');
  console.log(
    '   - Load "Homepage Content" - it will extract from TypeScript source'
  );
  console.log('   - Save it to seed the database');
  console.log('3. Or use the API directly to seed content');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
