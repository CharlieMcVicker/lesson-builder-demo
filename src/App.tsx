import { useState } from "react";
import { VocabContextProvider, useVocabContextOrThrow } from "./vocab-context";
import LessonBuilder from "./components/LessonBuilder";
import { LessonPlayer } from "./components/LessonPlayer";
import type { Lesson } from "./types/lesson";

function AppContent() {
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
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100">
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
