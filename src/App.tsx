import { useState } from "react";
import "./App.css";
import { VocabContextProvider, type VocabItem } from "./vocab-context";
import { VocabFindCreate } from "./components/VocabFindCreate";

function App() {
  const [selected, setSelected] = useState<VocabItem | null>(null);

  return (
    <VocabContextProvider>
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Vocabulary Builder</h1>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div>
            <h3>Find or Create</h3>
            <VocabFindCreate onSelected={setSelected} />
          </div>
          <div>
            <h3>Current Selection</h3>
            {selected ? (
              <div
                style={{
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              >
                <p>
                  <strong>Cherokee:</strong> {selected.cherokee}
                </p>
                <p>
                  <strong>Phonetic:</strong> {selected.phonetic}
                </p>
                <p>
                  <strong>English:</strong> {selected.english}
                </p>
                <p>
                  <strong>Type:</strong> {selected.type}
                </p>
                <p>
                  <small>ID: {selected.id}</small>
                </p>
              </div>
            ) : (
              <p>No item selected.</p>
            )}
          </div>
        </div>
      </div>
    </VocabContextProvider>
  );
}

export default App;
