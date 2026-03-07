#!/bin/bash
# install-template.sh — Installe un template Claude Code dans ton projet
# Usage: ./install-template.sh <template> [destination]
#
# Templates disponibles:
#   site-app-frontend  — Dev frontend (6 skills)
#   site-app-backend   — Dev backend Python (8 skills)
#   seo                — SEO (7 skills)
#   security           — Securite (6 skills)
#   marketing-seo      — Marketing & SEO (10 skills)
#
# Exemples:
#   ./install-template.sh site-app-backend /path/to/my-api
#   ./install-template.sh security .

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOWNLOADS_DIR="$SCRIPT_DIR"

TEMPLATES=("site-app-frontend" "site-app-backend" "seo" "security" "marketing-seo")

usage() {
    echo "Usage: $0 <template> [destination]"
    echo ""
    echo "Templates disponibles:"
    echo "  site-app-frontend  — Dev frontend (6 skills)"
    echo "  site-app-backend   — Dev backend Python (8 skills)"
    echo "  seo                — SEO (7 skills)"
    echo "  security           — Securite (6 skills)"
    echo "  marketing-seo      — Marketing & SEO (10 skills)"
    echo ""
    echo "Exemples:"
    echo "  $0 site-app-backend /path/to/my-api"
    echo "  $0 security ."
    exit 1
}

if [ $# -lt 1 ]; then
    usage
fi

TEMPLATE="$1"
DEST="${2:-.}"

# Validate template name
VALID=false
for t in "${TEMPLATES[@]}"; do
    if [ "$t" = "$TEMPLATE" ]; then
        VALID=true
        break
    fi
done

if [ "$VALID" = false ]; then
    echo "Erreur: template '$TEMPLATE' inconnu."
    usage
fi

ARCHIVE="$DOWNLOADS_DIR/${TEMPLATE}.tar.gz"
if [ ! -f "$ARCHIVE" ]; then
    echo "Erreur: archive '$ARCHIVE' introuvable."
    exit 1
fi

# Check for existing files
if [ -f "$DEST/CLAUDE.md" ]; then
    echo "Attention: $DEST/CLAUDE.md existe deja."
    read -p "Ecraser ? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Annule."
        exit 0
    fi
fi

# Extract
mkdir -p "$DEST/.claude/skills"
tar -xzf "$ARCHIVE" -C "$DEST"

echo ""
echo "Template '$TEMPLATE' installe dans $DEST/"
echo ""
echo "Fichiers installes:"
echo "  $DEST/CLAUDE.md"
find "$DEST/.claude/skills" -name "SKILL.md" -printf "  %p\n" 2>/dev/null || find "$DEST/.claude/skills" -name "SKILL.md" | sed 's/^/  /'
echo ""
echo "Prochaines etapes:"
echo "  1. Edite CLAUDE.md pour adapter a ton projet"
echo "  2. Supprime les skills inutiles dans .claude/skills/"
echo "  3. Lance 'claude' dans ce dossier"
