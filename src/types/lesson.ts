import type { VocabItem } from "../vocab-context";

export interface MatchModuleData {
  config: {
    front: "cherokee" | "phonetic" | "english";
    back: "cherokee" | "phonetic" | "english";
  };
  data: VocabItem[];
}

export interface SentenceModuleData {
  config: {
    sentenceField: "cherokee" | "phonetic" | "english";
    pieceField: "cherokee" | "phonetic" | "english";
  };
  targetSentence: VocabItem | null;
  orderedPieces: VocabItem[];
}

export interface ConversationLine {
  speaker: "user" | "npc";
  sentence: VocabItem;
  maskedWords: number[]; // Indices into the tokenized sentence
}

export interface ConversationModuleData {
  config: {
    visibleFields: ("cherokee" | "phonetic" | "english")[];
    targetField: "cherokee" | "phonetic" | "english";
  };
  lines: ConversationLine[];
  distractorOptions: VocabItem[];
}

export type Module =
  | { id: string; type: "match"; data: MatchModuleData }
  | { id: string; type: "sentence"; data: SentenceModuleData }
  | { id: string; type: "conversation"; data: ConversationModuleData };

export interface Lesson {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: "draft" | "published" | "archived";
  modules: Module[];
}
