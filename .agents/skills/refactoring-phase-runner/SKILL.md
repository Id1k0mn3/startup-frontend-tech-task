---
name: refactoring-phase-runner
description: Run one documented refactoring phase safely. First inspect the codebase and create a phase-specific implementation plan. Then implement only the approved/current phase, keep changes small, and report checks.
---

---

# Refactoring Phase Runner

Use this skill when the user asks to run one refactoring phase from `docs/refactoring`.

This skill is for controlled, small-step refactoring. It must not rewrite the whole project.

## Main Rule

Before editing files, always create a phase-specific plan.

The workflow is:

1. Read repository instructions.
2. Read the refactoring index.
3. Read the selected phase document.
4. Inspect relevant source files.
5. Print a concrete implementation plan.
6. Only then implement the current phase.
7. Do not touch other phases.
8. Run checks.
9. Report changes.

## Required Context Files

Always read these first:

- `AGENTS.md`
- `docs/refactoring/00-refactoring-index.md`

Then read the selected phase file, for example:

- `docs/refactoring/03-modal-accessibility-focus.md`

## Refactoring Phase Rules

Work only inside the selected phase.

Do not:

- implement future phases
- rename unrelated files
- change visual design unless the selected phase requires it
- install dependencies unless the selected phase clearly requires it
- hide errors with `any`
- use `// @ts-ignore`
- disable ESLint rules globally
- rewrite the whole feature

Prefer:

- small commits
- minimal changes
- existing project style
- strict TypeScript
- simple helpers over complex abstractions
- behavior-preserving refactoring
- tests before risky refactoring

## Required Plan Before Editing

Before editing files, print this plan to the console/chat:

```md
# Refactoring Phase Plan

## Selected Phase

<phase number and title>

## Goal

<short goal of this phase>

## Current Findings

- <finding 1>
- <finding 2>
- <finding 3>

## Files Read

- <file 1>
- <file 2>

## Files Planned To Modify

- <file 1>
- <file 2>

## Implementation Steps

1. <step>
2. <step>
3. <step>

## Risks

- <risk 1>
- <risk 2>

## Checks To Run

- pnpm format:check
- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build
```

If the user asked only for planning, stop after the plan.

If the user explicitly asked to implement the phase, continue after printing the plan.

## Implementation Process

During implementation:

1. Keep the diff small.
2. Preserve existing behavior unless the phase explicitly fixes a bug.
3. Update or add tests when behavior is touched.
4. Do not change unrelated files.
5. Do not perform broad formatting unless required.
6. Do not change package manager.
7. Use existing scripts and project conventions.

## Checks

After implementation, run:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If one check fails:

1. Explain the failure.
2. Fix it if it belongs to the current phase.
3. Do not fix unrelated problems unless they block the phase.
4. Report remaining unrelated issues separately.

## Final Report Format

After finishing, report:

```md
# Refactoring Phase Result

## Completed Phase

<phase number and title>

## Summary

<short summary>

## Files Changed

- <file 1>
- <file 2>

## What Changed

- <change 1>
- <change 2>

## Behavior Preserved

- <behavior 1>
- <behavior 2>

## Checks

- format:check: pass/fail
- lint: pass/fail
- typecheck: pass/fail
- test: pass/fail
- build: pass/fail

## Remaining Risks

- <risk 1>
- <risk 2>

## Suggested Commit

`<conventional commit message>`
```

## Commit Style

Use Conventional Commits.

Examples:

- `test: cover filter mapper behavior`
- `test: cover filter modal confirmation flow`
- `fix: improve modal focus management`
- `refactor: extract dialog shell`
- `refactor: simplify filter modal state flow`
- `chore: clean unused dependencies`
- `ci: run tests in workflow`

## Phase Discipline

One phase means one reason for change.

Good:

- Phase 3 only improves modal accessibility and focus behavior.

Bad:

- Phase 3 improves accessibility, extracts Button, renames types, changes i18n, and removes dependencies.

Keep phases isolated.
