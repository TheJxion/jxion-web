/**
 * Jxion Stack — Go API Handlers
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: HTTP handlers for style generation operations
 * Date: 2025-11-14
 *
 * This module provides:
 * - POST /api/styles/{componentId} - Generate styles for a component
 * - DELETE /api/styles/cache - Clear style cache
 */

package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/jxion/jxion-api/internal/cache"
	"github.com/jxion/jxion-api/internal/db"
)

// GetStyles handles POST /api/styles/{componentId}
func GetStyles(w http.ResponseWriter, r *http.Request) {
	componentID := r.URL.Path[len("/api/styles/"):]
	log.Printf("[Jxion-API] POST /api/styles/%s", componentID)

	var body struct {
		Variant string `json:"variant"`
		Theme   string `json:"theme"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// TODO: Check cache first
	cacheKey := fmt.Sprintf("style:%s:%s:%s", componentID, body.Variant, body.Theme)
	if cached, err := cache.Get(cacheKey); err == nil {
		log.Printf("[Jxion-API] Cache HIT: %s", cacheKey)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(cached))
		return
	}

	log.Printf("[Jxion-API] Cache MISS: %s", cacheKey)

	// Query database for stored styles
	styles, err := db.GetStyle(componentID, body.Variant, "")
	if err != nil {
		log.Printf("[Jxion-API] Database query failed: %v", err)
	}

	if styles == nil {
		// Not found in database, return default/empty styles
		styles = map[string]interface{}{
			"tailwind": "",
			"custom":   "",
		}
	}

	response := map[string]interface{}{
		"css":         styles["custom"],
		"tailwind":    styles["tailwind"],
		"componentId": componentID,
		"variant":     body.Variant,
		"theme":       body.Theme,
	}

	// Cache the result
	jsonData, _ := json.Marshal(response)
	cache.Set(cacheKey, string(jsonData), 10*time.Minute)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// UpdateStyles handles PUT /api/styles/{componentId}
func UpdateStyles(w http.ResponseWriter, r *http.Request) {
	componentID := r.URL.Path[len("/api/styles/"):]
	log.Printf("[Jxion-API] PUT /api/styles/%s", componentID)

	var body struct {
		Variant   string                 `json:"variant"`
		ClassName string                 `json:"className"`
		Styles    map[string]interface{} `json:"styles"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate styles structure
	if body.Styles == nil {
		body.Styles = make(map[string]interface{})
	}

	// Ensure tailwind and custom fields exist
	if _, ok := body.Styles["tailwind"]; !ok {
		body.Styles["tailwind"] = ""
	}
	if _, ok := body.Styles["custom"]; !ok {
		body.Styles["custom"] = ""
	}

	// Save to database
	if err := db.UpsertStyle(componentID, body.Variant, body.ClassName, body.Styles, nil); err != nil {
		log.Printf("[Jxion-API] ❌ Failed to save styles to database: %v", err)
		http.Error(w, "Failed to save styles", http.StatusInternalServerError)
		return
	}

	log.Printf("[Jxion-API] ✅ Styles saved to database: %s (variant: %s)", componentID, body.Variant)

	// Clear cache for this component
	cacheKey := fmt.Sprintf("style:%s:%s:*", componentID, body.Variant)
	if err := cache.DeletePattern(cacheKey); err != nil {
		log.Printf("[Jxion-API] Warning: Cache clear failed: %v", err)
	}

	// Broadcast event to connected clients
	BroadcastStyleUpdate(componentID, body.Variant)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":     true,
		"componentId": componentID,
		"variant":    body.Variant,
		"message":    "Styles saved successfully",
	})
}

// ClearStyleCache handles DELETE /api/styles/cache
func ClearStyleCache(w http.ResponseWriter, r *http.Request) {
	log.Println("[Jxion-API] DELETE /api/styles/cache")

	componentID := r.URL.Query().Get("componentId")
	pattern := "style:*"
	if componentID != "" {
		pattern = fmt.Sprintf("style:%s:*", componentID)
	}

	if err := cache.DeletePattern(pattern); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "cache cleared"})
}

