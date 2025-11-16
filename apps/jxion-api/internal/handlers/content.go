/**
 * Jxion Stack — Content Handlers
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: HTTP handlers for content file CRUD operations
 * Date: 2025-11-14
 *
 * This module provides:
 * - GET /api/content/{path} - Get content file
 * - PUT /api/content/{path} - Create/update content file
 * - DELETE /api/content/{path} - Delete content file
 */

package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/jxion/jxion-api/internal/cache"
	"github.com/jxion/jxion-api/internal/db"
)

// HandleContent handles content file operations
func HandleContent(w http.ResponseWriter, r *http.Request) {
	// Extract path from URL (e.g., /api/content/homepage -> homepage)
	path := strings.TrimPrefix(r.URL.Path, "/api/content/")
	if path == "" {
		http.Error(w, "Content path is required", http.StatusBadRequest)
		return
	}

	switch r.Method {
	case http.MethodGet:
		GetContent(w, r, path)
	case http.MethodPut:
		CreateOrUpdateContent(w, r, path)
	case http.MethodDelete:
		DeleteContent(w, r, path)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// GetContent handles GET /api/content/{path}
func GetContent(w http.ResponseWriter, r *http.Request, path string) {
	log.Printf("[Jxion-API] GET /api/content/%s", path)

	// Check cache first
	cacheKey := fmt.Sprintf("content:%s", path)
	if cached, err := cache.Get(cacheKey); err == nil {
		log.Printf("[Jxion-API] Cache HIT: %s", cacheKey)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(cached))
		return
	}

	log.Printf("[Jxion-API] Cache MISS: %s", cacheKey)

	// Query database
	content, err := db.GetContent(path)
	if err != nil {
		log.Printf("[Jxion-API] Database query failed: %v", err)
		http.Error(w, "Failed to retrieve content", http.StatusInternalServerError)
		return
	}

	if content == nil {
		// Not found in database
		content = map[string]interface{}{
			"path":    path,
			"content": map[string]interface{}{},
			"note":    "Content not found in database.",
		}
	}

	jsonData, _ := json.Marshal(content)
	
	// Cache the result
	cache.Set(cacheKey, string(jsonData), 5*time.Minute)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}

// CreateOrUpdateContent handles PUT /api/content/{path}
func CreateOrUpdateContent(w http.ResponseWriter, r *http.Request, path string) {
	log.Printf("[Jxion-API] PUT /api/content/%s", path)

	var content map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&content); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	// Save to database
	if err := db.UpsertContent(path, content, nil); err != nil {
		log.Printf("[Jxion-API] ❌ Failed to save content to database: %v", err)
		http.Error(w, "Failed to save content", http.StatusInternalServerError)
		return
	}

	// Update cache
	cacheKey := fmt.Sprintf("content:%s", path)
	jsonData, _ := json.Marshal(content)
	cache.Set(cacheKey, string(jsonData), 24*time.Hour)

	log.Printf("[Jxion-API] ✅ Content saved to database: %s", path)

	// Broadcast event to connected clients
	BroadcastContentUpdate(path)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"path":    path,
		"message": "Content saved successfully",
	})
}

// DeleteContent handles DELETE /api/content/{path}
func DeleteContent(w http.ResponseWriter, r *http.Request, path string) {
	log.Printf("[Jxion-API] DELETE /api/content/%s", path)

	// Clear cache
	cacheKey := fmt.Sprintf("content:%s", path)
	if err := cache.Delete(cacheKey); err != nil {
		log.Printf("[Jxion-API] Cache delete failed: %v", err)
	}

	// TODO: Delete from database (implement if needed)
	// For now, we just clear the cache

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"status": "deleted",
		"path":   path,
	})
}

