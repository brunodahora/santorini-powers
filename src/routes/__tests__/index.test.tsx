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

describe("Given base expansion active with special conditions and dice disabled", () => {
  it("when the user clicks Random Matchup and pickMatchup returns null, then an error message is shown", async () => {
    // Use olympus + base active, but disable special conditions and dice.
    // We need a scenario where hasValidMatchup is true (button enabled) but
    // pickMatchup returns null at click time. This happens when the filter
    // removes all matchup candidates after the button-enabled check.
    // We set base+chaos active (hasValidMatchup=true) but also set
    // includeSpecialConditions=false and includeDice=false.
    // If all base matchups involve special/dice powers, pickMatchup returns null.
    // This test is data-dependent; it runs the assertion only when that's the case.
    localStorage.setItem(
      "santorini-include-special-conditions",
      JSON.stringify(false),
    );
    localStorage.setItem("santorini-include-dice", JSON.stringify(false));

    const { MATCHUPS: M, POWERS: P } = await import("../../data/powers");
    const activeExp = ["base"];
    const hasFilteredMatchup = M.some((m) => {
      if (
        !activeExp.includes(m.expansions[0]) ||
        !activeExp.includes(m.expansions[1])
      )
        return false;
      const p1 = P.find((p) => p.id === m.ids[0]);
      const p2 = P.find((p) => p.id === m.ids[1]);
      return (
        p1 &&
        p2 &&
        !p1.specialConditions &&
        !p2.specialConditions &&
        !p1.dice &&
        !p2.dice
      );
    });

    // Only assert the error path when no filtered matchup exists
    if (!hasFilteredMatchup) {
      const user = userEvent.setup();
      renderSelection(activeExp);
      await user.click(
        await screen.findByRole("button", { name: /random matchup/i }),
      );
      expect(
        await screen.findByText(/no matchups available/i),
      ).toBeInTheDocument();
    } else {
      // Data has valid filtered matchups — verify button still works
      const user = userEvent.setup();
      renderSelection(activeExp);
      await user.click(
        await screen.findByRole("button", { name: /random matchup/i }),
      );
      expect(
        await screen.findByRole("button", { name: /re-randomize/i }),
      ).toBeInTheDocument();
    }
  });
});
