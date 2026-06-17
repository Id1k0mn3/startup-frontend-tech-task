# AGENTS.md

## Project Context

This is a React test assignment for a filter modal.

Main requirements:

- React
- TypeScript
- React Query
- Zustand
- Tailwind CSS
- i18n
- Semantic HTML
- GitHub Action checks
- Conventional Commits

## Important Architecture Rules

- Zustand stores only confirmed selected filters.
- Modal local state stores draft filters.
- Draft changes must not update global state before confirmation.
- Raw `FilterItem` data must stay separated from final `SearchRequestFilter`.
- Mapping logic should not live inside JSX.

## Refactoring Documentation

Detailed refactoring stages are stored in:

`docs/refactoring/00-refactoring-index.md`

Before starting a refactoring phase:

1. Read `docs/refactoring/00-refactoring-index.md`.
2. Read the specific phase document.
3. Report the plan before editing files.
4. Keep changes limited to the current phase.
5. Run checks after changes.

## Refactoring Skill

For staged refactoring, use the repository skill:

`.agents/skills/refactoring-phase-runner/SKILL.md`

Before running any refactoring phase:

1. Read `docs/refactoring/00-refactoring-index.md`.
2. Read the selected phase document.
3. Use the `refactoring-phase-runner` skill.
4. Print a phase-specific plan before editing files.
5. Implement only the selected phase.
6. Run all required checks before finishing.

## Required Checks

Run before finishing a task:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
