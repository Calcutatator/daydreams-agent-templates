#!/bin/bash
# Quick publish script for daydreams-agent-templates
# 
# Usage: 
#   1. Edit YOUR_USERNAME below
#   2. Run: bash PUBLISH_NOW.sh

set -e

# ============================================
# EDIT THIS LINE WITH YOUR GITHUB USERNAME
# ============================================
YOUR_USERNAME="YOUR_GITHUB_USERNAME_HERE"

# ============================================
# Don't edit below unless you know what you're doing
# ============================================

REPO_NAME="daydreams-agent-templates"
CURRENT_DIR=$(pwd)

echo "=========================================="
echo "📦 Publishing to GitHub"
echo "=========================================="
echo ""
echo "Repository: $REPO_NAME"
echo "Username: $YOUR_USERNAME"
echo "Directory: $CURRENT_DIR"
echo ""

if [ "$YOUR_USERNAME" = "YOUR_GITHUB_USERNAME_HERE" ]; then
    echo "❌ ERROR: Please edit PUBLISH_NOW.sh and set YOUR_USERNAME first!"
    echo ""
    echo "Open the file and replace:"
    echo "  YOUR_USERNAME=\"YOUR_GITHUB_USERNAME_HERE\""
    echo "with:"
    echo "  YOUR_USERNAME=\"your-actual-github-username\""
    exit 1
fi

echo "Step 1: Adding remote..."
git remote add origin "https://github.com/$YOUR_USERNAME/$REPO_NAME.git" 2>/dev/null || echo "  (remote already exists)"

echo "Step 2: Renaming branch to main..."
git branch -M main

echo "Step 3: Pushing to GitHub..."
git push -u origin main

echo ""
echo "Step 4: Updating username in README..."
sed -i "s/\[YOUR_USERNAME\]/$YOUR_USERNAME/g" README.md
git add README.md
git commit -m "Update GitHub username in README"
git push

echo ""
echo "=========================================="
echo "✅ SUCCESS!"
echo "=========================================="
echo ""
echo "Your repository is now live at:"
echo "  https://github.com/$YOUR_USERNAME/$REPO_NAME"
echo ""
echo "Next steps:"
echo "  1. Visit the repo and add topics (x402, daydreams, agent, etc.)"
echo "  2. Share on Twitter/Discord"
echo "  3. Star your own repo ;)"
echo ""
echo "Optional - Create a release tag:"
echo "  git tag -a v1.0.0 -m 'Initial release'"
echo "  git push --tags"
echo ""
