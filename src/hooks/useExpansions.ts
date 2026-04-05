import { useState } from "react";
import { type ExpansionId } from "../data/powers";
import { loadExpansions, saveExpansions } from "../lib/storage";

export function useExpansions(): [ExpansionId[], (id: ExpansionId) => void] {
  const [activeExpansions, setActiveExpansions] = useState<ExpansionId[]>(() =>
    loadExpansions(),
  );

  function toggleExpansion(id: ExpansionId) {
    setActiveExpansions((prev) => {
      const next = prev.includes(id)
        ? prev.filter((e) => e !== id)
        : [...prev, id];
      saveExpansions(next);
      return next;
    });
  }

  return [activeExpansions, toggleExpansion];
}
