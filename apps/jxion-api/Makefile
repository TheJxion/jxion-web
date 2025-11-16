# Jxion Stack — Go API Makefile
# Phase Reference: Phase 4 — Persistence & Production
# Description: Build and development commands for Go API
# Date: 2025-11-14

.PHONY: build run test clean migrate

# Build the Go API server
build:
	@echo "[Jxion-API] Building..."
	@go build -o jxion-api ./cmd/server
	@echo "[Jxion-API] Build complete: ./jxion-api"

# Run the server in development mode
run:
	@echo "[Jxion-API] Starting server..."
	@go run ./cmd/server

# Run tests
test:
	@echo "[Jxion-API] Running tests..."
	@go test ./...

# Clean build artifacts
clean:
	@echo "[Jxion-API] Cleaning..."
	@rm -f jxion-api
	@go clean

# Run migrations
migrate:
	@echo "[Jxion-API] Running migrations..."
	@go run ./cmd/migrate up

# Install dependencies
deps:
	@echo "[Jxion-API] Installing dependencies..."
	@go mod download
	@go mod tidy

# Format code
fmt:
	@echo "[Jxion-API] Formatting code..."
	@go fmt ./...

# Lint code
lint:
	@echo "[Jxion-API] Linting code..."
	@golangci-lint run ./... || echo "Install golangci-lint for linting"

