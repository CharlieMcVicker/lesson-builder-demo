Create a new file `src/components/SentenceModuleForm.tsx` and update related files for the Sentence Module Form.

You must:

1. Update `src/types/lesson.ts` for `SentenceModuleData`:
   - Change `targetSentence: string;` to `targetSentence: VocabItem | null;`
   - Add `config: { sentenceField: 'cherokee' | 'phonetic' | 'english'; pieceField: 'cherokee' | 'phonetic' | 'english'; }`
2. Update `src/components/LessonBuilder.tsx`:
   - When adding a new `sentence` module, initialize its `data` to `{ config: { sentenceField: 'cherokee', pieceField: 'english' }, targetSentence: null, orderedPieces: [] }`.
   - Import `SentenceModuleForm` and render it for sentence modules, passing the `module` and an `onChange` callback just like MatchModuleForm.
3. Create `src/components/SentenceModuleForm.tsx`:
   - Import `Module` from `../types/lesson`.
   - Accept props: `module: Module & { type: 'sentence' }` and `onChange: (updatedModule: Module) => void`.
   - Render dropdowns (`<select>`) for checking the "Target Sentence Field" and "Piece Field" values (`cherokee`, `phonetic`, `english`). Use these to update `module.data.config`.
   - Render a `VocabFindCreate` component for selecting the **Target Sentence**. Once selected, display the selected `targetSentence` texts and a "Clear/Remove" button, hiding the `VocabFindCreate` when a sentence is already set.
   - Below that, render a section for **Ordered Pieces** with its own `VocabFindCreate` for adding constituent word-parts.
   - Render a list of `orderedPieces`. For each piece, display its texts (Cherokee, Phonetic, English) and provide buttons for "Move Up", "Move Down", and "Remove" to allow reordering and deletion of pieces within the `orderedPieces` array.
