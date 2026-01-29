# ⚡ Quick Agent Creation Prompt

**Fast-track creation for YOUR x402-enabled agent**

---

## 📋 How To Use

1. **Fill in your details** at the top of the code block below
2. **Copy the ENTIRE code block** (both your details AND the prompt)
3. **Send to your AI** — it will build your agent

**That's it.** 💀

---

## 🚀 The Prompt (Fill top section, copy everything, send to AI)

```
# ============================================
# FILL IN YOUR AGENT DETAILS HERE
# ============================================

AGENT_NAME=""
# Example: "Weather Oracle", "Crypto Price Bot", "Image Analyzer"

AGENT_DESCRIPTION=""
# Example: "Provides real-time weather forecasts for any location"
# Be specific about what your agent does

ENDPOINT_NAME=""
# Example: "weather", "price", "analyze"
# This becomes POST /your-endpoint

PRICE_USDC=""
# Example: "0.05" (5 cents), "0.10" (10 cents)

EVM_PRIVATE_KEY=""
# Your Ethereum wallet private key (0x...)
# KEEP SECRET - this receives payments

MCP_URL=""
# Your xGate MCP URL (from https://xgate.run/)
# Example: "https://mcp.xgate.run/user/wallet%3A1%3A0x.../mcp?token=..."

# ============================================
# DON'T EDIT BELOW THIS LINE
# ============================================

Create a complete x402-enabled agent on the Daydreams stack using this configuration:

========================================
MY AGENT CONFIGURATION
========================================

Identity:
- Name: ${AGENT_NAME}
- Description: ${AGENT_DESCRIPTION}
- Main Endpoint: /${ENDPOINT_NAME}
- Price: ${PRICE_USDC} USDC per request

Credentials:
- Wallet Private Key: ${EVM_PRIVATE_KEY}
- xGate MCP: ${MCP_URL}

========================================
DEPLOYMENT SETTINGS (You choose these)
========================================

Port Selection:
- Choose an available port (default: 8090)
- Check if port is in use before selecting
- Common ports: 8090, 8091, 8092, 8093

Public Access:
- Generate deployment instructions for user's server
- Include firewall setup (ufw allow PORT)
- Provide instructions for getting public IP
- Support both VPS and local deployment options

========================================
BUILD REQUIREMENTS
========================================

Use the Daydreams x402 stack:

Tech Stack:
- Framework: Elysia + Bun
- Payment: @daydreamsai/facilitator
- Blockchain: Base mainnet (chain ID 8453)
- Token: USDC (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- Protocol: x402 v2

Required Endpoints:
1. GET / - Agent info and pricing
2. GET /health - Health check
3. GET /x402/supported - Payment capabilities
4. POST /x402/verify - Verify payment payloads
5. POST /x402/settle - Settle payments
6. POST /${ENDPOINT_NAME} - Main service (payment required)

Payment Configuration:
- Price: ${PRICE_USDC} USDC (${PRICE_USDC * 1000000} micro-USDC)
- Verification: Use facilitator.verify() with exact price matching
- Payment header: Parse "x402" header from requests
- Network: "base"
- Scheme: "exact"

Environment Variables:
EVM_PRIVATE_KEY=${EVM_PRIVATE_KEY}
PORT=[Choose appropriate port, default 8090]
EVM_RPC_URL=https://mainnet.base.org

========================================
OUTPUT FORMAT REQUIREMENTS
========================================

**CRITICAL: Use industry-standard output formats for this agent type.**

Based on the agent description "${AGENT_DESCRIPTION}", determine the appropriate category and use standard outputs:

Examples by category:
- **Weather agents**: Use standard weather API format (temperature, humidity, conditions, location, timestamp)
- **Crypto/Price agents**: Use standard ticker format (symbol, price, volume, change, timestamp, exchange)
- **Image analysis agents**: Use standard vision API format (labels, confidence scores, bounding boxes, metadata)
- **Text processing agents**: Use standard NLP format (processed text, confidence, language, sentiment if applicable)
- **Data aggregation agents**: Use standard collection format (items array, pagination, metadata, counts)

Output Structure Requirements:
1. **Consistent field names** - Use industry conventions (e.g., "temp" not "temperature_value")
2. **Include metadata** - Always add timestamp, source, version
3. **Error format** - Standard error structure: { error: string, code: string, details: object }
4. **Units and formatting** - Use standard units (Celsius/Fahrenheit for temp, USD for prices, etc.)
5. **Timestamps** - ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)

Research the standard output format for agents in this category and implement it exactly.

========================================
IMPLEMENTATION INSTRUCTIONS
========================================

1. Create Project Structure:
   - Directory: ${AGENT_NAME}-agent/
   - src/index.ts (main code)
   - package.json (dependencies)
   - .env.example (environment template)
   - README.md (documentation)
   - .gitignore

2. Install Dependencies:
   - elysia
   - @elysiajs/cors
   - @daydreamsai/facilitator
   - viem
   - dotenv

3. Implement Service Logic:
   Create a function that implements the core functionality described in "${AGENT_DESCRIPTION}".
   
   **IMPORTANT:**
   - Research and use standard output formats for this type of agent
   - Include all necessary fields that users expect from this category
   - Add proper error handling with standard error formats
   - Include metadata (timestamp, version, source)

4. Payment Protection:
   The /${ENDPOINT_NAME} endpoint MUST:
   - Check for x402 header
   - Parse payment payload
   - Verify with facilitator
   - Only execute service if payment is valid
   - Return helpful errors if payment missing/invalid

5. Enable CORS:
   Allow public access for xGate and browser clients

6. Error Handling:
   - Graceful error messages
   - Log errors for debugging
   - Don't leak sensitive info

========================================
DELIVERABLES
========================================

Generate these files:

1. src/index.ts - Complete working agent code
2. package.json - All dependencies and scripts
3. .env.example - Environment variable template (with PORT default)
4. README.md - Setup, deployment, and usage instructions
   - Include section on "Getting Your Server IP"
   - Include firewall setup commands
   - Include instructions for changing port if needed
5. .gitignore - Protect sensitive files
6. test-agent.ts - Test script for local verification

Additional Documentation:
- **Deployment Guide** section in README with:
  - How to find available ports
  - How to get public IP (curl ifconfig.me)
  - Firewall configuration (ufw allow PORT)
  - Testing external access
  - Common troubleshooting

Requirements:
- Production-ready code
- Well-commented
- TypeScript types
- Security best practices
- Complete documentation
- Standard output formats for the category

Make the code specific to my agent's purpose: ${AGENT_DESCRIPTION}

Use real, working implementations - no placeholders.
```

---

## ✅ Pre-Flight Checklist

Before sending, verify you've filled in:

**Required:**
- [ ] AGENT_NAME - What's your agent called?
- [ ] AGENT_DESCRIPTION - What does it do? (be specific!)
- [ ] ENDPOINT_NAME - Main API endpoint name
- [ ] PRICE_USDC - Price per request
- [ ] EVM_PRIVATE_KEY - Your wallet key (keep secret!)
- [ ] MCP_URL - Your xGate MCP URL (from https://xgate.run/)

---

## 💡 Example Configuration

**Weather Agent:**
- AGENT_NAME: "Weather Oracle"
- AGENT_DESCRIPTION: "Provides real-time weather forecasts and current conditions for any location worldwide using OpenWeatherMap API"
- ENDPOINT_NAME: "weather"
- PRICE_USDC: "0.05"
- EVM_PRIVATE_KEY: "0xabc123..." (never share!)
- MCP_URL: "https://mcp.xgate.run/user/wallet%3A1%3A0x.../mcp?token=..."

---

## 🎯 What You'll Get

Your AI will generate:

✅ Complete TypeScript code specific to YOUR agent  
✅ Standard output formats for your agent's category  
✅ All configuration files (package.json, .env.example, etc.)  
✅ Deployment instructions (IP, firewall, testing)  
✅ Security best practices  

**Time to working agent:** 5-10 minutes

---

## 🔒 Security Reminder

**Never commit EVM_PRIVATE_KEY to git or share it publicly!**

---

## 📚 Need More Details?

- **Full Template:** See AGENT_CREATION_TEMPLATE.md for comprehensive version
- **Architecture:** See AGENT_ARCHITECTURE.md for system design
- **Examples:** See EXAMPLE_AGENT.ts for working code

---

*Quick template for creating x402-enabled agents on Daydreams stack*
