/**
 * Jxion Stack — Go API Cache Layer
 * Phase Reference: Phase 4 — Persistence & Production
 * Description: Redis cache operations for translations and styles
 * Date: 2025-11-14
 *
 * This module provides:
 * - Redis connection and client management
 * - Cache get/set operations with TTL
 * - Cache invalidation helpers
 */

package cache

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)

var Client *redis.Client
var ctx = context.Background()

// InitRedis initializes the Redis client
func InitRedis() error {
	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		log.Println("[Jxion-API] REDIS_URL not set, cache disabled")
		return nil
	}

	opt, err := redis.ParseURL(redisURL)
	if err != nil {
		return fmt.Errorf("failed to parse Redis URL: %w", err)
	}

	Client = redis.NewClient(opt)

	// Test connection
	if err := Client.Ping(ctx).Err(); err != nil {
		return fmt.Errorf("failed to connect to Redis: %w", err)
	}

	log.Println("[Jxion-API] Redis connection established")
	return nil
}

// Get retrieves a value from cache
func Get(key string) (string, error) {
	if Client == nil {
		return "", fmt.Errorf("Redis client not initialized")
	}
	return Client.Get(ctx, key).Result()
}

// Set stores a value in cache with TTL
func Set(key string, value string, ttl time.Duration) error {
	if Client == nil {
		return fmt.Errorf("Redis client not initialized")
	}
	return Client.Set(ctx, key, value, ttl).Err()
}

// Delete removes a key from cache
func Delete(key string) error {
	if Client == nil {
		return fmt.Errorf("Redis client not initialized")
	}
	return Client.Del(ctx, key).Err()
}

// DeletePattern removes all keys matching a pattern
func DeletePattern(pattern string) error {
	if Client == nil {
		return fmt.Errorf("Redis client not initialized")
	}

	keys, err := Client.Keys(ctx, pattern).Result()
	if err != nil {
		return err
	}

	if len(keys) > 0 {
		return Client.Del(ctx, keys...).Err()
	}
	return nil
}

// HealthCheck verifies Redis connectivity
func HealthCheck() error {
	if Client == nil {
		return fmt.Errorf("Redis client not initialized")
	}
	return Client.Ping(ctx).Err()
}

