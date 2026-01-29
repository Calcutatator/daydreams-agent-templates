# GitHub Repository Setup

## Option 1: Manual Setup (Recommended)

### 1. Create Repository on GitHub

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `daydreams-agent-templates`
   - **Description:** `One-shot prompts and templates for creating production-ready x402-enabled agents on the Daydreams stack`
   - **Visibility:** Public
   - **Initialize:** DO NOT check any boxes (we already have files)
3. Click "Create repository"

### 2. Push Your Code

```bash
cd /root/clawd

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/daydreams-agent-templates.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Update README

The README currently has placeholders `[YOUR_USERNAME]`. Update them:

```bash
# Replace with your actual GitHub username
sed -i 's/\[YOUR_USERNAME\]/your-actual-username/g' README.md
git add README.md
git commit -m "Update username in README"
git push
```

---

## Option 2: Using GitHub CLI (if installed)

```bash
cd /root/clawd

# Install gh if not present
# wget https://github.com/cli/cli/releases/download/v2.40.1/gh_2.40.1_linux_arm64.tar.gz
# tar -xzf gh_2.40.1_linux_arm64.tar.gz
# sudo mv gh_2.40.1_linux_arm64/bin/gh /usr/local/bin/

# Authenticate
gh auth login

# Create repo
gh repo create daydreams-agent-templates --public --source=. --remote=origin --push

# Update README with your username
USERNAME=$(gh api user --jq '.login')
sed -i "s/\[YOUR_USERNAME\]/$USERNAME/g" README.md
git add README.md
git commit -m "Update username in README"
git push
```

---

## Recommended Repository Settings

After creation, configure:

### Topics
Add these topics to help discoverability:
- `x402`
- `daydreams`
- `agent`
- `blockchain`
- `base`
- `usdc`
- `payment`
- `elysia`
- `typescript`
- `template`

### Description
```
One-shot prompts and templates for creating production-ready x402-enabled agents on the Daydreams stack
```

### Website
```
https://xgate.run/
```

### Social Image
Upload a custom social preview image (1280x640 recommended)

---

## Post-Creation Checklist

- [ ] Repository created and pushed
- [ ] README updated with actual username
- [ ] Topics added
- [ ] Description set
- [ ] License visible (MIT)
- [ ] Repository is public
- [ ] First release tagged (optional: `git tag v1.0.0 && git push --tags`)

---

## Sharing

Once live, share:
- **Twitter:** "Just released templates for creating x402 agents in minutes! 🤖💰 #daydreams #x402"
- **Discord:** Post in #show-and-tell or relevant channel
- **Product Hunt:** Consider launching if it gains traction

---

## Maintenance

Keep the repo updated:
```bash
# Pull latest
git pull

# Make changes
# ...

# Commit and push
git add .
git commit -m "Description of changes"
git push
```
