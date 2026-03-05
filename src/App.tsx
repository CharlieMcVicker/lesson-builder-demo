import { useState } from "react";
import { VocabContextProvider, useVocabContextOrThrow, type VocabItem } from "./vocab-context";
import { VocabFindCreate } from "./components/VocabFindCreate";
import LessonBuilder from "./components/LessonBuilder";
import { LessonPlayer } from "./components/LessonPlayer";
import type { Lesson } from "./types/lesson";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  UserCircle, 
  LogOut,
  ChevronRight
} from "lucide-react";

function Sidebar() {
  const navItems = [
    { name: "Admin", icon: LayoutDashboard },
    { name: "Users", icon: Users },
    { name: "Lessons", icon: BookOpen, active: true },
    { name: "Profile", icon: UserCircle },
    { name: "Logout", icon: LogOut },
  ];

  return (
    <aside className="w-64 bg-[#1a2b3c] text-white flex flex-col h-screen sticky top-0">
      {/* Top section */}
      <div className="p-6">
        <h1 className="text-xl font-bold">Parent App</h1>
        <p className="text-sm text-teal-200 opacity-80 font-medium">Curriculum Builder</p>
      </div>

      {/* User profile */}
      <div className="px-6 py-4 flex items-center gap-3 border-t border-teal-800/50">
        <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center font-bold text-lg">
          T
        </div>
        <div className="overflow-hidden">
          <p className="font-semibold truncate">Tsal McVicker</p>
          <p className="text-xs text-teal-300 opacity-70">Admin</p>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="mt-6 flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              item.active 
                ? "bg-teal-700/50 text-white" 
                : "text-teal-100 hover:bg-teal-800/30 hover:text-white"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
            {item.active && <ChevronRight size={16} className="ml-auto" />}
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-6 mt-auto text-xs text-teal-400 opacity-60">
        Version 1.0.0
      </div>
    </aside>
  );
}

function AppContent() {
  const [selected, setSelected] = useState<VocabItem | null>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [currentLesson, setCurrentLesson] = useState<Lesson>({
    id: Math.random().toString(36).substring(7),
    title: "New Lesson",
    description: "",
    assignedTo: "",
    status: "draft",
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
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 flex flex-col p-8">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div className="flex gap-4">
            <button 
              onClick={() => setViewMode('edit')}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === 'edit' 
                  ? "bg-[#1a2b3c] text-white shadow-md" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Edit Mode
            </button>
            <button 
              onClick={() => setViewMode('preview')}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === 'preview' 
                  ? "bg-[#1a2b3c] text-white shadow-md" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              Preview Mode
            </button>
          </div>
          
          <button 
            onClick={exportLesson}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md shadow-sm transition-colors"
          >
            Download Lesson JSON
          </button>
        </header>

        <div className="flex gap-8 items-start">
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {viewMode === 'edit' ? (
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
                  <p className="mb-2"><strong className="text-teal-900">Cherokee:</strong> <span className="text-teal-700">{selected.cherokee}</span></p>
                  <p className="mb-2"><strong className="text-teal-900">English:</strong> <span className="text-teal-700">{selected.english}</span></p>
                  <p className="text-xs text-teal-500 mt-2 pt-2 border-t border-teal-100">ID: {selected.id}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No item selected.</p>
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
