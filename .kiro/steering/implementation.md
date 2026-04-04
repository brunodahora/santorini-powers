# Implementation Guidelines

## Stack

- **Vite + React 19 + TypeScript** — no class components, use function components and hooks only
- **TanStack Router** — file-based routing under `src/routes/`; all navigation via `useNavigate` or `<Link>`, never `window.location`
- **Shadcn/ui + Tailwind CSS v4** — use Shadcn primitives (Button, Card, Carousel, Checkbox) before writing custom components
- **Embla Carousel** — via Shadcn's `carousel` component for mobile swipe between power cards

## Project Structure

```
src/
├── data/powers.ts        # Static data — do not modify at runtime
├── lib/                  # Pure logic, no React imports
│   ├── randomizer.ts
│   ├── storage.ts
│   └── sprite.ts
├── hooks/
│   └── useExpansions.ts  # Single source of truth for active expansions
├── components/           # Shared UI components
│   ├── PowerCard.tsx
│   └── SpriteImage.tsx
├── routes/               # One file per route
│   ├── __root.tsx
│   ├── index.tsx
│   ├── others.tsx
│   ├── result.tsx
│   ├── settings.tsx
│   ├── gods.tsx
│   ├── expansion.$id.tsx
│   ├── game-modes.tsx
│   └── game-modes.$id.tsx
└── test/
    └── setup.ts
```

## Key Rules

### Data
- `src/data/powers.ts` is the single source of truth for all powers, game modes, expansions, and matchups — never duplicate this data elsewhere
- The `Matchup` type has an `expansions` field — always use it to filter matchups, never re-derive expansion membership by looking up power IDs
- Power IDs in URLs are the `id` field from `POWERS` (e.g. `apollo`, `castor-pollux`, `poseidon-god`)

### Routing
- Result screen state is URL-encoded: `/result?mode=one&ids=apollo` or `/result?mode=two&ids=apollo,artemis`
- This makes results deep-linkable and shareable by design — never store result state in component state or context
- Always redirect to `/` when URL params are invalid or power IDs are not found in `POWERS`

### State
- Active expansions live in `localStorage` via `useExpansions` hook — this is the only persistent state
- Never pass active expansions as props through multiple levels; use the `useExpansions` hook directly in the component that needs it
- Default active expansions: `["base"]`

### Sprite Sheets
- Always use `getSpriteStyle` from `src/lib/sprite.ts` to compute CSS background properties — never hardcode pixel offsets
- Column 0 of every expansion sheet is reserved for game mode cards, never god powers
- `base_powers.webp` is 4×9; all other sheets are 3×7

### PowerCard
- Front face: sprite image only, no text overlay
- Back face: name + description + BGA strategy link (`https://en.doc.boardgamearena.com/SantoriniPower${power.bgaSlug}`)
- BGA link must use `e.stopPropagation()` to prevent the card from flipping when the link is clicked
- Back face background color matches the card sprite border: approximately `#c8a96e`

### Accessibility
- All interactive elements must have a minimum tap target of 44×44 CSS pixels
- Use semantic HTML — buttons for actions, links for navigation
- Images must have meaningful `alt` text; sprite fallback must render the power name as text

### Styling
- Global background: deep Aegean blue gradient/texture on `body`
- Color palette: deep ocean blues, warm golds (`#c8a96e`), off-whites
- Apply Shadcn CSS variable overrides in `src/index.css` to match the Pantheon palette
- Box art (`/img/box.webp`) is hidden on mobile (`hidden md:block`)

### Share Feature
- Use `navigator.share` (Web Share API) when available
- Fall back to `navigator.clipboard.writeText` when Web Share API is unavailable
- Show a brief "Link copied!" confirmation after either path
