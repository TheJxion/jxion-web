import { createJxionClient } from "../trpc/client";
import { debug } from "../utils/debug";

export interface Message {
  id: string;
  user: string;
  message: string;
  createdAt: string;
}

export interface Greeting {
  message: string;
}

export class MessageService {
  private client = createJxionClient();

  async getMessages(limit: number = 10): Promise<Message[]> {
    debug.startTimer(`messageService-getMessages-${limit}`);
    debug.logTrpcOperation("query", "getMessages", { limit });

    try {
      const result = await this.client.getMessages.query(limit);

      debug.trpc("info", "Successfully fetched messages", {
        operation: "query",
        metadata: {
          endpoint: "getMessages",
          limit,
          resultCount: result.length,
          success: true,
        },
      });

      debug.endTimer(`messageService-getMessages-${limit}`, {
        operation: "getMessages",
        limit,
        resultCount: result.length,
      });

      return result;
    } catch (error) {
      debug.trpc("error", "Failed to fetch messages", {
        operation: "query",
        metadata: {
          endpoint: "getMessages",
          limit,
          error: error instanceof Error ? error.message : "Unknown error",
          success: false,
        },
      });

      debug.endTimer(`messageService-getMessages-${limit}`, {
        operation: "getMessages",
        limit,
        error: true,
      });

      console.error("Failed to fetch messages:", error);
      throw error;
    }
  }

  async addMessage(user: string, message: string): Promise<Message> {
    try {
      return await this.client.addMessage.mutate({ user, message });
    } catch (error) {
      console.error("Failed to add message:", error);
      throw error;
    }
  }

  async getMessage(id: string): Promise<Message | null> {
    try {
      return await this.client.getMessage.query(id);
    } catch (error) {
      console.error("Failed to fetch message:", error);
      throw error;
    }
  }

  async deleteMessage(id: string): Promise<boolean> {
    try {
      return await this.client.deleteMessage.mutate(id);
    } catch (error) {
      console.error("Failed to delete message:", error);
      throw error;
    }
  }

  async getMessageCount(): Promise<number> {
    try {
      return await this.client.getMessageCount.query();
    } catch (error) {
      console.error("Failed to fetch message count:", error);
      throw error;
    }
  }
}

export const messageService = new MessageService();
