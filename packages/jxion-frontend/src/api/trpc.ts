import { createTRPCClient } from "@trpc/client";
import { AppRouter } from "jxion-backend/router/app";

export const trpc = createTRPCClient<AppRouter>({
  url: "http://localhost:8080/trpc",
});
