# 🤖 [Your Agent Name]

> A production-ready x402-enabled agent on the Daydreams stack

## What It Does

[Describe what your agent does - replace this]

**Price:** `[X.XX]` USDC per request  
**Network:** Base mainnet  
**Status:** 🟢 Active

---

## Quick Start

### 1. Prerequisites

- [Bun](https://bun.sh) installed
- Ethereum wallet with private key
- ~$10 worth of ETH on Base mainnet (for gas)
- Public server with open port (or ngrok for testing)

### 2. Installation

```bash
# Clone or create project
mkdir my-agent && cd my-agent

# Install dependencies
bun install
```

### 3. Configuration

Create `.env`:

```bash
EVM_PRIVATE_KEY=0x...  # Your wallet private key
PORT=8090               # Port to run on
EVM_RPC_URL=https://mainnet.base.org  # Base RPC (optional)
```

**⚠️ Security:** Never commit `.env` to git! Add it to `.gitignore`.

### 4. Implement Your Service

Edit `src/index.ts` and find the `yourServiceLogic()` function:

```typescript
async function yourServiceLogic(requestBody: any): Promise<any> {
  // Your implementation here!
  // Examples:
  // - const weather = await fetchWeather(requestBody.location);
  // - const analysis = await analyzeText(requestBody.text);
  // - const price = await getCryptoPrice(requestBody.symbol);
  
  return {
    // Your response data
  };
}
```

### 5. Run Locally

```bash
bun dev
```

Test endpoints:
```bash
# Agent info
curl http://localhost:8090/

# Health check
curl http://localhost:8090/health

# Payment capabilities
curl http://localhost:8090/x402/supported
```

### 6. Deploy to Production

#### Option A: VPS (Recommended)
```bash
# On your server
git clone [your-repo]
cd [your-agent]
cp .env.example .env
# Edit .env with your private key
bun install
bun start
```

Open firewall port:
```bash
sudo ufw allow 8090/tcp
```

#### Option B: Process Manager (PM2/systemd)
```bash
# Install PM2
npm install -g pm2

# Start agent
pm2 start "bun start" --name my-agent

# Save configuration
pm2 save
pm2 startup
```

#### Option C: Docker
```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
CMD ["bun", "start"]
```

### 7. Register on xGate

Once deployed publicly, register your agent:

```bash
# Via MCP (from Claude/Cursor)
# Use the xGate MCP tools:

install_resource({
  name: "[your_agent_name]",
  url: "http://[YOUR_PUBLIC_IP]:8090/[endpoint]",
  method: "POST"
})
```

Or test with `execute_resource` first:

```bash
execute_resource({
  url: "http://[YOUR_PUBLIC_IP]:8090/[endpoint]",
  method: "POST",
  args: { "your": "test data" }
})
```

---

## API Documentation

### Public Endpoints

#### `GET /`
Agent information and pricing.

**Response:**
```json
{
  "name": "Your Agent",
  "description": "What it does",
  "price": "0.05 USDC",
  "network": "Base Mainnet",
  "endpoints": { ... }
}
```

#### `GET /health`
Health check.

**Response:**
```json
{
  "status": "ok",
  "uptime": 12345,
  "timestamp": "2026-01-29T17:00:00.000Z"
}
```

#### `GET /x402/supported`
Payment capabilities.

**Response:**
```json
{
  "kinds": [{ 
    "x402Version": 2, 
    "scheme": "exact", 
    "network": "base" 
  }],
  "signers": { "eip155:*": ["0x..."] }
}
```

### Paid Endpoints

#### `POST /[your-endpoint]`
Your main service endpoint (requires payment).

**Headers:**
- `Content-Type: application/json`
- `x402: <payment-payload>` (required)

**Request:**
```json
{
  "your": "request data"
}
```

**Response (success):**
```json
{
  "success": true,
  "paid": "0.05",
  "network": "Base Mainnet",
  "result": { ... }
}
```

**Response (no payment):**
```json
{
  "error": "Payment required: missing x402 header",
  "price": "0.05 USDC"
}
```

---

## Architecture

```
User (Claude/Cursor)
    ↓
xGate MCP (constructs x402 payment)
    ↓
Your Agent (this service)
    ↓
Daydreams Facilitator (verifies payment)
    ↓
Base Mainnet (USDC transfer)
```

**Flow:**
1. User requests service via xGate MCP
2. xGate constructs x402 payment header
3. Request sent to your agent with payment
4. Agent calls facilitator to verify payment
5. If valid, agent executes service
6. Result returned to user

---

## Development

### Project Structure

```
your-agent/
├── src/
│   └── index.ts        # Main agent code
├── .env                # Environment variables (don't commit!)
├── .env.example        # Environment template
├── package.json        # Dependencies
├── bun.lock           # Lock file
├── README.md          # This file
└── erc8004-metadata.json  # Generated metadata (optional)
```

### Testing Payment Flow

Without xGate, you can test payment verification:

```bash
# 1. Get your agent's supported networks
curl http://localhost:8090/x402/supported

# 2. Construct a payment (you'll need to do this manually or via SDK)
# 3. Send request with x402 header
curl -X POST http://localhost:8090/[endpoint] \
  -H "Content-Type: application/json" \
  -H "x402: $(cat payment.json)" \
  -d '{"test": "data"}'
```

### Generate ERC-8004 Metadata

```bash
GENERATE_METADATA=1 bun run src/index.ts
# Creates erc8004-metadata.json
```

Use this JSON to register your agent on-chain (optional).

---

## Troubleshooting

### "Payment required: missing x402 header"
✅ Normal - means payment endpoints are working  
❌ Fix: Ensure you're sending requests via xGate with payment

### "Payment invalid"
- Check USDC amount matches exactly
- Verify payment signature
- Ensure user has USDC balance on Base
- Check payment hasn't expired

### "Connection refused"
- Agent not running: `bun dev`
- Firewall blocking: `sudo ufw allow [PORT]/tcp`
- Wrong IP/port in URL

### "Facilitator error"
- Check internet connection
- Verify Base RPC URL is accessible
- Ensure private key is valid

---

## Security

- ✅ **DO:** Keep EVM_PRIVATE_KEY secret
- ✅ **DO:** Use `.env` files (not committed to git)
- ✅ **DO:** Run behind reverse proxy (nginx/Caddy) in production
- ✅ **DO:** Monitor wallet balance and transactions
- ✅ **DO:** Implement rate limiting for public endpoints

- ❌ **DON'T:** Hardcode private keys in code
- ❌ **DON'T:** Commit `.env` to git
- ❌ **DON'T:** Share your EVM_PRIVATE_KEY
- ❌ **DON'T:** Run as root in production
- ❌ **DON'T:** Skip HTTPS in production (use Caddy/Let's Encrypt)

---

## Resources

- **Daydreams:** https://github.com/daydreamsai
- **xGate:** https://xgate.run/
- **ERC-8004:** https://eips.ethereum.org/EIPS/eip-8004
- **Base Network:** https://base.org/
- **Elysia Docs:** https://elysiajs.com/
- **Bun Docs:** https://bun.sh/

---

## License

MIT

---

## Support

- GitHub Issues: [your-repo/issues]
- Discord: [your-discord]
- Twitter: [@yourhandle]

---

**Built with the Daydreams x402 stack** 🌟
