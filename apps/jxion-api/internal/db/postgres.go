/**
 * Jxion Stack — Go API Database Layer
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: PostgreSQL connection and query operations
 * Date: 2025-11-14
 *
 * This module provides:
 * - Database connection pooling
 * - Translation CRUD operations
 * - Query helpers and transaction support
 */

package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

var DB *sql.DB

// InitDB initializes the PostgreSQL connection pool
func InitDB() error {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		return fmt.Errorf("DATABASE_URL environment variable is required")
	}

	var err error
	DB, err = sql.Open("pgx", dbURL)
	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}

	// Configure connection pool
	DB.SetMaxOpenConns(25)
	DB.SetMaxIdleConns(5)
	DB.SetConnMaxLifetime(5 * time.Minute)

	// Test connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := DB.PingContext(ctx); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("[Jxion-API] Database connection established")
	return nil
}

// CloseDB closes the database connection
func CloseDB() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}

// HealthCheck verifies database connectivity
func HealthCheck(ctx context.Context) error {
	return DB.PingContext(ctx)
}

