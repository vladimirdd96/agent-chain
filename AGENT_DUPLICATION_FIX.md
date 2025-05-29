# Agent Duplication Fix

## Problem Description

The agent store was showing duplicate entries when a user had both minted a personal agent and also deployed it to the store. This occurred because:

1. When a user creates a personal agent, it's stored in the `agents` table with `is_nft: true` and `is_public: false`
2. When the user deploys it to the store, a new entry is created in `prebuilt_agents` table with `original_agent_id` pointing to the original agent
3. The original agent is updated to `is_public: true`
4. The agent store API was fetching **both** entries:
   - The `prebuilt_agents` entry (deployed version)
   - The `agents` entry with `is_public: true` (original version)

This resulted in the same agent appearing twice in the store.

## Solution

### 1. Modified `/api/agent-store/route.ts`

Added logic to prevent fetching agents from the `agents` table that have already been deployed to the store:

```typescript
// Get list of agent IDs that have been deployed to the store
const deployedAgentIds = (prebuiltAgents || [])
  .filter((agent: any) => agent.original_agent_id)
  .map((agent: any) => agent.original_agent_id);

// Exclude deployed agents from agents table queries
if (deployedAgentIds.length > 0) {
  publicAgentsQuery = publicAgentsQuery.not(
    "id",
    "in",
    `(${deployedAgentIds.join(",")})`
  );
}
```

### 2. Enhanced Metadata

Added new metadata fields to distinguish between different agent types:

- `originalAgentId`: Reference to the original agent for deployed personal agents
- `isDeployedPersonal`: Boolean flag indicating if this is a deployed personal agent
- `creatorWallet`: Wallet address of the original creator

### 3. Updated Workspace Logic

Modified `workspace/page.tsx` to properly handle the new agent categorization:

```typescript
// Deployed personal agents (originally created by user, now in store)
const isDeployedPersonal =
  agent.type === "prebuilt" &&
  agent.isDeployedPersonal &&
  agent.creatorWallet === publicKey;
```

## Result

Now agents appear only once in the store:

- **If an agent is only minted**: Shows the minted version from `agents` table
- **If an agent is deployed**: Shows only the deployed version from `prebuilt_agents` table
- **Personal agents in workspace**: Shows personal agents that aren't deployed + deployed agents as store entries

## User Experience

1. **Personal Agent Creation**: Agent appears in workspace only
2. **Deploy to Store**: Agent moves from personal workspace to store section in workspace
3. **Store View**: No duplicates, each agent appears once with correct status
4. **Clear Distinction**: UI clearly shows whether an agent is personal, prebuilt, or deployed

## Technical Benefits

- Eliminates data duplication in UI
- Cleaner data model representation
- Better user understanding of agent states
- Consistent agent lifecycle management
- Improved performance (fewer duplicate entries)

## Testing

To test the fix:

1. Create a personal agent
2. Deploy it to the store
3. Check agent store page - should show only one instance
4. Check workspace - should show the deployed version in store section, not personal section

The fix ensures a clean separation between personal agents and store agents while maintaining the proper ownership and deployment relationships.
