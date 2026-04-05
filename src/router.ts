import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { RootLayout } from "./routes/__root";
import { SelectionScreen } from "./routes/index";
import { OthersScreen } from "./routes/others";
import { ResultScreen } from "./routes/result";
import { SettingsScreen } from "./routes/settings";

// Lazy placeholder components for routes not yet implemented
function NotYetImplemented() {
  return null;
}

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SelectionScreen,
});

const othersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/others",
  component: OthersScreen,
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
  component: SettingsScreen,
});

const godsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gods",
  component: NotYetImplemented,
});

const expansionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/expansion/$id",
  component: NotYetImplemented,
});

const gameModesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/game-modes",
  component: NotYetImplemented,
});

const gameModesDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/game-modes/$id",
  component: NotYetImplemented,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  othersRoute,
  resultRoute,
  settingsRoute,
  godsRoute,
  expansionRoute,
  gameModesRoute,
  gameModesDetailRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
