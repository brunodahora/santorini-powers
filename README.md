# Santorini Power Randomizer

A mobile-friendly web app for randomly selecting god powers before a game of [Santorini](https://boardgamegeek.com/boardgame/194655/santorini) (Pantheon edition). Styled after the Pantheon box art — deep Aegean blues, warm golds, and off-whites.

## Features

- **Pick One Power** — randomly select a single god for split-screen or second-device play
- **Pick Two Powers** — randomly select two distinct gods at once for both players
- **Random Matchup** — pick from a curated list of balanced, interesting power pairings
- **Browse Gods** — manually browse and select any god from your active expansions
- **Game Modes** — browse and reference game mode rule cards from your expansions
- **Settings** — choose which expansion sets to include in the power pool
- **Shareable links** — every result screen has a unique URL you can share with your opponent

## Expansions Supported

- Base Powers
- Seasons of Chaos
- Soaring over Olympus
- Tides of Poseidon
- Hiding in the Underworld

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests (single pass)
npx vitest --run

# Run tests with branch coverage report
npx vitest --run --coverage
```

## Tech Stack

- **Vite + React 19 + TypeScript**
- **TanStack Router** — client-side routing with URL-encoded result state
- **Shadcn/ui + Tailwind CSS v4** — Button, Card, Carousel, Checkbox
- **Embla Carousel** — mobile swipe between power cards
- **Vitest + React Testing Library + fast-check** — Testing Trophy approach, ≥80% branch coverage
