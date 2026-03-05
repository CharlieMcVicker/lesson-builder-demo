Create a new file `src/components/MatchModuleForm.tsx` and update related files for the Match Module Form.

You must:

1. Update `src/types/lesson.ts`: Change `MatchModuleData`'s `config.front` and `config.back` types to `'cherokee' | 'phonetic' | 'english'`.
2. Update `src/components/LessonBuilder.tsx`: When adding a new `match` module, initialize its `data` to `{ config: { front: 'cherokee', back: 'english' }, data: [] }`. Also, import `MatchModuleForm` and render it for match modules, passing the `module` and an `onChange` callback that updates that specific module in the lesson state.
3. Create `src/components/MatchModuleForm.tsx`:
   - Import `Module` from `../types/lesson`.
   - Accept props: `module: Module & { type: 'match' }` and `onChange: (updatedModule: Module) => void`.
   - Render dropdowns (`<select>`) for checking the "Front Field" and "Back Field" values (`cherokee`, `phonetic`, `english`). Use these to update `module.data.config.front` and `module.data.config.back`.
   - Render the `VocabFindCreate` component.
   - On its `onSelected` callback, check if the `VocabItem` is already in `module.data.data` (using `id`). If not, append it and call `onChange`.
   - Render a list (`<ul>` or `<div>`s) of the currently selected vocab items from `module.data.data`. For each item, display its texts (e.g., `Cherokee: ${item.cherokee}, English: ${item.english}`) and add a "Remove" button that filters it out of the data array and calls `onChange`.
