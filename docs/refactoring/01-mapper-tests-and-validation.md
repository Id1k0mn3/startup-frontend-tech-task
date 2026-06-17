# Phase 1 — Mapper Tests and Validation

## Goal

Add safety around filter data transformation before changing UI code.

## Scope

Focus on:

- `src/features/filter-modal/model/filterMappers.ts`
- `src/features/filter-modal/model/types.ts`
- `src/shared/store/filterStore.ts` only if needed
- test setup only if needed

Do not touch modal UI styling or structure.

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

- Add unit tests for mapper functions.
- Validate unknown filter IDs.
- Validate unknown option IDs.
- Ignore corrupted persisted Zustand/localStorage data.
- Make sure empty option selections are not returned unless required by the expected output format.
- Keep mapper functions pure and easy to read.

## Minimum test cases

- Empty selected filters create an empty draft.
- Selected filters are converted to draft correctly.
- Draft filters are converted to `SearchRequestFilter` correctly.
- Unknown filter IDs are ignored.
- Unknown option IDs are ignored.
- Empty selections are not included in final request.
- Invalid persisted data does not break mapper logic.

## Acceptance criteria

- Mapper behavior is covered by tests.
- Invalid persisted data cannot leak into the final request payload.
- No UI behavior changes.
- TypeScript remains strict.

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
test: cover filter mapper behavior
```

If validation logic is added in the same phase:

```bash
refactor: validate filter mapper output
```

## Codex prompt

```text
You are working on an existing React test assignment project.

The filter modal feature is already implemented. This is Refactoring Phase 1.

Goal: add safety around filter data mapping and confirmed/draft state behavior before UI refactoring.

Do not refactor UI components. Do not change styling. Do not change user flow.

Inspect first:
- src/features/filter-modal/model/filterMappers.ts
- src/features/filter-modal/model/types.ts
- src/shared/store/filterStore.ts
- src/shared/api/filterApi.ts
- existing test setup

Before editing, report existing mapper functions, filter-related types, test setup, planned tests, planned validation logic, and exact files to modify.

Implement unit tests for mapper behavior. Cover empty selected filters, selected-to-draft conversion, draft-to-request conversion, unknown filter IDs, unknown option IDs, empty option selections, and corrupted persisted data.

Add validation/sanitization inside mapper logic. Keep only filter IDs and option IDs that exist in loaded filter data. Never throw because of corrupted persisted Zustand/localStorage data.

Do not use any or ts-ignore. Do not modify modal UI, Tailwind classes, i18n texts, GitHub Action, ESLint config, or Prettier config.

After implementation, run pnpm test, pnpm typecheck, pnpm lint, and pnpm build. Report what changed and which checks pass.
```
