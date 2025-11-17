/**
 * Jxion Stack — Content Editor
 * Phase Reference: Phase 3 — Template Composition & Page Assembly
 * Description: JSON content editor with live preview in noir-crafted
 *
 * This page allows editing:
 * - Content JSON files (from noir-crafted/src/lib/i18n/content.ts)
 * - Style overrides
 * - Template configurations
 *
 * Changes are pushed live to noir-crafted demo app
 */

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
import { useSSE } from '../hooks/useSSE';

interface ContentFile {
  path: string;
  label: string;
  mode: EditorMode;
  content: any;
  lastModified: number;
}

type EditorMode = 'content' | 'style' | 'template';

const env =
  typeof import.meta !== 'undefined' ? (import.meta as any).env || {} : {};

const DEFAULT_API_HOST = (env.VITE_API_URL || 'http://localhost:8080').replace(
  /\/$/,
  ''
);

const CONTENT_API_BASE =
  (env.VITE_CONTENT_API_URL || '').replace(/\/$/, '') ||
  `${DEFAULT_API_HOST}/api/content`;

const contentSources: Array<{
  path: string;
  label: string;
  mode: EditorMode;
}> = [
  {
    path: 'noir-crafted/content.json',
    label: 'Noir Crafted • content.json',
    mode: 'content',
  },
  {
    path: 'homepage',
    label: 'Homepage Template Schema',
    mode: 'template',
  },
];

const cloneContent = (value: any) => JSON.parse(JSON.stringify(value));

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

  const fetchContentFromApi = async (path: string) => {
    const url = `${CONTENT_API_BASE}/${path}`;
    console.log(`[Jxion-ContentEditor] 🌐 Fetching: ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      const message = await response.text().catch(() => '');
      throw new Error(
        `API returned ${response.status}${message ? `: ${message}` : ''}`
      );
    }

    const payload = await response.json();
    return extractApiContent(payload);
  };

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

  const loadHomepageTemplate = async () => {
    try {
      return await fetchContentFromApi('homepage');
    } catch (apiError) {
      console.warn(
        '[Jxion-ContentEditor] ⚠️ Homepage schema not in database, falling back to template loader',
        apiError
      );
      try {
        const coreModule = await import('@jxion/core');
        if (coreModule.loadTemplateSchema) {
          const template = await coreModule.loadTemplateSchema('homepage');
          return template || { note: 'Template schema not found.' };
        }
        throw new Error('loadTemplateSchema not available');
      } catch (error) {
        console.warn('Failed to load template via loader:', error);
        return {
          note: 'Template schema not found. The template loader may not be available in this environment.',
          error: String(error),
        };
      }
    }
  };

  useEffect(() => {
    console.log('[Jxion-ContentEditor] Initializing content editor...');
    loadContentFiles(false);
  }, []);

  // Set up SSE for real-time updates
  useSSE({
    apiUrl: DEFAULT_API_HOST,
    enabled: liveUpdatesEnabled,
    onContentUpdate: async (path: string) => {
      if (selectedFile === path) {
        console.log(
          `[Jxion-ContentEditor] 🔄 Content updated via SSE: ${path}, reloading...`
        );
        await loadContentFiles(true);
      }
    },
  });

  function applySelection(file: ContentFile) {
    setSelectedFile(file.path);
    setEditedContent(cloneContent(file.content));
    try {
      setEditorText(JSON.stringify(file.content, null, 2));
    } catch {
      setEditorText('');
    }
    setJsonError(null);
  }

  const loadContentFiles = async (preserveSelection = true) => {
    console.log('[Jxion-ContentEditor] 📂 Loading content files...');
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

          if (source.path === 'noir-crafted/content.json') {
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
          console.log(`[Jxion-ContentEditor] ✅ Loaded: ${source.path}`);
        } catch (error) {
          console.warn(
            `[Jxion-ContentEditor] ⚠️ Failed to load ${source.path}:`,
            error
          );
          files.push({
            ...source,
            content: { error: `Failed to load: ${error}` },
            lastModified: Date.now(),
          });
        }
      }

      setContentFiles(files);
      if (files.length > 0) {
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
      } else {
        setSelectedFile(null);
        setEditedContent(null);
        setEditorText('');
        setJsonError(null);
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

    if (nextFile) {
      applySelection(nextFile);
    } else {
      setSelectedFile(null);
      setEditedContent(null);
      setEditorText('');
      setJsonError(null);
    }
  };

  const handleFileSelect = (path: string) => {
    console.log(`[Jxion-ContentEditor] 📄 Selecting file: ${path}`);
    const file = contentFiles.find((f) => f.path === path);
    if (file) {
      applySelection(file);
      setCurrentMode(file.mode);
    }
  };

  const handleContentChange = (value: string) => {
    setEditorText(value);
    try {
      const parsed = JSON.parse(value);
      setEditedContent(parsed);
      setJsonError(null);
      console.log('[Jxion-ContentEditor] ✏️ Content edited');
    } catch (error) {
      setJsonError('Geçersiz JSON. Kaydetmeden önce düzeltin.');
      console.warn(
        '[Jxion-ContentEditor] ⚠️ Invalid JSON (editing in progress)'
      );
    }
  };

  const handleSave = async () => {
    if (!selectedFile || !editedContent || jsonError) return;

    console.log(`[Jxion-ContentEditor] 💾 Saving content: ${selectedFile}`);
    setSaving(true);
    setSaveStatus('idle');

    try {
      // Save to API (which persists to database)
      const response = await fetch(`${CONTENT_API_BASE}/${selectedFile}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedContent),
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${await response.text()}`
        );
      }

      const result = await response.json();
      console.log(
        `[Jxion-ContentEditor] ✅ Content saved to database: ${selectedFile}`,
        result
      );

      // Update local state
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

      // Clear success message after 5 seconds
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-noir-black mb-2 flex items-center gap-3">
            <FileText className="text-noir-gold" size={32} />
            Content Editor
          </h1>
          <p className="text-noir-gray-600 font-sans">
            Edit content files for @noir-crafted. Changes are saved to the
            database and will be available immediately.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
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
              className="w-4 h-4"
            />
            <span className="text-sm font-sans text-noir-gray-700">
              Live Updates
            </span>
          </label>
          <button
            onClick={() => loadContentFiles(true)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-noir-gray-100 hover:bg-noir-gray-200 text-noir-black rounded-lg font-sans font-semibold transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Reload
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !canSave}
            className="flex items-center gap-2 px-6 py-2 bg-noir-gold hover:bg-[#FFC700] text-noir-black rounded-lg font-sans font-semibold transition-all shadow-lg shadow-noir-gold/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
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
      <div className="flex gap-2 border-b border-noir-gray-200">
        <button
          onClick={() => handleModeChange('content')}
          className={`px-4 py-2 font-sans font-semibold transition-colors ${
            currentMode === 'content'
              ? 'text-noir-gold border-b-2 border-noir-gold'
              : 'text-noir-gray-600 hover:text-noir-black'
          }`}
        >
          <Code size={18} className="inline mr-2" />
          Content
        </button>
        <button
          onClick={() => handleModeChange('style')}
          className={`px-4 py-2 font-sans font-semibold transition-colors ${
            currentMode === 'style'
              ? 'text-noir-gold border-b-2 border-noir-gold'
              : 'text-noir-gray-600 hover:text-noir-black'
          }`}
        >
          <Palette size={18} className="inline mr-2" />
          Styles
        </button>
        <button
          onClick={() => handleModeChange('template')}
          className={`px-4 py-2 font-sans font-semibold transition-colors ${
            currentMode === 'template'
              ? 'text-noir-gold border-b-2 border-noir-gold'
              : 'text-noir-gray-600 hover:text-noir-black'
          }`}
        >
          <Layout size={18} className="inline mr-2" />
          Templates
        </button>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="text-yellow-600" size={20} />
            <span className="text-yellow-800 font-sans font-semibold">
              Content updated locally
            </span>
          </div>
          <p className="text-yellow-700 font-sans text-sm ml-8">
            Note: Source files (TypeScript/JSON) cannot be modified via API.
            Changes are stored locally in the editor only. To persist changes,
            you'll need to manually update the source files in the codebase.
          </p>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="text-red-600" size={20} />
          <span className="text-red-800 font-sans font-semibold">
            Error updating content. Please try again.
          </span>
        </div>
      )}

      {/* File Selector & Editor */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <RefreshCw
              className="animate-spin text-noir-gold mx-auto mb-4"
              size={32}
            />
            <p className="text-noir-gray-600 font-sans">
              Loading content files...
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* File List */}
          <div className="col-span-3 bg-white rounded-lg shadow-md p-4 border border-noir-gray-200">
            <h2 className="text-lg font-serif font-semibold text-noir-black mb-4">
              Files
            </h2>
            <div className="space-y-2">
              {visibleFiles.length === 0 ? (
                <div className="text-sm text-noir-gray-500">
                  No files available for this mode yet.
                </div>
              ) : (
                visibleFiles.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => handleFileSelect(file.path)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedFile === file.path
                        ? 'bg-noir-gold text-noir-black font-semibold'
                        : 'bg-noir-gray-50 hover:bg-noir-gray-100 text-noir-gray-700'
                    }`}
                  >
                    <div className="text-sm font-serif">{file.label}</div>
                    <div className="text-xs text-noir-gray-500 font-mono truncate">
                      {file.path}
                    </div>
                    <div className="text-[11px] text-noir-gray-400 mt-1">
                      {new Date(file.lastModified).toLocaleTimeString()}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="col-span-9 bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
            {selectedFile && selectedFileData ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-serif font-semibold text-noir-black">
                    {selectedFileData.label}
                    <span className="block text-sm font-mono text-noir-gray-500 font-normal">
                      {selectedFile}
                    </span>
                  </h2>
                  {hasChanges && (
                    <span className="text-sm text-yellow-600 font-sans font-semibold flex items-center gap-2">
                      <AlertCircle size={16} />
                      Unsaved changes
                    </span>
                  )}
                </div>
                <textarea
                  value={editorText}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full h-[600px] px-4 py-3 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-mono text-sm"
                  spellCheck={false}
                  disabled={!selectedFileData}
                  aria-invalid={Boolean(jsonError)}
                />
                {jsonError && (
                  <p className="mt-2 text-sm text-red-600">{jsonError}</p>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-[600px] text-noir-gray-500">
                <p className="font-sans">Select a file to edit</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Panel */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-serif font-semibold text-noir-black mb-3 flex items-center gap-2">
          <ExternalLink size={20} className="text-blue-600" />
          How It Works
        </h3>
        <ul className="space-y-2 text-sm text-noir-gray-700 font-sans">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>
              Content files are loaded from{' '}
              <code className="bg-white px-2 py-1 rounded">@noir-crafted</code>{' '}
              and can be edited here
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>
              Changes are saved via{' '}
              <code className="bg-white px-2 py-1 rounded">@jxion-core</code>{' '}
              ContentManager API
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
            <span>
              Live updates automatically sync changes to{' '}
              <code className="bg-white px-2 py-1 rounded">@noir-crafted</code>{' '}
              demo app
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">•</span>
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
