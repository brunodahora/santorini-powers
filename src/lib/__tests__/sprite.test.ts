import * as fc from "fast-check";
import { describe, it, expect } from "vitest";

import { SPRITE_GRID } from "../../data/powers";
import type { ExpansionId } from "../../data/powers";
import { getSpriteStyle } from "../sprite";

const EXPANSION_IDS: ExpansionId[] = [
  "base",
  "chaos",
  "olympus",
  "poseidon",
  "underworld",
];

describe("Given the base expansion, row 0, col 1, size 100", () => {
  it("when getSpriteStyle is called, then backgroundPosition is -100px 0px and backgroundSize is 900px 400px", () => {
    const style = getSpriteStyle("base", 0, 1, 100, 100);
    // base grid is 4 rows × 9 cols; row 0 → -0px which JS renders as -0px
    expect(style.backgroundPosition).toBe("-100px -0px");
    expect(style.backgroundSize).toBe("900px 400px");
    expect(style.width).toBe("100px");
    expect(style.height).toBe("100px");
  });
});

describe("Given the chaos expansion, row 2, col 3, size 80", () => {
  it("when getSpriteStyle is called, then backgroundPosition is -240px -160px and backgroundSize is 560px 240px", () => {
    const style = getSpriteStyle("chaos", 2, 3, 80, 80);
    // chaos grid is 3 rows × 7 cols
    expect(style.backgroundPosition).toBe("-240px -160px");
    expect(style.backgroundSize).toBe("560px 240px");
    expect(style.width).toBe("80px");
    expect(style.height).toBe("80px");
  });
});

describe("Given col 0 (game mode column), row 1, size 50 for olympus", () => {
  it("when getSpriteStyle is called, then backgroundPosition is -0px -50px", () => {
    const style = getSpriteStyle("olympus", 1, 0, 50, 50);
    expect(style.backgroundPosition).toBe("-0px -50px");
  });
});

describe("Given a non-square cell (different width and height)", () => {
  it("when getSpriteStyle is called with width 120 and height 80, then dimensions reflect the asymmetric size", () => {
    const style = getSpriteStyle("base", 1, 2, 120, 80);
    // base grid is 4 rows × 9 cols
    expect(style.backgroundPosition).toBe("-240px -80px");
    expect(style.backgroundSize).toBe("1080px 320px");
    expect(style.width).toBe("120px");
    expect(style.height).toBe("80px");
  });
});

// Feature: santorini-power-randomizer, Property 6: Sprite style covers the correct cell
describe("Given a valid expansion, row, col, and size", () => {
  it("when getSpriteStyle is called, then backgroundPosition and backgroundSize cover the correct cell", () => {
    const arbExpansion = fc.constantFrom(...EXPANSION_IDS);

    const arbParams = arbExpansion.chain((expansion) => {
      const { rows, cols } = SPRITE_GRID[expansion];
      return fc.record({
        expansion: fc.constant(expansion),
        row: fc.integer({ min: 0, max: rows - 1 }),
        col: fc.integer({ min: 0, max: cols - 1 }),
        sizePx: fc.integer({ min: 1, max: 200 }),
      });
    });

    fc.assert(
      fc.property(arbParams, ({ expansion, row, col, sizePx }) => {
        const { rows, cols } = SPRITE_GRID[expansion];
        const style = getSpriteStyle(expansion, row, col, sizePx, sizePx);

        expect(style.backgroundPosition).toBe(
          `-${col * sizePx}px -${row * sizePx}px`,
        );
        expect(style.backgroundSize).toBe(
          `${cols * sizePx}px ${rows * sizePx}px`,
        );
        expect(style.width).toBe(`${sizePx}px`);
        expect(style.height).toBe(`${sizePx}px`);
      }),
      { numRuns: 100 },
    );
  });
});
