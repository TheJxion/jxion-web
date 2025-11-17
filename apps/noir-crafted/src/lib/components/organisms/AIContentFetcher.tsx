/**
 * AI Content Fetcher Component
 *
 * Demonstrates Section 3 architectural concepts:
 * - Server-state management (caching, latency, fallbacks)
 * - React Query-like behavior (SWR pattern)
 * - Error handling with graceful degradation
 *
 * Architecture Proof:
 * - Simulates BFF (Backend for Frontend) pattern
 * - Demonstrates caching strategy (Redis-like)
 * - Shows latency handling (2.5s fresh, 0.5s cached)
 * - Implements fallback UI for errors
 *
 * Architecture: React component used in SvelteKit via LocalReactWrapper
 */

import React, { useState, useEffect, useCallback } from 'react';

// Type Definitions
interface AIContent {
  title: string;
  body: string;
  generatedAt: string;
}

interface AIContentFetcherProps {
  initialAutoFetch?: boolean;
}

interface UseAIContentFetcherOptions {
  forceRefresh?: boolean;
  onSuccess?: (content: AIContent) => void;
  onError?: (error: Error) => void;
}

interface UseAIContentFetcherReturn {
  content: AIContent | null;
  isLoading: boolean;
  isError: boolean;
  isCached: boolean;
  error: Error | null;
  fetchContent: () => Promise<void>;
  forceRefresh: () => Promise<void>;
}

// Simulated cache (in production, this would be Redis on BFF)
const cache: Map<string, { data: AIContent; timestamp: number }> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Simulated AI/BFF service
const simulateAIService = async (
  useCache: boolean = true,
): Promise<AIContent> => {
  const cacheKey = 'ai-content';
  const cached = cache.get(cacheKey);

  // Check cache if enabled
  if (useCache && cached) {
    const age = Date.now() - cached.timestamp;
    if (age < CACHE_TTL) {
      // Simulate fast cached response (0.5s)
      await new Promise((resolve) => setTimeout(resolve, 500));
      return cached.data;
    }
  }

  // Simulate 20% failure rate
  if (Math.random() < 0.2) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    throw new Error('AI service temporarily unavailable. Please try again.');
  }

  // Simulate slow fresh request (2.5s latency)
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Generate mock AI content
  const content: AIContent = {
    title: 'AI-Generated Personalized Plan',
    body:
      `Based on your preferences and behavior patterns, we've created a customized 7-day wellness plan specifically for you. This plan includes:\n\n` +
      `• Morning meditation sessions tailored to your schedule\n` +
      `• Personalized nutrition recommendations\n` +
      `• Exercise routines that match your fitness level\n` +
      `• Sleep optimization strategies\n\n` +
      `This content was generated using our advanced AI model, which analyzed your profile, preferences, and historical data to create the most relevant recommendations for you.`,
    generatedAt: new Date().toISOString(),
  };

  // Store in cache
  cache.set(cacheKey, {
    data: content,
    timestamp: Date.now(),
  });

  return content;
};

export const useAIContentFetcher = (
  options: UseAIContentFetcherOptions = {},
): UseAIContentFetcherReturn => {
  const [content, setContent] = useState<AIContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchContent = useCallback(
    async (forceRefresh: boolean = false) => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const startTime = Date.now();
        const data = await simulateAIService(!forceRefresh);
        const duration = Date.now() - startTime;

        // Determine if response was cached (fast = cached, slow = fresh)
        const wasCached = duration < 1000;
        setIsCached(wasCached);

        setContent(data);
        options.onSuccess?.(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setIsError(true);
        setError(error);
        setContent(null);
        options.onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  const forceRefreshContent = useCallback(async () => {
    // Clear cache
    cache.clear();
    await fetchContent(true);
  }, [fetchContent]);

  return {
    content,
    isLoading,
    isError,
    isCached,
    error,
    fetchContent: () => fetchContent(false),
    forceRefresh: forceRefreshContent,
  };
};

// Component
// Defined as const export for proper consumption by SvelteKit's LocalReactWrapper
export const AIContentFetcher: React.FC<AIContentFetcherProps> = ({
  initialAutoFetch = false,
}) => {
  const {
    content,
    isLoading,
    isError,
    isCached,
    error,
    fetchContent,
    forceRefresh,
  } = useAIContentFetcher({
    onSuccess: (data) => {
      console.log('[AIContentFetcher] Content loaded:', data);
    },
    onError: (err) => {
      console.error('[AIContentFetcher] Error:', err);
    },
  });

  useEffect(() => {
    if (initialAutoFetch) {
      fetchContent();
    }
  }, [initialAutoFetch, fetchContent]);

  // Jxion-Design: Noir Theme & Typography
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-neutral-900 rounded-xl border border-neutral-800">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-serif text-yellow-500 mb-2">
          AI Content Fetcher Demo
        </h2>
        <p className="text-neutral-400 text-sm">
          Demonstrates server-state management: caching, latency handling, and
          fallbacks
        </p>
      </div>

      {/* Status Indicators */}
      <div className="flex gap-4 mb-6 text-sm">
        {isCached && (
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
            ✓ Cached Response (Fast)
          </span>
        )}
        {isLoading && (
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full animate-pulse">
            ⏳ Loading...
          </span>
        )}
        {isError && (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full">
            ✗ Error
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={fetchContent}
          disabled={isLoading}
          className="px-6 py-2 bg-yellow-600 text-black font-semibold rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate AI Plan'}
        </button>

        <button
          onClick={forceRefresh}
          disabled={isLoading}
          className="px-6 py-2 bg-neutral-700 text-white font-semibold rounded-lg hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Force Refresh (Clear Cache)
        </button>
      </div>

      {/* Content Display */}
      {isError && error ? (
        <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg">
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            Error: {error.message}
          </h3>
          <p className="text-neutral-300 mb-4">
            The AI service is temporarily unavailable. This is a simulated error
            to demonstrate fallback handling.
          </p>
          <div className="p-4 bg-neutral-800 rounded border border-neutral-700">
            <p className="text-sm text-neutral-400 font-mono">
              Fallback Strategy: In production, this would trigger:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-neutral-300 space-y-1">
              <li>Default "Trending Content" display</li>
              <li>Retry logic with exponential backoff</li>
              <li>User notification with option to retry</li>
            </ul>
          </div>
        </div>
      ) : content ? (
        <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl font-serif text-yellow-500">
              {content.title}
            </h3>
            {isCached && (
              <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                Cached
              </span>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-neutral-300 whitespace-pre-line leading-relaxed">
              {content.body}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-700">
            <p className="text-xs text-neutral-500">
              Generated at: {new Date(content.generatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 text-center">
          <p className="text-neutral-400">
            Click "Generate AI Plan" to fetch personalized content from the AI
            service.
          </p>
          <p className="text-xs text-neutral-500 mt-2">
            First request: ~2.5s (fresh), Subsequent requests: ~0.5s (cached)
          </p>
        </div>
      )}

      {/* Architecture Notes */}
      <div className="mt-6 p-4 bg-neutral-800/50 rounded border border-neutral-700">
        <h4 className="text-sm font-semibold text-yellow-500 mb-2">
          Architecture Notes:
        </h4>
        <ul className="text-xs text-neutral-400 space-y-1">
          <li>
            • Simulates BFF pattern: React client → Node.js BFF → AI Service
          </li>
          <li>• Cache strategy: Redis-like (in-memory Map for demo)</li>
          <li>• Latency handling: 2.5s fresh, 0.5s cached</li>
          <li>• Error rate: 20% (demonstrates fallback handling)</li>
          <li>• State management: Custom hook (React Query pattern)</li>
        </ul>
      </div>
    </div>
  );
};

export default AIContentFetcher;
