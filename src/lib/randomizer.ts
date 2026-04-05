import { type ExpansionId, type Matchup, type Power } from "../data/powers";

function randomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

/** Returns a single random power from the active expansion pool. */
export function pickOne(
  powers: Power[],
  activeExpansions: ExpansionId[],
): Power {
  const pool = powers.filter((p) => activeExpansions.includes(p.expansion));
  return pool[randomIndex(pool.length)];
}

/** Returns two distinct random powers from the active expansion pool. */
export function pickTwo(
  powers: Power[],
  activeExpansions: ExpansionId[],
): [Power, Power] {
  const pool = powers.filter((p) => activeExpansions.includes(p.expansion));
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
): [Power, Power] | null {
  const powerById = new Map(powers.map((p) => [p.id, p]));

  const valid = matchups.filter(
    (m) =>
      activeExpansions.includes(m.expansions[0]) &&
      activeExpansions.includes(m.expansions[1]) &&
      powerById.has(m.ids[0]) &&
      powerById.has(m.ids[1]),
  );

  if (valid.length === 0) return null;

  const chosen = valid[randomIndex(valid.length)];
  return [powerById.get(chosen.ids[0])!, powerById.get(chosen.ids[1])!];
}
