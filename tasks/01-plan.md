Create a new file `src/types/lesson.ts` fulfilling the requirements in `tasks/01-define-lesson-types.md`.

You must:

1. Import `VocabItem` from `../vocab-context`.
2. Define and export `MatchModuleData`: should include `config` (with `front`, `back`) and `data` (list of `VocabItem`s).
3. Define and export `SentenceModuleData`: should include `targetSentence` and `orderedPieces` (list of `VocabItem`s).
4. Define and export `ConversationModuleData`: should include `lines` (sequential lines), `maskedWords`, and `distractorOptions`.
5. Define and export a discriminated union `Module` with `type: 'match' | 'sentence' | 'conversation'` and the corresponding `data` from above.
6. Define and export a `Lesson` interface with `id`, `title`, and `modules` (an array of `Module`).
