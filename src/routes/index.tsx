import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "../components/ui/button";
import { MATCHUPS, POWERS } from "../data/powers";
import { useExpansions } from "../hooks/useExpansions";
import { pickMatchup, pickOne, pickTwo } from "../lib/randomizer";

export function SelectionScreen() {
  const navigate = useNavigate();
  const [activeExpansions] = useExpansions();
  const [matchupError, setMatchupError] = useState(false);

  // Determine if any valid matchup exists for the current active expansions
  const hasValidMatchup = MATCHUPS.some(
    (m) =>
      activeExpansions.includes(m.expansions[0]) &&
      activeExpansions.includes(m.expansions[1]),
  );

  function handlePickOne() {
    const power = pickOne(POWERS, activeExpansions);
    navigate({ to: "/result", search: { mode: "one", ids: power.id } });
  }

  function handlePickTwo() {
    const [p1, p2] = pickTwo(POWERS, activeExpansions);
    navigate({
      to: "/result",
      search: { mode: "two", ids: `${p1.id},${p2.id}` },
    });
  }

  function handleMatchup() {
    const result = pickMatchup(POWERS, MATCHUPS, activeExpansions);
    if (result === null) {
      setMatchupError(true);
      return;
    }
    setMatchupError(false);
    const [p1, p2] = result;
    navigate({
      to: "/result",
      search: { mode: "matchup", ids: `${p1.id},${p2.id}` },
    });
  }

  function handleOthers() {
    navigate({ to: "/others" });
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 pb-8 flex-1">
      <img
        src="/img/box.webp"
        alt="Santorini box art"
        className="flex-1 w-full min-h-0 object-contain"
      />

      <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm mt-4">
        <Button
          size="lg"
          className="min-h-[44px] w-full bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2]"
          onClick={handlePickOne}
        >
          Pick One Power
        </Button>
        <Button
          size="lg"
          className="min-h-[44px] w-full bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2]"
          onClick={handlePickTwo}
        >
          Pick Two Powers
        </Button>
        <Button
          size="lg"
          className="min-h-[44px] w-full bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2]"
          onClick={handleMatchup}
          disabled={!hasValidMatchup}
        >
          Random Matchup
        </Button>
        {matchupError && (
          <p className="text-sm text-destructive text-center">
            No matchups available for the selected expansions.
          </p>
        )}
        <Button
          size="lg"
          className="min-h-[44px] w-full bg-[#F5F3EE] text-[#0F5F95] hover:bg-[#EAE8E2]"
          onClick={handleOthers}
        >
          Others
        </Button>
      </div>
    </div>
  );
}
