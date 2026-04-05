import { Link, useNavigate } from "@tanstack/react-router";

import { SpriteImage } from "../components/SpriteImage";
import { Button } from "../components/ui/button";
import { GAME_MODES, EXPANSIONS } from "../data/powers";
import { useExpansions } from "../hooks/useExpansions";

export function GameModesScreen() {
  const navigate = useNavigate();
  const [activeExpansions] = useExpansions();

  const visibleModes = GAME_MODES.filter((m) =>
    activeExpansions.includes(m.expansion),
  );

  const expansionName = (id: string) =>
    EXPANSIONS.find((e) => e.id === id)?.name ?? id;

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-lg mx-auto w-full flex-1">
      <h1 className="text-2xl font-semibold text-white">Game Modes</h1>

      {visibleModes.length === 0 ? (
        <p className="text-white/60 text-sm mt-4">
          No game modes available. Enable expansions in Settings.
        </p>
      ) : (
        <ul className="w-full flex flex-col gap-3">
          {visibleModes.map((mode) => (
            <li key={mode.id}>
              <Link
                to="/game-modes/$id"
                params={{ id: mode.id }}
                className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors min-h-[44px]"
                aria-label={`${mode.name} — ${expansionName(mode.expansion)}`}
              >
                <SpriteImage
                  expansion={mode.expansion}
                  row={mode.row}
                  col={0}
                  size={64}
                  alt={mode.name}
                  className="rounded shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-white truncate">
                    {mode.name}
                  </span>
                  <span className="text-xs text-white/50 truncate">
                    {expansionName(mode.expansion)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Button
        variant="back"
        size="lg"
        className="min-h-[44px] mt-2"
        onClick={() => navigate({ to: "/others" })}
      >
        ← Back
      </Button>
    </div>
  );
}
