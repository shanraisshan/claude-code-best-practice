#!/bin/bash

# React Email Component Validator
# Validates React Email components for common issues
# Usage: ./scripts/validate-component.sh <component-file>

set -e

if [ -z "$1" ]; then
  echo "Error: Component file required"
  echo "Usage: ./scripts/validate-component.sh <component-file>"
  exit 1
fi

COMPONENT_FILE="$1"

if [ ! -f "$COMPONENT_FILE" ]; then
  echo "Error: File not found: $COMPONENT_FILE"
  exit 1
fi

ERRORS=0
WARNINGS=0

echo "Validating: $COMPONENT_FILE"
echo ""

# Check 1: Verify file is TypeScript/TSX
if [[ ! "$COMPONENT_FILE" =~ \.(tsx?|jsx?)$ ]]; then
  echo "⚠ Warning: File should be .tsx or .ts"
  ((WARNINGS++))
fi

# Check 2: Has Html component
if ! grep -q "import.*Html" "$COMPONENT_FILE"; then
  echo "✗ Error: Missing Html component import"
  ((ERRORS++))
fi

# Check 3: Has Body component
if ! grep -q "import.*Body" "$COMPONENT_FILE"; then
  echo "✗ Error: Missing Body component import"
  ((ERRORS++))
fi

# Check 4: Has Container component
if ! grep -q "import.*Container" "$COMPONENT_FILE"; then
  echo "✗ Error: Missing Container component"
  ((ERRORS++))
fi

# Check 5: Exports a React component
if ! grep -q "export const" "$COMPONENT_FILE"; then
  echo "✗ Error: Component not exported"
  ((ERRORS++))
fi

# Check 6: Has interface for props
if ! grep -q "interface.*Props" "$COMPONENT_FILE"; then
  echo "⚠ Warning: No interface defined for props"
  ((WARNINGS++))
fi

# Check 7: Has Preview component
if ! grep -q "import.*Preview" "$COMPONENT_FILE"; then
  echo "⚠ Warning: Preview component not imported (for email preview text)"
  ((WARNINGS++))
fi

# Check 8: Has Head component
if ! grep -q "<Head" "$COMPONENT_FILE"; then
  echo "⚠ Warning: Head component not used"
  ((WARNINGS++))
fi

# Check 9: Check for hardcoded API keys (security)
if grep -qi "api.?key\|secret\|token.*=" "$COMPONENT_FILE" | grep -v "placeholder\|your_\|REPLACE"; then
  echo "✗ Error: Possible hardcoded secrets detected"
  ((ERRORS++))
fi

# Check 10: Check for invalid CSS in styles
if grep -q "padding: .*,\|margin: .*," "$COMPONENT_FILE"; then
  echo "⚠ Warning: Check for invalid CSS syntax in style objects"
  ((WARNINGS++))
fi

# Check 11: Has closing tags
if grep -q "<Html" "$COMPONENT_FILE" && ! grep -q "</Html>" "$COMPONENT_FILE"; then
  echo "✗ Error: Html element not properly closed"
  ((ERRORS++))
fi

# Check 12: Text rendering
if ! grep -q "<Text" "$COMPONENT_FILE"; then
  echo "⚠ Warning: No Text components found"
  ((WARNINGS++))
fi

# Check 13: Check import from @react-email/components
if ! grep -q "from '@react-email/components'" "$COMPONENT_FILE"; then
  echo "✗ Error: Not importing from @react-email/components"
  ((ERRORS++))
fi

# Check 14: Verify render function usage in React components
if grep -q "React\.FC" "$COMPONENT_FILE" && ! grep -q "style=" "$COMPONENT_FILE"; then
  echo "⚠ Warning: No inline styles found - component may not render properly"
  ((WARNINGS++))
fi

echo ""
echo "Validation Results:"
echo "  Errors: $ERRORS"
echo "  Warnings: $WARNINGS"
echo ""

if [ $ERRORS -eq 0 ]; then
  echo "✓ Component validation passed!"
  exit 0
else
  echo "✗ Component validation failed with $ERRORS error(s)"
  exit 1
fi
