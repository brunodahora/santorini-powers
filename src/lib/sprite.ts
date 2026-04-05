import { type ExpansionId, SPRITE_GRID } from "../data/powers";

export interface SpriteStyle {
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition: string;
  width: string;
  height: string;
}

const EXPANSION_IMAGE: Record<ExpansionId, string> = {
  base: "/img/base_powers.webp",
  chaos: "/img/chaos.webp",
  olympus: "/img/olympus.webp",
  poseidon: "/img/poseidon.webp",
  underworld: "/img/underworld.webp",
};

export function getSpriteStyle(
  expansion: ExpansionId,
  row: number,
  col: number,
  sizePx: number,
): SpriteStyle {
  const { rows, cols } = SPRITE_GRID[expansion];
  return {
    backgroundImage: `url('${EXPANSION_IMAGE[expansion]}')`,
    backgroundSize: `${cols * sizePx}px ${rows * sizePx}px`,
    backgroundPosition: `-${col * sizePx}px -${row * sizePx}px`,
    width: `${sizePx}px`,
    height: `${sizePx}px`,
  };
}
