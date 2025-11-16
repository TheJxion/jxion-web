/**
 * Jxion Stack — Template Loader
 * Phase Reference: Phase 3 — Template Composition & Page Assembly
 * Description: Load template schemas from JSON files
 * Date: 2025-11-13
 */

import type { TemplateSchema } from "./template-composer";

/**
 * Load template schema from JSON file
 * Phase 3: Dynamic template loading
 */
export async function loadTemplateSchema(
  templateId: string
): Promise<TemplateSchema | null> {
  try {
    console.log(`[TemplateLoader] Loading template schema: ${templateId}`);
    const schema = await import(`./schemas/${templateId}.json`);
    const data = schema.default || schema;

    console.log(
      `[TemplateLoader] ✅ Template loaded: ${templateId} (${
        data.sections?.length || 0
      } sections)`
    );
    return data as TemplateSchema;
  } catch (error) {
    console.error(
      `[TemplateLoader] ❌ Failed to load template: ${templateId}`,
      error
    );
    return null;
  }
}
