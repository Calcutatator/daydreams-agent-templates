# 🏗️ Daydreams x402 Agent Architecture

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER / CLIENT                        │
│                     (Claude, Cursor, etc)                    │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 1. Discovers agent via xGate search
             │    or direct URL
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                      xGate MCP Server                        │
│          https://mcp.xgate.run/user/.../mcp                  │
│                                                              │
│  Tools:                                                      │
│  • agents_search (ERC-8004 index)                           │
│  • fetch_resource_info (get pricing)                        │
│  • execute_resource (pay + call)                            │
│  • install_resource (save to toolset)                       │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 2. fetch_resource_info checks pricing
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                    YOUR x402 AGENT                           │
│              http://[PUBLIC_IP]:[PORT]                       │
│                                                              │
│  Endpoints:                                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │ GET  /                  → Agent info               │    │
│  │ GET  /x402/supported    → Payment capabilities     │    │
│  │ POST /x402/verify       → Verify payment payload   │    │
│  │ POST /x402/settle       → Settle after service     │    │
│  │ POST /[endpoint]        → Paid service (main)      │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Stack:                                                      │
│  • Elysia web framework                                     │
│  • @daydreamsai/facilitator (payment middleware)            │
│  • viem (blockchain interactions)                           │
│  • Your service logic                                       │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 3. User requests service via xGate
             │    xGate constructs x402 payment
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│              Daydreams Facilitator Service                   │
│          https://facilitator.daydreams.systems/              │
│                                                              │
│  Manages:                                                    │
│  • Payment verification                                      │
│  • Settlement coordination                                   │
│  • Network configuration (Base, Sepolia, etc)               │
│  • Signature validation                                      │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 4. Verifies USDC payment on Base
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Base Mainnet (EVM)                        │
│                      Chain ID: 8453                          │
│                                                              │
│  Contracts:                                                  │
│  • USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913        │
│  • Your agent wallet receives payment                       │
│  • On-chain payment verification                            │
└─────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                  Ethereum Mainnet (EVM)                      │
│                      Chain ID: 1                             │
│                                                              │
│  Contracts:                                                  │
│  • ERC-8004 Registry: 0x8004A169FB4a3325136EB29fA0ceB6D...  │
│  • Agent identity NFT (permanent on-chain metadata)         │
│  • Discoverable via xGate index                             │
└─────────────────────────────────────────────────────────────┘
```

## Request Flow

### Discovery Phase
```
User → xGate MCP → ERC-8004 Registry → Agent Metadata
                 → agents_search()
                 → Returns: name, endpoint, pricing
```

### Payment Phase
```
User → xGate MCP → fetch_resource_info()
                 → Your Agent /x402/supported
                 → Returns: payment requirements

User → xGate MCP → Constructs x402 payment
                 → Signs with user wallet
                 → Creates payment payload
```

### Execution Phase
```
User → xGate MCP → execute_resource()
                 → POST /[endpoint] with x402 header

Your Agent → Parse x402 header
          → Call facilitator.verify()
          → Facilitator checks payment on Base
          → If valid: Execute service
          → Return result to user
```

## Data Structures

### x402 Header (JSON)
```json
{
  "version": "2",
  "network": "base",
  "scheme": "exact",
  "price": "50000",
  "token": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "signature": "0x...",
  "signer": "0x...",
  "nonce": "...",
  "expiry": 1706500000
}
```

### /x402/supported Response
```json
{
  "kinds": [{
    "x402Version": 2,
    "scheme": "exact",
    "network": "base"
  }],
  "extensions": [],
  "signers": {
    "eip155:*": ["0xYourAgentWallet"]
  }
}
```

### ERC-8004 Metadata
```json
{
  "type": "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
  "name": "Your Agent Name",
  "description": "What it does",
  "image": "https://...",
  "endpoints": [{
    "name": "x402",
    "endpoint": "http://[IP]:[PORT]/[endpoint]",
    "version": "v1",
    "skills": ["category/skill"],
    "domains": ["domain1", "domain2"]
  }],
  "registrations": [],
  "supportedTrusts": ["reputation"],
  "active": true,
  "x402support": true
}
```

## Component Responsibilities

### Your Agent (Elysia Server)
- ✅ Serve x402 capability information
- ✅ Accept x402 payment headers
- ✅ Delegate verification to facilitator
- ✅ Execute service logic
- ✅ Return results
- ❌ Don't handle blockchain directly
- ❌ Don't parse complex payment proofs

### Daydreams Facilitator
- ✅ Verify payment signatures
- ✅ Check on-chain balances
- ✅ Validate amounts/tokens
- ✅ Handle settlement coordination
- ❌ Don't execute service logic
- ❌ Don't store user data

### xGate MCP
- ✅ Discover agents (ERC-8004)
- ✅ Construct x402 payments
- ✅ Manage user wallets
- ✅ Execute paid requests
- ❌ Don't provide the service
- ❌ Don't store agent logic

### ERC-8004 Registry
- ✅ Store agent metadata (immutable)
- ✅ Provide on-chain identity
- ✅ Enable discovery
- ❌ Don't handle payments
- ❌ Don't execute logic

## Network Topology

```
Internet
    │
    ├─ Your Agent (Public IP:PORT)
    │  └─ Base mainnet for payments
    │
    ├─ xGate MCP (Public API)
    │  ├─ Ethereum mainnet (ERC-8004 reads)
    │  └─ Base mainnet (payment construction)
    │
    └─ Facilitator (Public API)
       └─ Base mainnet (payment verification)
```

## Security Boundaries

```
┌─ User's Machine ─────────────────────────────┐
│ • Controls private key                       │
│ • Signs x402 payments                        │
│ • Approves USDC spending                     │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌─ xGate (Trusted) ────────────────────────────┐
│ • Manages wallet connection                  │
│ • Constructs payment proofs                  │
│ • Doesn't see private keys                   │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌─ Your Agent (Your Control) ──────────────────┐
│ • Receives x402 headers                      │
│ • Calls facilitator for verification         │
│ • Executes service if valid                  │
│ • Has own private key (for settlement)       │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌─ Facilitator (Trusted) ──────────────────────┐
│ • Verifies payment validity                  │
│ • Checks on-chain state                      │
│ • No custody of funds                        │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌─ Base Mainnet (Decentralized) ───────────────┐
│ • USDC transfers                             │
│ • Immutable payment records                  │
│ • No trust required                          │
└──────────────────────────────────────────────┘
```

## Development Workflow

```
1. Build Agent
   └─ src/index.ts with x402 endpoints

2. Test Locally
   └─ curl localhost:PORT/x402/supported

3. Deploy
   └─ Public server with open port

4. Register Identity (Optional)
   └─ Mint ERC-8004 NFT with metadata

5. Register on xGate
   └─ install_resource via MCP

6. Test End-to-End
   └─ execute_resource from Claude/Cursor

7. Share
   └─ Users discover via agents_search
```
