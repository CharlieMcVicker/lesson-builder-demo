Create a new file `src/components/LessonBuilder.tsx` fulfilling the requirements in `tasks/02-builder-scaffold.md`.

You must:

1. Import `Lesson` and `Module` from `../types/lesson`.
2. Define placeholder components in the same file or standard React nodes for the sub-components: `MatchModuleForm`, `SentenceModuleForm`, and `ConversationModuleForm`. They can just return `<div>Placeholder for {type} module Form</div>`.
3. Create the `LessonBuilder` component taking `initialLesson?: Lesson` as an optional prop (or just start with a default empty lesson).
4. Use `useState` to manage the `Lesson` state (or just the `modules` array). Let's use `const [lesson, setLesson] = useState<Lesson>({ id: '1', title: 'New Lesson', modules: [] });`.
5. Implement an `addModule(type: 'match' | 'sentence' | 'conversation')` function that pushes a new empty/default module of that type to the state.
6. Implement `moveModuleUp(index: number)`, `moveModuleDown(index: number)`, and `deleteModule(index: number)` functions to modify the modules array.
7. Render the lesson title (editable input optional, but good to have).
8. Map over `lesson.modules` and render a card for each.
   - For each card, render "Move Up", "Move Down", and "Delete" buttons hooked up to the functions.
   - Inside the card, switch on `module.type` to render the correct placeholder form component (e.g. `MatchModuleForm`, etc.) passing down `module` and an `onChange` callback if you'd like (or just pass `module` for now).
9. Render buttons or a select at the bottom to trigger `addModule('match')`, `addModule('sentence')`, and `addModule('conversation')`.
10. Ensure it's exported as default.
