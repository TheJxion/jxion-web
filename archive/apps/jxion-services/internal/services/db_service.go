package services

import (
	"context"
	"encoding/json"
	"errors"
	"sync"
	"time"
)

// AIContent represents the persisted AI payload with metadata.
type AIContent struct {
	ID        string          `json:"id"`
	Content   json.RawMessage `json:"content"`
	CreatedAt time.Time       `json:"createdAt"`
	ExpiresAt time.Time       `json:"expiresAt"`
	Note      string          `json:"note,omitempty"`
}

// DatabaseService simulates a PostgreSQL persistence layer.
type DatabaseService struct {
	mu     sync.RWMutex
	values map[string]AIContent
}

// NewDatabaseService constructs the mock persistence layer.
func NewDatabaseService() *DatabaseService {
	return &DatabaseService{
		values: map[string]AIContent{},
	}
}

// LoadContent fetches the AI content by id if it exists and is not expired.
func (d *DatabaseService) LoadContent(_ context.Context, id string) (AIContent, error) {
	d.mu.RLock()
	defer d.mu.RUnlock()

	entry, ok := d.values[id]
	if !ok {
		return AIContent{}, errors.New("content not found")
	}
	if time.Now().After(entry.ExpiresAt) {
		return AIContent{}, errors.New("content expired")
	}
	return entry, nil
}

// SaveContent persists the AI content with an absolute expiration.
func (d *DatabaseService) SaveContent(_ context.Context, content AIContent, ttl time.Duration) (AIContent, error) {
	if content.ID == "" {
		return AIContent{}, errors.New("content id is required")
	}

	now := time.Now()
	content.CreatedAt = now
	content.ExpiresAt = now.Add(ttl)

	d.mu.Lock()
	d.values[content.ID] = content
	d.mu.Unlock()

	return content, nil
}
