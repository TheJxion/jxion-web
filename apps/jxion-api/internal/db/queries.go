/**
 * Jxion Stack — Go API Database Queries
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: Database query functions for translations, content, and styles
 * Date: 2025-11-14
 */

package db

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/jxion/jxion-api/internal/models"
)

// Translation Queries

// GetTranslation retrieves a single translation from the database
func GetTranslation(key, locale string, namespace *string) (*models.Translation, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var translation models.Translation
	query := `
		SELECT id, key, locale, value, namespace, created_at, updated_at
		FROM translations
		WHERE key = $1 AND locale = $2 AND namespace = $3
		LIMIT 1
	`

	// Normalize NULL namespace to empty string for consistency
	var ns sql.NullString
	if namespace != nil && *namespace != "" {
		ns.String = *namespace
		ns.Valid = true
	} else {
		ns.String = ""
		ns.Valid = true
	}

	err := DB.QueryRowContext(ctx, query, key, locale, ns).Scan(
		&translation.ID,
		&translation.Key,
		&translation.Locale,
		&translation.Value,
		&translation.Namespace,
		&translation.CreatedAt,
		&translation.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get translation: %w", err)
	}

	return &translation, nil
}

// GetTranslations retrieves multiple translations from the database
func GetTranslations(keys []string, locale string, namespace *string) (map[string]string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if len(keys) == 0 {
		return make(map[string]string), nil
	}

	// Build query with IN clause
	query := `
		SELECT key, value
		FROM translations
		WHERE locale = $1 AND key = ANY($2) AND namespace = $3
	`

	// Normalize NULL namespace to empty string for consistency
	var ns sql.NullString
	if namespace != nil && *namespace != "" {
		ns.String = *namespace
		ns.Valid = true
	} else {
		ns.String = ""
		ns.Valid = true
	}

	rows, err := DB.QueryContext(ctx, query, locale, keys, ns)
	if err != nil {
		return nil, fmt.Errorf("failed to query translations: %w", err)
	}
	defer rows.Close()

	result := make(map[string]string)
	for rows.Next() {
		var key, value string
		if err := rows.Scan(&key, &value); err != nil {
			return nil, fmt.Errorf("failed to scan translation: %w", err)
		}
		result[key] = value
	}

	return result, nil
}

// UpsertTranslation creates or updates a translation
func UpsertTranslation(t *models.Translation, userID *string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	query := `
		INSERT INTO translations (key, locale, value, namespace)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (key, locale, namespace)
		DO UPDATE SET
			value = EXCLUDED.value,
			updated_at = CURRENT_TIMESTAMP
		RETURNING id, created_at, updated_at
	`

	// Normalize NULL namespace to empty string for consistency
	var ns sql.NullString
	if t.Namespace != nil && *t.Namespace != "" {
		ns.String = *t.Namespace
		ns.Valid = true
	} else {
		// Use empty string instead of NULL for consistency
		ns.String = ""
		ns.Valid = true
	}

	err := DB.QueryRowContext(ctx, query, t.Key, t.Locale, t.Value, ns).Scan(
		&t.ID,
		&t.CreatedAt,
		&t.UpdatedAt,
	)

	if err != nil {
		return fmt.Errorf("failed to upsert translation: %w", err)
	}

	// Log audit
	if err := logTranslationAudit(t, "update", nil, userID); err != nil {
		log.Printf("[Jxion-API] Warning: Failed to log translation audit: %v", err)
	}

	return nil
}

// UpsertTranslations creates or updates multiple translations
func UpsertTranslations(translations []models.Translation, userID *string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	tx, err := DB.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	query := `
		INSERT INTO translations (key, locale, value, namespace)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (key, locale, namespace)
		DO UPDATE SET
			value = EXCLUDED.value,
			updated_at = CURRENT_TIMESTAMP
		RETURNING id, created_at, updated_at
	`

	stmt, err := tx.PrepareContext(ctx, query)
	if err != nil {
		return fmt.Errorf("failed to prepare statement: %w", err)
	}
	defer stmt.Close()

	for i := range translations {
		// Normalize NULL namespace to empty string for consistency
		var ns sql.NullString
		if translations[i].Namespace != nil && *translations[i].Namespace != "" {
			ns.String = *translations[i].Namespace
			ns.Valid = true
		} else {
			// Use empty string instead of NULL for consistency
			ns.String = ""
			ns.Valid = true
		}

		err := stmt.QueryRowContext(
			ctx,
			translations[i].Key,
			translations[i].Locale,
			translations[i].Value,
			ns,
		).Scan(
			&translations[i].ID,
			&translations[i].CreatedAt,
			&translations[i].UpdatedAt,
		)

		if err != nil {
			return fmt.Errorf("failed to upsert translation %d: %w", i, err)
		}

		// Log audit
		if err := logTranslationAudit(&translations[i], "update", nil, userID); err != nil {
			log.Printf("[Jxion-API] Warning: Failed to log translation audit for %s: %v", translations[i].Key, err)
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

// logTranslationAudit logs a translation change to the audit table
func logTranslationAudit(t *models.Translation, action string, oldValue *string, userID *string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	query := `
		INSERT INTO translation_audit (translation_id, key, locale, action, old_value, new_value, user_id)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`

	var translationID sql.NullInt64
	if t.ID > 0 {
		translationID.Int64 = int64(t.ID)
		translationID.Valid = true
	}

	var oldVal sql.NullString
	if oldValue != nil {
		oldVal.String = *oldValue
		oldVal.Valid = true
	}

	var user sql.NullString
	if userID != nil {
		user.String = *userID
		user.Valid = true
	}

	_, err := DB.ExecContext(ctx, query,
		translationID,
		t.Key,
		t.Locale,
		action,
		oldVal,
		t.Value,
		user,
	)

	return err
}

// Content Queries

// GetContent retrieves content by path
func GetContent(path string) (map[string]interface{}, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var contentJSON []byte
	query := `SELECT content FROM content WHERE path = $1 LIMIT 1`

	err := DB.QueryRowContext(ctx, query, path).Scan(&contentJSON)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get content: %w", err)
	}

	var content map[string]interface{}
	if err := json.Unmarshal(contentJSON, &content); err != nil {
		return nil, fmt.Errorf("failed to unmarshal content: %w", err)
	}

	return content, nil
}

// UpsertContent creates or updates content
func UpsertContent(path string, content map[string]interface{}, userID *string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	contentJSON, err := json.Marshal(content)
	if err != nil {
		return fmt.Errorf("failed to marshal content: %w", err)
	}

	query := `
		INSERT INTO content (path, content, updated_by)
		VALUES ($1, $2, $3)
		ON CONFLICT (path)
		DO UPDATE SET
			content = EXCLUDED.content,
			version = content.version + 1,
			updated_at = CURRENT_TIMESTAMP,
			updated_by = EXCLUDED.updated_by
	`

	var user sql.NullString
	if userID != nil {
		user.String = *userID
		user.Valid = true
	}

	_, err = DB.ExecContext(ctx, query, path, contentJSON, user)
	return err
}

// Styles Queries

// GetStyle retrieves a style by component ID and variant
func GetStyle(componentID, variant, className string) (map[string]interface{}, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var stylesJSON []byte
	query := `
		SELECT styles FROM styles
		WHERE component_id = $1 AND (variant = $2 OR (variant IS NULL AND $2 IS NULL))
			AND (class_name = $3 OR (class_name IS NULL AND $3 IS NULL))
		LIMIT 1
	`

	var variantNull sql.NullString
	if variant != "" {
		variantNull.String = variant
		variantNull.Valid = true
	}

	var classNameNull sql.NullString
	if className != "" {
		classNameNull.String = className
		classNameNull.Valid = true
	}

	err := DB.QueryRowContext(ctx, query, componentID, variantNull, classNameNull).Scan(&stylesJSON)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get style: %w", err)
	}

	var styles map[string]interface{}
	if err := json.Unmarshal(stylesJSON, &styles); err != nil {
		return nil, fmt.Errorf("failed to unmarshal styles: %w", err)
	}

	return styles, nil
}

// UpsertStyle creates or updates a style
func UpsertStyle(componentID, variant, className string, styles map[string]interface{}, userID *string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	stylesJSON, err := json.Marshal(styles)
	if err != nil {
		return fmt.Errorf("failed to marshal styles: %w", err)
	}

	query := `
		INSERT INTO styles (component_id, variant, class_name, styles, updated_by)
		VALUES ($1, $2, $3, $4, $5)
		ON CONFLICT (component_id, COALESCE(variant, ''), COALESCE(class_name, ''))
		DO UPDATE SET
			styles = EXCLUDED.styles,
			version = styles.version + 1,
			updated_at = CURRENT_TIMESTAMP,
			updated_by = EXCLUDED.updated_by
	`

	var variantNull sql.NullString
	if variant != "" {
		variantNull.String = variant
		variantNull.Valid = true
	}

	var classNameNull sql.NullString
	if className != "" {
		classNameNull.String = className
		classNameNull.Valid = true
	}

	var user sql.NullString
	if userID != nil {
		user.String = *userID
		user.Valid = true
	}

	_, err = DB.ExecContext(ctx, query, componentID, variantNull, classNameNull, stylesJSON, user)
	return err
}

