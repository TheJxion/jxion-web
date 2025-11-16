-- Jxion Stack — Database Migrations
-- Phase 4: Persistence & Production
-- Migration: 002_create_content
-- Description: Creates content storage table

CREATE TABLE IF NOT EXISTS content (
    id SERIAL PRIMARY KEY,
    path VARCHAR(500) NOT NULL UNIQUE,
    content JSONB NOT NULL,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX IF NOT EXISTS idx_content_path ON content(path);
CREATE INDEX IF NOT EXISTS idx_content_updated_at ON content(updated_at);

-- Content audit log
CREATE TABLE IF NOT EXISTS content_audit (
    id SERIAL PRIMARY KEY,
    content_id INTEGER REFERENCES content(id) ON DELETE SET NULL,
    path VARCHAR(500) NOT NULL,
    action VARCHAR(20) NOT NULL, -- 'create', 'update', 'delete'
    old_content JSONB,
    new_content JSONB,
    user_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_content_audit_path ON content_audit(path);
CREATE INDEX IF NOT EXISTS idx_content_audit_created_at ON content_audit(created_at);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS content_updated_at ON content;
CREATE TRIGGER content_updated_at
    BEFORE UPDATE ON content
    FOR EACH ROW
    EXECUTE FUNCTION update_content_updated_at();

