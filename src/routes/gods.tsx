import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { SpriteImage } from "../components/SpriteImage";
import { EXPANSIONS, POWERS } from "../data/powers";
import type { ExpansionId } from "../data/powers";
import { useBackButton } from "../hooks/useBackButton";
import { useExpansions } from "../hooks/useExpansions";

export function GodsListScreen() {
  const navigate = useNavigate();
  const [activeExpansions] = useExpansions();
  const [filter, setFilter] = useState<ExpansionId | "all">("all");
  useBackButton(() => navigate({ to: "/others" }));

  const availableExpansions = EXPANSIONS.filter((e) =>
    activeExpansions.includes(e.id),
  );

  const visiblePowers = POWERS.filter((p) => {
    if (!activeExpansions.includes(p.expansion)) return false;
    if (filter !== "all" && p.expansion !== filter) return false;
    return true;
  });

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-2xl lg:max-w-4xl mx-auto w-full flex-1">
      <h1 className="text-2xl font-semibold text-white">Browse Gods</h1>

      {/* Filter bar */}
      <div
        className="flex flex-wrap gap-2 justify-center w-full"
        role="group"
        aria-label="Filter by expansion"
      >
        <button
          onClick={() => setFilter("all")}
          className={[
            "min-h-[44px] px-4 rounded-lg text-sm font-medium transition-colors",
            filter === "all"
              ? "bg-white text-[#0a1628]"
              : "bg-white/10 text-white hover:bg-white/20",
          ].join(" ")}
          aria-pressed={filter === "all"}
        >
          All
        </button>
        {availableExpansions.map((exp) => (
          <button
            key={exp.id}
            onClick={() => setFilter(exp.id)}
            className={[
              "min-h-[44px] px-4 rounded-lg text-sm font-medium transition-colors",
              filter === exp.id
                ? "bg-white text-[#0a1628]"
                : "bg-white/10 text-white hover:bg-white/20",
            ].join(" ")}
            aria-pressed={filter === exp.id}
          >
            {exp.name}
          </button>
        ))}
      </div>

      {/* Powers grid */}
      {visiblePowers.length === 0 ? (
        <p className="text-white/60 text-sm mt-4">
          No gods available. Enable expansions in Settings.
        </p>
      ) : (
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-3 w-full">
          {visiblePowers.map((power) => (
            <li key={power.id}>
              <Link
                to="/result"
                search={{ mode: "one", ids: power.id }}
                className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors min-h-[44px]"
                aria-label={power.name}
              >
                <SpriteImage
                  expansion={power.expansion}
                  row={power.row}
                  col={power.col}
                  size={80}
                  alt={power.name}
                  className="rounded"
                />
                <span className="text-xs text-white text-center leading-tight">
                  {power.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/others"
        className="min-h-[44px] px-4 md:inline-flex hidden items-center justify-center text-sm font-medium text-white/70 hover:text-white underline-offset-4 hover:underline"
      >
        ← Back
      </Link>
    </div>
  );
}
