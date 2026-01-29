# Live x402 Agents

All agents are publicly accessible and accept x402 payments on Base mainnet.

**Server:** `46.224.229.228`  
**Wallet:** `0x2782f7D6c84cb0393afBbbb03A343dA920d45406`  
**Facilitator:** `https://facilitator.daydreams.systems`

---

## 1. 🔤 Leet Speak Agent

**Port:** 8090  
**Price:** 0.10 USDC per question  
**Endpoint:** `http://46.224.229.228:8090/ask`

Converts your questions to leet speak answers.

### Test it:
```bash
# Check x402 support
curl http://46.224.229.228:8090/x402/supported

# Get info
curl http://46.224.229.228:8090/
```

---

## 2. 🔮 Random Oracle Agent

**Port:** 8091  
**Price:** 0.05 USDC per query  
**Endpoints:**
- `GET /random/drand` - League of Entropy randomness
- `GET /random/nist` - NIST Beacon randomness  
- `GET /random/both` - Combined XOR of both sources

Cryptographically secure, ungameable randomness from:
- **drand:** 20+ independent orgs, every 30s
- **NIST:** US Government beacon, every 60s

### Test it:
```bash
# Check x402 support
curl http://46.224.229.228:8091/x402/supported

# Get info
curl http://46.224.229.228:8091/
```

---

## 3. 🎨 NFT Mint Agent

**Port:** 8092  
**Price:** 0.20 USDC per mint  
**Endpoint:** `POST http://46.224.229.228:8092/mint`

Mints an ERC721 NFT with:
- Incrementing number (Token ID)
- Random color from oracle
- On-chain SVG art
- Fully on-chain metadata

**Contract:** `0x971dC1ed9d1bB749DdBa6Eb935DFf2149879E76c` (Base mainnet)  
**BaseScan:** https://basescan.org/address/0x971dC1ed9d1bB749DdBa6Eb935DFf2149879E76c

### Flow:
1. User pays 0.20 USDC via x402
2. Agent calls random-oracle (0.05 USDC)
3. Converts randomness to hex color
4. Mints NFT with on-chain SVG
5. Transfers to payer

### Test it:
```bash
# Check x402 support
curl http://46.224.229.228:8092/x402/supported

# Get info (may error due to viem RPC issue, but agent works for payments)
curl http://46.224.229.228:8092/
```

---

## Usage

All agents follow x402 v2 protocol:

1. **Discover:** `GET /x402/supported`
2. **Create payment:** Sign EIP-3009 authorization
3. **Call endpoint:** Include payment in `x402` header
4. **Verify:** Agent verifies with Daydreams facilitator
5. **Execute:** Service runs and returns result

### Manual Payment Example

```typescript
import { ExactEvmScheme, toClientEvmSigner } from "@x402/evm";
import { privateKeyToAccount } from "viem/accounts";

// Setup wallet
const account = privateKeyToAccount("0x...");
const signer = toClientEvmSigner(account);
const client = new ExactEvmScheme(signer);

// Create payment
const payment = await client.createPaymentPayload(2, {
  scheme: "exact",
  network: "base",
  amount: "200000", // 0.20 USDC
  asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  payTo: "0x2782f7D6c84cb0393afBbbb03A343dA920d45406",
  maxTimeoutSeconds: 3600,
  extra: { name: "USD Coin", version: "2" },
});

// Call agent
const response = await fetch("http://46.224.229.228:8092/mint", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x402": JSON.stringify(payment),
  },
});

const result = await response.json();
```

---

## xGate Integration

When xGate's discovery component goes live, these agents will be auto-discoverable via:

- **xGate MCP Server:** `https://mcp.xgate.run/user/...`
- **xGate Directory:** Browse and install via xGate UI
- **One-click execution:** MCP handles payments automatically

For now, users can call them directly if they know the URLs.

---

## Monitoring

Agents run continuously in background. Check status:

```bash
# Check process
ps aux | grep "bun run src/index.ts"

# View logs
tail -f /tmp/leet-agent.log
tail -f /tmp/random-oracle.log
tail -f /tmp/nft-mint.log

# Restart if needed
cd /root/{agent-name} && bun run src/index.ts &
```

---

**Last Updated:** 2026-01-29  
**Status:** ✅ All agents live and accepting payments
