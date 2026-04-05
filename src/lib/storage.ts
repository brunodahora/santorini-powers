import { type ExpansionId } from "../data/powers";

const STORAGE_KEY = "santorini-active-expansions";
const DEFAULT_EXPANSIONS: ExpansionId[] = ["base"];

const SPECIAL_CONDITIONS_KEY = "santorini-include-special-conditions";
const DICE_KEY = "santorini-include-dice";

export function loadSpecialConditions(): boolean {
  try {
    const raw = localStorage.getItem(SPECIAL_CONDITIONS_KEY);
    if (raw === null) return true;
    return JSON.parse(raw) === true;
  } catch {
    return true;
  }
}

export function saveSpecialConditions(value: boolean): void {
  try {
    localStorage.setItem(SPECIAL_CONDITIONS_KEY, JSON.stringify(value));
  } catch {
    // SecurityError in private browsing — silently ignore
  }
}

export function loadDice(): boolean {
  try {
    const raw = localStorage.getItem(DICE_KEY);
    if (raw === null) return true;
    return JSON.parse(raw) === true;
  } catch {
    return true;
  }
}

export function saveDice(value: boolean): void {
  try {
    localStorage.setItem(DICE_KEY, JSON.stringify(value));
  } catch {
    // SecurityError in private browsing — silently ignore
  }
}

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
