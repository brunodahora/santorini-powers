import * as fc from "fast-check";
import { describe, it, expect } from "vitest";

import { POWERS, MATCHUPS } from "../../data/powers";
import type { ExpansionId } from "../../data/powers";
import { pickOne, pickTwo, pickMatchup } from "../randomizer";

const EXPANSION_IDS: ExpansionId[] = [
  "base",
  "chaos",
  "olympus",
  "poseidon",
  "underworld",
];

// ── pickOne ──────────────────────────────────────────────────────────────────

describe("Given a pool of base expansion powers", () => {
  it("when pickOne is called, then it returns a power from the base expansion", () => {
    const result = pickOne(POWERS, ["base"]);
    expect(result.expansion).toBe("base");
  });
});

describe("Given includeSpecialConditions is false", () => {
  it("when pickOne is called, then it never returns a power with specialConditions", () => {
    for (let i = 0; i < 20; i++) {
      const result = pickOne(POWERS, EXPANSION_IDS, false, true);
      expect(result.specialConditions).toBe(false);
    }
  });
});

describe("Given includeDice is false", () => {
  it("when pickOne is called, then it never returns a power that requires dice", () => {
    for (let i = 0; i < 20; i++) {
      const result = pickOne(POWERS, EXPANSION_IDS, true, false);
      expect(result.dice).toBe(false);
    }
  });
});

// Feature: santorini-power-randomizer, Property 1: Single pick always returns a power from active expansions
describe("Given any non-empty set of active expansions", () => {
  it("when pickOne is called, then it always returns a power whose expansion is in the active set", () => {
    fc.assert(
      fc.property(
        fc.subarray(EXPANSION_IDS, { minLength: 1 }),
        (activeExpansions) => {
          const result = pickOne(POWERS, activeExpansions);
          expect(activeExpansions).toContain(result.expansion);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ── pickTwo ──────────────────────────────────────────────────────────────────

describe("Given a pool with at least two powers", () => {
  it("when pickTwo is called, then it returns two distinct powers", () => {
    const [a, b] = pickTwo(POWERS, ["base"]);
    expect(a.id).not.toBe(b.id);
  });
});

describe("Given includeDice is false", () => {
  it("when pickTwo is called, then neither returned power requires dice", () => {
    const [a, b] = pickTwo(POWERS, EXPANSION_IDS, true, false);
    expect(a.dice).toBe(false);
    expect(b.dice).toBe(false);
  });
});

describe("Given includeSpecialConditions is false", () => {
  it("when pickTwo is called, then neither returned power has specialConditions", () => {
    const [a, b] = pickTwo(POWERS, EXPANSION_IDS, false, true);
    expect(a.specialConditions).toBe(false);
    expect(b.specialConditions).toBe(false);
  });
});

// Feature: santorini-power-randomizer, Property 2: Two-power pick returns distinct powers from active expansions
describe("Given any active expansion set with at least two available powers", () => {
  it("when pickTwo is called, then it returns 2 distinct powers both from the active expansion pool", () => {
    // All individual expansions have >= 2 powers, so any single expansion is valid
    fc.assert(
      fc.property(
        fc.subarray(EXPANSION_IDS, { minLength: 1 }),
        (activeExpansions) => {
          const pool = POWERS.filter((p) =>
            activeExpansions.includes(p.expansion),
          );
          // Only run the assertion when there are at least 2 powers in the pool
          fc.pre(pool.length >= 2);

          const [a, b] = pickTwo(POWERS, activeExpansions);
          expect(a.id).not.toBe(b.id);
          expect(activeExpansions).toContain(a.expansion);
          expect(activeExpansions).toContain(b.expansion);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ── pickMatchup ───────────────────────────────────────────────────────────────

describe("Given the base expansion is active (which has valid matchups)", () => {
  it("when pickMatchup is called, then it returns a non-null pair", () => {
    const result = pickMatchup(POWERS, MATCHUPS, ["base"]);
    expect(result).not.toBeNull();
  });

  it("when pickMatchup is called, then both returned powers are from the base expansion", () => {
    // All base-only matchups use base powers — spot-check a few runs
    for (let i = 0; i < 10; i++) {
      const result = pickMatchup(POWERS, MATCHUPS, ["base"]);
      expect(result).not.toBeNull();
      const [p1, p2] = result!;
      expect(p1.expansion).toBe("base");
      expect(p2.expansion).toBe("base");
    }
  });
});

describe("Given includeSpecialConditions is false and a matchup contains a specialConditions power", () => {
  it("when pickMatchup is called, then it does not return that matchup", () => {
    // charybdis has specialConditions: true — any matchup containing it should be excluded
    for (let i = 0; i < 20; i++) {
      const result = pickMatchup(POWERS, MATCHUPS, EXPANSION_IDS, false, true);
      if (result !== null) {
        const [p1, p2] = result;
        expect(p1.specialConditions).toBe(false);
        expect(p2.specialConditions).toBe(false);
      }
    }
  });
});

// Feature: santorini-power-randomizer, Property 3: Matchup pick returns a valid curated pair from active expansions
describe("Given any active expansion set that has at least one valid matchup", () => {
  it("when pickMatchup is called, then it returns a pair whose IDs appear in MATCHUPS and both powers are from active expansions", () => {
    fc.assert(
      fc.property(
        fc.subarray(EXPANSION_IDS, { minLength: 1 }),
        (activeExpansions) => {
          const validMatchups = MATCHUPS.filter(
            (m) =>
              activeExpansions.includes(m.expansions[0]) &&
              activeExpansions.includes(m.expansions[1]),
          );
          fc.pre(validMatchups.length > 0);

          const result = pickMatchup(POWERS, MATCHUPS, activeExpansions);
          expect(result).not.toBeNull();

          const [p1, p2] = result!;
          expect(activeExpansions).toContain(p1.expansion);
          expect(activeExpansions).toContain(p2.expansion);

          const matchFound = MATCHUPS.some(
            (m) =>
              (m.ids[0] === p1.id && m.ids[1] === p2.id) ||
              (m.ids[0] === p2.id && m.ids[1] === p1.id),
          );
          expect(matchFound).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// Feature: santorini-power-randomizer, Property 4: No valid matchups returns null
describe("Given an active expansion set with no valid matchups", () => {
  it("when pickMatchup is called, then it returns null", () => {
    // "olympus" alone has no matchups in MATCHUPS that use only olympus powers
    const olympusOnlyMatchups = MATCHUPS.filter(
      (m) => m.expansions[0] === "olympus" && m.expansions[1] === "olympus",
    );
    // Confirm our assumption: olympus has no self-contained matchups
    expect(olympusOnlyMatchups.length).toBe(0);

    const result = pickMatchup(POWERS, MATCHUPS, ["olympus"]);
    expect(result).toBeNull();
  });

  it("when pickMatchup is called with any expansion set that has no valid matchups, then it always returns null", () => {
    fc.assert(
      fc.property(
        fc.subarray(EXPANSION_IDS, { minLength: 1 }),
        (activeExpansions) => {
          const validMatchups = MATCHUPS.filter(
            (m) =>
              activeExpansions.includes(m.expansions[0]) &&
              activeExpansions.includes(m.expansions[1]),
          );
          fc.pre(validMatchups.length === 0);

          const result = pickMatchup(POWERS, MATCHUPS, activeExpansions);
          expect(result).toBeNull();
        },
      ),
      { numRuns: 100 },
    );
  });
});
