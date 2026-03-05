import { useState, useMemo, type ReactElement } from "react";
import { useVocabContextOrThrow, type VocabItem } from "../vocab-context";
import { VocabCreateForm } from "./VocabCreateForm";

/**
 * Component to search or create a new vocab item.
 */
export function VocabFindCreate({
  onSelected,
}: {
  onSelected: (selectedItem: VocabItem) => void;
}): ReactElement {
  const { data } = useVocabContextOrThrow();
  const [searchInput, setSearchInput] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const filteredItems = useMemo(() => {
    const query = searchInput.toLowerCase().trim();
    if (!query) return [];

    return Object.values(data.vocabItems).filter(
      (item) =>
        item.cherokee.toLowerCase().includes(query) ||
        item.phonetic.toLowerCase().includes(query) ||
        item.english.toLowerCase().includes(query),
    );
  }, [data.vocabItems, searchInput]);

  const handleCreated = (item: VocabItem) => {
    onSelected(item);
    setIsCreating(false);
    setSearchInput("");
  };

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      {!isCreating ? (
        <>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Search Vocabulary
            </label>
            <input
              type="text"
              placeholder="Search Cherokee, English, or Phonetic..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          {filteredItems.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                border: "1px solid #eee",
                borderRadius: "4px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onSelected(item)}
                  style={{
                    padding: "0.5rem",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                    backgroundColor: "#fff",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fff")
                  }
                >
                  <div style={{ fontWeight: "bold" }}>{item.cherokee}</div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    {item.english} ({item.phonetic})
                  </div>
                </li>
              ))}
            </ul>
          )}

          {searchInput && filteredItems.length === 0 && (
            <div
              style={{
                marginBottom: "1rem",
                color: "#666",
                fontSize: "0.9rem",
              }}
            >
              No matches found.
            </div>
          )}

          <button
            onClick={() => setIsCreating(true)}
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            + Create New Item
          </button>
        </>
      ) : (
        <VocabCreateForm
          initialCherokee={searchInput}
          onCreated={handleCreated}
          onCancel={() => setIsCreating(false)}
        />
      )}
    </div>
  );
}
