#!/bin/bash

# React Email Preview Server Setup
# Creates package.json scripts for preview server
# Usage: ./scripts/setup-preview-server.sh

set -e

echo "Setting up React Email preview server..."
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found in current directory"
  echo "Please run this script from your project root"
  exit 1
fi

# Check if react-email is installed
if ! npm list react-email > /dev/null 2>&1; then
  echo "Installing react-email and dependencies..."
  npm install react-email @react-email/components
fi

echo "✓ react-email installed"
echo ""

# Create preview script if not exists
PREVIEW_SCRIPT="scripts/preview.ts"

if [ ! -f "$PREVIEW_SCRIPT" ]; then
  mkdir -p scripts
  cat > "$PREVIEW_SCRIPT" << 'EOF'
import { render } from 'react-email';
import * as fs from 'fs';
import * as path from 'path';

// Import your email components here
// Example:
// import { WelcomeEmail } from '../src/emails/welcome';

export async function generateEmailPreview(
  component: React.ReactElement,
  filename: string,
  outputDir: string = './.email-previews',
) {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Render the email component to HTML
  const html = render(component);

  // Write to file
  const filepath = path.join(outputDir, `${filename}.html`);
  fs.writeFileSync(filepath, html);

  console.log(`✓ Preview generated: ${filepath}`);
  return filepath;
}

// Example usage:
// async function main() {
//   await generateEmailPreview(
//     <WelcomeEmail
//       userName="John Doe"
//       userEmail="john@example.com"
//       activationUrl="https://example.com/activate/token"
//     />,
//     'welcome-email'
//   );
// }
//
// main().catch(console.error);
EOF
  echo "✓ Created preview script: $PREVIEW_SCRIPT"
fi

# Create a dev server script
DEV_SERVER="scripts/dev-server.ts"

if [ ! -f "$DEV_SERVER" ]; then
  cat > "$DEV_SERVER" << 'EOF'
import express from 'express';
import { render } from 'react-email';
import * as path from 'path';
import * as fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.email-previews'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

// List available previews
app.get('/api/previews', (req, res) => {
  const previewDir = '.email-previews';
  if (!fs.existsSync(previewDir)) {
    return res.json({ previews: [] });
  }

  const files = fs.readdirSync(previewDir)
    .filter(f => f.endsWith('.html'))
    .map(f => ({
      name: f.replace('.html', ''),
      url: `/${f}`,
    }));

  res.json({ previews: files });
});

// Serve individual preview
app.get('/preview/:name', (req, res) => {
  const filepath = path.join('.email-previews', `${req.params.name}.html`);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: 'Preview not found' });
  }

  const html = fs.readFileSync(filepath, 'utf-8');

  // Wrap in responsive HTML container
  const wrappedHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Preview: ${req.params.name}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f0f0f0;
            margin: 0;
            padding: 20px;
          }
          .preview-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .preview-container * {
            max-width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="preview-container">
          ${html}
        </div>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(wrappedHtml);
});

app.listen(PORT, () => {
  console.log(`
╭─────────────────────────────────────────────────────────────╮
│  React Email Preview Server                                 │
│  Local:   http://localhost:${PORT}
│  API:     http://localhost:${PORT}/api/previews
│                                                             │
│  Generate previews with: npm run preview:generate          │
╰─────────────────────────────────────────────────────────────╯
  `);
});
EOF
  echo "✓ Created dev server: $DEV_SERVER"
fi

echo ""
echo "Next steps:"
echo "1. Install server dependencies (if using dev server):"
echo "   npm install --save-dev express @types/express ts-node"
echo ""
echo "2. Add scripts to package.json:"
echo '   "preview:generate": "ts-node scripts/preview.ts"'
echo '   "preview:dev": "ts-node scripts/dev-server.ts"'
echo ""
echo "3. Generate a preview:"
echo "   npm run preview:generate"
echo ""
echo "4. View previews at:"
echo "   http://localhost:3000 (dev server)"
echo "   .email-previews/ (generated HTML files)"
