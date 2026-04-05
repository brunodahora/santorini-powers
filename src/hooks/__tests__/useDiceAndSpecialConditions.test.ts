import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { useDice } from "../useDice";
import { useSpecialConditions } from "../useSpecialConditions";

beforeEach(() => {
  localStorage.clear();
});

// ── useDice ───────────────────────────────────────────────────────────────────

describe("Given no saved dice preference", () => {
  it("when useDice mounts, then includeDice defaults to true", () => {
    const { result } = renderHook(() => useDice());
    expect(result.current[0]).toBe(true);
  });
});

describe("Given dice saved as false in localStorage", () => {
  it("when useDice mounts, then includeDice is false", () => {
    localStorage.setItem("santorini-include-dice", JSON.stringify(false));
    const { result } = renderHook(() => useDice());
    expect(result.current[0]).toBe(false);
  });
});

describe("Given useDice is mounted with default value", () => {
  it("when toggleDice is called, then includeDice becomes false", () => {
    const { result } = renderHook(() => useDice());
    act(() => result.current[1]());
    expect(result.current[0]).toBe(false);
  });

  it("when toggleDice is called twice, then includeDice returns to true", () => {
    const { result } = renderHook(() => useDice());
    act(() => result.current[1]());
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
  });

  it("when toggleDice is called, then the new value is persisted to localStorage", () => {
    const { result } = renderHook(() => useDice());
    act(() => result.current[1]());
    const saved = JSON.parse(
      localStorage.getItem("santorini-include-dice") ?? "true",
    );
    expect(saved).toBe(false);
  });
});

// ── useSpecialConditions ──────────────────────────────────────────────────────

describe("Given no saved special conditions preference", () => {
  it("when useSpecialConditions mounts, then includeSpecialConditions defaults to true", () => {
    const { result } = renderHook(() => useSpecialConditions());
    expect(result.current[0]).toBe(true);
  });
});

describe("Given special conditions saved as false in localStorage", () => {
  it("when useSpecialConditions mounts, then includeSpecialConditions is false", () => {
    localStorage.setItem(
      "santorini-include-special-conditions",
      JSON.stringify(false),
    );
    const { result } = renderHook(() => useSpecialConditions());
    expect(result.current[0]).toBe(false);
  });
});

describe("Given useSpecialConditions is mounted with default value", () => {
  it("when toggleSpecialConditions is called, then includeSpecialConditions becomes false", () => {
    const { result } = renderHook(() => useSpecialConditions());
    act(() => result.current[1]());
    expect(result.current[0]).toBe(false);
  });

  it("when toggleSpecialConditions is called twice, then it returns to true", () => {
    const { result } = renderHook(() => useSpecialConditions());
    act(() => result.current[1]());
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
  });

  it("when toggleSpecialConditions is called, then the new value is persisted to localStorage", () => {
    const { result } = renderHook(() => useSpecialConditions());
    act(() => result.current[1]());
    const saved = JSON.parse(
      localStorage.getItem("santorini-include-special-conditions") ?? "true",
    );
    expect(saved).toBe(false);
  });
});
