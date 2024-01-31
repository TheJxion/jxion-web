import { useState, useCallback } from "react";
import { createJxionClient } from "../trpc/client";

export interface Greeting {
  message: string;
}

export const useGreetings = () => {
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = createJxionClient();

  const fetchGreeting = useCallback(async () => {
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
  }, [client]);

  return {
    greeting,
    isLoading,
    error,
    fetchGreeting,
  };
};
