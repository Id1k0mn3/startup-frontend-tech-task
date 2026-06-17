# Phase 8 — Types and Naming Cleanup

## Goal

Improve readability of filter-related types and names without a noisy rewrite.

## Scope

Focus on:

- `src/features/filter-modal/model/types.ts`
- `src/shared/api` filter types
- mapper function names only if needed
- imports affected by safe renames

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

- Review ambiguous type names.
- Rename only names that clearly hurt readability.
- Make array/single-item names accurate.
- Strengthen loose types where practical.
- Keep mapper input/output clear.

## Possible improvements

- `SearchRequestFilter` may be confusing if it represents an array.
- `FilterChoose` is awkward naming.
- `DraftFilters = Record<string, string[]>` may remain if stronger typing adds too much complexity.

## Avoid

- Do not rename everything.
- Do not introduce complex generics.
- Do not break public assignment type names if the README explicitly requires them.
- Do not make the code harder to read.

## Acceptance criteria

- Important filter types are easier to understand.
- Required assignment type names are preserved or clearly aliased.
- Tests and typecheck pass.

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
refactor: clarify filter type names
```

## Codex prompt

```text
You are working on an existing React test assignment project.

This is Refactoring Phase 8.

Goal: clean up filter-related TypeScript types and naming carefully.

Do not rewrite architecture. Do not change behavior. Do not rename many files. Preserve assignment-required names if they are explicitly required.

Inspect first:
- src/features/filter-modal/model/types.ts
- src/features/filter-modal/model/filterMappers.ts
- src/shared/api/types or equivalent files
- tests using these types

Before editing, report confusing names, which names should stay because of assignment requirements, proposed safe renames or aliases, and exact files to modify.

Improve naming and types only where it clearly improves readability. Avoid complex generics. Do not use any or ts-ignore.

After implementation, run pnpm test, pnpm typecheck, pnpm lint, and pnpm build. Report what changed and which checks pass.
```
