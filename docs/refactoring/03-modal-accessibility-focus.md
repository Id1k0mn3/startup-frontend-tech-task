# Phase 3 — Modal Accessibility and Focus Behavior

## Goal

Improve keyboard accessibility and focus behavior for the filter modal and confirmation dialog.

## Scope

Focus on:

- `src/features/filter-modal/ui/FilterModal.tsx`
- `src/features/filter-modal/ui/FilterConfirmDialog.tsx`
- existing modal behavior tests
- small focus helper hook only if useful

Do not extract a reusable Dialog shell yet unless absolutely required.

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

- Add or verify `role`, `aria-modal`, `aria-labelledby`, and `aria-describedby`.
- Move focus inside modal when it opens.
- Move focus inside confirmation dialog when it opens.
- Prefer focusing Cancel in the confirmation dialog.
- Restore focus to the Open Filters button when modal closes.
- Keep Tab/Shift+Tab inside the active dialog.
- Make Escape behavior predictable.
- Prevent background keyboard interaction while modal is open.

## Expected Escape behavior

- If confirmation dialog is open, Escape closes only confirmation.
- If confirmation dialog is not open, Escape closes the filter modal.
- Escape never applies draft changes.

## Acceptance criteria

- Modal is usable with keyboard.
- Focus returns to the trigger button after close.
- Tests cover important focus behavior.
- Visual design is not changed.

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
fix: improve modal focus management
```

## Codex prompt

```text
You are working on an existing React test assignment project.

Previous phases added mapper tests and modal behavior tests. This is Refactoring Phase 3.

Goal: improve accessibility and focus behavior for the filter modal and confirmation dialog without changing visual design or business flow.

Do not extract Button or Dialog components yet. Do not do styling cleanup. Do not change assignment behavior.

Inspect first:
- src/features/filter-modal/ui/FilterModal.tsx
- src/features/filter-modal/ui/FilterConfirmDialog.tsx
- src/features/filter-modal/ui/FilterModalHeader.tsx
- src/features/filter-modal/ui/FilterModalFooter.tsx
- existing modal tests
- src/pages/Home/ui/App.tsx

Before editing, report current aria attributes, Escape behavior, focus behavior when modal opens, focus behavior when confirmation opens, focus behavior when modal closes, planned accessibility changes, and exact files to modify.

Implement initial focus, focus restoration, focus containment, and predictable Escape behavior. If confirmation is open, Escape closes confirmation first. If not, Escape closes the modal.

Update tests for focus movement, confirmation focus, Escape behavior, and focus restoration. Keep TypeScript strict. Do not use any or ts-ignore.

After implementation, run pnpm test, pnpm typecheck, pnpm lint, and pnpm build. Report what improved and which checks pass.
```
