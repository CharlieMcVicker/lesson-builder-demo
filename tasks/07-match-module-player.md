# Task: Match Module Player

**Phase**: 3
**Goal**: Build the interactive assessment UI for the Match Module.

## Requirements:

- [ ] Create a `MatchModulePlayer` component.
- [ ] Read the data for the module: two lists of items derived from the vocab list, representing the configured "front" and "back" formats.
- [ ] Render two interactive columns/grids and shuffle their render order.
- [ ] Implement local state for capturing user click selections (one from list A, one from list B).
- [ ] Evaluate selections: verify if the chosen pair are correctly correlated. If correct, disable them; if incorrect, show a briefly red error state.
- [ ] Fire `onComplete` when all pairs are successfully matched.
