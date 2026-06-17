# Phase 11 — CI and Scripts Improvement

## Goal

Make automated checks complete and suitable for review.

## Scope

Focus on:

- `package.json`
- `.github/workflows/check.yml`
- test scripts

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

- Add a non-watch test script if missing, for example `test:run`.
- Make CI run tests.
- Keep format, lint, typecheck, and build checks.
- Use pnpm consistently.
- Keep Node/pnpm versions stable.

## Recommended CI order

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
```

## Avoid

- Do not run watch-mode tests in CI.
- Do not switch package managers.
- Do not add slow unnecessary CI jobs.
- Do not remove existing useful checks.

## Acceptance criteria

- CI runs format check, lint, typecheck, tests, and build.
- Test script does not run in watch mode in CI.
- Local commands and CI commands are consistent.

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
ci: run tests in code quality workflow
```

## Codex prompt

```text
You are working on an existing React test assignment project.

This is Refactoring Phase 11.

Goal: improve CI and scripts so automated checks include tests.

Inspect first:
- package.json scripts
- .github/workflows/check.yml
- current test command behavior
- package manager files

Before editing, report current scripts, current CI steps, whether test is watch mode, proposed script changes, proposed CI changes, and exact files to modify.

Add a non-watch test script if missing, for example test:run. Update CI to run format:check, lint, typecheck, test:run, and build. Use pnpm consistently. Do not switch package managers.

After implementation, run pnpm format:check, pnpm lint, pnpm typecheck, pnpm test:run, and pnpm build. Report what changed and which checks pass.
```
