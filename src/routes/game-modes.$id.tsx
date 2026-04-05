import { useParams, useNavigate } from "@tanstack/react-router";

import { SpriteImage } from "../components/SpriteImage";
import { Button } from "../components/ui/button";
import { GAME_MODES } from "../data/powers";

export function GameModeDetailScreen() {
  const { id } = useParams({ from: "/game-modes/$id" });
  const navigate = useNavigate();

  const mode = GAME_MODES.find((m) => m.id === id);

  if (!mode) {
    navigate({ to: "/game-modes" });
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-lg mx-auto w-full">
      <h1 className="text-2xl font-semibold text-[#c8a96e]">{mode.name}</h1>

      <div className="w-full flex justify-center">
        <SpriteImage
          expansion={mode.expansion}
          row={mode.row}
          col={0}
          size={320}
          alt={mode.name}
          className="rounded-lg shadow-lg"
        />
      </div>

      <Button
        variant="ghost"
        size="lg"
        className="min-h-[44px] mt-2"
        onClick={() => navigate({ to: "/game-modes" })}
      >
        ← Back
      </Button>
    </div>
  );
}
