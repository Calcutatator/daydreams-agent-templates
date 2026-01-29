# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## Email

- **Gmail IMAP access** via app password
- Credentials stored in `.credentials/gmail.json`
- Can read, search, and check emails

## Browser

- Using Playwright's bundled Chromium (ARM64 server)
- Headless mode, profile: `clawd`
- Path: `/root/.cache/ms-playwright/chromium-1208/chrome-linux/chrome`

## Agent Management

All agents I manage are tracked in:
- **`AGENTS_TRACKER.md`** - Human-readable registry
- **`agents-db.json`** - Machine-readable database
- **`scripts/agents-bulk-update.sh`** - Bulk operations script

**Bulk operations:**
```bash
cd /root/clawd
./scripts/agents-bulk-update.sh check    # Check all agents
./scripts/agents-bulk-update.sh update   # Update dependencies
./scripts/agents-bulk-update.sh restart  # Restart all
```

**When adding a new agent:**
1. Create agent in `/root/agent-name/`
2. Add to `AGENTS_TRACKER.md`
3. Add to `agents-db.json`
4. Add path to `scripts/agents-bulk-update.sh`

---

Add whatever helps you do your job. This is your cheat sheet.
