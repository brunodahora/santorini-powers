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
      "Your Workers move into unoccupied spaces; if a Worker moves next to an opponent's Worker, that opponent's Worker is pushed to the space directly behind it.",
  },
  {
    id: "apollo",
    name: "Apollo",
    expansion: "base",
    row: 0,
    col: 2,
    bgaSlug: "Apollo",
    description:
      "Your Worker may move into an opponent Worker's space by forcing their Worker to the space yours just vacated.",
  },
  {
    id: "artemis",
    name: "Artemis",
    expansion: "base",
    row: 0,
    col: 3,
    bgaSlug: "Artemis",
    description:
      "Your Worker may move one additional time, but not back to its initial space.",
  },
  {
    id: "asteria",
    name: "Asteria",
    expansion: "base",
    row: 0,
    col: 4,
    bgaSlug: "Asteria",
    description:
      "If your Worker does not move up, it may build both before and after moving.",
  },
  {
    id: "atalanta",
    name: "Atalanta",
    expansion: "base",
    row: 0,
    col: 5,
    bgaSlug: "Atalanta",
    description:
      "Your Workers can move any number of times, but each space can only be entered once per turn.",
  },
  {
    id: "athena",
    name: "Athena",
    expansion: "base",
    row: 0,
    col: 6,
    bgaSlug: "Athena",
    description:
      "During opponent's turns: If one of your Workers moved up on your last turn, opponent Workers cannot move up this turn.",
  },
  {
    id: "atlas",
    name: "Atlas",
    expansion: "base",
    row: 0,
    col: 7,
    bgaSlug: "Atlas",
    description: "Your Worker may build a dome at any level.",
  },
  {
    id: "aurae",
    name: "Aurae",
    expansion: "base",
    row: 0,
    col: 8,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, when a Worker is forced to move, you may move one of your Workers to any unoccupied space.",
  },
  {
    id: "bellerophon",
    name: "Bellerophon",
    expansion: "base",
    row: 1,
    col: 1,
    bgaSlug: "Bellerophon",
    description: "Your Workers can move up two levels instead of one.",
  },
  {
    id: "bia",
    name: "Bia",
    expansion: "base",
    row: 1,
    col: 2,
    bgaSlug: "Bia",
    description:
      "If your Worker moves into a space occupied by an opponent's Worker, remove that Worker from the game.",
  },
  {
    id: "castor-pollux",
    name: "Castor & Pollux",
    expansion: "base",
    row: 1,
    col: 3,
    bgaSlug: "Castor",
    description:
      "You control three Workers. Each turn, move and build with any two of them.",
  },
  {
    id: "demeter",
    name: "Demeter",
    expansion: "base",
    row: 1,
    col: 4,
    bgaSlug: "Demeter",
    description:
      "Your Worker may build one additional time, but not on the same space.",
  },
  {
    id: "dionysus",
    name: "Dionysus",
    expansion: "base",
    row: 1,
    col: 5,
    bgaSlug: "Dionysus",
    description:
      "Each time an opponent's Worker moves, you may move one of your Workers.",
  },
  {
    id: "dryads",
    name: "Dryads",
    expansion: "base",
    row: 1,
    col: 6,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, your Worker may move to any unoccupied space at the same level.",
  },
  {
    id: "eris",
    name: "Eris",
    expansion: "base",
    row: 1,
    col: 7,
    bgaSlug: "Eris",
    description:
      "Once per turn, when you build, you may also build on any space occupied by an opponent's Worker, sending it back to ground level.",
  },
  {
    id: "eros",
    name: "Eros",
    expansion: "base",
    row: 1,
    col: 8,
    bgaSlug: "Eros",
    description:
      "You also win if both your Workers move to spaces that are adjacent to each other and both on level 1.",
  },
  {
    id: "hera",
    name: "Hera",
    expansion: "base",
    row: 2,
    col: 1,
    bgaSlug: "Hera",
    description: "Opponent Workers cannot win by moving to a perimeter space.",
  },
  {
    id: "iris",
    name: "Iris",
    expansion: "base",
    row: 2,
    col: 2,
    bgaSlug: "Iris",
    description:
      "Your Worker may move any number of spaces in one direction, but not over or onto occupied spaces.",
  },
  {
    id: "limus",
    name: "Limus",
    expansion: "base",
    row: 2,
    col: 3,
    bgaSlug: "Limus",
    description:
      "Opponent Workers cannot build on spaces neighboring your Workers, unless building a dome to create a Complete Tower.",
  },
  {
    id: "medusa",
    name: "Medusa",
    expansion: "base",
    row: 2,
    col: 4,
    bgaSlug: "Medusa",
    description:
      "At the end of your turn, if any of your Workers are on a lower level than a neighboring opponent Worker, replace the opponent Worker with a block.",
  },
  {
    id: "metis",
    name: "Metis",
    expansion: "base",
    row: 2,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, after an opponent moves, you may move one of your Workers.",
  },
  {
    id: "minotaur",
    name: "Minotaur",
    expansion: "base",
    row: 2,
    col: 6,
    bgaSlug: "Minotaur",
    description:
      "Your Worker may move into an opponent Worker's space, if their Worker can be forced one space straight backwards to an unoccupied space at any level.",
  },
  {
    id: "oceanids",
    name: "Oceanids",
    expansion: "base",
    row: 2,
    col: 7,
    bgaSlug: null, // No BGA guide page
    description:
      "Your Workers may build on spaces occupied by opponent Workers, sending them back to ground level.",
  },
  {
    id: "oceanus",
    name: "Oceanus",
    expansion: "base",
    row: 2,
    col: 8,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, your Worker may move to any unoccupied perimeter space.",
  },
  {
    id: "oreads",
    name: "Oreads",
    expansion: "base",
    row: 3,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "At the start of the game, place one mountain (3 blocks and a dome) anywhere on the board.",
  },
  {
    id: "pan",
    name: "Pan",
    expansion: "base",
    row: 3,
    col: 2,
    bgaSlug: "Pan",
    description: "You also win if your Worker moves down two or more levels.",
  },
  {
    id: "pegasus",
    name: "Pegasus",
    expansion: "base",
    row: 3,
    col: 3,
    bgaSlug: "Pegasus",
    description:
      "Your Workers are not blocked by domes when moving; they may fly over domes to land on the other side.",
  },
  {
    id: "perseus",
    name: "Perseus",
    expansion: "base",
    row: 3,
    col: 4,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, your Worker may build before moving instead of after.",
  },
  {
    id: "polyphemus",
    name: "Polyphemus",
    expansion: "base",
    row: 3,
    col: 5,
    bgaSlug: "Polyphemus",
    description:
      "Your Workers can move up any number of levels instead of just one.",
  },
  {
    id: "scylla",
    name: "Scylla",
    expansion: "base",
    row: 3,
    col: 6,
    bgaSlug: "Scylla",
    description:
      "Once per turn, after building, you may remove any block (not dome) from the board.",
  },
  {
    id: "triton",
    name: "Triton",
    expansion: "base",
    row: 3,
    col: 7,
    bgaSlug: "Triton",
    description:
      "Each time your Worker moves to a perimeter space, it may immediately move again.",
  },
  {
    id: "zeus",
    name: "Zeus",
    expansion: "base",
    row: 3,
    col: 8,
    bgaSlug: "Zeus",
    description: "Your Worker may build under itself, moving up one level.",
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
      "At the start of your turn, you may move one block from any space to an unoccupied space.",
  },
  {
    id: "antaeus",
    name: "Antaeus",
    expansion: "chaos",
    row: 0,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description: "Your Workers cannot be moved by opponent powers.",
  },
  {
    id: "asklepios",
    name: "Asklepios",
    expansion: "chaos",
    row: 0,
    col: 3,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, after building, you may place a token on the built space. Spaces with tokens cannot be built upon.",
  },
  {
    id: "graeae",
    name: "Graeae",
    expansion: "chaos",
    row: 0,
    col: 4,
    bgaSlug: "Graeae",
    description:
      "You control three Workers. At the start of your turn, pass one Worker to your opponent; they must use it this turn.",
  },
  {
    id: "hestia",
    name: "Hestia",
    expansion: "chaos",
    row: 0,
    col: 5,
    bgaSlug: "Hestia",
    description:
      "Your Worker may build one additional time, but only on a space not neighboring your other Worker.",
  },
  {
    id: "hydra",
    name: "Hydra",
    expansion: "chaos",
    row: 0,
    col: 6,
    bgaSlug: "Hydra",
    description:
      "Each time one of your Workers is removed from the board, place two new Workers on unoccupied spaces.",
  },
  {
    id: "jason",
    name: "Jason",
    expansion: "chaos",
    row: 1,
    col: 1,
    bgaSlug: "Jason",
    description:
      "Once per turn, your Worker may move to any unoccupied space on the board.",
  },
  {
    id: "khione",
    name: "Khione",
    expansion: "chaos",
    row: 1,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, after building, you may place a dome on any unoccupied space at any level.",
  },
  {
    id: "kratos",
    name: "Kratos",
    expansion: "chaos",
    row: 1,
    col: 3,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, you may remove an opponent's Worker from the board and place it on any unoccupied space.",
  },
  {
    id: "maenads",
    name: "Maenads",
    expansion: "chaos",
    row: 1,
    col: 4,
    bgaSlug: "Maenads",
    description:
      "Each time an opponent builds, you may move one of your Workers.",
  },
  {
    id: "medea",
    name: "Medea",
    expansion: "chaos",
    row: 1,
    col: 5,
    bgaSlug: "Medea",
    description:
      "Once per turn, after moving, you may remove a block from any space neighboring your Worker.",
  },
  {
    id: "prometheus",
    name: "Prometheus",
    expansion: "chaos",
    row: 1,
    col: 6,
    bgaSlug: "Prometheus",
    description:
      "If your Worker does not move up, it may build both before and after moving.",
  },
  {
    id: "terpsichore",
    name: "Terpsichore",
    expansion: "chaos",
    row: 2,
    col: 1,
    bgaSlug: "Terpsichore",
    description: "All your Workers must move, then all must build.",
  },
  {
    id: "theseus",
    name: "Theseus",
    expansion: "chaos",
    row: 2,
    col: 2,
    bgaSlug: "Theseus",
    description:
      "Once per turn, your Worker may move to any unoccupied space that is not on the perimeter.",
  },
  {
    id: "tyche",
    name: "Tyche",
    expansion: "chaos",
    row: 2,
    col: 3,
    bgaSlug: "Tyche",
    description:
      "At the start of your turn, roll a die to determine a special action you may take this turn.",
  },
  {
    id: "urania",
    name: "Urania",
    expansion: "chaos",
    row: 2,
    col: 4,
    bgaSlug: "Urania",
    description:
      "Your Workers can move to any unoccupied space, regardless of level difference.",
  },
  {
    id: "pandora",
    name: "Pandora",
    expansion: "chaos",
    row: 2,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, you may use the power of any god card that has been removed from the game.",
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
      "Once per turn, you may move any one block to an unoccupied neighboring space at the same level.",
  },
  {
    id: "aloadae",
    name: "Aloadae",
    expansion: "olympus",
    row: 0,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description: "Your Workers can move up two levels instead of one.",
  },
  {
    id: "boreas",
    name: "Boreas",
    expansion: "olympus",
    row: 0,
    col: 3,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, after moving, you may push an opponent's neighboring Worker one space away.",
  },
  {
    id: "daedalus",
    name: "Daedalus",
    expansion: "olympus",
    row: 0,
    col: 4,
    bgaSlug: null, // No BGA guide page
    description: "Your Worker may build any number of times on the same space.",
  },
  {
    id: "eirene",
    name: "Eirene",
    expansion: "olympus",
    row: 0,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Opponent Workers cannot move to spaces neighboring both of your Workers.",
  },
  {
    id: "europa-talus",
    name: "Europa & Talus",
    expansion: "olympus",
    row: 0,
    col: 6,
    bgaSlug: "Europa",
    description:
      "You control three Workers. After moving, the unmoved Worker may build.",
  },
  {
    id: "harpies",
    name: "Harpies",
    expansion: "olympus",
    row: 1,
    col: 1,
    bgaSlug: "Harpies",
    description:
      "Once per turn, after an opponent moves, you may move one of your Workers to any unoccupied space.",
  },
  {
    id: "helios",
    name: "Helios",
    expansion: "olympus",
    row: 1,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "Your Workers may move to any unoccupied space on the same level.",
  },
  {
    id: "heracles",
    name: "Heracles",
    expansion: "olympus",
    row: 1,
    col: 3,
    bgaSlug: "Heracles",
    description:
      "Once per turn, your Worker may build a dome at any level, but you cannot win this turn.",
  },
  {
    id: "hermes",
    name: "Hermes",
    expansion: "olympus",
    row: 1,
    col: 4,
    bgaSlug: "Hermes",
    description:
      "If your Workers do not move up or down, they may each move any number of times.",
  },
  {
    id: "hesperides",
    name: "Hesperides",
    expansion: "olympus",
    row: 1,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, after building, you may move a block from any space to an unoccupied space.",
  },
  {
    id: "nike",
    name: "Nike",
    expansion: "olympus",
    row: 1,
    col: 6,
    bgaSlug: null, // No BGA guide page
    description:
      "Each time you win, you gain a victory token. The first player to 3 tokens wins the match.",
  },
  {
    id: "pleiades",
    name: "Pleiades",
    expansion: "olympus",
    row: 2,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "You control seven Workers, one per space in a column. Each turn, move and build with any one.",
  },
  {
    id: "polyhymnia",
    name: "Polyhymnia",
    expansion: "olympus",
    row: 2,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, after building, you may move one of your Workers to any unoccupied space.",
  },
  {
    id: "selene",
    name: "Selene",
    expansion: "olympus",
    row: 2,
    col: 3,
    bgaSlug: "Selene",
    description:
      "Once per turn, your Worker may build a dome on any level, but only at night (odd turns).",
  },
  {
    id: "stymphalians",
    name: "Stymphalians",
    expansion: "olympus",
    row: 2,
    col: 4,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, after moving, you may remove all blocks from a neighboring space.",
  },
  {
    id: "gryphus",
    name: "Gryphus",
    expansion: "olympus",
    row: 2,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Your Workers may move to any unoccupied space up to 2 spaces away, ignoring level restrictions.",
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
      "Once per turn, after moving, you may move an opponent's Worker one space.",
  },
  {
    id: "achilles",
    name: "Achilles",
    expansion: "poseidon",
    row: 0,
    col: 2,
    bgaSlug: "Achilles",
    description: "Your Worker may move and build up to two times each turn.",
  },
  {
    id: "ares",
    name: "Ares",
    expansion: "poseidon",
    row: 0,
    col: 3,
    bgaSlug: "Ares",
    description:
      "After your turn, remove a block from any space your unmoved Worker neighbors.",
  },
  {
    id: "charybdis",
    name: "Charybdis",
    expansion: "poseidon",
    row: 0,
    col: 4,
    bgaSlug: "Charybdis",
    description:
      "Once per turn, you may swap the positions of any two blocks on the board.",
  },
  {
    id: "clio",
    name: "Clio",
    expansion: "poseidon",
    row: 0,
    col: 5,
    bgaSlug: "Clio",
    description:
      "Once per turn, after building, you may place a token on the built space granting a special ability.",
  },
  {
    id: "echo",
    name: "Echo",
    expansion: "poseidon",
    row: 0,
    col: 6,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, you may copy the power of an opponent's god for this turn.",
  },
  {
    id: "enodia",
    name: "Enodia",
    expansion: "poseidon",
    row: 1,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "Your Workers may move to any unoccupied space on the perimeter.",
  },
  {
    id: "gaea",
    name: "Gaea",
    expansion: "poseidon",
    row: 1,
    col: 2,
    bgaSlug: "Gaea",
    description:
      "Once per turn, after building, you may place an additional block on any unoccupied space.",
  },
  {
    id: "hephaestus",
    name: "Hephaestus",
    expansion: "poseidon",
    row: 1,
    col: 3,
    bgaSlug: "Hephaestus",
    description:
      "Your Worker may build one additional block on top of your first block, but not on a space at the third level.",
  },
  {
    id: "hippolyta",
    name: "Hippolyta",
    expansion: "poseidon",
    row: 1,
    col: 4,
    bgaSlug: "Hippolyta",
    description:
      "Once per turn, after moving, you may remove an opponent's Worker from a neighboring space.",
  },
  {
    id: "melpomene",
    name: "Melpomene",
    expansion: "poseidon",
    row: 1,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, you may move a block from any space to an unoccupied neighboring space.",
  },
  {
    id: "moros",
    name: "Moros",
    expansion: "poseidon",
    row: 1,
    col: 6,
    bgaSlug: null, // No BGA guide page
    description:
      "At the start of your turn, place a doom token on an opponent's Worker. If that Worker ends a turn on level 2 or higher, remove it.",
  },
  {
    id: "odysseus",
    name: "Odysseus",
    expansion: "poseidon",
    row: 2,
    col: 1,
    bgaSlug: "Odysseus",
    description:
      "Once per turn, force an opponent's Worker to move to any unoccupied space.",
  },
  {
    id: "proteus",
    name: "Proteus",
    expansion: "poseidon",
    row: 2,
    col: 2,
    bgaSlug: "Proteus",
    description:
      "Once per turn, you may change your god power to any other god in play.",
  },
  {
    id: "pythia",
    name: "Pythia",
    expansion: "poseidon",
    row: 2,
    col: 3,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, look at the top card of the god deck and optionally place it at the bottom.",
  },
  {
    id: "siren",
    name: "Siren",
    expansion: "poseidon",
    row: 2,
    col: 4,
    bgaSlug: "Siren",
    description:
      "Once per turn, you may move an opponent's Worker to any unoccupied space neighboring your Worker.",
  },
  {
    id: "poseidon-god",
    name: "Poseidon",
    expansion: "poseidon",
    row: 2,
    col: 5,
    bgaSlug: "Poseidon",
    description:
      "If your unmoved Worker is on the ground level, it may build up to three times.",
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
      "Each time an opponent's Worker moves, it must move to a space neighboring one of your Workers if possible.",
  },
  {
    id: "charon",
    name: "Charon",
    expansion: "underworld",
    row: 0,
    col: 2,
    bgaSlug: "Charon",
    description:
      "Before your Worker moves, you may force a neighboring opponent Worker to the space directly on the other side of your Worker.",
  },
  {
    id: "chronus",
    name: "Chronus",
    expansion: "underworld",
    row: 0,
    col: 3,
    bgaSlug: "Chronus",
    description:
      "You also win when there are at least five Complete Towers on the board.",
  },
  {
    id: "hades",
    name: "Hades",
    expansion: "underworld",
    row: 0,
    col: 4,
    bgaSlug: "Hades",
    description:
      "Opponent Workers cannot build blocks on spaces at a lower level than the space they moved from.",
  },
  {
    id: "hecate",
    name: "Hecate",
    expansion: "underworld",
    row: 0,
    col: 5,
    bgaSlug: "Hecate",
    description:
      "Once per turn, after building, you may move a block from any space to any other unoccupied space.",
  },
  {
    id: "hypnus",
    name: "Hypnus",
    expansion: "underworld",
    row: 0,
    col: 6,
    bgaSlug: "Hypnus",
    description:
      "Once per turn, you may put an opponent's Worker to sleep; it cannot move next turn.",
  },
  {
    id: "mnemosyne",
    name: "Mnemosyne",
    expansion: "underworld",
    row: 1,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, you may swap the positions of your two Workers.",
  },
  {
    id: "moerae",
    name: "Moerae",
    expansion: "underworld",
    row: 1,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "At the start of your turn, you may move any one block to an unoccupied space.",
  },
  {
    id: "morpheus",
    name: "Morpheus",
    expansion: "underworld",
    row: 1,
    col: 3,
    bgaSlug: "Morpheus",
    description:
      "Once per turn, you may move an opponent's Worker to any unoccupied space.",
  },
  {
    id: "nemesis",
    name: "Nemesis",
    expansion: "underworld",
    row: 1,
    col: 4,
    bgaSlug: "Nemesis",
    description:
      "If an opponent has more Workers on higher levels than you, you may move one of their Workers down one level.",
  },
  {
    id: "orpheus-eurydice",
    name: "Orpheus & Eurydice",
    expansion: "underworld",
    row: 1,
    col: 5,
    bgaSlug: null, // No BGA guide page exists for Orpheus & Eurydice
    description:
      "You control three Workers. If one of your Workers is removed, you may place it back on any unoccupied space.",
  },
  {
    id: "persephone",
    name: "Persephone",
    expansion: "underworld",
    row: 1,
    col: 6,
    bgaSlug: "Persephone",
    description: "Other players must move up whenever possible.",
  },
  {
    id: "phobos",
    name: "Phobos",
    expansion: "underworld",
    row: 2,
    col: 1,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, after moving, opponent Workers neighboring your Worker cannot build this turn.",
  },
  {
    id: "sisyphus",
    name: "Sisyphus",
    expansion: "underworld",
    row: 2,
    col: 2,
    bgaSlug: null, // No BGA guide page
    description:
      "Your Workers can always move up, even if the level difference is more than one.",
  },
  {
    id: "tartarus",
    name: "Tartarus",
    expansion: "underworld",
    row: 2,
    col: 3,
    bgaSlug: "Tartarus",
    description:
      "Once per turn, you may banish an opponent's Worker to an isolated space for one turn.",
  },
  {
    id: "typhon",
    name: "Typhon",
    expansion: "underworld",
    row: 2,
    col: 4,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, you may move all opponent Workers one space in the same direction.",
  },
  {
    id: "arachne",
    name: "Arachne",
    expansion: "underworld",
    row: 2,
    col: 5,
    bgaSlug: null, // No BGA guide page
    description:
      "Once per turn, after building, you may place a web token on a neighboring space. Workers cannot move through web spaces.",
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
