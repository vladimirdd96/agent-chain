# AgentChain – Cursor Full Project Prompt

## 🧱 Project Setup Rules

- Use **Next.js** (App Router, TypeScript, strict mode) for both web and API logic.
- Folder structure should support clean separation:
  - `/app` → Pages and UI logic
  - `/lib` → SDK logic
  - `/api` → Next.js API routes
  - `/components` → Reusable components
  - `/services` → Moralis, Supabase, NFT logic
- Write everything in **TypeScript**.
- Use **tailwindcss** with custom dark purple + black theme (light gray for accents).
- Include 3D or animated elements like Deepcore, using either Framer Motion or Three.js.

## 🎨 Design Requirements

- Design should be dark, futuristic, and animated (dark-purple/black/gray).
- No placeholder designs. All pages must be functional with real components.
- Reference site: https://deepcore.top (but better styling).

### Required Pages

- `Home`
- `Agent Store` (browsable by unauthenticated users)
- `Tools` (public overview of agent functions)
- `Deploy Agent` (only available after wallet auth)
- `Agent Detail Page`

### UI Features

- Public agents displayed in grid with filter, sort, search
- Each agent has metadata card (name, chain, type, functionality, stats)
- 3D animation on homepage

## 🧠 Agent System Logic

### Agent Types (from Deepcore but improved):

1. **Solana-Based Agent**

   - Real-time Solana token data
   - Wallet-based interaction
   - NFT minting logic (via Metaplex or preferred option)

2. **EVM-Based Agent**

   - Real-time Ethereum-compatible token data
   - Wallet analysis, address insights

3. **Trade Bot**

   - Trend tracking, sniping alerts
   - On-chain and token analytics

4. **Generalist Blockchain Agent**
   - Answering general blockchain-related queries
   - Access to token metadata, smart contract info, activity logs

### User Flow:

- Anyone can view agents/tools without wallet
- Connect Solana wallet to deploy, mint, or interact
- Deployed agents are stored as NFTs
- Minting uses native token standard (Solana: Metaplex)
- User can list agents in our marketplace (not external)

## 🌐 API and SDK Instructions

### API Design

- Next.js API routes in `/api`
- Use **real data only** – Moralis or other live crypto APIs
- Include routes for:
  - `GET /agents` → fetch all agents (public)
  - `POST /agent/deploy` → create a new agent (auth required)
  - `GET /agent/:id` → get agent details
  - `GET /tools` → list of all capabilities/tools per agent
  - `GET /token-info?address=` → fetch token info from Moralis
  - `POST /agent/mint` → mint agent as NFT (on-chain logic)
  - `GET /wallet/:address/analytics` → wallet insights

### SDK Design

- TypeScript SDK should be built in `/lib/agentchain-sdk`
- SDK must:
  - Only expose public APIs (no keys, no secrets)
  - Be exportable as a standalone package
  - Include typed methods for each supported route
  - Be published to **GitHub repo + NPM** (Cursor to manage)

## 🔒 Auth & Storage Rules

- Use **Solana wallet auth only** (Phantom preferred)
- No email/password login ever
- Use **Supabase** for any metadata or DB needs
  - Store agent metadata (name, desc, createdBy, chain, etc.)
- All data shown in UI must be real – never mocked

## 🔁 Caching & Rate Limit Handling

- Moralis API usage should be cached:
  - Implement in-memory or Redis cache if needed
  - Add fallback delay queue or smart retry for rate limits
  - Use cached values if request is too frequent

## 📦 Deployment & Publishing

- Open-source GitHub repo
- SDK should be usable in other projects directly
- CI/CD pipeline (e.g. GitHub Actions) should:
  - Lint, test, and validate before pushing live
  - Publish SDK to NPM on new tags
- No placeholder code, no dead code – every file must be used

## ✅ Final Checks

- No fallback/mocked data anywhere in the project
- Mobile responsiveness supported
- Everything typed strictly (TypeScript strict mode)
- All routes & SDK methods must be documented
- Cursor must use Moralis’ official SDK/methods when possible
- Each deployed agent must be fully usable from UI (no placeholder features)

---

**Goal:** Build AgentChain – a powerful decentralized AI agent deployment platform for Solana and EVM, with real blockchain integrations, wallet auth, NFT-based agents, and an SDK for others to use. Match the feature set of Deepcore.top but improve the architecture, design, and extensibility.

---

Ready for Cursor to begin generating the project using this as the foundational build prompt.
