package services

import (
	"fmt"
	"log"
	"net/http"
	"sync"
)

// EventService handles Server-Sent Events broadcasting.
type EventService struct {
	mu      sync.RWMutex
	clients map[int]chan string
	nextID  int
}

// NewEventService instantiates the SSE broadcaster.
func NewEventService() *EventService {
	return &EventService{
		clients: make(map[int]chan string),
	}
}

// HTTPHandler attaches a client using the SSE protocol.
func (s *EventService) HTTPHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}

	ch := make(chan string, 1)

	s.mu.Lock()
	clientID := s.nextID
	s.nextID++
	s.clients[clientID] = ch
	s.mu.Unlock()

	log.Printf("[events] client %d connected", clientID)

	// Ensure we remove the client when done.
	defer func() {
		s.mu.Lock()
		delete(s.clients, clientID)
		s.mu.Unlock()
		close(ch)
		log.Printf("[events] client %d disconnected", clientID)
	}()

	ctx := r.Context()

	for {
		select {
		case <-ctx.Done():
			return
		case msg := <-ch:
			fmt.Fprintf(w, "data: %s\n\n", msg)
			flusher.Flush()
		}
	}
}

// BroadcastUpdate notifies all connected clients about an updated content id.
func (s *EventService) BroadcastUpdate(contentID string) {
	payload := fmt.Sprintf(`{"type":"content_update","id":"%s"}`, contentID)

	s.mu.RLock()
	defer s.mu.RUnlock()

	for id, client := range s.clients {
		select {
		case client <- payload:
		default:
			log.Printf("[events] dropping event for client %d (slow consumer)", id)
		}
	}
}
