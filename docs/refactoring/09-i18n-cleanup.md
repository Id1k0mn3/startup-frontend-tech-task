# Phase 9 — i18n Cleanup

## Goal

Make i18n usage intentional and remove questionable translation keys.

## Scope

Focus on:

- `src/shared/i18n/i18n.ts`
- `src/shared/i18n/locales/en/filter.json`
- components using translation keys

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

- Keep real user-facing text in i18n.
- Remove or replace `closeSymbol` if it exists as a translation key.
- Add `fallbackLng` if missing.
- Check that missing-key behavior is acceptable.
- Keep API/filterData labels as API data unless the assignment requires translation.

## Avoid

- Do not add multiple fake locales just for show.
- Do not move API data labels into i18n unless necessary.
- Do not overcomplicate namespace structure.

## Acceptance criteria

- Translation files contain actual translatable text.
- UI symbols are not treated as translations unless there is a reason.
- i18n has sane fallback behavior.
- Tests and build pass.

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
refactor: clean filter i18n resources
```

## Codex prompt

```text
You are working on an existing React test assignment project.

This is Refactoring Phase 9.

Goal: clean up i18n usage and keep translation resources intentional.

Inspect first:
- src/shared/i18n/i18n.ts
- src/shared/i18n/i18nConstants.ts
- src/shared/i18n/locales/en/filter.json
- components using translation keys

Before editing, report current i18n setup, questionable keys, missing fallback behavior, planned changes, and exact files to modify.

Keep user-facing text in i18n. Remove UI symbols like closeSymbol from translations if present. Add fallbackLng if missing. Do not add fake locales. Do not move API filterData labels into i18n unless necessary.

After implementation, run pnpm test, pnpm typecheck, pnpm lint, and pnpm build. Report what changed and which checks pass.
```
