import * as fc from "fast-check";
import { describe, it } from "vitest";

import { POWERS, GAME_MODES, MATCHUPS } from "../powers";

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
