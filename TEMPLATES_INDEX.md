# 📋 Daydreams x402 Agent Templates - Index

**Welcome!** This directory contains everything you need to create production-ready x402 agents.

---

## 🎯 Start Here

**New to x402 agents?** → Start with [`AGENT_TEMPLATE_SUMMARY.md`](AGENT_TEMPLATE_SUMMARY.md)

**Want to dive in fast?** → Use [`QUICK_AGENT_PROMPT.md`](QUICK_AGENT_PROMPT.md)

**Need working code?** → Copy [`EXAMPLE_AGENT.ts`](EXAMPLE_AGENT.ts)

**Want to understand the stack?** → Read [`AGENT_ARCHITECTURE.md`](AGENT_ARCHITECTURE.md)

---

## 📚 Files

| File | Purpose | Size | Best For |
|------|---------|------|----------|
| **[AGENT_TEMPLATE_SUMMARY.md](AGENT_TEMPLATE_SUMMARY.md)** | Overview & guide | 8.6 KB | Getting started |
| **[AGENT_CREATION_TEMPLATE.md](AGENT_CREATION_TEMPLATE.md)** | Full AI prompt | 7.9 KB | AI agent creation (Moltbot/Claude) |
| **[QUICK_AGENT_PROMPT.md](QUICK_AGENT_PROMPT.md)** | Concise prompt | 2.2 KB | Fast prototyping |
| **[TWEET_AGENT_PROMPT.txt](TWEET_AGENT_PROMPT.txt)** | Ultra-short | 0.6 KB | Social sharing |
| **[AGENT_ARCHITECTURE.md](AGENT_ARCHITECTURE.md)** | Visual diagrams | 9.3 KB | Understanding the stack |
| **[EXAMPLE_AGENT.ts](EXAMPLE_AGENT.ts)** | Working code | 9.6 KB | Copy-paste starter |
| **[EXAMPLE_PACKAGE.json](EXAMPLE_PACKAGE.json)** | Dependencies | 0.7 KB | NPM config |
| **[EXAMPLE_README.md](EXAMPLE_README.md)** | Doc template | 6.7 KB | Project documentation |

---

## 🚦 Quick Decision Tree

```
Do you have an AI agent (Moltbot/Claude)?
├─ YES → Use AGENT_CREATION_TEMPLATE.md or QUICK_AGENT_PROMPT.md
└─ NO  → Are you a developer?
         ├─ YES → Copy EXAMPLE_AGENT.ts and modify
         └─ NO  → Start with AGENT_TEMPLATE_SUMMARY.md to learn
```

---

## ⚡ 3 Ways to Create an Agent

### 1. AI-Powered (Fastest)
1. Open `QUICK_AGENT_PROMPT.md`
2. Fill in `[BRACKETS]`
3. Send to Moltbot/Claude/Clawdbot
4. Deploy generated code

**Time: 5-10 minutes**

### 2. Copy & Customize (Easy)
1. Copy `EXAMPLE_AGENT.ts` to new project
2. Replace `[PLACEHOLDERS]`
3. Implement `yourServiceLogic()`
4. `bun install && bun dev`

**Time: 15-30 minutes**

### 3. From Scratch (Learning)
1. Read `AGENT_ARCHITECTURE.md`
2. Follow `AGENT_CREATION_TEMPLATE.md`
3. Reference `EXAMPLE_AGENT.ts` for code
4. Use `EXAMPLE_README.md` for docs

**Time: 1-2 hours**

---

## 🎓 Learning Path

**Beginner:**
1. Read `AGENT_TEMPLATE_SUMMARY.md` (overview)
2. Look at `EXAMPLE_AGENT.ts` (code structure)
3. Try `QUICK_AGENT_PROMPT.md` with an AI

**Intermediate:**
1. Study `AGENT_ARCHITECTURE.md` (system design)
2. Modify `EXAMPLE_AGENT.ts` (customize logic)
3. Deploy and test

**Advanced:**
1. Implement custom payment schemes
2. Add ERC-8004 on-chain registration
3. Create multi-endpoint agents
4. Build agent toolsets

---

## 🛠️ Required Tools

- **Runtime:** [Bun](https://bun.sh) v1.0+
- **Wallet:** Ethereum private key
- **Network:** Base mainnet access
- **Server:** Public IP or ngrok (for testing)
- **Optional:** AI agent (Moltbot/Claude)

---

## 💡 Example Use Cases

**Built with these templates:**

| Agent Type | Endpoint | Price | Example |
|-----------|----------|-------|---------|
| Weather Oracle | `/weather` | $0.05 | Current conditions |
| Crypto Prices | `/price` | $0.01 | Real-time rates |
| Text Analysis | `/analyze` | $0.10 | Sentiment analysis |
| Image Generator | `/generate` | $0.25 | AI art |
| Random NFT Mint | `/mint` | $0.20 | On-chain NFT |
| Leet Speak | `/convert` | $0.10 | Text transformation |

---

## 🔗 Quick Links

- **Daydreams GitHub:** https://github.com/daydreamsai
- **xGate Platform:** https://xgate.run/
- **ERC-8004 Spec:** https://eips.ethereum.org/EIPS/eip-8004
- **Base Network:** https://base.org/
- **Facilitator:** https://facilitator.daydreams.systems/

---

## ❓ Common Questions

**Q: Do I need to deploy to mainnet immediately?**  
A: No! Test on Base Sepolia testnet first. Just change the network config.

**Q: How much does it cost to run an agent?**  
A: ~$10 ETH for gas + VPS hosting ($5-20/month). No upfront fees.

**Q: Can I update prices later?**  
A: Yes! Just redeploy with new price value. Update xGate registration.

**Q: What if I don't have a public IP?**  
A: Use [ngrok](https://ngrok.com) for testing, then deploy to VPS for production.

**Q: Do I need to register on-chain (ERC-8004)?**  
A: No, it's optional. You can just register via xGate MCP directly.

**Q: How do users pay?**  
A: xGate handles payment construction. Users need USDC on Base.

---

## 🐛 Troubleshooting

**Issue: "Payment requirement not found"**
- Check `/x402/supported` is publicly accessible
- Ensure CORS is enabled
- Verify port is open in firewall

**Issue: "Payment invalid"**
- Verify price matches exactly (in micro-USDC)
- Check network is "base"
- Ensure USDC contract address is correct

**Issue: Can't connect to agent**
- Check agent is running (`ps aux | grep bun`)
- Verify public IP is correct
- Test locally first (`curl localhost:PORT`)

---

## 📣 Share Your Agent

Once built:
1. Add to xGate registry
2. Share URL in community
3. Post on Twitter with #daydreamsai #x402
4. Join Discord and showcase

---

## 🎉 Success Stories

*Your agent could be here! Build and share with the community.*

---

## 🤝 Contributing

Found an issue? Have improvements?
- Open an issue on GitHub
- Submit a PR with fixes
- Share your agent templates
- Help other builders

---

## 📜 License

MIT - Use freely for personal or commercial projects

---

**Questions?** Check the individual files or ask in Discord!

**Ready to build?** Pick your template above and get started! 🚀

---

*Created: 2026-01-29*  
*Maintained by: Calclawd 💀*  
*Powered by: Daydreams x402 Stack*
