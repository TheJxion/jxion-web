/**
 * Jxion Stack — tRPC Compatibility Handler
 * Description: tRPC-compatible endpoints for frontend compatibility
 */

package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/jxion/jxion-api/internal/cache"
	"github.com/jxion/jxion-api/internal/db"
	"github.com/jxion/jxion-api/internal/models"
)

// tRPC request structure
type TRPCRequest struct {
	Keys         []string `json:"keys"`
	Locale       string   `json:"locale"`
	Key          string   `json:"key"`
	Value        string   `json:"value"`
	Translations []struct {
		Key    string `json:"key"`
		Locale string `json:"locale"`
		Value  string `json:"value"`
	} `json:"translations"`
}

// tRPC response structure
type TRPCResponse struct {
	Result struct {
		Data interface{} `json:"data"`
	} `json:"result"`
}

// Handle tRPC getTranslations endpoint
func HandleTRPCGetTranslations(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Read request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Parse request
	var req TRPCRequest
	if err := json.Unmarshal(body, &req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	log.Printf("[Jxion-API] tRPC getTranslations: %d keys for locale %s", len(req.Keys), req.Locale)

	// Build response map
	result := make(map[string]string)
	
	// Try to get from database first
	dbResults, err := db.GetTranslations(req.Keys, req.Locale, nil)
	if err != nil {
		log.Printf("[Jxion-API] Warning: Database query failed, falling back to cache/memory: %v", err)
	} else {
		// Store in cache for future requests
		for key, value := range dbResults {
			result[key] = value
			cacheKey := fmt.Sprintf("translation:%s:%s", req.Locale, key)
			translationJSON, _ := json.Marshal(models.Translation{
				Key:    key,
				Locale: req.Locale,
				Value:  value,
			})
			cache.Set(cacheKey, string(translationJSON), 24*time.Hour)
		}
	}
	
	// For keys not in database, check cache
	for _, key := range req.Keys {
		if _, alreadyFound := result[key]; alreadyFound {
			continue // Already got from database
		}
		
		// Check cache
		cacheKey := fmt.Sprintf("translation:%s:%s", req.Locale, key)
		if cached, err := cache.Get(cacheKey); err == nil {
			var translation models.Translation
			if err := json.Unmarshal([]byte(cached), &translation); err == nil {
				result[key] = translation.Value
				continue
			}
		}

		// Not found in database or cache - return placeholder
		// The frontend will fall back to dictionary files
		result[key] = key // Placeholder
	}

	// Wrap in tRPC response format
	trpcResp := TRPCResponse{}
	trpcResp.Result.Data = result

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(trpcResp)
}

// Handle tRPC getTranslation endpoint (single translation)
func HandleTRPCGetTranslation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Read request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Parse request
	var req TRPCRequest
	if err := json.Unmarshal(body, &req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Call the single translation handler
	r.URL.RawQuery = "key=" + req.Key + "&locale=" + req.Locale
	r.Method = http.MethodGet

	recorder := &responseRecorder{
		ResponseWriter: w,
		statusCode:     http.StatusOK,
	}

	GetTranslation(recorder, r)

	if recorder.statusCode == http.StatusOK {
		var translationData map[string]string
		if err := json.Unmarshal(recorder.body, &translationData); err == nil {
			// Extract the value
			value := ""
			if val, ok := translationData["value"]; ok {
				value = val
			} else if len(translationData) > 0 {
				// Get first value if structure is different
				for _, v := range translationData {
					value = v
					break
				}
			}

			// Wrap in tRPC response format
			trpcResp := TRPCResponse{}
			trpcResp.Result.Data = value

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(trpcResp)
			return
		}
	}

	w.WriteHeader(recorder.statusCode)
	w.Write(recorder.body)
}

// Helper function to join keys for query string
func joinKeys(keys []string) string {
	result := ""
	for i, key := range keys {
		if i > 0 {
			result += ","
		}
		result += key
	}
	return result
}

// Response recorder to capture handler responses
type responseRecorder struct {
	http.ResponseWriter
	statusCode int
	body       []byte
}

func (r *responseRecorder) WriteHeader(code int) {
	r.statusCode = code
	r.ResponseWriter.WriteHeader(code)
}

func (r *responseRecorder) Write(b []byte) (int, error) {
	r.body = append(r.body, b...)
	return r.ResponseWriter.Write(b)
}

// Handle tRPC updateTranslations endpoint (batch update)
func HandleTRPCUpdateTranslations(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Read request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Parse request
	var req TRPCRequest
	if err := json.Unmarshal(body, &req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	log.Printf("[Jxion-API] tRPC updateTranslations: %d translations", len(req.Translations))
	
	// Log the actual translations being saved (first 5 for brevity)
	for i, trans := range req.Translations {
		if i < 5 {
			log.Printf("[Jxion-API]   Translation %d: key=%s, locale=%s, value=%s", 
				i+1, trans.Key, trans.Locale, 
				func() string {
					if len(trans.Value) > 50 {
						return trans.Value[:50] + "..."
					}
					return trans.Value
				}())
		}
	}
	if len(req.Translations) > 5 {
		log.Printf("[Jxion-API]   ... and %d more translations", len(req.Translations)-5)
	}

	// Store translations in database
	transList := make([]models.Translation, 0, len(req.Translations))
	for _, t := range req.Translations {
		transList = append(transList, models.Translation{
			Key:    t.Key,
			Locale: t.Locale,
			Value:  t.Value,
		})
	}
	
	// Upsert to database
	if err := db.UpsertTranslations(transList, nil); err != nil {
		log.Printf("[Jxion-API] ❌ Failed to store translations in database: %v", err)
		http.Error(w, "Failed to save translations", http.StatusInternalServerError)
		return
	}
	log.Printf("[Jxion-API] ✅ Stored %d translations in database", len(transList))
	
	// Clear cache for these translations and update cache
	for _, trans := range transList {
		cacheKey := fmt.Sprintf("translation:%s:%s", trans.Locale, trans.Key)
		// Delete old cache entry
		cache.Delete(cacheKey)
		// Set new cache entry
		jsonData, _ := json.Marshal(trans)
		cache.Set(cacheKey, string(jsonData), 24*time.Hour)
		
		// Broadcast event to connected clients
		BroadcastTranslationUpdate(trans.Key, trans.Locale)
	}

	trpcResp := TRPCResponse{}
	trpcResp.Result.Data = map[string]bool{
		"success": true,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(trpcResp)
}

// Handle tRPC updateTranslation endpoint (single update)
func HandleTRPCUpdateTranslation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Read request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Parse request
	var req TRPCRequest
	if err := json.Unmarshal(body, &req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	log.Printf("[Jxion-API] tRPC updateTranslation: %s = %s (locale: %s)", req.Key, req.Value, req.Locale)

	// TODO: Implement actual database persistence
	// For now, just return success

	trpcResp := TRPCResponse{}
	trpcResp.Result.Data = map[string]bool{
		"success": true,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(trpcResp)
}

// Handle tRPC clearTranslationCache endpoint
func HandleTRPCClearCache(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Read request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// Parse request
	var req struct {
		Locale string `json:"locale"`
	}
	if err := json.Unmarshal(body, &req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	log.Printf("[Jxion-API] tRPC clearTranslationCache: locale=%s", req.Locale)

	// Note: We DON'T clear in-memory storage here because:
	// 1. In-memory storage contains the saved translations we want to keep
	// 2. Cache clearing is for invalidating old cached values, not stored translations
	// 3. In-memory storage persists until server restart (temporary until Phase 4)

	// Clear cache directly (don't use the REST handler to avoid response conflicts)
	pattern := "translation:*"
	if req.Locale != "" {
		pattern = fmt.Sprintf("translation:%s:*", req.Locale)
	}

	// Try to clear cache, but don't fail if Redis isn't available
	if err := cache.DeletePattern(pattern); err != nil {
		log.Printf("[Jxion-API] Warning: Cache clear failed (Redis may not be configured): %v", err)
		// Continue anyway - cache clear is not critical
	}

	// Always return success for tRPC, even if cache clear had warnings
	// (Cache clear failures are logged but not critical)
	trpcResp := TRPCResponse{}
	trpcResp.Result.Data = map[string]bool{
		"success": true,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(trpcResp)
}

