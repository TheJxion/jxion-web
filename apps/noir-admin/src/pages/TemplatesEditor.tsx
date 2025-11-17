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

import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { loadTemplateSchema, type TemplateSchema } from '@jxion/core';
import { getComponent } from '@jxion/core';
import styles from './TemplatesEditor.module.scss';

interface TemplateFile {
  id: string;
  schema: TemplateSchema | null;
  error?: string;
}

export default function TemplatesEditor() {
  const [templates, setTemplates] = useState<TemplateFile[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set()
  );

  // Available templates (from schemas directory)
  const templateIds = ['homepage']; // Add more as they're created

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    console.log('[Jxion-Admin] 📂 Loading templates...');
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
      console.error('[Jxion-Admin] ❌ Error loading templates:', error);
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
      const [componentId] = section.component?.split('.') || [];
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
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerContentTitle}>
            <Layout size={32} />
            Templates Explorer
          </h1>
          <p className={styles.headerContentSubtitle}>
            Explore template schemas, sections, component bindings, and required
            translations. Templates are read-only.
          </p>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading templates...</p>
          </div>
        </div>
      ) : (
        <div className={styles.templateGrid}>
          {/* Left Sidebar: Template List */}
          <div className={styles.templateList}>
            <div className={styles.searchBox}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <h2 className={styles.templateListTitle}>Templates</h2>
            <div className={styles.templateListContent}>
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`${styles.templateButton} ${
                    selectedTemplate === template.id
                      ? styles['templateButton--active']
                      : ''
                  }`}
                >
                  <div className={styles.templateButtonContent}>
                    <FileText size={16} />
                    <span>{template.id}</span>
                  </div>
                  {template.schema && (
                    <div className={styles.templateButtonMeta}>
                      {template.schema.sections?.length || 0} sections
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content: Template Details */}
          <div className={styles.templateViewer}>
            {selectedTemplateData ? (
              selectedTemplateData.schema ? (
                <>
                  {/* Template Metadata */}
                  <div className={styles.card}>
                    <h2 className={styles.viewerTitle}>
                      Template: {selectedTemplateData.id}
                    </h2>
                    <div className={styles.metadataGrid}>
                      <div>
                        <span className={styles.metadataLabel}>Version:</span>{' '}
                        {selectedTemplateData.schema.version || 'N/A'}
                      </div>
                      <div>
                        <span className={styles.metadataLabel}>Sections:</span>{' '}
                        {selectedTemplateData.schema.sections?.length || 0}
                      </div>
                      {selectedTemplateData.schema.metadata && (
                        <>
                          <div>
                            <span className={styles.metadataLabel}>Title:</span>{' '}
                            {selectedTemplateData.schema.metadata.title ||
                              'N/A'}
                          </div>
                          <div>
                            <span className={styles.metadataLabel}>
                              Locale:
                            </span>{' '}
                            {selectedTemplateData.schema.metadata.locale ||
                              'N/A'}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Sections Tree */}
                  <div className={styles.card}>
                    <h2 className={styles.viewerTitle}>
                      <Layers size={20} />
                      Sections
                    </h2>
                    <div className={styles.sectionTree}>
                      {selectedTemplateData.schema.sections?.map(
                        (section, index) => {
                          const [componentId, variant] =
                            section.component?.split('.') || [];
                          const isExpanded = expandedSections.has(index);
                          const componentMetadata = componentId
                            ? getComponent(componentId)
                            : null;

                          return (
                            <div key={index} className={styles.sectionItem}>
                              <button
                                onClick={() => toggleSection(index)}
                                className={styles.sectionHeader}
                              >
                                <div className={styles.sectionTitle}>
                                  {isExpanded ? (
                                    <ChevronDown size={16} />
                                  ) : (
                                    <ChevronRight size={16} />
                                  )}
                                  <span>
                                    Section {index + 1}: {section.component}
                                  </span>
                                </div>
                              </button>
                              {isExpanded && (
                                <div className={styles.sectionContent}>
                                  <div>
                                    <span className={styles.sectionLabel}>
                                      Component:
                                    </span>{' '}
                                    <span className={styles.sectionMono}>
                                      {componentId}
                                    </span>
                                    {variant && (
                                      <>
                                        {' '}
                                        <span className={styles.sectionVariant}>
                                          (variant: {variant})
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  {componentMetadata && (
                                    <div className={styles.sectionMeta}>
                                      <div>
                                        Category: {componentMetadata.category}
                                      </div>
                                      <div>
                                        Frameworks:{' '}
                                        {componentMetadata.frameworks.join(
                                          ', '
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {section.localeKey && (
                                    <div>
                                      <span className={styles.sectionLabel}>
                                        <Languages size={14} />
                                        Translation Key:
                                      </span>{' '}
                                      <span className={styles.sectionMono}>
                                        {section.localeKey}
                                      </span>
                                    </div>
                                  )}
                                  <div>
                                    <span className={styles.sectionLabel}>
                                      Props:
                                    </span>
                                    <pre className={styles.sectionProps}>
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
                  <div className={styles.card}>
                    <h2 className={styles.viewerTitle}>
                      <Languages size={20} />
                      Translation Keys Required
                    </h2>
                    <div className={styles.keysList}>
                      {getTranslationKeys(selectedTemplateData.schema).map(
                        (key, index) => (
                          <div key={index} className={styles.keyItem}>
                            {key}
                          </div>
                        )
                      )}
                      {getTranslationKeys(selectedTemplateData.schema)
                        .length === 0 && (
                        <p className={styles.emptyMessage}>
                          No translation keys required
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Components Used */}
                  <div className={styles.card}>
                    <h2 className={styles.viewerTitle}>
                      <Link2 size={20} />
                      Components Used
                    </h2>
                    <div className={styles.componentsList}>
                      {getComponentIds(selectedTemplateData.schema).map(
                        (componentId, index) => {
                          const metadata = getComponent(componentId);
                          return (
                            <div key={index} className={styles.componentItem}>
                              <div className={styles.componentName}>
                                {componentId}
                              </div>
                              {metadata && (
                                <div className={styles.componentMeta}>
                                  {metadata.category} • Version{' '}
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
                  <div className={styles.card}>
                    <h2 className={styles.viewerTitle}>
                      <Code size={20} />
                      Raw JSON
                    </h2>
                    <pre className={styles.jsonCode}>
                      {JSON.stringify(selectedTemplateData.schema, null, 2)}
                    </pre>
                  </div>
                </>
              ) : (
                <div className={styles.errorCard}>
                  <h2 className={styles.errorTitle}>Template Load Error</h2>
                  <p className={styles.errorMessage}>
                    {selectedTemplateData.error || 'Unknown error'}
                  </p>
                </div>
              )
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyMessage}>
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
