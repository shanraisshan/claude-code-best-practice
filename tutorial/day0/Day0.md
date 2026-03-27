# Day 0 — Claude Code Setup

This guide walks you through installing Claude Code on your machine and authenticating so you can start using it.

## Step 1: Install Claude Code

Choose your operating system:

| OS | Guide |
|----|-------|
| Windows | [windows.md](windows.md) |
| Linux | [linux.md](linux.md) |
| macOS | [mac.md](mac.md) |

Follow the guide for your OS, then come back here for authentication.

---

## Step 2: Verify Installation

After following your OS-specific guide, confirm everything is working:

```bash
node --version    # Should show v18.x or higher
claude --version  # Should show the installed Claude Code version
```

---

## Step 3: Login

<img src="assets/login.png" alt="Claude Code login screen" width="50%">

Run `claude` in your terminal. On first launch, it will ask you to choose a login method.

### Method 1: Subscription (Claude Pro / Max)

- Select **Claude.ai account**
- Browser opens — sign in and authorize
- Return to terminal, you're logged in

### Method 2: API Key (Pay-as-you-go)

- Go to [console.anthropic.com](https://console.anthropic.com) → **API Keys** → **Create Key**
- Select **Anthropic API Key** in the prompt
- Paste your key (starts with `sk-ant-`)

---