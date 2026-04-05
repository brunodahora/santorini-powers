import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useExpansions } from "./useExpansions";

beforeEach(() => {
  localStorage.clear();
});

describe("Given no saved expansions in localStorage", () => {
  it("when the hook mounts, then activeExpansions defaults to ['base']", () => {
    const { result } = renderHook(() => useExpansions());
    expect(result.current[0]).toEqual(["base"]);
  });
});

describe("Given saved expansions in localStorage", () => {
  it("when the hook mounts, then activeExpansions reflects the saved value", () => {
    localStorage.setItem(
      "santorini-active-expansions",
      JSON.stringify(["chaos", "olympus"]),
    );
    const { result } = renderHook(() => useExpansions());
    expect(result.current[0]).toEqual(["chaos", "olympus"]);
  });
});

describe("Given the hook is mounted with base active", () => {
  it("when toggleExpansion is called with 'chaos', then 'chaos' is added to activeExpansions", () => {
    const { result } = renderHook(() => useExpansions());
    act(() => result.current[1]("chaos"));
    expect(result.current[0]).toContain("chaos");
    expect(result.current[0]).toContain("base");
  });

  it("when toggleExpansion is called with 'base', then 'base' is removed from activeExpansions", () => {
    const { result } = renderHook(() => useExpansions());
    act(() => result.current[1]("base"));
    expect(result.current[0]).not.toContain("base");
  });
});

describe("Given an expansion has been toggled on", () => {
  it("when toggleExpansion is called again with the same id, then it is removed (toggle off)", () => {
    const { result } = renderHook(() => useExpansions());
    act(() => result.current[1]("poseidon"));
    act(() => result.current[1]("poseidon"));
    expect(result.current[0]).not.toContain("poseidon");
  });
});

describe("Given the hook is mounted", () => {
  it("when toggleExpansion is called, then the new state is persisted to localStorage", () => {
    const { result } = renderHook(() => useExpansions());
    act(() => result.current[1]("olympus"));
    const saved = JSON.parse(
      localStorage.getItem("santorini-active-expansions") ?? "[]",
    );
    expect(saved).toContain("olympus");
  });

  it("when toggleExpansion removes an expansion, then localStorage reflects the removal", () => {
    const { result } = renderHook(() => useExpansions());
    act(() => result.current[1]("base"));
    const saved = JSON.parse(
      localStorage.getItem("santorini-active-expansions") ?? '["base"]',
    );
    expect(saved).not.toContain("base");
  });
});
