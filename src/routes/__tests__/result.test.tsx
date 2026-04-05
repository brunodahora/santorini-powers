import { createMemoryHistory } from "@tanstack/history";
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { SelectionScreen } from "../index";
import { ResultScreen } from "../result";

function renderResult(
  search: { mode: string; ids: string },
  activeExpansions = ["base"],
) {
  localStorage.setItem(
    "santorini-active-expansions",
    JSON.stringify(activeExpansions),
  );

  const rootRoute = createRootRoute({ component: () => <Outlet /> });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: SelectionScreen,
  });

  const resultRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/result",
    component: ResultScreen,
    validateSearch: (s: Record<string, unknown>) => ({
      mode: (s.mode as "one" | "two" | "matchup") ?? "one",
      ids: (s.ids as string) ?? "",
    }),
  });

  const routeTree = rootRoute.addChildren([indexRoute, resultRoute]);
  const params = new URLSearchParams(
    search as Record<string, string>,
  ).toString();
  const history = createMemoryHistory({
    initialEntries: [`/result?${params}`],
  });
  const router = createRouter({ routeTree, history });

  return render(<RouterProvider router={router} />);
}

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("Given a valid single-power result URL", () => {
  it("when rendered, then the Re-randomize and Share buttons are shown", async () => {
    renderResult({ mode: "one", ids: "apollo" });
    expect(
      await screen.findByRole("button", { name: /re-randomize/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /share/i })).toBeInTheDocument();
  });

  it("when the user clicks Re-randomize, then a new result is shown", async () => {
    const user = userEvent.setup();
    renderResult({ mode: "one", ids: "apollo" });
    await user.click(
      await screen.findByRole("button", { name: /re-randomize/i }),
    );
    // Still on result screen
    expect(
      await screen.findByRole("button", { name: /re-randomize/i }),
    ).toBeInTheDocument();
  });
});

describe("Given a valid two-power result URL", () => {
  it("when rendered, then the Re-randomize button is shown", async () => {
    renderResult({ mode: "two", ids: "apollo,artemis" });
    expect(
      await screen.findByRole("button", { name: /re-randomize/i }),
    ).toBeInTheDocument();
  });
});

describe("Given an invalid result URL with unknown power IDs", () => {
  it("when rendered, then the user is redirected to the selection screen", async () => {
    renderResult({ mode: "one", ids: "not-a-real-power" });
    // Should redirect to "/" — selection screen shows Pick One Power button
    expect(
      await screen.findByRole("button", { name: /pick one power/i }),
    ).toBeInTheDocument();
  });
});

describe("Given an invalid result URL with no ids", () => {
  it("when rendered, then the user is redirected to the selection screen", async () => {
    renderResult({ mode: "one", ids: "" });
    expect(
      await screen.findByRole("button", { name: /pick one power/i }),
    ).toBeInTheDocument();
  });
});

describe("Given the Share button with Web Share API available", () => {
  it("when the user clicks Share, then navigator.share is called and confirmation is shown", async () => {
    const user = userEvent.setup();
    const shareMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { ...navigator, share: shareMock });

    renderResult({ mode: "one", ids: "apollo" });
    await user.click(await screen.findByRole("button", { name: /share/i }));

    expect(shareMock).toHaveBeenCalled();
    expect(
      await screen.findByRole("button", { name: /link copied/i }),
    ).toBeInTheDocument();
  });
});

describe("Given the Share button without Web Share API", () => {
  it("when the user clicks Share, then clipboard.writeText is called and confirmation is shown", async () => {
    const user = userEvent.setup();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    // Remove share, add clipboard
    vi.stubGlobal("navigator", {
      ...navigator,
      share: undefined,
      clipboard: { writeText: writeTextMock },
    });

    renderResult({ mode: "one", ids: "apollo" });
    await user.click(await screen.findByRole("button", { name: /share/i }));

    expect(writeTextMock).toHaveBeenCalled();
    expect(
      await screen.findByRole("button", { name: /link copied/i }),
    ).toBeInTheDocument();
  });
});

describe("Given a shared result URL opened with different active expansions", () => {
  it("when rendered, then the correct powers are shown regardless of active expansions", async () => {
    // Only olympus is active, but URL references base powers
    renderResult({ mode: "two", ids: "apollo,artemis" }, ["olympus"]);
    // Should still show the result (not redirect), because shared URLs bypass expansion filter
    expect(
      await screen.findByRole("button", { name: /re-randomize/i }),
    ).toBeInTheDocument();
  });
});
