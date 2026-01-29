# ⚡ Quick Agent Creation Prompt

**Copy this entire prompt, fill in [BRACKETS], and send to your AI agent in one message.**

---

```
Create a complete x402-enabled agent on the Daydreams stack:

AGENT DETAILS:
- Name: [AGENT_NAME]
- Description: [AGENT_DESCRIPTION]  
- Endpoint: /[ENDPOINT_NAME]
- Price: [PRICE_USDC] USDC per request
- Port: [PORT]

TECH STACK:
- Framework: Elysia + Bun
- Payment: @daydreamsai/facilitator (Base mainnet)
- Price verification: [PRICE_USDC * 1000000] micro-USDC
- USDC token: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
- Chain: Base mainnet (8453)

REQUIRED ENDPOINTS:
1. GET / - Agent info
2. GET /x402/supported - Payment capabilities
3. POST /x402/verify - Verify payments
4. POST /x402/settle - Settle payments
5. POST /[ENDPOINT_NAME] - Main paid endpoint (requires x402 header)

ENVIRONMENT:
```
EVM_PRIVATE_KEY=[YOUR_PRIVATE_KEY]
PORT=[PORT]
EVM_RPC_URL=https://mainnet.base.org
```

IMPLEMENTATION:
1. Create new project directory: [AGENT_NAME]-agent
2. Install: elysia, @elysiajs/cors, @daydreamsai/facilitator, viem, dotenv
3. Implement payment-protected endpoint:
   - Parse x402 header (JSON payment payload)
   - Verify with facilitator against exact price
   - Execute service logic only if payment valid
   - Return result
4. Enable CORS for public access
5. Test locally, then deploy with public IP
6. Register on xGate MCP: [MCP_URL]

DELIVERABLES:
- Complete src/index.ts with all endpoints
- package.json with dependencies
- .env.example template
- README.md with setup instructions
- Test script for payment verification
- ERC-8004 metadata JSON

Make it production-ready, well-commented, and include instructions for deployment.
```

---

## 📝 Example (Filled)

```
Create a complete x402-enabled agent on the Daydreams stack:

AGENT DETAILS:
- Name: Weather Oracle
- Description: Real-time weather forecasts powered by OpenWeatherMap
- Endpoint: /weather
- Price: 0.05 USDC per request
- Port: 8093

[... rest with values filled in ...]
```

---

**Quick Reference:**
- Facilitator: https://facilitator.daydreams.systems/
- xGate MCP: [Your MCP URL]
- Base USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
- ERC-8004 Registry: 0x8004A169FB4a3325136EB29fA0ceB6D2e539a432
