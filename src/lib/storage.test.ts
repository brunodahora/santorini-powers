import { describe, it, expect, beforeEach } from "vitest";
import * as fc from "fast-check";
import { loadExpansions, saveExpansions } from "./storage";
import type { ExpansionId } from "../data/powers";

const EXPANSION_IDS: ExpansionId[] = [
  "base",
  "chaos",
  "olympus",
  "poseidon",
  "underworld",
];

beforeEach(() => {
  localStorage.clear();
});

describe("Given no saved expansions in localStorage", () => {
  it("when loadExpansions is called, then it returns the default ['base']", () => {
    const result = loadExpansions();
    expect(result).toEqual(["base"]);
  });
});

describe("Given a saved list of expansions in localStorage", () => {
  it("when loadExpansions is called, then it returns the saved value", () => {
    saveExpansions(["chaos", "olympus"]);
    const result = loadExpansions();
    expect(result).toEqual(["chaos", "olympus"]);
  });
});

describe("Given corrupted JSON in localStorage", () => {
  it("when loadExpansions is called, then it falls back to the default ['base']", () => {
    localStorage.setItem("santorini-active-expansions", "not-valid-json{{{");
    const result = loadExpansions();
    expect(result).toEqual(["base"]);
  });
});

describe("Given an empty array was saved", () => {
  it("when loadExpansions is called, then it falls back to the default ['base']", () => {
    saveExpansions([]);
    const result = loadExpansions();
    expect(result).toEqual(["base"]);
  });
});

// Feature: santorini-power-randomizer, Property 5: Expansion persistence round-trip
describe("Given any array of ExpansionId values", () => {
  it("when saveExpansions then loadExpansions is called, then the same elements are returned (order-independent)", () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...EXPANSION_IDS), {
          minLength: 1,
          maxLength: 5,
        }),
        (expansions) => {
          localStorage.clear();
          saveExpansions(expansions);
          const loaded = loadExpansions();
          expect(loaded.slice().sort()).toEqual(expansions.slice().sort());
        },
      ),
      { numRuns: 100 },
    );
  });
});
