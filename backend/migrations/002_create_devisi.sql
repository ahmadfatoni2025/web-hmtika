CREATE TABLE devisi (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    social_links JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
