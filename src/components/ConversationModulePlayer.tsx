import React, { useState, useEffect } from "react";
import type { Module } from "../types/lesson";

interface ConversationModulePlayerProps {
  module: Extract<Module, { type: "conversation" }>;
  onComplete: () => void;
}

export const ConversationModulePlayer: React.FC<ConversationModulePlayerProps> = ({
  module,
  onComplete,
}) => {
  const { config, lines, distractorOptions } = module.data;
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // Compute options for the current line
  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      const correctAnswers = currentLine.maskedWords;
      
      // Get some distractors (e.g., 3 random ones)
      // For simplicity, we'll use the 'cherokee' field from distractors as that's likely what's being masked
      const distractors = [...distractorOptions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(item => item.cherokee);

      const allOptions = Array.from(new Set([...correctAnswers, ...distractors]));
      setShuffledOptions(allOptions.sort(() => 0.5 - Math.random()));
    }
  }, [currentLineIndex, lines, distractorOptions]);

  const handleOptionClick = (option: string) => {
    const currentLine = lines[currentLineIndex];
    if (currentLine.maskedWords.includes(option)) {
      if (currentLineIndex === lines.length - 1) {
        onComplete();
      } else {
        setCurrentLineIndex(prev => prev + 1);
      }
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
    }
  };

  const renderTextWithBlanks = (text: string, maskedWords: string[]) => {
    let result = text;
    maskedWords.forEach(word => {
      result = result.replace(word, "____");
    });
    return result;
  };

  return (
    <div className="conversation-module-player" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div className="chat-history" style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
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
                backgroundColor: isCurrent ? (isError ? "#fee2e2" : "#f0f9ff") : "#f3f4f6",
                border: isCurrent ? `2px solid ${isError ? "#ef4444" : "#3b82f6"}` : "1px solid #e5e7eb",
                transition: "all 0.3s ease",
                alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                maxWidth: "80px%"
              }}
            >
              {config.visibleFields.map(field => (
                <div key={field} style={{ fontSize: field === 'cherokee' ? '1.2rem' : '0.9rem', color: field === 'english' ? '#666' : '#000' }}>
                  {isCurrent && field === 'cherokee' 
                    ? renderTextWithBlanks(sentence[field], maskedWords)
                    : sentence[field]
                  }
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {currentLineIndex < lines.length && (
        <div className="options-area" style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
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
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#eff6ff")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
