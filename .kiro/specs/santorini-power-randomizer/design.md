# Design Document: Santorini Power Randomizer

## Overview

The Santorini Power Randomizer is a mobile-first single-page application that helps players randomly select god powers before a game of Santorini (Pantheon edition). It supports three randomization modes (single power, two powers, curated matchup), a manual browsing mode, and a game modes reference screen. The visual theme mirrors the Pantheon edition box art: deep Aegean blues, warm golds, and off-white tones.

The app is built on **Vite + React 19 + TypeScript**, uses **TanStack Router** for client-side routing, and **Shadcn/ui** (Radix primitives + Tailwind CSS) for the component library. Power imagery is served from local sprite sheets in `/public/img/`. All state that must survive page reloads (active expansions) is persisted to `localStorage`.

---

## Architecture

### High-Level Structure

```
src/
├── data/
│   └── powers.ts          # Static data: POWERS, GAME_MODES, EXPANSIONS, MATCHUPS, SPRITE_GRID
├── lib/
│   ├── randomizer.ts      # Pure randomization logic
│   ├── storage.ts         # localStorage read/write helpers
│   └── sprite.ts          # CSS background-position calculation for sprite sheets
├── hooks/
│   └── useExpansions.ts   # Reads/writes active expansions from localStorage
├── components/
│   ├── PowerCard.tsx      # Flippable card (front: sprite, back: name + desc + BGA link)
│   ├── SpriteImage.tsx    # Renders a single cell from a sprite sheet
│   └── OthersMenu.tsx     # (removed — replaced by /others route)
├── routes/
│   ├── __root.tsx         # Root layout (background, title image header)
│   ├── index.tsx          # Selection Screen
│   ├── others.tsx         # Others Screen (Browse Gods / Game Modes / Settings buttons)
│   ├── result.tsx         # Result Screen (1 or 2 power cards)
│   ├── settings.tsx       # Settings Screen
│   ├── gods.tsx           # Gods List Screen
│   ├── expansion.$id.tsx  # Expansion God List (linked from Settings)
│   ├── game-modes.tsx     # Game Modes Screen
│   └── game-modes.$id.tsx # Game Mode Detail Screen
├── router.ts              # TanStack Router instance
└── main.tsx               # App entry point
```

### Routing

TanStack Router is used with file-based route definitions. All routes are client-side; no server rendering is required.

| Path | Screen |
|---|---|
| `/` | Selection Screen |
| `/others` | Others Screen (Browse Gods, Game Modes, Settings buttons) |
| `/result` | Result Screen (receives mode + selected power IDs via search params) |
| `/settings` | Settings Screen |
| `/gods` | Gods List Screen |
| `/expansion/$id` | Expansion God List |
| `/game-modes` | Game Modes Screen |
| `/game-modes/$id` | Game Mode Detail Screen |

Result state is passed via URL search params (`?mode=one&ids=apollo` or `?mode=two&ids=apollo,artemis`) so the result screen is deep-linkable and re-randomize can simply replace the search params.

### State Management

- **Active expansions**: stored in `localStorage` under key `santorini-active-expansions`. Read on mount via `useExpansions` hook; written on every toggle.
- **No global state store** is needed — all other state is either URL-derived (result screen) or local component state.

---

## Components and Interfaces

### SpriteImage

Renders a single cell from a sprite sheet using CSS `background-image` + `background-position` + `background-size`.

```ts
interface SpriteImageProps {
  expansion: ExpansionId;
  row: number;
  col: number;
  /** Display size in CSS pixels (the component is always square) */
  size?: number;
  alt: string;
  className?: string;
}
```

The sprite sheet dimensions are known from `SPRITE_GRID`. The CSS calculation is:

```
background-size: (cols * size)px (rows * size)px
background-position: -(col * size)px -(row * size)px
```

### PowerCard

A CSS 3D flip card. Front face shows the sprite; back face shows name, description, and BGA link.

```ts
interface PowerCardProps {
  power: Power;
  /** If true, card starts face-down (back visible) */
  initiallyFlipped?: boolean;
}
```

Internal state: `flipped: boolean`. Toggle on click/tap anywhere on the card. The flip uses a CSS `transform: rotateY(180deg)` transition on a `.card-inner` wrapper with `transform-style: preserve-3d`. Front and back are absolutely positioned children with `backface-visibility: hidden`.

The back face uses a background color and border matching the stone/parchment border color of the card sprites (approximately `#c8a96e` warm gold/tan). The power name on the back face is styled as a heading — clicking it (or anywhere on the back face) flips back to the front. The "Full Strategy" link uses `e.stopPropagation()` so tapping it opens the BGA page without triggering the flip.

BGA link: `https://en.doc.boardgamearena.com/SantoriniPower${power.bgaSlug}`

### Others Screen (`/others`)

- Same visual style as the Selection Screen (title image header, Aegean background).
- Three Shadcn `Button` components: "Browse Gods" → `/gods`, "Game Modes" → `/game-modes`, "Settings" → `/settings`.
- Back button → `/`.

### Selection Screen (`/`)

- Title image (`/img/title.png`) at top, full width, aspect-ratio preserved.
- Box art (`/img/box.webp`) below title, hidden on mobile (`hidden md:block`).
- Four Shadcn `Button` components: "Pick One Power", "Pick Two Powers", "Random Matchup", "Others".
- "Others" → navigates to `/others`.
- Buttons trigger randomization logic then navigate to `/result` with appropriate search params.
- If "Random Matchup" finds no valid matchups for active expansions, shows an inline error message instead of navigating.

### Settings Screen (`/settings`)

- List of five expansions, each row containing:
  - Expansion image thumbnail (from `/img/`)
  - Expansion name
  - Shadcn `Checkbox` for toggle
  - "View Gods" link → `/expansion/$id`
- Back button → `/`
- Warning banner + disabled back button when zero expansions are selected.
- Writes to `localStorage` on every checkbox change.

### Result Screen (`/result`)

- Reads `mode` and `ids` from URL search params.
- Renders 1 or 2 `PowerCard` components.
- Desktop (2 cards): side-by-side flex layout.
- Mobile (2 cards): Shadcn `Carousel` (Embla) with dot indicators.
- "Re-randomize" button: re-runs the same mode with current active expansions, replaces search params.
- "Back" button: navigates to `/`.

### Gods List Screen (`/gods`)

- Displays all powers from active expansions as a grid of thumbnail cards (sprite + name).
- Shadcn `Tabs` or a filter bar to group/filter by expansion.
- Clicking a power navigates to `/result?mode=one&ids={power.id}`.
- Back button → `/`.

### Expansion God List (`/expansion/$id`)

- Simple list of god names for the given expansion.
- Linked from Settings Screen.
- Back button → `/settings`.

### Game Modes Screen (`/game-modes`)

- Lists all `GAME_MODES` from active expansions.
- Each entry: game mode name + sprite thumbnail (col 0 of the expansion sheet).
- Clicking navigates to `/game-modes/$id`.
- Back button → `/`.

### Game Mode Detail Screen (`/game-modes/$id`)

- Shows the game mode rule card at full (or near-full) size.
- Back button → `/game-modes`.

---

## Data Models

All data models are already defined in `src/data/powers.ts`. The design relies on them directly.

```ts
// Already in powers.ts — reproduced here for reference
type ExpansionId = "base" | "chaos" | "olympus" | "poseidon" | "underworld";

interface Power {
  id: string;
  name: string;
  expansion: ExpansionId;
  row: number;
  col: number;           // always >= 1 for god powers
  description: string;
  bgaSlug: string;
}

interface GameMode {
  id: string;
  name: string;
  expansion: ExpansionId;
  row: number;
  col: 0;               // always column 0
}
```

### Randomizer Logic (`src/lib/randomizer.ts`)

```ts
/** Returns a single random power from the active expansion pool */
function pickOne(powers: Power[], activeExpansions: ExpansionId[]): Power

/** Returns two distinct random powers from the active expansion pool */
function pickTwo(powers: Power[], activeExpansions: ExpansionId[]): [Power, Power]

/** Returns a random matchup where both powers are in the active expansion pool */
function pickMatchup(
  powers: Power[],
  matchups: [string, string][],
  activeExpansions: ExpansionId[]
): [Power, Power] | null   // null = no valid matchups
```

### Storage (`src/lib/storage.ts`)

```ts
const STORAGE_KEY = "santorini-active-expansions";

function loadExpansions(): ExpansionId[]   // returns ["base"] if key absent
function saveExpansions(ids: ExpansionId[]): void
```

### Sprite Calculation (`src/lib/sprite.ts`)

```ts
interface SpriteStyle {
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition: string;
  width: string;
  height: string;
}

function getSpriteStyle(
  expansion: ExpansionId,
  row: number,
  col: number,
  sizePx: number
): SpriteStyle
```

### URL Search Params Schema

```ts
// /result search params
interface ResultSearchParams {
  mode: "one" | "two" | "matchup";
  ids: string;   // comma-separated power IDs, e.g. "apollo" or "apollo,artemis"
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Single pick always returns a power from active expansions

*For any* non-empty set of active expansions and the full power list, `pickOne` must return a power whose `expansion` field is in the active expansions set.

**Validates: Requirements 3.1**

---

### Property 2: Two-power pick returns distinct powers from active expansions

*For any* active expansion set with at least two available powers, `pickTwo` must return exactly two powers that are (a) both from the active expansion pool and (b) have different `id` values.

**Validates: Requirements 4.1**

---

### Property 3: Matchup pick returns a valid curated pair from active expansions

*For any* active expansion set for which at least one matchup has both powers in the pool, `pickMatchup` must return a pair `[p1, p2]` such that `[p1.id, p2.id]` (or its reverse) appears in `MATCHUPS`, and both powers belong to the active expansion pool.

**Validates: Requirements 5.1**

---

### Property 4: No valid matchups returns null

*For any* active expansion set for which no matchup has both powers in the pool, `pickMatchup` must return `null`.

**Validates: Requirements 5.3**

---

### Property 5: Expansion persistence round-trip

*For any* array of `ExpansionId` values, saving it with `saveExpansions` and then loading it with `loadExpansions` must produce an array with the same elements (order-independent).

**Validates: Requirements 1.7, 2.6**

---

### Property 6: Sprite style covers the correct cell

*For any* valid `(expansion, row, col, sizePx)` combination, the `backgroundPosition` returned by `getSpriteStyle` must equal `-(col * sizePx)px -(row * sizePx)px`, and `backgroundSize` must equal `(cols * sizePx)px (rows * sizePx)px` where `cols` and `rows` come from `SPRITE_GRID[expansion]`.

**Validates: Requirements 11.1, 11.2, 11.4**

---

### Property 7: Game mode sprites always use column 0

*For any* `GameMode` in `GAME_MODES`, its `col` field must equal `0`.

**Validates: Requirements 11.3**

---

### Property 8: All matchup power IDs exist in POWERS

*For any* entry in `MATCHUPS`, both referenced power IDs must correspond to an entry in `POWERS`.

**Validates: Requirements 10.3**

---

### Property 9: BGA link contains the correct slug

*For any* `Power`, the BGA URL constructed as `` `https://en.doc.boardgamearena.com/SantoriniPower${power.bgaSlug}` `` must contain the power's `bgaSlug` as a suffix.

**Validates: Requirements 6.5**

---

## Error Handling

| Scenario | Handling |
|---|---|
| Sprite image fails to load | `SpriteImage` falls back to rendering `power.name` as text (Requirement 6.3) |
| All expansions deselected | Settings Screen shows warning banner; back navigation is disabled until ≥1 expansion is selected (Requirement 2.9) |
| No matchups for active expansions | Selection Screen shows inline error message; no navigation occurs (Requirement 5.3) |
| Invalid/missing URL search params on `/result` | Redirect to `/` |
| `localStorage` unavailable (private browsing) | `storage.ts` catches `SecurityError` and falls back to in-memory defaults |
| Power ID in URL not found in POWERS | Redirect to `/` with a toast notification |

---

## Testing Strategy

### Testing Trophy Approach

This project follows the [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) philosophy: **write tests, not too many, mostly integration**.

The priority order from highest ROI to lowest:

1. **Static** — TypeScript + ESLint catch type errors and code issues at author time (already configured)
2. **Integration** — The bulk of tests. Render full screens with React Testing Library, simulate real user interactions with `@testing-library/user-event`, and assert on what the user sees. No mocking of internal implementation details.
3. **Unit** — Only for pure logic with no UI: `randomizer.ts`, `storage.ts`, `sprite.ts`
4. **End-to-end** — Out of scope for this project

### Test Libraries

- **Vitest** — test runner
- **@testing-library/react** — render components and query the DOM as a user would
- **@testing-library/user-event** — simulate real user interactions (click, type, etc.)
- **@testing-library/jest-dom** — custom matchers (`toBeDisabled`, `toBeInTheDocument`, etc.)
- **fast-check** — property-based testing for pure logic modules
- **@vitest/coverage-v8** — branch coverage reporting (threshold: 80%)

### Integration Tests (majority)

Integration tests render full route components with a real router context and assert on visible UI. They test **user flows**, not implementation details.

Each test file corresponds to a screen or user flow:

| Test file | What it covers |
|---|---|
| `src/routes/index.test.tsx` | Selection Screen flows: button states, navigation, disabled matchup |
| `src/routes/result.test.tsx` | Result Screen: single card, two cards, carousel, share, re-randomize, back, shared URL |
| `src/routes/others.test.tsx` | Others Screen: navigation to each sub-screen |
| `src/routes/settings.test.tsx` | Settings: toggle expansions, localStorage persistence, back guard |
| `src/routes/gods.test.tsx` | Gods List: filtering, navigation to result |
| `src/routes/expansion.test.tsx` | Expansion God List: god names, links to result |
| `src/routes/game-modes.test.tsx` | Game Modes list and detail navigation |
| `src/components/PowerCard.test.tsx` | Card flip, BGA link, fallback |

Example pattern:
```tsx
// Render the full screen, interact as a user would
it('disables Random Matchup when no valid matchups for active expansions', async () => {
  // set localStorage to only have 'olympus' active (no base-only matchups)
  renderWithRouter(<SelectionScreen />)
  expect(screen.getByRole('button', { name: /random matchup/i })).toBeDisabled()
})
```

### Unit Tests (pure logic only)

| Test file | What it covers |
|---|---|
| `src/lib/randomizer.test.ts` | `pickOne`, `pickTwo`, `pickMatchup` — including property-based tests |
| `src/lib/storage.test.ts` | `loadExpansions`, `saveExpansions` — including property-based tests |
| `src/lib/sprite.test.ts` | `getSpriteStyle` — including property-based tests |
| `src/data/powers.test.ts` | Static data integrity: matchup IDs exist, game mode col=0, BGA slugs |

### Property-Based Tests

Library: **fast-check** (TypeScript-native, works with Vitest). Each property-based test runs a minimum of **100 iterations** and is tagged with a comment referencing the design property:

```ts
// Feature: santorini-power-randomizer, Property 1: Single pick always returns a power from active expansions
```

### Test Configuration

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      branches: 80,
    },
  },
})
```

```ts
// src/test/setup.ts
import '@testing-library/jest-dom'
```

Run tests once (no watch mode):
```
npx vitest --run
npx vitest --run --coverage
```
