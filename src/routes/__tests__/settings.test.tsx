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

import { EXPANSIONS } from "../../data/powers";

import { GodsListScreen } from "../gods";
import { OthersScreen } from "../others";
import { SettingsScreen } from "../settings";

function renderSettings(activeExpansions = ["base"]) {
  localStorage.setItem(
    "santorini-active-expansions",
    JSON.stringify(activeExpansions),
  );

  const rootRoute = createRootRoute({ component: () => <Outlet /> });

  const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/settings",
    component: SettingsScreen,
  });

  const othersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/others",
    component: OthersScreen,
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

  const routeTree = rootRoute.addChildren([
    settingsRoute,
    othersRoute,
    godsRoute,
  ]);
  const history = createMemoryHistory({ initialEntries: ["/settings"] });
  const router = createRouter({ routeTree, history });

  return render(<RouterProvider router={router} />);
}

beforeEach(() => {
  localStorage.clear();
});

describe("Given the settings screen with base expansion active", () => {
  it("when rendered, then all 5 expansions are listed", async () => {
    renderSettings();
    for (const exp of EXPANSIONS) {
      expect(await screen.findByText(exp.name)).toBeInTheDocument();
    }
  });

  it("when rendered, then the base expansion checkbox is checked", async () => {
    renderSettings(["base"]);
    const checkbox = await screen.findByRole("checkbox", {
      name: /toggle base powers/i,
    });
    expect(checkbox).toBeChecked();
  });

  it("when rendered, then non-active expansion checkboxes are unchecked", async () => {
    renderSettings(["base"]);
    const chaosCheckbox = await screen.findByRole("checkbox", {
      name: /toggle seasons of chaos/i,
    });
    expect(chaosCheckbox).not.toBeChecked();
  });

  it("when the user toggles an expansion, then the change persists in localStorage", async () => {
    const user = userEvent.setup();
    renderSettings(["base"]);

    const chaosCheckbox = await screen.findByRole("checkbox", {
      name: /toggle seasons of chaos/i,
    });
    await user.click(chaosCheckbox);

    const stored = JSON.parse(
      localStorage.getItem("santorini-active-expansions") ?? "[]",
    );
    expect(stored).toContain("chaos");
  });

  it("when the user clicks the desktop Back button, then they navigate to the others screen", async () => {
    const user = userEvent.setup();
    renderSettings(["base"]);

    // The desktop back button has md:flex hidden — use hidden:true to find it
    const backBtn = await screen.findByRole("button", {
      name: /back/i,
      hidden: true,
    });
    await user.click(backBtn);

    expect(
      await screen.findByRole("link", { name: /browse gods/i }),
    ).toBeInTheDocument();
  });

  it("when the user clicks a View Gods link, then they navigate to the gods screen", async () => {
    const user = userEvent.setup();
    renderSettings(["base"]);

    const viewGodsLinks = await screen.findAllByRole("link", {
      name: /view gods/i,
    });
    await user.click(viewGodsLinks[0]);

    expect(
      await screen.findByRole("heading", { name: /gods/i }),
    ).toBeInTheDocument();
  });
});

describe("Given the settings screen when the user deselects all expansions", () => {
  it("when the user unchecks the only active expansion, then a warning alert is shown", async () => {
    const user = userEvent.setup();
    renderSettings(["base"]);

    const baseCheckbox = await screen.findByRole("checkbox", {
      name: /toggle base powers/i,
    });
    await user.click(baseCheckbox);

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("when the user unchecks the only active expansion, then the Back button becomes disabled", async () => {
    const user = userEvent.setup();
    renderSettings(["base"]);

    const baseCheckbox = await screen.findByRole("checkbox", {
      name: /toggle base powers/i,
    });
    await user.click(baseCheckbox);

    const backBtn = await screen.findByRole("button", {
      name: /back/i,
      hidden: true,
    });
    expect(backBtn).toBeDisabled();
  });
});
