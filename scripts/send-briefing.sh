#!/bin/bash
# Send daily briefing to Discord, WhatsApp, Telegram

set -e

OUTPUT=$(python3 /root/clawd/scripts/daily-briefing.py 2>&1)

# Discord: Keep markdown, add mention
DISCORD_MSG="<@95961135685054464>

$OUTPUT"

# WhatsApp: Strip markdown for cleaner display
WA_MSG=$(echo "$OUTPUT" | sed 's/\*\*//g')

# Telegram: Keep as-is (supports markdown)
TELEGRAM_MSG="$OUTPUT"

# Send to Discord
clawdbot message send --channel discord --target 1465085664667369699 --message "$DISCORD_MSG" 2>&1 || echo "Discord send error"

# Send to WhatsApp
clawdbot message send --channel whatsapp --target "+447748003737" --message "$WA_MSG" 2>&1 || echo "WhatsApp send error"

# Send to Telegram
clawdbot message send --channel telegram --target 1770593366 --message "$TELEGRAM_MSG" 2>&1 || echo "Telegram send error"

echo "✅ Briefing sent to all channels"
