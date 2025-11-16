/**
 * Jxion Stack — SSE Client Utility
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: Server-Sent Events client for real-time updates
 * Date: 2025-11-14
 *
 * This module provides:
 * - SSE connection management
 * - Event listeners for translation/content/style updates
 * - Automatic reconnection
 * - Event type handling
 */

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

export interface SSEOptions {
  apiUrl?: string;
  onTranslationUpdate?: (key: string, locale: string) => void;
  onContentUpdate?: (path: string) => void;
  onStyleUpdate?: (componentId: string, variant: string) => void;
  onConnect?: (clientId: string) => void;
  onError?: (error: Error) => void;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

export class SSEClient {
  private eventSource: EventSource | null = null;
  private options: Required<SSEOptions>;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isConnecting = false;

  constructor(options: SSEOptions = {}) {
    this.options = {
      apiUrl: options.apiUrl || 'http://localhost:3005',
      onTranslationUpdate: options.onTranslationUpdate || (() => {}),
      onContentUpdate: options.onContentUpdate || (() => {}),
      onStyleUpdate: options.onStyleUpdate || (() => {}),
      onConnect: options.onConnect || (() => {}),
      onError: options.onError || (() => {}),
      autoReconnect: options.autoReconnect !== false,
      reconnectInterval: options.reconnectInterval || 5000,
    };
  }

  connect(): void {
    if (
      this.isConnecting ||
      this.eventSource?.readyState === EventSource.OPEN
    ) {
      return;
    }

    this.isConnecting = true;
    const url = `${this.options.apiUrl}/api/events`;

    console.log('[Jxion-SSE] 🔌 Connecting to SSE endpoint:', url);

    try {
      this.eventSource = new EventSource(url);

      this.eventSource.onopen = () => {
        this.isConnecting = false;
        console.log('[Jxion-SSE] ✅ Connected to event stream');
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = null;
        }
      };

      this.eventSource.onmessage = (event) => {
        try {
          const sseEvent: SSEEvent = JSON.parse(event.data);
          this.handleEvent(sseEvent);
        } catch (error) {
          console.error('[Jxion-SSE] ❌ Failed to parse event:', error);
        }
      };

      this.eventSource.onerror = (error) => {
        console.error('[Jxion-SSE] ❌ SSE connection error:', error);
        this.isConnecting = false;
        this.options.onError(new Error('SSE connection error'));

        if (
          this.options.autoReconnect &&
          this.eventSource?.readyState === EventSource.CLOSED
        ) {
          this.scheduleReconnect();
        }
      };
    } catch (error) {
      this.isConnecting = false;
      console.error('[Jxion-SSE] ❌ Failed to create EventSource:', error);
      this.options.onError(error as Error);

      if (this.options.autoReconnect) {
        this.scheduleReconnect();
      }
    }
  }

  private handleEvent(event: SSEEvent): void {
    console.log(`[Jxion-SSE] 📨 Received event: ${event.type}`, event.data);

    switch (event.type) {
      case 'connection':
        this.options.onConnect(event.data.clientId);
        break;

      case 'translation_update':
        this.options.onTranslationUpdate(event.data.key, event.data.locale);
        break;

      case 'content_update':
        this.options.onContentUpdate(event.data.path);
        break;

      case 'style_update':
        this.options.onStyleUpdate(event.data.componentId, event.data.variant);
        break;

      case 'heartbeat':
        // Heartbeat received, connection is alive
        break;

      default:
        console.warn(`[Jxion-SSE] ⚠️ Unknown event type: ${event.type}`);
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      return; // Already scheduled
    }

    console.log(
      `[Jxion-SSE] 🔄 Scheduling reconnect in ${this.options.reconnectInterval}ms`,
    );

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.eventSource?.readyState === EventSource.CLOSED) {
        console.log('[Jxion-SSE] 🔄 Reconnecting...');
        this.disconnect();
        this.connect();
      }
    }, this.options.reconnectInterval);
  }

  disconnect(): void {
    console.log('[Jxion-SSE] ⏸️ Disconnecting from event stream');

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    this.isConnecting = false;
  }

  isConnected(): boolean {
    return this.eventSource?.readyState === EventSource.OPEN;
  }
}

/**
 * Create and connect an SSE client with default options
 */
export function createSSEClient(options: SSEOptions = {}): SSEClient {
  const client = new SSEClient(options);
  client.connect();
  return client;
}
