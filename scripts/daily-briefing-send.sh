#!/bin/bash
# Daily briefing runner + distributor

OUTPUT=$(python3 /root/clawd/scripts/daily-briefing.py 2>&1)

if [ -z "$OUTPUT" ]; then
    exit 1
fi

# Send to Discord (with mention, remove markdown formatting)
DISCORD_MSG="<@95961135685054464>\n\n${OUTPUT//'**'/''}"
clawdbot_msg='{"action":"send","channel":"discord","target":"1465085664667369699","message":"'"$(echo -e "$DISCORD_MSG" | sed 's/"/\\"/g' | sed 's/$/\\n/g')"'"}'

# Send to WhatsApp (remove markdown, keep concise)
WA_MSG="${OUTPUT//'**'/''}"
WA_MSG="${WA_MSG//'📧'/'📧'}"
clawdbot_msg='{"action":"send","channel":"whatsapp","target":"+447748003737","message":"'"$(echo -e "$WA_MSG" | sed 's/"/\\"/g' | sed 's/$/\\n/g')"'"}'

# Send to Telegram (keep as-is, supports markdown)
clawdbot_msg='{"action":"send","channel":"telegram","target":"1770593366","message":"'"$(echo -e "$OUTPUT" | sed 's/"/\\"/g' | sed 's/$/\\n/g')"'"}'

echo "✅ Briefing sent to Discord, WhatsApp, and Telegram"
