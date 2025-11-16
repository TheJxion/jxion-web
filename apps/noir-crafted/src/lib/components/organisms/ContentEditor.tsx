/**
 * AI-Powered Brand Content Editor
 *
 * This component uses the Gemini API to generate brand-aligned marketing copy
 * for the "Noir Crafted" brand, maintaining the elegant, poetic brand voice.
 *
 * Phase: Phase 4 — AI Assistant & Automation
 * Case Study: Q3 (AI Layer) - AI-Assisted Content Generation
 */

'use client';

import { useState } from 'react';
// Note: SCSS modules need to be imported differently in React components
// For now, we'll use inline styles or CSS classes
// import styles from './ContentEditor.module.scss';
const styles = {
  contentEditor: 'content-editor',
  container: 'content-editor-container',
  title: 'content-editor-title',
  description: 'content-editor-description',
  form: 'content-editor-form',
  inputGroup: 'content-editor-input-group',
  label: 'content-editor-label',
  textarea: 'content-editor-textarea',
  button: 'content-editor-button',
  loading: 'content-editor-loading',
  spinner: 'content-editor-spinner',
  error: 'content-editor-error',
  output: 'content-editor-output',
  outputHeader: 'content-editor-output-header',
  outputTitle: 'content-editor-output-title',
  copyButton: 'content-editor-copy-button',
  outputContent: 'content-editor-output-content',
};

interface ContentEditorProps {
  className?: string;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  className = '',
}) => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async (userPrompt: string) => {
    if (!userPrompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedText('');

    try {
      // System instruction for brand voice
      const systemInstruction = {
        parts: [
          {
            text: `Act as the 'Noir Crafted' brand voice. You are elegant, poetic, authentic, and inspiring. Your language is sophisticated and celebrates feminine power and Turkish heritage. AVOID slang and generic marketing cliches. Your goal is to write evocative, timeless copy that reflects the luxury jewelry brand's values: elegance, timelessness, authenticity, craftsmanship, and meaning. Reference cultural motifs like moon cycles, Virgo zodiac, Tulip, and Şahmeran when relevant.`,
          },
        ],
      };

      // User prompt
      const userPromptPart = {
        parts: [{ text: userPrompt }],
      };

      // Get API key from environment or use a placeholder
      // In production, this should be handled server-side
      const apiKey =
        (typeof import.meta !== 'undefined' &&
          (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
        (typeof process !== 'undefined' && process.env?.VITE_GEMINI_API_KEY) ||
        '';

      if (!apiKey) {
        // Fallback: Use a mock response for demo purposes
        console.warn(
          '[ContentEditor] Gemini API key not found, using mock response',
        );
        setTimeout(() => {
          setGeneratedText(
            `**${userPrompt}**\n\nHer parça, zarafet ve işçiliğin mükemmel birleşimidir. Ay döngülerinden ilham alan, Virgo burcunun zarafetini yansıtan ve Türk kültürünün simgeleriyle bezenmiş özel tasarımlar.\n\nZamanın ötesinde takı deneyimi sunan Noir Crafted, her parçada kadın gücünü ve zarafetini kutluyor. Anlamlı tasarımlarla kendinizi ifade edin.`,
          );
          setIsLoading(false);
        }, 1500);
        return;
      }

      // API endpoint
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

      // Make API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [userPromptPart],
          systemInstruction: systemInstruction,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `API request failed: ${response.status} - ${errorData}`,
        );
      }

      const data = await response.json();

      // Extract generated text
      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]
      ) {
        const generatedContent = data.candidates[0].content.parts[0].text;
        setGeneratedText(generatedContent);
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (err) {
      console.error('[ContentEditor] Error generating content:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to generate content. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateContent(prompt);
  };

  return (
    <div className={`${styles.contentEditor} ${className}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>AI Content Generator</h2>
        <p className={styles.description}>
          Generate brand-aligned marketing copy for Noir Crafted using AI
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="prompt" className={styles.label}>
              Describe what you want to create:
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., a blog post about the Virgo collection, product description for a moon cycle necklace, social media caption for Şahmeran collection..."
              className={styles.textarea}
              rows={4}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={styles.button}
          >
            {isLoading ? 'Generating...' : 'Generate Content'}
          </button>
        </form>

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Generating content with AI...</p>
          </div>
        )}

        {generatedText && !isLoading && (
          <div className={styles.output}>
            <div className={styles.outputHeader}>
              <h3 className={styles.outputTitle}>Generated Content</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedText);
                }}
                className={styles.copyButton}
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
            <div
              className={styles.outputContent}
              dangerouslySetInnerHTML={{
                __html: generatedText
                  .replace(/\n/g, '<br />')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>'),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;
