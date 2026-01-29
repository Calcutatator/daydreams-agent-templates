#!/bin/bash
# Bulk update script for all managed agents
# Usage: ./agents-bulk-update.sh [check|update|restart]

set -e

AGENTS=(
  "/root/leet-agent"
  "/root/random-oracle-agent"
  # Add more agent paths as they're created
)

ACTION="${1:-check}"

echo "🤖 Agent Bulk Operations - Action: $ACTION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

case "$ACTION" in
  check)
    echo "📊 Checking all agents..."
    for agent in "${AGENTS[@]}"; do
      if [ -d "$agent" ]; then
        echo ""
        echo "✓ $agent"
        cd "$agent"
        echo "  Git status:"
        git status -s || echo "  (not a git repo)"
        echo "  Node version:"
        node --version 2>/dev/null || echo "  (no node)"
        echo "  Dependencies:"
        npm outdated 2>/dev/null || echo "  (up to date)"
      else
        echo "✗ $agent - NOT FOUND"
      fi
    done
    ;;
    
  update)
    echo "🔄 Updating all agents..."
    for agent in "${AGENTS[@]}"; do
      if [ -d "$agent" ]; then
        echo ""
        echo "⚙️  Updating $agent"
        cd "$agent"
        
        # Pull git if it's a repo
        if [ -d ".git" ]; then
          echo "  Pulling latest code..."
          git pull || echo "  (skipped)"
        fi
        
        # Update dependencies
        if [ -f "package.json" ]; then
          echo "  Updating dependencies..."
          npm update || echo "  (failed)"
        fi
        
        echo "  ✓ Done"
      fi
    done
    ;;
    
  restart)
    echo "🔄 Restarting all agents..."
    for agent in "${AGENTS[@]}"; do
      if [ -d "$agent" ]; then
        echo ""
        echo "🔃 Restarting $(basename $agent)..."
        cd "$agent"
        
        # If using PM2
        pm2 restart "$(basename $agent)" 2>/dev/null && echo "  ✓ PM2 restart" && continue
        
        # Otherwise show manual instructions
        echo "  ⚠️  Manual restart needed - not in PM2"
        echo "     cd $agent && npm start"
      fi
    done
    ;;
    
  *)
    echo "Usage: $0 [check|update|restart]"
    echo ""
    echo "Commands:"
    echo "  check   - Check status of all agents"
    echo "  update  - Pull code & update dependencies"
    echo "  restart - Restart all running agents"
    exit 1
    ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Done!"
