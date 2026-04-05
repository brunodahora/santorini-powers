import { Outlet } from "@tanstack/react-router";

export function RootLayout() {
  return (
    <div className="root-layout">
      <header className="w-full">
        <img
          src="/img/title.png"
          alt="Santorini"
          className="w-full object-contain"
        />
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
