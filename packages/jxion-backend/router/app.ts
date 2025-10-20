import { initTRPC } from '@trpc/server';
import { z } from 'zod';

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
    id: '1',
    user: 'System',
    message: 'Welcome to Jxion Framework!',
    createdAt: new Date(),
  },
  {
    id: '2',
    user: 'Admin',
    message: 'This is a demo message from the backend.',
    createdAt: new Date(),
  },
];

// App router
export const appRouter = router({
  // Get greetings
  greetings: publicProcedure
    .output(GreetingSchema)
    .query(() => {
      return {
        message: 'Hello from Jxion Framework Backend! 🚀',
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
    .input(z.object({
      user: z.string().min(1),
      message: z.string().min(1),
    }))
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
      return messages.find(msg => msg.id === input) || null;
    }),

  // Delete message
  deleteMessage: publicProcedure
    .input(z.string())
    .output(z.boolean())
    .mutation(({ input }) => {
      const index = messages.findIndex(msg => msg.id === input);
      if (index !== -1) {
        messages.splice(index, 1);
        return true;
      }
      return false;
    }),

  // Get message count
  getMessageCount: publicProcedure
    .output(z.number())
    .query(() => {
      return messages.length;
    }),
});

export type AppRouter = typeof appRouter;
