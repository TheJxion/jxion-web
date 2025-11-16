/**
 * Jxion Stack — Go API Server
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: HTTP server for database and cache operations
 * Date: 2025-11-14
 *
 * This service provides:
 * - Translation CRUD endpoints
 * - Style generation endpoints
 * - Database operations (PostgreSQL)
 * - Cache operations (Redis)
 */

package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/jxion/jxion-api/internal/cache"
	"github.com/jxion/jxion-api/internal/db"
	"github.com/jxion/jxion-api/internal/handlers"
	"github.com/jxion/jxion-api/internal/middleware"
)

func main() {
	// Load .env file if it exists (ignore errors - .env is optional)
	if err := godotenv.Load(); err != nil {
		log.Println("[Jxion-API] No .env file found, using environment variables")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("[Jxion-API] Phase 4: Go API service initializing...")

	// Initialize database
	if err := db.InitDB(); err != nil {
		log.Printf("[Jxion-API] Database initialization failed: %v", err)
		log.Println("[Jxion-API] Continuing without database (development mode)")
	} else {
		defer db.CloseDB()
		
		// Run migrations
		if err := db.RunMigrations(); err != nil {
			log.Printf("[Jxion-API] Migration failed: %v", err)
			log.Println("[Jxion-API] Continuing without migrations (may cause errors)")
		}
	}

	// Initialize Redis cache
	if err := cache.InitRedis(); err != nil {
		log.Printf("[Jxion-API] Redis initialization failed: %v", err)
		log.Println("[Jxion-API] Continuing without cache (development mode)")
	}

	// Set up routes
	mux := http.NewServeMux()

	// Health check
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// tRPC-compatible endpoints (for frontend compatibility)
	mux.HandleFunc("/trpc/getTranslations", handlers.HandleTRPCGetTranslations)
	mux.HandleFunc("/trpc/getTranslation", handlers.HandleTRPCGetTranslation)
	mux.HandleFunc("/trpc/updateTranslations", handlers.HandleTRPCUpdateTranslations)
	mux.HandleFunc("/trpc/updateTranslation", handlers.HandleTRPCUpdateTranslation)
	mux.HandleFunc("/trpc/clearTranslationCache", handlers.HandleTRPCClearCache)

	// Translation endpoints
	mux.HandleFunc("/api/translations", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			handlers.GetTranslation(w, r)
		case http.MethodPost:
			handlers.CreateOrUpdateTranslation(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/api/translations/batch", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			handlers.BatchGetTranslations(w, r)
		case http.MethodPost:
			handlers.BatchUpdateTranslations(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/api/translations/cache", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodDelete {
			handlers.ClearTranslationCache(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	// SSE endpoint for real-time updates
	mux.HandleFunc("/api/events", handlers.HandleSSE)

	// Content endpoints
	mux.HandleFunc("/api/content/", handlers.HandleContent)

	// Style endpoints
	mux.HandleFunc("/api/styles/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodPost:
			handlers.GetStyles(w, r)
		case http.MethodPut:
			handlers.UpdateStyles(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/api/styles/cache", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodDelete {
			handlers.ClearStyleCache(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	log.Printf("[Jxion-API] Server ready at http://localhost:%s", port)
	log.Println("[Jxion-API] Endpoints:")
	log.Println("  GET  /health")
	log.Println("  GET  /api/translations?key={key}&locale={locale}")
	log.Println("  POST /api/translations")
	log.Println("  GET  /api/translations/batch?keys={keys}&locale={locale}")
	log.Println("  POST /api/translations/batch")
	log.Println("  DELETE /api/translations/cache")
	log.Println("  GET  /api/content/{path}")
	log.Println("  PUT  /api/content/{path}")
	log.Println("  DELETE /api/content/{path}")
	log.Println("  POST /api/styles/{componentId}")
	log.Println("  DELETE /api/styles/cache")
	log.Println("  POST /trpc/getTranslations (tRPC compatible)")
	log.Println("  POST /trpc/getTranslation (tRPC compatible)")
	log.Println("  POST /trpc/updateTranslations (tRPC compatible)")
	log.Println("  POST /trpc/updateTranslation (tRPC compatible)")
	log.Println("  POST /trpc/clearTranslationCache (tRPC compatible)")
	log.Println("  GET  /api/events (SSE - Server-Sent Events)")

	// Wrap mux with CORS middleware
	handler := middleware.CORS(mux)

	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal("[Jxion-API] Server failed:", err)
	}
}
