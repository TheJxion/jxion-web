/**
 * Jxion Stack — SSE React Hook
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: React hook for Server-Sent Events in admin panel
 * Date: 2025-11-14
 */

import { useEffect, useRef } from 'react';

export type EventType =
  | 'translation_update'
  | 'content_update'
  | 'style_update'
  | 'connection'
  | 'heartbeat';

export interface SSEEvent {
  type: EventType;
  timestamp: string;
  data: Record<string, any>;
}

export interface UseSSEOptions {
  apiUrl?: string;
  onTranslationUpdate?: (key: string, locale: string) => void;
  onContentUpdate?: (path: string) => void;
  onStyleUpdate?: (componentId: string, variant: string) => void;
  onConnect?: (clientId: string) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

export function useSSE(options: UseSSEOptions = {}) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const callbacksRef = useRef<UseSSEOptions>({});
  const {
    apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3005',
    enabled = true,
  } = options;

  // Store callbacks in ref to avoid reconnection on callback changes
  callbacksRef.current = {
    onTranslationUpdate: options.onTranslationUpdate,
    onContentUpdate: options.onContentUpdate,
    onStyleUpdate: options.onStyleUpdate,
    onConnect: options.onConnect,
    onError: options.onError,
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const url = `${apiUrl}/api/events`;
    console.log('[Jxion-Admin] 🔌 Connecting to SSE endpoint:', url);

    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      console.log('[Jxion-Admin] ✅ Connected to event stream');
    };

    eventSource.onmessage = (event) => {
      try {
        const sseEvent: SSEEvent = JSON.parse(event.data);
        console.log(
          `[Jxion-Admin] 📨 Received event: ${sseEvent.type}`,
          sseEvent.data
        );

        switch (sseEvent.type) {
          case 'connection':
            callbacksRef.current.onConnect?.(sseEvent.data.clientId);
            break;

          case 'translation_update':
            callbacksRef.current.onTranslationUpdate?.(
              sseEvent.data.key,
              sseEvent.data.locale
            );
            break;

          case 'content_update':
            callbacksRef.current.onContentUpdate?.(sseEvent.data.path);
            break;

          case 'style_update':
            callbacksRef.current.onStyleUpdate?.(
              sseEvent.data.componentId,
              sseEvent.data.variant
            );
            break;

          case 'heartbeat':
            // Heartbeat received, connection is alive
            break;

          default:
            console.warn(
              `[Jxion-Admin] ⚠️ Unknown event type: ${sseEvent.type}`
            );
        }
      } catch (error) {
        console.error('[Jxion-Admin] ❌ Failed to parse event:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('[Jxion-Admin] ❌ SSE connection error:', error);
      callbacksRef.current.onError?.(new Error('SSE connection error'));
    };

    eventSourceRef.current = eventSource;

    return () => {
      console.log('[Jxion-Admin] ⏸️ Disconnecting from event stream');
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [apiUrl, enabled]); // Only depend on apiUrl and enabled, not callbacks

  return {
    isConnected: eventSourceRef.current?.readyState === EventSource.OPEN,
  };
}
