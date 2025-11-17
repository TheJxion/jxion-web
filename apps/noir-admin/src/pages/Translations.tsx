import { useState, useEffect } from 'react';
import {
  Languages,
  Save,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { getTranslations, updateTranslations, type Locale } from '@jxion/i18n';
import { useSSE } from '../hooks/useSSE';
import styles from './Translations.module.scss';

interface TranslationData {
  [key: string]: string | TranslationData;
}

export default function Translations() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('tr-TR');
  const [translations, setTranslations] = useState<TranslationData>({});
  const [editedTranslations, setEditedTranslations] = useState<TranslationData>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    new Set(['hero', 'demo'])
  );

  // Load translations on mount and locale change
  useEffect(() => {
    loadTranslations();
  }, [currentLocale]);

  // Set up SSE for real-time updates
  useSSE({
    onTranslationUpdate: async (key: string, locale: string) => {
      if (locale === currentLocale) {
        console.log(
          `[Jxion-Admin] 🔄 Translation updated via SSE: ${key}, reloading...`
        );
        await loadTranslations();
      }
    },
    enabled: true,
  });

  // Helper function to flatten nested object to get all keys
  const getAllKeys = (obj: any, prefix: string = ''): string[] => {
    const keys: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        keys.push(...getAllKeys(value, fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  };

  // Helper function to load full dictionary
  const loadFullDictionary = async (): Promise<Record<string, any>> => {
    try {
      // getDictionary is exported from @jxion/i18n main package
      const { getDictionary } = await import('@jxion/i18n');
      return (await getDictionary(currentLocale)) as Record<string, any>;
    } catch (error) {
      console.error('❌ [ADMIN] Error loading dictionary:', error);
      return {};
    }
  };

  const loadTranslations = async () => {
    console.log(`🌐 [ADMIN] Loading translations for locale: ${currentLocale}`);
    setLoading(true);
    try {
      // Load full dictionary to get all available keys
      const fullDictionary = await loadFullDictionary();
      const allKeys = getAllKeys(fullDictionary);

      console.log(`📋 [ADMIN] Found ${allKeys.length} translation keys`);

      // Load translations using getTranslations (which handles backend fallback)
      const loadedTranslations = await getTranslations(allKeys, currentLocale);
      console.log('✅ [ADMIN] Translations loaded:', loadedTranslations);

      // Convert flat keys to nested structure for editing
      // Filter out non-string values (arrays, objects) - they can't be edited as simple translations
      const nested: TranslationData = {};
      for (const [key, value] of Object.entries(loadedTranslations)) {
        // Skip if value is not a string (arrays/objects need special handling)
        if (typeof value !== 'string') {
          continue;
        }

        // Skip placeholder values (value === key)
        if (value === key) {
          continue;
        }

        const parts = key.split('.');
        let current = nested;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]] as TranslationData;
        }
        current[parts[parts.length - 1]] = value as string;
      }

      setTranslations(nested);
      setEditedTranslations(JSON.parse(JSON.stringify(nested))); // Deep copy
      setLoading(false);
    } catch (error) {
      console.error('❌ [ADMIN] Error loading translations:', error);
      setLoading(false);
    }
  };

  const handleTranslationChange = (path: string[], value: string) => {
    console.log(`✏️ [ADMIN] Editing translation: ${path.join('.')} = ${value}`);
    const newEdited = JSON.parse(JSON.stringify(editedTranslations));
    let current = newEdited;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]] as TranslationData;
    }
    current[path[path.length - 1]] = value;
    setEditedTranslations(newEdited);
  };

  const handleSave = async () => {
    console.log('💾 [ADMIN] Saving translations via backend API...');
    setSaving(true);
    setSaveStatus('idle');

    try {
      // Convert nested structure back to flat array for backend
      // BUT only include translations that were actually modified
      const flatTranslations: Array<{
        key: string;
        locale: Locale;
        value: string;
      }> = [];

      // Capture root translations for comparison (always compare against root, not nested)
      const rootTranslations = translations;

      const flatten = (
        edited: TranslationData,
        original: TranslationData,
        prefix: string = ''
      ) => {
        for (const [key, editedValue] of Object.entries(edited)) {
          const fullKey = prefix ? `${prefix}.${key}` : key;

          // Skip arrays and non-string objects (they can't be translated as simple strings)
          if (Array.isArray(editedValue)) {
            continue; // Skip arrays - they need special handling
          }

          if (typeof editedValue === 'string') {
            // Get original value (must also be a string)
            // When recursing, 'original' is already the nested object, so we need to get the value from it
            // But we're comparing against the full path, so we need to get from the root
            // Actually, when recursing, 'original' is the nested object at the current level
            // So we should get the value directly from 'original' using just the current key
            // But wait - we need the full path for comparison. Let me think...
            // Actually, 'original' at the recursive level IS the nested object, so we should get from root
            const pathParts = fullKey.split('.');
            const originalValue = getNestedValueByPath(
              rootTranslations, // Always use root translations for comparison
              pathParts
            );

            // Debug logging for troubleshooting
            if (fullKey.includes('hero.title')) {
              console.log(`[ADMIN] 🔍 Comparing ${fullKey}:`, {
                originalValue,
                editedValue,
                originalType: typeof originalValue,
                editedType: typeof editedValue,
              });
            }

            // Only include if:
            // 1. Original value exists and is a string (for comparison)
            // 2. Value was actually changed
            // 3. Value is not a placeholder (value !== key)
            // 4. Value is not empty
            const isModified =
              originalValue !== undefined &&
              typeof originalValue === 'string' &&
              originalValue !== editedValue;
            const isPlaceholder = editedValue === fullKey;
            const isEmpty = editedValue.trim() === '';

            if (fullKey.includes('hero.title')) {
              console.log(`[ADMIN] 🔍 Decision for ${fullKey}:`, {
                isModified,
                isPlaceholder,
                isEmpty,
                willInclude: isModified && !isPlaceholder && !isEmpty,
              });
            }

            if (isModified && !isPlaceholder && !isEmpty) {
              flatTranslations.push({
                key: fullKey,
                locale: currentLocale,
                value: editedValue,
              });
            }
          } else if (typeof editedValue === 'object' && editedValue !== null) {
            // Recursively check nested objects (but skip arrays)
            const originalNested = getNestedObject(
              original,
              fullKey.split('.')
            );
            // Always recurse, even if originalNested is undefined
            // (this handles cases where new keys were added in edited)
            flatten(editedValue, originalNested || {}, fullKey);
          }
        }
      };

      // Debug: Log the structure before flattening
      console.log('[ADMIN] 🔍 Before flattening:', {
        editedKeys: Object.keys(editedTranslations),
        originalKeys: Object.keys(translations),
        editedHomeHero:
          typeof editedTranslations.home === 'object' &&
          editedTranslations.home !== null
            ? (editedTranslations.home as TranslationData).hero
            : undefined,
        originalHomeHero:
          typeof translations.home === 'object' && translations.home !== null
            ? (translations.home as TranslationData).hero
            : undefined,
      });

      flatten(editedTranslations, translations);

      console.log(
        `[ADMIN] Sending ${
          flatTranslations.length
        } modified translations to backend (out of ${
          getAllKeys(editedTranslations).length
        } total)...`
      );

      // Log the actual translations being sent (first 5 for debugging)
      if (flatTranslations.length > 0) {
        console.log('[ADMIN] 📤 Translations being sent:');
        flatTranslations.slice(0, 5).forEach((trans, i) => {
          console.log(`[ADMIN]   ${i + 1}. ${trans.key} = "${trans.value}"`);
        });
        if (flatTranslations.length > 5) {
          console.log(`[ADMIN]   ... and ${flatTranslations.length - 5} more`);
        }
      }

      if (flatTranslations.length === 0) {
        console.warn('[ADMIN] ⚠️ No modified translations to save');
        setSaveStatus('idle');
        setSaving(false);
        return;
      }

      // Phase 1: Persist via backend API
      console.log(
        '[ADMIN] 📡 Calling updateTranslations with:',
        flatTranslations
      );
      const success = await updateTranslations(flatTranslations);

      if (success) {
        console.log(
          `✅ [ADMIN] Translations saved to backend and cache cleared`
        );

        // Update the base translations to match what was saved
        // This ensures the UI reflects the saved changes immediately
        // Note: We don't reload from backend because it doesn't persist yet (Phase 4)
        // The saved changes are now the "original" for comparison purposes
        setTranslations(JSON.parse(JSON.stringify(editedTranslations)));

        setSaveStatus('success');
        console.log('✅ [ADMIN] Translations saved successfully');
        console.log(
          "ℹ️ [ADMIN] Note: Changes are saved but won't persist until Phase 4 (Database Integration)"
        );
        console.log(
          'ℹ️ [ADMIN] The UI now shows your saved changes. Reloading the page will show the original dictionary values.'
        );

        // Don't reload from backend - it will overwrite our saved changes
        // The backend doesn't persist yet, so it will return placeholders and fall back to dictionary
        // Instead, keep the edited state as the new "original" for future comparisons
      } else {
        throw new Error('Backend API returned failure');
      }
    } catch (error) {
      console.error('❌ [ADMIN] Error saving translations:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const renderTranslationEditor = (
    data: TranslationData,
    path: string[] = [],
    level: number = 0
  ): JSX.Element[] => {
    const elements: JSX.Element[] = [];

    for (const [key, value] of Object.entries(data)) {
      const currentPath = [...path, key];
      const pathString = currentPath.join('.');
      const isExpanded = expandedKeys.has(pathString);
      const isObject = typeof value === 'object' && value !== null;

      if (isObject) {
        elements.push(
          <div
            key={pathString}
            className={`${styles.translationGroup} ${
              level > 0 ? styles['translationGroup--nested'] : ''
            }`}
          >
            <button
              onClick={() => {
                const newExpanded = new Set(expandedKeys);
                if (isExpanded) {
                  newExpanded.delete(pathString);
                } else {
                  newExpanded.add(pathString);
                }
                setExpandedKeys(newExpanded);
              }}
              className={styles.groupButton}
            >
              <span className={styles.groupName}>{key}</span>
              <span className={styles.groupCount}>
                ({Object.keys(value).length} keys)
              </span>
            </button>
            {isExpanded && (
              <div className={styles.groupContent}>
                {renderTranslationEditor(value, currentPath, level + 1)}
              </div>
            )}
          </div>
        );
      } else {
        const originalValue = getNestedValue(translations, currentPath);
        const hasChanges = originalValue !== value;

        elements.push(
          <div
            key={pathString}
            className={`${styles.translationItem} ${
              hasChanges ? styles['translationItem--modified'] : ''
            }`}
          >
            <div className={styles.itemHeader}>
              <label className={styles.itemKey}>{pathString}</label>
              {hasChanges && (
                <span className={styles.itemBadge}>
                  <AlertCircle size={12} />
                  Modified
                </span>
              )}
            </div>
            <textarea
              value={String(value)}
              onChange={(e) =>
                handleTranslationChange(currentPath, e.target.value)
              }
              className={styles.translationTextarea}
              rows={3}
            />
            {hasChanges && (
              <button
                onClick={() =>
                  handleTranslationChange(currentPath, String(originalValue))
                }
                className={styles.resetButton}
              >
                Reset to original
              </button>
            )}
          </div>
        );
      }
    }

    return elements;
  };

  const getNestedValue = (
    obj: TranslationData,
    path: string[]
  ): string | undefined => {
    let current: any = obj;
    for (const key of path) {
      if (current && typeof current === 'object') {
        current = current[key];
      } else {
        return undefined;
      }
    }
    return typeof current === 'string' ? current : undefined;
  };

  // Helper to get nested value by path string (for flattening)
  const getNestedValueByPath = (
    obj: TranslationData,
    path: string[]
  ): string | undefined => {
    return getNestedValue(obj, path);
  };

  // Helper to get nested object (for recursive flattening)
  const getNestedObject = (
    obj: TranslationData,
    path: string[]
  ): TranslationData | undefined => {
    let current: any = obj;
    for (const key of path) {
      if (current && typeof current === 'object' && !Array.isArray(current)) {
        current = current[key];
      } else {
        return undefined;
      }
    }
    return typeof current === 'object' && !Array.isArray(current)
      ? current
      : undefined;
  };

  const hasChanges =
    JSON.stringify(translations) !== JSON.stringify(editedTranslations);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerContentTitle}>
            <Languages className={styles.headerContentTitle} size={32} />
            Translation Editor
          </h1>
          <p className={styles.headerContentSubtitle}>
            Edit translations for @noir-crafted. Changes are loaded dynamically
            from @jxion-i18n.
          </p>
        </div>
        <div className={styles.headerActions}>
          <select
            value={currentLocale}
            onChange={(e) => {
              setCurrentLocale(e.target.value as Locale);
              console.log(`🔄 [ADMIN] Locale changed to ${e.target.value}`);
            }}
            className={styles.localeSelect}
          >
            <option value="tr-TR">Turkish (tr-TR)</option>
            <option value="en-US">English (en-US)</option>
          </select>
          <button
            onClick={loadTranslations}
            disabled={loading}
            className={styles.reloadButton}
          >
            <RefreshCw
              size={18}
              className={loading ? styles.loadingSpinner : ''}
            />
            Reload
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className={styles.saveButton}
          >
            {saving ? (
              <>
                <RefreshCw size={18} className={styles.loadingSpinner} />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div
          className={`${styles.statusMessage} ${styles['statusMessage--success']}`}
        >
          <CheckCircle2 size={20} />
          <span
            className={`${styles.statusText} ${styles['statusText--success']}`}
          >
            Translations saved successfully! Changes will be reflected in
            @noir-crafted.
          </span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div
          className={`${styles.statusMessage} ${styles['statusMessage--error']}`}
        >
          <AlertCircle size={20} />
          <span
            className={`${styles.statusText} ${styles['statusText--error']}`}
          >
            Error saving translations. Please try again.
          </span>
        </div>
      )}

      {/* Translation Editor */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingContent}>
            <RefreshCw
              className={`${styles.loadingSpinner} ${styles.loadingSpinner}`}
              size={32}
            />
            <p className={styles.loadingText}>
              Loading translations from @jxion-i18n...
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.editorCard}>
          <div className={styles.editorHeader}>
            <h2 className={styles.editorTitle}>
              Translations ({currentLocale})
            </h2>
            {hasChanges && (
              <span className={styles.editorWarning}>
                <AlertCircle size={16} />
                You have unsaved changes
              </span>
            )}
          </div>
          <div className={styles.editorContent}>
            {renderTranslationEditor(editedTranslations)}
          </div>
        </div>
      )}

      {/* Info Panel */}
      <div className={styles.infoPanel}>
        <h3 className={styles.infoTitle}>
          <ExternalLink size={20} className={styles.infoIcon} />
          How It Works
        </h3>
        <ul className={styles.infoList}>
          <li className={styles.infoItem}>
            <span className={styles.infoBullet}>•</span>
            <span>
              Translations are loaded dynamically from{' '}
              <code className={styles.infoCode}>@jxion-i18n</code> shared
              library
            </span>
          </li>
          <li className={styles.infoItem}>
            <span className={styles.infoBullet}>•</span>
            <span>
              Changes are cached and reflected immediately in{' '}
              <code className={styles.infoCode}>@noir-crafted</code> demo page
            </span>
          </li>
          <li className={styles.infoItem}>
            <span className={styles.infoBullet}>•</span>
            <span>
              In production, this would save to a database via{' '}
              <code className={styles.infoCode}>@jxion-backend</code> API
            </span>
          </li>
          <li className={styles.infoItem}>
            <span className={styles.infoBullet}>•</span>
            <span>
              Check the browser console for detailed logs of the translation
              loading process
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
