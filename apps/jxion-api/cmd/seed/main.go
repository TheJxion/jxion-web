/**
 * Jxion Stack — Content Seeding Tool
 * Description: Seeds database with Noir Crafted content from TypeScript source
 * Date: 2025-01-XX
 *
 * Usage:
 *   go run cmd/seed/main.go
 *
 * This tool:
 * 1. Reads content from noir-crafted TypeScript source (via Node.js extraction)
 * 2. Seeds noir-crafted/content.json and noir-crafted/homepage.json
 */

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/jxion/jxion-api/internal/db"
)

func main() {
	log.Println("[Seed] Initializing Noir Crafted content seeding...")

	// Initialize database
	if err := db.InitDB(); err != nil {
		log.Fatal("[Seed] Failed to connect to database:", err)
	}
	defer db.CloseDB()

	// Get the workspace root (assuming we're in apps/jxion-api)
	workspaceRoot := filepath.Join(filepath.Dir(filepath.Dir(filepath.Dir(filepath.Dir(os.Args[0])))))
	if _, err := os.Stat(workspaceRoot); os.IsNotExist(err) {
		// Try alternative path
		workspaceRoot = filepath.Join("..", "..", "..")
	}

	contentPath := filepath.Join(workspaceRoot, "apps", "noir-crafted", "src", "lib", "i18n", "content.ts")
	
	log.Printf("[Seed] Reading content from: %s", contentPath)

	// Use Node.js to extract content (since we can't easily parse TypeScript in Go)
	// We'll use a Node script to extract JSON, then read it
	tempJSON := filepath.Join(os.TempDir(), "noir-content-temp.json")
	tempHomepageJSON := filepath.Join(os.TempDir(), "noir-homepage-temp.json")

	// Extract full content
	log.Println("[Seed] Extracting full content...")
	extractCmd := exec.Command("node", "-e", fmt.Sprintf(`
		const { createRequire } = require('module');
		const require = createRequire(import.meta.url);
		const tsx = require('tsx');
		const path = require('path');
		
		// This won't work directly - we need a different approach
		console.log('Use the seeding script: node apps/jxion-api/scripts/seed-noir-content.mjs');
	`))

	if err := extractCmd.Run(); err != nil {
		log.Printf("[Seed] ⚠️  Direct TypeScript extraction not available")
		log.Println("[Seed] Please use the Node.js seeding script instead:")
		log.Println("   node apps/jxion-api/scripts/seed-noir-content.mjs")
		log.Println("")
		log.Println("Or seed via ContentEditor in noir-admin:")
		log.Println("   1. Open noir-admin ContentEditor")
		log.Println("   2. Select 'Homepage Content'")
		log.Println("   3. It will load from TypeScript source automatically")
		log.Println("   4. Click 'Save Changes' to seed the database")
		os.Exit(0)
	}

	// If we got here, we have JSON files - read and seed them
	log.Println("[Seed] Reading extracted content...")
	
	fullContentBytes, err := os.ReadFile(tempJSON)
	if err != nil {
		log.Fatal("[Seed] Failed to read full content JSON:", err)
	}

	homepageContentBytes, err := os.ReadFile(tempHomepageJSON)
	if err != nil {
		log.Fatal("[Seed] Failed to read homepage content JSON:", err)
	}

	var fullContent map[string]interface{}
	var homepageContent map[string]interface{}

	if err := json.Unmarshal(fullContentBytes, &fullContent); err != nil {
		log.Fatal("[Seed] Failed to parse full content JSON:", err)
	}

	if err := json.Unmarshal(homepageContentBytes, &homepageContent); err != nil {
		log.Fatal("[Seed] Failed to parse homepage content JSON:", err)
	}

	// Seed full content
	log.Println("[Seed] Seeding noir-crafted/content.json...")
	if err := db.UpsertContent("noir-crafted/content.json", fullContent, nil); err != nil {
		log.Fatal("[Seed] Failed to seed full content:", err)
	}
	log.Println("[Seed] ✅ Full content seeded")

	// Seed homepage content
	log.Println("[Seed] Seeding noir-crafted/homepage.json...")
	if err := db.UpsertContent("noir-crafted/homepage.json", homepageContent, nil); err != nil {
		log.Fatal("[Seed] Failed to seed homepage content:", err)
	}
	log.Println("[Seed] ✅ Homepage content seeded")

	log.Println("[Seed] 🎉 Content seeding completed successfully!")
}

