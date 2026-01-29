# 📦 Daydreams x402 Agent Creation Kit

**Complete toolkit for creating production-ready x402 agents**

---

## 📚 What's Included

### 1. **AGENT_CREATION_TEMPLATE.md** (Full Template)
- Complete, detailed prompt for AI agents
- Fill-in-the-blanks format
- Includes all technical requirements
- Example implementation
- Verification checklist

**Use when:** You want comprehensive guidance and details

### 2. **QUICK_AGENT_PROMPT.md** (Quick Start)
- Condensed version for fast agent creation
- Essential requirements only
- Copy-paste ready
- Minimal configuration

**Use when:** You know the basics and want speed

### 3. **TWEET_AGENT_PROMPT.txt** (Ultra-Compact)
- Twitter/social media friendly
- Core requirements in ~280 chars
- Link to full docs

**Use when:** Sharing on social media or quick reference

### 4. **AGENT_ARCHITECTURE.md** (Visual Guide)
- Flow diagrams
- Component relationships
- Data structures
- Network topology
- Security boundaries

**Use when:** You want to understand how everything connects

### 5. **EXAMPLE_AGENT.ts** (Working Code)
- Complete TypeScript implementation
- Commented and production-ready
- Replace placeholders and ship
- Includes ERC-8004 metadata generation

**Use when:** You want to see actual code or fork a starter

### 6. **EXAMPLE_PACKAGE.json** (Dependencies)
- All required npm packages
- Scripts for dev/prod
- Proper configuration

### 7. **EXAMPLE_README.md** (Documentation Template)
- Installation instructions
- API documentation
- Deployment guides
- Troubleshooting
- Security best practices

---

## 🚀 Quick Start Workflows

### Workflow 1: AI Agent Creation (Moltbot/Clawdbot/Claude)

```bash
1. Open AGENT_CREATION_TEMPLATE.md or QUICK_AGENT_PROMPT.md
2. Fill in [BRACKETS] with your values
3. Copy the entire prompt
4. Send to your AI agent in one message
5. AI creates complete project
6. Deploy and register on xGate
```

**Time:** 5-15 minutes

---

### Workflow 2: Manual Development (Developers)

```bash
1. Copy EXAMPLE_AGENT.ts to your project
2. Copy EXAMPLE_PACKAGE.json and EXAMPLE_README.md
3. Search and replace [PLACEHOLDERS]
4. Implement yourServiceLogic() function
5. bun install && bun dev
6. Test locally
7. Deploy to production
8. Register on xGate
```

**Time:** 30-60 minutes

---

### Workflow 3: Fork and Customize (Fast Track)

```bash
1. Fork/clone existing agent (e.g., leet-agent)
2. Update configuration (name, price, endpoint)
3. Replace service logic
4. Deploy
5. Register
```

**Time:** 10-20 minutes

---

## 🎯 Fill-in-the-Blanks Checklist

Before sending to your AI agent, prepare these values:

```
[ ] AGENT_NAME          = _______________________
[ ] AGENT_DESCRIPTION   = _______________________
[ ] AGENT_ENDPOINT      = _______________________  (e.g., "weather")
[ ] PRICE_USDC          = _______________________  (e.g., "0.05")
[ ] PORT                = _______________________  (e.g., 8090)
[ ] EVM_PRIVATE_KEY     = _______________________  (keep secret!)
[ ] MCP_URL             = _______________________  (your xGate MCP)
[ ] PUBLIC_IP           = _______________________  (for production)
[ ] IMAGE_URL           = _______________________  (optional avatar)
[ ] SKILLS              = _______________________  (e.g., ["data/weather"])
[ ] DOMAINS             = _______________________  (e.g., ["weather"])
```

---

## 📖 Example: Creating a Weather Agent

### Step 1: Fill Values

```
AGENT_NAME         = "Weather Oracle"
AGENT_DESCRIPTION  = "Real-time weather forecasts and current conditions"
AGENT_ENDPOINT     = "weather"
PRICE_USDC         = "0.05"
PORT               = 8093
EVM_PRIVATE_KEY    = 0x... (from wallet)
MCP_URL            = https://mcp.xgate.run/user/.../mcp?token=...
IMAGE_URL          = https://example.com/weather-icon.png
SKILLS             = ["data/weather", "api/forecast"]
DOMAINS            = ["weather", "climate"]
```

### Step 2: Send Prompt

Open `QUICK_AGENT_PROMPT.md`, replace `[BRACKETS]`, copy entire text, send to Moltbot/Claude.

### Step 3: Deploy

```bash
cd weather-oracle-agent  # AI creates this
bun install
bun dev                  # Test locally
# Deploy to VPS
bun start
```

### Step 4: Register

Via Claude with xGate MCP:
```
install_resource({
  name: "weather_oracle",
  url: "http://[YOUR_IP]:8093/weather",
  method: "POST"
})
```

### Step 5: Use

```
execute_resource({
  url: "http://[YOUR_IP]:8093/weather",
  method: "POST",
  args: { location: "London" }
})
```

---

## 🔧 Technical Stack Summary

### Required Dependencies
```json
{
  "elysia": "latest",
  "@elysiajs/cors": "latest",
  "@daydreamsai/facilitator": "latest",
  "viem": "^2.45.0",
  "dotenv": "^16.4.5"
}
```

### Required Endpoints
- `GET /` - Info
- `GET /health` - Health check
- `GET /x402/supported` - Payment capabilities
- `POST /x402/verify` - Payment verification
- `POST /x402/settle` - Payment settlement
- `POST /[your-endpoint]` - Paid service

### Required Environment
```bash
EVM_PRIVATE_KEY=0x...
PORT=8090
EVM_RPC_URL=https://mainnet.base.org
```

### Network Configuration
- **Blockchain:** Base mainnet (chain ID 8453)
- **Payment Token:** USDC (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- **Payment Protocol:** x402 v2
- **Identity:** ERC-8004 (Ethereum mainnet)

---

## 💰 Pricing Guide

**Recommended Price Points:**

| Service Type | Price Range | Example |
|-------------|-------------|---------|
| Simple API call | $0.01 - $0.05 | Weather, crypto prices |
| Data processing | $0.05 - $0.20 | Text analysis, format conversion |
| AI inference | $0.10 - $0.50 | Image generation, translation |
| Complex compute | $0.50 - $2.00 | Video processing, training |
| Premium/rare data | $1.00+ | Real-time trading signals |

**Formula:** `(Your cost + margin) / typical_requests_per_user`

**Tips:**
- Start low, increase based on usage
- Consider bulk discounts (future feature)
- Factor in Base gas costs (~$0.01/tx)
- Monitor profitability via wallet

---

## 🔒 Security Checklist

- [ ] Private key in `.env` only (not in code)
- [ ] `.env` in `.gitignore`
- [ ] CORS enabled for public access
- [ ] HTTPS in production (use Caddy/nginx)
- [ ] Rate limiting on public endpoints
- [ ] Firewall configured (ufw/iptables)
- [ ] Wallet monitoring alerts
- [ ] Separate wallet for agent (not personal funds)
- [ ] Regular balance checks
- [ ] Logs for debugging (but not payment details)

---

## 🐛 Common Issues & Fixes

### "Payment requirement not found"
**Cause:** `/x402/supported` not accessible  
**Fix:** Ensure agent is publicly accessible and port is open

### "Payment invalid"
**Cause:** Price mismatch or signature issue  
**Fix:** Check USDC amount matches exactly (micro-USDC)

### "Connection refused"
**Cause:** Agent not running or firewall blocking  
**Fix:** Check agent status, open port in firewall

### "Facilitator error"
**Cause:** Network issue or invalid config  
**Fix:** Verify Base RPC URL, check internet connection

### "No x402 header"
**Cause:** Request not via xGate or missing payment  
**Fix:** Ensure using xGate MCP or include payment header

---

## 📊 Success Metrics

Track these to measure your agent:

- **Uptime:** Target 99%+
- **Response time:** < 2 seconds
- **Payment success rate:** > 95%
- **Revenue:** Track USDC received
- **Usage:** Requests per day
- **User satisfaction:** Via feedback

---

## 🌟 Next Steps

1. ✅ Choose your template (Full/Quick/Example)
2. ✅ Fill in configuration values
3. ✅ Create agent (AI or manual)
4. ✅ Test locally
5. ✅ Deploy to production
6. ✅ Register on xGate
7. ✅ Share with community
8. ✅ Monitor and iterate

---

## 📣 Community & Support

- **GitHub:** https://github.com/daydreamsai
- **Discord:** [Join community]
- **xGate:** https://xgate.run/
- **Twitter:** #daydreamsai #x402

---

## 📄 Files in This Kit

```
AGENT_CREATION_TEMPLATE.md  (7.9 KB)  - Full detailed prompt
QUICK_AGENT_PROMPT.md       (2.2 KB)  - Quick start prompt
TWEET_AGENT_PROMPT.txt      (0.6 KB)  - Social media version
AGENT_ARCHITECTURE.md       (9.3 KB)  - Visual diagrams
EXAMPLE_AGENT.ts            (9.6 KB)  - Working code
EXAMPLE_PACKAGE.json        (0.7 KB)  - Dependencies
EXAMPLE_README.md           (6.7 KB)  - Documentation template
AGENT_TEMPLATE_SUMMARY.md   (this file) - Overview
```

**Total size:** ~47 KB of documentation and code templates

---

**Ready to build?** Start with `QUICK_AGENT_PROMPT.md` or `EXAMPLE_AGENT.ts`! 🚀

**Questions?** Check `AGENT_ARCHITECTURE.md` for technical details.

**Need help?** Join the Daydreams community on Discord.

---

*Last updated: 2026-01-29*  
*Version: 1.0.0*  
*Compatible with: Moltbot, Clawdbot, Claude Desktop, Cursor*
