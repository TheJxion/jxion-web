/**
 * Noir Crafted - i18n System
 *
 * Centralized content management system.
 * Import content from here to use throughout the application.
 */

export { content } from "./content";
export type { Content } from "./content";

// Helper function to get nested content
export function getContent(path: string, contentObj: any = null): any {
  if (!contentObj) {
    const { content } = require("./content");
    contentObj = content;
  }

  const keys = path.split(".");
  let value = contentObj;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
}
