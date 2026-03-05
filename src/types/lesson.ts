export interface MatchModuleData {
  config: {
    front: "cherokee" | "phonetic" | "english";
    back: "cherokee" | "phonetic" | "english";
  };
  data: string[]; // IDs
}

export interface SentenceModuleData {
  config: {
    sentenceField: "cherokee" | "phonetic" | "english";
    pieceField: "cherokee" | "phonetic" | "english";
  };
  targetSentence: string | null; // ID
  orderedPieces: string[]; // IDs
}

export interface ConversationLine {
  speaker: "user" | "npc";
  sentence: string; // ID
  maskedWords: number[]; // Indices into the tokenized sentence
}

export interface ConversationModuleData {
  config: {
    visibleFields: ("cherokee" | "phonetic" | "english")[];
    targetField: "cherokee" | "phonetic" | "english";
  };
  lines: ConversationLine[];
  distractorOptions: string[]; // IDs
}

export type Module =
  | { id: string; type: "match"; data: MatchModuleData }
  | { id: string; type: "sentence"; data: SentenceModuleData }
  | { id: string; type: "conversation"; data: ConversationModuleData };

export interface Lesson {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}
