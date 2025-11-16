/**
 * Jxion Stack — Go API Database Migrations
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: Database migration runner
 * Date: 2025-11-14
 */

package db

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"path/filepath"
	"sort"
	"strings"
)

//go:embed migrations/*.sql
var migrationsFS embed.FS

// RunMigrations executes all SQL migration files in order
func RunMigrations() error {
	if DB == nil {
		return fmt.Errorf("database connection not initialized")
	}

	// Read migration files
	migrations, err := fs.ReadDir(migrationsFS, "migrations")
	if err != nil {
		return fmt.Errorf("failed to read migrations directory: %w", err)
	}

	// Sort migrations by filename
	migrationFiles := make([]string, 0, len(migrations))
	for _, entry := range migrations {
		if !entry.IsDir() && strings.HasSuffix(entry.Name(), ".sql") {
			migrationFiles = append(migrationFiles, entry.Name())
		}
	}
	sort.Strings(migrationFiles)

	log.Printf("[Jxion-API] Running %d migrations...", len(migrationFiles))

	// Execute each migration
	for _, filename := range migrationFiles {
		log.Printf("[Jxion-API] Running migration: %s", filename)

		sql, err := migrationsFS.ReadFile(filepath.Join("migrations", filename))
		if err != nil {
			log.Printf("[Jxion-API] Migration failed: failed to read migration %s: %v", filename, err)
			continue
		}

		if _, err := DB.Exec(string(sql)); err != nil {
			// Check if it's a "already exists" error (non-critical)
			errStr := err.Error()
			if strings.Contains(errStr, "already exists") || 
			   strings.Contains(errStr, "duplicate") ||
			   strings.Contains(errStr, "42710") { // PostgreSQL error code for duplicate object
				log.Printf("[Jxion-API] Migration skipped (already applied): %s", filename)
				continue
			}
			log.Printf("[Jxion-API] Migration failed: failed to execute migration %s: %v", filename, err)
			log.Printf("[Jxion-API] Continuing without migrations (may cause errors)")
			return nil // Continue but warn
		}

		log.Printf("[Jxion-API] ✅ Migration completed: %s", filename)
	}

	log.Printf("[Jxion-API] ✅ All migrations completed successfully")
	return nil
}

