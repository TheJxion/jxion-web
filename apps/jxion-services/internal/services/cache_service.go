package services

import (
	"context"
	"encoding/json"
	"log"
	"sync"
	"time"
)

type cacheEntry struct {
	Content  AIContent
	CachedAt time.Time
	Expires  time.Time
	Stale    bool
}

// CacheService implements SWR with database + SSE integration.
type CacheService struct {
	cacheTTL time.Duration
	dbTTL    time.Duration

	db     *DatabaseService
	origin *OriginService
	events *EventService

	mu     sync.RWMutex
	values map[string]cacheEntry
}

// NewCacheService wires the cache, db, origin and event services together.
func NewCacheService(db *DatabaseService, origin *OriginService, events *EventService, cacheTTL, dbTTL time.Duration) *CacheService {
	return &CacheService{
		cacheTTL: cacheTTL,
		dbTTL:    dbTTL,
		db:       db,
		origin:   origin,
		events:   events,
		values:   map[string]cacheEntry{},
	}
}

// Seed places a content value directly into the cache + db.
func (c *CacheService) Seed(ctx context.Context, id string, content map[string]any, stale bool) error {
	raw, err := json.Marshal(content)
	if err != nil {
		return err
	}

	aiContent := AIContent{
		ID:      id,
		Content: raw,
		Note:    "seed",
	}

	if _, err := c.db.SaveContent(ctx, aiContent, c.dbTTL); err != nil {
		return err
	}

	entry := cacheEntry{
		Content:  aiContent,
		CachedAt: time.Now(),
		Expires:  time.Now().Add(c.cacheTTL),
		Stale:    stale,
	}

	c.mu.Lock()
	c.values[id] = entry
	c.mu.Unlock()

	return nil
}

// GetContent returns content using SWR semantics.
func (c *CacheService) GetContent(ctx context.Context, id string) (AIContent, bool, error) {
	if entry, ok := c.loadFromCache(id); ok {
		if entry.Stale {
			go c.revalidateAndSave(id)
		} else if time.Now().After(entry.Expires) {
			entry.Stale = true
			c.storeEntry(id, entry)
			go c.revalidateAndSave(id)
		}
		return entry.Content, entry.Stale, nil
	}

	if dbContent, err := c.db.LoadContent(ctx, id); err == nil {
		entry := cacheEntry{
			Content:  dbContent,
			CachedAt: time.Now(),
			Expires:  time.Now().Add(c.cacheTTL),
			Stale:    true,
		}
		c.storeEntry(id, entry)
		go c.revalidateAndSave(id)
		return dbContent, true, nil
	}

	aiContent, err := c.origin.FetchContent(ctx, id)
	if err != nil {
		return AIContent{}, false, err
	}
	if err := c.persistAll(ctx, aiContent); err != nil {
		return AIContent{}, false, err
	}
	return aiContent, false, nil
}

func (c *CacheService) loadFromCache(id string) (cacheEntry, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	entry, ok := c.values[id]
	if !ok {
		return cacheEntry{}, false
	}
	if time.Now().After(entry.Expires) {
		return entry, false
	}
	return entry, true
}

func (c *CacheService) storeEntry(id string, entry cacheEntry) {
	c.mu.Lock()
	c.values[id] = entry
	c.mu.Unlock()
}

func (c *CacheService) persistAll(ctx context.Context, aiContent AIContent) error {
	updated, err := c.db.SaveContent(ctx, aiContent, c.dbTTL)
	if err != nil {
		return err
	}
	entry := cacheEntry{
		Content:  updated,
		CachedAt: time.Now(),
		Expires:  time.Now().Add(c.cacheTTL),
		Stale:    false,
	}
	c.storeEntry(aiContent.ID, entry)
	return nil
}

func (c *CacheService) revalidateAndSave(id string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	aiContent, err := c.origin.FetchContent(ctx, id)
	if err != nil {
		log.Printf("[cache] revalidation failed for %s: %v", id, err)
		return
	}
	if err := c.persistAll(ctx, aiContent); err != nil {
		log.Printf("[cache] persist failed for %s: %v", id, err)
		return
	}
	c.events.BroadcastUpdate(id)
}
