import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@jxion/backend/router/app";
import { debug } from "../utils/debug";

// Singleton client instance
let clientInstance: ReturnType<typeof createTRPCProxyClient<AppRouter>> | null =
  null;

export const createJxionClient = (
  url: string = "http://localhost:3005/trpc"
) => {
  // Return existing client if it exists
  if (clientInstance) {
    debug.trpc("info", "tRPC client reused (singleton)", {
      operation: "reuse",
      metadata: {
        url,
        clientType: "TRPCProxyClient",
        singleton: true,
      },
    });
    return clientInstance;
  }

  debug.startTimer("trpc-client-creation");
  debug.logTrpcOperation("create", "client", { url });

  clientInstance = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url,
      }),
    ],
  });

  debug.trpc("info", "tRPC client created successfully", {
    operation: "create",
    metadata: {
      url,
      clientType: "TRPCProxyClient",
      linksCount: 1,
      singleton: true,
    },
  });

  debug.endTimer("trpc-client-creation", { url });
  return clientInstance;
};

export type JxionClient = ReturnType<typeof createJxionClient>;
