# Windows Setup

[Back to Day 0](Day0.md)

## Prerequisites

You need **Node.js v18 or higher** and **npm** (bundled with Node.js).

## Step 1: Install Node.js

### Option A: Via nodejs.org Download Page with fnm (Recommended)

**fnm** (Fast Node Manager) is officially recommended by Node.js. It's fast, lightweight, and lets you switch Node versions easily if needed later.

1. Open your browser and go to [nodejs.org/en/download](https://nodejs.org/en/download).

2. You'll see a row of dropdowns that says: **"Get Node.js® vXX.XX.X (LTS) for __ using __ with __"**. Set the dropdowns as follows:

   | Dropdown | Select |
   |----------|--------|
   | Version | **vXX.XX.X (LTS)** — keep the default LTS version, don't change it |
   | OS | **Windows** |
   | Package Manager | **fnm** (under "Recommended (Official)") |
   | Package Format | **npm** — keep the default |

3. The page will show you the exact commands to run. Open **PowerShell as Administrator** (right-click the Start menu > "Terminal (Admin)" or search for PowerShell > right-click > "Run as administrator").

4. Copy and paste the commands from the page. They will look something like this:

   ```powershell
   # Step 1 — Install fnm
   winget install Schniz.fnm

   # Step 2 — Configure fnm environment (add to your PowerShell profile)
   fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression

   # Step 3 — Install Node.js
   fnm install 24   # The page will show the exact version number
   ```

   > The version number may differ from above — always use whatever the website shows.

5. **Close and reopen your terminal** after installation. This is important so that `node` and `npm` are available in your PATH.

> **Why fnm?** It's in the "Recommended (Official)" category on the Node.js download page, installs in seconds (written in Rust), and works natively on Windows — unlike nvm which requires a separate community port for Windows.

### Option B: Official .msi Installer (Alternative)

If you prefer a traditional installer:

1. Go to [nodejs.org](https://nodejs.org). The homepage shows a big **"Download Node.js (LTS)"** button.
2. Click it to download the `.msi` file.
3. Run the installer:
   - Click **Next** through the wizard.
   - Accept the license agreement.
   - Keep the default install location (`C:\Program Files\nodejs\`).
   - On the "Tools for Native Modules" screen, **check the box** for "Automatically install the necessary tools" — this installs build tools you may need later.
   - Click **Install** and wait for it to finish.
4. **Restart your terminal** after installation.

### Option C: Using winget (One-liner)

If you have `winget` (built into Windows 10/11):

```powershell
winget install OpenJS.NodeJS.LTS
```

Close and reopen your terminal after installation.

## Step 2: Verify Node.js

Open a **new** terminal (Command Prompt, PowerShell, or Windows Terminal) and run:

```powershell
node --version
npm --version
```

Both commands should print version numbers. If you get "not recognized", restart your terminal or check that Node.js is in your PATH.

## Step 3: Install Claude Code

```powershell
npm install -g @anthropic-ai/claude-code
```

> If you get a permission error, open your terminal as **Administrator** (right-click > Run as administrator) and run the command again.

## Step 4: Verify Claude Code

```powershell
claude --version
```

You should see the Claude Code version printed. Now head back to [Day0.md](Day0.md) for authentication setup.

---

## Notes

- **Recommended terminal:** Windows Terminal or PowerShell. The classic Command Prompt works but has limited features.
- **WSL users:** If you prefer running Claude Code inside WSL (Windows Subsystem for Linux), follow the [Linux guide](linux.md) instead — WSL is a full Linux environment.
- **PATH issues:** If `claude` is not recognized after install, npm's global bin directory may not be in your PATH. Run `npm config get prefix` to find it, then add the resulting path to your system's PATH environment variable.
