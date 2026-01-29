# 🤖 One-Shot Agent Creation Prompt Template

**For:** Creating a complete x402-enabled agent on the Daydreams stack  
**Compatible with:** Moltbot, Clawdbot, Claude, and other AI assistants

---

## 📋 Fill in Your Details

Before sending this prompt, replace the values in `[BRACKETS]`:

```
[AGENT_NAME] = Your agent's name (e.g., "Weather Oracle Agent")
[AGENT_DESCRIPTION] = What your agent does (1-2 sentences)
[AGENT_ENDPOINT] = The primary function/skill (e.g., "weather forecast")
[PRICE_USDC] = Price in USDC (e.g., "0.10" for 10 cents)
[PORT] = Port number (e.g., 8090, 8091, 8092)
[EVM_PRIVATE_KEY] = Your Ethereum private key (0x...)
[MCP_URL] = Your xGate MCP URL with token
```

---

## 🚀 The Prompt

Send this to your agent:

```
Create a production-ready x402-enabled agent using the Daydreams stack:

**Agent Specifications:**
- Name: [AGENT_NAME]
- Description: [AGENT_DESCRIPTION]
- Primary Function: [AGENT_ENDPOINT]
- Price: [PRICE_USDC] USDC per request
- Port: [PORT]
- Network: Base mainnet (chain ID 8453)

**Stack Requirements:**

1. **Daydreams Facilitator Integration**
   - Use `@daydreamsai/facilitator` package
   - Facilitator URL: https://facilitator.daydreams.systems/
   - Implement x402 payment verification middleware
   - Support "exact" pricing scheme on Base mainnet
   - USDC token: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

2. **x402 Endpoints (Required)**
   - `GET /` - Agent info and pricing
   - `GET /x402/supported` - Return payment capabilities
   - `POST /x402/verify` - Verify payment payloads
   - `POST /x402/settle` - Settle payment after service delivery
   - `POST /[AGENT_ENDPOINT]` - Main paid endpoint (requires x402 header)

3. **ERC-8004 Agent Identity**
   - Registry: 0x8004A169FB4a3325136EB29fA0ceB6D2e539a432 (Ethereum mainnet)
   - Metadata format: ERC-8004 registration-v1 JSON
   - Include: name, description, image, endpoints, skills, domains
   - Set x402support: true
   - Set active: true

4. **Tech Stack**
   - Framework: Elysia (TypeScript/Bun)
   - Payment: @daydreamsai/facilitator
   - Blockchain: viem for EVM interactions
   - CORS: Enabled for public access

5. **Implementation Steps**
   a) Create project structure with src/index.ts
   b) Install dependencies: bun add elysia @elysiajs/cors @daydreamsai/facilitator viem dotenv
   c) Configure .env with:
      - EVM_PRIVATE_KEY=[EVM_PRIVATE_KEY]
      - PORT=[PORT]
      - EVM_RPC_URL=https://mainnet.base.org
   d) Implement facilitator with Base mainnet signer
   e) Create payment-protected endpoint that:
      - Checks x402 header
      - Verifies payment matches price ([PRICE_USDC] USDC = [PRICE_USDC * 1000000] micro-USDC)
      - Executes service logic
      - Returns result
   f) Add health check and info endpoints
   g) Test locally on localhost:[PORT]
   h) Deploy to public server with port [PORT] open

6. **xGate MCP Registration**
   - MCP URL: [MCP_URL]
   - Use `install_resource` or `execute_resource` tools
   - Resource URL: http://[PUBLIC_IP]:[PORT]/[AGENT_ENDPOINT]
   - Method: POST
   - Let xGate auto-discover payment requirements via /x402/supported

7. **Code Template Structure**
```typescript
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { createFacilitator } from "@daydreamsai/facilitator";
import { createPrivateKeyEvmSigner } from "@daydreamsai/facilitator/signers";

const PORT = process.env.PORT || [PORT];
const PRICE_USDC_MICRO = "[PRICE_USDC * 1000000]"; // [PRICE_USDC] USDC
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

const facilitator = createFacilitator({
  facilitatorUrl: "https://facilitator.daydreams.systems",
  evmSigners: [{
    signer: createPrivateKeyEvmSigner({
      privateKey: process.env.EVM_PRIVATE_KEY as \`0x\${string}\`,
      network: "base",
      rpcUrl: "https://mainnet.base.org",
    }),
    networks: ["base"],
    schemes: ["exact"],
  }],
});

const app = new Elysia()
  .use(cors())
  .get("/", () => ({
    name: "[AGENT_NAME]",
    description: "[AGENT_DESCRIPTION]",
    price: "[PRICE_USDC] USDC",
    endpoint: "/[AGENT_ENDPOINT]",
    network: "Base Mainnet",
  }))
  .get("/x402/supported", () => facilitator.getSupported())
  .post("/x402/verify", async ({ body }) => await facilitator.verify(body))
  .post("/x402/settle", async ({ body }) => await facilitator.settle(body))
  .post("/[AGENT_ENDPOINT]", async ({ body, headers }) => {
    const x402Header = headers["x402"] || headers["X402"];
    if (!x402Header) {
      return { error: "Payment required: missing x402 header" };
    }

    const paymentPayload = JSON.parse(x402Header);
    const verification = await facilitator.verify(paymentPayload, {
      network: "base",
      scheme: "exact",
      price: PRICE_USDC_MICRO,
      token: USDC_BASE,
    });

    if (!verification.isValid) {
      return { error: "Payment invalid", details: verification.invalidReason };
    }

    // TODO: Implement your agent logic here
    const result = await yourAgentLogic(body);
    
    return { success: true, result };
  })
  .listen(PORT);

console.log(\`🚀 [AGENT_NAME] running on port \${PORT}\`);
```

**Output Requirements:**
1. Complete working code in a new directory
2. package.json with all dependencies
3. .env.example template
4. README.md with setup instructions
5. Test script to verify x402 payment flow
6. ERC-8004 metadata JSON for on-chain registration
7. Instructions for deploying to production
8. Command to register with xGate MCP

**Verification Checklist:**
- [ ] Agent responds to http://localhost:[PORT]/
- [ ] /x402/supported returns valid capabilities
- [ ] Main endpoint rejects requests without x402 header
- [ ] Main endpoint accepts valid x402 payment
- [ ] Code is well-commented and production-ready
- [ ] .env.example includes all required variables
- [ ] README has clear deployment instructions

Run all tests and confirm the agent is ready for production deployment.
```

---

## 🎯 Example: Weather Oracle Agent

Here's a filled-in example:

```
Create a production-ready x402-enabled agent using the Daydreams stack:

**Agent Specifications:**
- Name: Weather Oracle Agent
- Description: Provides real-time weather forecasts and current conditions for any location worldwide using OpenWeatherMap API.
- Primary Function: weather
- Price: 0.05 USDC per request
- Port: 8093
- Network: Base mainnet (chain ID 8453)

[... rest of template with values filled in ...]
```

---

## 💡 Tips for Users

**Before Running:**
1. Get testnet ETH from https://sepoliafaucet.com (for testing)
2. Get Base mainnet ETH for production (~$5-10)
3. Get USDC on Base for testing payments
4. Create a fresh wallet for the agent (security)
5. Keep your EVM_PRIVATE_KEY secure (never commit to git)

**After Creation:**
1. Test locally first (localhost)
2. Open firewall port for public access
3. Get your public IP: `curl ifconfig.me`
4. Test from external network
5. Register on xGate via MCP
6. Share your agent URL with users

**Common Issues:**
- "Payment requirement not found" → Your /x402/supported endpoint isn't accessible
- "Payment invalid" → Check USDC amount matches exactly
- "Connection refused" → Firewall blocking port or agent not running
- "Contract reverted" → Not enough gas or USDC balance

---

## 📚 Resources

- **Daydreams Docs:** https://github.com/daydreamsai
- **ERC-8004 Spec:** https://eips.ethereum.org/EIPS/eip-8004
- **x402 Standard:** https://github.com/standard-crypto/x402
- **xGate:** https://xgate.run/
- **Base Network:** https://base.org/
- **Facilitator:** https://facilitator.daydreams.systems/

---

## 🔒 Security Notes

- Never share your EVM_PRIVATE_KEY
- Use environment variables, never hardcode keys
- Test on testnet before mainnet
- Start with small USDC amounts
- Monitor your agent's wallet balance
- Set up alerts for unexpected activity

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-29  
**Tested With:** Clawdbot, Moltbot, Claude Desktop
