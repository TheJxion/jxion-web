/**
 * Jxion Stack — Seed Noir Content
 * Description: Seeds database with Noir Crafted content from TypeScript source
 * Date: 2025-01-XX
 *
 * This script:
 * 1. Reads the TypeScript content file
 * 2. Extracts the content object
 * 3. Seeds noir-crafted/content.json and noir-crafted/homepage.json
 */

package main

import (
	"log"

	"github.com/jxion/jxion-api/internal/db"
)

func main() {
	// Initialize database
	if err := db.InitDB(); err != nil {
		log.Fatal("[Seed] Failed to connect to database:", err)
	}
	defer db.CloseDB()

	// For now, we'll create a migration SQL file instead
	// This script would need TypeScript compilation support
	// Better approach: Create SQL migration with embedded JSON

	log.Println("[Seed] This script requires TypeScript compilation.")
	log.Println("[Seed] Please use the SQL migration file instead: 006_seed_noir_content.sql")
}

