import { useState } from "react";
import {
  VocabContextProvider,
  useVocabContextOrThrow,
  type VocabItem,
} from "./vocab-context";
import { VocabFindCreate } from "./components/VocabFindCreate";
import LessonBuilder from "./components/LessonBuilder";
import { LessonPlayer } from "./components/LessonPlayer";
import type { Lesson } from "./types/lesson";
import { BookOpen } from "lucide-react";

function AppContent() {
  const [selected, setSelected] = useState<VocabItem | null>(null);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [currentLesson, setCurrentLesson] = useState<Lesson>({
    id: Math.random().toString(36).substring(7),
    title: "New Lesson",
    description: "",
    modules: [],
  });

  const { data: vocabData, loadVocab } = useVocabContextOrThrow();

  const exportLesson = () => {
    const bundle = {
      lesson: currentLesson,
      vocab: vocabData.vocabItems,
    };
    const blob = new Blob([JSON.stringify(bundle, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentLesson.title.replace(/\s+/g, "_") || "lesson"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadDemo = async () => {
    try {
      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
      const response = await fetch(`${baseUrl}/Demo_lesson_for_BJ.json`);
      const data = await response.json();
      if (data.lesson && data.vocab) {
        loadVocab(data.vocab);
        setCurrentLesson(data.lesson);
        // If we were previewing something else, reset to edit or stay in preview
        // depending on preference. Let's stay in current view.
      }
    } catch (error) {
      console.error("Failed to load demo lesson:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="max-w-7xl mx-auto flex flex-col p-8">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={() => setViewMode("edit")}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === "edit"
                  ? "bg-[#1a2b3c] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Edit Mode
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === "preview"
                  ? "bg-[#1a2b3c] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Preview Mode
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={loadDemo}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm transition-colors"
            >
              Load Demo Lesson
            </button>
            <button
              onClick={exportLesson}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md shadow-sm transition-colors"
            >
              Download Lesson JSON
            </button>
          </div>
        </header>

        <div className="flex gap-8 items-start">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {viewMode === "edit" ? (
              <div className="p-6">
                <LessonBuilder
                  lesson={currentLesson}
                  onLessonChange={setCurrentLesson}
                />
              </div>
            ) : (
              <div className="p-6 bg-gray-50 min-h-[400px]">
                <LessonPlayer lesson={currentLesson} />
              </div>
            )}
          </div>

          <aside className="w-80 space-y-6 flex-shrink-0 sticky top-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-teal-600" />
                Vocab Inventory
              </h3>
              <VocabFindCreate onSelected={setSelected} />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                Current Selection
              </h4>
              {selected ? (
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-100 text-sm">
                  <p className="mb-2">
                    <strong className="text-teal-900">Cherokee:</strong>{" "}
                    <span className="text-teal-700">{selected.cherokee}</span>
                  </p>
                  <p className="mb-2">
                    <strong className="text-teal-900">English:</strong>{" "}
                    <span className="text-teal-700">{selected.english}</span>
                  </p>
                  <p className="text-xs text-teal-500 mt-2 pt-2 border-t border-teal-100">
                    ID: {selected.id}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No item selected.
                </p>
              )}
            </div>
          </aside>
        </div>
      </main>
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
