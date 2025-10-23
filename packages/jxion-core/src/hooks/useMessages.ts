/**
 * @fileoverview Messages Hook
 *
 * Universal hook for managing messages with tRPC backend integration.
 * Provides type-safe message operations across all frameworks.
 *
 * @author Jxion Framework Team
 * @version 1.0.0
 */

import { useState, useCallback, useMemo, useRef } from "react";
import { createJxionClient } from "../trpc/client";
import { debug } from "../utils/debug";

export interface Message {
  id: string;
  user: string;
  message: string;
}

export interface Greeting {
  message: string;
}

/**
 * Hook for managing messages with tRPC backend
 *
 * @returns Object containing messages state and operations
 * @todo(@janberk) Add message pagination support
 * @todo(@janberk) Implement optimistic updates for better UX
 */
export const useMessages = () => {
  const initializedRef = useRef(false);

  if (!initializedRef.current) {
    debug.component("info", "Initializing useMessages hook", {
      operation: "initialize",
      metadata: { hookName: "useMessages" },
    });
    initializedRef.current = true;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = useMemo(() => createJxionClient(), []);

  const fetchMessages = useCallback(
    async (limit: number = 10) => {
      if (isLoading) {
        debug.component("warn", "fetchMessages called while already loading", {
          operation: "fetchMessages",
          metadata: { limit, isLoading: true },
        });
        return;
      }

      debug.startTimer(`useMessages-fetchMessages-${limit}`);
      debug.component("info", "Starting to fetch messages", {
        operation: "fetchMessages",
        metadata: { limit, currentMessageCount: messages.length },
      });

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.getMessages.query(limit);
        setMessages(result);

        debug.component("info", "Successfully fetched messages", {
          operation: "fetchMessages",
          metadata: {
            limit,
            resultCount: result.length,
            success: true,
          },
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);

        debug.component("error", "Failed to fetch messages", {
          operation: "fetchMessages",
          metadata: {
            limit,
            error: errorMessage,
            success: false,
          },
        });
      } finally {
        setIsLoading(false);
        debug.endTimer(`useMessages-fetchMessages-${limit}`, {
          operation: "fetchMessages",
          limit,
        });
      }
    },
    [client]
  );

  const addMessage = useCallback(
    async (user: string, message: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await client.addMessage.mutate({ user, message });
        await fetchMessages();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    },
    [client, fetchMessages]
  );

  return {
    messages,
    isLoading,
    error,
    fetchMessages,
    addMessage,
  };
};
