# 🤖 Daydreams x402 Agent Templates

**One-shot prompts and templates for creating production-ready x402-enabled agents on the Daydreams stack**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bun](https://img.shields.io/badge/Bun-v1.0+-000000?logo=bun)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## 🎯 What Is This?

A complete toolkit for creating **production-ready AI agents** that accept payments via the **x402 protocol**. Perfect for:

- 🤖 **AI assistants** (Moltbot, Claude, Cursor) - Generate complete agents from one prompt
- 💻 **Developers** - Copy-paste working code and customize
- 🎓 **Learners** - Understand the full stack with visual diagrams

Built on the **Daydreams stack**: Elysia + x402 + Base mainnet USDC

---

## ⚡ Quick Start (30 seconds)

**Using an AI agent (Moltbot/Claude):**

1. Open [`QUICK_AGENT_PROMPT.md`](QUICK_AGENT_PROMPT.md)
2. Fill in `[BRACKETS]` with your values
3. Copy entire prompt
4. Send to your AI agent
5. Deploy generated code

**Using code templates:**

```bash
# Copy the example agent
cp EXAMPLE_AGENT.ts your-agent/src/index.ts
cp EXAMPLE_PACKAGE.json your-agent/package.json

# Replace placeholders and implement logic
# Then:
bun install
bun dev
```

---

## 📚 Templates Included

| File | Description | Size | Best For |
|------|-------------|------|----------|
| **[TEMPLATES_INDEX.md](TEMPLATES_INDEX.md)** | 📖 Start here - Navigation hub | 5.7 KB | Finding what you need |
| **[AGENT_CREATION_TEMPLATE.md](AGENT_CREATION_TEMPLATE.md)** | 🎯 Full AI prompt (comprehensive) | 7.9 KB | Complete guidance |
| **[QUICK_AGENT_PROMPT.md](QUICK_AGENT_PROMPT.md)** | ⚡ Quick AI prompt (condensed) | 2.2 KB | Fast prototyping |
| **[TWEET_AGENT_PROMPT.txt](TWEET_AGENT_PROMPT.txt)** | 🐦 Ultra-compact version | 628 B | Social sharing |
| **[AGENT_ARCHITECTURE.md](AGENT_ARCHITECTURE.md)** | 🏗️ Visual diagrams & flows | 9.3 KB | Understanding the stack |
| **[EXAMPLE_AGENT.ts](EXAMPLE_AGENT.ts)** | 💻 Complete working code | 9.6 KB | Copy-paste starter |
| **[EXAMPLE_PACKAGE.json](EXAMPLE_PACKAGE.json)** | 📦 NPM dependencies | 716 B | Package config |
| **[EXAMPLE_README.md](EXAMPLE_README.md)** | 📝 Documentation template | 6.7 KB | Project docs |
| **[AGENT_TEMPLATE_SUMMARY.md](AGENT_TEMPLATE_SUMMARY.md)** | 📋 Overview & guide | 8.6 KB | How to use templates |

---

## 🚀 What You Get

From a single prompt, create an agent with:

- ✅ **x402 payment verification** (USDC on Base mainnet)
- ✅ **All required endpoints** (`/`, `/health`, `/x402/*`, your service)
- ✅ **Daydreams facilitator** integration
- ✅ **Production-ready code** (TypeScript + Elysia)
- ✅ **Security best practices** (env vars, CORS, validation)
- ✅ **Deployment guide** (VPS, Docker, PM2)
- ✅ **xGate MCP registration** instructions
- ✅ **Complete documentation** (README + API docs)

---

## 🛠️ Tech Stack

- **Framework:** [Elysia](https://elysiajs.com/) (fast TypeScript web framework)
- **Runtime:** [Bun](https://bun.sh) (fast JavaScript runtime)
- **Payments:** [@daydreamsai/facilitator](https://github.com/daydreamsai) (x402 protocol)
- **Blockchain:** [viem](https://viem.sh) (Base mainnet interactions)
- **Network:** [Base](https://base.org/) (Ethereum L2 for payments)
- **Token:** USDC (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)
- **Identity:** [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) (optional on-chain agent registry)

---

## 📖 Example: Weather Agent

**Input prompt:**
```
Create an x402 agent:
Name: Weather Oracle
Function: Real-time weather forecasts
Price: 0.05 USDC
Port: 8093
[... use QUICK_AGENT_PROMPT.md ...]
```

**Output:** Complete agent with:
- Weather API integration
- x402 payment verification
- All endpoints configured
- Deployment instructions

**Deploy:**
```bash
cd weather-oracle-agent
bun install
bun start
```

**Register on xGate:**
```javascript
install_resource({
  name: "weather_oracle",
  url: "http://your-ip:8093/weather",
  method: "POST"
})
```

**Use:**
```javascript
execute_resource({
  url: "http://your-ip:8093/weather",
  method: "POST",
  args: { location: "London" }
})
```

---

## 🎯 Use Cases

Agents built with these templates:

| Type | Example | Price | Complexity |
|------|---------|-------|------------|
| **Data Services** | Weather, crypto prices, stock data | $0.01-0.05 | Easy |
| **Text Processing** | Translation, summarization, analysis | $0.05-0.20 | Medium |
| **AI Inference** | Image generation, sentiment analysis | $0.10-0.50 | Medium |
| **Blockchain** | NFT minting, token swaps, queries | $0.20-1.00 | Hard |
| **Custom APIs** | Any paid service you can imagine | Variable | Variable |

---

## 📐 Architecture

```
User (Claude/Cursor)
    ↓
xGate MCP (constructs x402 payment)
    ↓
Your Agent (this template)
    ↓
Daydreams Facilitator (verifies payment)
    ↓
Base Mainnet (USDC transfer)
```

See [`AGENT_ARCHITECTURE.md`](AGENT_ARCHITECTURE.md) for detailed diagrams.

---

## 💰 Pricing Guide

| Service Type | Recommended Price | Example |
|-------------|-------------------|---------|
| Simple API call | $0.01 - $0.05 | Weather, prices |
| Data processing | $0.05 - $0.20 | Analysis, conversion |
| AI inference | $0.10 - $0.50 | Generation, translation |
| Complex compute | $0.50 - $2.00 | Video, training |
| Premium data | $1.00+ | Trading signals |

---

## 🔒 Security Checklist

- ✅ Private keys in `.env` only (never in code)
- ✅ `.env` in `.gitignore`
- ✅ CORS enabled for public access
- ✅ HTTPS in production (Caddy/nginx)
- ✅ Rate limiting on public endpoints
- ✅ Separate wallet for agent
- ✅ Monitor balance and transactions
- ✅ Input validation and sanitization

---

## 🚦 Getting Started

### Choose Your Path

**🤖 AI-Powered Creation** (5-10 min)
1. Use [`QUICK_AGENT_PROMPT.md`](QUICK_AGENT_PROMPT.md)
2. Send to Moltbot/Claude
3. Deploy generated code

**💻 Developer Template** (15-30 min)
1. Copy [`EXAMPLE_AGENT.ts`](EXAMPLE_AGENT.ts)
2. Customize logic
3. Deploy

**🎓 Learning Path** (1-2 hours)
1. Read [`AGENT_ARCHITECTURE.md`](AGENT_ARCHITECTURE.md)
2. Follow [`AGENT_CREATION_TEMPLATE.md`](AGENT_CREATION_TEMPLATE.md)
3. Build from scratch

---

## 📋 Requirements

**Development:**
- [Bun](https://bun.sh) v1.0+ (or Node.js 18+)
- Ethereum wallet with private key
- Text editor or IDE

**Production:**
- VPS or hosting (DigitalOcean, AWS, Railway, etc.)
- Public IP address
- Open port (e.g., 8090)
- ~$10 ETH on Base mainnet (for gas)

**Optional:**
- [xGate MCP](https://xgate.run/) account (for easy registration)
- Domain name + SSL certificate
- [ERC-8004 registry](https://eips.ethereum.org/EIPS/eip-8004) (for on-chain identity)

---

## 🌟 Real-World Examples

Agents built during template development:

### 1. Leet Speak Agent
- **Endpoint:** `/ask`
- **Price:** $0.10 USDC
- **Function:** Converts text to l33t speak
- **Port:** 8090

### 2. Random Oracle Agent
- **Endpoint:** `/random/both`
- **Price:** $0.05 USDC
- **Function:** Cryptographically secure randomness (drand + NIST)
- **Port:** 8091

### 3. NFT Mint Agent
- **Endpoint:** `/mint`
- **Price:** $0.20 USDC
- **Function:** Mints on-chain NFTs with random numbers
- **Port:** 8092

All running on Base mainnet with full x402 support.

---

## 📚 Documentation

- [**TEMPLATES_INDEX.md**](TEMPLATES_INDEX.md) - Navigation and quick reference
- [**AGENT_TEMPLATE_SUMMARY.md**](AGENT_TEMPLATE_SUMMARY.md) - Detailed usage guide
- [**AGENT_ARCHITECTURE.md**](AGENT_ARCHITECTURE.md) - System design and flows

---

## 🔗 Resources

- **Daydreams GitHub:** https://github.com/daydreamsai
- **xGate Platform:** https://xgate.run/
- **ERC-8004 Spec:** https://eips.ethereum.org/EIPS/eip-8004
- **Base Network:** https://base.org/
- **Facilitator:** https://facilitator.daydreams.systems/
- **Elysia Docs:** https://elysiajs.com/
- **Bun Docs:** https://bun.sh/

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add your template or improvement
4. Test thoroughly
5. Submit a pull request

**Ideas for contributions:**
- Additional agent examples
- Language translations (prompts)
- Integration guides (Claude Desktop, Cursor, etc.)
- Deployment automation scripts
- Testing utilities

---

## 🐛 Issues & Support

**Found a bug or have a question?**
- Open an [issue](https://github.com/[YOUR_USERNAME]/daydreams-agent-templates/issues)
- Join the [Daydreams Discord](https://discord.gg/daydreams)
- Check existing [discussions](https://github.com/[YOUR_USERNAME]/daydreams-agent-templates/discussions)

---

## 📜 License

MIT License - Use freely for personal or commercial projects.

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Daydreams Team** - For the x402 protocol and facilitator
- **xGate** - For the MCP server and agent discovery
- **Base** - For fast, cheap transactions
- **Elysia** - For the excellent TypeScript framework
- **Community** - For testing and feedback

---

## 📊 Stats

- **Templates:** 9 files
- **Code Examples:** Complete TypeScript agent
- **Documentation:** ~47 KB
- **Time to Agent:** 5-15 minutes (with AI)
- **Deployment Cost:** ~$10 to start

---

## 🚀 Quick Links

| Resource | Link |
|----------|------|
| 🏁 Start Here | [TEMPLATES_INDEX.md](TEMPLATES_INDEX.md) |
| ⚡ Quick Prompt | [QUICK_AGENT_PROMPT.md](QUICK_AGENT_PROMPT.md) |
| 💻 Code Example | [EXAMPLE_AGENT.ts](EXAMPLE_AGENT.ts) |
| 🏗️ Architecture | [AGENT_ARCHITECTURE.md](AGENT_ARCHITECTURE.md) |
| 📖 Full Guide | [AGENT_TEMPLATE_SUMMARY.md](AGENT_TEMPLATE_SUMMARY.md) |

---

**Ready to build?** Start with [TEMPLATES_INDEX.md](TEMPLATES_INDEX.md)! 🎉

**Questions?** Open an [issue](https://github.com/[YOUR_USERNAME]/daydreams-agent-templates/issues)!

**Built something cool?** Share it in [discussions](https://github.com/[YOUR_USERNAME]/daydreams-agent-templates/discussions)!

---

<div align="center">

**Built with 💀 by [Calclawd](https://github.com/[YOUR_USERNAME])**

*Powered by the Daydreams x402 Stack*

[![Star on GitHub](https://img.shields.io/github/stars/[YOUR_USERNAME]/daydreams-agent-templates?style=social)](https://github.com/[YOUR_USERNAME]/daydreams-agent-templates)

</div>
