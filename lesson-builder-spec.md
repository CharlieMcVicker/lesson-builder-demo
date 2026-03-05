# Lesson Builder Specification

## Overview

The lesson builder allows users to create lessons consisting of a sequential list of interactive modules. The builder provides a classic workflow where users can manage, reorder, and add new modules at the bottom.

## Module Types

### 1. Match Module

Users match pairs of words across different writing systems or languages.

- **Meta-config:** Choose a "front" and "back" field from the available set (`cherokee`, `phonetics`, `english`).
- **Data Capture:** An array of `VocabItem`s captured via the `VocabFindCreate` component.

### 2. Build the Sentence Module

Users are presented with a target sentence in one format and assemble an equivalent sentence using provided word-parts.

- **Meta-config:**
  - Target sentence presentation field (`english`, `cherokee`, `phonetics`).
  - Draggable/clickable word-part presentation field.
- **Data Capture:**
  - One `VocabItem` representing the entire target sentence.
  - An ordered sequence of constituent `VocabItem`s representing the "word-parts" or "words" to be assembled.

### 3. Conversation-Flow Module

Users navigate a conversation between two speakers, filling in blanks to advance.

- **Meta-config:** Fields to show for the dialogue and optionally English underneath.
- **Data Capture (Per Dialogue Line):**
  - One `VocabItem` representing the whole sentence/line.
  - The specific subset of "masked" words.
  - A set of options (distractors + 1 correct answer as `VocabItem`s) for the masked words.

## Implementation Phases

This project is broken down into three distinct implementation phases, modeled in the `/tasks` directory:

1. **Phase 1: Data Layer** - Create the TypeScript types and validation schemas specifying the data collected for each module type.
2. **Phase 2: Builder Forms UI** - Create a lesson builder workflow that constructs these module types from user input through interactive sub-forms.
3. **Phase 3: Runtime Engine UI** - Create a player runtime that renders and evaluates these modules for the end user in "play" mode.
