# Task: Conversation Module Player

**Phase**: 3
**Goal**: Build the interactive UI for the conversational assessment flow.

## Requirements:

- [ ] Create a `ConversationModulePlayer` component.
- [ ] Implement state to track progress sequentially through dialogue `ConversationLine`s.
- [ ] Display the chat history. For the _current_ focal line, render the base sentence with blanks for the masked words.
- [ ] Show the distractor options + the correct answer in randomized order below the chat interface.
- [ ] Validate when the user clicks an option. If correct, advance dialogue; if wrong, shake/highlight red.
- [ ] Fire `onComplete` when all interactive lines in the conversation have been resolved.
