import {
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

export type VocabItemType = "word" | "sentence" | "word-part";

export interface VocabItem {
  id: string;
  cherokee: string;
  phonetic: string;
  english: string;
  type: VocabItemType;
}

export interface VocabContextData {
  vocabItems: Record<string, VocabItem>;
}

export interface VocabContext {
  data: VocabContextData;
  upsertItem: (newItem: VocabItem) => void;
  removeItem: (id: string) => void;
}

const vocabContext = createContext<VocabContext | null>(null);

export function VocabContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [data, setData] = useState<VocabContextData>({
    vocabItems: {},
  });

  return (
    <vocabContext.Provider
      value={{
        data,
        upsertItem(item) {
          setData((d) => ({
            vocabItems: { ...d.vocabItems, [item.id]: item },
          }));
        },
        removeItem(idToDrop) {
          setData((d) => ({
            vocabItems: Object.fromEntries(
              Object.entries(d.vocabItems).filter(
                ([itemId, _]) => itemId != idToDrop,
              ),
            ),
          }));
        },
      }}
    >
      {children}
    </vocabContext.Provider>
  );
}

export function useVocabContextOrThrow(): VocabContext {
  const res = useContext(vocabContext);
  if (!res) throw new Error("Must be used inside of VocabContextProvider");
  return res;
}
