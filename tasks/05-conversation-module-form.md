# Task: Conversation Module Form

**Phase**: 2
**Goal**: Build the edit-mode form for the Conversation-flow module.

## Requirements:

- [ ] Create a `ConversationModuleForm` component.
- [ ] Build global settings for this module on which fields are visible (e.g., Cherokee text, English translation).
- [ ] Implement UI to add sequential dialogue lines for the conversation (`ConversationLine`s).
- [ ] For a given line: use `VocabFindCreate` to select the base sentence `VocabItem`.
- [ ] For a given line: provide an interface to designate masked words (either text ranges or references), and a way to populate distractors/options using `VocabItem`s.
