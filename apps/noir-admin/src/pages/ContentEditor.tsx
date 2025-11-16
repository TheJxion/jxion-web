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
import { getContentManager, type ContentUpdate } from '@jxion/core';
import { useSSE } from '../hooks/useSSE';

interface ContentFile {
  path: string;
  content: any;
  lastModified: number;
}

type EditorMode = 'content' | 'style' | 'template';

export default function ContentEditor() {
  const [currentMode, setCurrentMode] = useState<EditorMode>('content');
  const [contentFiles, setContentFiles] = useState<ContentFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  );
  const [liveUpdatesEnabled, setLiveUpdatesEnabled] = useState(true);

  // Available content files - these are loaded from the actual content source
  // Note: Content files are in TypeScript format, not JSON
  const contentFilePaths = [
    'content', // Main content from noir-crafted/src/lib/i18n/content.ts
    'homepage', // Template schema from libs/jxion-core/src/templates/schemas/homepage.json
  ];

  useEffect(() => {
    console.log('[Jxion-ContentEditor] Initializing content editor...');
    loadContentFiles();

    // Set up live update listener (disabled since we use SSE for real-time updates)
    const contentManager = getContentManager({
      baseUrl: '/api/content',
      enableLiveUpdates: false, // Disable polling, use SSE instead
      onUpdate: handleContentUpdate,
    });

    return () => {
      contentManager.stopLiveUpdates();
      console.log('[Jxion-ContentEditor] ⏸️ Live updates stopped');
    };
  }, []); // Only run once on mount

  // Set up SSE for real-time updates
  useSSE({
    onContentUpdate: async (path: string) => {
      if (selectedFile === path) {
        console.log(
          `[Jxion-ContentEditor] 🔄 Content updated via SSE: ${path}, reloading...`
        );
        await loadContentFiles();
      }
    },
    enabled: true,
  });

  const loadContentFiles = async () => {
    console.log('[Jxion-ContentEditor] 📂 Loading content files...');
    setLoading(true);
    try {
      const files: ContentFile[] = [];

      // Load content from actual sources
      for (const path of contentFilePaths) {
        try {
          let content: any;

          if (path === 'content') {
            // Load from noir-crafted content.ts
            try {
              const contentModule = await import(
                '../../../noir-crafted/src/lib/i18n/content'
              );
              // content.ts exports a named export 'content', not a default export
              content = contentModule.content || {};
            } catch {
              // Fallback: try to load from API if available
              try {
                const response = await fetch(
                  '/api/content/noir-crafted/content.json'
                );
                if (response.ok) {
                  content = await response.json();
                } else {
                  throw new Error('Content not available');
                }
              } catch {
                content = {
                  note: 'Content file not found. Please check the content source.',
                };
              }
            }
          } else if (path === 'homepage') {
            // Try to load from API first (database), then fallback to template loader
            try {
              const apiUrl =
                import.meta.env.VITE_API_URL || 'http://localhost:3005';
              const response = await fetch(`${apiUrl}/api/content/${path}`);
              if (response.ok) {
                const apiContent = await response.json();
                // Check if API returned placeholder (content not found)
                if (apiContent.note && apiContent.note.includes('not found')) {
                  console.log(
                    `[Jxion-ContentEditor] ⚠️ ${path} not in database, falling back to template loader`
                  );
                  throw new Error('Not found in database');
                }
                // Use content from API
                // API returns either: { content: {...} } or just the content object
                if (
                  apiContent.content &&
                  Object.keys(apiContent.content).length > 0
                ) {
                  content = apiContent.content;
                } else if (!apiContent.note) {
                  // If no note, assume it's the content itself
                  content = apiContent;
                } else {
                  // Has note but content is empty, treat as not found
                  throw new Error('Not found in database');
                }
                console.log(
                  `[Jxion-ContentEditor] ✅ Loaded ${path} from database`
                );
              } else {
                throw new Error('Not found in database');
              }
            } catch (apiError) {
              // Fallback to template loader
              try {
                const coreModule = await import('@jxion/core');
                if (coreModule.loadTemplateSchema) {
                  const template = await coreModule.loadTemplateSchema(
                    'homepage'
                  );
                  content = template || { note: 'Template schema not found.' };
                  console.log(
                    `[Jxion-ContentEditor] ✅ Loaded ${path} from template schema`
                  );
                } else {
                  throw new Error('loadTemplateSchema not available');
                }
              } catch (error) {
                console.warn('Failed to load template via loader:', error);
                content = {
                  note: 'Template schema not found. The template loader may not be available in this environment.',
                  error: String(error),
                };
              }
            }
          }

          files.push({
            path,
            content,
            lastModified: Date.now(),
          });
          console.log(`[Jxion-ContentEditor] ✅ Loaded: ${path}`);
        } catch (error) {
          console.warn(
            `[Jxion-ContentEditor] ⚠️ Failed to load ${path}:`,
            error
          );
          // Add placeholder so user knows the file exists but failed to load
          files.push({
            path,
            content: { error: `Failed to load: ${error}` },
            lastModified: Date.now(),
          });
        }
      }

      setContentFiles(files);
      if (files.length > 0 && !selectedFile) {
        setSelectedFile(files[0].path);
        setEditedContent(JSON.parse(JSON.stringify(files[0].content)));
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

  const handleContentUpdate = (update: ContentUpdate) => {
    console.log('[Jxion-ContentEditor] 🔄 Content update received:', update);

    // Update the content file in state
    setContentFiles((prev) =>
      prev.map((file) =>
        file.path === update.path
          ? {
              ...file,
              content: update.content,
              lastModified: update.timestamp,
            }
          : file
      )
    );

    // If this is the currently selected file, update edited content
    if (selectedFile === update.path) {
      setEditedContent(JSON.parse(JSON.stringify(update.content)));
      console.log(
        '[Jxion-ContentEditor] ✅ Updated edited content for:',
        update.path
      );
    }
  };

  const handleFileSelect = (path: string) => {
    console.log(`[Jxion-ContentEditor] 📄 Selecting file: ${path}`);
    const file = contentFiles.find((f) => f.path === path);
    if (file) {
      setSelectedFile(path);
      setEditedContent(JSON.parse(JSON.stringify(file.content)));
    }
  };

  const handleContentChange = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      setEditedContent(parsed);
      console.log('[Jxion-ContentEditor] ✏️ Content edited');
    } catch (error) {
      // Invalid JSON, but keep the raw value for editing
      console.warn(
        '[Jxion-ContentEditor] ⚠️ Invalid JSON (editing in progress)'
      );
    }
  };

  const handleSave = async () => {
    if (!selectedFile || !editedContent) return;

    console.log(`[Jxion-ContentEditor] 💾 Saving content: ${selectedFile}`);
    setSaving(true);
    setSaveStatus('idle');

    try {
      // Save to API (which persists to database)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3005';
      const response = await fetch(`${apiUrl}/api/content/${selectedFile}`, {
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

  const selectedFileData = contentFiles.find((f) => f.path === selectedFile);
  const hasChanges =
    selectedFileData &&
    JSON.stringify(selectedFileData.content) !== JSON.stringify(editedContent);

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
            onClick={loadContentFiles}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-noir-gray-100 hover:bg-noir-gray-200 text-noir-black rounded-lg font-sans font-semibold transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Reload
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
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
          onClick={() => setCurrentMode('content')}
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
          onClick={() => setCurrentMode('style')}
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
          onClick={() => setCurrentMode('template')}
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
              {contentFiles.map((file) => (
                <button
                  key={file.path}
                  onClick={() => handleFileSelect(file.path)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedFile === file.path
                      ? 'bg-noir-gold text-noir-black font-semibold'
                      : 'bg-noir-gray-50 hover:bg-noir-gray-100 text-noir-gray-700'
                  }`}
                >
                  <div className="text-sm font-mono truncate">{file.path}</div>
                  <div className="text-xs text-noir-gray-500 mt-1">
                    {new Date(file.lastModified).toLocaleTimeString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="col-span-9 bg-white rounded-lg shadow-md p-6 border border-noir-gray-200">
            {selectedFile && editedContent ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-serif font-semibold text-noir-black">
                    {selectedFile}
                  </h2>
                  {hasChanges && (
                    <span className="text-sm text-yellow-600 font-sans font-semibold flex items-center gap-2">
                      <AlertCircle size={16} />
                      Unsaved changes
                    </span>
                  )}
                </div>
                <textarea
                  value={JSON.stringify(editedContent, null, 2)}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full h-[600px] px-4 py-3 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold focus:border-transparent font-mono text-sm"
                  spellCheck={false}
                />
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
