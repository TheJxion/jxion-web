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

import { useState, useEffect } from "react";
import {
  Palette,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Code,
  Eye,
  Layers,
} from "lucide-react";
import { getComponent } from "@jxion/core";
import { useSSE } from "../hooks/useSSE";

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
  { id: "hero", name: "Hero", category: "Layout" },
  // Add more as they're registered
];

const AVAILABLE_VARIANTS = [
  { id: "primary", name: "Primary" },
  { id: "secondary", name: "Secondary" },
  { id: "default", name: "Default" },
];

export default function StylesEditor() {
  const [selectedComponent, setSelectedComponent] = useState<string>("hero");
  const [selectedVariant, setSelectedVariant] = useState<string>("primary");
  const [selectedClassName, setSelectedClassName] = useState<string>("");
  const [styles, setStyles] = useState<ComponentStyle>({
    tailwind: "",
    custom: "",
  });
  const [originalStyles, setOriginalStyles] = useState<ComponentStyle>({
    tailwind: "",
    custom: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [previewMode, setPreviewMode] = useState<"tailwind" | "custom">(
    "tailwind"
  );

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3005";

  useEffect(() => {
    loadStyles();
  }, [selectedComponent, selectedVariant, selectedClassName]);

  // Set up SSE for real-time updates
  useSSE({
    onStyleUpdate: async (componentId: string, variant: string) => {
      if (componentId === selectedComponent && variant === selectedVariant) {
        console.log(`[Jxion-Admin] 🔄 Style updated via SSE: ${componentId} (${variant}), reloading...`);
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
      const response = await fetch(`${apiUrl}/api/styles/${selectedComponent}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variant: selectedVariant,
          theme: "default",
        }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      const loadedStyles: ComponentStyle = {
        tailwind: data.tailwind || "",
        custom: data.css || data.custom || "",
      };

      setStyles(loadedStyles);
      setOriginalStyles(JSON.parse(JSON.stringify(loadedStyles)));
      console.log(
        `[Jxion-Admin] ✅ Styles loaded: ${JSON.stringify(loadedStyles)}`
      );
    } catch (error) {
      console.error("[Jxion-Admin] ❌ Error loading styles:", error);
      // Initialize with empty styles if load fails
      const emptyStyles: ComponentStyle = { tailwind: "", custom: "" };
      setStyles(emptyStyles);
      setOriginalStyles(JSON.parse(JSON.stringify(emptyStyles)));
    } finally {
      setLoading(false);
    }
  };

  const handleStyleChange = (
    field: "tailwind" | "custom",
    value: string
  ) => {
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
    setSaveStatus("idle");

    try {
      const response = await fetch(
        `${apiUrl}/api/styles/${selectedComponent}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            variant: selectedVariant,
            className: selectedClassName,
            styles: {
              tailwind: styles.tailwind,
              custom: styles.custom,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${await response.text()}`);
      }

      const result = await response.json();
      console.log(
        `[Jxion-Admin] ✅ Styles saved to database: ${selectedComponent}`,
        result
      );

      // Update original styles to reflect saved state
      setOriginalStyles(JSON.parse(JSON.stringify(styles)));
      setSaveStatus("success");

      // Clear success message after 5 seconds
      setTimeout(() => setSaveStatus("idle"), 5000);
    } catch (error) {
      console.error("[Jxion-Admin] ❌ Error saving styles:", error);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const hasChanges =
    JSON.stringify(styles) !== JSON.stringify(originalStyles);

  // Get component metadata for preview
  const componentMetadata = getComponent(selectedComponent);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-noir-black mb-2 flex items-center gap-3">
            <Palette className="text-noir-gold" size={32} />
            Styles Editor
          </h1>
          <p className="text-noir-gray-600 font-sans">
            Edit component styles with Tailwind classes and custom CSS. Changes
            are saved to the database and available immediately.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={loadStyles}
            disabled={loading}
            className="px-4 py-2 bg-noir-gray-200 text-noir-black rounded-lg hover:bg-noir-gray-300 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw
              className={loading ? "animate-spin" : ""}
              size={16}
            />
            Reload
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges || loading}
            className="px-6 py-2 bg-noir-gold text-white rounded-lg hover:bg-noir-gold-dark transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Styles"}
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {saveStatus === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="text-green-600" size={20} />
          <span className="text-green-800 font-sans">
            Styles saved successfully!
          </span>
        </div>
      )}
      {saveStatus === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="text-red-600" size={20} />
          <span className="text-red-800 font-sans">
            Failed to save styles. Please try again.
          </span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-noir-gray-200 rounded w-1/2 mx-auto"></div>
            <p className="text-noir-gray-600 font-mono text-sm">
              Loading styles...
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Editor */}
          <div className="space-y-6">
            {/* Component Selection */}
            <div className="bg-white border border-noir-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-serif font-bold text-noir-black mb-4 flex items-center gap-2">
                <Layers size={20} />
                Component Selection
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-sans text-noir-gray-700 mb-2">
                    Component
                  </label>
                  <select
                    value={selectedComponent}
                    onChange={(e) => setSelectedComponent(e.target.value)}
                    className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold"
                  >
                    {AVAILABLE_COMPONENTS.map((comp) => (
                      <option key={comp.id} value={comp.id}>
                        {comp.name} ({comp.category})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans text-noir-gray-700 mb-2">
                    Variant
                  </label>
                  <select
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold"
                  >
                    {AVAILABLE_VARIANTS.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-sans text-noir-gray-700 mb-2">
                    Class Name (optional)
                  </label>
                  <input
                    type="text"
                    value={selectedClassName}
                    onChange={(e) => setSelectedClassName(e.target.value)}
                    placeholder="e.g., hero-container"
                    className="w-full px-4 py-2 border border-noir-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-noir-gold"
                  />
                </div>
              </div>
            </div>

            {/* Tailwind Classes Editor */}
            <div className="bg-white border border-noir-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-serif font-bold text-noir-black mb-4 flex items-center gap-2">
                <Code size={20} />
                Tailwind Classes
              </h2>
              <textarea
                value={styles.tailwind}
                onChange={(e) => handleStyleChange("tailwind", e.target.value)}
                placeholder="e.g., bg-blue-500 text-white p-4 rounded-lg"
                className="w-full h-32 px-4 py-2 border border-noir-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-noir-gold resize-none"
              />
              <p className="mt-2 text-xs text-noir-gray-600 font-sans">
                Enter Tailwind utility classes separated by spaces
              </p>
            </div>

            {/* Custom CSS Editor */}
            <div className="bg-white border border-noir-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-serif font-bold text-noir-black mb-4 flex items-center gap-2">
                <Code size={20} />
                Custom CSS
              </h2>
              <textarea
                value={styles.custom}
                onChange={(e) => handleStyleChange("custom", e.target.value)}
                placeholder=".custom-class { color: red; }"
                className="w-full h-48 px-4 py-2 border border-noir-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-noir-gold resize-none"
              />
              <p className="mt-2 text-xs text-noir-gray-600 font-sans">
                Enter custom CSS rules
              </p>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="space-y-6">
            <div className="bg-white border border-noir-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-serif font-bold text-noir-black mb-4 flex items-center gap-2">
                <Eye size={20} />
                Preview
              </h2>
              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => setPreviewMode("tailwind")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    previewMode === "tailwind"
                      ? "bg-noir-gold text-white"
                      : "bg-noir-gray-200 text-noir-black"
                  }`}
                >
                  Tailwind
                </button>
                <button
                  onClick={() => setPreviewMode("custom")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    previewMode === "custom"
                      ? "bg-noir-gold text-white"
                      : "bg-noir-gray-200 text-noir-black"
                  }`}
                >
                  Custom CSS
                </button>
              </div>
              <div className="border border-noir-gray-300 rounded-lg p-6 min-h-[400px]">
                {previewMode === "tailwind" ? (
                  <div className={styles.tailwind || "p-4"}>
                    <h3 className="text-xl font-serif font-bold mb-2">
                      {componentMetadata?.name || "Component"} Preview
                    </h3>
                    <p className="text-noir-gray-600 font-sans">
                      This is a preview of how the Tailwind classes will look.
                      {!styles.tailwind && (
                        <span className="text-noir-gray-400 italic">
                          {" "}
                          Add Tailwind classes to see the preview.
                        </span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div>
                    <style>{styles.custom}</style>
                    <div className="p-4">
                      <h3 className="text-xl font-serif font-bold mb-2">
                        {componentMetadata?.name || "Component"} Preview
                      </h3>
                      <p className="text-noir-gray-600 font-sans">
                        This is a preview of how the custom CSS will look.
                        {!styles.custom && (
                          <span className="text-noir-gray-400 italic">
                            {" "}
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
              <div className="bg-noir-gray-50 border border-noir-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-serif font-bold text-noir-black mb-2">
                  Component Information
                </h3>
                <div className="text-xs font-mono text-noir-gray-700 space-y-1">
                  <p>
                    <strong>Name:</strong> {componentMetadata.name}
                  </p>
                  <p>
                    <strong>Version:</strong> {componentMetadata.version}
                  </p>
                  <p>
                    <strong>Category:</strong> {componentMetadata.category}
                  </p>
                  <p>
                    <strong>Frameworks:</strong>{" "}
                    {componentMetadata.frameworks.join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

