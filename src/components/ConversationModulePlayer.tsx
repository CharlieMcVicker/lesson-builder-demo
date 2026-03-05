import React, { useState, useEffect, useMemo } from "react";
import { useVocabContextOrThrow } from "../vocab-context";
import type { Module } from "../types/lesson";

interface ConversationModulePlayerProps {
  module: Extract<Module, { type: "conversation" }>;
  onComplete: () => void;
}

export const ConversationModulePlayer: React.FC<
  ConversationModulePlayerProps
> = ({ module, onComplete }) => {
  const { data: vocabData } = useVocabContextOrThrow();
  const {
    config,
    lines: lineData,
    distractorOptions: distractorIds,
  } = module.data;

  const lines = useMemo(() => {
    return lineData
      .map((line) => ({
        ...line,
        sentence: vocabData.vocabItems[line.sentence],
      }))
      .filter((l) => !!l.sentence);
  }, [lineData, vocabData.vocabItems]);

  const distractorOptions = useMemo(() => {
    return distractorIds.map((id) => vocabData.vocabItems[id]).filter(Boolean);
  }, [distractorIds, vocabData.vocabItems]);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // Compute options for the current line
  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      const tokens = currentLine.sentence[config.targetField].split(/\s+/);
      const correctAnswers = currentLine.maskedWords.map((idx) => tokens[idx]);

      // Get some distractors (e.g., 3 random ones)
      const distractors = [...distractorOptions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((item) => item[config.targetField]);

      const allOptions = Array.from(
        new Set([...correctAnswers, ...distractors]),
      );
      setShuffledOptions(allOptions.sort(() => 0.5 - Math.random()));
    }
  }, [currentLineIndex, lines, distractorOptions, config.targetField]);

  const handleOptionClick = (option: string) => {
    const currentLine = lines[currentLineIndex];
    const tokens = currentLine.sentence[config.targetField].split(/\s+/);
    const correctAnswers = currentLine.maskedWords.map((idx) => tokens[idx]);

    if (correctAnswers.includes(option)) {
      if (currentLineIndex === lines.length - 1) {
        onComplete();
      } else {
        setCurrentLineIndex((prev) => prev + 1);
      }
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
    }
  };

  const renderTextWithBlanks = (text: string, maskedIndices: number[]) => {
    const tokens = text.split(/\s+/);
    return tokens
      .map((token, idx) => (maskedIndices.includes(idx) ? "____" : token))
      .join(" ");
  };

  return (
    <div
      className="conversation-module-player"
      style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}
    >
      <div
        className="chat-history"
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {lines.map((line, index) => {
          if (index > currentLineIndex) return null;

          const isCurrent = index === currentLineIndex;
          const { sentence, maskedWords } = line;

          return (
            <div
              key={index}
              style={{
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: isCurrent
                  ? isError
                    ? "#fee2e2"
                    : "#f0f9ff"
                  : "#f3f4f6",
                border: isCurrent
                  ? `2px solid ${isError ? "#ef4444" : "#3b82f6"}`
                  : "1px solid #e5e7eb",
                transition: "all 0.3s ease",
                alignSelf: line.speaker === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
                backgroundColor: isCurrent
                  ? isError
                    ? "#fee2e2"
                    : "#f0f9ff"
                  : line.speaker === "user"
                    ? "#f3f4f6"
                    : "#ffffff",
              }}
            >
              {config.visibleFields.map((field) => (
                <div
                  key={field}
                  style={{
                    fontSize: field === "cherokee" ? "1.2rem" : "0.9rem",
                    color: field === "english" ? "#666" : "#000",
                  }}
                >
                  {isCurrent && field === config.targetField
                    ? renderTextWithBlanks(sentence[field], maskedWords)
                    : sentence[field]}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {currentLineIndex < lines.length && (
        <div
          className="options-area"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {shuffledOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: "10px 20px",
                borderRadius: "20px",
                border: "1px solid #3b82f6",
                backgroundColor: "white",
                color: "#3b82f6",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#eff6ff")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
