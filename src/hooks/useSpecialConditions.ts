import { useState } from "react";

import { loadSpecialConditions, saveSpecialConditions } from "../lib/storage";

export function useSpecialConditions(): [boolean, () => void] {
  const [includeSpecialConditions, setIncludeSpecialConditions] = useState(() =>
    loadSpecialConditions(),
  );

  function toggleSpecialConditions() {
    setIncludeSpecialConditions((prev) => {
      saveSpecialConditions(!prev);
      return !prev;
    });
  }

  return [includeSpecialConditions, toggleSpecialConditions];
}
