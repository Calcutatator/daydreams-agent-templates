# ⚡ Quick Agent Creation Prompt

**Copy this entire prompt, fill in the variables below, and send to your AI agent in one message.**

---

## 📝 FILL THESE FIRST (Required)

```
AGENT_NAME="Weather Oracle"
AGENT_DESCRIPTION="Real-time weather forecasts and current conditions for any location worldwide"
ENDPOINT_NAME="weather"
PRICE_USDC="0.05"
PORT="8093"
EVM_PRIVATE_KEY="0x..."
MCP_URL="https://mcp.xgate.run/user/wallet%3A1%3A0x.../mcp?token=..."
```

**Optional:**
```
AGENT_IMAGE_URL="https://example.com/weather-icon.png"
SKILLS='["data/weather", "api/forecast"]'
DOMAINS='["weather", "climate"]'
```

---

## 🤖 SEND THIS TO YOUR AI AGENT

```
Create a complete x402-enabled agent on the Daydreams stack:

AGENT DETAILS:
- Name: ${AGENT_NAME}
- Description: ${AGENT_DESCRIPTION}
- Endpoint: /${ENDPOINT_NAME}
- Price: ${PRICE_USDC} USDC per request
- Port: ${PORT}

TECH STACK:
- Framework: Elysia + Bun
- Payment: @daydreamsai/facilitator (Base mainnet)
- Price verification: exact ${PRICE_USDC * 1000000} micro-USDC
- USDC token: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
- Chain: Base mainnet (8453)

REQUIRED ENDPOINTS:
1. GET / - Agent info
2. GET /health - Health check
3. GET /x402/supported - Payment capabilities
4. POST /x402/verify - Verify payments
5. POST /x402/settle - Settle payments
6. POST /${ENDPOINT_NAME} - Main paid endpoint (requires x402 header)

ENVIRONMENT:
EVM_PRIVATE_KEY=${EVM_PRIVATE_KEY}
PORT=${PORT}
EVM_RPC_URL=https://mainnet.base.org

IMPLEMENTATION:
1. Create new project directory: ${AGENT_NAME}-agent
2. Install: elysia, @elysiajs/cors, @daydreamsai/facilitator, viem, dotenv
3. Implement payment-protected endpoint:
   - Parse x402 header (JSON payment payload)
   - Verify with facilitator against exact price
   - Execute service logic only if payment valid
   - Return result
4. Enable CORS for public access
5. Test locally, then deploy with public IP
6. Register on xGate MCP: ${MCP_URL}

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

## 📋 Checklist Before Sending

- [ ] Filled in AGENT_NAME
- [ ] Filled in AGENT_DESCRIPTION
- [ ] Filled in ENDPOINT_NAME
- [ ] Filled in PRICE_USDC (e.g., "0.05" for 5 cents)
- [ ] Filled in PORT (e.g., "8090")
- [ ] Filled in EVM_PRIVATE_KEY (your wallet private key)
- [ ] Filled in MCP_URL (your xGate MCP URL)
- [ ] Optional: Filled in AGENT_IMAGE_URL
- [ ] Optional: Filled in SKILLS
- [ ] Optional: Filled in DOMAINS

---

## 🎯 What You'll Get

Your AI will create:
1. Complete TypeScript agent code
2. package.json with all dependencies
3. .env.example template
4. README.md with setup and deployment instructions
5. Test scripts for local testing
6. ERC-8004 metadata for on-chain registration (optional)

**Time to working agent:** 5-10 minutes

---

## 🔒 Security Note

**Never share your EVM_PRIVATE_KEY publicly!** This prompt is for your AI assistant only.

---

## 💡 Example Values

```
AGENT_NAME="Weather Oracle"
AGENT_DESCRIPTION="Real-time weather forecasts powered by OpenWeatherMap API"
ENDPOINT_NAME="weather"
PRICE_USDC="0.05"
PORT="8093"
EVM_PRIVATE_KEY="0xabc123..." (never share!)
MCP_URL="https://mcp.xgate.run/user/wallet%3A1%3A0xa.../mcp?token=xyz..."
AGENT_IMAGE_URL="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun%20behind%20cloud/3D/sun_behind_cloud_3d.png"
SKILLS='["data/weather", "api/forecast", "location/geocoding"]'
DOMAINS='["weather", "climate", "forecasting"]'
```

---

## 📚 Resources

- **Daydreams:** https://github.com/daydreamsai
- **xGate:** https://xgate.run/
- **Base:** https://base.org/
- **Full Template:** See AGENT_CREATION_TEMPLATE.md for detailed version
