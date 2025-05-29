# Custom Agent Detail Page Ownership Fix

## Issue Identified

While the main agent store page correctly showed ownership badges for custom agents (deployed personal agents), when users clicked on a custom agent to view its detail page, the ownership logic was broken:

- **Store page**: Custom agent correctly showed "Owned" badge ✅
- **Detail page**: Same custom agent showed "Try Free Version" + "Mint Agent NFT" ❌

**Root Cause**: The individual agent detail page API (`/api/prebuilt-agents/[id]`) wasn't considering the current user's wallet when determining ownership.

## Problem Deep Dive

### Store API vs Detail API Inconsistency

**Agent Store API** (`/api/agent-store/route.ts`) ✅:

```typescript
// Properly user-specific
isMinted: userWallet && agent.is_minted && agent.owner_wallet === userWallet,
isOwned: userWallet && (
  (agent.is_minted && agent.owner_wallet === userWallet) ||
  (agent.original_agent_id && agent.creator_wallet === userWallet)
)
```

**Agent Detail API** (`/api/prebuilt-agents/[id]`) ❌:

```typescript
// NOT user-specific - broken!
isMinted: agent.is_minted, // True for everyone if anyone minted it
// No ownership logic at all
```

### User Experience Impact

For a custom agent owned by User A:

**User A (Owner)**:

- Store page: "Owned" badge, "Use Agent" button ✅
- Detail page: "Try Free Version", "Mint Agent NFT" ❌ (WRONG!)

**User B (Different User)**:

- Store page: "Minted" badge, "Try Free Version" ✅
- Detail page: "Try Free Version", "Mint Agent NFT" ✅

## Solution Applied

### 1. Updated Individual Agent API (`/api/prebuilt-agents/[id]/route.ts`)

**Added user wallet parameter support:**

```typescript
const searchParams = request.nextUrl.searchParams;
const userWallet = searchParams.get("user_wallet");

const agent = await PrebuiltAgentsService.getAgentById(params.id, userWallet);
```

### 2. Enhanced PrebuiltAgentsService (`/services/prebuiltAgents.ts`)

**Updated `getAgentById` method signature:**

```typescript
static async getAgentById(id: string, userWallet?: string | null): Promise<PrebuiltAgent | null>
```

**Added user-specific ownership logic:**

```typescript
// FIXED: User-specific ownership like agent store API
isMinted: userWallet && agent.is_minted && agent.owner_wallet === userWallet,
isMintedByOthers: agent.is_minted && (!userWallet || agent.owner_wallet !== userWallet),

// Enhanced ownership detection like agent store API
isOwned: userWallet && (
  // User minted this prebuilt agent
  (agent.is_minted && agent.owner_wallet === userWallet) ||
  // User is the creator of this deployed personal agent
  (agent.original_agent_id && agent.creator_wallet === userWallet)
)
```

### 3. Updated Agent Detail Page (`/agent-store/[id]/page.tsx`)

**Modified fetchAgent to pass user wallet:**

```typescript
let url = `/api/prebuilt-agents/${params.id}`;
if (connected && publicKey) {
  url += `?user_wallet=${encodeURIComponent(publicKey.toString())}`;
}
```

**Added wallet dependency to useEffect:**

```typescript
useEffect(() => {
  fetchAgent();
}, [params.id, connected, publicKey]); // Now refetches on wallet changes
```

### 4. Enhanced Type Safety (`/types/agent.ts`)

**Added missing fields for deployed personal agents:**

```typescript
interface PrebuiltAgent {
  // ... existing fields ...
  originalAgentId?: string;
  isDeployedPersonal?: boolean;
  creatorWallet?: string;
}
```

### 5. Updated Live Data Service

**Enhanced `getAgentLiveData` for proper capability access control:**

```typescript
static async getAgentLiveData(
  agentId: string,
  capability: string,
  params: any = {},
  userWallet?: string | null  // Added user wallet
)
```

## User Experience Now

### ✅ User A (Owner of Custom Agent):

**Store Page:**

- Green "Owned" badge
- "Use Agent" button
- "Manage Agent" link

**Detail Page:**

- "Use Agent" button (blue)
- "🎉 You Own This Agent!" message
- All premium capabilities unlocked
- No minting options (already owns it)

### ✅ User B (Different User):

**Store Page:**

- Blue "Minted" badge
- "Try Free Version" button
- "Explore Agent" link

**Detail Page:**

- "Try Free Version" button (green)
- "🔒 Already Minted by Another User" message
- Premium capabilities locked
- Cannot mint (already minted by someone else)

### ✅ Everyone (Unminted Agents):

**Store Page & Detail Page:**

- "Premium" badges
- "Try Free Version" + "Mint Agent NFT" options
- Standard free trial access

## Technical Implementation

### API Flow Consistency

```typescript
// Both store and detail APIs now follow same pattern:
1. Extract userWallet from query params
2. Pass userWallet to service layer
3. Service returns user-specific ownership data
4. Frontend shows appropriate UI based on TRUE ownership
```

### Universal Ownership Pattern

```typescript
// Consistent across all components:
const userOwnsAgent = (connected && agent.isOwned) || agent.isMinted;

// For UI decisions:
if (userOwnsAgent) {
  // Show "Use Agent", premium access, "You Own This Agent!"
} else if (agent.isMintedByOthers) {
  // Show "Try Free Version", "Already Minted by Another User"
} else {
  // Show "Try Free Version" + "Mint Agent NFT" options
}
```

## Business Impact

### ✅ Prevents User Confusion

- Owners now see consistent messaging across store and detail pages
- No more "mint again" prompts for agents they already own
- Clear distinction between owned vs. available-for-minting

### ✅ Proper Feature Access Control

- Premium capabilities respect TRUE ownership
- No false "requires minting" errors for owners
- Correct capability access for deployed personal agents

### ✅ Improved User Journey

- Seamless transition from store browsing to agent usage
- Owners get immediate access without friction
- Non-owners get clear path to ownership

## Verification

1. **Owner views their custom agent**:

   - ✅ Store: "Owned" badge
   - ✅ Detail: "Use Agent" button + premium access

2. **Non-owner views custom agent**:

   - ✅ Store: "Minted" badge
   - ✅ Detail: "Try Free Version" + "Already Minted" message

3. **Anyone views unminted agent**:
   - ✅ Both: "Premium" badge + minting options

## Conclusion

This fix ensures consistency between the agent store listing and individual agent detail pages. Now ownership status and available actions are identical across both views, providing a seamless user experience for custom/deployed agents.

The solution maintains the same high-quality ownership logic throughout the entire application, ensuring that users who own agents (whether prebuilt or custom) always get the appropriate premium access they paid for.
