Create a new file `src/components/LessonPlayer.tsx` fulfilling the requirements in `tasks/06-player-scaffold.md`.

You must:

1. Create placeholder components for the individual players in `src/components/LessonPlayer.tsx`:
   - `MatchModulePlayer`: Receives `module` and `onComplete` props. Renders a div saying "Match Player Placeholder" and a "Complete" button that calls `onComplete`.
   - `SentenceModulePlayer`: Receives `module` and `onComplete`. Renders a div saying "Sentence Player Placeholder" and a "Complete" button.
   - `ConversationModulePlayer`: Receives `module` and `onComplete`. Renders a div saying "Conversation Player Placeholder" and a "Complete" button.
2. Create and export the `LessonPlayer` component.
   - Props: `lesson: Lesson` (import `Lesson` from `../types/lesson`).
   - State: `const [currentModuleIndex, setCurrentModuleIndex] = useState(0);`
   - Data tracking: `const currentModule = lesson.modules[currentModuleIndex];`
3. Implement `handleModuleComplete` function:
   - Increments `currentModuleIndex`.
4. Render the UI:
   - Header area showing lesson title and a progress indicator (e.g., "Module {currentModuleIndex + 1} of {lesson.modules.length}").
   - If `currentModuleIndex >= lesson.modules.length`, render a "Lesson Complete!" screen with a button to perhaps reset to index 0, or just a success message.
   - Otherwise, render the main canvas area switching on `currentModule.type`:
     - If `'match'`: render `<MatchModulePlayer module={currentModule as Module & { type: 'match' }} onComplete={handleModuleComplete} />`
     - If `'sentence'`: render `<SentenceModulePlayer module={currentModule as Module & { type: 'sentence' }} onComplete={handleModuleComplete} />`
     - If `'conversation'`: render `<ConversationModulePlayer module={currentModule as Module & { type: 'conversation' }} onComplete={handleModuleComplete} />`
