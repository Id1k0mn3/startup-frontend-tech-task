# Codebase Investigation Report

## 1. Project Overview

Framework/build tool:
- React 19 app built with Vite 6.
- Vite uses @vitejs/plugin-react-swc, vite-tsconfig-paths, @tailwindcss/vite, and vite-plugin-svgr.
- Main Vite config: vite.config.ts.

Package manager:
- pnpm is the active package manager. Evidence: pnpm-lock.yaml and pnpm-workspace.yaml.
- package.json scripts are package-manager agnostic, but lint-staged uses pnpm commands.

TypeScript usage:
- Strict TypeScript is enabled in tsconfig.json.
- Key options: strict, noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch, isolatedModules, moduleResolution bundler, jsx react-jsx.
- Path alias configured as @/* -> ./src/*.
- i18next has module augmentation in src/i18next.d.ts.

Main entry points:
- index.html: Vite HTML entry.
- src/main.tsx: React root, StrictMode, QueryClientProvider, app bootstrap, i18n side-effect import.
- src/query.ts: React Query QueryClient instance.
- src/pages/Home/index.ts and src/pages/Home/ui/App.tsx: app screen.

Current folder structure:
- .github/workflows/check.yml: CI workflow.
- .husky/pre-commit: lint-staged hook.
- public/.gitkeep: no real static assets.
- src/features/filter-modal/model: draft/final filter mapping and modal types.
- src/features/filter-modal/ui: modal container, state view, filters renderer, footer, header, confirm dialog.
- src/pages/Home/ui: homepage and debug JSON output.
- src/shared/api: local filter data loader, React Query hook, API/domain types.
- src/shared/i18n: i18next config and locale resources.
- src/shared/store: Zustand confirmed filter store.
- src/shared/temp: bundled filterData.json.
- src/shared/ui/filter-option: shared checkbox and fieldset UI.
- dist, node_modules, .pnpm-store are present locally and should not be treated as source.

Repository state note:
- The worktree is dirty. git status reports modified workflow/config/source files, deleted .github/workflows/pipeline.yml and src/shared/i18n/locales/en/not-found.json, and untracked src/features/filter-modal/model, src/features/filter-modal/ui files, src/shared/ui, and .pnpm-store.

## 2. Dependencies

React:
- react ^19.1.0 and react-dom ^19.1.0 are used.
- React entry is normal: createRoot in src/main.tsx.

React Query:
- @tanstack/react-query ^5.74.3 is used.
- QueryClientProvider is wired in src/main.tsx.
- useQuery is used in src/shared/api/useFiltersQuery.ts.
- @tanstack/eslint-plugin-query is enabled in ESLint.

Zustand:
- zustand ^5.0.3 is used in src/shared/store/filterStore.ts.
- Store uses persist middleware and localStorage.

Tailwind CSS:
- tailwindcss ^4.1.3 and @tailwindcss/vite are configured.
- src/main.css imports tailwindcss.
- tw-animate-css is imported but there is no visible animation usage in app components.

i18n:
- i18next and react-i18next are used.
- Default language and namespace are hardcoded as en/filter.
- Only one locale exists: src/shared/i18n/locales/en/filter.json.
- Type augmentation exists in src/i18next.d.ts.

ESLint:
- ESLint 8 with TypeScript, React, React Hooks, Prettier, React Refresh, i18next, prefer-arrow, and TanStack Query rules.
- react-hooks/exhaustive-deps is explicitly disabled. That is a real risk in React code.
- i18next/no-literal-string is enabled and strict.

Prettier:
- Prettier 3 configured in .prettierrc.json.
- Uses @trivago/prettier-plugin-sort-imports.
- .prettierignore excludes pnpm-lock.yaml, .pnpm-store, dist, coverage, node_modules, /tmp.

Testing libraries:
- vitest, jsdom, @testing-library/react, @testing-library/jest-dom, and @vitest/coverage-istanbul are installed.
- setupTest.ts imports @testing-library/jest-dom.
- No test files were found under src.

Suspicious or unnecessary dependencies:
- date-fns: installed but no app usage found.
- immer: installed but no app usage found.
- react-router and react-router-dom: installed but no router usage found.
- vite-plugin-svgr: configured, but no SVG assets/usages found.
- tw-animate-css: imported globally but no animation class usage found in source.
- @testing-library/react and Vitest are useful, but currently unused because no tests exist.

## 3. Scripts

Scripts from package.json:
- dev: vite --configLoader runner. Starts Vite dev server on configured port 3000.
- build: tsc && vite build --configLoader runner. Runs TypeScript compile check and production build.
- lint: eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0. Full lint check.
- lint:fix: same lint command with --fix.
- lint:all: alias for pnpm run lint.
- lint:file: eslint --report-unused-disable-directives --max-warnings 0. Intended for lint-staged file-level linting.
- format: prettier --log-level warn --write . Writes formatting changes.
- format:check: prettier --log-level warn --check . Checks formatting without writing.
- format:all: alias for pnpm run format.
- format:file: prettier --log-level warn --write. Intended for lint-staged files.
- format:check:all: alias for pnpm run format:check.
- typecheck: tsc --noEmit. TypeScript-only check.
- preview: vite preview. Serves production build.
- prepare: husky install. Installs Husky hooks.
- test: vitest. Runs tests in watch/default mode.
- coverage: vitest run --coverage. Runs coverage once.

Missing scripts:
- lint: present.
- lint:fix: present.
- format: present.
- format:check: present.
- typecheck: present.
- build: present.

Script concerns:
- test is present, but no tests exist.
- CI does not run tests or coverage.
- prepare uses husky install, which is deprecated in newer Husky versions but still common in older setups.

## 4. Feature Implementation Map

Filter modal files:
- src/features/filter-modal/index.ts
- src/features/filter-modal/ui/FilterModal.tsx
- src/features/filter-modal/ui/FilterModalFilters.tsx
- src/features/filter-modal/ui/FilterModalState.tsx
- src/features/filter-modal/ui/FilterModalHeader.tsx
- src/features/filter-modal/ui/FilterModalFooter.tsx
- src/features/filter-modal/ui/FilterConfirmDialog.tsx
- src/features/filter-modal/model/filterMappers.ts
- src/features/filter-modal/model/types.ts

Filter data loading:
- src/shared/temp/filterData.json: static source data.
- src/shared/api/filterApi.ts: maps JSON items and returns Promise<FilterItemsResponse>.
- src/shared/api/useFiltersQuery.ts: React Query wrapper.
- src/query.ts: QueryClient.

Zustand/global state:
- src/shared/store/filterStore.ts.
- src/pages/Home/ui/App.tsx consumes selectedFilters and applyFilters.

React Query:
- src/main.tsx wires QueryClientProvider.
- src/query.ts creates queryClient.
- src/shared/api/useFiltersQuery.ts defines filtersQueryKey and useFiltersQuery.

I18n:
- src/shared/i18n/i18n.ts
- src/shared/i18n/i18nConstants.ts
- src/shared/i18n/locales/index.ts
- src/shared/i18n/locales/en/index.ts
- src/shared/i18n/locales/en/filter.json
- src/i18next.d.ts
- src/main.tsx imports ./shared/i18n.

Confirmation dialog:
- src/features/filter-modal/ui/FilterConfirmDialog.tsx.
- Opened from src/features/filter-modal/ui/FilterModal.tsx when Apply is clicked.

Homepage JSON output:
- src/pages/Home/ui/App.tsx displays JSON.stringify(selectedFilters, null, 2) in a pre tag.

## 5. Architecture Review

Modal draft state vs confirmed global state:
- Draft state is local in FilterModal.tsx via useState<DraftFilters>.
- Confirmed state is global in Zustand as selectedFilters.
- This separation is correct and matches the assignment.

Global state update timing:
- Global state is updated only in handleConfirm via onApply(selectedFilters).
- Clicking modal Cancel calls onClose and does not apply draft changes.
- Clicking confirmation Cancel only closes the confirmation dialog and keeps the draft in the still-open modal.

Raw FilterItem vs final SearchRequestFilter:
- Raw/filter API data lives as FilterItem/FilterChoose.
- Final request payload is SearchRequestFilter with optionsIds.
- Mapping happens in createSearchRequestFilters.
- This separation is useful and should be kept.

Mapping separated from JSX:
- createDraftFromSelectedFilters and createSearchRequestFilters are in model/filterMappers.ts.
- JSX does not construct final request payload inline. Good boundary.

UI responsibilities:
- FilterModal.tsx still does orchestration, keyboard behavior, draft mutation, derived query state, and confirmation handling. It is the largest real component and has too many responsibilities.
- FilterModalFilters.tsx renders state vs ready content and delegates shared checkbox fieldsets.
- FilterModalState.tsx handles loading/error/empty presentation.
- FilterConfirmDialog.tsx is presentational but lacks reusable modal/dialog behavior.
- Shared checkbox components are reasonably reusable, but their naming is filter-specific and they still bake in styling.

## 6. Code Quality Issues

Large components:
- FilterModal.tsx is about 104 lines and contains most behavior. It is not huge, but it is the main complexity hotspot.
- App.tsx is about 51 lines and acceptable for this small assignment.

Duplicated logic:
- Button Tailwind classes are repeated across App, modal footer, confirmation dialog, and error retry button.
- Dialog overlay/container styling is duplicated between FilterModal and FilterConfirmDialog.
- Text color/spacing/border utility combinations repeat heavily.

Unclear naming:
- SearchRequestFilter is an array type, not a single filter. SearchRequestFilters would be clearer.
- FilterChoose is awkward naming. FilterOptionGroup or OptionFilter would read better.
- FilterOptionFieldset is shared but still tied to the filter domain and option shape.
- DraftFilters = Record<string, string[]> is very loose; the keys and option ids are opaque strings.

Unnecessary abstractions:
- shared/i18n/index.ts only re-exports i18n and is not used directly.
- filtersQueryKey is exported but no invalidation/prefetch usage exists.
- vite-plugin-svgr and custom.d.ts exist without actual SVG usage.
- env.d.ts defines VITE_APP_TITLE and VITE_API_URL, but they are not used.

Unnecessary files/folders:
- dist should not be part of review/source work.
- .pnpm-store is present and untracked; it should not be committed.
- public only contains .gitkeep.
- src/shared/temp is acceptable for assignment data, but temp is a weak name for checked-in fixture data.

Weak TypeScript types:
- DraftFilters is Record<string, string[]> and allows any filter id and any option id.
- createDraftFromSelectedFilters trusts persisted SearchRequestFilter data without validation.
- filterApi.ts forces every item to FilterType.OPTION, ignoring the type value in JSON and hiding bad input.
- SearchRequestFilterBase uses type: FilterType, then SearchRequestOptions narrows it. This is fine now but not very useful with only one filter type.
- FilterModal state is now discriminated by state, which avoids loading/error boolean conflicts.

Usage of any:
- No any usage found in src/config files scanned.

Unused imports/exports:
- No obvious unused imports were found by text inspection.
- Potentially unused exports: shared/i18n/index.ts, filtersQueryKey, FilterOptionCheckbox direct export.
- Exact unused-export detection would require a dedicated tool or lint rule not currently configured.

Hardcoded user-facing strings:
- User-facing UI strings are routed through i18n.
- Static filterData.json contains user-facing filter names/descriptions outside i18n. That may be acceptable because it simulates API data.
- closeSymbol is stored in i18n, which is not useful as translatable content; it is a UI symbol.

Excessive Tailwind duplication:
- Repeated primary button classes: bg-blue-700, hover:bg-blue-800, text-sm, font-medium/semibold, text-white, rounded-lg.
- Repeated neutral button classes: border-gray-300, text-gray-700, hover:bg-gray-50.
- Repeated panel/dialog classes: bg-white, shadow-2xl, rounded-2xl.
- No shared Button/Dialog primitives exist.

Disabled ESLint rules:
- react-hooks/exhaustive-deps is disabled globally. This is too broad.
- No inline eslint-disable comments found.

Dead code:
- No obvious dead source components found.
- Dependency-level dead weight exists: date-fns, immer, react-router, react-router-dom, likely svgr and tw-animate-css.

## 7. Tooling Review

ESLint configuration:
- .eslintrc.cjs uses old-style config, fine for ESLint 8.
- Rule coverage is strict in some places: no unused directive warnings, prefer-arrow, i18next no literal strings.
- The alias restriction rule appears inconsistent with current tsconfig. It complains about @{folderName}/ aliases, but tsconfig only defines @/*.
- react-hooks/exhaustive-deps is disabled globally and should be re-enabled unless there is a documented reason.

Prettier configuration:
- .prettierrc.json is present and detailed.
- importOrder includes aliases like @api and @assets that are not configured in tsconfig.
- .prettierignore correctly ignores generated and dependency folders.

TypeScript configuration:
- Strict mode is enabled.
- noUnusedLocals and noUnusedParameters are enabled.
- skipLibCheck is enabled, which is normal for frontend assignments.
- allowImportingTsExtensions is enabled but not used.
- Env variables are typed but unused.

GitHub Actions:
- .github/workflows/check.yml runs install, format:check, lint, typecheck, and build.
- It does not run tests.
- It uses Node 20 and pnpm 10.
- Existing worktree indicates .github/workflows/pipeline.yml was deleted and check.yml is modified.

Are checks enough for this assignment:
- Mostly enough for static quality: format, lint, typecheck, build are present.
- Not enough for behavior: no tests run in CI, and no test files exist.
- The highest-value missing checks are mapper unit tests and modal confirmation/cancel behavior tests.

## 8. Risks

Confirmation flow risks:
- Apply opens confirmation even if no changes were made.
- Confirm dialog has no focus trap and no initial focus; keyboard users can tab behind it.
- Escape closes the confirmation dialog through the parent modal handler, but focus restoration is not handled.
- There is no click-outside behavior. That may be fine, but it should be intentional.

Pre-filled modal values risks:
- Draft is initialized only on mount. If initialValue changes while the modal remains mounted, draft state will not sync.
- Persisted selected filters are trusted. Invalid filter ids and option ids can enter draft.
- createSearchRequestFilters silently drops unknown filter ids because it only maps loaded filterItems.
- Invalid option ids for known filters can survive into SearchRequestFilter because optionsIds are not validated against filterItem.options.

Cancel behavior risks:
- Modal Cancel and close button discard the current draft, which matches assignment.
- Confirmation Cancel keeps the draft and returns to modal, which is likely correct.
- There is no explicit dirty-state handling, so the user can be asked to confirm even when payload is unchanged.

Global state risks:
- Zustand persist writes to localStorage immediately; bad persisted state shape is not migrated or validated.
- Store has no version/migration configuration.
- localStorage access is wrapped by createJSONStorage, but there is no SSR guard. In this Vite SPA it is acceptable.

I18n risks:
- Only en locale exists.
- No fallbackLng is configured.
- No missing-key behavior is configured.
- API-provided filter data is not localized through i18n.
- closeSymbol should not be in locale JSON.

Accessibility risks:
- Modal and alertdialog have roles and aria-labelledby, which is a start.
- No focus trap.
- No focus restoration to the button that opened the modal.
- No initial focus inside modal/dialog.
- Background content is not inert while modal is open.
- Checkbox label wrapping works, but inputs do not expose descriptions via aria-describedby. The visible label text is probably enough for basic use.
- Close button uses x text from i18n; aria-label is present.

## 9. Recommended Refactoring Plan

High-priority issues:
- Add tests for createDraftFromSelectedFilters and createSearchRequestFilters.
- Validate selected/persisted filter ids and option ids against loaded filterItems before producing SearchRequestFilter.
- Add modal/confirmation behavior tests: prefill, cancel, confirm, Escape.
- Fix dialog accessibility: focus trap, initial focus, focus restoration, and inert/background handling.
- Re-enable react-hooks/exhaustive-deps or narrow-disable it locally with comments.

Medium-priority issues:
- Extract a small Button component or class helper for repeated primary/secondary buttons.
- Extract a reusable Dialog shell for FilterModal and FilterConfirmDialog.
- Rename SearchRequestFilter to SearchRequestFilters or equivalent array-aware name.
- Move src/shared/temp/filterData.json to a clearer fixture/mock/API data location.
- Remove or justify unused dependencies: date-fns, immer, react-router, react-router-dom, tw-animate-css, svgr.
- Align Prettier importOrder and ESLint alias restrictions with actual tsconfig aliases.

Low-priority issues:
- Stop storing closeSymbol in i18n.
- Add dirty-state detection to avoid confirmation when nothing changed.
- Add empty selected-state rendering on homepage instead of raw empty JSON only.
- Add packageManager metadata to package.json for pnpm version clarity.
- Consider adding fallbackLng to i18n.

Safe step-by-step refactoring order:
1. Add mapper unit tests first, before changing behavior.
2. Add UI tests for modal open, prefill, cancel, confirm, and Escape behavior.
3. Add validation/sanitization in filterMappers.ts and adjust tests.
4. Extract Dialog shell and preserve current modal markup/visual behavior.
5. Add focus management to Dialog and update UI tests.
6. Extract Button/shared styles only after behavior is covered.
7. Clean unused dependencies/config aliases after confirming they are not required by assignment constraints.
8. Re-enable react-hooks/exhaustive-deps and fix any actual dependency issues.

Files that should probably be changed later:
- src/features/filter-modal/model/filterMappers.ts
- src/features/filter-modal/model/types.ts
- src/features/filter-modal/ui/FilterModal.tsx
- src/features/filter-modal/ui/FilterConfirmDialog.tsx
- src/features/filter-modal/ui/FilterModalFooter.tsx
- src/features/filter-modal/ui/FilterModalHeader.tsx
- src/shared/store/filterStore.ts
- src/shared/api/filterApi.ts
- src/shared/i18n/i18n.ts
- src/shared/i18n/locales/en/filter.json
- .eslintrc.cjs
- .prettierrc.json
- package.json
- .github/workflows/check.yml

## 10. Files to Review First

1. src/features/filter-modal/ui/FilterModal.tsx
- Main behavior hotspot: draft state, query state, Escape handling, apply/confirm flow.

2. src/features/filter-modal/model/filterMappers.ts
- Boundary between UI draft state and final SearchRequestFilter. Needs tests and validation.

3. src/shared/store/filterStore.ts
- Confirmed global state and persisted localStorage data. Needs migration/validation consideration.

4. src/features/filter-modal/ui/FilterConfirmDialog.tsx
- Confirmation behavior is simple but accessibility is weak.

5. src/shared/api/filterApi.ts
- Static data loader currently overwrites item type and performs no validation.

6. src/pages/Home/ui/App.tsx
- Opens modal, passes confirmed state, and displays JSON payload.

7. src/shared/i18n/i18n.ts and src/shared/i18n/locales/en/filter.json
- Minimal i18n setup; no fallback and one questionable symbol key.

8. .eslintrc.cjs
- Good strictness in places, but react-hooks/exhaustive-deps is globally disabled and alias rules do not match tsconfig.

9. package.json
- Scripts are mostly complete; dependencies need pruning or justification.

10. .github/workflows/check.yml
- Static checks are present, but tests are not run.
