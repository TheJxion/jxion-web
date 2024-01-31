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

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = createJxionClient();

  const fetchMessages = useCallback(
    async (limit: number = 10) => {
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
