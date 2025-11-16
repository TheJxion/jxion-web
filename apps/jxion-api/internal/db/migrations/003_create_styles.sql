-- Jxion Stack — Database Migrations
-- Phase 4: Persistence & Production
-- Migration: 003_create_styles
-- Description: Creates styles storage table for component-level styling

CREATE TABLE IF NOT EXISTS styles (
    id SERIAL PRIMARY KEY,
    component_id VARCHAR(200) NOT NULL,
    variant VARCHAR(100),
    class_name VARCHAR(500),
    styles JSONB NOT NULL, -- { "tailwind": "...", "custom": "..." }
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    UNIQUE(component_id, variant, class_name)
);

CREATE INDEX IF NOT EXISTS idx_styles_component_id ON styles(component_id);
CREATE INDEX IF NOT EXISTS idx_styles_component_variant ON styles(component_id, variant);
CREATE INDEX IF NOT EXISTS idx_styles_updated_at ON styles(updated_at);

-- Styles audit log
CREATE TABLE IF NOT EXISTS styles_audit (
    id SERIAL PRIMARY KEY,
    style_id INTEGER REFERENCES styles(id) ON DELETE SET NULL,
    component_id VARCHAR(200) NOT NULL,
    action VARCHAR(20) NOT NULL, -- 'create', 'update', 'delete'
    old_styles JSONB,
    new_styles JSONB,
    user_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_styles_audit_component_id ON styles_audit(component_id);
CREATE INDEX IF NOT EXISTS idx_styles_audit_created_at ON styles_audit(created_at);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_styles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS styles_updated_at ON styles;
CREATE TRIGGER styles_updated_at
    BEFORE UPDATE ON styles
    FOR EACH ROW
    EXECUTE FUNCTION update_styles_updated_at();

