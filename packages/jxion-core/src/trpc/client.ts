import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@jxion/backend/router/app";

export const createJxionClient = (
  url: string = "http://localhost:3005/trpc"
) => {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url,
      }),
    ],
  });
};

export type JxionClient = ReturnType<typeof createJxionClient>;
