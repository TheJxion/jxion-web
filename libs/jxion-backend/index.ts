/**
 * Jxion Stack — Backend Package
 * Phase Reference: Phase 1 — Dynamic Content Foundations, Phase 2 — Component Registry & Styling Runtime
 * Description: API routes for translations, AI suggestions, styles
 *
 * This package provides:
 * - Translation CRUD API endpoints (Phase 1)
 * - Style loader service endpoints (Phase 2)
 * - AI assistant API integration (Phase 4)
 * - tRPC router for type-safe API contracts
 *
 * TODO (Phase 1): Implement translation reading/writing API with file + future DB adapters
 * TODO (Phase 1): Add audit trails for translation updates
 * TODO (Phase 2): Implement runtime style loader endpoint + caching headers
 * TODO (Phase 4): Build AI-powered developer assistant API
 */

import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router/app";
import cors from "cors";

const main = async () => {
  const app = express();
  app.use(cors());
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3005;

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: () => ({}),
    })
  );

  // Phase 2: Style loader endpoint
  app.post("/api/styles/:componentId", async (req, res) => {
    const { componentId } = req.params;
    const { variant, theme } = req.body;
    console.log(
      `[Jxion-Backend] Style request: ${componentId} (variant: ${variant}, theme: ${theme})`
    );
    // TODO: Generate CSS from tokens
    res.json({ css: `/* Styles for ${componentId} */` });
  });

  app.listen(port, () => {
    console.log(`api-server listening at http://localhost:${port}`);
  });
};

main();
