import React, { useState, useEffect, useMemo } from "react";
import { useVocabContextOrThrow, type VocabItem } from "../vocab-context";
import type { Module } from "../types/lesson";

interface SentenceModulePlayerProps {
  module: Extract<Module, { type: "sentence" }>;
  onComplete: () => void;
}

export const SentenceModulePlayer: React.FC<SentenceModulePlayerProps> = ({
  module,
  onComplete,
}) => {
  const { data: vocabData } = useVocabContextOrThrow();
  const {
    config,
    targetSentence: targetId,
    orderedPieces: pieceIds,
  } = module.data;

  const targetSentence = targetId ? vocabData.vocabItems[targetId] : null;
  const orderedPieces = useMemo(() => {
    return pieceIds.map((id) => vocabData.vocabItems[id]).filter(Boolean);
  }, [pieceIds, vocabData.vocabItems]);

  const [availablePieces, setAvailablePieces] = useState<VocabItem[]>([]);
  const [assembledPieces, setAssembledPieces] = useState<VocabItem[]>([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize and shuffle pieces
  useEffect(() => {
    const shuffled = [...orderedPieces].sort(() => Math.random() - 0.5);
    setAvailablePieces(shuffled);
    setAssembledPieces([]);
    setIsError(false);
    setIsSuccess(false);
  }, [module.id, orderedPieces]);

  const handleAddPiece = (index: number) => {
    if (isSuccess) return;
    const piece = availablePieces[index];
    setAvailablePieces((prev) => prev.filter((_, i) => i !== index));
    setAssembledPieces((prev) => [...prev, piece]);
    setIsError(false);
  };

  const handleRemovePiece = (index: number) => {
    if (isSuccess) return;
    const piece = assembledPieces[index];
    setAssembledPieces((prev) => prev.filter((_, i) => i !== index));
    setAvailablePieces((prev) => [...prev, piece]);
    setIsError(false);
  };

  const handleCheck = () => {
    const isCorrect =
      assembledPieces.length === orderedPieces.length &&
      assembledPieces.every(
        (piece, index) => piece.id === orderedPieces[index].id,
      );

    if (isCorrect) {
      setIsSuccess(true);
      // Auto-complete after 1.5s
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsError(true);
      const timer = setTimeout(() => {
        setIsError(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  };

  const pieceField = config.pieceField;
  const sentenceField = config.sentenceField;

  return (
    <div
      className="sentence-module-player"
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* Target Sentence Display */}
      {targetSentence && (
        <div
          style={{
            fontSize: "1.5rem",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f8fafc",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            fontWeight: "500",
          }}
        >
          {targetSentence[sentenceField]}
        </div>
      )}

      {/* Assembly Area */}
      <div
        style={{
          minHeight: "80px",
          padding: "16px",
          backgroundColor: isSuccess
            ? "#f0fdf4"
            : isError
              ? "#fef2f2"
              : "#ffffff",
          borderRadius: "12px",
          border: `2px solid ${
            isSuccess ? "#22c55e" : isError ? "#ef4444" : "#e2e8f0"
          }`,
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.2s ease",
        }}
      >
        {assembledPieces.length === 0 && !isSuccess && (
          <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Tap words to build the sentence
          </span>
        )}
        {assembledPieces.map((piece, index) => (
          <button
            key={`assembled-${index}`}
            onClick={() => handleRemovePiece(index)}
            disabled={isSuccess}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              cursor: isSuccess ? "default" : "pointer",
              fontSize: "1.1rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              transition: "transform 0.1s active",
            }}
          >
            {piece[pieceField]}
          </button>
        ))}
      </div>

      {/* Word Bank Area */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "center",
          padding: "16px",
          backgroundColor: "#f1f5f9",
          borderRadius: "12px",
          minHeight: "60px",
        }}
      >
        {availablePieces.map((piece, index) => (
          <button
            key={`available-${index}`}
            onClick={() => handleAddPiece(index)}
            disabled={isSuccess}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1.1rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              transition: "all 0.2s ease",
            }}
          >
            {piece[pieceField]}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}
      >
        {isSuccess ? (
          <div
            style={{
              color: "#15803d",
              fontWeight: "bold",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>✓</span> Correct!
          </div>
        ) : (
          <button
            onClick={handleCheck}
            disabled={availablePieces.length > 0}
            style={{
              padding: "12px 32px",
              fontSize: "1.1rem",
              backgroundColor:
                availablePieces.length > 0 ? "#cbd5e1" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: availablePieces.length > 0 ? "not-allowed" : "pointer",
              fontWeight: "600",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease",
            }}
          >
            Check
          </button>
        )}
      </div>
    </div>
  );
};
