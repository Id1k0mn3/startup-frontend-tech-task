# Phase 4 — Reusable Dialog Shell Extraction

## Goal

Remove duplicated modal/dialog structure after behavior and accessibility are protected by tests.

## Scope

Focus on:

- `src/features/filter-modal/ui/FilterModal.tsx`
- `src/features/filter-modal/ui/FilterConfirmDialog.tsx`
- optional `src/shared/ui/Dialog.tsx`

## Global rules

- Keep the task scope narrow.
- Do not rewrite the whole project.
- Do not change expected user behavior unless this phase explicitly fixes a bug.
- Do not install new dependencies unless the current project cannot complete the phase without them.
- Keep TypeScript strict.
- Do not use `any` unless there is no practical alternative.
- Do not use `// @ts-ignore`.
- Keep commits small and use Conventional Commits.
- Run checks after implementation.

## Tasks

- Extract repeated overlay/container semantics into a small reusable Dialog shell.
- Preserve current visual design.
- Preserve focus behavior from Phase 3.
- Keep `FilterModal` responsible for filter-specific content.
- Keep `FilterConfirmDialog` responsible for confirmation-specific content.

## Avoid

- Do not build a large modal framework.
- Do not introduce context unless needed.
- Do not add animation or new behavior.
- Do not extract everything into tiny components.

## Acceptance criteria

- `FilterModal` and `FilterConfirmDialog` share common dialog structure.
- Tests from previous phases still pass.
- Code is simpler, not more abstract.

## Checks

Run the relevant checks after implementation:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Suggested commit

```bash
refactor: extract shared dialog shell
```

## Codex prompt

```text
You are working on an existing React test assignment project.

Mapper tests, modal behavior tests, and accessibility/focus improvements are already in place. This is Refactoring Phase 4.

Goal: extract a small reusable Dialog shell to remove duplicated overlay/container/accessibility structure from FilterModal and FilterConfirmDialog.

Do not change visual design. Do not change business flow. Do not add animations. Do not create a large modal framework.

Inspect first:
- src/features/filter-modal/ui/FilterModal.tsx
- src/features/filter-modal/ui/FilterConfirmDialog.tsx
- existing modal tests
- any focus helper hooks added earlier

Before editing, report duplicated dialog/overlay logic, what should be shared, what should stay feature-specific, planned component API, and exact files to modify.

Extract a small Dialog component only if it reduces duplication and keeps the code easier to understand. Preserve role, aria attributes, focus trap behavior, Escape behavior, and visual classes.

After implementation, run pnpm test, pnpm typecheck, pnpm lint, and pnpm build. Report what was simplified and which checks pass.
```
