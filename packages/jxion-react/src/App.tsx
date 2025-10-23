import React, { useEffect } from "react";
import { Hero } from "./components/Hero";
import { useMessages, useGreetings } from "@jxion/core";

function App() {
  const {
    messages,
    isLoading: messagesLoading,
    error: messagesError,
    fetchMessages,
    addMessage,
  } = useMessages();
  const {
    greeting,
    isLoading: greetingLoading,
    error: greetingError,
    fetchGreeting,
  } = useGreetings();

  const handleCtaClick = () => {
    console.log("CTA clicked!");
  };

  useEffect(() => {
    fetchGreeting();
    fetchMessages();
  }, []);

  const isLoading = messagesLoading || greetingLoading;
  const error = messagesError || greetingError;

  return (
    <div className="app">
      <Hero
        title="Jxion Framework test"
        subtitle="React Integration"
        description="Build scalable applications with our professional component library. Now with React support and tRPC backend integration."
        ctaText="Start Building"
        statsValue="100%"
        statsLabel="Type Safe"
        cardSubtitle="Trusted by developers worldwide"
        onCtaClick={handleCtaClick}
      />

      <div className="backend-demo">
        <h2>Backend Integration Demo</h2>

        {isLoading && <div className="loading">Loading...</div>}

        {error && <div className="error">Error: {error}</div>}

        {greeting && (
          <div className="greetings">
            <h3>Greetings from Backend:</h3>
            <p>{greeting.message}</p>
          </div>
        )}

        <div className="messages-section">
          <h3>Messages ({messages.length})</h3>
          <div className="messages">
            {messages.map((message) => (
              <div key={message.id} className="message">
                <strong>{message.user}:</strong> {message.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
