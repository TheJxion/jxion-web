"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = exports.publicProcedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
// Initialize tRPC
const t = server_1.initTRPC.create();
// Export router and procedure helpers
exports.router = t.router;
exports.publicProcedure = t.procedure;
// Message schema
const MessageSchema = zod_1.z.object({
    id: zod_1.z.string(),
    user: zod_1.z.string(),
    message: zod_1.z.string(),
    createdAt: zod_1.z.date(),
});
// Greeting schema
const GreetingSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
// In-memory storage for demo purposes
let messages = [
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
exports.appRouter = (0, exports.router)({
    // Get greetings
    greetings: exports.publicProcedure
        .output(GreetingSchema)
        .query(() => {
        return {
            message: 'Hello from Jxion Framework Backend! 🚀',
        };
    }),
    // Get messages
    getMessages: exports.publicProcedure
        .input(zod_1.z.number().min(1).max(100).default(10))
        .output(zod_1.z.array(MessageSchema))
        .query(({ input }) => {
        return messages.slice(0, input);
    }),
    // Add message
    addMessage: exports.publicProcedure
        .input(zod_1.z.object({
        user: zod_1.z.string().min(1),
        message: zod_1.z.string().min(1),
    }))
        .output(MessageSchema)
        .mutation(({ input }) => {
        const newMessage = {
            id: (messages.length + 1).toString(),
            user: input.user,
            message: input.message,
            createdAt: new Date(),
        };
        messages.unshift(newMessage);
        return newMessage;
    }),
    // Get message by ID
    getMessage: exports.publicProcedure
        .input(zod_1.z.string())
        .output(MessageSchema.nullable())
        .query(({ input }) => {
        return messages.find(msg => msg.id === input) || null;
    }),
    // Delete message
    deleteMessage: exports.publicProcedure
        .input(zod_1.z.string())
        .output(zod_1.z.boolean())
        .mutation(({ input }) => {
        const index = messages.findIndex(msg => msg.id === input);
        if (index !== -1) {
            messages.splice(index, 1);
            return true;
        }
        return false;
    }),
    // Get message count
    getMessageCount: exports.publicProcedure
        .output(zod_1.z.number())
        .query(() => {
        return messages.length;
    }),
});
