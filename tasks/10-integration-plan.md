# Task: Final App Integration (Task 10)

**Goal**: Transform `App.tsx` into a central hub that manages the active `Lesson` state, toggles between `LessonBuilder` and `LessonPlayer`, and supports a comprehensive export.

## Requirements:

1.  **Refactor `LessonBuilder.tsx`**:
    - Remove internal `lesson` state.
    - Accept `lesson: Lesson` and `onLessonChange: (lesson: Lesson) => void` as props.
    - Update all internal modification handlers (`addModule`, `deleteModule`, `moveModule...`, `handleModuleChange`) to call `onLessonChange` instead of `setLesson`.

2.  **Update `App.tsx`**:
    - Import `LessonBuilder` and `LessonPlayer`.
    - Manage `currentLesson` state at the root level.
    - Manage `viewMode` state: `'edit' | 'preview'`.
    - **UI Frame**:
      - Top Navigation Bar with:
        - Tabs/Buttons for "Edit" and "Preview".
        - "Download Lesson JSON" button.
        - A separate section (maybe collapsible) for the "Vocab Inventory" (the existing `VocabFindCreate` and "Current Selection" list).
    - **Export Logic**:
      - Implement `exportLesson()`:
        - Access `vocabItems` from `VocabContext`.
        - Construct a bundle: `{ lesson: currentLesson, vocab: vocabItems }`.
        - Trigger a browser download of a `.json` file.
    - **Conditional Rendering**:
      - Switch between `<LessonBuilder lesson={currentLesson} onLessonChange={setCurrentLesson} />` and `<LessonPlayer lesson={currentLesson} />`.

3.  **Refine `LessonPlayer.tsx`**:
    - Ensure it receives the `lesson` prop correctly from the root.
