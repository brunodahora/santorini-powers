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
