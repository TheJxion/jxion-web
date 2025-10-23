/**
 * @fileoverview Greetings Hook
 * 
 * Universal hook for fetching greetings from tRPC backend.
 * Provides type-safe greeting operations across all frameworks.
 * 
 * @author Jxion Framework Team
 * @version 1.0.0
 */

import { useState, useCallback } from "react";
import { createJxionClient } from "../trpc/client";

export interface Greeting {
  message: string;
}

/**
 * Hook for managing greetings with tRPC backend
 * 
 * @returns Object containing greeting state and operations
 * @todo(@janberk) Add greeting caching for improved performance
 * @todo(@janberk) Implement greeting refresh mechanism
 */
export const useGreetings = () => {
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = createJxionClient();

  const fetchGreeting = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await client.greetings.query();
      setGreeting(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [client, isLoading]);

  return {
    greeting,
    isLoading,
    error,
    fetchGreeting,
  };
};
