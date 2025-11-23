package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/jxion/services/internal/services"
)

const (
	defaultPort            = "8090"
	defaultContentPath     = "noir-crafted/content.json"
	cacheTTL               = 5 * time.Minute
	dbTTL                  = 24 * time.Hour
	seedRevalidateTimeout  = 5 * time.Second
	envOriginContentTarget = "ORIGIN_CONTENT_ENDPOINT"
)

type server struct {
	cache *services.CacheService
}

type contentResponse struct {
	Path    string          `json:"path"`
	Content json.RawMessage `json:"content"`
	Note    string          `json:"note,omitempty"`
	Stale   bool            `json:"stale"`
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	originEndpoint := os.Getenv(envOriginContentTarget)

	origin, err := services.NewOriginService(originEndpoint)
	if err != nil {
		log.Fatalf("origin initialization failed: %v", err)
	}

	dbService := services.NewDatabaseService()
	eventService := services.NewEventService()
	cacheService := services.NewCacheService(dbService, origin, eventService, cacheTTL, dbTTL)

	ctx, cancel := context.WithTimeout(context.Background(), seedRevalidateTimeout)
	if err := seedInitialContent(ctx, cacheService, origin, defaultContentPath); err != nil {
		log.Printf("[bootstrap] seed skipped: %v", err)
	}
	cancel()

	srv := &server{
		cache: cacheService,
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/health", handleHealth)
	mux.HandleFunc("/content/swr/", srv.handleContentSWR)
	mux.HandleFunc("/events", eventService.HTTPHandler)

	log.Printf("[swr] server ready on :%s", port)
	if err := http.ListenAndServe(":"+port, withCORS(mux)); err != nil {
		log.Fatal(err)
	}
}

func (s *server) handleContentSWR(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	id := strings.TrimPrefix(r.URL.Path, "/content/swr/")
	id = strings.Trim(id, "/")
	if id == "" {
		http.Error(w, "missing content id", http.StatusBadRequest)
		return
	}

	content, stale, err := s.cache.GetContent(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	response := contentResponse{
		Path:    id,
		Content: content.Content,
		Note:    content.Note,
		Stale:   stale,
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-store")
	json.NewEncoder(w).Encode(response)
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("OK"))
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func seedInitialContent(ctx context.Context, cacheService *services.CacheService, origin *services.OriginService, path string) error {
	content, err := origin.FetchContent(ctx, path)
	if err != nil {
		return err
	}

	var parsed map[string]any
	if err := json.Unmarshal(content.Content, &parsed); err != nil {
		return err
	}

	return cacheService.Seed(context.Background(), path, parsed, true)
}
