# Phase 10 — Unused Dependencies and Config Cleanup

## Goal

Remove or justify unused dependencies and align config with the actual project setup.

## Scope

Focus on:

- `package.json`
- `pnpm-lock.yaml`
- `.prettierrc.json`
- `.eslintrc.cjs`
- `tsconfig.json`
- Vite config only if plugin cleanup is needed

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

- Check if `date-fns` is used.
- Check if `immer` is used.
- Check if `react-router` / `react-router-dom` are used.
- Check if `vite-plugin-svgr` is needed.
- Check if `tw-animate-css` is used.
- Remove unused dependencies only after verifying no source usage.
- Align Prettier import order with real aliases.
- Align ESLint alias restrictions with actual `tsconfig` aliases.

## Avoid

- Do not remove packages required by the assignment.
- Do not remove packages used by hidden project setup.
- Do not change package manager.
- Do not make broad config changes unrelated to current problems.

## Acceptance criteria

- Dependency list looks intentional.
- Config aliases match real project aliases.
- Lockfile is updated correctly.
- All checks pass.

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
chore: remove unused dependencies and align config
```

## Codex prompt

```text
You are working on an existing React test assignment project.

This is Refactoring Phase 10.

Goal: clean unused dependencies and align configuration with the actual project setup.

Inspect first:
- package.json
- pnpm-lock.yaml
- .prettierrc.json
- .eslintrc.cjs
- tsconfig.json
- vite.config.ts
- source imports/usages

Before editing, report suspected unused dependencies, evidence for each, config mismatches, planned removals/changes, and exact files to modify.

Verify usage before removing anything. Remove only clearly unused dependencies or config aliases. Do not remove required assignment technologies: React, React Query, Tailwind, i18n, Zustand.

After implementation, run pnpm install if package changes were made, then pnpm format:check, pnpm lint, pnpm typecheck, pnpm test, and pnpm build. Report what was removed and which checks pass.
```
