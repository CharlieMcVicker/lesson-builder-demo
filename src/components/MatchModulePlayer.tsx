import React, { useState, useEffect, useMemo } from "react";
import type { Module } from "../types/lesson";

interface MatchItem {
  id: string;
  text: string;
}

interface MatchModulePlayerProps {
  module: Extract<Module, { type: "match" }>;
  onComplete: () => void;
}

export const MatchModulePlayer: React.FC<MatchModulePlayerProps> = ({
  module,
  onComplete,
}) => {
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [selectedFront, setSelectedFront] = useState<string | null>(null);
  const [selectedBack, setSelectedBack] = useState<string | null>(null);
  const [errorPair, setErrorPair] = useState<[string, string] | null>(null);

  // Shuffle the items only once on mount
  const shuffledFront = useMemo(() => {
    return [...module.data.data]
      .map((item) => ({
        id: item.id,
        text: item[module.data.config.front] as string,
      }))
      .sort(() => Math.random() - 0.5);
  }, [module.data.data, module.data.config.front]);

  const shuffledBack = useMemo(() => {
    return [...module.data.data]
      .map((item) => ({
        id: item.id,
        text: item[module.data.config.back] as string,
      }))
      .sort(() => Math.random() - 0.5);
  }, [module.data.data, module.data.config.back]);

  useEffect(() => {
    if (selectedFront && selectedBack) {
      if (selectedFront === selectedBack) {
        setMatchedIds((prev) => [...prev, selectedFront]);
        setSelectedFront(null);
        setSelectedBack(null);
      } else {
        setErrorPair([selectedFront, selectedBack]);
        setSelectedFront(null);
        setSelectedBack(null);
        const timer = setTimeout(() => {
          setErrorPair(null);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedFront, selectedBack]);

  const isComplete = matchedIds.length === module.data.data.length;

  const renderButton = (
    item: MatchItem,
    isSelected: boolean,
    onSelect: (id: string) => void,
    isSideSelected: boolean
  ) => {
    const isMatched = matchedIds.includes(item.id);
    const isError = errorPair?.includes(item.id);

    let backgroundColor = "white";
    let borderColor = "#ccc";
    let opacity = 1;
    let cursor = "pointer";

    if (isMatched) {
      opacity = 0;
      cursor = "default";
    } else if (isSelected) {
      backgroundColor = "#e3f2fd";
      borderColor = "#2196f3";
    } else if (isError) {
      backgroundColor = "#ffebee";
      borderColor = "#f44336";
    }

    return (
      <button
        key={item.id}
        disabled={isMatched || isSideSelected}
        onClick={() => onSelect(item.id)}
        style={{
          display: "block",
          width: "100%",
          padding: "15px",
          margin: "10px 0",
          fontSize: "1.1rem",
          textAlign: "center",
          border: `2px solid ${borderColor}`,
          borderRadius: "8px",
          backgroundColor,
          opacity,
          cursor,
          transition: "all 0.2s ease",
        }}
      >
        {item.text}
      </button>
    );
  };

  if (isComplete) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3 style={{ color: "#27ae60", fontSize: "1.5rem" }}>Perfect Match!</h3>
        <button
          onClick={onComplete}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            fontSize: "1.1rem",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="match-module-player" style={{ padding: "10px" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          {shuffledFront.map((item) =>
            renderButton(
              item,
              selectedFront === item.id,
              setSelectedFront,
              !!selectedFront
            )
          )}
        </div>
        <div style={{ flex: 1 }}>
          {shuffledBack.map((item) =>
            renderButton(
              item,
              selectedBack === item.id,
              setSelectedBack,
              !!selectedBack
            )
          )}
        </div>
      </div>
    </div>
  );
};
