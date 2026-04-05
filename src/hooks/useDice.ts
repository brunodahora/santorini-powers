import { useState } from "react";

import { loadDice, saveDice } from "../lib/storage";

export function useDice(): [boolean, () => void] {
  const [includeDice, setIncludeDice] = useState(() => loadDice());

  function toggleDice() {
    setIncludeDice((prev) => {
      saveDice(!prev);
      return !prev;
    });
  }

  return [includeDice, toggleDice];
}
