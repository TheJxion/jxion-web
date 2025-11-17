import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@jxion/backend/router/app';
import { debug } from '../utils/debug';

// Helper to get API URL from environment
const getApiUrl = (): string => {
  if (typeof window !== 'undefined') {
    const env = (window as any).__ENV__;
    if (env?.VITE_API_URL) return `${env.VITE_API_URL}/trpc`;
    if (env?.VITE_API_BASE) return `${env.VITE_API_BASE}/trpc`;
  }
  // Check for process.env (Node.js/CommonJS environments)
  if (typeof process !== 'undefined' && process.env) {
    if (process.env['VITE_API_URL'])
      return `${process.env['VITE_API_URL']}/trpc`;
    if (process.env['VITE_API_BASE'])
      return `${process.env['VITE_API_BASE']}/trpc`;
    if (process.env['NEXT_PUBLIC_API_BASE'])
      return `${process.env['NEXT_PUBLIC_API_BASE']}/trpc`;
  }
  return 'http://localhost:8080/trpc';
};

// Singleton client instance with URL tracking
let clientInstance: ReturnType<typeof createTRPCProxyClient<AppRouter>> | null =
  null;
let clientUrl: string | null = null;

// Reset function to clear singleton (useful for testing or URL changes)
export const resetJxionClient = () => {
  clientInstance = null;
  clientUrl = null;
};

export const createJxionClient = (url?: string) => {
  const finalUrl = url || getApiUrl();
  // Return existing client if it exists and URL matches
  if (clientInstance && clientUrl === finalUrl) {
    debug.trpc('info', 'tRPC client reused (singleton)', {
      operation: 'reuse',
      metadata: {
        url: finalUrl,
        clientType: 'TRPCProxyClient',
        singleton: true,
      },
    });
    return clientInstance;
  }

  // If URL changed, reset the singleton
  if (clientInstance && clientUrl !== finalUrl) {
    debug.trpc('info', 'tRPC client URL changed, recreating', {
      operation: 'recreate',
      metadata: {
        oldUrl: clientUrl,
        newUrl: finalUrl,
      },
    });
    clientInstance = null;
    clientUrl = null;
  }

  debug.startTimer('trpc-client-creation');
  debug.logTrpcOperation('create', 'client', { url: finalUrl });

  clientInstance = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: finalUrl,
      }),
    ],
  });

  debug.trpc('info', 'tRPC client created successfully', {
    operation: 'create',
    metadata: {
      url: finalUrl,
      clientType: 'TRPCProxyClient',
      linksCount: 1,
      singleton: true,
    },
  });

  debug.endTimer('trpc-client-creation', { url: finalUrl });

  // Store the URL for future comparisons
  clientUrl = finalUrl;

  return clientInstance;
};

export type JxionClient = ReturnType<typeof createJxionClient>;
