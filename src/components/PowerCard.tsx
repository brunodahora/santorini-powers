import { useState } from "react";

import { type Power } from "../data/powers";
import { cn } from "../lib/utils";

import { SpriteImage } from "./SpriteImage";

interface PowerCardProps {
  power: Power;
  /** If true, card starts face-down (back visible). Defaults to false. */
  initiallyFlipped?: boolean;
}

const CARD_SIZE = 240;

export function PowerCard({ power, initiallyFlipped = false }: PowerCardProps) {
  const [flipped, setFlipped] = useState(initiallyFlipped);

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ width: CARD_SIZE, height: CARD_SIZE, perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      aria-label={
        flipped
          ? `${power.name} — click to see image`
          : `${power.name} — click to see details`
      }
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      {/* Card inner — rotates on flip */}
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
          aria-hidden={flipped}
        >
          <SpriteImage
            expansion={power.expansion}
            row={power.row}
            col={power.col}
            size={CARD_SIZE}
            alt={power.name}
          />
        </div>

        {/* Back face */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-3 p-4",
            "border-4 text-center",
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "#c8a96e",
            borderColor: "#a07840",
          }}
          aria-hidden={!flipped}
        >
          <h2 className="text-lg font-bold text-stone-900 leading-tight">
            {power.name}
          </h2>
          <p className="text-sm text-stone-800 leading-snug">
            {power.description}
          </p>
          {power.bgaSlug && (
            <a
              href={`https://en.doc.boardgamearena.com/SantoriniPower${power.bgaSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-xs font-semibold text-stone-900 underline underline-offset-2 hover:text-stone-700"
              onClick={(e) => e.stopPropagation()}
            >
              Full Strategy ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
