#!/usr/bin/env bun
/**
 * Example x402 Agent Template
 * 
 * This is a complete, working example you can copy and modify.
 * Just fill in the [PLACEHOLDERS] and implement your service logic.
 */

import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { createFacilitator } from "@daydreamsai/facilitator";
import { createPrivateKeyEvmSigner } from "@daydreamsai/facilitator/signers";

// ============================================================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================================================

const AGENT_NAME = "[YOUR_AGENT_NAME]";  // e.g., "Weather Oracle"
const AGENT_DESCRIPTION = "[YOUR_AGENT_DESCRIPTION]";  // e.g., "Real-time weather data"
const AGENT_VERSION = "1.0.0";
const AGENT_IMAGE = "[YOUR_IMAGE_URL]";  // Optional: Agent avatar/logo

const ENDPOINT_NAME = "[YOUR_ENDPOINT]";  // e.g., "weather" (becomes POST /weather)
const PRICE_USDC = "[YOUR_PRICE]";  // e.g., "0.05" = 5 cents
const PRICE_USDC_MICRO = Math.floor(parseFloat(PRICE_USDC) * 1_000_000).toString();

const PORT = parseInt(process.env.PORT || "[YOUR_PORT]");  // e.g., 8090
const EVM_PRIVATE_KEY = process.env.EVM_PRIVATE_KEY;
const EVM_RPC_URL = process.env.EVM_RPC_URL || "https://mainnet.base.org";

// Base mainnet USDC contract
const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

// ============================================================================
// VALIDATION
// ============================================================================

if (!EVM_PRIVATE_KEY) {
  console.error("❌ EVM_PRIVATE_KEY not set in environment");
  process.exit(1);
}

if (!PRICE_USDC_MICRO || isNaN(parseInt(PRICE_USDC_MICRO))) {
  console.error("❌ Invalid PRICE_USDC");
  process.exit(1);
}

// ============================================================================
// DAYDREAMS FACILITATOR SETUP
// ============================================================================

const facilitator = createFacilitator({
  facilitatorUrl: "https://facilitator.daydreams.systems",
  evmSigners: [
    {
      signer: createPrivateKeyEvmSigner({
        privateKey: EVM_PRIVATE_KEY as `0x${string}`,
        network: "base",
        rpcUrl: EVM_RPC_URL,
      }),
      networks: ["base"],  // Support Base mainnet
      schemes: ["exact"],  // Exact price matching
    },
  ],
});

// ============================================================================
// YOUR SERVICE LOGIC - IMPLEMENT THIS
// ============================================================================

/**
 * This is where your agent's core logic goes.
 * Replace this function with your actual service implementation.
 * 
 * Examples:
 * - Call external API (weather, crypto prices, etc)
 * - Run AI inference (sentiment analysis, translation, etc)
 * - Process data (format conversion, validation, etc)
 * - Query database
 * - Generate content
 */
async function yourServiceLogic(requestBody: any): Promise<any> {
  // TODO: Implement your service here!
  
  // Example: Echo service
  console.log("📥 Received request:", requestBody);
  
  // Your logic here...
  // const result = await callExternalAPI(requestBody);
  // const result = await runAIModel(requestBody);
  // const result = await processData(requestBody);
  
  // Example response
  return {
    service: AGENT_NAME,
    requestReceived: requestBody,
    timestamp: new Date().toISOString(),
    message: "Replace this with your actual service response!",
    // Add your actual response data here
  };
}

// ============================================================================
// WEB SERVER
// ============================================================================

const app = new Elysia()
  .use(cors())  // Enable CORS for public access
  
  // Root endpoint - Agent information
  .get("/", () => ({
    name: AGENT_NAME,
    description: AGENT_DESCRIPTION,
    version: AGENT_VERSION,
    image: AGENT_IMAGE,
    price: `${PRICE_USDC} USDC`,
    priceWei: PRICE_USDC_MICRO,
    network: "Base Mainnet (eip155:8453)",
    token: USDC_BASE,
    endpoints: {
      "/": "GET - Agent info (this page)",
      "/health": "GET - Health check",
      [`/${ENDPOINT_NAME}`]: `POST - Paid service (requires x402 payment)`,
      "/x402/supported": "GET - Payment capabilities",
      "/x402/verify": "POST - Verify payment",
      "/x402/settle": "POST - Settle payment",
    },
    usage: {
      description: `Send POST request to /${ENDPOINT_NAME} with x402 payment header`,
      example: `curl -X POST http://localhost:${PORT}/${ENDPOINT_NAME} \\
  -H "Content-Type: application/json" \\
  -H "x402: <payment-payload>" \\
  -d '{"your": "data"}'`,
    },
  }))
  
  // Health check
  .get("/health", () => ({ 
    status: "ok", 
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }))
  
  // x402 Facilitator endpoints (required)
  .get("/x402/supported", () => {
    const supported = facilitator.getSupported();
    console.log("📤 /x402/supported called");
    return supported;
  })
  
  .post("/x402/verify", async ({ body }: { body: any }) => {
    console.log("🔍 /x402/verify called");
    const result = await facilitator.verify(body);
    return result;
  })
  
  .post("/x402/settle", async ({ body }: { body: any }) => {
    console.log("✅ /x402/settle called");
    const result = await facilitator.settle(body);
    return result;
  })
  
  // Main paid endpoint - YOUR SERVICE
  .post(`/${ENDPOINT_NAME}`, async ({ body, headers }: { 
    body: any; 
    headers: Record<string, string | undefined> 
  }) => {
    console.log(`\n🔔 Request to /${ENDPOINT_NAME}`);
    
    // Step 1: Check for payment header
    const x402Header = headers["x402"] || headers["X402"] || headers["X-402"];
    
    if (!x402Header) {
      console.log("❌ No x402 payment header");
      return { 
        error: "Payment required: missing x402 header",
        price: `${PRICE_USDC} USDC`,
        network: "Base Mainnet",
      };
    }

    try {
      // Step 2: Parse payment payload
      const paymentPayload = JSON.parse(x402Header as string);
      console.log("💳 Payment payload received");
      
      // Step 3: Verify payment with facilitator
      console.log(`🔍 Verifying payment (expected: ${PRICE_USDC_MICRO} micro-USDC)...`);
      const verification = await facilitator.verify(paymentPayload, {
        network: "base",
        scheme: "exact",
        price: PRICE_USDC_MICRO,
        token: USDC_BASE,
      });

      if (!verification.isValid) {
        console.log("❌ Payment invalid:", verification.invalidReason);
        return { 
          error: "Payment invalid", 
          details: verification.invalidReason,
          expected: {
            price: PRICE_USDC_MICRO,
            token: USDC_BASE,
            network: "base",
          },
        };
      }

      console.log("✅ Payment verified!");

      // Step 4: Execute your service logic
      console.log("⚙️  Executing service...");
      const result = await yourServiceLogic(body);
      
      console.log("✅ Service complete");
      
      // Step 5: Return result
      return {
        success: true,
        paid: PRICE_USDC,
        network: "Base Mainnet",
        result,
      };
      
    } catch (error: any) {
      console.log("❌ Error:", error.message);
      return { 
        error: "Payment error", 
        details: error.message,
      };
    }
  })
  
  // Start server
  .listen(PORT);

// ============================================================================
// STARTUP
// ============================================================================

console.log("\n" + "=".repeat(60));
console.log(`🚀 ${AGENT_NAME} v${AGENT_VERSION}`);
console.log("=".repeat(60));
console.log(`📍 Running on port ${PORT}`);
console.log(`💰 Price: ${PRICE_USDC} USDC per request`);
console.log(`🔗 Network: Base Mainnet (eip155:8453)`);
console.log(`📦 Token: USDC (${USDC_BASE})`);
console.log(`🌐 Endpoint: POST /${ENDPOINT_NAME}`);
console.log("=".repeat(60));
console.log("\n📋 Test commands:");
console.log(`\n  Info:    curl http://localhost:${PORT}/`);
console.log(`  Health:  curl http://localhost:${PORT}/health`);
console.log(`  x402:    curl http://localhost:${PORT}/x402/supported`);
console.log(`\n  Service: curl -X POST http://localhost:${PORT}/${ENDPOINT_NAME} \\`);
console.log(`             -H "Content-Type: application/json" \\`);
console.log(`             -H "x402: <payment>" \\`);
console.log(`             -d '{"test": "data"}'`);
console.log("\n" + "=".repeat(60) + "\n");

// ============================================================================
// ERC-8004 METADATA (for on-chain registration)
// ============================================================================

const ERC8004_METADATA = {
  type: "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
  name: AGENT_NAME,
  description: AGENT_DESCRIPTION,
  image: AGENT_IMAGE,
  endpoints: [
    {
      name: "x402",
      endpoint: `http://[YOUR_PUBLIC_IP]:${PORT}/${ENDPOINT_NAME}`,
      version: AGENT_VERSION,
      skills: ["[category/skill]"],  // e.g., ["data/weather", "api/forecast"]
      domains: ["[domain1]", "[domain2]"],  // e.g., ["weather", "climate"]
    },
  ],
  registrations: [],
  supportedTrusts: ["reputation"],
  active: true,
  x402support: true,
};

// Save metadata to file for easy access
if (process.env.GENERATE_METADATA) {
  await Bun.write(
    "erc8004-metadata.json", 
    JSON.stringify(ERC8004_METADATA, null, 2)
  );
  console.log("📄 Generated erc8004-metadata.json");
}
