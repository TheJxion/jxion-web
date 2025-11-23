/**
 * @title Jxion Stack — Content Editor
 * @description This page allows editing content JSON files (from noir-crafted/src/lib/i18n/content.ts)
 * @note Changes are pushed live to @noir-crafted svelte app
 * @date 2025-11-22
 * @author Jan Berkuçar
 */
/** Core Imports */
import { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Code,
  Palette,
  Layout,
} from 'lucide-react';
/** SSE Hook Import */
import { useSSE } from '../hooks/useSSE';
/** Styles Imports */
import styles from './ContentEditor.module.scss';
/** Props Interface */
export interface ContentFile {
  path: string;
  label: string;
  mode: EditorMode;
  content: any;
  lastModified: number;
}
// Non exported private type for the editor mode
type EditorMode = 'content' | 'style' | 'template';
/** Environment Variables */
const env =
  typeof import.meta !== 'undefined' ? (import.meta as any).env || {} : {};
const DEFAULT_API_HOST = env.JXION_API_URL || 'http://localhost:8080';
const CONTENT_API_BASE =
  env.JXION_CONTENT_API_URL || `${DEFAULT_API_HOST}/api/content`;
const contentSources: Array<{
  path: string;
  label: string;
  mode: EditorMode;
}> = [
  {
    path: 'noir-crafted/homepage.json',
    label: 'Homepage Content',
    mode: 'content',
  },
  {
    path: 'noir-crafted/content.json',
    label: 'Noir Crafted • Full Content',
    mode: 'content',
  },
  {
    path: 'homepage',
    label: 'Homepage Template Schema',
    mode: 'template',
  },
];

// TODO(noir-admin): Move method to utility file.
const cloneContent = (value: any) => JSON.parse(JSON.stringify(value));

// TODO(noir-admin): Move method to utility file.
const extractApiContent = (payload: any) => {
  if (
    payload &&
    typeof payload === 'object' &&
    payload.content &&
    Object.keys(payload.content).length > 0
  ) {
    return payload.content;
  }
  return payload;
};

/** Test Id */
export const CONTENT_EDITOR_TEST = {
  PAGE: 'content-editor',
  HEADER: 'content-editor-header',
  MODE_SELECTOR: 'content-editor-mode-selector',
  STATUS_MESSAGE: 'content-editor-status-message',
  EDITOR_GRID: 'content-editor-editor-grid',
};
export default function ContentEditor() {
  const [currentMode, setCurrentMode] = useState<EditorMode>('content');
  const [contentFiles, setContentFiles] = useState<ContentFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<any>(null);
  const [editorText, setEditorText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [liveUpdatesEnabled, setLiveUpdatesEnabled] = useState(true);

  // NOTE(@Janberk): Main fetch of content from the API.
  const fetchContentFromApi = async (path: string) => {
    const url = `${CONTENT_API_BASE}/${path}`;
    const response = await fetch(url);
    if (!response) {
      throw new Error('API returned null');
    }

    // Check if response is OK
    if (!response.ok) {
      // Try to get error message, but handle HTML responses
      let errorMessage = '';
      try {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || '';
        } else {
          // If it's HTML or other non-JSON, just use status text
          errorMessage = response.statusText;
        }
      } catch {
        errorMessage = response.statusText;
      }
      throw new Error(
        `API returned ${response.status}${
          errorMessage ? `: ${errorMessage}` : ''
        }`
      );
    }

    // Check Content-Type before parsing JSON
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      // If we get HTML or other non-JSON, it's likely an error page
      const text = await response.text().catch(() => '');
      throw new Error(
        `API returned non-JSON response (${contentType}). This usually means the endpoint doesn't exist or returned an error page.`
      );
    }

    // Parse JSON response
    let payload;
    try {
      payload = await response.json();
    } catch (parseError) {
      // If JSON parsing fails, the response might be HTML or malformed
      const text = await response.text().catch(() => '');
      throw new Error(
        `Failed to parse JSON response. Response may be HTML or malformed. First 100 chars: ${text.substring(
          0,
          100
        )}`
      );
    }

    return extractApiContent(payload);
  };

  // NOTE(@Janberk): Load function.
  // TODO(@noir-admin): Refactor this to use the project name (noir-crafted) for the content.
  const loadNoirContent = async () => {
    try {
      return await fetchContentFromApi('noir-crafted/content.json');
    } catch (apiError) {
      console.warn(
        '[Jxion-ContentEditor] ⚠️ Content API unavailable, using noir-crafted fallback',
        apiError
      );
      try {
        const contentModule = await import(
          '../../../noir-crafted/src/lib/i18n/content'
        );
        return contentModule.content || {};
      } catch (fallbackError) {
        console.error(
          '[Jxion-ContentEditor] ❌ Failed to load fallback noir content:',
          fallbackError
        );
        throw fallbackError;
      }
    }
  };

  // NOTE(@Janberk): Load homepage content specifically (just the home section)
  const loadHomepageContent = async () => {
    try {
      // Try to fetch homepage content from API
      const apiContent = await fetchContentFromApi(
        'noir-crafted/homepage.json'
      );

      // Check if content is actually empty (API might return 200 with empty content)
      // API returns: {content: {}, note: "Content not found in database.", path: "..."}
      // extractApiContent returns the full payload when content is empty
      const isEmpty =
        !apiContent ||
        Object.keys(apiContent).length === 0 ||
        (apiContent.note &&
          typeof apiContent.note === 'string' &&
          apiContent.note.includes('not found')) ||
        (apiContent.content && Object.keys(apiContent.content).length === 0) ||
        // Check if it's the actual homepage content structure (should have hero, featured, etc.)
        (!apiContent.hero && !apiContent.featured && !apiContent.whyNoir);

      if (isEmpty) {
        console.warn(
          '[Jxion-ContentEditor] ⚠️ Homepage content empty in database, extracting from TypeScript source file'
        );
        // Fallback: Directly import from TypeScript source file (bypass API)
        try {
          const contentModule = await import(
            '../../../noir-crafted/src/lib/i18n/content'
          );
          const fullContent = contentModule.content || {};
          const homeContent = fullContent?.home;

          if (homeContent && Object.keys(homeContent).length > 0) {
            console.log(
              '[Jxion-ContentEditor] ✅ Extracted homepage content from TypeScript source file'
            );
            return homeContent;
          }
        } catch (importError) {
          console.error(
            '[Jxion-ContentEditor] ❌ Failed to import content from TypeScript file:',
            importError
          );
        }

        // If still empty, return a structured empty object
        console.warn(
          '[Jxion-ContentEditor] ⚠️ Homepage content not found in full content either'
        );
        return {
          hero: {},
          featured: {},
          whyNoir: {},
          motifs: {},
          newsletter: {},
          whatsourimpact: {},
          keyFeatures: {},
        };
      }

      return apiContent;
    } catch (apiError) {
      console.warn(
        '[Jxion-ContentEditor] ⚠️ Homepage content API error, extracting from full content',
        apiError
      );
      try {
        // Fallback: Directly import from TypeScript source file (bypass API)
        const contentModule = await import(
          '../../../noir-crafted/src/lib/i18n/content'
        );
        const fullContent = contentModule.content || {};
        const homeContent = fullContent?.home;

        if (homeContent && Object.keys(homeContent).length > 0) {
          console.log(
            '[Jxion-ContentEditor] ✅ Extracted homepage content from TypeScript source file (fallback)'
          );
          return homeContent;
        }

        console.warn(
          '[Jxion-ContentEditor] ⚠️ Homepage content not found in full content'
        );
        return {
          hero: {},
          featured: {},
          whyNoir: {},
          motifs: {},
          newsletter: {},
          whatsourimpact: {},
          keyFeatures: {},
        };
      } catch (fallbackError) {
        console.error(
          '[Jxion-ContentEditor] ❌ Failed to load homepage content:',
          fallbackError
        );
        throw fallbackError;
      }
    }
  };

  const loadHomepageTemplate = async () => {
    // Templates are static schema files, not stored in database
    // Load directly from template loader
      try {
        const coreModule = await import('@jxion/core');
        if (coreModule.loadTemplateSchema) {
          const template = await coreModule.loadTemplateSchema('homepage');
        if (template) {
          console.log(
            '[Jxion-ContentEditor] ✅ Loaded homepage template schema from template loader'
          );
          return template;
        }
        }
        throw new Error('loadTemplateSchema not available');
      } catch (error) {
      console.error(
        '[Jxion-ContentEditor] ❌ Failed to load template schema:',
        error
      );
        return {
          note: 'Template schema not found. The template loader may not be available in this environment.',
          error: String(error),
        };
    }
  };

  useEffect(() => {
    // NOTE(@Janberk): Load content files on mount.
    loadContentFiles(false);
  }, []);

  useSSE({
    apiUrl: DEFAULT_API_HOST,
    enabled: liveUpdatesEnabled,
    onContentUpdate: async (path: string) => {
      if (selectedFile === path) {
        await loadContentFiles(true);
      }
    },
  });

  // NOTE(@Janberk): Apply selection to the editor.
  const applySelection = (file: ContentFile) => {
    setSelectedFile(file.path);
    setEditedContent(cloneContent(file.content));
    try {
      setEditorText(JSON.stringify(file.content, null, 2));
    } catch {
      setEditorText('');
    }
    setJsonError(null);
  };

  const loadContentFiles = async (preserveSelection = true) => {
    // NOTE(@Janberk): Load content files.
    setLoading(true);
    try {
      const existingSelection = selectedFile
        ? contentFiles.find((file) => file.path === selectedFile)
        : null;
      const isDirty =
        !!existingSelection &&
        editorText !== JSON.stringify(existingSelection.content, null, 2);
      const files: ContentFile[] = [];
      for (const source of contentSources) {
        try {
          let content: any;
          if (source.path === 'noir-crafted/homepage.json') {
            content = await loadHomepageContent();
          } else if (source.path === 'noir-crafted/content.json') {
            content = await loadNoirContent();
          } else if (source.path === 'homepage') {
            content = await loadHomepageTemplate();
          } else {
            content = await fetchContentFromApi(source.path);
          }
          files.push({
            ...source,
            content,
            lastModified: Date.now(),
          });
        } catch (error) {
          files.push({
            ...source,
            content: { error: `Failed to load: ${error}` },
            lastModified: Date.now(),
          });
        }
      }
      setContentFiles(files);
      if (!files || files.length === 0) {
        return;
      }
      const hasSelection =
        selectedFile && files.some((file) => file.path === selectedFile);
      if (hasSelection && isDirty === false) {
        const updatedSelection = files.find(
          (file) => file.path === selectedFile
        );
        if (updatedSelection) {
          applySelection(updatedSelection);
        }
      }
      if (!preserveSelection || !hasSelection) {
        const nextFile =
          files.find((file) => file.mode === currentMode) || files[0];
        if (nextFile) {
          applySelection(nextFile);
          setCurrentMode(nextFile.mode);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(
        '[Jxion-ContentEditor] ❌ Error loading content files:',
        error
      );
      setLoading(false);
    }
  };
  const handleModeChange = (mode: EditorMode) => {
    setCurrentMode(mode);
    const nextFile = contentFiles.find((file) => file.mode === mode) || null;
    if (!nextFile) {
      return;
    }
    applySelection(nextFile);
  };

  const handleFileSelect = (path: string) => {
    console.log(`[Jxion-ContentEditor] 📄 Selecting file: ${path}`);
    const file = contentFiles.find((f) => f.path === path);
    if (!file) {
      return;
    }
    applySelection(file);
    setCurrentMode(file.mode);
  };

  const handleContentChange = (value: string) => {
    setEditorText(value);
    try {
      const parsed = JSON.parse(value);
      setEditedContent(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError('Invalid JSON. Please fix it before saving.');
    }
  };

  const handleSave = async () => {
    if (!selectedFile || !editedContent || jsonError) return;

    // Templates are static schema files and cannot be saved via API
    const selectedFileData = contentFiles.find((f) => f.path === selectedFile);
    if (selectedFileData?.mode === 'template') {
      setSaveStatus('error');
      console.warn(
        '[Jxion-ContentEditor] ⚠️ Templates are static schema files and cannot be modified via API. Changes are stored locally only.'
      );
      return;
    }

    setSaving(true);
    setSaveStatus('idle');
    try {
      // Save to the selected path
      const response = await fetch(`${CONTENT_API_BASE}/${selectedFile}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedContent),
      });
      if (!response.ok) {
        // Handle error responses - check if it's JSON or HTML
        let errorMessage = '';
        try {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || '';
          } else {
            // If it's HTML or other non-JSON, read as text
            errorMessage = await response.text();
          }
        } catch {
          errorMessage = response.statusText;
        }
        throw new Error(
          `API returned ${response.status}${
            errorMessage ? `: ${errorMessage}` : ''
          }`
        );
      }

      // Check Content-Type before parsing JSON
      const contentType = response.headers.get('content-type') || '';
      let result;
      if (contentType.includes('application/json')) {
        try {
          result = await response.json();
        } catch (parseError) {
          throw new Error('Failed to parse JSON response from server');
        }
      } else {
        // If response is not JSON, it might be empty or HTML
        const text = await response.text();
        // If empty, assume success; otherwise throw error
        if (text.trim()) {
          throw new Error(
            `Server returned non-JSON response: ${text.substring(0, 100)}`
          );
        }
        result = { success: true };
      }

      // If saving noir-crafted/homepage.json, also update noir-crafted/content.json
      if (selectedFile === 'noir-crafted/homepage.json') {
        console.log(
          '[Jxion-ContentEditor] 🔄 Updating full content.json with homepage changes...'
        );
        try {
          // Fetch current full content
          const fullContentResponse = await fetch(
            `${CONTENT_API_BASE}/noir-crafted/content.json`
          );
          if (fullContentResponse.ok) {
            const contentType = fullContentResponse.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
              const fullContentData = await fullContentResponse.json();
              // Extract actual content (might be wrapped in 'content' key)
              const fullContent =
                fullContentData.content || fullContentData || {};
              
              // Merge homepage content into full content
              const updatedFullContent = {
                ...fullContent,
                home: editedContent,
              };

              // Save updated full content
              const updateResponse = await fetch(
                `${CONTENT_API_BASE}/noir-crafted/content.json`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(updatedFullContent),
                }
              );

              if (updateResponse.ok) {
                console.log(
                  '[Jxion-ContentEditor] ✅ Updated full content.json with homepage changes'
                );
              } else {
                console.warn(
                  '[Jxion-ContentEditor] ⚠️ Failed to update full content.json, but homepage.json was saved'
                );
              }
            }
          } else {
            // If full content doesn't exist, create it with the homepage content
            console.log(
              '[Jxion-ContentEditor] 📝 Creating full content.json with homepage content...'
            );
            const newFullContent = {
              site: { name: 'NOIR' },
              nav: {},
              home: editedContent,
            };

            const createResponse = await fetch(
              `${CONTENT_API_BASE}/noir-crafted/content.json`,
              {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFullContent),
              }
            );

            if (createResponse.ok) {
              console.log(
                '[Jxion-ContentEditor] ✅ Created full content.json with homepage content'
              );
            }
          }
        } catch (mergeError) {
          console.warn(
            '[Jxion-ContentEditor] ⚠️ Failed to merge homepage into full content:',
            mergeError
          );
          // Don't fail the save if merge fails - homepage was already saved
        }
      }

      setContentFiles((prev) =>
        prev.map((file) =>
          file.path === selectedFile
            ? {
                ...file,
                content: editedContent,
                lastModified: Date.now(),
              }
            : file
        )
      );
      setSaveStatus('success');
      console.log(
        `[Jxion-ContentEditor] ✅ Content saved to database: ${selectedFile}`
      );
      setTimeout(() => setSaveStatus('idle'), 5000);
    } catch (error) {
      console.error('[Jxion-ContentEditor] ❌ Error saving content:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };
  const visibleFiles = contentFiles.filter((file) => file.mode === currentMode);
  const selectedFileData = contentFiles.find((f) => f.path === selectedFile);
  const originalEditorText = selectedFileData
    ? JSON.stringify(selectedFileData.content, null, 2)
    : '';
  const hasChanges = !!selectedFileData && editorText !== originalEditorText;
  const canSave =
    !!selectedFileData && !!editedContent && !jsonError && hasChanges;
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerContentTitle}>
            <FileText size={32} />
            Content Editor
          </h1>
          <p className={styles.headerContentSubtitle}>
            Edit content files for @noir-crafted. Changes are saved to the
            database and will be available immediately.
          </p>
        </div>
        <div className={styles.headerActions}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={liveUpdatesEnabled}
              onChange={(e) => {
                setLiveUpdatesEnabled(e.target.checked);
                console.log(
                  `[Jxion-ContentEditor] ${
                    e.target.checked ? '▶️' : '⏸️'
                  } Live updates ${e.target.checked ? 'enabled' : 'disabled'}`
                );
              }}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>Live Updates</span>
          </label>
          <button
            onClick={() => loadContentFiles(true)}
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
            disabled={saving || !canSave}
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

      {/* Mode Selector */}
      <div className={styles.modeSelector}>
        <button
          onClick={() => handleModeChange('content')}
          className={`${styles.modeButton} ${
            currentMode === 'content' ? styles['modeButton--active'] : ''
          }`}
        >
          <Code size={18} className={styles.modeIcon} />
          Content
        </button>
        <button
          onClick={() => handleModeChange('style')}
          className={`${styles.modeButton} ${
            currentMode === 'style' ? styles['modeButton--active'] : ''
          }`}
        >
          <Palette size={18} className={styles.modeIcon} />
          Styles
        </button>
        <button
          onClick={() => handleModeChange('template')}
          className={`${styles.modeButton} ${
            currentMode === 'template' ? styles['modeButton--active'] : ''
          }`}
        >
          <Layout size={18} className={styles.modeIcon} />
          Templates
        </button>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div
          className={`${styles.statusMessage} ${styles['statusMessage--success']}`}
        >
          <div className={styles.statusContent}>
            <CheckCircle2 size={20} />
            <span className={styles.statusTitle}>
              {selectedFileData?.mode === 'template'
                ? 'Template loaded'
                : 'Content saved to database'}
            </span>
          </div>
          {selectedFileData?.mode === 'template' ? (
            <p className={styles.statusText}>
              Note: Templates are static schema files and cannot be modified via
              API. Changes are stored locally in the editor only. To persist
              changes, you'll need to manually update the source files in the
              codebase.
            </p>
          ) : (
          <p className={styles.statusText}>
              Content has been successfully saved to the database and will be
              available via the API.
          </p>
          )}
        </div>
      )}

      {saveStatus === 'error' && (
        <div
          className={`${styles.statusMessage} ${styles['statusMessage--error']}`}
        >
          <AlertCircle size={20} />
          <span className={styles.statusErrorText}>
            Error updating content. Please try again.
          </span>
        </div>
      )}

      {/* File Selector & Editor */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingContent}>
            <RefreshCw
              className={`${styles.loadingSpinner} ${styles.loadingSpinner}`}
              size={32}
            />
            <p className={styles.loadingText}>Loading content files...</p>
          </div>
        </div>
      ) : (
        <div className={styles.editorGrid}>
          {/* File List */}
          <div className={styles.fileList}>
            <h2 className={styles.fileListTitle}>Files</h2>
            <div className={styles.fileListContent}>
              {visibleFiles.length === 0 ? (
                <div className={styles.emptyMessage}>
                  No files available for this mode yet.
                </div>
              ) : (
                visibleFiles.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => handleFileSelect(file.path)}
                    className={`${styles.fileButton} ${
                      selectedFile === file.path
                        ? styles['fileButton--active']
                        : ''
                    }`}
                  >
                    <div className={styles.fileLabel}>{file.label}</div>
                    <div className={styles.filePath}>{file.path}</div>
                    <div className={styles.fileTime}>
                      {new Date(file.lastModified).toLocaleTimeString()}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Editor */}
          <div className={styles.editorArea}>
            {selectedFile && selectedFileData ? (
              <>
                <div className={styles.editorHeader}>
                  <div>
                    <h2 className={styles.editorTitle}>
                      {selectedFileData.label}
                    </h2>
                    <span className={styles.editorPath}>{selectedFile}</span>
                  </div>
                  {hasChanges && (
                    <span className={styles.editorWarning}>
                      <AlertCircle size={16} />
                      Unsaved changes
                    </span>
                  )}
                </div>
                <textarea
                  value={editorText}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className={styles.editorTextarea}
                  spellCheck={false}
                  disabled={!selectedFileData}
                  aria-invalid={Boolean(jsonError)}
                />
                {jsonError && <p className={styles.editorError}>{jsonError}</p>}
              </>
            ) : (
              <div className={styles.emptyEditor}>
                <p className={styles.emptyEditorText}>Select a file to edit</p>
              </div>
            )}
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
              Content files are loaded from{' '}
              <code className={styles.infoCode}>@noir-crafted</code> and can be
              edited here
            </span>
          </li>
          <li className={styles.infoItem}>
            <span className={styles.infoBullet}>•</span>
            <span>
              Changes are saved via{' '}
              <code className={styles.infoCode}>@jxion-core</code>{' '}
              ContentManager API
            </span>
          </li>
          <li className={styles.infoItem}>
            <span className={styles.infoBullet}>•</span>
            <span>
              Live updates automatically sync changes to{' '}
              <code className={styles.infoCode}>@noir-crafted</code> demo app
            </span>
          </li>
          <li className={styles.infoItem}>
            <span className={styles.infoBullet}>•</span>
            <span>
              Check the browser console for detailed logs of content loading,
              saving, and live updates
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
