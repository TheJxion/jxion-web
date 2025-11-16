/**
 * Jxion Stack — Templates Editor
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: Read-only template explorer showing template structure, sections, and bindings
 * Date: 2025-11-14
 *
 * This page shows:
 * - Template JSON structure
 * - Section tree
 * - Component bindings
 * - Translation keys required
 * - Styles required
 */

import { useState, useEffect } from "react";
import {
  Layout,
  Search,
  Code,
  Layers,
  Link2,
  Languages,
  Palette,
  FileText,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { loadTemplateSchema, type TemplateSchema } from "@jxion/core";
import { getComponent } from "@jxion/core";

interface TemplateFile {
  id: string;
  schema: TemplateSchema | null;
  error?: string;
}

export default function TemplatesEditor() {
  const [templates, setTemplates] = useState<TemplateFile[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set()
  );

  // Available templates (from schemas directory)
  const templateIds = ["homepage"]; // Add more as they're created

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    console.log("[Jxion-Admin] 📂 Loading templates...");
    setLoading(true);
    try {
      const loadedTemplates: TemplateFile[] = [];

      for (const templateId of templateIds) {
        try {
          const schema = await loadTemplateSchema(templateId);
          loadedTemplates.push({
            id: templateId,
            schema,
          });
          console.log(`[Jxion-Admin] ✅ Loaded template: ${templateId}`);
        } catch (error) {
          console.error(
            `[Jxion-Admin] ❌ Failed to load template ${templateId}:`,
            error
          );
          loadedTemplates.push({
            id: templateId,
            schema: null,
            error: String(error),
          });
        }
      }

      setTemplates(loadedTemplates);
      if (loadedTemplates.length > 0 && !selectedTemplate) {
        setSelectedTemplate(loadedTemplates[0].id);
      }
    } catch (error) {
      console.error("[Jxion-Admin] ❌ Error loading templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  // Extract translation keys from template
  const getTranslationKeys = (schema: TemplateSchema | null): string[] => {
    if (!schema) return [];
    const keys: string[] = [];
    schema.sections?.forEach((section) => {
      if (section.localeKey) {
        Object.keys(section.props || {}).forEach((propKey) => {
          keys.push(`${section.localeKey}.${propKey}`);
        });
      }
    });
    return keys;
  };

  // Extract component IDs from template
  const getComponentIds = (schema: TemplateSchema | null): string[] => {
    if (!schema) return [];
    const componentIds = new Set<string>();
    schema.sections?.forEach((section) => {
      const [componentId] = section.component?.split(".") || [];
      if (componentId) {
        componentIds.add(componentId);
      }
    });
    return Array.from(componentIds);
  };

  const filteredTemplates = templates.filter((template) =>
    template.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-noir-black mb-2 flex items-center gap-3">
            <Layout className="text-noir-gold" size={32} />
            Templates Explorer
          </h1>
          <p className="text-noir-gray-600 font-sans">
            Explore template schemas, sections, component bindings, and required
            translations. Templates are read-only.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-noir-gray-200 rounded w-1/2 mx-auto"></div>
            <p className="text-noir-gray-600 font-mono text-sm">
              Loading templates...
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar: Template List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-noir-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Search size={20} className="text-noir-gray-600" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold text-sm"
                />
              </div>
              <div className="space-y-2">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedTemplate === template.id
                        ? "bg-noir-gold text-noir-black font-semibold"
                        : "bg-noir-gray-50 text-noir-black hover:bg-noir-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      <span className="font-sans font-medium">
                        {template.id}
                      </span>
                    </div>
                    {template.schema && (
                      <div className="text-xs text-noir-gray-600 mt-1 ml-6">
                        {template.schema.sections?.length || 0} sections
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content: Template Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedTemplateData ? (
              selectedTemplateData.schema ? (
                <>
                  {/* Template Metadata */}
                  <div className="bg-white border border-noir-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-serif font-bold text-noir-black mb-4">
                      Template: {selectedTemplateData.id}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-noir-gray-700">
                          Version:
                        </span>{" "}
                        {selectedTemplateData.schema.version || "N/A"}
                      </div>
                      <div>
                        <span className="font-semibold text-noir-gray-700">
                          Sections:
                        </span>{" "}
                        {selectedTemplateData.schema.sections?.length || 0}
                      </div>
                      {selectedTemplateData.schema.metadata && (
                        <>
                          <div>
                            <span className="font-semibold text-noir-gray-700">
                              Title:
                            </span>{" "}
                            {selectedTemplateData.schema.metadata.title ||
                              "N/A"}
                          </div>
                          <div>
                            <span className="font-semibold text-noir-gray-700">
                              Locale:
                            </span>{" "}
                            {selectedTemplateData.schema.metadata.locale ||
                              "N/A"}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Sections Tree */}
                  <div className="bg-white border border-noir-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-serif font-bold text-noir-black mb-4 flex items-center gap-2">
                      <Layers size={20} />
                      Sections
                    </h2>
                    <div className="space-y-2">
                      {selectedTemplateData.schema.sections?.map(
                        (section, index) => {
                          const [componentId, variant] =
                            section.component?.split(".") || [];
                          const isExpanded = expandedSections.has(index);
                          const componentMetadata = componentId
                            ? getComponent(componentId)
                            : null;

                          return (
                            <div
                              key={index}
                              className="border border-noir-gray-200 rounded-lg"
                            >
                              <button
                                onClick={() => toggleSection(index)}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-noir-gray-50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {isExpanded ? (
                                    <ChevronDown size={16} />
                                  ) : (
                                    <ChevronRight size={16} />
                                  )}
                                  <span className="font-sans font-medium">
                                    Section {index + 1}: {section.component}
                                  </span>
                                </div>
                              </button>
                              {isExpanded && (
                                <div className="px-4 pb-4 space-y-3 border-t border-noir-gray-200">
                                  <div>
                                    <span className="text-sm font-semibold text-noir-gray-700">
                                      Component:
                                    </span>{" "}
                                    <span className="text-sm font-mono">
                                      {componentId}
                                    </span>
                                    {variant && (
                                      <>
                                        {" "}
                                        <span className="text-noir-gray-500">
                                          (variant: {variant})
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  {componentMetadata && (
                                    <div className="text-xs text-noir-gray-600">
                                      <div>
                                        Category: {componentMetadata.category}
                                      </div>
                                      <div>
                                        Frameworks:{" "}
                                        {componentMetadata.frameworks.join(
                                          ", "
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {section.localeKey && (
                                    <div>
                                      <span className="text-sm font-semibold text-noir-gray-700 flex items-center gap-2">
                                        <Languages size={14} />
                                        Translation Key:
                                      </span>{" "}
                                      <span className="text-sm font-mono">
                                        {section.localeKey}
                                      </span>
                                    </div>
                                  )}
                                  <div>
                                    <span className="text-sm font-semibold text-noir-gray-700">
                                      Props:
                                    </span>
                                    <pre className="mt-2 p-3 bg-noir-gray-50 rounded text-xs font-mono overflow-x-auto">
                                      {JSON.stringify(section.props, null, 2)}
                                    </pre>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Translation Keys Required */}
                  <div className="bg-white border border-noir-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-serif font-bold text-noir-black mb-4 flex items-center gap-2">
                      <Languages size={20} />
                      Translation Keys Required
                    </h2>
                    <div className="space-y-2">
                      {getTranslationKeys(selectedTemplateData.schema).map(
                        (key, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 bg-noir-gray-50 rounded font-mono text-sm"
                          >
                            {key}
                          </div>
                        )
                      )}
                      {getTranslationKeys(selectedTemplateData.schema)
                        .length === 0 && (
                        <p className="text-noir-gray-600 text-sm">
                          No translation keys required
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Components Used */}
                  <div className="bg-white border border-noir-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-serif font-bold text-noir-black mb-4 flex items-center gap-2">
                      <Link2 size={20} />
                      Components Used
                    </h2>
                    <div className="space-y-2">
                      {getComponentIds(selectedTemplateData.schema).map(
                        (componentId, index) => {
                          const metadata = getComponent(componentId);
                          return (
                            <div
                              key={index}
                              className="px-3 py-2 bg-noir-gray-50 rounded"
                            >
                              <div className="font-mono text-sm font-semibold">
                                {componentId}
                              </div>
                              {metadata && (
                                <div className="text-xs text-noir-gray-600 mt-1">
                                  {metadata.category} • Version{" "}
                                  {metadata.version}
                                </div>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Raw JSON */}
                  <div className="bg-white border border-noir-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-serif font-bold text-noir-black mb-4 flex items-center gap-2">
                      <Code size={20} />
                      Raw JSON
                    </h2>
                    <pre className="p-4 bg-noir-gray-50 rounded-lg overflow-x-auto text-xs font-mono">
                      {JSON.stringify(selectedTemplateData.schema, null, 2)}
                    </pre>
                  </div>
                </>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h2 className="text-xl font-serif font-bold text-red-800 mb-2">
                    Template Load Error
                  </h2>
                  <p className="text-red-600 font-sans">
                    {selectedTemplateData.error || "Unknown error"}
                  </p>
                </div>
              )
            ) : (
              <div className="bg-noir-gray-50 border border-noir-gray-200 rounded-lg p-12 text-center">
                <p className="text-noir-gray-600 font-sans">
                  Select a template to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
