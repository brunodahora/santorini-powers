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

import { POWERS } from "../../data/powers";

import { GodsListScreen } from "../gods";
import { ResultScreen } from "../result";

function renderExpansion(expansionId: string) {
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  });

  const godsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/gods",
    component: GodsListScreen,
    validateSearch: (search: Record<string, unknown>) => ({
      specialConditions:
        search.specialConditions === true ||
        search.specialConditions === "true",
      dice: search.dice === true || search.dice === "true",
      expansion:
        typeof search.expansion === "string" ? search.expansion : undefined,
    }),
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

  const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/settings",
    component: () => <div>Settings Screen</div>,
  });

  const routeTree = rootRoute.addChildren([
    godsRoute,
    resultRoute,
    settingsRoute,
  ]);

  const history = createMemoryHistory({
    initialEntries: [`/gods?expansion=${expansionId}`],
  });

  const router = createRouter({ routeTree, history });

  return render(<RouterProvider router={router} />);
}

beforeEach(() => {
  localStorage.setItem("santorini-active-expansions", JSON.stringify(["base"]));
});

describe("Given the gods screen filtered to the base expansion", () => {
  it("when rendered, then all base god names are shown", async () => {
    renderExpansion("base");

    const baseGods = POWERS.filter((p) => p.expansion === "base");
    for (const god of baseGods) {
      expect(await screen.findByText(god.name)).toBeInTheDocument();
    }
  });

  it("when rendered, then each god name is a link to the result screen", async () => {
    renderExpansion("base");

    const apolloLink = await screen.findByRole("link", { name: "Apollo" });
    expect(apolloLink).toHaveAttribute(
      "href",
      expect.stringContaining("/result"),
    );
    expect(apolloLink).toHaveAttribute(
      "href",
      expect.stringContaining("apollo"),
    );
  });

  it("when the user clicks a god name, then they navigate to the result screen", async () => {
    const user = userEvent.setup();
    renderExpansion("base");

    const apolloLink = await screen.findByRole("link", { name: "Apollo" });
    await user.click(apolloLink);

    expect(await screen.findByText(/re-randomize/i)).toBeInTheDocument();
  });

  it("when rendered, then a Back link to /settings is shown", async () => {
    renderExpansion("base");

    const backLink = await screen.findByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute(
      "href",
      expect.stringContaining("/settings"),
    );
  });

  it("when the user clicks Back, then they navigate to the settings screen", async () => {
    const user = userEvent.setup();
    renderExpansion("base");

    const backLink = await screen.findByRole("link", { name: /back/i });
    await user.click(backLink);

    expect(await screen.findByText("Settings Screen")).toBeInTheDocument();
  });
});

describe("Given the gods screen filtered to the chaos expansion", () => {
  it("when rendered, then only chaos gods are shown", async () => {
    renderExpansion("chaos");

    const chaosGods = POWERS.filter((p) => p.expansion === "chaos");
    for (const god of chaosGods) {
      expect(await screen.findByText(god.name)).toBeInTheDocument();
    }

    // A base-only god should not appear
    expect(screen.queryByText("Apollo")).toBeNull();
  });
});
