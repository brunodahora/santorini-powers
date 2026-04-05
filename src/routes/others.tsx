import { Link, useNavigate } from "@tanstack/react-router";

import { Button } from "../components/ui/button";

export function OthersScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 px-4 pb-8 flex-1">
      <img
        src="/img/box.webp"
        alt="Santorini box art"
        className="flex-1 w-full min-h-0 object-contain"
      />

      <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm">
        <Link
          to="/gods"
          search={{
            specialConditions: false,
            dice: false,
            expansion: undefined,
          }}
          className="min-h-[44px] h-11 w-full inline-flex items-center justify-center rounded-lg bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2] text-sm font-medium transition-colors px-4"
        >
          Browse Gods
        </Link>
        <Link
          to="/game-modes"
          className="min-h-[44px] h-11 w-full inline-flex items-center justify-center rounded-lg bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2] text-sm font-medium transition-colors px-4"
        >
          Game Modes
        </Link>
        <Link
          to="/settings"
          className="min-h-[44px] h-11 w-full inline-flex items-center justify-center rounded-lg bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2] text-sm font-medium transition-colors px-4"
        >
          Settings
        </Link>
        <Button
          variant="back"
          size="lg"
          className="min-h-[44px] w-full"
          onClick={() => navigate({ to: "/" })}
        >
          ← Back
        </Button>
      </div>
    </div>
  );
}
