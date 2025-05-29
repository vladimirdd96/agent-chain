# MindMint Agent Workflow Documentation

## Overview

MindMint is a Web3 AI platform where users can create, mint, and deploy AI agents as NFTs. This document outlines the complete user journey from agent creation to public deployment.

## User Journeys

### 1. Personal Agent Creation & Minting

**Flow**: Create Agent → Automatic NFT Minting → Appears in Workspace

1. **Navigate to Agent Creation**

   - Go to `/deploy` page
   - Connect wallet (required)

2. **Create Agent**

   - Fill out agent details:
     - Agent Type (Solana, EVM, Trade Bot, Generalist)
     - Agent Name (minimum 3 characters)
     - Description (minimum 20 characters)
     - Initial Parameters (optional JSON configuration)
   - Click "Deploy Agent"

3. **Automatic NFT Minting**

   - Agent is created in database
   - NFT is minted on-chain automatically
   - Agent appears in user's workspace immediately

4. **Workspace Management**
   - Agent appears in `/workspace` page
   - Full chat functionality with premium AI model
   - Analytics and settings access
   - Deploy to store option (if desired)

### 2. Prebuilt Agent Minting

**Flow**: Browse Store → Try Free Version → Mint Agent → Premium Access in Workspace

1. **Browse Agent Store**

   - Go to `/agent-store` page
   - Browse prebuilt agents by category and chain
   - Filter and search functionality

2. **Try Free Version**

   - Click "Try Free Version" on any agent card
   - Limited chat functionality
   - Encouragement to mint for full features

3. **Mint Agent**

   - Click "Mint Agent" button
   - NFT is minted to user's wallet
   - Agent becomes owned by user

4. **Premium Access**
   - Minted agent appears in workspace
   - Full chat functionality unlocked
   - All premium features available

### 3. Agent Deployment to Store

**Flow**: Personal Agent → Deploy to Store → Available for Others to Mint

1. **Deploy Personal Agent**

   - Create and mint a personal agent first
   - In workspace, click "Deploy to Store" on personal agents
   - Set price and deployment parameters

2. **Store Availability**
   - Agent appears in public agent store
   - Other users can discover and mint it
   - Original creator retains ownership rights

## Technical Implementation

### Database Schema

#### Agents Table (`agents`)

- Personal agents created by users
- Automatically minted as NFTs
- Appears in creator's workspace

#### Prebuilt Agents Table (`prebuilt_agents`)

- Curated prebuilt agents
- Custom deployed agents from users
- Available for public minting

### API Endpoints

#### `/api/agent/deploy` (POST)

- Creates personal agent
- Mints NFT automatically
- Returns agent data

#### `/api/agent/deploy-to-store` (POST)

- Deploys personal agent to public store
- Creates prebuilt_agents entry
- Links to original agent

#### `/api/agent-store` (GET)

- Returns all available agents for minting
- Includes both prebuilt and user-deployed agents
- Filters by user wallet for owned agents

#### `/api/chat` (POST)

- Handles agent conversations
- Supports premium vs free tier
- Context-aware responses

### Components

#### Workspace Components

- `AgentDashboard`: Main workspace view
- `AgentGrid`: Displays user's agents
- `EnhancedAgentCard`: Individual agent cards with actions
- `AgentChatModal`: Chat interface with agents

#### Agent Store Components

- `EnhancedAgentCard`: Browsable agent cards
- `AnimatedFilters`: Filter and search functionality
- Agent detail pages with minting capability

### User Experience Features

#### Agent Cards

- **Personal Agents**: Show "Personal" badge, deploy to store option
- **Prebuilt Agents**: Show "Prebuilt" badge, minting options
- **Minted Agents**: Show NFT badge and premium status
- **Deployed Agents**: Show "Available in Store" badge

#### Chat System

- **Free Version**: Limited responses, upgrade prompts
- **Premium Version**: Full AI capabilities, advanced features
- Context-aware based on agent type and description

#### Navigation

- Clear "Create & Mint Agent" CTA
- Workspace for managing owned agents
- Store for discovering new agents

## Development Setup

### Environment Variables

```bash
# Required for agent creation
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Required for chat functionality
OPENAI_API_KEY=your_openai_api_key

# Optional for wallet analytics
NEXT_PUBLIC_MORALIS_API_KEY=your_moralis_api_key

# Solana configuration
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

### Database Migrations

Run the migrations in order:

1. `0001_create_agents_table.sql` - Main agents table
2. `0002_create_prebuilt_agents_tables.sql` - Prebuilt agents and capabilities
3. `0003_add_deployed_agent_fields.sql` - Fields for deployed personal agents

### Testing the Flow

1. **Start Development Server**

   ```bash
   npm run dev
   ```

2. **Create Personal Agent**

   - Navigate to `/deploy`
   - Connect wallet
   - Fill out form and submit
   - Check `/workspace` for new agent

3. **Deploy to Store**

   - In workspace, click "Deploy to Store" on personal agent
   - Check `/agent-store` for deployed agent

4. **Mint Prebuilt Agent**
   - Browse `/agent-store`
   - Try free version of any agent
   - Mint agent and check workspace

## Key Features

### ✅ Implemented Features

- **Personal Agent Creation**: Create custom AI agents with NFT minting
- **Workspace Management**: Centralized view of all owned agents
- **Agent Chat System**: Premium vs free tier interactions
- **Store Deployment**: Deploy personal agents for others to mint
- **Prebuilt Agent Minting**: Mint and own prebuilt agents
- **Premium Feature Unlocking**: Full capabilities for minted agents
- **Agent Type Distinction**: Clear UI for personal vs prebuilt agents
- **Store Integration**: Unified store showing all available agents

### 🎯 User Benefits

- **True Ownership**: AI agents as NFTs on blockchain
- **Customization**: Create agents tailored to specific needs
- **Monetization**: Deploy agents for others to use
- **Premium Access**: Unlock advanced features through minting
- **Portfolio Management**: Centralized workspace for all agents
- **Community**: Discover and use agents created by others

### 🔧 Technical Benefits

- **Scalable Architecture**: Modular component system
- **Database Flexibility**: Supports both prebuilt and custom agents
- **NFT Integration**: Real blockchain ownership
- **Chat Intelligence**: Context-aware AI responses
- **Progressive Enhancement**: Works without wallet connection

## Future Enhancements

- **Agent Analytics**: Detailed usage and performance metrics
- **Revenue Sharing**: Creators earn from agent usage
- **Agent Collaboration**: Multiple agents working together
- **Advanced Customization**: Visual agent builders
- **Cross-chain Support**: Deploy agents on multiple blockchains
- **Community Features**: Reviews, ratings, and social features

## Support

For development support or questions about the agent workflow:

1. Check this documentation first
2. Review the component source code
3. Test the user flows in development mode
4. Refer to the API endpoint documentation

The system is designed to be intuitive for users while maintaining technical flexibility for developers.
