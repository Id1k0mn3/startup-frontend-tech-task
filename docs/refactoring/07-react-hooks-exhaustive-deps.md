# Phase 7 — Re-enable React Hooks Exhaustive Deps

## Goal

Remove the risky global disabling of `react-hooks/exhaustive-deps` and fix real dependency issues.

## Scope

Focus on:

- `.eslintrc.cjs` or current ESLint config
- React components/hooks that receive new warnings

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

- Re-enable `react-hooks/exhaustive-deps` globally.
- Run lint.
- Fix real dependency issues.
- Use local disable comments only when there is a documented, valid reason.

## Avoid

- Do not silence warnings by wrapping everything in `useCallback` unnecessarily.
- Do not add dependencies that create render loops.
- Do not hide problems with broad ESLint disables.

## Acceptance criteria

- `react-hooks/exhaustive-deps` is enabled globally.
- Lint passes.
- Tests pass.
- No behavior regression.

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
chore: enable react hooks dependency linting
```

## Codex prompt

```text
You are working on an existing React test assignment project.

This is Refactoring Phase 7.

Goal: re-enable react-hooks/exhaustive-deps and fix real dependency issues safely.

Inspect first:
- ESLint config
- components/hooks using useEffect, useCallback, useMemo
- existing tests

Before editing, report current exhaustive-deps configuration, files likely affected, planned fixes, and exact files to modify.

Re-enable react-hooks/exhaustive-deps globally. Run lint. Fix dependency issues correctly. Avoid unnecessary useCallback/useMemo. Use local ESLint disable only with a clear comment and only if there is a strong reason.

After implementation, run pnpm lint, pnpm test, pnpm typecheck, and pnpm build. Report what changed and which checks pass.
```
