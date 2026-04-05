import { Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

import { BackButtonContext } from "../hooks/useBackButton";

const MENU_ROUTES = new Set(["/", "/others"]);

export function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isMenu = MENU_ROUTES.has(pathname);
  const [backFn, setBackFn] = useState<(() => void) | null>(null);

  return (
    <BackButtonContext.Provider
      value={{ setBack: (fn) => setBackFn(() => fn) }}
    >
      <div className="root-layout">
        <header className="w-full flex items-center justify-center relative mt-8 mb-4">
          {backFn && (
            <button
              onClick={backFn}
              aria-label="Go back"
              className="md:hidden absolute left-4 text-white font-black text-4xl leading-none p-2 -m-2"
            >
              ←
            </button>
          )}
          <img
            src="/img/title.png"
            alt="Santorini"
            className={`object-contain transition-all duration-300 ${isMenu ? "w-3/4 max-h-32" : "w-1/2 max-h-20"}`}
          />
        </header>
        <main className="flex-1 flex flex-col items-center justify-center">
          <Outlet />
        </main>
      </div>
    </BackButtonContext.Provider>
  );
}
