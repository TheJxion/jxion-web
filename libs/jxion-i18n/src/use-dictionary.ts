/**
 * Jxion Stack — Dictionary Hook
 * Phase Reference: Phase 1 — Dynamic Content Foundations
 * Description: React hook for dictionary (matching ustad use-dictionary.ts pattern)
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getDictionary, getSupportedLocale } from "./get-dictionary";
import type { Locale } from "./i18n-config";

// Dictionary type - matches ustad pattern
export type Dictionary = Record<string, any>;

type UseDictionaryStatus = "idle" | "loading" | "success" | "error";

interface UseDictionaryState {
  dictionary: Dictionary | null;
  status: UseDictionaryStatus;
  error: unknown;
}

export interface UseDictionaryOptions {
  fallbackLocale?: Locale;
  skip?: boolean;
}

export interface UseDictionaryResult {
  dictionary: Dictionary | null;
  status: UseDictionaryStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: unknown;
  locale: Locale;
}

const DEFAULT_STATE: UseDictionaryState = {
  dictionary: null,
  status: "idle",
  error: null,
};

const DEFAULT_FALLBACK_LOCALE: Locale = "en-US";

export const useDictionary = (
  locale?: Locale | string,
  options?: UseDictionaryOptions
): UseDictionaryResult => {
  const fallbackLocale = options?.fallbackLocale ?? DEFAULT_FALLBACK_LOCALE;
  const shouldSkip = options?.skip ?? false;
  const normalizedLocale = useMemo(
    () => getSupportedLocale(locale ?? fallbackLocale),
    [locale, fallbackLocale]
  );

  const [state, setState] = useState<UseDictionaryState>(DEFAULT_STATE);
  const skipRef = useRef<boolean>(shouldSkip);

  useEffect(() => {
    skipRef.current = shouldSkip;
  }, [shouldSkip]);

  useEffect(() => {
    if (skipRef.current) {
      setState(DEFAULT_STATE);
      return;
    }

    let isMounted = true;
    setState((previous) => ({
      ...previous,
      status: "loading",
      error: null,
    }));

    const loadDictionary = async () => {
      try {
        const dictionary = (await getDictionary(normalizedLocale)) as
          | Dictionary
          | undefined;
        if (!isMounted) return;

        setState({
          dictionary: dictionary ?? null,
          status: "success",
          error: null,
        });
      } catch (error) {
        if (!isMounted) return;

        setState({
          dictionary: null,
          status: "error",
          error,
        });
      }
    };

    loadDictionary();

    return () => {
      isMounted = false;
    };
  }, [normalizedLocale]);

  const { dictionary, status, error } = state;

  return {
    dictionary,
    status,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    error,
    locale: normalizedLocale,
  };
};
