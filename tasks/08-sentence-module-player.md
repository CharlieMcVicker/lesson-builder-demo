# Task: Sentence Module Player

**Phase**: 3
**Goal**: Build the interactive assessment UI where a user constructs a target sentence from pieces.

## Requirements:

- [ ] Create a `SentenceModulePlayer` component.
- [ ] Render the full target sentence at the top (using the configured presentation field).
- [ ] Render a randomized list of the "word-parts" in the bottom canvas area.
- [ ] Implement mechanisms (clicking parts, or ideally drag-and-drop if requested) to stage words into a placeholder assembly sequence.
- [ ] Add a "Check/Submit" button to validate the user's assembled order against the ground truth module data.
- [ ] Implement success/fail highlighting. Fire `onComplete` on success.
