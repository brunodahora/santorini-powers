# Requirements Document

## Introduction

The Santorini Power Randomizer is a mobile-friendly web application built with Vite, React, TypeScript, TanStack Router, and Shadcn/ui. It helps players of the board game Santorini randomly select god powers for each game session. The app supports three selection modes: single power (for split-screen/second-device play), two random powers, and a curated matchup. It displays power cards using sprite images from the local `/public/img` folder, styled after the Pantheon edition color palette (deep blues, golds, and warm whites).

## Glossary

- **App**: The Santorini Power Randomizer web application
- **Power**: A Santorini god power card, identified by name and associated sprite image
- **Expansion**: A named set of god powers corresponding to one of the five available sets: Base Powers, Seasons of Chaos, Soaring over Olympus, Tides of Poseidon, and Hiding in the Underworld
- **Active_Expansions**: The set of Expansions currently enabled by the user in the Settings_Screen
- **Matchup**: A pre-defined, curated pair of powers known to create an interesting or balanced game
- **Power_Card**: The visual representation of a single power, showing its name and sprite image
- **Selection_Screen**: The initial screen where the user chooses a randomization mode
- **Settings_Screen**: A screen where the user configures which Expansions are included in the power pool
- **Result_Screen**: The screen displayed after randomization, showing the selected power(s)
- **Randomizer**: The logic component responsible for selecting powers at random
- **Sprite**: A power's image loaded from the `/public/img/` folder

## Requirements

### Requirement 1: Selection Screen

**User Story:** As a player, I want to see a clear home screen with selection options, so that I can quickly choose how to randomize powers before a game.

#### Acceptance Criteria

1. THE App SHALL display a Selection_Screen as the initial view when loaded.
2. THE Selection_Screen SHALL display the title image from `/public/img/title.png` at the top of the screen, scaled to fit the available width while preserving its aspect ratio.
3. THE Selection_Screen SHALL display the box art image from `/public/img/box.webp` below the title on desktop viewports, scaled to fit the screen width while preserving its aspect ratio.
4. ON mobile viewports, THE Selection_Screen SHALL hide the box art image and show only the title and action buttons.
5. THE Selection_Screen SHALL present exactly four action buttons in this order: "Pick One Power", "Pick Two Powers", "Random Matchup", and "Others".
6. WHEN the user activates the "Others" button, THE App SHALL navigate to an Others_Screen displaying three action buttons: "Browse Gods", "Game Modes", and "Settings".
7. THE Others_Screen SHALL follow the same visual style as the Selection_Screen.
7. THE App SHALL persist the Active_Expansions selection in localStorage so it is restored on subsequent visits.

---

### Requirement 2: Settings Screen

**User Story:** As a player, I want to choose which expansion sets are included in the power pool, so that I only randomize from the gods I own.

#### Acceptance Criteria

1. THE App SHALL provide a Settings_Screen accessible from the Others_Screen.
2. THE Settings_Screen SHALL display the five available Expansions: Base Powers, Seasons of Chaos, Soaring over Olympus, Tides of Poseidon, and Hiding in the Underworld.
3. EACH Expansion entry SHALL display its corresponding image from `/public/img/` (`base_powers.webp`, `olympus.webp`, `poseidon.webp`, `underworld.webp`, `chaos.webp`) alongside its name.
4. THE user SHALL be able to toggle each Expansion on or off independently.
5. THE Base Expansion SHALL be enabled by default; all other Expansions SHALL be disabled by default on first launch.
6. THE App SHALL persist the Active_Expansions selection in localStorage so it is restored on subsequent visits.
7. EACH Expansion entry SHALL include a link that navigates to a page showing a simple list of all god names belonging to that Expansion, where each god name is also a link that navigates to the Result_Screen displaying that god's Power_Card.
8. THE Settings_Screen SHALL provide a way to navigate back to the Selection_Screen.
9. IF the user deselects all Expansions, THE App SHALL display a warning and prevent navigation back until at least one Expansion is selected.

---

### Requirement 3: Single Power Selection

**User Story:** As a player, I want to randomly pick one power for myself, so that my opponent can pick theirs separately on another device or tab.

#### Acceptance Criteria

1. WHEN the user activates the "Pick One Power" button, THE Randomizer SHALL select exactly one power at random from the pool of powers belonging to Active_Expansions.
2. WHEN a single power is selected, THE App SHALL navigate to the Result_Screen displaying that Power_Card.

---

### Requirement 4: Two Power Selection

**User Story:** As a player, I want to randomly pick two different powers at once, so that both players have their powers assigned in one step.

#### Acceptance Criteria

1. WHEN the user activates the "Pick Two Powers" button, THE Randomizer SHALL select exactly two distinct powers at random from the pool of powers belonging to Active_Expansions.
2. WHEN two powers are selected, THE App SHALL navigate to the Result_Screen displaying both Power_Cards.
3. WHILE the Result_Screen is displayed on a desktop viewport, THE App SHALL show both Power_Cards side by side.
4. WHILE the Result_Screen is displayed on a mobile viewport, THE App SHALL show one Power_Card at a time with a swipe gesture to reveal the second Power_Card.

---

### Requirement 5: Matchup Selection

**User Story:** As a player, I want to pick from curated power matchups, so that I get a balanced and interesting game combination.

#### Acceptance Criteria

1. WHEN the user activates the "Random Matchup" button, THE Randomizer SHALL select one matchup at random from the list of curated Matchups whose both powers belong to Active_Expansions.
2. WHEN a matchup is selected, THE App SHALL navigate to the Result_Screen displaying both Power_Cards from the selected Matchup.
3. IF no Matchups exist for the current Active_Expansions configuration, THEN THE App SHALL disable the "Random Matchup" button and display a tooltip or label explaining that no matchups are available for the selected expansions.

---

### Requirement 6: Power Card Display

**User Story:** As a player, I want to see a clear visual card for each selected power, so that I can easily identify my god power and learn about it.

#### Acceptance Criteria

1. THE Power_Card front face SHALL display only the power's Sprite image sourced from the `/public/img/` folder, with no text overlay.
2. THE Power_Card SHALL scale the Sprite image to fit within the card bounds without distortion.
3. IF a Sprite image fails to load, THEN THE Power_Card SHALL display the power's name as a fallback.
4. WHEN the user taps or clicks the Power_Card, THE Power_Card SHALL animate a flip to reveal its back face.
5. THE back face of the Power_Card SHALL display the power's name, a short description of the power's ability, and a "Full Strategy" link pointing to `https://en.doc.boardgamearena.com/SantoriniPower{Name}` (e.g. `SantoriniPowerApollo` for Apollo) that opens in a new browser tab.
6. THE back face SHALL use a background color and border style that matches the stone/parchment border color of the card sprites.
7. WHEN the user taps or clicks the power's name on the back face, THE Power_Card SHALL animate a flip back to its front face.
9. WHEN the user taps or clicks anywhere on the back face (including the name), THE Power_Card SHALL animate a flip back to its front face. The "Full Strategy" link is the only exception — tapping it opens the BGA page without flipping.
10. THE flip animation SHALL use a CSS 3D card-flip transition.

---

### Requirement 7: Re-randomize and Navigation

**User Story:** As a player, I want to re-roll or go back from the result screen, so that I can get a different result or change my selection mode.

#### Acceptance Criteria

1. WHEN the Result_Screen is displayed, THE App SHALL provide a "Re-randomize" action that applies the same selection mode again with a new random result.
2. WHEN the user activates "Re-randomize", THE Randomizer SHALL produce a new random selection using the same mode and current Active_Expansions settings.
3. WHEN the Result_Screen is displayed, THE App SHALL provide a "Back" action that returns the user to the Selection_Screen.
4. WHEN the user activates "Back", THE App SHALL navigate to the Selection_Screen and preserve the current Active_Expansions state.

---

### Requirement 8: Mobile-Friendly Design

**User Story:** As a player using a phone, I want the app to be fully usable on a small screen, so that I can use it at the table without a computer.

#### Acceptance Criteria

1. THE App SHALL render correctly on viewport widths from 320px to 2560px.
2. THE App SHALL use touch-friendly tap targets of at least 44x44 CSS pixels for all interactive elements.
3. WHILE the Result_Screen is displayed on a mobile viewport with two powers, THE App SHALL use the Shadcn/ui Carousel component (powered by Embla Carousel) to enable horizontal swipe navigation between Power_Cards.
4. THE App SHALL display a visual indicator showing which Power_Card is currently visible and that another exists.

---

### Requirement 9: Visual Theme

**User Story:** As a player, I want the app to look and feel like the Santorini Pantheon edition, so that it matches the aesthetic of the game I'm playing.

#### Acceptance Criteria

1. THE App SHALL apply a color palette derived from the Santorini Pantheon edition box art, using deep ocean blues, warm golds, and off-white tones as primary colors.
2. THE App SHALL render a full-viewport background that evokes the Aegean sea from the Santorini board — a deep, rich blue with subtle wave or gradient texture — visible behind all screens.
3. THE App SHALL use the following Shadcn/ui components: Button, Card, Carousel, Checkbox, and any supporting primitives.
4. THE App SHALL apply consistent typography and spacing that evokes the Pantheon edition's visual style.

---

### Requirement 10: Power Data

**User Story:** As a developer, I want a structured data source for all powers and game modes, so that the app can reliably reference names, images, descriptions, and expansion membership.

#### Acceptance Criteria

1. THE App SHALL maintain a static data structure listing all supported powers, each with: a name, a Sprite image path, the Expansion it belongs to, and a short description of the power's ability.
2. THE App SHALL maintain a static list of curated Matchups, each referencing exactly two power names.
3. WHEN the power data is loaded, THE App SHALL validate that every Matchup references powers that exist in the power list.

---

### Requirement 11: Sprite Sheet Layout

**User Story:** As a developer, I want the sprite extraction logic to correctly map each god and game mode to its cell in the sprite sheet, so that the right image is always shown.

#### Acceptance Criteria

1. THE `base_powers.webp` sprite sheet SHALL be treated as a 4-row × 9-column grid.
2. ALL other expansion sprite sheets (`olympus.webp`, `poseidon.webp`, `underworld.webp`, `chaos.webp`) SHALL be treated as 3-row × 7-column grids.
3. FOR every expansion sprite sheet, column 0 (the first column) SHALL be reserved for Game_Mode_Cards and SHALL NOT be used as god power sprites.
4. God power sprites SHALL be extracted from columns 1 onward in each sheet.
5. THE last cell of the non-base expansion sheets (row 2, col 6) is empty and SHALL be excluded from the power list.

---

### Requirement 13: Browse Gods

**User Story:** As a player, I want to browse all available god powers and pick one manually, so that I can choose a specific god instead of relying on randomization.

#### Acceptance Criteria

1. THE "Others" screen SHALL include a "Browse Gods" button that navigates to a Gods_List_Screen.
2. WHEN the user activates the "Browse Gods" button, THE App SHALL navigate to a Gods_List_Screen.
3. THE Gods_List_Screen SHALL display all powers from Active_Expansions, showing each power's name and Sprite image as a thumbnail.
4. THE Gods_List_Screen SHALL allow the user to filter or group powers by Expansion.
5. WHEN the user selects a power from the list, THE App SHALL navigate to the Result_Screen displaying that Power_Card (including the flip interaction from Requirement 6).
6. THE Gods_List_Screen SHALL provide a "Back" action that returns the user to the Selection_Screen.

---

### Requirement 14: Game Modes

**User Story:** As a player, I want to browse available game modes and view their rule card, so that I can quickly reference the rules at the table.

#### Acceptance Criteria

1. THE "Others" screen SHALL include a "Game Modes" button that navigates to a Game_Modes_Screen.
2. WHEN the user activates the "Game Modes" button, THE App SHALL navigate to a Game_Modes_Screen.
3. THE Game_Modes_Screen SHALL display a list of all Game_Mode_Cards sourced from column 0 of the Active_Expansions sprite sheets.
4. EACH entry in the list SHALL show the game mode name and a thumbnail of its rule card.
5. WHEN the user selects a game mode from the list, THE App SHALL navigate to a Game_Mode_Detail_Screen showing the rule card image at full size.
6. THE Game_Mode_Detail_Screen SHALL provide a "Back" action that returns the user to the Game_Modes_Screen.
7. THE Game_Modes_Screen SHALL provide a "Back" action that returns the user to the Selection_Screen.

---

### Requirement 15: Shareable Result Links

**User Story:** As a player, I want to share a link to a specific result screen, so that my opponent can see the same god powers on their device.

#### Acceptance Criteria

1. THE Result_Screen URL SHALL encode the selected mode and power IDs as search params (e.g. `/result?mode=two&ids=apollo,artemis`) so the exact result is reproducible from the URL alone.
2. THE Result_Screen SHALL provide a "Share" button that copies the current URL to the clipboard.
3. WHEN the user activates the "Share" button, THE App SHALL use the Web Share API if available, falling back to `navigator.clipboard.writeText`, and display a brief confirmation (e.g. "Link copied!").
4. WHEN a user opens a shared result URL, THE App SHALL display the same Result_Screen with the same Power_Cards regardless of which expansions are currently active in their settings.
