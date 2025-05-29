-- Add fields for deployed personal agents
-- This allows personal agents to be deployed to the store

ALTER TABLE prebuilt_agents 
ADD COLUMN IF NOT EXISTS original_agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS creator_wallet TEXT;

-- Update the category constraint to include Custom agents
ALTER TABLE prebuilt_agents 
DROP CONSTRAINT IF EXISTS prebuilt_agents_category_check;

ALTER TABLE prebuilt_agents 
ADD CONSTRAINT prebuilt_agents_category_check 
CHECK (category IN ('Analytics', 'DeFi', 'NFT', 'Trading', 'Research', 'Custom'));

-- Add index for the new fields
CREATE INDEX IF NOT EXISTS idx_prebuilt_agents_original_agent ON prebuilt_agents(original_agent_id);
CREATE INDEX IF NOT EXISTS idx_prebuilt_agents_creator ON prebuilt_agents(creator_wallet); 