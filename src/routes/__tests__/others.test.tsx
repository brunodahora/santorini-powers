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

import { GodsListScreen } from "../gods";
import { GameModesScreen } from "../game-modes";
import { SelectionScreen } from "../index";
import { OthersScreen } from "../others";
import { SettingsScreen } from "../settings";

function renderOthers() {
  localStorage.setItem("santorini-active-expansions", JSON.stringify(["base"]));

  const rootRoute = createRootRoute({ component: () => <Outlet /> });

  const othersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/others",
    component: OthersScreen,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: SelectionScreen,
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

  const gameModesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/game-modes",
    component: GameModesScreen,
  });

  const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/settings",
    component: SettingsScreen,
  });

  const routeTree = rootRoute.addChildren([
    othersRoute,
    indexRoute,
    godsRoute,
    gameModesRoute,
    settingsRoute,
  ]);
  const history = createMemoryHistory({ initialEntries: ["/others"] });
  const router = createRouter({ routeTree, history });

  return render(<RouterProvider router={router} />);
}

beforeEach(() => {
  localStorage.clear();
});

describe("Given the others screen", () => {
  it("when rendered, then Browse Gods, Game Modes, and Settings links are shown", async () => {
    renderOthers();
    expect(
      await screen.findByRole("link", { name: /browse gods/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /game modes/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /settings/i })).toBeInTheDocument();
  });

  it("when the user clicks Browse Gods, then they navigate to the gods screen", async () => {
    const user = userEvent.setup();
    renderOthers();
    await user.click(await screen.findByRole("link", { name: /browse gods/i }));
    expect(
      await screen.findByRole("heading", { name: /browse gods/i }),
    ).toBeInTheDocument();
  });

  it("when the user clicks Game Modes, then they navigate to the game modes screen", async () => {
    const user = userEvent.setup();
    renderOthers();
    await user.click(await screen.findByRole("link", { name: /game modes/i }));
    expect(
      await screen.findByRole("heading", { name: /game modes/i }),
    ).toBeInTheDocument();
  });

  it("when the user clicks Settings, then they navigate to the settings screen", async () => {
    const user = userEvent.setup();
    renderOthers();
    await user.click(await screen.findByRole("link", { name: /settings/i }));
    expect(
      await screen.findByRole("heading", { name: /settings/i }),
    ).toBeInTheDocument();
  });

  it("when the user clicks Back, then they navigate to the selection screen", async () => {
    const user = userEvent.setup();
    renderOthers();
    await user.click(await screen.findByRole("button", { name: /back/i }));
    expect(
      await screen.findByRole("button", { name: /pick one power/i }),
    ).toBeInTheDocument();
  });
});
