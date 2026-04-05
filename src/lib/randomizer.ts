import { type ExpansionId, type Matchup, type Power } from "../data/powers";

function randomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

function buildPool(
  powers: Power[],
  activeExpansions: ExpansionId[],
  includeSpecialConditions: boolean,
  includeDice: boolean,
): Power[] {
  return powers.filter(
    (p) =>
      activeExpansions.includes(p.expansion) &&
      (includeSpecialConditions || !p.specialConditions) &&
      (includeDice || !p.dice),
  );
}

/** Returns a single random power from the active expansion pool. */
export function pickOne(
  powers: Power[],
  activeExpansions: ExpansionId[],
  includeSpecialConditions = true,
  includeDice = true,
): Power {
  const pool = buildPool(
    powers,
    activeExpansions,
    includeSpecialConditions,
    includeDice,
  );
  return pool[randomIndex(pool.length)];
}

/** Returns two distinct random powers from the active expansion pool. */
export function pickTwo(
  powers: Power[],
  activeExpansions: ExpansionId[],
  includeSpecialConditions = true,
  includeDice = true,
): [Power, Power] {
  const pool = buildPool(
    powers,
    activeExpansions,
    includeSpecialConditions,
    includeDice,
  );
  const first = randomIndex(pool.length);
  let second = randomIndex(pool.length - 1);
  if (second >= first) second++;
  return [pool[first], pool[second]];
}

/**
 * Returns a random matchup where both powers belong to the active expansion pool.
 * Returns null if no valid matchups exist for the current active expansions.
 */
export function pickMatchup(
  powers: Power[],
  matchups: Matchup[],
  activeExpansions: ExpansionId[],
  includeSpecialConditions = true,
  includeDice = true,
): [Power, Power] | null {
  const powerById = new Map(powers.map((p) => [p.id, p]));

  const valid = matchups.filter((m) => {
    if (
      !activeExpansions.includes(m.expansions[0]) ||
      !activeExpansions.includes(m.expansions[1])
    )
      return false;
    if (!powerById.has(m.ids[0]) || !powerById.has(m.ids[1])) return false;
    const p1 = powerById.get(m.ids[0])!;
    const p2 = powerById.get(m.ids[1])!;
    if (
      !includeSpecialConditions &&
      (p1.specialConditions || p2.specialConditions)
    )
      return false;
    if (!includeDice && (p1.dice || p2.dice)) return false;
    return true;
  });

  if (valid.length === 0) return null;

  const chosen = valid[randomIndex(valid.length)];
  return [powerById.get(chosen.ids[0])!, powerById.get(chosen.ids[1])!];
}
