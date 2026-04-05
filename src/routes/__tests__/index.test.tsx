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
import { describe, it, expect, beforeEach } from "vitest";

import { MATCHUPS } from "../../data/powers";

import { SelectionScreen } from "../index";
import { OthersScreen } from "../others";
import { ResultScreen } from "../result";

function renderSelection(activeExpansions = ["base"]) {
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
    validateSearch: (search: Record<string, unknown>) => ({
      mode: (search.mode as "one" | "two" | "matchup") ?? "one",
      ids: (search.ids as string) ?? "",
    }),
  });

  const othersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/others",
    component: OthersScreen,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    resultRoute,
    othersRoute,
  ]);
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const router = createRouter({ routeTree, history });

  return render(<RouterProvider router={router} />);
}

beforeEach(() => {
  localStorage.clear();
});

describe("Given the selection screen with base expansion active", () => {
  it("when rendered, then all four action buttons are shown", async () => {
    renderSelection();
    expect(
      await screen.findByRole("button", { name: /pick one power/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /pick two powers/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /random matchup/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /others/i })).toBeInTheDocument();
  });

  it("when the user clicks Pick One Power, then they navigate to the result screen", async () => {
    const user = userEvent.setup();
    renderSelection();
    await user.click(
      await screen.findByRole("button", { name: /pick one power/i }),
    );
    expect(
      await screen.findByRole("button", { name: /re-randomize/i }),
    ).toBeInTheDocument();
  });

  it("when the user clicks Pick Two Powers, then they navigate to the result screen", async () => {
    const user = userEvent.setup();
    renderSelection();
    await user.click(
      await screen.findByRole("button", { name: /pick two powers/i }),
    );
    expect(
      await screen.findByRole("button", { name: /re-randomize/i }),
    ).toBeInTheDocument();
  });

  it("when the user clicks Random Matchup, then they navigate to the result screen", async () => {
    const user = userEvent.setup();
    renderSelection();
    await user.click(
      await screen.findByRole("button", { name: /random matchup/i }),
    );
    expect(
      await screen.findByRole("button", { name: /re-randomize/i }),
    ).toBeInTheDocument();
  });

  it("when the user clicks Others, then they navigate to the others screen", async () => {
    const user = userEvent.setup();
    renderSelection();
    await user.click(await screen.findByRole("button", { name: /others/i }));
    expect(
      await screen.findByRole("link", { name: /browse gods/i }),
    ).toBeInTheDocument();
  });
});

describe("Given only an expansion with no valid matchups is active", () => {
  it("when rendered, then the Random Matchup button is disabled", async () => {
    // olympus has no self-contained matchups
    const olympusOnlyMatchups = MATCHUPS.filter(
      (m) => m.expansions[0] === "olympus" && m.expansions[1] === "olympus",
    );
    expect(olympusOnlyMatchups.length).toBe(0);

    renderSelection(["olympus"]);
    expect(
      await screen.findByRole("button", { name: /random matchup/i }),
    ).toBeDisabled();
  });
});
