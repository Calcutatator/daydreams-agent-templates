# 🤖 Complete Agent Creation Template

**Create YOUR custom x402-enabled agent using this template**

Compatible with: Moltbot, Clawdbot, Claude, and other AI assistants

---

## 📝 STEP 1: Define Your Agent

**Fill in these details about the agent YOU want to create:**

```bash
# ============================================
# YOUR AGENT DEFINITION
# ============================================

# Core Identity
AGENT_NAME=""
# What should your agent be called?
# Example: "Weather Oracle", "Crypto Tracker", "Image Analyzer"

AGENT_DESCRIPTION=""
# What does your agent do? Be specific.
# Example: "Provides real-time weather forecasts and conditions for any location using OpenWeatherMap API"
# Example: "Analyzes images using AI to detect objects, text, and sentiment"
# Example: "Tracks cryptocurrency prices across multiple exchanges in real-time"

ENDPOINT_NAME=""
# What's the main API endpoint? (lowercase, no spaces)
# Example: "weather", "analyze", "track", "convert"
# This becomes: POST /{ENDPOINT_NAME}

# Pricing
PRICE_USDC=""
# How much to charge per request in USDC?
# Example: "0.01" (1 cent), "0.05" (5 cents), "0.10" (10 cents)
# Consider your costs + desired margin

# Deployment
PORT=""
# Which port should your agent run on?
# Example: "8090", "8091", "8092", "8093"
# Make sure it's not already in use

PUBLIC_IP=""
# Your server's public IP address (fill in after deployment, or leave as placeholder)
# Example: "1.2.3.4", or leave as "YOUR_PUBLIC_IP" for now

# Credentials
EVM_PRIVATE_KEY=""
# Your Ethereum wallet private key (0x...)
# This wallet will receive USDC payments
# KEEP THIS SECRET - never share or commit to git!

MCP_URL=""
# Your xGate MCP URL (get from https://xgate.run/)
# Example: "https://mcp.xgate.run/user/wallet%3A1%3A0x.../mcp?token=..."

# ============================================
# OPTIONAL (Improves Discoverability)
# ============================================

AGENT_IMAGE_URL=""
# URL to an image/icon for your agent
# Example: "https://example.com/my-agent-icon.png"
# Can use services like imgur, github raw, or your own server

AGENT_SKILLS=""
# Comma-separated list of skills/capabilities
# Example: "data/weather, api/forecast, location/geocoding"
# Example: "ai/vision, image/analysis, object/detection"
# Format: category/skill

AGENT_DOMAINS=""
# Comma-separated list of domains/categories
# Example: "weather, climate, forecasting"
# Example: "crypto, finance, trading"
# Helps users find your agent
```

---

## 🚀 STEP 2: Send This Complete Prompt to Your AI

**Copy everything below (with your filled variables above) and send to your AI assistant:**

```
I want to create a custom x402-enabled agent. Build it using the configuration I've provided.

========================================
MY AGENT CONFIGURATION
========================================

Identity:
- Name: ${AGENT_NAME}
- Description: ${AGENT_DESCRIPTION}
- Main Endpoint: /${ENDPOINT_NAME}
- Price: ${PRICE_USDC} USDC per request
- Port: ${PORT}
- Public URL: http://${PUBLIC_IP}:${PORT}/${ENDPOINT_NAME}

Metadata:
- Image: ${AGENT_IMAGE_URL}
- Skills: ${AGENT_SKILLS}  
- Domains: ${AGENT_DOMAINS}

Deployment:
- Wallet Private Key: ${EVM_PRIVATE_KEY}
- xGate MCP: ${MCP_URL}

========================================
TECHNICAL REQUIREMENTS
========================================

Build this agent using the Daydreams x402 stack:

Network Configuration:
- Blockchain: Base mainnet (chain ID 8453)
- Payment Token: USDC (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- Payment Protocol: x402 v2
- Facilitator: https://facilitator.daydreams.systems/

Price Configuration:
- User-facing: ${PRICE_USDC} USDC
- Contract format: ${PRICE_USDC * 1000000} (micro-USDC with 6 decimals)
- Verification: Exact price matching via facilitator

Environment:
- Runtime: Bun (or Node.js 18+)
- Language: TypeScript
- Framework: Elysia (fast web framework)

Dependencies to Install:
1. elysia - Web framework
2. @elysiajs/cors - CORS support
3. @daydreamsai/facilitator - x402 payment handling
4. viem - Blockchain interactions
5. dotenv - Environment variables

========================================
REQUIRED ENDPOINTS
========================================

Implement these 6 endpoints:

1. GET /
   Purpose: Agent information and documentation
   Payment: Not required (public)
   Returns: {
     name: string,
     description: string,
     price: string,
     endpoint: string,
     network: string,
     usage: object
   }

2. GET /health
   Purpose: Health check for monitoring
   Payment: Not required (public)
   Returns: {
     status: "ok",
     uptime: number,
     timestamp: string
   }

3. GET /x402/supported
   Purpose: Advertise payment capabilities
   Payment: Not required (public)
   Returns: {
     kinds: Array<{x402Version, scheme, network}>,
     extensions: Array,
     signers: object
   }
   Note: Delegate to facilitator.getSupported()

4. POST /x402/verify
   Purpose: Verify payment payloads
   Payment: Not required (used by payers)
   Input: Payment payload object
   Returns: Verification result
   Note: Delegate to facilitator.verify()

5. POST /x402/settle
   Purpose: Settle payments after service delivery
   Payment: Not required (used after service)
   Input: Payment payload object
   Returns: Settlement result
   Note: Delegate to facilitator.settle()

6. POST /${ENDPOINT_NAME}
   Purpose: MAIN SERVICE - Your agent's core functionality
   Payment: REQUIRED - ${PRICE_USDC} USDC via x402 header
   
   Implementation:
   a) Parse x402 header from request
   b) Verify payment with facilitator:
      - network: "base"
      - scheme: "exact"  
      - price: "${PRICE_USDC * 1000000}"
      - token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
   c) If payment valid, execute service logic
   d) Return result
   e) If payment invalid/missing, return error

========================================
SERVICE LOGIC IMPLEMENTATION
========================================

For the main /${ENDPOINT_NAME} endpoint, implement the functionality described here:

"${AGENT_DESCRIPTION}"

Key requirements:
- Parse and validate input from request body
- Execute the core service described above
- Return structured, useful results
- Handle errors gracefully
- Log important events

The implementation should be specific to this agent's purpose. Don't use placeholder code - make it actually work for the described functionality.

If external APIs are needed, include them in the implementation with proper error handling.

========================================
FACILITATOR CONFIGURATION
========================================

Set up the Daydreams facilitator like this:

\`\`\`typescript
import { createFacilitator } from "@daydreamsai/facilitator";
import { createPrivateKeyEvmSigner } from "@daydreamsai/facilitator/signers";

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
\`\`\`

========================================
PROJECT STRUCTURE
========================================

Create this file structure:

\`\`\`
${AGENT_NAME}-agent/
├── src/
│   └── index.ts           # Main agent code
├── package.json           # Dependencies and scripts
├── .env.example           # Environment template
├── .gitignore            # Protect sensitive files
├── README.md             # Complete documentation
├── test-agent.ts         # Test script
└── erc8004-metadata.json # On-chain metadata (optional)
\`\`\`

========================================
FILE CONTENTS
========================================

Generate these files with appropriate content:

1. **package.json**
   - name: "${AGENT_NAME}-agent"
   - version: "1.0.0"
   - description: "${AGENT_DESCRIPTION}"
   - scripts: dev, start, test
   - dependencies: all required packages

2. **.env.example**
   \`\`\`
   EVM_PRIVATE_KEY=0x...
   PORT=${PORT}
   EVM_RPC_URL=https://mainnet.base.org
   \`\`\`

3. **.gitignore**
   \`\`\`
   node_modules/
   .env
   *.log
   \`\`\`

4. **README.md**
   Include:
   - What the agent does (${AGENT_DESCRIPTION})
   - Installation instructions
   - Configuration guide
   - How to run (development and production)
   - API documentation for all endpoints
   - Deployment instructions
   - Security best practices
   - Testing guide

5. **test-agent.ts**
   - Test all public endpoints
   - Verify x402/supported returns valid data
   - Instructions for testing with payment

6. **erc8004-metadata.json**
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
       "skills": [${AGENT_SKILLS}],
       "domains": [${AGENT_DOMAINS}]
     }],
     "registrations": [],
     "supportedTrusts": ["reputation"],
     "active": true,
     "x402support": true
   }
   \`\`\`

========================================
SECURITY REQUIREMENTS
========================================

Implement these security measures:

1. Environment Variables
   - All secrets in .env file
   - Never hardcode private keys
   - .env in .gitignore
   - Provide .env.example

2. Input Validation
   - Validate all request inputs
   - Sanitize user data
   - Check required fields
   - Limit input sizes

3. Error Handling
   - Catch all errors
   - User-friendly error messages
   - Don't leak sensitive information
   - Log errors for debugging

4. Payment Verification
   - ALWAYS verify before execution
   - Use facilitator for all checks
   - Never trust client data
   - Return clear payment errors

5. CORS Configuration
   - Enable for public access
   - Configure allowed origins if needed

========================================
DEPLOYMENT INSTRUCTIONS
========================================

Include in README.md:

**Local Development:**
\`\`\`bash
bun install
cp .env.example .env
# Edit .env with your EVM_PRIVATE_KEY
bun dev
\`\`\`

**Testing:**
\`\`\`bash
# Test endpoints
curl http://localhost:${PORT}/
curl http://localhost:${PORT}/health
curl http://localhost:${PORT}/x402/supported
\`\`\`

**Production Deployment:**
1. Deploy to VPS (DigitalOcean, AWS, Railway, etc.)
2. Open firewall port ${PORT}
3. Set up process manager (PM2 or systemd)
4. Configure HTTPS (Caddy or nginx recommended)
5. Monitor logs and wallet balance

**xGate Registration:**
\`\`\`
# In Claude/Cursor with xGate MCP:
install_resource({
  name: "${AGENT_NAME.toLowerCase().replace(/\s+/g, '_')}",
  url: "http://${PUBLIC_IP}:${PORT}/${ENDPOINT_NAME}",
  method: "POST"
})
\`\`\`

========================================
TESTING CHECKLIST
========================================

Before considering complete, verify:

- [ ] Agent starts on port ${PORT}
- [ ] GET / returns agent info
- [ ] GET /health returns status
- [ ] GET /x402/supported returns capabilities
- [ ] POST /${ENDPOINT_NAME} rejects without payment
- [ ] Service logic works correctly
- [ ] Errors handled gracefully
- [ ] README is comprehensive
- [ ] .env.example has all variables
- [ ] No hardcoded secrets
- [ ] Code is well-commented
- [ ] TypeScript compiles without errors

========================================
OUTPUT REQUIREMENTS
========================================

Provide:

1. Complete, production-ready code
2. All configuration files
3. Comprehensive README
4. Test scripts
5. Deployment guide
6. Clear code comments
7. Proper TypeScript types
8. Security best practices

Make this agent actually work for: ${AGENT_DESCRIPTION}

Do not use placeholder logic - implement real functionality that matches the description.
```

---

## ✅ Pre-Flight Checklist

Before sending to your AI, verify you've filled in:

**Required (must fill):**
- [ ] AGENT_NAME - What to call your agent
- [ ] AGENT_DESCRIPTION - What it does (be specific!)
- [ ] ENDPOINT_NAME - Main API endpoint name
- [ ] PRICE_USDC - Price per request
- [ ] PORT - Which port to run on
- [ ] EVM_PRIVATE_KEY - Your wallet (keep secret!)
- [ ] MCP_URL - Your xGate MCP URL

**Optional (recommended):**
- [ ] PUBLIC_IP - Server IP (can fill later)
- [ ] AGENT_IMAGE_URL - Icon/avatar
- [ ] AGENT_SKILLS - Capabilities list
- [ ] AGENT_DOMAINS - Category tags

---

## 🎯 What You'll Get

Your AI will generate a **complete, working agent** customized to your specifications:

✅ Fully functional TypeScript code  
✅ All configuration files  
✅ Complete documentation  
✅ Deployment instructions  
✅ Test scripts  
✅ Security best practices  

**Estimated time:** 10-20 minutes from prompt to deployed agent

---

## 💡 Example Configurations

### Weather Agent
```bash
AGENT_NAME="Weather Oracle"
AGENT_DESCRIPTION="Provides real-time weather forecasts and current conditions for any location worldwide using OpenWeatherMap API"
ENDPOINT_NAME="weather"
PRICE_USDC="0.05"
PORT="8093"
```

### Crypto Tracker
```bash
AGENT_NAME="Crypto Price Tracker"
AGENT_DESCRIPTION="Tracks cryptocurrency prices across multiple exchanges in real-time with historical data and alerts"
ENDPOINT_NAME="track"
PRICE_USDC="0.02"
PORT="8094"
```

### Image Analyzer
```bash
AGENT_NAME="AI Image Analyzer"
AGENT_DESCRIPTION="Analyzes images using AI to detect objects, text, faces, and sentiment with detailed results"
ENDPOINT_NAME="analyze"
PRICE_USDC="0.10"
PORT="8095"
```

---

## 📚 Additional Resources

- **Quick Version:** See QUICK_AGENT_PROMPT.md for condensed template
- **Architecture:** See AGENT_ARCHITECTURE.md for system design
- **Example Code:** See EXAMPLE_AGENT.ts for reference implementation
- **Daydreams:** https://github.com/daydreamsai
- **xGate:** https://xgate.run/

---

## 🔒 Security Reminder

**NEVER:**
- Commit EVM_PRIVATE_KEY to git
- Share your private key publicly
- Hardcode secrets in code
- Skip input validation

**ALWAYS:**
- Use .env for secrets
- Validate all inputs
- Verify payments before execution
- Handle errors gracefully

---

*Template Version: 2.0.0*  
*Last Updated: 2026-01-29*  
*Create any x402-enabled agent on the Daydreams stack*
