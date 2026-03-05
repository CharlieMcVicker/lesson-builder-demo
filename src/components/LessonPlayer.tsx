import { useState } from "react";
import type { Lesson, Module } from "../types/lesson";
import { MatchModulePlayer } from "./MatchModulePlayer";
import { SentenceModulePlayer } from "./SentenceModulePlayer";
import { ConversationModulePlayer } from "./ConversationModulePlayer";

// 2. Create and export the LessonPlayer component
export const LessonPlayer = ({ lesson }: { lesson: Lesson }) => {
  // State for current module index
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  // 3. Implement handleModuleComplete function
  const handleModuleComplete = () => {
    setCurrentModuleIndex((prev) => prev + 1);
  };

  const isLessonComplete = currentModuleIndex >= lesson.modules.length;
  const currentModule = lesson.modules[currentModuleIndex];

  // 4. Render the UI
  return (
    <div
      className="lesson-player"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <header
        className="lesson-player-header"
        style={{
          borderBottom: "2px solid #eee",
          marginBottom: "20px",
          paddingBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>{lesson.title}</h2>
        <div className="lesson-progress" style={{ fontWeight: "bold" }}>
          {isLessonComplete ? (
            <span style={{ color: "green" }}>Lesson Complete!</span>
          ) : (
            <span>
              Module {currentModuleIndex + 1} of {lesson.modules.length}
            </span>
          )}
        </div>
      </header>

      <main className="lesson-player-content">
        {isLessonComplete ? (
          <div
            className="lesson-complete"
            style={{ textAlign: "center", padding: "40px" }}
          >
            <h3 style={{ fontSize: "2rem", color: "#27ae60" }}>
              Lesson Complete!
            </h3>
            <p>Great job finishing "{lesson.title}".</p>
            <button
              onClick={() => setCurrentModuleIndex(0)}
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                backgroundColor: "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Restart Lesson
            </button>
          </div>
        ) : (
          <div className="module-container">
            {currentModule.type === "match" && (
              <MatchModulePlayer
                module={currentModule as Extract<Module, { type: "match" }>}
                onComplete={handleModuleComplete}
              />
            )}
            {currentModule.type === "sentence" && (
              <SentenceModulePlayer
                module={currentModule as Extract<Module, { type: "sentence" }>}
                onComplete={handleModuleComplete}
              />
            )}
            {currentModule.type === "conversation" && (
              <ConversationModulePlayer
                module={currentModule as Extract<Module, { type: "conversation" }>}
                onComplete={handleModuleComplete}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};
