Create a new file `src/components/SentenceModulePlayer.tsx` and update related files.

You must:

1. Update `src/components/LessonPlayer.tsx`:
   - Remove the `SentenceModulePlayer` placeholder component definition.
   - Import `SentenceModulePlayer` from `./SentenceModulePlayer`.

2. Create `src/components/SentenceModulePlayer.tsx`:
   - Import `React, { useState, useEffect }` from `react`.
   - Import `Module` from `../types/lesson`.
   - Props: `module: Extract<Module, { type: 'sentence' }>` and `onComplete: () => void`.
   - Extract `config`, `targetSentence`, and `orderedPieces` from `module.data`.
   - Initialize state:
     - `availablePieces`: array of VocabItems. Initialize with a shuffled copy of `orderedPieces`.
     - `assembledPieces`: array of VocabItems, initially empty.
     - `isError`: boolean, initially false.
     - `isSuccess`: boolean, initially false.
   - Handlers:
     - Click an available piece: move it from `availablePieces` to the end of `assembledPieces`. Clear `isError`.
     - Click an assembled piece: remove it from `assembledPieces` and put it back in `availablePieces`. Clear `isError`.
     - "Check" button click:
       - Compare the ordered IDs of `assembledPieces` with `orderedPieces`.
       - If they match exactly: set `isSuccess = true`. Render a success message and button to "Continue" which calls `onComplete()` (or auto-call it after 1.5s).
       - If they don't match: set `isError = true`. Set a timeout to reset `isError` back to `false` after 800ms.
   - Render:
     - Main wrapper.
     - Display the `targetSentence` using the field specified by `config.sentenceField`.
     - Assembly Area: A styled container showing `assembledPieces` (using `config.pieceField`). Give it a distinct background. If `isError` is true, give it a red border/background. If `isSuccess`, give it a green one. Make pieces clickable to remove them.
     - Word Bank Area: A container showing `availablePieces` (using `config.pieceField`). Make them clickable.
     - "Check" button: Disabled if `availablePieces.length > 0` (force them to use all pieces, or disabled if `assembledPieces.length === 0`).
