import { Component, onMount, createSignal } from "solid-js";
import Hero from "./components/Hero";
import { messageService, greetingService } from "@jxion/core";
import "./App.css";

const App: Component = () => {
  const [messages, setMessages] = createSignal<
    Array<{ id: string; user: string; message: string }>
  >([]);
  const [greeting, setGreeting] = createSignal<{ message: string } | null>(
    null
  );
  const [messagesLoading, setMessagesLoading] = createSignal(false);
  const [greetingLoading, setGreetingLoading] = createSignal(false);
  const [messagesError, setMessagesError] = createSignal<string | null>(null);
  const [greetingError, setGreetingError] = createSignal<string | null>(null);

  const fetchMessages = async () => {
    try {
      setMessagesLoading(true);
      setMessagesError(null);
      const data = await messageService.getMessages();
      setMessages(data);
    } catch (err: any) {
      setMessagesError(err?.message ?? "Failed to fetch messages");
    } finally {
      setMessagesLoading(false);
    }
  };

  const fetchGreeting = async () => {
    try {
      setGreetingLoading(true);
      setGreetingError(null);
      const data = await greetingService.getGreeting();
      setGreeting(data);
    } catch (err: any) {
      setGreetingError(err?.message ?? "Failed to fetch greeting");
    } finally {
      setGreetingLoading(false);
    }
  };

  const handleCtaClick = () => {
    console.log("CTA clicked!");
  };

  onMount(() => {
    fetchGreeting();
    fetchMessages();
  });

  const isLoading = () => messagesLoading() || greetingLoading();
  const error = () => messagesError() || greetingError();

  return (
    <div class="app">
      <Hero
        title="Jxion Framework"
        subtitle="SolidJS Integration"
        description="Build scalable applications with our professional component library. Now with SolidJS support and tRPC backend integration."
        ctaText="Start Building"
        statsValue="100%"
        statsLabel="Type Safe"
        cardSubtitle="Trusted by developers worldwide"
        onCtaClick={handleCtaClick}
      />

      <div class="backend-demo">
        <h2>Backend Integration Demo</h2>

        {isLoading() && <div class="loading">Loading...</div>}

        {error() && <div class="error">Error: {error()}</div>}

        {greeting() && (
          <div class="greetings">
            <h3>Greetings from Backend:</h3>
            <p>{greeting()?.message}</p>
          </div>
        )}

        <div class="messages-section">
          <h3>Messages ({messages().length})</h3>
          <div class="messages">
            {messages().map((message) => (
              <div key={message.id} class="message">
                <strong>{message.user}:</strong> {message.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
