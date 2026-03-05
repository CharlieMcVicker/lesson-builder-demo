Create a new file `src/components/ConversationModulePlayer.tsx` and update related files.

You must:

1. Update `src/components/LessonPlayer.tsx`:
   - Remove the `ConversationModulePlayer` placeholder component definition.
   - Import `ConversationModulePlayer` from `./ConversationModulePlayer`.

2. Create `src/components/ConversationModulePlayer.tsx`:
   - Import `React, { useState, useEffect }` from `react`.
   - Import `Module` from `../types/lesson`.
   - Props: `module: Extract<Module, { type: 'conversation' }>` and `onComplete: () => void`.
   - Extract `config`, `lines`, and `distractorOptions` from `module.data`.
   - Initialize state:
     - `currentLineIndex`: integer initialized to `0`.
     - `resolvedLines`: Set or array of indices of lines the user has already successfully completed.
     - `shuffledOptions`: array of strings. Represents the choices for the current line.
     - `isError`: boolean, initially false.
   - Effect (Update Options): When `currentLineIndex` changes, compute `shuffledOptions`:
     - The currect answer(s) are the `maskedWords` of the current line.
     - The options should be a shuffled mix of the correct answer(s) and a few random distractor strings from `distractorOptions` (e.g., take the correct answers, add 3-4 random cherokee texts from distractors, then shuffle). Ensure `distractorOptions` are mapped to the correct field (e.g., Cherokee text).
   - Handlers:
     - Option click:
       - Check if the clicked option text matches the current line's `maskedWords` (specifically the first one if there are multiple, or however it's structured. For simplicity, assume one masked word per line or check if the clicked option is in the `maskedWords` array).
       - If it matches: Add `currentLineIndex` to `resolvedLines`. If `currentLineIndex` is the last line, call `onComplete()`. Otherwise, increment `currentLineIndex`.
       - If it's wrong: Set `isError = true` and shake/highlight. Clear `isError` after 800ms.
   - Render:
     - Main wrapper.
     - Chat History: Map over `lines` up to `currentLineIndex` (inclusive).
       - For `index < currentLineIndex` (resolved lines): Just show the full unmasked text (using visible fields from `config`).
       - For `index === currentLineIndex` (current focal line): Show the text but replace the `maskedWords` with blanks `____`. If `isError` is true, give the line a red highlight.
     - Options Area: Render the `shuffledOptions` as clickable buttons below the chat.
