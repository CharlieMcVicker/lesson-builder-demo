Create a new file `src/components/MatchModulePlayer.tsx` and update related files.

You must:

1. Update `src/components/LessonPlayer.tsx`:
   - Remove the `MatchModulePlayer` placeholder component definition.
   - Import `MatchModulePlayer` from `./MatchModulePlayer`.

2. Create `src/components/MatchModulePlayer.tsx`:
   - Import `React, { useState, useEffect }` from `react`.
   - Import `Module` from `../types/lesson`.
   - Props: `module: Extract<Module, { type: 'match' }>` and `onComplete: () => void`.
   - Initialize state:
     - `matchedIds`: `string[]` (IDs of correctly matched pairs).
     - `selectedFront`: `string | null` (ID of selected front item).
     - `selectedBack`: `string | null` (ID of selected back item).
     - `errorPair`: `[string, string] | null` (Pair of IDs that were incorrectly matched, for showing error flash).
     - `shuffledFront`: Array of items, shuffled once on mount.
     - `shuffledBack`: Array of items, shuffled once on mount.
   - Item structure for shuffled lists should include the original `id` and the `text` (derived from `vocabItem[module.data.config.front]` or `...back`).
   - Use a simple shuffle algorithm (e.g., `sort(() => Math.random() - 0.5)`).
   - Effect: When both `selectedFront` and `selectedBack` are not null:
     - If they match (`selectedFront === selectedBack`), add the ID to `matchedIds`, clear selections.
     - If they don't match, set `errorPair` to `[selectedFront, selectedBack]`, clear selections, and set a timeout (e.g., 800ms) to clear `errorPair`.
   - Render:
     - Two columns (e.g., flex container with two flex-1 columns).
     - Left column maps over `shuffledFront`. Render a button for each.
     - Right column maps over `shuffledBack`. Render a button for each.
     - Styling for buttons:
       - Default outline.
       - If `matchedIds.includes(id)`, style as disabled/faded out or hidden.
       - If `selectedFront === id` or `selectedBack === id`, style as selected (e.g., blue highlight).
       - If `errorPair` includes `id`, style as error (e.g., red highlight).
     - If `matchedIds.length === module.data.data.length`, render a "Perfect Match!" message and a "Continue" button that calls `onComplete`.
