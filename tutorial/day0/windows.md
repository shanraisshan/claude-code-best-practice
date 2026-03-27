# Windows Setup

[Back to Day 0](README.md)

---

**Node.js**
- Go to [nodejs.org](https://nodejs.org)
- Click the **"Download Node.js (LTS)"** button — this downloads the `.msi` installer
- Run the `.msi` file and click **Next** through the wizard
- Accept the defaults, click **Install**, wait for it to finish

**Verify Node.js**
- Open a **new** terminal (PowerShell or Windows Terminal) and run:
  ```powershell
  node --version
  npm --version
  ```

**Claude Code**
- ```powershell
  npm install -g @anthropic-ai/claude-code
  ```
- If you get a permission error, run your terminal as **Administrator** (right-click > Run as administrator)

**Verify**
- ```powershell
  claude --version
  ```

---

Now head back to [README.md](README.md) for authentication setup.
