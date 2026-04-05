import { useParams, useNavigate } from "@tanstack/react-router";

import { CARD_WIDTH, CARD_HEIGHT } from "../components/PowerCard";
import { Button } from "../components/ui/button";
import { GAME_MODES, type GameMode } from "../data/powers";
import { getSpriteStyle } from "../lib/sprite";

function ScaledModeCard({ mode }: { mode: GameMode }) {
  const targetHeight =
    typeof window !== "undefined" ? window.innerHeight * 0.65 : CARD_HEIGHT;
  const scale = targetHeight / CARD_HEIGHT;
  const spriteStyle = getSpriteStyle(
    mode.expansion,
    mode.row,
    0,
    CARD_WIDTH,
    CARD_HEIGHT,
  );
  return (
    <div style={{ width: CARD_WIDTH * scale, height: CARD_HEIGHT * scale }}>
      <div
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        <div
          style={{
            ...spriteStyle,
            borderRadius: "0.75rem",
            overflow: "hidden",
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3)",
          }}
          role="img"
          aria-label={mode.name}
        />
      </div>
    </div>
  );
}

export function GameModeDetailScreen() {
  const { id } = useParams({ from: "/game-modes/$id" });
  const navigate = useNavigate();

  const mode = GAME_MODES.find((m) => m.id === id);

  if (!mode) {
    navigate({ to: "/game-modes" });
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 pb-8 flex-1">
      <div className="flex justify-center w-full">
        <ScaledModeCard mode={mode} />
      </div>

      <Button
        variant="back"
        size="lg"
        className="min-h-[44px] mt-2"
        onClick={() => navigate({ to: "/game-modes" })}
      >
        ← Back
      </Button>
    </div>
  );
}
