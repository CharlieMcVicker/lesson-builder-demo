import React from "react";
import type { Lesson, Module } from "../types/lesson";

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLessonChange({
      ...lesson,
      title: e.target.value,
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
    <div>
      <h1>Lesson Builder</h1>
      <input
        type="text"
        value={lesson.title}
        onChange={handleTitleChange}
        placeholder="Lesson Title"
      />

      <div>
        {lesson.modules.map((module, index) => (
          <div
            key={module.id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>Module Type: {module.type}</h3>
            <div>
              <button
                onClick={() => moveModuleUp(index)}
                disabled={index === 0}
              >
                Move Up
              </button>
              <button
                onClick={() => moveModuleDown(index)}
                disabled={index === lesson.modules.length - 1}
              >
                Move Down
              </button>
              <button onClick={() => deleteModule(index)}>Delete</button>
            </div>
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
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => addModule("match")}>Add Match Module</button>
        <button onClick={() => addModule("sentence")}>
          Add Sentence Module
        </button>
        <button onClick={() => addModule("conversation")}>
          Add Conversation Module
        </button>
      </div>
    </div>
  );
};

export default LessonBuilder;
