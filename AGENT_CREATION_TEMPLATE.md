# 🤖 Complete Agent Creation Prompt

**For:** Creating a production-ready x402-enabled agent on the Daydreams stack  
**Compatible with:** Moltbot, Clawdbot, Claude, and other AI assistants

---

## 📝 STEP 1: Fill in Your Variables

Copy this block and fill in all the values:

```bash
# ============================================
# FILL THESE VALUES FIRST
# ============================================

# Required Variables
AGENT_NAME="Weather Oracle"
AGENT_DESCRIPTION="Real-time weather forecasts and current conditions for any location worldwide using OpenWeatherMap API"
ENDPOINT_NAME="weather"
PRICE_USDC="0.05"
PORT="8093"
EVM_PRIVATE_KEY="0x..."
PUBLIC_IP="1.2.3.4"  # Your server's public IP (or leave as placeholder)
MCP_URL="https://mcp.xgate.run/user/wallet%3A1%3A0x.../mcp?token=..."

# Optional Variables (for better discoverability)
AGENT_IMAGE_URL="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun%20behind%20cloud/3D/sun_behind_cloud_3d.png"
AGENT_SKILLS='["data/weather", "api/forecast", "location/geocoding"]'
AGENT_DOMAINS='["weather", "climate", "forecasting"]'
```

---

## 🚀 STEP 2: Send This Complete Prompt to Your AI

```
Create a production-ready x402-enabled agent using the Daydreams stack.

========================================
CONFIGURATION
========================================

Agent Details:
- Name: ${AGENT_NAME}
- Description: ${AGENT_DESCRIPTION}
- Endpoint: /${ENDPOINT_NAME}
- Price: ${PRICE_USDC} USDC per request
- Port: ${PORT}
- Public URL: http://${PUBLIC_IP}:${PORT}/${ENDPOINT_NAME}
- Image: ${AGENT_IMAGE_URL}
- Skills: ${AGENT_SKILLS}
- Domains: ${AGENT_DOMAINS}

Network:
- Blockchain: Base mainnet (chain ID 8453)
- USDC Token: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
- Payment Protocol: x402 v2
- Facilitator: https://facilitator.daydreams.systems/

Price Configuration:
- User-facing: ${PRICE_USDC} USDC
- Contract format: ${PRICE_USDC * 1000000} (micro-USDC, 6 decimals)

Environment:
- EVM_PRIVATE_KEY: ${EVM_PRIVATE_KEY}
- PORT: ${PORT}
- EVM_RPC_URL: https://mainnet.base.org

========================================
TECHNICAL REQUIREMENTS
========================================

1. Framework & Runtime:
   - Elysia web framework
   - Bun runtime (or Node.js 18+)
   - TypeScript

2. Dependencies:
   - elysia
   - @elysiajs/cors
   - @daydreamsai/facilitator
   - viem (for blockchain interactions)
   - dotenv (for environment variables)

3. Required Endpoints:

   a) GET /
      - Returns agent info, pricing, and endpoint documentation
      - Public endpoint (no payment required)
   
   b) GET /health
      - Health check endpoint
      - Returns status, uptime
      - Public endpoint
   
   c) GET /x402/supported
      - Returns payment capabilities
      - Format: { kinds: [...], signers: {...} }
      - Public endpoint
   
   d) POST /x402/verify
      - Verifies payment payloads
      - Delegates to facilitator
      - Public endpoint
   
   e) POST /x402/settle
      - Settles payments after service delivery
      - Delegates to facilitator
      - Public endpoint
   
   f) POST /${ENDPOINT_NAME}
      - Main service endpoint (PAID)
      - Requires x402 payment header
      - Verifies payment before execution
      - Returns service result

4. Payment Flow Implementation:

   Step 1: Parse x402 header from request
   ```typescript
   const x402Header = headers["x402"] || headers["X402"];
   if (!x402Header) {
     return { error: "Payment required: missing x402 header" };
   }
   ```

   Step 2: Verify payment with facilitator
   ```typescript
   const paymentPayload = JSON.parse(x402Header);
   const verification = await facilitator.verify(paymentPayload, {
     network: "base",
     scheme: "exact",
     price: "${PRICE_USDC * 1000000}",
     token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
   });
   ```

   Step 3: Check validation result
   ```typescript
   if (!verification.isValid) {
     return { error: "Payment invalid", details: verification.invalidReason };
   }
   ```

   Step 4: Execute service logic
   ```typescript
   const result = await yourServiceLogic(requestBody);
   return { success: true, result };
   ```

5. Facilitator Configuration:
   ```typescript
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
   ```

6. CORS Configuration:
   - Enable CORS for public access
   - Allow all origins (or specific if needed)
   - Required for xGate and browser access

========================================
PROJECT STRUCTURE
========================================

Generate this structure:

\`\`\`
${AGENT_NAME}-agent/
├── src/
│   └── index.ts           # Main agent code
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variable template
├── .gitignore            # Git ignore patterns
├── README.md             # Setup and usage documentation
├── test-agent.ts         # Test script
└── erc8004-metadata.json # On-chain registration metadata (optional)
\`\`\`

========================================
FILE CONTENTS
========================================

1. package.json:
   - Include all required dependencies
   - Scripts: "dev", "start", "test"
   - Name: "${AGENT_NAME}-agent"
   - Version: "1.0.0"

2. .env.example:
   \`\`\`
   EVM_PRIVATE_KEY=0x...
   PORT=${PORT}
   EVM_RPC_URL=https://mainnet.base.org
   \`\`\`

3. .gitignore:
   \`\`\`
   node_modules/
   .env
   *.log
   \`\`\`

4. README.md:
   - What the agent does
   - Installation instructions
   - Configuration guide
   - How to run (dev and production)
   - API documentation
   - Deployment instructions
   - Security best practices

5. test-agent.ts:
   - Test script to verify endpoints
   - Test /health, /x402/supported
   - Explain how to test with payment

6. erc8004-metadata.json:
   \`\`\`json
   {
     "type": "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
     "name": "${AGENT_NAME}",
     "description": "${AGENT_DESCRIPTION}",
     "image": "${AGENT_IMAGE_URL}",
     "endpoints": [{
       "name": "x402",
       "endpoint": "http://${PUBLIC_IP}:${PORT}/${ENDPOINT_NAME}",
       "version": "v1",
       "skills": ${AGENT_SKILLS},
       "domains": ${AGENT_DOMAINS}
     }],
     "registrations": [],
     "supportedTrusts": ["reputation"],
     "active": true,
     "x402support": true
   }
   \`\`\`

========================================
SERVICE LOGIC
========================================

Implement the core service in a dedicated function:

\`\`\`typescript
async function yourServiceLogic(requestBody: any): Promise<any> {
  // TODO: Implement your agent's core functionality here
  
  // Examples:
  // - Call external API (weather, crypto prices, etc.)
  // - Run AI inference (sentiment, translation, etc.)
  // - Process data (validation, transformation, etc.)
  // - Query database
  // - Generate content
  
  // Return your service result
  return {
    // Your response data
  };
}
\`\`\`

For ${AGENT_NAME}:
- Parse input from requestBody
- Call appropriate external services
- Process and format results
- Return structured response

========================================
DEPLOYMENT INSTRUCTIONS
========================================

Include in README.md:

1. Local Development:
   \`\`\`bash
   bun install
   cp .env.example .env
   # Edit .env with your private key
   bun dev
   \`\`\`

2. Production Deployment:
   - VPS setup (DigitalOcean, AWS, etc.)
   - Open firewall port ${PORT}
   - Use PM2 or systemd for process management
   - Set up HTTPS with Caddy or nginx (recommended)
   - Monitor logs and wallet balance

3. xGate Registration:
   \`\`\`
   # Via MCP in Claude/Cursor:
   install_resource({
     name: "${AGENT_NAME.toLowerCase().replace(/ /g, '_')}",
     url: "http://${PUBLIC_IP}:${PORT}/${ENDPOINT_NAME}",
     method: "POST"
   })
   \`\`\`

========================================
SECURITY REQUIREMENTS
========================================

Implement these security measures:

1. Environment Variables:
   - Never hardcode private keys
   - Use .env for all secrets
   - Add .env to .gitignore
   - Provide .env.example template

2. Input Validation:
   - Validate all request inputs
   - Sanitize user data
   - Check for required fields
   - Limit input sizes

3. Error Handling:
   - Catch all errors gracefully
   - Don't leak sensitive info in error messages
   - Log errors for debugging
   - Return user-friendly error messages

4. Rate Limiting:
   - Consider adding rate limits to public endpoints
   - Protect against abuse
   - Monitor for unusual patterns

5. Payment Verification:
   - Always verify payments before service execution
   - Use facilitator for all payment checks
   - Never trust client-provided payment data
   - Log payment attempts for debugging

========================================
TESTING CHECKLIST
========================================

Verify these before completion:

- [ ] Agent starts successfully on port ${PORT}
- [ ] GET / returns agent information
- [ ] GET /health returns status
- [ ] GET /x402/supported returns valid capabilities
- [ ] POST /${ENDPOINT_NAME} rejects requests without payment
- [ ] Payment verification works with test payload
- [ ] Service logic executes correctly
- [ ] Error handling works properly
- [ ] README has complete setup instructions
- [ ] .env.example includes all required variables
- [ ] Code is well-commented
- [ ] TypeScript types are correct
- [ ] No hardcoded secrets

========================================
OUTPUT REQUIREMENTS
========================================

Provide:

1. Complete, production-ready code
2. All configuration files
3. Comprehensive README
4. Test scripts
5. Deployment guide
6. Comments explaining key sections
7. Error handling throughout
8. Security best practices implemented

Make the code:
- Clean and readable
- Well-documented
- TypeScript compliant
- Production-ready
- Easy to understand and modify

Do not use placeholder code - implement fully working examples.
```

---

## ✅ Verification Checklist

Before sending, ensure you've filled in:

- [ ] AGENT_NAME
- [ ] AGENT_DESCRIPTION  
- [ ] ENDPOINT_NAME
- [ ] PRICE_USDC
- [ ] PORT
- [ ] EVM_PRIVATE_KEY (keep this secure!)
- [ ] PUBLIC_IP (or leave as placeholder for later)
- [ ] MCP_URL
- [ ] Optional: AGENT_IMAGE_URL
- [ ] Optional: AGENT_SKILLS
- [ ] Optional: AGENT_DOMAINS

---

## 🎯 What You'll Get

Your AI will generate:

1. **Complete Code** - Fully functional TypeScript agent
2. **Configuration** - package.json, .env.example, .gitignore
3. **Documentation** - README with setup, API docs, deployment guide
4. **Test Scripts** - Verify functionality before deployment
5. **Metadata** - ERC-8004 JSON for on-chain registration
6. **Best Practices** - Security, error handling, logging

**Estimated Time:** 5-15 minutes from prompt to working agent

---

## 📚 Resources

- **Daydreams GitHub:** https://github.com/daydreamsai
- **xGate Platform:** https://xgate.run/
- **ERC-8004 Spec:** https://eips.ethereum.org/EIPS/eip-8004
- **Base Network:** https://base.org/
- **Facilitator:** https://facilitator.daydreams.systems/

---

## 🔒 Security Warning

**Never share your EVM_PRIVATE_KEY publicly or commit it to git!**

This prompt is meant for your private AI assistant only. The generated code will properly use environment variables to keep your keys secure.

---

*Template Version: 2.0.0*  
*Last Updated: 2026-01-29*
