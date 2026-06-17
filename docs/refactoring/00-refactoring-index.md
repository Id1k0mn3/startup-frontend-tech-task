# Refactoring Plan Index

This documentation pack divides the codebase refactoring into small stages.
Each stage has a narrow goal, clear scope, acceptance criteria, and a ready-to-use Codex/OpenCode prompt.

## Recommended order

1. [Mapper tests and validation](./01-mapper-tests-and-validation.md)
2. [Modal behavior tests](./02-modal-behavior-tests.md)
3. [Modal accessibility and focus behavior](./03-modal-accessibility-focus.md)
4. [Reusable Dialog shell](./04-dialog-shell-extraction.md)
5. [Button and repeated style cleanup](./05-button-style-cleanup.md)
6. [Simplify FilterModal responsibilities](./06-simplify-filter-modal.md)
7. [Re-enable React Hooks exhaustive deps](./07-react-hooks-exhaustive-deps.md)
8. [Types and naming cleanup](./08-types-naming-cleanup.md)
9. [i18n cleanup](./09-i18n-cleanup.md)
10. [Unused dependencies and config cleanup](./10-dependencies-config-cleanup.md)
11. [CI and scripts improvement](./11-ci-scripts-improvement.md)
12. [Final repository cleanup](./12-final-repository-cleanup.md)

## Main principle

One phase = one refactoring reason = one commit.

## Current architecture to preserve

- Zustand stores only confirmed selected filters.
- Modal-local state stores draft filters.
- `Apply` opens confirmation.
- `Confirm` saves draft data globally.
- `Cancel` keeps previous confirmed data unchanged.
- Homepage JSON shows only confirmed selected filters.
- Raw `FilterItem` data is separated from final `SearchRequestFilter` output.

## Suggested final checks

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
git status
```
