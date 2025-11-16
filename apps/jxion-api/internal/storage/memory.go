/**
 * Jxion Stack — In-Memory Translation Storage
 * Phase Reference: Phase 4 — Persistence & Production (Temporary)
 * Description: In-memory storage for translations until database is implemented
 * Date: 2025-11-14
 *
 * This module provides:
 * - In-memory map storage for translations
 * - Thread-safe operations using mutex
 * - Fallback when Redis/database is not available
 */

package storage

import (
	"sync"
	"time"

	"github.com/jxion/jxion-api/internal/models"
)

var (
	// In-memory storage: map[locale]map[key]Translation
	translations = make(map[string]map[string]models.Translation)
	mu           sync.RWMutex
)

// StoreTranslation stores a translation in memory
func StoreTranslation(translation models.Translation) {
	mu.Lock()
	defer mu.Unlock()

	if translations[translation.Locale] == nil {
		translations[translation.Locale] = make(map[string]models.Translation)
	}

	// Update timestamps
	now := time.Now()
	if translation.CreatedAt.IsZero() {
		translation.CreatedAt = now
	}
	translation.UpdatedAt = now

	translations[translation.Locale][translation.Key] = translation
}

// GetTranslation retrieves a translation from memory
func GetTranslation(key, locale string) (*models.Translation, bool) {
	mu.RLock()
	defer mu.RUnlock()

	if translations[locale] == nil {
		return nil, false
	}

	trans, exists := translations[locale][key]
	if !exists {
		return nil, false
	}

	return &trans, true
}

// GetTranslations retrieves multiple translations from memory
func GetTranslations(keys []string, locale string) map[string]string {
	mu.RLock()
	defer mu.RUnlock()

	result := make(map[string]string)

	if translations[locale] == nil {
		return result
	}

	for _, key := range keys {
		if trans, exists := translations[locale][key]; exists {
			result[key] = trans.Value
		}
	}

	return result
}

// StoreTranslations stores multiple translations in memory
func StoreTranslations(transList []models.Translation) {
	mu.Lock()
	defer mu.Unlock()

	now := time.Now()

	for _, trans := range transList {
		if translations[trans.Locale] == nil {
			translations[trans.Locale] = make(map[string]models.Translation)
		}

		// Update timestamps
		if trans.CreatedAt.IsZero() {
			trans.CreatedAt = now
		}
		trans.UpdatedAt = now

		translations[trans.Locale][trans.Key] = trans
	}
}

// ClearTranslations clears all translations for a locale (or all if locale is empty)
func ClearTranslations(locale string) {
	mu.Lock()
	defer mu.Unlock()

	if locale == "" {
		translations = make(map[string]map[string]models.Translation)
	} else {
		delete(translations, locale)
	}
}

