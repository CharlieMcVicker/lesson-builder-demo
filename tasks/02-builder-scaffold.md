# Task: Lesson Builder Scaffold

**Phase**: 2
**Goal**: Implement the outer shell of the Lesson Builder UI that allows users to manage a list of modules in "edit mode".

## Requirements:

- [ ] Create a `LessonBuilder` component (`src/components/LessonBuilder.tsx`).
- [ ] Add state management (e.g., `useState` or a Context) for the `Lesson`'s sequence of modules.
- [ ] Implement a UI button/dropdown at the bottom to add new modules of specific types.
- [ ] Implement UI controls on each module card to reorder (move up/down) or delete the module.
- [ ] Depending on the module's discriminator (`module.type`), render placeholder sub-components (like `MatchModuleForm`) and pass down edit callbacks.
