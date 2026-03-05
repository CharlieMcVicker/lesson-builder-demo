# Task: Define Lesson and Module Types

**Phase**: 1
**Goal**: Create robust TypeScript union types (and potentially Zod schemas) for the overarching Lesson data structure and its individual modules.

## Requirements:

- [ ] Create a core `Lesson` interface that contains an array of `Module`s and overarching metadata (e.g., title, id).
- [ ] Define a discriminated union `Module` type (with a discriminator like `type: 'match' | 'sentence' | 'conversation'`).
- [ ] Define the `MatchModuleData` interface representing the config ("front", "back") and data (list of `VocabItem` references or IDs).
- [ ] Define the `SentenceModuleData` interface representing the target sentence and ordered piece `VocabItem`s.
- [ ] Define the `ConversationModuleData` interface representing sequential lines, masked words, and distractor options.
- [ ] Export these types from a new shared file (e.g., `src/types/lesson.ts` or `src/models/lesson.ts`).
