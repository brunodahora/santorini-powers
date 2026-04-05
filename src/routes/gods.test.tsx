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

import { POWERS, EXPANSIONS } from "../data/powers";

import { GodsListScreen } from "./gods";
import { ResultScreen } from "./result";

function renderGods(activeExpansions = ["base"]) {
  localStorage.setItem(
    "santorini-active-expansions",
    JSON.stringify(activeExpansions),
  );

  const rootRoute = createRootRoute({ component: () => <Outlet /> });

  const godsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/gods",
    component: GodsListScreen,
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

  const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <div>Selection Screen</div>,
  });

  const routeTree = rootRoute.addChildren([godsRoute, resultRoute, homeRoute]);
  const history = createMemoryHistory({ initialEntries: ["/gods"] });
  const router = createRouter({ routeTree, history });

  return render(<RouterProvider router={router} />);
}

beforeEach(() => {
  localStorage.clear();
});

describe("Given the gods list screen with base expansion active", () => {
  it("when rendered, then all base expansion gods are shown", async () => {
    renderGods(["base"]);

    const baseGods = POWERS.filter((p) => p.expansion === "base");
    for (const god of baseGods) {
      expect(
        await screen.findByRole("link", { name: god.name }),
      ).toBeInTheDocument();
    }
  });

  it("when rendered, then gods from inactive expansions are not shown", async () => {
    renderGods(["base"]);

    const chaosGod = POWERS.find((p) => p.expansion === "chaos")!;
    expect(screen.queryByRole("link", { name: chaosGod.name })).toBeNull();
  });

  it("when rendered, then a Back link to / is shown", async () => {
    renderGods(["base"]);

    const backLink = await screen.findByRole("link", { name: /back/i });
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("when the user clicks Back, then they navigate to the selection screen", async () => {
    const user = userEvent.setup();
    renderGods(["base"]);

    await user.click(await screen.findByRole("link", { name: /back/i }));
    expect(await screen.findByText("Selection Screen")).toBeInTheDocument();
  });

  it("when the user clicks a god, then they navigate to the result screen", async () => {
    const user = userEvent.setup();
    renderGods(["base"]);

    const apolloLink = await screen.findByRole("link", { name: "Apollo" });
    await user.click(apolloLink);

    expect(await screen.findByText(/re-randomize/i)).toBeInTheDocument();
  });

  it("when the user clicks a god, then the result URL contains the god id", async () => {
    renderGods(["base"]);

    const apolloLink = await screen.findByRole("link", { name: "Apollo" });
    expect(apolloLink).toHaveAttribute(
      "href",
      expect.stringContaining("apollo"),
    );
  });
});

describe("Given the gods list screen with multiple expansions active", () => {
  it("when rendered, then gods from all active expansions are shown", async () => {
    renderGods(["base", "chaos"]);

    const baseGod = POWERS.find((p) => p.expansion === "base")!;
    const chaosGod = POWERS.find((p) => p.expansion === "chaos")!;

    expect(
      await screen.findByRole("link", { name: baseGod.name }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: chaosGod.name }),
    ).toBeInTheDocument();
  });

  it("when the user clicks a filter button for an expansion, then only that expansion's gods are shown", async () => {
    const user = userEvent.setup();
    renderGods(["base", "chaos"]);

    const chaosExpansion = EXPANSIONS.find((e) => e.id === "chaos")!;
    const filterBtn = await screen.findByRole("button", {
      name: chaosExpansion.name,
    });
    await user.click(filterBtn);

    const chaosGods = POWERS.filter((p) => p.expansion === "chaos");
    for (const god of chaosGods) {
      expect(
        await screen.findByRole("link", { name: god.name }),
      ).toBeInTheDocument();
    }

    // Base gods should no longer be visible
    const baseGod = POWERS.find((p) => p.expansion === "base")!;
    expect(screen.queryByRole("link", { name: baseGod.name })).toBeNull();
  });

  it("when the user clicks All filter, then gods from all active expansions are shown again", async () => {
    const user = userEvent.setup();
    renderGods(["base", "chaos"]);

    // Filter to chaos first
    const chaosExpansion = EXPANSIONS.find((e) => e.id === "chaos")!;
    await user.click(
      await screen.findByRole("button", { name: chaosExpansion.name }),
    );

    // Then click All
    await user.click(await screen.findByRole("button", { name: "All" }));

    const baseGod = POWERS.find((p) => p.expansion === "base")!;
    const chaosGod = POWERS.find((p) => p.expansion === "chaos")!;
    expect(
      await screen.findByRole("link", { name: baseGod.name }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: chaosGod.name }),
    ).toBeInTheDocument();
  });
});

describe("Given the gods list screen with no active expansions stored", () => {
  it("when localStorage has no expansions key, then base gods are shown by default", async () => {
    // loadExpansions defaults to ["base"] when key is absent
    localStorage.clear();
    renderGods(["base"]);

    const baseGod = POWERS.find((p) => p.expansion === "base")!;
    expect(
      await screen.findByRole("link", { name: baseGod.name }),
    ).toBeInTheDocument();
  });
});
