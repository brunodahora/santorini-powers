import * as fc from "fast-check";
import { describe, it, expect, beforeEach } from "vitest";

import type { ExpansionId } from "../../data/powers";
import {
  loadExpansions,
  saveExpansions,
  loadSpecialConditions,
  saveSpecialConditions,
  loadDice,
  saveDice,
} from "../storage";

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

describe("Given localStorage throws a SecurityError (private browsing)", () => {
  it("when loadExpansions is called, then it falls back to the default ['base']", () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("SecurityError");
      },
      configurable: true,
    });
    try {
      const result = loadExpansions();
      expect(result).toEqual(["base"]);
    } finally {
      if (original) {
        Object.defineProperty(window, "localStorage", original);
      }
    }
  });

  it("when saveExpansions is called, then it silently ignores the error", () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("SecurityError");
      },
      configurable: true,
    });
    try {
      expect(() => saveExpansions(["base", "chaos"])).not.toThrow();
    } finally {
      if (original) {
        Object.defineProperty(window, "localStorage", original);
      }
    }
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

// ── Special Conditions ────────────────────────────────────────────────────────

describe("Given no saved special conditions preference", () => {
  it("when loadSpecialConditions is called, then it returns true by default", () => {
    expect(loadSpecialConditions()).toBe(true);
  });
});

describe("Given special conditions saved as false", () => {
  it("when loadSpecialConditions is called, then it returns false", () => {
    saveSpecialConditions(false);
    expect(loadSpecialConditions()).toBe(false);
  });
});

describe("Given special conditions saved as true", () => {
  it("when loadSpecialConditions is called, then it returns true", () => {
    saveSpecialConditions(true);
    expect(loadSpecialConditions()).toBe(true);
  });
});

describe("Given corrupted JSON for special conditions in localStorage", () => {
  it("when loadSpecialConditions is called, then it falls back to true", () => {
    localStorage.setItem(
      "santorini-include-special-conditions",
      "not-valid-json{{{",
    );
    expect(loadSpecialConditions()).toBe(true);
  });
});

describe("Given localStorage throws when reading special conditions", () => {
  it("when loadSpecialConditions is called, then it falls back to true", () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("SecurityError");
      },
      configurable: true,
    });
    try {
      expect(loadSpecialConditions()).toBe(true);
    } finally {
      if (original) Object.defineProperty(window, "localStorage", original);
    }
  });

  it("when saveSpecialConditions is called, then it silently ignores the error", () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("SecurityError");
      },
      configurable: true,
    });
    try {
      expect(() => saveSpecialConditions(false)).not.toThrow();
    } finally {
      if (original) Object.defineProperty(window, "localStorage", original);
    }
  });
});

// ── Dice ──────────────────────────────────────────────────────────────────────

describe("Given no saved dice preference", () => {
  it("when loadDice is called, then it returns true by default", () => {
    expect(loadDice()).toBe(true);
  });
});

describe("Given dice saved as false", () => {
  it("when loadDice is called, then it returns false", () => {
    saveDice(false);
    expect(loadDice()).toBe(false);
  });
});

describe("Given dice saved as true", () => {
  it("when loadDice is called, then it returns true", () => {
    saveDice(true);
    expect(loadDice()).toBe(true);
  });
});

describe("Given corrupted JSON for dice in localStorage", () => {
  it("when loadDice is called, then it falls back to true", () => {
    localStorage.setItem("santorini-include-dice", "not-valid-json{{{");
    expect(loadDice()).toBe(true);
  });
});

describe("Given localStorage throws when reading dice", () => {
  it("when loadDice is called, then it falls back to true", () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("SecurityError");
      },
      configurable: true,
    });
    try {
      expect(loadDice()).toBe(true);
    } finally {
      if (original) Object.defineProperty(window, "localStorage", original);
    }
  });

  it("when saveDice is called, then it silently ignores the error", () => {
    const original = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("SecurityError");
      },
      configurable: true,
    });
    try {
      expect(() => saveDice(false)).not.toThrow();
    } finally {
      if (original) Object.defineProperty(window, "localStorage", original);
    }
  });
});
