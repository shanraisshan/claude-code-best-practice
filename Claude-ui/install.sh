#!/bin/bash
# ============================================================
# Claude UI — Installation
# Design system & composants pour Astro + Tailwind CSS
# ============================================================

set -e

CLAUDE_DIR="$HOME/.claude"
SKILLS_DIR="$CLAUDE_DIR/skills"
AGENTS_DIR="$CLAUDE_DIR/agents"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🎨 Installation de Claude UI..."
echo ""

# Créer les répertoires
mkdir -p "$SKILLS_DIR" "$AGENTS_DIR"

# Copier les skills
echo "📦 Installation des skills..."
for skill_dir in "$SCRIPT_DIR"/skills/*/; do
  skill_name=$(basename "$skill_dir")
  mkdir -p "$SKILLS_DIR/$skill_name"
  cp -r "$skill_dir"* "$SKILLS_DIR/$skill_name/"
  echo "   ✓ $skill_name"
done

# Copier les agents
echo "🤖 Installation des agents..."
for agent_file in "$SCRIPT_DIR"/agents/*.md; do
  agent_name=$(basename "$agent_file")
  cp "$agent_file" "$AGENTS_DIR/$agent_name"
  echo "   ✓ $agent_name"
done

echo ""
echo "✅ Claude UI installé avec succès !"
echo ""
echo "📍 Skills : $SKILLS_DIR"
echo "📍 Agents : $AGENTS_DIR"
echo ""
echo "🚀 Utilisation :"
echo "   ui tokens         → Design system (couleurs, spacing, shadows)"
echo "   ui component      → Composants (Button, Card, Badge, Alert...)"
echo "   ui layout         → Sections (Hero, Features, CTA, Footer...)"
echo "   ui animation      → Micro-interactions et transitions"
echo "   ui a11y           → Audit accessibilité WCAG 2.1"
echo "   ui form           → Formulaires et inputs"
echo "   ui nav            → Navigation, header, menu mobile"
echo "   ui responsive     → Adaptation mobile-first"
echo "   ui dark           → Dark mode"
echo "   ui images         → Images responsives et optimisées"
echo "   ui typo           → Typographie et lisibilité"
echo ""
echo "💡 Fonctionne partout — les skills sont globaux."
