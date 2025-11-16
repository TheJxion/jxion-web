/**
 * Jxion Stack — Server-Sent Events (SSE) Handler
 * Phase Reference: Phase 4 — Database Persistence & Production
 * Feature: Real-time event broadcasting for translation/content/style updates
 * Date: 2025-11-14
 *
 * This module provides:
 * - SSE endpoint for real-time updates
 * - Event broadcasting to connected clients
 * - Event types: translation_update, content_update, style_update
 */

package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"
)

// Event types
const (
	EventTypeTranslationUpdate = "translation_update"
	EventTypeContentUpdate     = "content_update"
	EventTypeStyleUpdate       = "style_update"
)

// Event represents a broadcast event
type Event struct {
	Type      string                 `json:"type"`
	Timestamp time.Time              `json:"timestamp"`
	Data      map[string]interface{} `json:"data"`
}

// Client represents a connected SSE client
type Client struct {
	id     string
	writer http.ResponseWriter
	flusher http.Flusher
	done   chan bool
}

// EventBroadcaster manages SSE clients and broadcasts events
type EventBroadcaster struct {
	clients map[string]*Client
	mutex   sync.RWMutex
}

var broadcaster = &EventBroadcaster{
	clients: make(map[string]*Client),
}

// HandleSSE handles GET /api/events (SSE endpoint)
func HandleSSE(w http.ResponseWriter, r *http.Request) {
	log.Println("[Jxion-API] SSE connection request")

	// Set headers for SSE
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Cache-Control")

	// Get flusher
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming not supported", http.StatusInternalServerError)
		return
	}

	// Generate client ID
	clientID := fmt.Sprintf("client-%d", time.Now().UnixNano())

	// Create client
	client := &Client{
		id:      clientID,
		writer:  w,
		flusher: flusher,
		done:    make(chan bool),
	}

	// Register client
	broadcaster.mutex.Lock()
	broadcaster.clients[clientID] = client
	broadcaster.mutex.Unlock()

	log.Printf("[Jxion-API] ✅ SSE client connected: %s (total: %d)", clientID, len(broadcaster.clients))

	// Send initial connection event
	sendEvent(w, flusher, Event{
		Type:      "connection",
		Timestamp: time.Now(),
		Data: map[string]interface{}{
			"clientId": clientID,
			"message":  "Connected to Jxion event stream",
		},
	})

	// Keep connection alive with heartbeat
	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	// Wait for client disconnect or context cancellation
	select {
	case <-r.Context().Done():
		log.Printf("[Jxion-API] SSE client disconnected (context): %s", clientID)
	case <-client.done:
		log.Printf("[Jxion-API] SSE client disconnected (done): %s", clientID)
	case <-ticker.C:
		// Send heartbeat
		sendEvent(w, flusher, Event{
			Type:      "heartbeat",
			Timestamp: time.Now(),
			Data:      map[string]interface{}{"clientId": clientID},
		})
	}

	// Unregister client
	broadcaster.mutex.Lock()
	delete(broadcaster.clients, clientID)
	broadcaster.mutex.Unlock()

	log.Printf("[Jxion-API] ⏸️ SSE client removed: %s (remaining: %d)", clientID, len(broadcaster.clients))
}

// BroadcastEvent broadcasts an event to all connected clients
func BroadcastEvent(eventType string, data map[string]interface{}) {
	event := Event{
		Type:      eventType,
		Timestamp: time.Now(),
		Data:      data,
	}

	broadcaster.mutex.RLock()
	clients := make([]*Client, 0, len(broadcaster.clients))
	for _, client := range broadcaster.clients {
		clients = append(clients, client)
	}
	broadcaster.mutex.RUnlock()

	log.Printf("[Jxion-API] 📡 Broadcasting event: %s to %d clients", eventType, len(clients))

	for _, client := range clients {
		if err := sendEvent(client.writer, client.flusher, event); err != nil {
			log.Printf("[Jxion-API] ⚠️ Failed to send event to client %s: %v", client.id, err)
			// Mark client as done to remove it
			select {
			case client.done <- true:
			default:
			}
		}
	}
}

// sendEvent sends a single SSE event
func sendEvent(w http.ResponseWriter, flusher http.Flusher, event Event) error {
	// Serialize event to JSON
	eventJSON, err := json.Marshal(event)
	if err != nil {
		return fmt.Errorf("failed to marshal event: %w", err)
	}

	// Write SSE format: "data: {json}\n\n"
	_, err = fmt.Fprintf(w, "data: %s\n\n", eventJSON)
	if err != nil {
		return fmt.Errorf("failed to write event: %w", err)
	}

	// Flush to send immediately
	flusher.Flush()

	return nil
}

// BroadcastTranslationUpdate broadcasts a translation update event
func BroadcastTranslationUpdate(key, locale string) {
	BroadcastEvent(EventTypeTranslationUpdate, map[string]interface{}{
		"key":    key,
		"locale": locale,
	})
}

// BroadcastContentUpdate broadcasts a content update event
func BroadcastContentUpdate(path string) {
	BroadcastEvent(EventTypeContentUpdate, map[string]interface{}{
		"path": path,
	})
}

// BroadcastStyleUpdate broadcasts a style update event
func BroadcastStyleUpdate(componentId, variant string) {
	BroadcastEvent(EventTypeStyleUpdate, map[string]interface{}{
		"componentId": componentId,
		"variant":     variant,
	})
}

