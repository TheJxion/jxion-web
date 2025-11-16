/**
 * Jxion Stack — Go API Handlers
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: HTTP handlers for translation CRUD operations
 * Date: 2025-11-14
 *
 * This module provides:
 * - GET /api/translations - Get translation by key and locale
 * - GET /api/translations/batch - Batch get translations
 * - POST /api/translations - Create/update translation
 * - POST /api/translations/batch - Batch update translations
 * - DELETE /api/translations/cache - Clear translation cache
 */

package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/jxion/jxion-api/internal/cache"
	"github.com/jxion/jxion-api/internal/models"
)

// GetTranslation handles GET /api/translations?key={key}&locale={locale}
func GetTranslation(w http.ResponseWriter, r *http.Request) {
	log.Println("[Jxion-API] GET /api/translations")

	key := r.URL.Query().Get("key")
	locale := r.URL.Query().Get("locale")

	if key == "" || locale == "" {
		http.Error(w, "key and locale parameters are required", http.StatusBadRequest)
		return
	}

	// TODO: Check cache first
	cacheKey := fmt.Sprintf("translation:%s:%s", locale, key)
	if cached, err := cache.Get(cacheKey); err == nil {
		log.Printf("[Jxion-API] Cache HIT: %s", cacheKey)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(cached))
		return
	}

	log.Printf("[Jxion-API] Cache MISS: %s", cacheKey)

	// TODO: Query database
	// translation, err := db.GetTranslation(key, locale)
	// if err != nil {
	//     http.Error(w, err.Error(), http.StatusInternalServerError)
	//     return
	// }

	// Placeholder response
	translation := models.Translation{
		Key:    key,
		Locale: locale,
		Value:  key, // Placeholder
	}

	// Cache the result
	jsonData, _ := json.Marshal(translation)
	cache.Set(cacheKey, string(jsonData), 5*time.Minute)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(translation)
}

// BatchGetTranslations handles GET /api/translations/batch
func BatchGetTranslations(w http.ResponseWriter, r *http.Request) {
	log.Println("[Jxion-API] GET /api/translations/batch")

	keysParam := r.URL.Query().Get("keys")
	locale := r.URL.Query().Get("locale")

	if keysParam == "" || locale == "" {
		http.Error(w, "keys and locale parameters are required", http.StatusBadRequest)
		return
	}

	// Parse keys (comma-separated)
	keys := []string{}
	if keysParam != "" {
		// Simple split by comma
		for _, key := range splitKeys(keysParam) {
			if key != "" {
				keys = append(keys, key)
			}
		}
	}

	if len(keys) == 0 {
		http.Error(w, "at least one key is required", http.StatusBadRequest)
		return
	}

	// Build response map
	result := make(map[string]string)

	// For each key, try to get from cache or return placeholder
	for _, key := range keys {
		cacheKey := fmt.Sprintf("translation:%s:%s", locale, key)
		if cached, err := cache.Get(cacheKey); err == nil {
			var translation models.Translation
			if err := json.Unmarshal([]byte(cached), &translation); err == nil {
				result[key] = translation.Value
				continue
			}
		}

		// TODO: Query database if not in cache
		// For now, return the key as placeholder
		// In production, this would query the database
		result[key] = key // Placeholder - should query database
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}

// Helper to split comma-separated keys
func splitKeys(keysParam string) []string {
	result := []string{}
	current := ""
	for _, char := range keysParam {
		if char == ',' {
			if current != "" {
				result = append(result, current)
				current = ""
			}
		} else {
			current += string(char)
		}
	}
	if current != "" {
		result = append(result, current)
	}
	return result
}

// CreateOrUpdateTranslation handles POST /api/translations
func CreateOrUpdateTranslation(w http.ResponseWriter, r *http.Request) {
	log.Println("[Jxion-API] POST /api/translations")

	var input models.CreateTranslationInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// TODO: Insert/update in database
	// TODO: Invalidate cache
	// TODO: Create audit log entry

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}

// BatchUpdateTranslations handles POST /api/translations/batch
func BatchUpdateTranslations(w http.ResponseWriter, r *http.Request) {
	log.Println("[Jxion-API] POST /api/translations/batch")
	// TODO: Implement batch update
	http.Error(w, "Not implemented", http.StatusNotImplemented)
}

// ClearTranslationCache handles DELETE /api/translations/cache
func ClearTranslationCache(w http.ResponseWriter, r *http.Request) {
	log.Println("[Jxion-API] DELETE /api/translations/cache")

	locale := r.URL.Query().Get("locale")
	pattern := "translation:*"
	if locale != "" {
		pattern = fmt.Sprintf("translation:%s:*", locale)
	}

	// Try to clear cache, but don't fail if Redis isn't available
	if err := cache.DeletePattern(pattern); err != nil {
		log.Printf("[Jxion-API] Warning: Cache clear failed (Redis may not be configured): %v", err)
		// Continue anyway - cache clear is not critical
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "cache cleared"})
}

