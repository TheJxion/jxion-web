/**
 * Jxion Stack — Styles Editor
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: Component styles editor with Tailwind and custom CSS support
 * Date: 2025-11-14
 *
 * This page allows editing:
 * - Component styles (Tailwind classes and custom CSS)
 * - Per-component, per-variant styling
 * - Real-time preview
 */

import { useState, useEffect } from 'react';
import {
  Palette,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Code,
  Eye,
  Layers,
} from 'lucide-react';
import { getComponent } from '@jxion/core';
import { useSSE } from '../hooks/useSSE';
import scssStyles from './StylesEditor.module.scss';

interface ComponentStyle {
  tailwind: string;
  custom: string;
}

interface StyleData {
  componentId: string;
  variant: string;
  className: string;
  styles: ComponentStyle;
}

// Available components from registry
const AVAILABLE_COMPONENTS = [
  { id: 'hero', name: 'Hero', category: 'Layout' },
  // Add more as they're registered
];

const AVAILABLE_VARIANTS = [
  { id: 'primary', name: 'Primary' },
  { id: 'secondary', name: 'Secondary' },
  { id: 'default', name: 'Default' },
];

export default function StylesEditor() {
  const [selectedComponent, setSelectedComponent] = useState<string>('hero');
  const [selectedVariant, setSelectedVariant] = useState<string>('primary');
  const [selectedClassName, setSelectedClassName] = useState<string>('');
  const [styles, setStyles] = useState<ComponentStyle>({
    tailwind: '',
    custom: '',
  });
  const [originalStyles, setOriginalStyles] = useState<ComponentStyle>({
    tailwind: '',
    custom: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [previewMode, setPreviewMode] = useState<'tailwind' | 'custom'>(
    'tailwind'
  );

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    loadStyles();
  }, [selectedComponent, selectedVariant, selectedClassName]);

  // Set up SSE for real-time updates
  useSSE({
    onStyleUpdate: async (componentId: string, variant: string) => {
      if (componentId === selectedComponent && variant === selectedVariant) {
        console.log(
          `[Jxion-Admin] 🔄 Style updated via SSE: ${componentId} (${variant}), reloading...`
        );
        await loadStyles();
      }
    },
    enabled: true,
  });

  const loadStyles = async () => {
    console.log(
      `[Jxion-Admin] 📂 Loading styles for ${selectedComponent} (variant: ${selectedVariant})`
    );
    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/api/styles/${selectedComponent}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            variant: selectedVariant,
            theme: 'default',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      const loadedStyles: ComponentStyle = {
        tailwind: data.tailwind || '',
        custom: data.css || data.custom || '',
      };

      setStyles(loadedStyles);
      setOriginalStyles(JSON.parse(JSON.stringify(loadedStyles)));
      console.log(
        `[Jxion-Admin] ✅ Styles loaded: ${JSON.stringify(loadedStyles)}`
      );
    } catch (error) {
      console.error('[Jxion-Admin] ❌ Error loading styles:', error);
      // Initialize with empty styles if load fails
      const emptyStyles: ComponentStyle = { tailwind: '', custom: '' };
      setStyles(emptyStyles);
      setOriginalStyles(JSON.parse(JSON.stringify(emptyStyles)));
    } finally {
      setLoading(false);
    }
  };

  const handleStyleChange = (field: 'tailwind' | 'custom', value: string) => {
    setStyles((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(`[Jxion-Admin] ✏️ Style edited: ${field}`);
  };

  const handleSave = async () => {
    console.log(
      `[Jxion-Admin] 💾 Saving styles for ${selectedComponent} (variant: ${selectedVariant})`
    );
    setSaving(true);
    setSaveStatus('idle');

    try {
      const response = await fetch(
        `${apiUrl}/api/styles/${selectedComponent}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            variant: selectedVariant,
            className: selectedClassName,
            styles: {
              tailwind: scssStyles.tailwind,
              custom: scssStyles.custom,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${await response.text()}`
        );
      }

      const result = await response.json();
      console.log(
        `[Jxion-Admin] ✅ Styles saved to database: ${selectedComponent}`,
        result
      );

      // Update original styles to reflect saved state
      setOriginalStyles(JSON.parse(JSON.stringify(styles)));
      setSaveStatus('success');

      // Clear success message after 5 seconds
      setTimeout(() => setSaveStatus('idle'), 5000);
    } catch (error) {
      console.error('[Jxion-Admin] ❌ Error saving styles:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = JSON.stringify(styles) !== JSON.stringify(originalStyles);

  // Get component metadata for preview
  const componentMetadata = getComponent(selectedComponent);

  return (
    <div className={scssStyles.page}>
      {/* Header */}
      <div className={scssStyles.header}>
        <div>
          <h1 className={scssStyles.headerContentTitle}>
            <Palette size={32} />
            Styles Editor
          </h1>
          <p className={scssStyles.headerContentSubtitle}>
            Edit component styles with Tailwind classes and custom CSS. Changes
            are saved to the database and available immediately.
          </p>
        </div>
        <div className={scssStyles.headerActions}>
          <button
            onClick={loadStyles}
            disabled={loading}
            className={scssStyles['reloadButton']}
          >
            <RefreshCw
              className={loading ? scssStyles['loadingSpinner'] : ''}
              size={16}
            />
            Reload
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges || loading}
            className={scssStyles['saveButton']}
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Styles'}
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {saveStatus === 'success' && (
        <div
          className={`${scssStyles['statusMessage']} ${scssStyles['statusMessage--success']}`}
        >
          <CheckCircle2 size={20} />
          <span
            className={`${scssStyles['statusText']} ${scssStyles['statusText--success']}`}
          >
            Styles saved successfully!
          </span>
        </div>
      )}
      {saveStatus === 'error' && (
        <div
          className={`${scssStyles['statusMessage']} ${scssStyles['statusMessage--error']}`}
        >
          <AlertCircle size={20} />
          <span
            className={`${scssStyles['statusText']} ${scssStyles['statusText--error']}`}
          >
            Failed to save scssStyles. Please try again.
          </span>
        </div>
      )}

      {loading ? (
        <div className={scssStyles['loadingContainer']}>
          <div className={scssStyles['loadingContent']}>
            <div className={scssStyles['loadingSpinner']}></div>
            <p className={scssStyles['loadingText']}>Loading scssStyles...</p>
          </div>
        </div>
      ) : (
        <div className={scssStyles['editorGrid']}>
          {/* Left Column: Editor */}
          <div className={scssStyles['inputPanel']}>
            {/* Component Selection */}
            <div className={scssStyles['card']}>
              <h2 className={scssStyles['cardTitle']}>
                <Layers size={20} />
                Component Selection
              </h2>
              <div className={scssStyles['formGroup']}>
                <label className={scssStyles['formLabel']}>Component</label>
                <select
                  value={selectedComponent}
                  onChange={(e) => setSelectedComponent(e.target.value)}
                  className={scssStyles['formSelect']}
                >
                  {AVAILABLE_COMPONENTS.map((comp) => (
                    <option key={comp.id} value={comp.id}>
                      {comp.name} ({comp.category})
                    </option>
                  ))}
                </select>
              </div>
              <div className={scssStyles['formGroup']}>
                <label className={scssStyles.formLabel}>Variant</label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className={scssStyles['formSelect']}
                >
                  {AVAILABLE_VARIANTS.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={scssStyles.formGroup}>
                <label className={scssStyles.formLabel}>
                  Class Name (optional)
                </label>
                <input
                  type="text"
                  value={selectedClassName}
                  onChange={(e) => setSelectedClassName(e.target.value)}
                  placeholder="e.g., hero-container"
                  className={scssStyles.formInput}
                />
              </div>
            </div>

            {/* Tailwind Classes Editor */}
            <div className={scssStyles.card}>
              <h2 className={scssStyles.cardTitle}>
                <Code size={20} />
                Tailwind Classes
              </h2>
              <textarea
                value={scssStyles.tailwind}
                onChange={(e) => handleStyleChange('tailwind', e.target.value)}
                placeholder="e.g., bg-blue-500 text-white p-4 rounded-lg"
                className={scssStyles.editorTextarea}
              />
              <p className={scssStyles.helperText}>
                Enter Tailwind utility classes separated by spaces
              </p>
            </div>

            {/* Custom CSS Editor */}
            <div className={scssStyles.card}>
              <h2 className={scssStyles.cardTitle}>
                <Code size={20} />
                Custom CSS
              </h2>
              <textarea
                value={styles.custom}
                onChange={(e) => handleStyleChange('custom', e.target.value)}
                placeholder=".custom-class { color: red; }"
                className={scssStyles.editorTextarea}
              />
              <p className={scssStyles.helperText}>Enter custom CSS rules</p>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className={scssStyles.outputPanel}>
            <div className={scssStyles.card}>
              <h2 className={scssStyles.cardTitle}>
                <Eye size={20} />
                Preview
              </h2>
              <div className={scssStyles.previewToggle}>
                <button
                  onClick={() => setPreviewMode('tailwind')}
                  className={`${scssStyles.toggleButton} ${
                    previewMode === 'tailwind'
                      ? scssStyles['toggleButton--active']
                      : ''
                  }`}
                >
                  Tailwind
                </button>
                <button
                  onClick={() => setPreviewMode('custom')}
                  className={`${scssStyles.toggleButton} ${
                    previewMode === 'custom'
                      ? scssStyles['toggleButton--active']
                      : ''
                  }`}
                >
                  Custom CSS
                </button>
              </div>
              <div className={scssStyles.previewArea}>
                {previewMode === 'tailwind' ? (
                  <div
                    className={scssStyles.tailwind || scssStyles.previewContent}
                  >
                    <h3 className={scssStyles.previewTitle}>
                      {componentMetadata?.name || 'Component'} Preview
                    </h3>
                    <p className={scssStyles.previewText}>
                      This is a preview of how the Tailwind classes will look.
                      {!styles.tailwind && (
                        <span className={scssStyles.previewHint}>
                          {' '}
                          Add Tailwind classes to see the preview.
                        </span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div>
                    <style>{styles.custom}</style>
                    <div className={scssStyles.previewContent}>
                      <h3 className={scssStyles.previewTitle}>
                        {componentMetadata?.name || 'Component'} Preview
                      </h3>
                      <p className={scssStyles.previewText}>
                        This is a preview of how the custom CSS will look.
                        {!styles.custom && (
                          <span className={scssStyles.previewHint}>
                            {' '}
                            Add custom CSS to see the preview.
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Component Info */}
            {componentMetadata && (
              <div className={scssStyles.infoPanel}>
                <h3 className={scssStyles.infoTitle}>Component Information</h3>
                <div className={scssStyles.infoList}>
                  <div className={scssStyles.infoItem}>
                    <strong>Name:</strong> {componentMetadata.name}
                  </div>
                  <div className={scssStyles.infoItem}>
                    <strong>Version:</strong> {componentMetadata.version}
                  </div>
                  <div className={scssStyles.infoItem}>
                    <strong>Category:</strong> {componentMetadata.category}
                  </div>
                  <div className={scssStyles.infoItem}>
                    <strong>Frameworks:</strong>{' '}
                    {componentMetadata.frameworks.join(', ')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
