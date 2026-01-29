#!/usr/bin/env python3
"""Daily briefing sender for Discord, WhatsApp, and Telegram"""

import subprocess
import sys
import re

def run_briefing():
    """Run the daily briefing script and get output"""
    result = subprocess.run(
        ['python3', '/root/clawd/scripts/daily-briefing.py'],
        capture_output=True,
        text=True
    )
    return result.stdout

def send_discord(message):
    """Send to Discord with mention"""
    msg = f"<@95961135685054464>\n\n{message}"
    cmd = [
        'clawdbot', 'message', 'send',
        '--channel', 'discord',
        '--target', 'channel:1465085664667369699',
        '--message', msg
    ]
    subprocess.run(cmd, capture_output=True)
    print("✅ Discord sent")

def send_whatsapp(message):
    """Send to WhatsApp (strip markdown)"""
    msg = re.sub(r'\*\*(.+?)\*\*', r'\1', message)  # Remove **bold**
    cmd = [
        'clawdbot', 'message', 'send',
        '--channel', 'whatsapp',
        '--target', '+447748003737',
        '--message', msg
    ]
    subprocess.run(cmd, capture_output=True)
    print("✅ WhatsApp sent")

def send_telegram(message):
    """Send to Telegram (keeps markdown)"""
    cmd = [
        'clawdbot', 'message', 'send',
        '--channel', 'telegram',
        '--target', '1770593366',
        '--message', message
    ]
    subprocess.run(cmd, capture_output=True)
    print("✅ Telegram sent")

if __name__ == "__main__":
    try:
        briefing = run_briefing()
        if briefing:
            send_discord(briefing)
            send_whatsapp(briefing)
            send_telegram(briefing)
            print("\n✅ Briefing distributed to all channels")
    except Exception as e:
        print(f"❌ Error: {e}", file=sys.stderr)
        sys.exit(1)
