/**
 * Jxion Stack — Go API Models
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: Translation data models matching database schema
 * Date: 2025-11-14
 *
 * These structs match the PostgreSQL schema defined in libs/jxion-db/migrations/
 */

package models

import "time"

// Translation represents a translation row in the database
type Translation struct {
	ID        int       `json:"id" db:"id"`
	Key       string    `json:"key" db:"key"`
	Locale    string    `json:"locale" db:"locale"`
	Value     string    `json:"value" db:"value"`
	Namespace *string   `json:"namespace,omitempty" db:"namespace"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// CreateTranslationInput represents input for creating a translation
type CreateTranslationInput struct {
	Key       string  `json:"key"`
	Locale    string  `json:"locale"`
	Value     string  `json:"value"`
	Namespace *string `json:"namespace,omitempty"`
}

// UpdateTranslationInput represents input for updating a translation
type UpdateTranslationInput struct {
	Key    string `json:"key"`
	Locale string `json:"locale"`
	Value  string `json:"value"`
}

// TranslationAudit represents an audit log entry
type TranslationAudit struct {
	ID           int        `json:"id" db:"id"`
	TranslationID *int      `json:"translation_id,omitempty" db:"translation_id"`
	Key          string     `json:"key" db:"key"`
	Locale       string     `json:"locale" db:"locale"`
	Action       string     `json:"action" db:"action"` // "create", "update", "delete"
	OldValue     *string    `json:"old_value,omitempty" db:"old_value"`
	NewValue     *string    `json:"new_value,omitempty" db:"new_value"`
	UserID       *string    `json:"user_id,omitempty" db:"user_id"`
	CreatedAt    time.Time  `json:"created_at" db:"created_at"`
}

