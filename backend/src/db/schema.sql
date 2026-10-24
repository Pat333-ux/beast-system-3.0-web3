-- BEAST System 3.0 PostgreSQL Database Schema

CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(64) NOT NULL,
    actor_address VARCHAR(42),
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS proposals_cache (
    id SERIAL PRIMARY KEY,
    proposal_id VARCHAR(78) UNIQUE NOT NULL,
    proposer VARCHAR(42) NOT NULL,
    description TEXT,
    targets TEXT[],
    values TEXT[],
    signatures TEXT[],
    calldata TEXT[],
    start_block BIGINT,
    end_block BIGINT,
    status VARCHAR(32) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS compliance_records (
    id SERIAL PRIMARY KEY,
    entity_name VARCHAR(128) NOT NULL,
    status VARCHAR(64) NOT NULL,
    metadata JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_address);
CREATE INDEX IF NOT EXISTS idx_proposals_proposal_id ON proposals_cache(proposal_id);
