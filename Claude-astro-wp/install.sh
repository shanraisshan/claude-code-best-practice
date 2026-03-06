#!/bin/bash
# Claude Astro WP — Installation Script

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$HOME/.claude"

echo "🚀 Claude Astro WP — Installation"
echo "======================================"
echo ""

mkdir -p "$CLAUDE_DIR/skills"
mkdir -p "$CLAUDE_DIR/agents"

echo "📦 Copie des skills..."
cp -r "$SCRIPT_DIR/skills/"* "$CLAUDE_DIR/skills/"

echo "🤖 Copie des agents..."
cp -r "$SCRIPT_DIR/agents/"* "$CLAUDE_DIR/agents/"

echo ""
echo "✅ Installation terminée !"
echo ""
echo "Skills installés :"
ls -1 "$CLAUDE_DIR/skills/" | grep "^astro-wp" | while read skill; do
  echo "  - $skill"
done
echo ""
echo "Agents installés :"
ls -1 "$CLAUDE_DIR/agents/" | grep "^astro-wp" | while read agent; do
  echo "  - $agent"
done
echo ""
echo "🚀 Lancez Claude Code et utilisez /astro pour commencer !"
