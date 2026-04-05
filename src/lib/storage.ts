import { type ExpansionId } from "../data/powers";

const STORAGE_KEY = "santorini-active-expansions";
const DEFAULT_EXPANSIONS: ExpansionId[] = ["base"];

export function loadExpansions(): ExpansionId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_EXPANSIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0)
      return parsed as ExpansionId[];
    return DEFAULT_EXPANSIONS;
  } catch {
    // SecurityError in private browsing, or JSON parse failure
    return DEFAULT_EXPANSIONS;
  }
}

export function saveExpansions(ids: ExpansionId[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // SecurityError in private browsing — silently ignore
  }
}
