# Linux Setup

[Back to Day 0](README.md)

## Prerequisites

You need **Node.js v18 or higher** and **npm**.

## Step 1: Install Node.js

### Option A: Via nodejs.org Download Page with fnm (Recommended)

**fnm** (Fast Node Manager) is officially recommended by Node.js. It's fast, lightweight, and lets you switch Node versions easily if needed later.

1. Open your browser and go to [nodejs.org/en/download](https://nodejs.org/en/download).

2. You'll see a row of dropdowns that says: **"Get Node.js® vXX.XX.X (LTS) for __ using __ with __"**. Set the dropdowns as follows:

   | Dropdown | Select |
   |----------|--------|
   | Version | **vXX.XX.X (LTS)** — keep the default LTS version, don't change it |
   | OS | **Linux** |
   | Package Manager | **fnm** (under "Recommended (Official)") |
   | Package Format | **npm** — keep the default |

3. The page will show you the exact commands to run. Open your terminal and copy-paste them. They will look something like this:

   ```bash
   # Step 1 — Install fnm
   curl -fsSL https://fnm.vercel.app/install | bash

   # Step 2 — Restart your terminal or reload your shell profile
   source ~/.bashrc   # or: source ~/.zshrc (if you use zsh)

   # Step 3 — Install Node.js
   fnm install 24   # The page will show the exact version number
   ```

   > The version number may differ from above — always use whatever the website shows.

4. **Close and reopen your terminal** (or run the `source` command above) so that `fnm`, `node`, and `npm` are available.

> **Why fnm?** It's in the "Recommended (Official)" category on the Node.js download page. Like nvm, it installs Node into your home directory so you never need `sudo` for npm global installs — but fnm is significantly faster (written in Rust) and works the same across Windows, macOS, and Linux.

### Option B: Using your distro's package manager

This is quicker but may install an older version of Node.js. **Check the version after installing** — if it's below v18, use Option A instead.

**Ubuntu / Debian:**

```bash
sudo apt update
sudo apt install -y nodejs npm

# Check the version
node --version   # Must be v18 or higher
```

**Fedora:**

```bash
sudo dnf install -y nodejs npm
```

**Arch Linux:**

```bash
sudo pacman -S nodejs npm
```

### Option C: NodeSource (Latest LTS via apt, no nvm)

For Ubuntu/Debian users who want the latest LTS without using nvm:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

## Step 2: Verify Node.js

```bash
node --version
npm --version
```

Both should print version numbers. `node --version` must show v18.x or higher.

## Step 3: Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

> **Permission error?**
> - If you used **fnm** or **nvm**: this shouldn't happen. Check that it's active (`which node` should point to a path inside your home directory, not `/usr/...`).
> - If you used a system install: either use `sudo npm install -g @anthropic-ai/claude-code` or fix npm's global directory permissions:
>   ```bash
>   mkdir -p ~/.npm-global
>   npm config set prefix '~/.npm-global'
>   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
>   source ~/.bashrc
>   ```

## Step 4: Verify Claude Code

```bash
claude --version
```

You should see the Claude Code version printed. Now head back to [README.md](README.md) for authentication setup.

---

## Notes

- **WSL (Windows Subsystem for Linux):** This guide works inside WSL too. Just follow these steps from your WSL terminal.
- **PATH issues:** If `claude` is not found after install, ensure npm's global bin is in your PATH. Run `npm config get prefix` — the `bin/` subdirectory of that path needs to be in your PATH.
