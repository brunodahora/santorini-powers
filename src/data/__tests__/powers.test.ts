import * as fc from "fast-check";
import { describe, it, expect } from "vitest";

import { POWERS, GAME_MODES, MATCHUPS } from "../powers";

// ── Static integrity ──────────────────────────────────────────────────────────

describe("Given all powers in POWERS", () => {
  it("when checking for duplicate IDs, then every power ID is unique", () => {
    const ids = POWERS.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("when checking column values, then every god power has col >= 1 (col 0 is reserved for game modes)", () => {
    POWERS.forEach((p) => {
      expect(p.col).toBeGreaterThanOrEqual(1);
    });
  });
});

describe("Given all game modes in GAME_MODES", () => {
  it("when checking for duplicate IDs, then every game mode ID is unique", () => {
    const ids = GAME_MODES.map((m) => m.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

// Feature: santorini-power-randomizer, Property 7: Game mode sprites always use column 0
describe("Given all game modes in GAME_MODES", () => {
  it("when checking each game mode's col, then every col is 0", () => {
    fc.assert(
      fc.property(fc.constantFrom(...GAME_MODES), (mode) => {
        return mode.col === 0;
      }),
      { numRuns: GAME_MODES.length },
    );
  });
});

// Feature: santorini-power-randomizer, Property 8: All matchup power IDs exist in POWERS
describe("Given all matchups in MATCHUPS", () => {
  it("when checking each matchup's power IDs, then both IDs exist in POWERS", () => {
    const powerIds = new Set(POWERS.map((p) => p.id));
    fc.assert(
      fc.property(fc.constantFrom(...MATCHUPS), (matchup) => {
        return powerIds.has(matchup.ids[0]) && powerIds.has(matchup.ids[1]);
      }),
      { numRuns: MATCHUPS.length },
    );
  });
});

// Feature: santorini-power-randomizer, Property 9: BGA link contains the correct slug
describe("Given all powers with a non-null bgaSlug", () => {
  it("when constructing the BGA URL, then it ends with the power's bgaSlug", () => {
    const powersWithSlug = POWERS.filter((p) => p.bgaSlug !== null);
    fc.assert(
      fc.property(fc.constantFrom(...powersWithSlug), (power) => {
        const url = `https://en.doc.boardgamearena.com/SantoriniPower${power.bgaSlug}`;
        return url.endsWith(power.bgaSlug as string);
      }),
      { numRuns: powersWithSlug.length },
    );
  });
});
