import { Outlet, useRouterState } from "@tanstack/react-router";

const MENU_ROUTES = new Set(["/", "/others"]);

export function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isMenu = MENU_ROUTES.has(pathname);

  return (
    <div className="root-layout">
      <header className="w-full flex justify-center">
        <img
          src="/img/title.png"
          alt="Santorini"
          className={`object-contain mt-8 mb-4 transition-all duration-300 ${isMenu ? "w-3/4 max-h-32" : "w-1/2 max-h-20"}`}
        />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
