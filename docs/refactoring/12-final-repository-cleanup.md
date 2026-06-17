# Phase 12 — Final Repository Cleanup

## Goal

Prepare the repository for submission.

## Scope

Focus on repository hygiene, final checks, and submission readiness.

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

- Check `git status`.
- Make sure generated files are not committed.
- Make sure local dependency folders are not committed.
- Review commits for Conventional Commits.
- Review README or implementation notes if needed.
- Run all checks.
- Confirm the public copy preserves commit history.

## Files/folders that should not be committed

- `node_modules`
- `.pnpm-store`
- `dist` unless the assignment explicitly asks for built artifacts
- coverage output
- local temp files
- editor/system files

## Final checks

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
git status
```

## Acceptance criteria

- Working tree is clean.
- All checks pass.
- No generated/dependency files are committed.
- Repository is ready for HR/reviewer.

## Suggested commit

```bash
chore: prepare repository for submission
```

## Codex prompt

```text
You are working on an existing React test assignment project.

This is Refactoring Phase 12, the final repository cleanup before submission.

Goal: verify repository hygiene and submission readiness.

Do not implement new features. Do not refactor code unless a final check reveals a small necessary fix.

Inspect first:
- git status
- package.json scripts
- .gitignore
- committed/untracked generated folders
- README or implementation notes
- latest CI workflow

Before editing, report dirty files, generated folders, missing ignore rules, final check commands, and exact files to modify if needed.

Ensure node_modules, .pnpm-store, dist, coverage, and temp files are not committed. Update .gitignore if needed. Run all final checks. Report final repository status.

Use Conventional Commits.
```
