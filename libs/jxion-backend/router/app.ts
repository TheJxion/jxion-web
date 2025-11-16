import { initTRPC } from "@trpc/server";
import { z } from "zod";

// Initialize tRPC
const t = initTRPC.create();

// Export router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Message schema
const MessageSchema = z.object({
  id: z.string(),
  user: z.string(),
  message: z.string(),
  createdAt: z.date(),
});

// Greeting schema
const GreetingSchema = z.object({
  message: z.string(),
});

// In-memory storage for demo purposes
let messages: z.infer<typeof MessageSchema>[] = [
  {
    id: "1",
    user: "System",
    message: "Welcome to Jxion Framework!",
    createdAt: new Date(),
  },
  {
    id: "2",
    user: "Admin",
    message: "This is a demo message from the backend.",
    createdAt: new Date(),
  },
];

// App router
export const appRouter = router({
  // Get greetings
  greetings: publicProcedure.output(GreetingSchema).query(() => {
    return {
      message: "Hello from Jxion Framework Backend! 🚀",
    };
  }),

  // Get messages
  getMessages: publicProcedure
    .input(z.number().min(1).max(100).default(10))
    .output(z.array(MessageSchema))
    .query(({ input }) => {
      return messages.slice(0, input);
    }),

  // Add message
  addMessage: publicProcedure
    .input(
      z.object({
        user: z.string().min(1),
        message: z.string().min(1),
      })
    )
    .output(MessageSchema)
    .mutation(({ input }) => {
      const newMessage: z.infer<typeof MessageSchema> = {
        id: (messages.length + 1).toString(),
        user: input.user,
        message: input.message,
        createdAt: new Date(),
      };

      messages.unshift(newMessage);
      return newMessage;
    }),

  // Get message by ID
  getMessage: publicProcedure
    .input(z.string())
    .output(MessageSchema.nullable())
    .query(({ input }) => {
      return messages.find((msg) => msg.id === input) || null;
    }),

  // Delete message
  deleteMessage: publicProcedure
    .input(z.string())
    .output(z.boolean())
    .mutation(({ input }) => {
      const index = messages.findIndex((msg) => msg.id === input);
      if (index !== -1) {
        messages.splice(index, 1);
        return true;
      }
      return false;
    }),

  // Get message count
  getMessageCount: publicProcedure.output(z.number()).query(() => {
    return messages.length;
  }),

  // ============================================
  // Phase 1: Translation API Endpoints
  // ============================================

  // Get translation by key
  getTranslation: publicProcedure
    .input(
      z.object({
        key: z.string(),
        locale: z.enum(["tr-TR", "en-US"]),
      })
    )
    .output(z.string())
    .query(async ({ input }) => {
      console.log(
        `[Jxion-Backend] GET translation: ${input.key} (${input.locale})`
      );
      // TODO: Replace with database query in production
      // For now, return the key as placeholder
      return input.key;
    }),

  // Get multiple translations
  getTranslations: publicProcedure
    .input(
      z.object({
        keys: z.array(z.string()),
        locale: z.enum(["tr-TR", "en-US"]),
      })
    )
    .output(z.record(z.string(), z.string()))
    .query(async ({ input }) => {
      console.log(
        `[Jxion-Backend] GET translations: ${input.keys.length} keys (${input.locale})`
      );
      // TODO: Replace with database query in production
      const result: Record<string, string> = {};
      for (const key of input.keys) {
        result[key] = key; // Placeholder
      }
      return result;
    }),

  // Update translation
  updateTranslation: publicProcedure
    .input(
      z.object({
        key: z.string(),
        locale: z.enum(["tr-TR", "en-US"]),
        value: z.string(),
      })
    )
    .output(
      z.object({
        success: z.boolean(),
        key: z.string(),
        locale: z.string(),
        value: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(
        `[Jxion-Backend] UPDATE translation: ${input.key} (${input.locale}) = "${input.value}"`
      );
      // TODO: Save to database in production
      // TODO: Add audit trail
      return {
        success: true,
        key: input.key,
        locale: input.locale,
        value: input.value,
      };
    }),

  // Update multiple translations
  updateTranslations: publicProcedure
    .input(
      z.object({
        translations: z.array(
          z.object({
            key: z.string(),
            locale: z.enum(["tr-TR", "en-US"]),
            value: z.string(),
          })
        ),
      })
    )
    .output(
      z.object({
        success: z.boolean(),
        updated: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(
        `[Jxion-Backend] UPDATE translations: ${input.translations.length} entries`
      );
      // TODO: Batch save to database in production
      // TODO: Add audit trail
      return {
        success: true,
        updated: input.translations.length,
      };
    }),

  // Clear translation cache
  clearTranslationCache: publicProcedure
    .input(
      z.object({
        locale: z.enum(["tr-TR", "en-US"]).optional(),
      })
    )
    .output(
      z.object({
        success: z.boolean(),
        cleared: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(
        `[Jxion-Backend] CLEAR cache: ${input.locale || "all locales"}`
      );
      // TODO: Clear Redis cache in production
      return {
        success: true,
        cleared: input.locale || "all",
      };
    }),

  // ============================================
  // Phase 2: Style Loader API Endpoints
  // ============================================

  // Get styles for component
  getStyles: publicProcedure
    .input(
      z.object({
        componentId: z.string(),
        variant: z.string().optional(),
        theme: z.enum(["light", "dark", "custom"]).default("light"),
      })
    )
    .output(
      z.object({
        css: z.string(),
        componentId: z.string(),
        variant: z.string().optional(),
        theme: z.string(),
      })
    )
    .query(async ({ input }) => {
      console.log(
        `[Jxion-Backend] GET styles: ${input.componentId} (variant: ${
          input.variant || "default"
        }, theme: ${input.theme})`
      );
      // TODO: Generate CSS from tokens and component metadata
      // TODO: Cache in Redis
      return {
        css: `/* Styles for ${input.componentId} */`,
        componentId: input.componentId,
        variant: input.variant,
        theme: input.theme,
      };
    }),

  // Clear style cache
  clearStyleCache: publicProcedure
    .input(
      z.object({
        componentId: z.string().optional(),
      })
    )
    .output(
      z.object({
        success: z.boolean(),
        cleared: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(
        `[Jxion-Backend] CLEAR style cache: ${
          input.componentId || "all components"
        }`
      );
      // TODO: Clear Redis cache in production
      return {
        success: true,
        cleared: input.componentId || "all",
      };
    }),
});

export type AppRouter = typeof appRouter;
