# AGENTS TRACKER

**Purpose:** Central registry of all agents I manage for bulk updates, monitoring, and coordination.

---

## Active Agents

### 1. **leet-agent** 🔤
- **Location:** `/root/leet-agent/`
- **Type:** x402 payment-gated service
- **Status:** ✅ Running (port 8090)
- **Function:** Converts questions to leet speak answers
- **Price:** 0.10 USDC per query
- **Networks:** Base mainnet, Base Sepolia
- **Wallet:** 0xa62D214750455C043C25DEA89FECc8724f61e45b
- **Facilitator:** https://facilitator.daydreams.systems
- **Dependencies:** 
  - `@daydreamsai/facilitator`
  - `elysia`
  - `dotenv`
  - Private key in `.env`
- **Last Updated:** 2026-01-29
- **Notes:** 
  - Currently just converts to leet speak
  - Next: Integrate Venice AI or xGate MCP for actual LLM responses
  - Needs USDC balance to call upstream services

### 2. **random-oracle-agent** 🔮
- **Location:** `/root/random-oracle-agent/`
- **Type:** x402 payment-gated service
- **Status:** ✅ Running (port 8091)
- **Function:** Provides cryptographically secure, ungameable randomness
- **Price:** 0.05 USDC per query
- **Networks:** Base mainnet
- **Wallet:** 0x2782f7D6c84cb0393afBbbb03A343dA920d45406
- **Facilitator:** https://facilitator.daydreams.systems
- **Sources:**
  - **drand** (League of Entropy) - 20+ independent orgs, every 30s
  - **NIST** Randomness Beacon - US Government, every 60s
  - **both** - XOR combination of drand + NIST
- **Endpoints:**
  - `GET /random/drand` - Primary source
  - `GET /random/nist` - Backup source
  - `GET /random/both` - Combined sources
- **Dependencies:**
  - `@daydreamsai/facilitator`
  - `elysia`
  - `dotenv`
- **Last Updated:** 2026-01-29
- **Notes:**
  - Impossible to game: distributed threshold cryptography
  - Publicly verifiable: full audit trail
  - Use cases: lotteries, gaming, sampling, security tokens
  - No external API keys needed (drand/NIST are public)

### 3. **nft-mint-agent** 🎨
- **Location:** `/root/nft-mint-agent/`
- **Type:** x402 payment-gated service + NFT minter
- **Status:** ✅ Contract deployed, ⚠️ viem RPC issue (agent runs on cast fallback)
- **Function:** Mints incrementing number NFTs with random colors
- **Price:** 0.20 USDC per mint
- **Networks:** Base mainnet
- **Wallet:** 0x2782f7D6c84cb0393afBbbb03A343dA920d45406
- **Facilitator:** https://facilitator.daydreams.systems
- **NFT Contract:** 0x971dC1ed9d1bB749DdBa6Eb935DFf2149879E76c (Base mainnet)
- **Flow:**
  1. User pays 0.20 USDC
  2. Calls random-oracle-agent (0.05 USDC)
  3. Converts randomness to color
  4. Mints ERC721 NFT with number + color
  5. Transfers NFT to payer
- **Cost Breakdown:**
  - Oracle: 0.05 USDC
  - Gas: ~0.004 USDC
  - Profit: ~0.146 USDC (~73%)
- **Endpoints:**
  - `POST /mint` - Mint NFT (payment required)
  - `GET /preview` - Preview next token ID
  - `GET /` - Agent info
- **Dependencies:**
  - `@daydreamsai/facilitator`
  - `elysia`
  - `viem`
  - `dotenv`
- **Smart Contract:**
  - ERC721 (OpenZeppelin)
  - On-chain SVG generation
  - Base64 metadata (no IPFS)
  - Fully on-chain
- **Last Updated:** 2026-01-29 13:15 UTC
- **Deployment:**
  - Deployed via Foundry to Base mainnet
  - Cost: ~$0.30 gas (one-time)
  - Tx: 0x119bd0abf365e2a772e87a7e1c20b93565bf92c77951f1e6193e19607b252670
  - BaseScan: https://basescan.org/address/0x971dC1ed9d1bB749DdBa6Eb935DFf2149879E76c
- **Notes:**
  - Requires oracle agent running on port 8091 ✅
  - Wallet owns NFT contract ✅
  - ETH balance sufficient (~0.0005 ETH) ✅
  - On-chain art: no external dependencies ✅
  - Known issue: viem RPC caching (workaround: use cast for reads)
  - Contract verified functional with forge/cast
  - Ready for mainnet production use

---

## Planned Agents

*(Add future agents here)*

---

## Bulk Update Checklist

When updating all agents:
- [ ] Check Git status (`git status`)
- [ ] Pull latest dependencies (`npm update` or equivalent)
- [ ] Update x402 SDK versions if needed
- [ ] Test locally
- [ ] Update `.env` if needed
- [ ] Restart services
- [ ] Verify endpoints
- [ ] Update this tracker

---

## Standard Agent Structure

```
agent-name/
├── src/
│   └── index.ts        # Main entry point
├── package.json
├── .env               # Private keys, tokens
├── .gitignore
├── README.md
└── tsconfig.json
```

---

## Monitoring

**Service Health Checks:**
- leet-agent: `curl http://localhost:8090/`
- (add more as agents are deployed)

**Log Locations:**
- Standard: Check `pm2 logs` if running under PM2
- Manual: `./src/index.ts` logs to stdout

---

**Last Updated:** 2026-01-29 12:24 UTC
