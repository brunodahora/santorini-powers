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

import { GAME_MODES } from "../../data/powers";
import { GameModesScreen } from "../game-modes";
import { GameModeDetailScreen } from "../game-modes.$id";
import { OthersScreen } from "../others";

function renderGameModes(
  activeExpansions = ["base"],
  initialPath = "/game-modes",
) {
  localStorage.setItem(
    "santorini-active-expansions",
    JSON.stringify(activeExpansions),
  );

  const rootRoute = createRootRoute({ component: () => <Outlet /> });

  const gameModesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/game-modes",
    component: GameModesScreen,
  });

  const gameModesDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/game-modes/$id",
    component: GameModeDetailScreen,
  });

  const othersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/others",
    component: OthersScreen,
  });

  const routeTree = rootRoute.addChildren([
    gameModesRoute,
    gameModesDetailRoute,
    othersRoute,
  ]);
  const history = createMemoryHistory({ initialEntries: [initialPath] });
  const router = createRouter({ routeTree, history });

  return render(<RouterProvider router={router} />);
}

beforeEach(() => {
  localStorage.clear();
});

describe("Given the game modes screen with base expansion active", () => {
  it("when rendered, then game modes from the base expansion are shown", async () => {
    renderGameModes(["base"]);
    const baseModes = GAME_MODES.filter((m) => m.expansion === "base");
    for (const mode of baseModes) {
      expect(await screen.findByText(mode.name)).toBeInTheDocument();
    }
  });

  it("when rendered, then game modes from inactive expansions are not shown", async () => {
    renderGameModes(["base"]);
    const chaosModes = GAME_MODES.filter((m) => m.expansion === "chaos");
    if (chaosModes.length > 0) {
      expect(screen.queryByText(chaosModes[0].name)).toBeNull();
    }
  });

  it("when the user clicks a game mode, then they navigate to the detail screen", async () => {
    const user = userEvent.setup();
    renderGameModes(["base"]);

    const baseModes = GAME_MODES.filter((m) => m.expansion === "base");
    const firstMode = baseModes[0];
    const modeLink = await screen.findByRole("link", {
      name: new RegExp(firstMode.name, "i"),
    });
    await user.click(modeLink);

    // Detail screen shows the mode name as aria-label on the card
    expect(
      await screen.findByRole("img", { name: firstMode.name }),
    ).toBeInTheDocument();
  });
});

describe("Given the game modes detail screen", () => {
  it("when rendered, then the rule card image is shown", async () => {
    const baseModes = GAME_MODES.filter((m) => m.expansion === "base");
    const firstMode = baseModes[0];
    renderGameModes(["base"], `/game-modes/${firstMode.id}`);

    expect(
      await screen.findByRole("img", { name: firstMode.name }),
    ).toBeInTheDocument();
  });

  it("when the user clicks Back, then they return to the game modes list", async () => {
    const user = userEvent.setup();
    const baseModes = GAME_MODES.filter((m) => m.expansion === "base");
    const firstMode = baseModes[0];
    renderGameModes(["base"], `/game-modes/${firstMode.id}`);

    const backBtn = await screen.findByRole("button", { name: /back/i });
    await user.click(backBtn);

    expect(
      await screen.findByRole("heading", { name: /game modes/i }),
    ).toBeInTheDocument();
  });
});

describe("Given the game modes detail screen with an invalid id", () => {
  it("when rendered with an unknown game mode id, then it redirects to the game modes list", async () => {
    renderGameModes(["base"], "/game-modes/not-a-real-mode");
    expect(
      await screen.findByRole("heading", { name: /game modes/i }),
    ).toBeInTheDocument();
  });
});

describe("Given the game modes list screen", () => {
  it("when the user clicks the desktop Back button, then they navigate to the others screen", async () => {
    const user = userEvent.setup();
    renderGameModes(["base"]);

    const backBtn = await screen.findByRole("button", {
      name: /back/i,
      hidden: true,
    });
    await user.click(backBtn);

    expect(
      await screen.findByRole("link", { name: /browse gods/i }),
    ).toBeInTheDocument();
  });
});

describe("Given no active expansions (empty game modes list)", () => {
  it("when rendered, then an empty state message is shown", async () => {
    // Use a single expansion that has no game modes to trigger the empty state
    // We need activeExpansions to be non-empty (so loadExpansions doesn't default to base)
    // but contain only expansions with no game modes.
    // Check which expansions have no game modes:
    const { GAME_MODES } = await import("../../data/powers");
    const expansionWithNoModes = [
      "olympus",
      "poseidon",
      "underworld",
      "chaos",
      "base",
    ].find((id) => GAME_MODES.filter((m) => m.expansion === id).length === 0);

    if (expansionWithNoModes) {
      renderGameModes([expansionWithNoModes]);
      expect(
        await screen.findByText(/no game modes available/i),
      ).toBeInTheDocument();
    } else {
      // All expansions have game modes — set a non-existent expansion key directly
      localStorage.setItem(
        "santorini-active-expansions",
        JSON.stringify(["nonexistent-expansion"]),
      );
      const rootRoute = createRootRoute({ component: () => <Outlet /> });
      const gameModesRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: "/game-modes",
        component: GameModesScreen,
      });
      const routeTree = rootRoute.addChildren([gameModesRoute]);
      const history = createMemoryHistory({ initialEntries: ["/game-modes"] });
      const router = createRouter({ routeTree, history });
      render(<RouterProvider router={router} />);
      expect(
        await screen.findByText(/no game modes available/i),
      ).toBeInTheDocument();
    }
  });
});
