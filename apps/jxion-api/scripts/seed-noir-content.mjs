/**
 * Seed Noir Crafted content to database
 * Reads from TypeScript source and seeds via API
 *
 * Usage: npx tsx apps/jxion-api/scripts/seed-noir-content.mjs
 *
 * Note: This script uses npx tsx to import TypeScript files.
 * tsx will be automatically installed if not present.
 */

import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_BASE = process.env.JXION_API_URL || 'http://localhost:8080';
const CONTENT_API = `${API_BASE}/api/content`;

// Load content from TypeScript file using tsx
async function loadContent() {
  const workspaceRoot = resolve(__dirname, '../../..');
  const contentPath = resolve(
    workspaceRoot,
    'apps/noir-crafted/src/lib/i18n/content.ts'
  );

  if (!existsSync(contentPath)) {
    throw new Error(`Content file not found: ${contentPath}`);
  }

  // Create a temporary TypeScript file that exports the content as JSON
  const tempScriptPath = join(__dirname, 'temp-extract-content.ts');
  // Use absolute path for import to avoid path resolution issues
  const contentImportPath = contentPath.replace(/\\/g, '/');

  const tempScript = `import { content } from '${contentImportPath}';
const output = {
  full: content,
  home: content.home
};
console.log(JSON.stringify(output));`;

  try {
    writeFileSync(tempScriptPath, tempScript);

    console.log('📖 Extracting content from TypeScript source...');
    // Use npx tsx to run the TypeScript file (will auto-install if needed)
    const result = execSync(`npx --yes tsx "${tempScriptPath}"`, {
      encoding: 'utf-8',
      cwd: workspaceRoot,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const data = JSON.parse(result.trim());
    return data;
  } catch (error) {
    const errorMsg = error.stderr?.toString() || error.message || String(error);
    throw new Error(
      `Failed to extract content: ${errorMsg}\n` +
        `Make sure the TypeScript file is valid and tsx can import it.\n` +
        `Alternative: Use ContentEditor in noir-admin to seed content.`
    );
  } finally {
    // Clean up temp file
    if (existsSync(tempScriptPath)) {
      unlinkSync(tempScriptPath);
    }
  }
}

async function seedContent() {
  try {
    console.log('🌱 Seeding Noir Crafted content to database...\n');

    // Load content using tsx
    const { full: fullContent, home: homepageContent } = await loadContent();

    if (!fullContent || !homepageContent) {
      throw new Error('Could not load content from TypeScript source');
    }

    console.log('✅ Content loaded from TypeScript source');
    console.log(
      `   - Full content keys: ${Object.keys(fullContent).join(', ')}`
    );
    console.log(
      `   - Homepage content keys: ${Object.keys(homepageContent).join(', ')}\n`
    );

    // Seed full content
    console.log('📦 Seeding noir-crafted/content.json...');
    const fullResponse = await fetch(
      `${CONTENT_API}/noir-crafted/content.json`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullContent),
      }
    );

    if (!fullResponse.ok) {
      const errorText = await fullResponse.text();
      throw new Error(
        `Failed to seed full content: ${fullResponse.status} ${errorText}`
      );
    }
    console.log('   ✅ Full content seeded\n');

    // Seed homepage content
    console.log('🏠 Seeding noir-crafted/homepage.json...');
    const homepageResponse = await fetch(
      `${CONTENT_API}/noir-crafted/homepage.json`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homepageContent),
      }
    );

    if (!homepageResponse.ok) {
      const errorText = await homepageResponse.text();
      throw new Error(
        `Failed to seed homepage content: ${homepageResponse.status} ${errorText}`
      );
    }
    console.log('   ✅ Homepage content seeded\n');

    console.log('🎉 Content seeding completed successfully!');
    console.log('\nYou can now:');
    console.log(
      '  - View content at http://localhost:8080/api/content/noir-crafted/content.json'
    );
    console.log(
      '  - View homepage at http://localhost:8080/api/content/noir-crafted/homepage.json'
    );
    console.log('  - Edit content in noir-admin ContentEditor');
  } catch (error) {
    console.error('❌ Error seeding content:', error.message);
    console.error('\nMake sure:');
    console.error('  1. The API server is running on', API_BASE);
    console.error('  2. The database is accessible');
    console.error('  3. The TypeScript content file exists');
    console.error(
      '\nAlternative: Use ContentEditor in noir-admin to seed content.'
    );
    process.exit(1);
  }
}

seedContent();
