import { Link } from "@tanstack/react-router";

import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { EXPANSIONS } from "../data/powers";
import { useExpansions } from "../hooks/useExpansions";

export function SettingsScreen() {
  const [activeExpansions, toggleExpansion] = useExpansions();
  const noneSelected = activeExpansions.length === 0;

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-lg mx-auto w-full">
      <h1 className="text-2xl font-semibold text-[#c8a96e]">Settings</h1>

      {noneSelected && (
        <div
          role="alert"
          className="w-full rounded-lg border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          Select at least one expansion to continue.
        </div>
      )}

      <ul className="w-full flex flex-col gap-3">
        {EXPANSIONS.map((expansion) => {
          const isChecked = activeExpansions.includes(expansion.id);
          return (
            <li
              key={expansion.id}
              className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              <img
                src={expansion.image}
                alt={expansion.name}
                className="h-12 w-12 rounded object-cover shrink-0"
              />
              <span className="flex-1 text-sm font-medium text-white">
                {expansion.name}
              </span>
              <Link
                to="/expansion/$id"
                params={{ id: expansion.id }}
                className="text-xs text-[#c8a96e] underline underline-offset-2 hover:text-[#e0c080] min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
              >
                View Gods
              </Link>
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => toggleExpansion(expansion.id)}
                aria-label={`Toggle ${expansion.name}`}
                className="shrink-0"
              />
            </li>
          );
        })}
      </ul>

      <Button
        asChild={!noneSelected}
        size="lg"
        variant="ghost"
        className="min-h-[44px] mt-2"
        disabled={noneSelected}
        aria-disabled={noneSelected}
      >
        {noneSelected ? <span>← Back</span> : <Link to="/">← Back</Link>}
      </Button>
    </div>
  );
}
