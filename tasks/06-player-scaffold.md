# Task: Lesson Player Scaffold

**Phase**: 3
**Goal**: Implement the overarching "Player" component for presenting a complete Lesson to an end user.

## Requirements:

- [ ] Create a `LessonPlayer` component.
- [ ] Implement state tracking for the user's progress through the linear suite of `Module`s (e.g., `currentModuleIndex`).
- [ ] Provide a wrapper UI (like a header with progress bar and a main canvas area).
- [ ] Render the specific "Runtime Player" sub-components (e.g., `MatchModulePlayer`) based on the currently active module, passing it the user data and an `onComplete` advancement callback.
