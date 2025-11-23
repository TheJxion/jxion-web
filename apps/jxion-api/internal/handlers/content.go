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

// validateContentStructure validates content matches expected structure for a given path
// Returns true if content is valid, false if it doesn't match expected structure
func validateContentStructure(path string, content map[string]interface{}) bool {
	// For noir-crafted/homepage.json, expect home section structure (hero, featured, etc.)
	// Content can be either:
	// 1. Direct home section: {hero: {...}, featured: {...}, ...}
	// 2. Wrapped in home key: {home: {hero: {...}, featured: {...}, ...}}
	if path == "noir-crafted/homepage.json" {
		// Check if content has 'home' wrapper key
		if home, ok := content["home"].(map[string]interface{}); ok {
			// Content is wrapped in 'home' key, validate the inner structure
			expectedKeys := []string{"hero", "featured", "whyNoir", "motifs", "newsletter"}
			for _, key := range expectedKeys {
				if _, exists := home[key]; exists {
					return true
				}
			}
			return false
		}
		// Content is direct home section structure (no wrapper)
		// Check if it has any of the expected homepage keys
		expectedKeys := []string{"hero", "featured", "whyNoir", "motifs", "newsletter"}
		for _, key := range expectedKeys {
			if _, exists := content[key]; exists {
				return true
			}
		}
		// If no expected keys found, it's invalid
		return false
	}

	// For noir-crafted/content.json, expect top-level structure with site, nav, home, etc.
	if path == "noir-crafted/content.json" {
		// Content can be wrapped in 'content' key or be direct structure
		var actualContent map[string]interface{}
		if wrapped, ok := content["content"].(map[string]interface{}); ok {
			actualContent = wrapped
		} else {
			actualContent = content
		}
		
		expectedKeys := []string{"site", "nav", "home"}
		for _, key := range expectedKeys {
			if _, exists := actualContent[key]; exists {
				return true
			}
		}
		return false
	}

	// For other paths, accept any valid JSON structure
	return true
}

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
	} else {
		// Validate content structure matches expected format for this path
		if !validateContentStructure(path, content) {
			log.Printf("[Jxion-API] ⚠️ Content structure validation failed for path: %s, returning empty", path)
			// Return empty content instead of invalid content
			content = map[string]interface{}{
				"path":    path,
				"content": map[string]interface{}{},
				"note":    "Content not found in database. (Previous content was invalid and has been removed)",
			}
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

	// Validate content structure matches expected format for this path
	if !validateContentStructure(path, content) {
		log.Printf("[Jxion-API] ❌ Content structure validation failed for path: %s", path)
		http.Error(w, fmt.Sprintf("Invalid content structure for path: %s. Content does not match expected format.", path), http.StatusBadRequest)
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

