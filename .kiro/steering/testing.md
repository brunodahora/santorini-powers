# Testing Guidelines

## Philosophy: Testing Trophy

This project follows the [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) approach — **write tests, not too many, mostly integration**.

Priority order (highest ROI first):

1. **Static** — TypeScript + ESLint (already configured, runs at author time)
2. **Integration** — The bulk of tests. Render full screens, simulate real user interactions, assert on visible output.
3. **Unit** — Only for pure logic with no UI: `randomizer.ts`, `storage.ts`, `sprite.ts`
4. **E2E** — Out of scope

## Libraries

| Library | Purpose |
|---|---|
| `vitest` | Test runner |
| `@testing-library/react` | Render components and query the DOM |
| `@testing-library/user-event` | Simulate real user interactions |
| `@testing-library/jest-dom` | Custom matchers (`toBeDisabled`, `toBeInTheDocument`, etc.) |
| `fast-check` | Property-based testing for pure logic |
| `@vitest/coverage-v8` | Branch coverage reporting (threshold: 80%) |

## Configuration

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

Run tests:
```bash
npx vitest --run             # single run
npx vitest --run --coverage  # with branch coverage report
```

## Integration Tests

Integration tests are the most valuable. They render full route components with a real router context and assert on what the user sees and can do.

### Rules
- **Test behavior, not implementation.** Never assert on component state, internal variables, or CSS class names.
- **Query by role or text**, not by test IDs. Prefer `getByRole`, `getByText`, `getByLabelText`.
- **Use `userEvent` over `fireEvent`** — it simulates real browser interactions including focus, pointer events, and keyboard.
- **Never mock internal modules** (randomizer, storage, sprite). Only mock browser APIs that don't exist in jsdom (`navigator.share`, `navigator.clipboard`).
- **One test file per screen/route**, named `<route>.test.tsx`.
- **Write test descriptions in Gherkin format** using `Given / When / Then` as the description string. Use `describe` for the `Given` context and `it` for the `When / Then` assertion.

### Gherkin Format

All test descriptions must follow Gherkin-style language:

- `describe` blocks → `Given <context>`
- `it` blocks → `when <action>, then <expected outcome>`

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from '@tanstack/react-router'

function renderRoute(initialPath: string) {
  const router = createMemoryRouter(routeTree, { initialEntries: [initialPath] })
  return render(<RouterProvider router={router} />)
}

describe('Given only the Olympus expansion is active', () => {
  beforeEach(() => {
    localStorage.setItem('santorini-active-expansions', JSON.stringify(['olympus']))
  })

  it('when the selection screen loads, then the Random Matchup button is disabled', async () => {
    renderRoute('/')
    expect(screen.getByRole('button', { name: /random matchup/i })).toBeDisabled()
  })
})

describe('Given the selection screen is loaded with base expansion active', () => {
  it('when the user clicks Pick One Power, then they are taken to the result screen', async () => {
    const user = userEvent.setup()
    renderRoute('/')
    await user.click(screen.getByRole('button', { name: /pick one power/i }))
    expect(screen.getByText(/re-randomize/i)).toBeInTheDocument()
  })
})
```

For unit tests, use the same pattern adapted to pure functions:

```ts
describe('Given a pool of base expansion powers', () => {
  it('when pickOne is called, then it returns a power from the base expansion', () => {
    const result = pickOne(POWERS, ['base'])
    expect(result.expansion).toBe('base')
  })
})
```

### What to test per screen

| Screen | Key behaviors to test |
|---|---|
| Selection Screen | Button states (disabled matchup), navigation on click, Others button |
| Result Screen | Single card vs carousel, share button (both API paths), re-randomize, back, shared URL |
| PowerCard | Front/back flip on click, BGA link doesn't flip, sprite fallback |
| Settings Screen | Toggle persists to localStorage, back disabled when all off, View Gods link |
| Others Screen | Each button navigates to correct route, back button |
| Gods List | Shows only active expansion powers, click navigates to result |
| Expansion God List | God names are links to result screen |
| Game Modes | List shows active modes, click navigates to detail, back button |

## Unit Tests

Write unit tests only for pure functions in `src/lib/`. These have no React dependencies and test logic in isolation.

### Rules
- Test edge cases: empty pools, single-item pools, exact boundary conditions
- Use `beforeEach` to reset `localStorage` between tests
- Each property-based test must include a comment identifying the property:

```ts
// Feature: santorini-power-randomizer, Property 1: Single pick always returns a power from active expansions
fc.assert(fc.property(
  fc.subarray(EXPANSION_IDS, { minLength: 1 }),
  (activeExpansions) => {
    const result = pickOne(POWERS, activeExpansions)
    return activeExpansions.includes(result.expansion)
  }
), { numRuns: 100 })
```

### Property-based tests required

| Property | File | Description |
|---|---|---|
| P1 | `randomizer.test.ts` | `pickOne` always returns a power from active expansions |
| P2 | `randomizer.test.ts` | `pickTwo` returns 2 distinct powers from active expansions |
| P3 | `randomizer.test.ts` | `pickMatchup` returns a valid curated pair from active expansions |
| P4 | `randomizer.test.ts` | `pickMatchup` returns null when no valid matchups exist |
| P5 | `storage.test.ts` | `saveExpansions` + `loadExpansions` round-trip preserves values |
| P6 | `sprite.test.ts` | `getSpriteStyle` computes correct `backgroundPosition` and `backgroundSize` |
| P7 | `powers.test.ts` | Every `GameMode` has `col === 0` |
| P8 | `powers.test.ts` | Every `Matchup` references power IDs that exist in `POWERS` |
| P9 | `powers.test.ts` | Every `Power.bgaSlug` produces a valid BGA URL suffix |

## Coverage

Run `npx vitest --run --coverage` to check branch coverage. The threshold is **80% branches**.

If coverage is below threshold:
1. Identify uncovered branches in the report
2. Add integration tests that exercise those user flows — do not add unit tests just to hit numbers
3. If a branch is truly unreachable, document why rather than deleting it

## What NOT to test

- Tailwind CSS classes or visual styling
- TanStack Router internals
- Shadcn component internals
- The contents of `src/data/powers.ts` beyond the static integrity checks in `powers.test.ts`
