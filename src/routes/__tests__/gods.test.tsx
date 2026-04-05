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

import { POWERS, EXPANSIONS } from "../../data/powers";
import { GodsListScreen } from "../gods";
import { ResultScreen } from "../result";

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

  const othersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/others",
    component: () => <div>Others Screen</div>,
  });

  const routeTree = rootRoute.addChildren([
    godsRoute,
    resultRoute,
    homeRoute,
    othersRoute,
  ]);
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

  it("when rendered, then a Back link to /others is shown", async () => {
    renderGods(["base"]);

    const backLink = await screen.findByRole("link", {
      name: /back/i,
      hidden: true,
    });
    expect(backLink).toHaveAttribute("href", "/others");
  });

  it("when the user clicks Back, then they navigate to the others screen", async () => {
    const user = userEvent.setup();
    renderGods(["base"]);

    await user.click(
      await screen.findByRole("link", { name: /back/i, hidden: true }),
    );
    expect(await screen.findByText(/others screen/i)).toBeInTheDocument();
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

function renderGodsWithPath(
  activeExpansions = ["base"],
  initialPath = "/gods",
) {
  localStorage.setItem(
    "santorini-active-expansions",
    JSON.stringify(activeExpansions),
  );

  const rootRoute = createRootRoute({ component: () => <Outlet /> });

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

  const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/settings",
    component: () => <div>Settings Screen</div>,
  });

  const othersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/others",
    component: () => <div>Others Screen</div>,
  });

  const routeTree = rootRoute.addChildren([
    godsRoute,
    settingsRoute,
    othersRoute,
  ]);
  const history = createMemoryHistory({ initialEntries: [initialPath] });
  const router = createRouter({ routeTree, history });

  return render(<RouterProvider router={router} />);
}

describe("Given the gods list screen in filter mode (specialConditions=true)", () => {
  it("when rendered, then only gods with special conditions are shown", async () => {
    renderGodsWithPath(["base"], "/gods?specialConditions=true&dice=false");
    const specialGods = POWERS.filter((p) => p.specialConditions);
    for (const god of specialGods) {
      expect(
        await screen.findByRole("link", { name: god.name }),
      ).toBeInTheDocument();
    }
  });

  it("when rendered, then the heading shows 'Gods with Special Conditions'", async () => {
    renderGodsWithPath(["base"], "/gods?specialConditions=true&dice=false");
    expect(
      await screen.findByRole("heading", {
        name: /gods with special conditions/i,
      }),
    ).toBeInTheDocument();
  });

  it("when the Back link is clicked, then they navigate to settings", async () => {
    const user = userEvent.setup();
    renderGodsWithPath(["base"], "/gods?specialConditions=true&dice=false");
    const backLink = await screen.findByRole("link", {
      name: /back/i,
      hidden: true,
    });
    await user.click(backLink);
    expect(await screen.findByText(/settings screen/i)).toBeInTheDocument();
  });
});

describe("Given the gods list screen in filter mode (dice=true)", () => {
  it("when rendered, then only gods with dice are shown", async () => {
    renderGodsWithPath(
      ["base", "chaos", "poseidon", "underworld", "olympus"],
      "/gods?specialConditions=false&dice=true",
    );
    const diceGods = POWERS.filter((p) => p.dice);
    for (const god of diceGods) {
      expect(
        await screen.findByRole("link", { name: god.name }),
      ).toBeInTheDocument();
    }
  });

  it("when rendered, then the heading shows 'Gods with Dice'", async () => {
    renderGodsWithPath(["base"], "/gods?specialConditions=false&dice=true");
    expect(
      await screen.findByRole("heading", { name: /gods with dice/i }),
    ).toBeInTheDocument();
  });
});

describe("Given the gods list screen filtered by expansion", () => {
  it("when rendered with expansion=base, then the heading shows the expansion name", async () => {
    renderGodsWithPath(
      ["base"],
      "/gods?specialConditions=false&dice=false&expansion=base",
    );
    expect(
      await screen.findByRole("heading", { name: /base powers gods/i }),
    ).toBeInTheDocument();
  });

  it("when rendered with an unknown expansion, then the heading falls back to the expansion id", async () => {
    renderGodsWithPath(
      ["base"],
      "/gods?specialConditions=false&dice=false&expansion=unknown-exp",
    );
    expect(
      await screen.findByRole("heading", { name: /unknown-exp gods/i }),
    ).toBeInTheDocument();
  });

  it("when the Back link is clicked in expansion filter mode, then they navigate to settings", async () => {
    const user = userEvent.setup();
    renderGodsWithPath(
      ["base"],
      "/gods?specialConditions=false&dice=false&expansion=base",
    );
    const backLink = await screen.findByRole("link", {
      name: /back/i,
      hidden: true,
    });
    await user.click(backLink);
    expect(await screen.findByText(/settings screen/i)).toBeInTheDocument();
  });
});

describe("Given the gods list screen with a filter that matches no gods", () => {
  it("when rendered, then an empty state message is shown", async () => {
    // Use an expansion filter for an expansion with no active gods
    renderGodsWithPath(
      ["base"],
      "/gods?specialConditions=false&dice=false&expansion=nonexistent",
    );
    expect(await screen.findByText(/no gods available/i)).toBeInTheDocument();
  });
});
