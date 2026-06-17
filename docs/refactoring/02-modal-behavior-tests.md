# Phase 2 — Modal Behavior Tests

## Goal

Protect the main user flow before refactoring modal UI or accessibility behavior.

## Scope

Focus on:

- `src/features/filter-modal/ui/FilterModal.tsx`
- `src/features/filter-modal/ui/FilterConfirmDialog.tsx`
- `src/pages/Home/ui/App.tsx`
- test utilities if needed

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

- Add behavior tests for modal open/prefill/edit/cancel/confirm.
- Test that homepage JSON updates only after confirmation.
- Test that draft changes do not update global state before confirmation.
- Test Escape behavior according to current expected behavior.

## Minimum test cases

- Homepage renders the Open Filters button.
- Clicking Open Filters opens the modal.
- Modal renders filter options from loaded filter data.
- Modal opens with previously confirmed selected values checked.
- Changing checkboxes updates only modal draft state.
- Closing/canceling modal does not update confirmed global state.
- Clicking Apply opens confirmation dialog.
- Confirmation Cancel does not update global state.
- Confirmation Confirm saves draft filters to global state.
- Homepage JSON output updates only after Confirm.

## Acceptance criteria

- Main user flow is protected by tests.
- Tests use user-facing queries where practical: `getByRole`, `findByRole`, `getByLabelText`.
- Zustand/localStorage state is reset between tests.
- No production behavior changes unless a real bug is found.

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
test: cover filter modal confirmation flow
```

## Codex prompt

```text
You are working on an existing React test assignment project.

Refactoring Phase 1 is done. This is Refactoring Phase 2.

Goal: add behavior tests for the filter modal and confirmation flow before UI refactoring.

Do not refactor UI structure. Do not extract Button or Dialog components. Do not change visual styling. Focus only on behavior tests and small testability fixes.

Inspect first:
- src/features/filter-modal/ui/FilterModal.tsx
- src/features/filter-modal/ui/FilterConfirmDialog.tsx
- src/features/filter-modal/ui/FilterModalFilters.tsx
- src/pages/Home/ui/App.tsx
- src/shared/store/filterStore.ts
- src/shared/api/useFiltersQuery.ts
- existing test setup

Before editing, report the current test setup, whether React Testing Library and user-event are available, whether tests should target FilterModal or App, query mocking strategy, Zustand/localStorage reset strategy, and exact files to create or modify.

Add behavior tests for open, prefill, edit draft, cancel, Apply, confirmation Cancel, confirmation Confirm, homepage JSON update, and Escape behavior.

Use user-facing queries where practical. Reset Zustand/localStorage between tests. Do not use any or ts-ignore.

After implementation, run pnpm test, pnpm typecheck, pnpm lint, and pnpm build. Report what was added and which checks pass.
```
