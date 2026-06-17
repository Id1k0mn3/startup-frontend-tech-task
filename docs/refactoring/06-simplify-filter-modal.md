# Phase 6 — Simplify FilterModal Responsibilities

## Goal

Reduce orchestration complexity inside `FilterModal.tsx` without changing behavior.

## Scope

Focus on:

- `src/features/filter-modal/ui/FilterModal.tsx`
- optional `src/features/filter-modal/model/useFilterDraft.ts`
- optional small hooks created in previous phases

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

- Identify responsibilities currently mixed in `FilterModal.tsx`.
- Move draft-selection logic into a small hook only if it improves clarity.
- Move focus/Escape logic into a small hook only if not already done.
- Keep query-state rendering simple.
- Keep JSX readable.

## Avoid

- Do not over-split into many tiny files.
- Do not move logic just to satisfy a pattern.
- Do not change data flow.
- Do not rename many components.

## Acceptance criteria

- `FilterModal.tsx` is easier to read.
- Draft/global separation is still clear.
- Tests from previous phases pass.
- No visual changes.

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
refactor: simplify filter modal orchestration
```

## Codex prompt

```text
You are working on an existing React test assignment project.

Previous phases added tests, accessibility improvements, Dialog extraction, and button style cleanup. This is Refactoring Phase 6.

Goal: simplify FilterModal.tsx responsibilities without changing behavior.

Do not rewrite the feature. Do not change styling. Do not change confirmation flow. Do not create unnecessary abstractions.

Inspect first:
- src/features/filter-modal/ui/FilterModal.tsx
- src/features/filter-modal/model/filterMappers.ts
- src/features/filter-modal/model/types.ts
- existing tests
- any shared Dialog/Button/focus helpers from previous phases

Before editing, report responsibilities currently handled by FilterModal, what can stay, what can move, planned hook/helper API if needed, and exact files to modify.

Refactor only if it reduces complexity. Preserve local draft state, confirmed Zustand state, Apply confirmation, cancel behavior, and homepage JSON behavior.

After implementation, run pnpm test, pnpm typecheck, pnpm lint, and pnpm build. Report what was simplified and which checks pass.
```
