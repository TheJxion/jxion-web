import { createJxionClient } from "../trpc/client";

export interface Greeting {
  message: string;
}

export class GreetingService {
  private client = createJxionClient();

  async getGreeting(): Promise<Greeting> {
    try {
      return await this.client.greetings.query();
    } catch (error) {
      console.error("Failed to fetch greeting:", error);
      throw error;
    }
  }
}

export const greetingService = new GreetingService();
