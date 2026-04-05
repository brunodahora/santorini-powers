import { Link, useNavigate } from "@tanstack/react-router";

import { Button } from "../components/ui/button";

export function OthersScreen() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-8 flex-1">
      <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm mt-4">
        <Link
          to="/gods"
          className="min-h-[44px] w-full inline-flex items-center justify-center rounded-lg bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2] text-sm font-medium transition-colors px-4"
        >
          Browse Gods
        </Link>
        <Link
          to="/game-modes"
          className="min-h-[44px] w-full inline-flex items-center justify-center rounded-lg bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2] text-sm font-medium transition-colors px-4"
        >
          Game Modes
        </Link>
        <Link
          to="/settings"
          className="min-h-[44px] w-full inline-flex items-center justify-center rounded-lg bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2] text-sm font-medium transition-colors px-4"
        >
          Settings
        </Link>
      </div>

      <Button
        variant="back"
        size="lg"
        className="min-h-[44px] mt-2"
        onClick={() => navigate({ to: "/" })}
      >
        ← Back
      </Button>
    </div>
  );
}
