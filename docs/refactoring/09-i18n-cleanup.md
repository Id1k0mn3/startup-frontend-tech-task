# Phase 9 - i18n and boundary cleanup

## Goal

Fix the i18n architecture after the runtime localization refactor.

The application already localizes at runtime. This phase is about making the boundaries correct:

- i18n language is the single runtime source of truth.
- `localStorage` is only used inside the i18n boundary to initialize and persist language.
- `shared/api` does not read locale state or persistence directly.
- the language switcher lives in a feature boundary, not `shared/ui`.
- filter-query logic lives in the filter feature, not generic shared API code.
- duplicated locale fixture sources are removed.

## Current problem summary

The current runtime behavior works, but the architecture is too coupled:

- language persistence is implemented in more than one place.
- `shared/api` reaches into language state and browser storage.
- the language switcher is placed in `shared/ui`, which is too low-level for application preference control.
- filter-related query logic is still implemented in generic shared API files.
- locale-specific data is duplicated as separate fixture JSON files.
- unsafe assertions are used where typed fixtures would be clearer.

## Target architecture

- `src/shared/i18n` owns language initialization, persistence, supported languages, and locale resource registration.
- `src/features/change-language` owns the language selector UI and the change-language interaction.
- `src/features/filter-advertisements` owns filter query access and filter-specific model types.
- `shared/api` stays generic and contains only reusable API infrastructure.
- language is passed explicitly to feature queries instead of being read implicitly from `localStorage`.
- filter fixtures are stored as typed TypeScript data with localized labels, using `satisfies` where appropriate.

## Files likely to change

- `src/shared/i18n/i18n.ts`
- `src/shared/i18n/i18nConstants.ts`
- `src/shared/i18n/language.ts`
- `src/shared/i18n/locales/*`
- `src/shared/ui/Dialog.tsx` only if validation reveals a needed follow-up from locale accessibilities
- `src/shared/api/filterApi.ts`
- `src/shared/api/useFiltersQuery.ts`
- `src/shared/temp/filterData*.json` or their replacement fixture files
- `src/pages/Home/ui/App.tsx`
- `src/features/filter-modal/*` only if import paths or query boundaries need to move
- `src/pages/Home/ui/App.test.tsx`
- new files under `src/features/change-language/*`
- new files under `src/features/filter-advertisements/*`
- documentation files in `docs/refactoring/*` only if this phase updates the plan or acceptance criteria

## FSD layers affected

- `shared`
- `features`
- `pages`

## Step-by-step refactoring plan

1. Make language persistence a single responsibility of the i18n boundary.

   - Keep language initialization, `fallbackLng`, supported language registration, and `localStorage` persistence in `src/shared/i18n`.
   - Remove any direct or indirect `localStorage` reads from API/data functions.
   - Keep English as the default language and Ukrainian as the secondary language.

2. Move the language switcher out of `shared/ui`.

   - Create a feature boundary such as `src/features/change-language`.
   - Put the switcher UI there.
   - Put the language-change hook or action there if it needs its own model layer.
   - Keep the component small and specific to changing app language.

3. Move filter query logic out of `shared/api`.

   - Create a filter feature API layer such as `src/features/filter-advertisements/api`.
   - Move filter-specific hooks and fetch helpers there.
   - Keep `shared/api` generic only.
   - Pass language explicitly to the filter query/data fetch layer.

4. Replace hidden locale reads with explicit language parameters.

   - Prefer `getFilterOptions(language)` or `useFilterOptionsQuery(language)`.
   - Do not let API or fixture code infer locale by reading browser storage.
   - Keep the language source of truth in i18n, then pass the current language into feature queries.

5. Simplify filter fixtures.

   - Replace duplicated locale JSON fixtures with one typed fixture source if possible.
   - Prefer a TypeScript fixture file with localized labels and `satisfies` over JSON plus runtime assertions.
   - Keep stable values and localized labels together so the mapping is easy to review.

6. Tighten types and remove unsafe assertions.

   - Remove `as FilterItem`-style assertions in filter data mapping.
   - Keep DTO-like fixture shapes separate from feature/domain types.
   - Keep negative-correlation test assertions isolated to test files.

7. Update tests around the new boundaries.

   - Cover language persistence initialization.
   - Cover explicit-language filter query behavior.
   - Cover language switching from the new feature boundary.
   - Keep existing modal behavior tests intact unless import paths or labels change.

8. Update documentation only where the architecture changed.
   - Record that language belongs to the i18n boundary.
   - Record that feature queries receive language explicitly.
   - Record that `shared/api` must not read `localStorage`.
   - Record that the language switcher is a feature, not shared UI.

## What should be removed

- direct `localStorage` reads from API/data functions
- implicit locale lookup inside filter data fetching
- `LanguageSwitcher` from `shared/ui`
- duplicated locale fixture sources if a typed single-source fixture can replace them
- unsafe fixture-to-domain assertions where typed data can express the same shape

## What should stay unchanged

- English remains the default language.
- Ukrainian remains the secondary language.
- no new packages are added.
- strict TypeScript remains enabled.
- React Query remains the query layer.
- Zustand remains for confirmed filter state only.
- the modal confirmation flow stays unchanged.
- the Feature-Sliced Design structure stays the guiding principle.

## TypeScript improvements

- Use explicit language types for the supported locale union.
- Keep locale-aware query APIs typed at the boundary.
- Prefer typed fixtures with `satisfies` instead of untyped JSON plus assertions.
- Avoid widening locale values through `string` unless a generic boundary truly needs it.
- Keep DTO/domain/localized-label boundaries clear.

## Documentation updates

- Update this phase document after the refactor if the final file layout differs from the plan.
- Record the final i18n rule in the architecture documentation:
  - language state belongs to the i18n boundary
  - feature queries receive language explicitly
  - `shared/api` must not read `localStorage`
  - the language switcher is a feature, not shared UI
- If a new feature directory is introduced, document the feature boundary and the public API entrypoint.

## Risks

- Moving locale-aware query logic can temporarily break cache keys or reload behavior if language is not threaded through consistently.
- Replacing JSON fixtures with typed fixtures may require small type adjustments in tests and query mocks.
- Moving the switcher feature can change import paths in the page shell and tests.
- If the current runtime language is used in multiple places during the transition, there is a risk of stale or duplicated state.
- The plan should avoid changing the modal filter flow unless a boundary change requires it.

## Validation steps

Run these checks after implementation:

- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## Suggested commit

```text
refactor: fix i18n boundaries and language ownership
```
