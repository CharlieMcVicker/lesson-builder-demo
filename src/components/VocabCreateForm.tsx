import { useState, type ReactElement } from "react";
import {
  useVocabContextOrThrow,
  type VocabItem,
  type VocabItemType,
} from "../vocab-context";

interface VocabCreateFormProps {
  initialCherokee?: string;
  onCreated: (item: VocabItem) => void;
  onCancel: () => void;
}

export function VocabCreateForm({
  initialCherokee = "",
  onCreated,
  onCancel,
}: VocabCreateFormProps): ReactElement {
  const { upsertItem } = useVocabContextOrThrow();
  const [newItem, setNewItem] = useState<{
    cherokee: string;
    phonetic: string;
    english: string;
    type: VocabItemType;
  }>({
    cherokee: initialCherokee,
    phonetic: "",
    english: "",
    type: "word",
  });

  const handleCreate = () => {
    const id = crypto.randomUUID();
    const item: VocabItem = { ...newItem, id };
    upsertItem(item);
    onCreated(item);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <h3 style={{ margin: "0 0 0.5rem 0" }}>New Vocab Item</h3>
      <input
        placeholder="Cherokee"
        value={newItem.cherokee}
        onChange={(e) => setNewItem({ ...newItem, cherokee: e.target.value })}
        style={{ padding: "0.5rem" }}
      />
      <input
        placeholder="Phonetic"
        value={newItem.phonetic}
        onChange={(e) => setNewItem({ ...newItem, phonetic: e.target.value })}
        style={{ padding: "0.5rem" }}
      />
      <input
        placeholder="English"
        value={newItem.english}
        onChange={(e) => setNewItem({ ...newItem, english: e.target.value })}
        style={{ padding: "0.5rem" }}
      />
      <select
        value={newItem.type}
        onChange={(e) =>
          setNewItem({ ...newItem, type: e.target.value as VocabItemType })
        }
        style={{ padding: "0.5rem" }}
      >
        <option value="word">Word</option>
        <option value="sentence">Sentence</option>
        <option value="word-part">Word Part</option>
      </select>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <button
          onClick={handleCreate}
          style={{
            flex: 1,
            padding: "0.5rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add & Select
        </button>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: "0.5rem",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
