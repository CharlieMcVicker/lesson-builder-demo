import { useState } from "react";
import "./App.css";
import { VocabContextProvider, useVocabContextOrThrow, type VocabItem } from "./vocab-context";
import { VocabFindCreate } from "./components/VocabFindCreate";
import LessonBuilder from "./components/LessonBuilder";
import { LessonPlayer } from "./components/LessonPlayer";
import type { Lesson } from "./types/lesson";

function AppContent() {
  const [selected, setSelected] = useState<VocabItem | null>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [currentLesson, setCurrentLesson] = useState<Lesson>({
    id: Math.random().toString(36).substring(7),
    title: "New Lesson",
    modules: [],
  });

  const { data: vocabData } = useVocabContextOrThrow();

  const exportLesson = () => {
    const bundle = {
      lesson: currentLesson,
      vocab: vocabData.vocabItems,
    };
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentLesson.title.replace(/\s+/g, "_") || "lesson"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        marginBottom: "1rem",
        paddingBottom: "0.5rem"
      }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button 
            onClick={() => setViewMode('edit')}
            style={{ fontWeight: viewMode === 'edit' ? 'bold' : 'normal' }}
          >
            Edit Mode
          </button>
          <button 
            onClick={() => setViewMode('preview')}
            style={{ fontWeight: viewMode === 'preview' ? 'bold' : 'normal' }}
          >
            Preview Mode
          </button>
        </div>
        <button onClick={exportLesson}>Download Lesson JSON</button>
      </header>

      <div style={{ display: "flex", gap: "2rem" }}>
        <div style={{ flex: 1 }}>
          {viewMode === 'edit' ? (
            <LessonBuilder 
              lesson={currentLesson} 
              onLessonChange={setCurrentLesson} 
            />
          ) : (
            <LessonPlayer lesson={currentLesson} />
          )}
        </div>

        <aside style={{ width: "300px", borderLeft: "1px solid #eee", paddingLeft: "1rem" }}>
          <h3>Vocab Inventory</h3>
          <VocabFindCreate onSelected={setSelected} />
          
          <div style={{ marginTop: "2rem" }}>
            <h4>Current Selection</h4>
            {selected ? (
              <div
                style={{
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  fontSize: "0.9rem"
                }}
              >
                <p><strong>Cherokee:</strong> {selected.cherokee}</p>
                <p><strong>English:</strong> {selected.english}</p>
                <p><small>ID: {selected.id}</small></p>
              </div>
            ) : (
              <p>No item selected.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function App() {
  return (
    <VocabContextProvider>
      <AppContent />
    </VocabContextProvider>
  );
}

export default App;
