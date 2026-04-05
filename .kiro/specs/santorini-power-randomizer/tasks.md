# Implementation Plan: Santorini Power Randomizer

## Overview

Incremental build-up from tooling setup → core logic → shared components → screens → wiring. Each step integrates into the previous so nothing is left orphaned.

## Tasks

- [x] 1. Install dependencies and configure tooling
  - Install TanStack Router: `npm install @tanstack/react-router`
  - Install Shadcn/ui prerequisites (Tailwind CSS v4, tw-animate-css): `npm install tailwindcss @tailwindcss/vite tw-animate-css`
  - Initialize Shadcn: `npx shadcn@latest init` (choose default style, CSS variables)
  - Add required Shadcn components: `npx shadcn@latest add button card carousel checkbox`
  - Install Vitest and testing libraries: `npm install -D vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom`
  - Install fast-check: `npm install -D fast-check`
  - Create `vitest.config.ts` with `environment: "jsdom"`, `globals: true`, `setupFiles: ["./src/test/setup.ts"]`, and `coverage.branches: 80`
  - Create `src/test/setup.ts` importing `@testing-library/jest-dom`
  - _Requirements: 9.3_

- [x] 2. Implement core library modules
  - [x] 2.1 Implement `src/lib/sprite.ts` — `getSpriteStyle(expansion, row, col, sizePx): SpriteStyle`
    - Use `SPRITE_GRID[expansion]` for `backgroundSize`; compute `backgroundPosition` as `-(col*size)px -(row*size)px`
    - _Requirements: 11.1, 11.2, 11.4_

  - [x] 2.2 Write property test for sprite style cell calculation (Property 6)
    - **Property 6: Sprite style covers the correct cell**
    - **Validates: Requirements 11.1, 11.2, 11.4**
    - File: `src/lib/sprite.test.ts`

  - [x] 2.3 Implement `src/lib/storage.ts` — `loadExpansions()` and `saveExpansions(ids)`
    - Default to `["base"]` when key absent; catch `SecurityError` for private-browsing fallback
    - _Requirements: 1.7, 2.6_

  - [x] 2.4 Write property test for expansion persistence round-trip (Property 5)
    - **Property 5: Expansion persistence round-trip**
    - **Validates: Requirements 1.7, 2.6**
    - File: `src/lib/storage.test.ts`

  - [x] 2.5 Implement `src/lib/randomizer.ts` — `pickOne`, `pickTwo`, `pickMatchup`
    - `pickMatchup` returns `null` when no valid matchups exist for active expansions
    - _Requirements: 3.1, 4.1, 5.1, 5.3_

  - [x] 2.6 Write property test for pickOne expansion membership (Property 1)
    - **Property 1: Single pick always returns a power from active expansions**
    - **Validates: Requirements 3.1**
    - File: `src/lib/randomizer.test.ts`

  - [x] 2.7 Write property test for pickTwo distinct + expansion (Property 2)
    - **Property 2: Two-power pick returns distinct powers from active expansions**
    - **Validates: Requirements 4.1**
    - File: `src/lib/randomizer.test.ts`

  - [x] 2.8 Write property test for pickMatchup valid pair (Property 3)
    - **Property 3: Matchup pick returns a valid curated pair from active expansions**
    - **Validates: Requirements 5.1**
    - File: `src/lib/randomizer.test.ts`

  - [x] 2.9 Write property test for pickMatchup null when no matchups (Property 4)
    - **Property 4: No valid matchups returns null**
    - **Validates: Requirements 5.3**
    - File: `src/lib/randomizer.test.ts`

- [x] 3. Implement `src/hooks/useExpansions.ts`
  - React hook that reads from `loadExpansions()` on mount and exposes `[activeExpansions, toggleExpansion]`
  - Calls `saveExpansions` on every toggle
  - _Requirements: 1.7, 2.4, 2.6_

- [x] 4. Checkpoint — Ensure all tests pass
  - Run `npx vitest --run` and confirm all lib + hook tests pass. Ask the user if questions arise.

- [x] 5. Implement shared UI components
  - [x] 5.1 Implement `src/components/SpriteImage.tsx`
    - Renders a `<div>` with inline style from `getSpriteStyle`; falls back to `power.name` text on image error
    - Props: `expansion`, `row`, `col`, `size?`, `alt`, `className?`
    - _Requirements: 6.1, 6.2, 6.3, 11.1, 11.2_

  - [x] 5.2 Write unit test for SpriteImage fallback rendering
    - Test that when background image fails, the power name text is shown
    - _Requirements: 6.3_

  - [x] 5.3 Implement `src/components/PowerCard.tsx`
    - CSS 3D flip card: front shows `SpriteImage`, back shows name + description + BGA link
    - Internal `flipped` state toggled on click/tap; uses `transform: rotateY(180deg)` with `backface-visibility: hidden`
    - BGA link: `https://en.doc.boardgamearena.com/SantoriniPower${power.bgaSlug}` opens in new tab
    - Props: `power: Power`, `initiallyFlipped?: boolean`
    - _Requirements: 6.1, 6.2, 6.4, 6.5, 6.6, 6.7_

  - [x] 5.4 Write unit test for PowerCard front/back rendering
    - Test front face shows sprite, back face shows name and BGA link after click
    - _Requirements: 6.4, 6.5_

  - [x] 5.5 Write property test for BGA link slug (Property 9)
    - **Property 9: BGA link contains the correct slug**
    - **Validates: Requirements 6.5**
    - File: `src/data/powers.test.ts`

  - [x] 5.6 Implement `src/routes/others.tsx` — Others Screen
    - Same visual style as Selection Screen (title image, Aegean background)
    - Three Shadcn `Button` components: "Browse Gods" → `/gods`, "Game Modes" → `/game-modes`, "Settings" → `/settings`
    - Back button → `/`
    - _Requirements: 1.6, 1.7_

- [x] 6. Set up TanStack Router and root layout
  - [x] 6.1 Create `src/router.ts` — TanStack Router instance with all route definitions
    - Register routes: `/`, `/others`, `/result`, `/settings`, `/gods`, `/expansion/$id`, `/game-modes`, `/game-modes/$id`
    - _Requirements: 1.1_

  - [x] 6.2 Create `src/routes/__root.tsx` — root layout component
    - Full-viewport Aegean sea background (deep blue gradient/texture via global CSS)
    - Title image header (`/img/title.png`) full-width, aspect-ratio preserved
    - `<Outlet />` for child routes
    - _Requirements: 9.1, 9.2, 1.2_

  - [x] 6.3 Apply global Aegean sea background theme in `src/index.css`
    - Deep ocean blue background color/gradient on `body` or root element
    - Shadcn CSS variable overrides for the Pantheon color palette (blues, golds, off-whites)
    - _Requirements: 9.1, 9.2, 9.4_

  - [x] 6.4 Update `src/main.tsx` to mount `RouterProvider` with the router instance
    - _Requirements: 1.1_

- [x] 7. Implement static data correctness tests
  - [x] 7.1 Write property test for game mode col === 0 (Property 7)
    - **Property 7: Game mode sprites always use column 0**
    - **Validates: Requirements 11.3**
    - File: `src/data/powers.test.ts`

  - [x] 7.2 Write property test for matchup IDs exist in POWERS (Property 8)
    - **Property 8: All matchup power IDs exist in POWERS**
    - **Validates: Requirements 10.3**
    - File: `src/data/powers.test.ts`

- [x] 8. Implement Selection Screen (`src/routes/index.tsx`)
  - Four Shadcn `Button` components: "Pick One Power", "Pick Two Powers", "Random Matchup", "Others"
  - Box art (`/img/box.webp`) visible on desktop only (`hidden md:block`), hidden on mobile
  - "Pick One Power" → calls `pickOne`, navigates to `/result?mode=one&ids={id}`
  - "Pick Two Powers" → calls `pickTwo`, navigates to `/result?mode=two&ids={id1},{id2}`
  - "Random Matchup" → calls `pickMatchup`; if null shows inline error, else navigates to `/result?mode=matchup&ids={id1},{id2}`
  - "Others" → navigates to `/others`
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 3.1, 3.2, 4.1, 4.2, 5.1, 5.2, 5.3_

- [x] 9. Implement Result Screen (`src/routes/result.tsx`)
  - Read `mode` and `ids` from URL search params; redirect to `/` if invalid or power IDs not found
  - Render 1 or 2 `PowerCard` components
  - Desktop 2-card layout: side-by-side flex
  - Mobile 2-card layout: Shadcn `Carousel` (Embla) with dot indicators
  - "Re-randomize" button: re-runs same mode with current active expansions, replaces search params
  - "Back" button: navigates to `/`
  - _Requirements: 3.2, 4.2, 4.3, 4.4, 7.1, 7.2, 7.3, 7.4, 8.3, 8.4_

- [x] 10. Checkpoint — Ensure all tests pass
  - Run `npx vitest --run` and confirm all tests pass. Ask the user if questions arise.

- [x] 11. Implement Settings Screen (`src/routes/settings.tsx`)
  - List all five expansions, each row: expansion image thumbnail + name + Shadcn `Checkbox` + "View Gods" link → `/expansion/$id`
  - Reads/writes active expansions via `useExpansions` hook
  - Warning banner + disabled back button when zero expansions selected
  - Back button → `/`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9_

- [ ] 12. Implement Expansion God List Screen (`src/routes/expansion.$id.tsx`)
  - Simple list of god names for the given expansion ID
  - Back button → `/settings`
  - _Requirements: 2.7_

- [ ] 13. Implement Gods List Screen (`src/routes/gods.tsx`)
  - Grid of thumbnail cards (SpriteImage + name) for all powers from active expansions
  - Filter/group by expansion (Shadcn Tabs or filter bar)
  - Clicking a power navigates to `/result?mode=one&ids={power.id}`
  - Back button → `/`
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

- [ ] 14. Implement Game Modes screens
  - [ ] 14.1 Implement `src/routes/game-modes.tsx`
    - List all `GAME_MODES` from active expansions; each entry shows name + `SpriteImage` thumbnail (col 0)
    - Clicking navigates to `/game-modes/$id`
    - Back button → `/`
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.7_

  - [ ] 14.2 Implement `src/routes/game-modes.$id.tsx`
    - Shows the game mode rule card at full/near-full size using `SpriteImage`
    - Back button → `/game-modes`
    - _Requirements: 14.5, 14.6_

- [ ] 15. Implement shareable result links
  - Add "Share" button to Result Screen
  - Use Web Share API (`navigator.share`) if available, fall back to `navigator.clipboard.writeText`
  - Show brief "Link copied!" confirmation after sharing
  - Ensure result screen resolves power IDs from URL params regardless of active expansions
  - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [ ] 16. Mobile responsiveness and touch targets
  - Audit all interactive elements to ensure minimum 44×44 CSS pixel tap targets
  - Verify layout renders correctly from 320px to 2560px viewport widths
  - _Requirements: 8.1, 8.2_

- [ ] 17. Integration and unit tests (≥80% branch coverage, Testing Trophy approach)
  - Testing philosophy: mostly integration tests using React Testing Library + `@testing-library/user-event`, simulating real user flows. Unit tests only for pure logic modules.
  - Configure `@vitest/coverage-v8` with `branches: 80` threshold in `vitest.config.ts`
  - [ ] 17.1 Unit tests for pure logic (`src/lib/*.test.ts`)
    - `randomizer.test.ts`: `pickOne`, `pickTwo`, `pickMatchup` edge cases + property-based tests (Properties 1–4)
    - `storage.test.ts`: `loadExpansions` default, saved value, `SecurityError` fallback + property-based round-trip (Property 5)
    - `sprite.test.ts`: `getSpriteStyle` cell calculation + property-based test (Property 6)
    - `powers.test.ts`: static data integrity — matchup IDs exist, game mode col=0, BGA slugs (Properties 7–9)
  - [ ] 17.2 Integration tests for Selection Screen (`src/routes/index.test.tsx`)
    - User sees 4 buttons; "Random Matchup" is disabled when no valid matchups for active expansions
    - User clicks "Pick One Power" → navigates to result screen
    - User clicks "Pick Two Powers" → navigates to result screen
    - User clicks "Others" → navigates to `/others`
  - [ ] 17.3 Integration tests for Result Screen (`src/routes/result.test.tsx`)
    - User sees single PowerCard when `mode=one`
    - User sees Carousel on mobile viewport when `mode=two`
    - User sees side-by-side layout on desktop when `mode=two`
    - User opens shared URL → sees correct powers regardless of active expansions
    - User clicks "Share" → confirmation shown (Web Share API and clipboard fallback)
    - User clicks "Re-randomize" → new result shown
    - User clicks "Back" → returns to home
    - Invalid URL params → redirected to home
  - [ ] 17.4 Integration tests for PowerCard (`src/components/PowerCard.test.tsx`)
    - User sees sprite on front face by default
    - User clicks card → back face with name and BGA link is shown
    - User clicks back face → front face is shown again
    - User clicks "Full Strategy" link → card does not flip
    - Sprite load error → power name fallback is shown
  - [ ] 17.5 Integration tests for Settings Screen (`src/routes/settings.test.tsx`)
    - User sees all 5 expansions with toggles
    - User toggles an expansion → change persists in localStorage
    - User deselects all expansions → back button is disabled with warning
    - User clicks "View Gods" link → navigates to expansion god list
  - [ ] 17.6 Integration tests for Others Screen (`src/routes/others.test.tsx`)
    - User sees 3 buttons: Browse Gods, Game Modes, Settings
    - Each button navigates to the correct route
    - Back button returns to home
  - [ ] 17.7 Integration tests for Gods List and Expansion God List (`src/routes/gods.test.tsx`, `src/routes/expansion.test.tsx`)
    - Gods list shows only powers from active expansions
    - User clicks a god → navigates to result screen
    - Expansion god list shows god names as links to result screen
  - [ ] 17.8 Integration tests for Game Modes screens (`src/routes/game-modes.test.tsx`)
    - Game modes list shows only modes from active expansions
    - User clicks a game mode → navigates to detail screen with full-size rule card
    - Back button on detail screen returns to list
  - [ ] 17.9 Run coverage report and verify ≥80% branch coverage
    - Run `npx vitest --run --coverage`
    - Fix any branches below threshold before marking complete

- [ ] 18. Final checkpoint — Ensure all tests pass
  - Run `npx vitest --run` and confirm all tests pass. Ask the user if questions arise.

- [ ] 19. Update README
  - Write a clear project description explaining what the app is and why it exists
  - Document all main features: randomization modes, Browse Gods, Game Modes, Settings, shareable links
  - Add getting started section: prerequisites, install, dev server, build, tests
  - List the expansion sets supported
  - Add a brief tech stack section

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with a minimum of 100 iterations per property
- Each property test file must include a comment: `// Feature: santorini-power-randomizer, Property N: <title>`
- The design document uses TypeScript throughout — all implementation is TypeScript
