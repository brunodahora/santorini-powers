import { Link } from "@tanstack/react-router";

import { Button } from "../components/ui/button";

export function OthersScreen() {
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-8">
      <img
        src="/img/title.png"
        alt="Santorini"
        className="w-full max-w-md object-contain"
      />

      <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
        <Button asChild size="lg" className="min-h-[44px] w-full">
          <Link to="/gods">Browse Gods</Link>
        </Button>
        <Button asChild size="lg" className="min-h-[44px] w-full">
          <Link to="/game-modes">Game Modes</Link>
        </Button>
        <Button asChild size="lg" className="min-h-[44px] w-full">
          <Link to="/settings">Settings</Link>
        </Button>
      </div>

      <Button asChild variant="ghost" size="lg" className="min-h-[44px] mt-2">
        <Link to="/">← Back</Link>
      </Button>
    </div>
  );
}
