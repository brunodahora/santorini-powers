export type ExpansionId =
  | "base"
  | "chaos"
  | "olympus"
  | "poseidon"
  | "underworld";

export interface Expansion {
  id: ExpansionId;
  name: string;
  image: string;
}

export interface Power {
  id: string;
  name: string;
  expansion: ExpansionId;
  row: number;
  col: number;
  description: string;
  bgaSlug: string | null;
}

export interface GameMode {
  id: string;
  name: string;
  expansion: ExpansionId;
  row: number;
  col: 0;
}

export const EXPANSIONS: Expansion[] = [
  { id: "base", name: "Base Powers", image: "/img/base_powers.webp" },
  { id: "chaos", name: "Seasons of Chaos", image: "/img/chaos.webp" },
  { id: "olympus", name: "Soaring over Olympus", image: "/img/olympus.webp" },
  { id: "poseidon", name: "Tides of Poseidon", image: "/img/poseidon.webp" },
  {
    id: "underworld",
    name: "Hiding in the Underworld",
    image: "/img/underworld.webp",
  },
];

export const SPRITE_GRID: Record<ExpansionId, { rows: number; cols: number }> =
  {
    base: { rows: 4, cols: 9 },
    chaos: { rows: 3, cols: 7 },
    olympus: { rows: 3, cols: 7 },
    poseidon: { rows: 3, cols: 7 },
    underworld: { rows: 3, cols: 7 },
  };

export const GAME_MODES: GameMode[] = [
  {
    id: "base-2p-standard",
    name: "2 Player Standard",
    expansion: "base",
    row: 0,
    col: 0,
  },
  {
    id: "base-3p-standard",
    name: "3 Player Standard",
    expansion: "base",
    row: 1,
    col: 0,
  },
  {
    id: "base-4p-standard",
    name: "4 Player Standard",
    expansion: "base",
    row: 2,
    col: 0,
  },
  { id: "base-agora", name: "The Agora", expansion: "base", row: 3, col: 0 },
  {
    id: "chaos-golden-fleece",
    name: "The Golden Fleece",
    expansion: "chaos",
    row: 1,
    col: 0,
  },
  {
    id: "chaos-chaos-reigns",
    name: "Chaos Reigns",
    expansion: "chaos",
    row: 2,
    col: 0,
  },
  {
    id: "olympus-harmonias-test",
    name: "Harmonia's Test",
    expansion: "olympus",
    row: 1,
    col: 0,
  },
  {
    id: "olympus-chimeras-flight",
    name: "Chimera's Flight",
    expansion: "olympus",
    row: 2,
    col: 0,
  },
  {
    id: "poseidon-trojan-war",
    name: "Trojan War",
    expansion: "poseidon",
    row: 1,
    col: 0,
  },
  {
    id: "poseidon-circes-curse",
    name: "Circe's Curse",
    expansion: "poseidon",
    row: 2,
    col: 0,
  },
  {
    id: "underworld-nyxs-veil",
    name: "Nyx's Veil",
    expansion: "underworld",
    row: 1,
    col: 0,
  },
  {
    id: "underworld-manticores-shadow",
    name: "Manticore's Shadow",
    expansion: "underworld",
    row: 2,
    col: 0,
  },
];

export const POWERS: Power[] = [
  // ── BASE ─────────────────────────────────────────────────────────────────
  {
    id: "aphrodite",
    name: "Aphrodite",
    expansion: "base",
    row: 0,
    col: 1,
    bgaSlug: "Aphrodite",
    description:
      "Opponent's Turn: Each opponent worker which neighbors one of your workers at the start of their turn must also neighbor one of your workers at the end of their turn.",
  },
  {
    id: "apollo",
    name: "Apollo",
    expansion: "base",
    row: 0,
    col: 2,
    bgaSlug: "Apollo",
    description:
      "Your Move: Your worker may move into an opponent worker's space on the same or lower level by forcing their worker to your original space.",
  },
  {
    id: "artemis",
    name: "Artemis",
    expansion: "base",
    row: 0,
    col: 3,
    bgaSlug: "Artemis",
    description:
      "Your Move: Your worker may move one additional time, but not back to its starting space.",
  },
  {
    id: "asteria",
    name: "Asteria",
    expansion: "base",
    row: 0,
    col: 4,
    bgaSlug: "Asteria",
    description:
      "End of Your Turn: If one of your workers moved down a level this turn, you may build a dome in any unoccupied space (regardless of its level).",
  },
  {
    id: "atalanta",
    name: "Atalanta",
    expansion: "base",
    row: 0,
    col: 5,
    bgaSlug: "Atalanta",
    description:
      "Your Move (Once Per Game): Your worker moves any number of additional times.",
  },
  {
    id: "athena",
    name: "Athena",
    expansion: "base",
    row: 0,
    col: 6,
    bgaSlug: "Athena",
    description:
      "Opponent's Turn: If one of your workers moved up a level on your last turn, opponent workers cannot move up a level this turn.",
  },
  {
    id: "atlas",
    name: "Atlas",
    expansion: "base",
    row: 0,
    col: 7,
    bgaSlug: "Atlas",
    description: "Your Build: Your worker may build a dome at any level.",
  },
  {
    id: "aurae",
    name: "Aurae",
    expansion: "base",
    row: 0,
    col: 8,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: After placing your workers, roll the die. End of Your Turn: Each of your workers may move any number of times in the direction shown by the die. You cannot win with these extra moves. Then you may roll the die.",
  },
  {
    id: "bellerophon",
    name: "Bellerophon",
    expansion: "base",
    row: 1,
    col: 1,
    bgaSlug: "Bellerophon",
    description:
      "Your Move (Once Per Game): Your worker may move up two levels.",
  },
  {
    id: "bia",
    name: "Bia",
    expansion: "base",
    row: 1,
    col: 2,
    bgaSlug: "Bia",
    description:
      "Setup: Players place their workers in clockwise order starting with you. After you Move: If the next neighboring space in the same direction as your move has an opponent's worker (at any level), that worker is removed from the game.",
  },
  {
    id: "castor-pollux",
    name: "Castor & Pollux",
    expansion: "base",
    row: 1,
    col: 3,
    bgaSlug: "Castor",
    description:
      "Alternative Turn (optional): You may either move all of your workers and not build with any of them, or move none of your workers and build with all of them.",
  },
  {
    id: "demeter",
    name: "Demeter",
    expansion: "base",
    row: 1,
    col: 4,
    bgaSlug: "Demeter",
    description:
      "Your Build: Your worker may build one additional time, but not on the same space.",
  },
  {
    id: "dionysus",
    name: "Dionysus",
    expansion: "base",
    row: 1,
    col: 5,
    bgaSlug: "Dionysus",
    description:
      "Your Build: Each time a worker you control creates a complete tower, you may take an additional turn using an opponent's worker instead of your own. No player can win during these additional turns.",
  },
  {
    id: "dryads",
    name: "Dryads",
    expansion: "base",
    row: 1,
    col: 6,
    bgaSlug: null, // No BGA guide page
    description:
      "Start of Your Turn: You must roll the die. End of Your Turn: You may force one of your workers to an unoccupied neighboring space at any level in the direction shown by the die.",
  },
  {
    id: "eris",
    name: "Eris",
    expansion: "base",
    row: 1,
    col: 7,
    bgaSlug: "Eris",
    description:
      "Alternative Turn (optional): You may move and build (and even win!) with an opponent's worker as if it was your own, as long as it is not the worker that they most recently moved.",
  },
  {
    id: "eros",
    name: "Eros",
    expansion: "base",
    row: 1,
    col: 8,
    bgaSlug: "Eros",
    description:
      "Setup: Place your workers anywhere along opposite edges of the board. Alternative Win Condition: You also win if at the end of your turn, all of your workers are on level-1 blocks that neighbor each other.",
  },
  {
    id: "hera",
    name: "Hera",
    expansion: "base",
    row: 2,
    col: 1,
    bgaSlug: "Hera",
    description:
      "Opponent's Turn: An opponent cannot win by moving into a perimeter space.",
  },
  {
    id: "iris",
    name: "Iris",
    expansion: "base",
    row: 2,
    col: 2,
    bgaSlug: "Iris",
    description:
      "Your Move: If there is a worker neighboring your worker and the space on the opposite side of it is unoccupied, your worker may move to that space, regardless of its level.",
  },
  {
    id: "limus",
    name: "Limus",
    expansion: "base",
    row: 2,
    col: 3,
    bgaSlug: "Limus",
    description:
      "Opponent's Turn: Opponent workers cannot build on spaces neighboring your workers, unless building a dome.",
  },
  {
    id: "medusa",
    name: "Medusa",
    expansion: "base",
    row: 2,
    col: 4,
    bgaSlug: "Medusa",
    description:
      "End of Your Turn: For each opponent, you may choose one of their workers who neighbors any of your workers and is at a lower level. The chosen workers are removed from the game and replaced with domes.",
  },
  {
    id: "metis",
    name: "Metis",
    expansion: "base",
    row: 2,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Start of Your Turn: You must roll the die. End of Your Turn: You may select an unoccupied space that neighbors one of your workers. If the number on the die matches the number of blocks in that space, build a dome there.",
  },
  {
    id: "minotaur",
    name: "Minotaur",
    expansion: "base",
    row: 2,
    col: 6,
    bgaSlug: "Minotaur",
    description:
      "Your Move: Your worker may move onto an opponent worker's space by forcing them one space in the same direction you moved, to an unoccupied space at any level.",
  },
  {
    id: "oceanids",
    name: "Oceanids",
    expansion: "base",
    row: 2,
    col: 7,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: After placing your workers, roll the die. Start of Your Turn: Add 1 to the number shown on the die for each of your workers on the perimeter. If the result is 3 or more you must take a single bonus turn after this one. You cannot win on the bonus turn. End of Your Turn (not your bonus turn): You must roll the die.",
  },
  {
    id: "oceanus",
    name: "Oceanus",
    expansion: "base",
    row: 2,
    col: 8,
    bgaSlug: null, // No BGA guide page
    description:
      "Your Turn: You must complete a move and build with each of your workers. Win Restriction: You cannot win normally. To win, two of your workers must move up to the third level during the same turn.",
  },
  {
    id: "oreads",
    name: "Oreads",
    expansion: "base",
    row: 3,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: After placing your workers, roll the die. End of Your Turn: You may build in the direction shown by the die with any number of your workers. Then you may roll the die.",
  },
  {
    id: "pan",
    name: "Pan",
    expansion: "base",
    row: 3,
    col: 2,
    bgaSlug: "Pan",
    description:
      "Alternative Win Condition: You can also win by moving your worker down two or more levels.",
  },
  {
    id: "pegasus",
    name: "Pegasus",
    expansion: "base",
    row: 3,
    col: 3,
    bgaSlug: "Pegasus",
    description:
      "Your Move: Your worker may move up more than one level, but cannot win by doing so.",
  },
  {
    id: "perseus",
    name: "Perseus",
    expansion: "base",
    row: 3,
    col: 4,
    bgaSlug: null, // No BGA guide page
    description:
      "End of Your Turn (Once Per Game): Move one of your workers one, two or three consecutive times into spaces occupied by other workers, and then make a move to an unoccupied space.",
  },
  {
    id: "polyphemus",
    name: "Polyphemus",
    expansion: "base",
    row: 3,
    col: 5,
    bgaSlug: "Polyphemus",
    description:
      "End of Your Turn (Once Per Game): Build up to 2 domes at any level on any unoccupied spaces anywhere on the board.",
  },
  {
    id: "scylla",
    name: "Scylla",
    expansion: "base",
    row: 3,
    col: 6,
    bgaSlug: "Scylla",
    description:
      "After Your Move: You may choose one opponent worker who neighbors the space you moved out of. They are forced into it (regardless of its height).",
  },
  {
    id: "triton",
    name: "Triton",
    expansion: "base",
    row: 3,
    col: 7,
    bgaSlug: "Triton",
    description:
      "Your Move: Each time your worker moves into a perimeter space, the worker may immediately move again.",
  },
  {
    id: "zeus",
    name: "Zeus",
    expansion: "base",
    row: 3,
    col: 8,
    bgaSlug: "Zeus",
    description:
      "Your Build: You may choose not to build normally, and instead build a block underneath your moved worker.",
  },

  // ── CHAOS ────────────────────────────────────────────────────────────────
  {
    id: "adonis",
    name: "Adonis",
    expansion: "chaos",
    row: 0,
    col: 1,
    bgaSlug: "Adonis",
    description:
      "End of Your Turn (Once Per Game): Move an opponent worker who neighbors your moved worker.",
  },
  {
    id: "antaeus",
    name: "Antaeus",
    expansion: "chaos",
    row: 0,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "End of Your Turn: If your unmoved worker is on the ground level, you may take a single bonus turn selecting that worker.",
  },
  {
    id: "asklepios",
    name: "Asklepios",
    expansion: "chaos",
    row: 0,
    col: 3,
    bgaSlug: null, // No BGA guide page
    description:
      "Your Build: You may choose not to build normally, and instead build a block (not dome) under a neighbouring worker.",
  },
  {
    id: "graeae",
    name: "Graeae",
    expansion: "chaos",
    row: 0,
    col: 4,
    bgaSlug: "Graeae",
    description:
      "Setup: Place 3 workers of your colour. Your Build: Instead of building with your worker that moved, you must build with one of your other workers.",
  },
  {
    id: "hestia",
    name: "Hestia",
    expansion: "chaos",
    row: 0,
    col: 5,
    bgaSlug: "Hestia",
    description:
      "Your Build: Your worker may build one additional time, but this cannot be on a perimeter space.",
  },
  {
    id: "hydra",
    name: "Hydra",
    expansion: "chaos",
    row: 0,
    col: 6,
    bgaSlug: "Hydra",
    description:
      "Setup: After placing your workers, place 4 Hydra heads on this card. The Hydra heads are treated as your workers. End of Your Turn: If none of your workers/heads neighbor each other, you may place a Hydra head in one of the lowest unoccupied spaces neighboring the worker/head you moved. Otherwise, you must return 1 Hydra head from the board to this card if able.",
  },
  {
    id: "jason",
    name: "Jason",
    expansion: "chaos",
    row: 1,
    col: 1,
    bgaSlug: "Jason",
    description:
      "Setup: Take 3 workers of your color. Place 2 on this card, and 1 on the board. Alternative Turn (optional): Place a worker from this card on an unoccupied perimeter space that is on the ground-level. This worker then builds.",
  },
  {
    id: "khione",
    name: "Khione",
    expansion: "chaos",
    row: 1,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "Start of Your Turn: You must roll the die. End of Your Turn: Your moved worker freezes the neighboring space in the direction shown by the die. This space is frozen until the start of your next turn.",
  },
  {
    id: "kratos",
    name: "Kratos",
    expansion: "chaos",
    row: 1,
    col: 3,
    bgaSlug: null, // No BGA guide page
    description:
      "End of Your Turn: You may select a block (not dome) with nothing on it neighboring one of your workers. Force the selected block one space orthogonally along the same level, to a destination with no worker or token on it. Repeat as much as you like.",
  },
  {
    id: "maenads",
    name: "Maenads",
    expansion: "chaos",
    row: 1,
    col: 4,
    bgaSlug: "Maenads",
    description:
      "End of Your Turn: If your worker neighbors an opponent's worker on opposite sides, that opponent loses the game.",
  },
  {
    id: "medea",
    name: "Medea",
    expansion: "chaos",
    row: 1,
    col: 5,
    bgaSlug: "Medea",
    description:
      "End of Your Turn: You may remove one or two blocks from under a worker neighboring your unmoved worker. Place the removed blocks on this card. If this card has 2 or more blocks on it, it has no powers.",
  },
  {
    id: "prometheus",
    name: "Prometheus",
    expansion: "chaos",
    row: 1,
    col: 6,
    bgaSlug: "Prometheus",
    description:
      "Alternative Turn (optional): As long as you do not move up a level, one of your workers may build, move, and build again.",
  },
  {
    id: "terpsichore",
    name: "Terpsichore",
    expansion: "chaos",
    row: 2,
    col: 1,
    bgaSlug: "Terpsichore",
    description:
      "Your Turn: Each of your workers must move, and then each must build.",
  },
  {
    id: "theseus",
    name: "Theseus",
    expansion: "chaos",
    row: 2,
    col: 2,
    bgaSlug: "Theseus",
    description:
      "End of Your Turn (Once Per Game): Each of your workers may remove any opponent workers who are neighboring them and are at least 2 levels higher.",
  },
  {
    id: "tyche",
    name: "Tyche",
    expansion: "chaos",
    row: 2,
    col: 3,
    bgaSlug: "Tyche",
    description:
      "Setup: After placing your workers, roll the die. Start of Your Turn: You may choose any one worker that neighbors yours, and force them into one of their neighboring spaces which matches the level shown on the die. This cannot force them up or down more than one level.",
  },
  {
    id: "urania",
    name: "Urania",
    expansion: "chaos",
    row: 2,
    col: 4,
    bgaSlug: "Urania",
    description:
      "Your Turn: Your worker may move/build off the edge (or corner) of the board, by moving/building into the space on its opposite edge (or corner).",
  },
  {
    id: "pandora",
    name: "Pandora",
    expansion: "chaos",
    row: 2,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: After placing your workers, roll the die and hide it from your opponents. Alternative Turn (optional): You may reveal the die. Then simultaneously for each worker, force them one space in the direction shown by the die, if possible. You must then secretly roll the die.",
  },

  // ── OLYMPUS ──────────────────────────────────────────────────────────────
  {
    id: "aeolus",
    name: "Aeolus",
    expansion: "olympus",
    row: 0,
    col: 1,
    bgaSlug: "Aeolus",
    description:
      "Setup: Place the wind token sunny-side up beside this card. End of Your Turn: You may turn over the wind token. If you turned it to the windy side, point the arrow in one of the eight directions. Every Move: No worker can move directly opposing the arrow's direction.",
  },
  {
    id: "aloadae",
    name: "Aloadae",
    expansion: "olympus",
    row: 0,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "Alternative Turn (optional): Instead of building normally, build before you move. This build must be in a space that neighbors each of your workers. Then, move with each of your workers. You cannot win during these moves.",
  },
  {
    id: "boreas",
    name: "Boreas",
    expansion: "olympus",
    row: 0,
    col: 3,
    bgaSlug: null, // No BGA guide page
    description:
      "Start of Your Turn: Each of your workers ice-blasts their neighboring space to the North, removing any opponent worker there from the game.",
  },
  {
    id: "daedalus",
    name: "Daedalus",
    expansion: "olympus",
    row: 0,
    col: 4,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Take a complete tower and place it on this card. End of Your Turn: You may build any number of the blocks or domes from this card in spaces neighboring your workers. Blocks must be built at their correct level. The dome may be placed at any level.",
  },
  {
    id: "eirene",
    name: "Eirene",
    expansion: "olympus",
    row: 0,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "End of Your Turn: You may select an opponent worker. If any unoccupied spaces neighbor both the opponent worker and your moved worker, you must build in all those spaces.",
  },
  {
    id: "europa-talus",
    name: "Europa & Talus",
    expansion: "olympus",
    row: 0,
    col: 6,
    bgaSlug: "Europa",
    description:
      "Setup: Place Talus and your workers in unoccupied spaces. End of Your Turn: You may relocate Talus to an unoccupied space neighboring your moved worker. Talus' space is frozen.",
  },
  {
    id: "harpies",
    name: "Harpies",
    expansion: "olympus",
    row: 1,
    col: 1,
    bgaSlug: "Harpies",
    description:
      "Opponent's Turn: Each time an opponent's worker moves, they are then forced space by space in the same direction until the next space is at a higher level, has a token on it, or is occupied.",
  },
  {
    id: "helios",
    name: "Helios",
    expansion: "olympus",
    row: 1,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Place the sun token and your workers in unoccupied spaces. Your Turn: If your worker moves onto the sun token you must force your worker to any other unoccupied space at the same height, build in the sun token space, then build normally. You cannot win on a turn that you move to the sun token space.",
  },
  {
    id: "heracles",
    name: "Heracles",
    expansion: "olympus",
    row: 1,
    col: 3,
    bgaSlug: "Heracles",
    description:
      "Alternative Build (Once Per Game): Each of your workers may build any number of domes in neighboring spaces (at any level).",
  },
  {
    id: "hermes",
    name: "Hermes",
    expansion: "olympus",
    row: 1,
    col: 4,
    bgaSlug: "Hermes",
    description:
      "Your Turn: If your workers do not move up or down levels, they may each move any number of times (even zero), and then one of them must build.",
  },
  {
    id: "hesperides",
    name: "Hesperides",
    expansion: "olympus",
    row: 1,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Place 3 workers of your color, then roll the die. End of Your Turn: You must move one of your workers in the direction shown by the die. You cannot win on this extra move. Then you may roll the die.",
  },
  {
    id: "nike",
    name: "Nike",
    expansion: "olympus",
    row: 1,
    col: 6,
    bgaSlug: null, // No BGA guide page
    description:
      "Opponent's Turn: If one of your workers moved down a level on your turn, opponents cannot move up levels until your next turn.",
  },
  {
    id: "pleiades",
    name: "Pleiades",
    expansion: "olympus",
    row: 2,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "Start of Your Turn: You may choose one of your workers that is at a lower level than a neighboring opponent worker. Force the chosen worker to an unoccupied level-1 block anywhere on the board.",
  },
  {
    id: "polyhymnia",
    name: "Polyhymnia",
    expansion: "olympus",
    row: 2,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Before other players setup, place 1-5 sacred tokens (each covering 0, 1 or 2 blocks). Your Move: If you move onto a space with a sacred token you must immediately move your selected worker again. Sacred token spaces are frozen.",
  },
  {
    id: "selene",
    name: "Selene",
    expansion: "olympus",
    row: 2,
    col: 3,
    bgaSlug: "Selene",
    description:
      "Setup: Place one male and one female worker of your color. Alternative Build (optional): Instead of a normal build, you may build a dome (at any level) in a space neighboring your female worker (even if you moved your male worker).",
  },
  {
    id: "stymphalians",
    name: "Stymphalians",
    expansion: "olympus",
    row: 2,
    col: 4,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Place 3 workers of your color. Your Move: Your workers must always move 2 or 3 spaces. They cannot end in their starting space, or any space which neighbors it. Win Restriction: You cannot win in the first space you move to on your turn.",
  },
  {
    id: "gryphus",
    name: "Gryphus",
    expansion: "olympus",
    row: 2,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: After placing your workers, roll the die. Alternative Turn (optional): You may force one of your workers onto a neighboring dome in the direction shown on the die. Remove that dome, then move and build with this worker. End of Your Turn: You may roll the die.",
  },

  // ── POSEIDON ─────────────────────────────────────────────────────────────
  {
    id: "agamemnon",
    name: "Agamemnon",
    expansion: "poseidon",
    row: 0,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: After placing your workers, place 2 Soldiers. These Soldiers are treated as your workers, but you cannot win with them.",
  },
  {
    id: "achilles",
    name: "Achilles",
    expansion: "poseidon",
    row: 0,
    col: 2,
    bgaSlug: "Achilles",
    description:
      "Your Turn (Once Per Game): Your worker builds both before and after moving.",
  },
  {
    id: "ares",
    name: "Ares",
    expansion: "poseidon",
    row: 0,
    col: 3,
    bgaSlug: "Ares",
    description:
      "End of Your Turn: You may remove an unoccupied block (not dome) neighboring your unmoved worker. You also remove any tokens on the block.",
  },
  {
    id: "charybdis",
    name: "Charybdis",
    expansion: "poseidon",
    row: 0,
    col: 4,
    bgaSlug: "Charybdis",
    description:
      "Setup: Place 2 whirlpool tokens on this card. End of Your Turn: You may put a whirlpool from this card on any unoccupied space. If there are two unoccupied whirlpools, when a worker would move onto one they are instead forced to the other. If this forces them to level-3, they win.",
  },
  {
    id: "clio",
    name: "Clio",
    expansion: "poseidon",
    row: 0,
    col: 5,
    bgaSlug: "Clio",
    description:
      "Your Build: You must place an ancient coin token on each of the first 3 blocks your workers build. Ancient coin spaces are frozen — players cannot move, build or use god powers into frozen spaces.",
  },
  {
    id: "echo",
    name: "Echo",
    expansion: "poseidon",
    row: 0,
    col: 6,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Place the Echo token on any god card held by another player. Echo acts as a duplicate of the card that has the Echo token on it.",
  },
  {
    id: "enodia",
    name: "Enodia",
    expansion: "poseidon",
    row: 1,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "Alternative Win Condition: You also win if at the end of your turn, any 3x3 square on the board has each of its corners occupied by domes and/or anyone's workers.",
  },
  {
    id: "gaea",
    name: "Gaea",
    expansion: "poseidon",
    row: 1,
    col: 2,
    bgaSlug: "Gaea",
    description:
      "Setup: Take 2 extra workers of your color kept on this card. Every Build: When any worker builds a dome, you may immediately place a worker from this card onto an unoccupied ground-level space neighboring the dome.",
  },
  {
    id: "hephaestus",
    name: "Hephaestus",
    expansion: "poseidon",
    row: 1,
    col: 3,
    bgaSlug: "Hephaestus",
    description:
      "Your Build: Your worker may build one additional block (not dome) on top of your first block.",
  },
  {
    id: "hippolyta",
    name: "Hippolyta",
    expansion: "poseidon",
    row: 1,
    col: 4,
    bgaSlug: "Hippolyta",
    description:
      "Setup: Place one male and one female worker of your color. Your female worker moves normally. All other workers (yours and opponents') can only move diagonally.",
  },
  {
    id: "melpomene",
    name: "Melpomene",
    expansion: "poseidon",
    row: 1,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Alternative Win Condition: You also win if at the start of your turn, each of your workers has a neighboring opponent worker at a higher level.",
  },
  {
    id: "moros",
    name: "Moros",
    expansion: "poseidon",
    row: 1,
    col: 6,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Place 4 doom tokens and 4 workers of your color, each on separate perimeter spaces. Doom spaces are frozen. After Your Move: You must force any doom token to the space you moved out of. Win Restriction: You cannot win normally. You win by moving up to the third level if another one of your workers is already at the third level.",
  },
  {
    id: "odysseus",
    name: "Odysseus",
    expansion: "poseidon",
    row: 2,
    col: 1,
    bgaSlug: "Odysseus",
    description:
      "Setup: Place the die beside the board. When Anyone Completes a Tower: You may place the die on this card and roll it. End of Your Turn: If the die is on this card, you must select 1 worker and force them in the direction shown by the die. When Opponent Completes a Tower: If the die is on this card, this god power is removed from the game.",
  },
  {
    id: "proteus",
    name: "Proteus",
    expansion: "poseidon",
    row: 2,
    col: 2,
    bgaSlug: "Proteus",
    description:
      "Setup: Place 3 workers of your color. After Your Move: You must force one of your other workers into the space you just vacated.",
  },
  {
    id: "pythia",
    name: "Pythia",
    expansion: "poseidon",
    row: 2,
    col: 3,
    bgaSlug: null, // No BGA guide page
    description:
      "Before Your Move: Going clockwise around the table starting with you, each player touches one of their workers; this becomes the worker each player must move next.",
  },
  {
    id: "siren",
    name: "Siren",
    expansion: "poseidon",
    row: 2,
    col: 4,
    bgaSlug: "Siren",
    description:
      "Your Move: You may choose not to move (though you must still build) and instead force one or more opponent workers one space South to an unoccupied space at any level.",
  },
  {
    id: "poseidon-god",
    name: "Poseidon",
    expansion: "poseidon",
    row: 2,
    col: 5,
    bgaSlug: "Poseidon",
    description:
      "End of Your Turn: If your unmoved worker is on the ground level, they may build up to two additional times.",
  },

  // ── UNDERWORLD ───────────────────────────────────────────────────────────
  {
    id: "cerberus",
    name: "Cerberus",
    expansion: "underworld",
    row: 0,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Place 3 workers of your color. End of Your Turn: If all three of your workers are not on the ground level, then any opponent workers neighboring all three of your workers are removed from the game.",
  },
  {
    id: "charon",
    name: "Charon",
    expansion: "underworld",
    row: 0,
    col: 2,
    bgaSlug: "Charon",
    description:
      "Your Move: You may choose not to move and instead force a neighboring opponent worker to the space directly on the other side of your worker, if that space is unoccupied.",
  },
  {
    id: "chronus",
    name: "Chronus",
    expansion: "underworld",
    row: 0,
    col: 3,
    bgaSlug: "Chronus",
    description:
      "Alternative Win Condition: You also win if at the end of your turn, there are at least 4 complete towers on the board.",
  },
  {
    id: "hades",
    name: "Hades",
    expansion: "underworld",
    row: 0,
    col: 4,
    bgaSlug: "Hades",
    description:
      "Opponent's Turn: Opponent workers cannot move down to lower levels.",
  },
  {
    id: "hecate",
    name: "Hecate",
    expansion: "underworld",
    row: 0,
    col: 5,
    bgaSlug: "Hecate",
    description:
      "Setup: Hide the mini-map behind the shield. After others place their workers, your workers are placed as secret worker markers on the mini-map. Your Turn: Move a worker marker on the mini-map as if it were a worker on the board. Build on the board, as normal. If an opponent's attempted play is not legal because of your secret workers, that play is cancelled and their turn ends.",
  },
  {
    id: "hypnus",
    name: "Hypnus",
    expansion: "underworld",
    row: 0,
    col: 6,
    bgaSlug: "Hypnus",
    description:
      "Start of Opponent's Turn: If one of the opponent's workers is at a higher level than all of their others, that worker cannot move.",
  },
  {
    id: "mnemosyne",
    name: "Mnemosyne",
    expansion: "underworld",
    row: 1,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Hide the mini-map with 2 worker markers beside it using the shield. End of Your Turn: You may either secretly record the position of both your workers on the mini-map, or reveal the mini-map and force as many of your workers as possible to those recorded positions.",
  },
  {
    id: "moerae",
    name: "Moerae",
    expansion: "underworld",
    row: 1,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Hide the mini-map behind the shield, then secretly place the fate marker so it covers a 2x2 square of spaces. Place 3 workers of your color. Alternative Win Condition: If an opponent wins and their last move was into one of the fate marker spaces, you win instead.",
  },
  {
    id: "morpheus",
    name: "Morpheus",
    expansion: "underworld",
    row: 1,
    col: 3,
    bgaSlug: "Morpheus",
    description:
      "Setup: Form a supply of 8 dream tokens. Start of Your Turn: Collect a dream token (max 8). Your Build: Your moved worker does not build as normal. Instead, any number of times (even zero) you may spend a dream token to build with this worker.",
  },
  {
    id: "nemesis",
    name: "Nemesis",
    expansion: "underworld",
    row: 1,
    col: 4,
    bgaSlug: "Nemesis",
    description:
      "End of Your Turn: If one of your opponents has no workers neighboring your workers, you may swap spaces with that opponent (the workers are forced). If your chosen opponent has a different number of workers than you, you choose which ones are swapped.",
  },
  {
    id: "orpheus-eurydice",
    name: "Orpheus & Eurydice",
    expansion: "underworld",
    row: 1,
    col: 5,
    bgaSlug: null, // No BGA guide page exists for Orpheus & Eurydice
    description:
      "Setup: Place a male and a female worker of your color. End of Turn: If you moved your male worker to a space at a higher level than your female worker this turn, you may move and build with your female worker.",
  },
  {
    id: "persephone",
    name: "Persephone",
    expansion: "underworld",
    row: 1,
    col: 6,
    bgaSlug: "Persephone",
    description:
      "Opponent's Turn: At least one worker must move up a level this turn if possible.",
  },
  {
    id: "phobos",
    name: "Phobos",
    expansion: "underworld",
    row: 2,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "End of Your Turn: You may force an opponent's worker neighboring your unmoved worker one space directly away from it at any level, as long as that space is unoccupied.",
  },
  {
    id: "sisyphus",
    name: "Sisyphus",
    expansion: "underworld",
    row: 2,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Place the boulder and your workers in unoccupied spaces. The boulder's space is frozen. End of Your Turn: If at least one of your workers neighbors the boulder, you may move it (like a worker). Alternative Win Condition: You also win if the boulder reaches the third level.",
  },
  {
    id: "tartarus",
    name: "Tartarus",
    expansion: "underworld",
    row: 2,
    col: 3,
    bgaSlug: "Tartarus",
    description:
      "Setup: Players place their workers in clockwise order starting with you. Hide the mini-map behind the shield. Choose an unoccupied space and secretly mark it on the mini-map using the Abyss marker. Loss condition: If anyone's worker enters the Abyss, that player loses immediately.",
  },
  {
    id: "typhon",
    name: "Typhon",
    expansion: "underworld",
    row: 2,
    col: 4,
    bgaSlug: null, // No BGA guide page
    description:
      "Alternative Moves (optional): Titanic Heave: After you move, if a dome neighbors your vacated space, you may force the dome into that space. OR Mighty Leap: Your worker may force itself onto a dome's space (at any height). The dome is then forced one space in the same direction, to an unoccupied space at any level.",
  },
  {
    id: "arachne",
    name: "Arachne",
    expansion: "underworld",
    row: 2,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Setup: Place 8 weave tokens on this card. End of Your Turn: You may take a weave token and place it on an unoccupied neighboring space at the same or lower level as your unmoved worker. Weave tokens are returned when built upon. Opponent's Move: Opponent workers cannot move out of spaces with weave tokens on them.",
  },
];

export interface Matchup {
  ids: [string, string];
  // expansions required for both powers — used to filter when active expansions change
  expansions: [ExpansionId, ExpansionId];
}

export const MATCHUPS: Matchup[] = [
  // 🔰 Beginner (easy and fair)
  { ids: ["artemis", "demeter"], expansions: ["base", "base"] },
  { ids: ["apollo", "minotaur"], expansions: ["base", "base"] },
  { ids: ["athena", "hermes"], expansions: ["base", "olympus"] },

  // ⚖️ Intermediate (well balanced)
  { ids: ["poseidon-god", "pegasus"], expansions: ["poseidon", "base"] },
  { ids: ["hestia", "morpheus"], expansions: ["chaos", "underworld"] },
  { ids: ["demeter", "hestia"], expansions: ["base", "chaos"] },

  // 🧠 Strategic (skill-dependent)
  { ids: ["athena", "minotaur"], expansions: ["base", "base"] },
  { ids: ["apollo", "artemis"], expansions: ["base", "base"] },
  { ids: ["prometheus", "atlas"], expansions: ["chaos", "base"] },

  // 🔥 Advanced (strong but playable)
  { ids: ["pan", "athena"], expansions: ["base", "base"] },
  { ids: ["chronus", "demeter"], expansions: ["underworld", "base"] },
  { ids: ["atlas", "hephaestus"], expansions: ["base", "poseidon"] },

  // Personal list
  { ids: ["demeter", "hera"], expansions: ["base", "base"] },
  { ids: ["demeter", "hephaestus"], expansions: ["base", "poseidon"] },
  { ids: ["minotaur", "asteria"], expansions: ["base", "base"] },
  { ids: ["athena", "ares"], expansions: ["base", "poseidon"] }, // noted as less fun
  { ids: ["artemis", "minotaur"], expansions: ["base", "base"] },
  { ids: ["zeus", "pegasus"], expansions: ["base", "base"] },
  { ids: ["zeus", "aphrodite"], expansions: ["base", "base"] },
  { ids: ["zeus", "castor-pollux"], expansions: ["base", "base"] },
  { ids: ["medusa", "bia"], expansions: ["base", "base"] },
  { ids: ["bia", "maenads"], expansions: ["base", "chaos"] },
  { ids: ["prometheus", "terpsichore"], expansions: ["chaos", "chaos"] },
  { ids: ["iris", "hephaestus"], expansions: ["base", "poseidon"] },
  { ids: ["iris", "pegasus"], expansions: ["base", "base"] },
  { ids: ["apollo", "triton"], expansions: ["base", "base"] },
  { ids: ["triton", "demeter"], expansions: ["base", "base"] },
  { ids: ["pan", "europa-talus"], expansions: ["base", "olympus"] },
  { ids: ["eris", "europa-talus"], expansions: ["base", "olympus"] },
  { ids: ["limus", "poseidon-god"], expansions: ["base", "poseidon"] },
  { ids: ["selene", "atlas"], expansions: ["olympus", "base"] },
  { ids: ["urania", "hydra"], expansions: ["chaos", "chaos"] },
  { ids: ["selene", "zeus"], expansions: ["olympus", "base"] },
  { ids: ["artemis", "poseidon-god"], expansions: ["base", "poseidon"] },
  { ids: ["proteus", "minotaur"], expansions: ["poseidon", "base"] },
  { ids: ["proteus", "asteria"], expansions: ["poseidon", "base"] },
  { ids: ["hades", "triton"], expansions: ["underworld", "base"] }, // Hades sucks, Triton OP — balances out!
  { ids: ["hades", "iris"], expansions: ["underworld", "base"] },
  { ids: ["morpheus", "terpsichore"], expansions: ["underworld", "chaos"] },
  { ids: ["gaea", "bia"], expansions: ["poseidon", "base"] },
];
