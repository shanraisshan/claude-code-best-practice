# Update README Command

Analyze the project structure and update the README.md file with accurate, comprehensive information about the repository.

## Purpose

This command automates README documentation by:
1. Analyzing the project structure and codebase
2. Identifying key features and components
3. Generating or updating README sections
4. Ensuring documentation is accurate and helpful

## User Input

```text
$ARGUMENTS
```

If the user provides specific instructions (e.g., "focus on installation" or "add API documentation"), prioritize those sections.

## Outline

1. **Analyze Project**: Scan repository structure, files, and existing documentation
2. **Identify Components**: Detect tech stack, features, and key functionality
3. **Generate Content**: Create comprehensive README sections
4. **Update README**: Write or update the README.md file
5. **Validate**: Ensure completeness and accuracy

## Execution Flow

### Phase 1: Project Analysis

**Prerequisites**: Repository must exist

**Process**:
1. Read existing README.md (if present)
2. Scan directory structure to identify:
   - Programming languages used
   - Frameworks and libraries
   - Configuration files
   - Source code organization
   - Tests and documentation
3. Identify the project type (library, application, tool, etc.)
4. Check for package.json, requirements.txt, go.mod, Cargo.toml, etc.
5. Review git history for context about the project

**Outputs**:
- Project type and purpose
- Tech stack list
- Key directories and files
- Existing README content (if any)

**Validation**:
- [ ] Project structure successfully scanned
- [ ] Tech stack identified
- [ ] Project type determined

---

### Phase 2: Content Generation

**Prerequisites**: Phase 1 completed

**Process**:
1. Delegate to the **readme-writer** agent to generate content
2. Provide the agent with:
   - Project analysis from Phase 1
   - User-specified requirements (if any)
   - Existing README content
3. Agent should generate sections:
   - **Title and Description**: Clear project overview
   - **Features**: Key capabilities and highlights
   - **Installation**: Setup instructions for the tech stack
   - **Usage**: Examples and basic usage patterns
   - **Project Structure**: Directory layout explanation
   - **Configuration**: Environment variables and config files
   - **Development**: How to contribute and develop
   - **License**: License information (if detected)
4. Ensure all content is accurate and based on actual code/files
5. Make content beginner-friendly with clear examples

**Outputs**:
- Complete README content organized by sections

**Validation**:
- [ ] All standard sections included
- [ ] Content is accurate based on actual project files
- [ ] Examples are practical and correct
- [ ] Installation instructions match the tech stack

---

### Phase 3: Update README

**Prerequisites**: Phase 2 completed with validated content

**Process**:
1. If README.md exists:
   - Preserve any custom sections or notes
   - Update outdated sections
   - Add missing sections
2. If README.md doesn't exist:
   - Create new file with generated content
3. Format the content with proper markdown
4. Ensure consistent style and formatting
5. Add table of contents if README is lengthy

**Outputs**:
- Updated or created README.md file

**Validation**:
- [ ] README.md file exists
- [ ] Markdown is properly formatted
- [ ] All sections are present
- [ ] No placeholder text remains

---

### Phase 4: Final Verification

**Prerequisites**: Phase 3 completed

**Process**:
1. Read the final README.md
2. Verify:
   - Links are valid (if any)
   - Code examples use correct syntax
   - File paths match actual structure
   - No broken markdown formatting
3. Check for completeness:
   - Is the purpose clear?
   - Are setup instructions complete?
   - Are examples helpful?

**Outputs**:
- Verification report
- List of any issues found

**Validation**:
- [ ] No markdown errors
- [ ] Code syntax is correct
- [ ] File references are accurate
- [ ] README is comprehensive

---

## Sub-Agent Delegation

### readme-writer Agent

Invoke the **readme-writer** agent (`.claude/agents/readme-writer.md`) for Phase 2 content generation.

**What to provide**:
```
Project Type: [application/library/tool]
Tech Stack: [languages, frameworks, tools]
Directory Structure: [key directories and their purposes]
Existing Content: [current README content if any]
User Requirements: [specific user instructions]
Package Info: [dependencies, scripts from package files]
```

**Expected output**:
```
# Project Title
[Generated comprehensive README content with all sections]
```

**Verification**:
- Ensure agent used actual project information (not hallucinated)
- Check that examples reference real files/code
- Verify installation steps match the tech stack
- Confirm content is appropriate for the audience

---

## Error Handling

**If project structure is unclear**:
- Ask user to clarify project type
- Request focus areas for documentation

**If existing README has custom sections**:
- Preserve custom content
- Inform user about sections kept vs. updated

**If tech stack is ambiguous**:
- List detected possibilities
- Ask user to confirm the stack

**If agent generates incorrect content**:
- Iterate with corrections
- Provide agent with specific file examples
- Ask user to review and approve

---

## Completion Report

After successful execution, report:

```markdown
✅ README updated successfully!

## Changes Made
- [Created new README.md | Updated existing README.md]
- Added/Updated sections:
  - [List of sections modified]

## README Sections
✅ Title and Description
✅ Features
✅ Installation
✅ Usage
✅ Project Structure
✅ [Other sections]

## Tech Stack Documented
- [List languages/frameworks/tools included]

## File Location
- README.md (root directory)

## Next Steps
1. Review the updated README for accuracy
2. Add any project-specific details
3. Update screenshots or badges if needed
4. Commit the changes

## Verification Results
[Report any warnings or issues]
```

---

## Notes

- **Accuracy First**: Only document what actually exists in the code
- **User-Friendly**: Write for developers who are new to the project
- **Maintainable**: Structure content so it's easy to update
- **Comprehensive**: Cover installation, usage, and development
- **Preserve Custom Content**: Don't overwrite user's custom sections without warning
