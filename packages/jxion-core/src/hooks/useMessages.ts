/**
 * @fileoverview Messages Hook
 *
 * Universal hook for managing messages with tRPC backend integration.
 * Provides type-safe message operations across all frameworks.
 *
 * @author Jxion Framework Team
 * @version 1.0.0
 */

import { useState, useCallback } from "react";
import { createJxionClient } from "../trpc/client";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = createJxionClient();

  const fetchMessages = useCallback(
    async (limit: number = 10) => {
      if (isLoading) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await client.getMessages.query(limit);
        setMessages(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    },
    [client, isLoading]
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
