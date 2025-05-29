-- Add Deep Research Agent to the database

-- Insert the Deep Research Agent
INSERT INTO prebuilt_agents (id, name, description, chain_compatibility, features, visual_representation, avatar, category, price) VALUES
('deep-research-agent', 'Deep Research Agent', 'A specialized project research assistant designed for the crypto space that generates comprehensive reports on any topic following a workflow similar to OpenAI and Gemini Deep Research.',
 ARRAY['Ethereum', 'Solana', 'Polygon', 'Binance Smart Chain', 'Arbitrum', 'Avalanche'],
 ARRAY['Customizable research workflows', 'Multi-model integration with OpenAI o1-preview for deep reasoning', 'Advanced data sourcing from multiple APIs and web sources', 'Structured report generation with executive summaries', 'Project due diligence analysis', 'Market analysis and competitor research', 'Technology evaluation and risk assessment', 'Real-time data integration and fact-checking'],
 '🔬', '/images/agents/deep-research.svg', 'Research', 0.8);

-- Insert Deep Research Agent capabilities
INSERT INTO agent_capabilities (id, agent_id, name, description, requires_minting, moralis_endpoints) VALUES
('quick-research', 'deep-research-agent', 'Quick Research Summary', 'Generate a brief research summary on any crypto project or topic', false, NULL),
('comprehensive-report', 'deep-research-agent', 'Comprehensive Research Report', 'Generate detailed research reports with multi-dimensional analysis, risk assessment, and market intelligence', true, NULL),
('due-diligence', 'deep-research-agent', 'Project Due Diligence', 'In-depth due diligence analysis including tokenomics, team background, and technical assessment', true, NULL),
('market-analysis', 'deep-research-agent', 'Advanced Market Analysis', 'Comprehensive market analysis with competitive landscape, trend analysis, and growth projections', true, NULL),
('real-time-monitoring', 'deep-research-agent', 'Real-time Project Monitoring', 'Continuous monitoring and alerts for project developments, news, and market changes', true, NULL); 