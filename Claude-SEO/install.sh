#!/bin/bash
# Claude SEO — Installation Script
# Copie les skills et agents dans ~/.claude/

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$HOME/.claude"

echo "🔍 Claude SEO — Installation"
echo "=============================="
echo ""

# Create directories
echo "📁 Création des répertoires..."
mkdir -p "$CLAUDE_DIR/skills"
mkdir -p "$CLAUDE_DIR/agents"

# Copy skills
echo "📦 Copie des skills..."
cp -r "$SCRIPT_DIR/skills/"* "$CLAUDE_DIR/skills/"

# Copy agents
echo "🤖 Copie des agents..."
cp -r "$SCRIPT_DIR/agents/"* "$CLAUDE_DIR/agents/"

echo ""
echo "✅ Installation terminée !"
echo ""
echo "Skills installés :"
ls -1 "$CLAUDE_DIR/skills/" | grep "^seo" | while read skill; do
  echo "  - $skill"
done
echo ""
echo "Agents installés :"
ls -1 "$CLAUDE_DIR/agents/" | grep "^seo" | while read agent; do
  echo "  - $agent"
done
echo ""
echo "🚀 Lancez Claude Code et utilisez /seo pour commencer !"
