import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface ContentEnvelope<TContent = Record<string, unknown>> {
  path: string;
  content: TContent;
  note?: string;
}

export interface UseAIContentOptions<TSelected> {
  select?: (data: ContentEnvelope) => TSelected;
  enabled?: boolean;
}

const ENV =
  (import.meta as unknown as { env?: Record<string, string> }).env ?? {};

const API_BASE_URL =
  ENV.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

export const CONTENT_API_BASE = `${API_BASE_URL}/api/content`;

async function fetchContent<TContent>(
  path: string,
  signal?: AbortSignal
): Promise<ContentEnvelope<TContent>> {
  const response = await fetch(`${CONTENT_API_BASE}/${path}`, {
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `İçerik yüklenemedi (${response.status} ${response.statusText})`
    );
  }

  const payload = (await response.json()) as ContentEnvelope<TContent>;

  if (!payload.content) {
    throw new Error("API geçerli bir içerik gövdesi döndürmedi.");
  }

  return payload;
}

export function useAIContentFetcher<TSelected = ContentEnvelope>(
  path: string,
  options: UseAIContentOptions<TSelected> = {}
) {
  const queryResult = useQuery({
    queryKey: ["ai-content", path] as const,
    queryFn: ({ signal }) => fetchContent(path, signal),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: false,
    retry: 2,
    placeholderData: keepPreviousData,
    select: options.select,
    enabled: options.enabled ?? true,
  });

  return {
    ...queryResult,
    hasData: Boolean(queryResult.data),
    endpoint: `${CONTENT_API_BASE}/${path}`,
  };
}

