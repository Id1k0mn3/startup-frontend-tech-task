# Phase 5 — Button and Repeated Style Cleanup

## Goal

Reduce repeated Tailwind button classes without creating a large design system.

## Scope

Focus on:

- homepage Open Filters button
- modal footer buttons
- confirmation dialog buttons
- error retry button if present
- optional `src/shared/ui/Button.tsx`

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

- Identify repeated primary/secondary button styles.
- Extract a small `Button` component or class helper.
- Support only variants that are actually used.
- Preserve HTML semantics: real `<button>` elements.
- Preserve disabled/loading behavior if any.

## Avoid

- Do not create a full design system.
- Do not introduce class-variance-authority unless already installed and justified.
- Do not change visual design.
- Do not add unnecessary variants.

## Acceptance criteria

- Repeated button classes are reduced.
- Buttons remain accessible and semantic.
- Existing tests pass.
- Code is easier to scan.

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
refactor: extract shared button styles
```

## Codex prompt

```text
You are working on an existing React test assignment project.

Previous phases protected mapper logic, modal behavior, accessibility, and dialog structure. This is Refactoring Phase 5.

Goal: reduce repeated button Tailwind classes with a very small Button component or class helper.

Do not create a full design system. Do not change visual design. Do not change behavior.

Inspect first:
- src/pages/Home/ui/App.tsx
- src/features/filter-modal/ui/FilterModalFooter.tsx
- src/features/filter-modal/ui/FilterConfirmDialog.tsx
- src/features/filter-modal/ui/FilterModalState.tsx
- any existing shared UI files

Before editing, report repeated button classes, proposed variants, whether a component or helper is better, and exact files to modify.

Implement the simplest solution. Use real button elements. Preserve type, disabled, onClick, aria-label, and children behavior. Keep TypeScript strict.

After implementation, run pnpm test, pnpm typecheck, pnpm lint, and pnpm build. Report what was simplified and which checks pass.
```
