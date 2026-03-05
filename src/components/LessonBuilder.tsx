import React from "react";
import type { Lesson, Module } from "../types/lesson";
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  Plus, 
  ChevronUp, 
  ChevronDown, 
  Trash2
} from "lucide-react";

import { MatchModuleForm } from "./MatchModuleForm";
import { SentenceModuleForm } from "./SentenceModuleForm";
import { ConversationModuleForm } from "./ConversationModuleForm";

interface LessonBuilderProps {
  lesson: Lesson;
  onLessonChange: (lesson: Lesson) => void;
}

const LessonBuilder: React.FC<LessonBuilderProps> = ({
  lesson,
  onLessonChange,
}) => {
  const addModule = (type: "match" | "sentence" | "conversation") => {
    let data: any = {};
    if (type === "match") {
      data = {
        config: { front: "cherokee", back: "english" },
        data: [],
      };
    } else if (type === "sentence") {
      data = {
        config: { sentenceField: "cherokee", pieceField: "english" },
        targetSentence: null,
        orderedPieces: [],
      };
    } else if (type === "conversation") {
      data = {
        config: { visibleFields: ["cherokee", "english"] },
        lines: [],
        distractorOptions: [],
      };
    }

    const newModule: Module = {
      id: Math.random().toString(36).substring(7), // Simple unique ID
      type,
      data,
    } as Module;

    onLessonChange({
      ...lesson,
      modules: [...lesson.modules, newModule],
    });
  };

  const moveModuleUp = (index: number) => {
    if (index === 0) return;
    const newModules = [...lesson.modules];
    const [movedModule] = newModules.splice(index, 1);
    newModules.splice(index - 1, 0, movedModule);
    onLessonChange({ ...lesson, modules: newModules });
  };

  const moveModuleDown = (index: number) => {
    if (index === lesson.modules.length - 1) return;
    const newModules = [...lesson.modules];
    const [movedModule] = newModules.splice(index, 1);
    newModules.splice(index + 1, 0, movedModule);
    onLessonChange({ ...lesson, modules: newModules });
  };

  const deleteModule = (index: number) => {
    onLessonChange({
      ...lesson,
      modules: lesson.modules.filter((_, i) => i !== index),
    });
  };

  const handleChange = (field: keyof Lesson, value: any) => {
    onLessonChange({
      ...lesson,
      [field]: value,
    });
  };

  const handleModuleChange = (updatedModule: Module) => {
    onLessonChange({
      ...lesson,
      modules: lesson.modules.map((m) =>
        m.id === updatedModule.id ? updatedModule : m,
      ),
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span>Lessons</span>
            <ChevronUp size={14} className="rotate-90" />
            <span className="font-medium text-gray-900">{lesson.title || "New Lesson"}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1a2b3c] tracking-tight mb-1">
            {lesson.title || "New Lesson"}
          </h1>
          <p className="text-gray-500">Build and manage interactive lesson modules.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ArrowLeft size={16} />
            Back to lessons
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye size={16} />
            Preview
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Lesson Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-200">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lesson Information</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Lesson Title</label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="e.g., Animals in Cherokee"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  value={lesson.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                  placeholder="Briefly describe the purpose of this lesson..."
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Assigned To</label>
                  <select
                    value={lesson.assignedTo}
                    onChange={(e) => handleChange("assignedTo", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                  >
                    <option value="">Select a student...</option>
                    <option value="student1">Student 1</option>
                    <option value="student2">Student 2</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <select
                    value={lesson.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Modules */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#1a2b3c]">Lesson Modules</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => addModule("match")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={14} />
                Match
              </button>
              <button 
                onClick={() => addModule("sentence")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={14} />
                Sentence
              </button>
              <button 
                onClick={() => addModule("conversation")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={14} />
                Conversation
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {lesson.modules.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="text-gray-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">No modules yet</h3>
                <p className="text-xs text-gray-500 mb-6">Start building your lesson by adding a module above.</p>
              </div>
            ) : (
              lesson.modules.map((module, index) => (
                <div
                  key={module.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group"
                >
                  <div className="px-5 py-3 bg-gray-50/50 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-400">
                        {index + 1}
                      </div>
                      <span className="text-sm font-bold text-gray-700 uppercase tracking-tight">
                        {module.type} Module
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveModuleUp(index)}
                        disabled={index === 0}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all disabled:opacity-30"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() => moveModuleDown(index)}
                        disabled={index === lesson.modules.length - 1}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all disabled:opacity-30"
                      >
                        <ChevronDown size={16} />
                      </button>
                      <div className="w-px h-4 bg-gray-200 mx-1" />
                      <button 
                        onClick={() => deleteModule(index)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    {module.type === "match" && (
                      <MatchModuleForm module={module} onChange={handleModuleChange} />
                    )}
                    {module.type === "sentence" && (
                      <SentenceModuleForm
                        module={module}
                        onChange={handleModuleChange}
                      />
                    )}
                    {module.type === "conversation" && (
                      <ConversationModuleForm
                        module={module}
                        onChange={handleModuleChange}
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonBuilder;
