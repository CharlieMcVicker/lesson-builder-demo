import React from "react";
import { type Module, type SentenceModuleData } from "../types/lesson";
import { VocabFindCreate } from "./VocabFindCreate";
import { type VocabItem } from "../vocab-context";

interface SentenceModuleFormProps {
  module: Module & { type: "sentence" };
  onChange: (updatedModule: Module) => void;
}

export const SentenceModuleForm: React.FC<SentenceModuleFormProps> = ({
  module,
  onChange,
}) => {
  const { config, targetSentence, orderedPieces } =
    module.data as SentenceModuleData;

  const handleConfigChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: "sentenceField" | "pieceField",
  ) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        config: {
          ...config,
          [field]: e.target.value as "cherokee" | "phonetic" | "english",
        },
      },
    });
  };

  const handleTargetSentenceSelected = (item: VocabItem) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        targetSentence: item,
      },
    });
  };

  const clearTargetSentence = () => {
    onChange({
      ...module,
      data: {
        ...module.data,
        targetSentence: null,
      },
    });
  };

  const handlePieceSelected = (item: VocabItem) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        orderedPieces: [...orderedPieces, item],
      },
    });
  };

  const handleRemovePiece = (indexToRemove: number) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        orderedPieces: orderedPieces.filter((_, idx) => idx !== indexToRemove),
      },
    });
  };

  const handleMovePieceUp = (index: number) => {
    if (index === 0) return;
    const pieces = [...orderedPieces];
    const [movedPiece] = pieces.splice(index, 1);
    pieces.splice(index - 1, 0, movedPiece);
    onChange({
      ...module,
      data: {
        ...module.data,
        orderedPieces: pieces,
      },
    });
  };

  const handleMovePieceDown = (index: number) => {
    if (index === orderedPieces.length - 1) return;
    const pieces = [...orderedPieces];
    const [movedPiece] = pieces.splice(index, 1);
    pieces.splice(index + 1, 0, movedPiece);
    onChange({
      ...module,
      data: {
        ...module.data,
        orderedPieces: pieces,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded bg-slate-50">
      <h3 className="font-semibold text-lg">Sentence Module Config</h3>

      <div className="flex gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            Target Sentence Presentation Field
          </span>
          <select
            value={config.sentenceField}
            onChange={(e) => handleConfigChange(e, "sentenceField")}
            className="p-2 border rounded"
          >
            <option value="cherokee">Cherokee</option>
            <option value="phonetic">Phonetics</option>
            <option value="english">English</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Piece Presentation Field</span>
          <select
            value={config.pieceField}
            onChange={(e) => handleConfigChange(e, "pieceField")}
            className="p-2 border rounded"
          >
            <option value="cherokee">Cherokee</option>
            <option value="phonetic">Phonetics</option>
            <option value="english">English</option>
          </select>
        </label>
      </div>

      <hr className="my-2 border-t" />

      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-md">1. Target Sentence</h4>
        {!targetSentence ? (
          <div>
            <p className="text-sm text-slate-600 mb-2">
              Search or create a vocab item to use as the full sentence.
            </p>
            <VocabFindCreate onSelected={handleTargetSentenceSelected} />
          </div>
        ) : (
          <div className="p-3 border rounded bg-white flex items-center justify-between">
            <div className="flex gap-4">
              <span>
                <strong>Ꮳ:</strong> {targetSentence.cherokee}
              </span>
              <span>
                <strong>P:</strong> {targetSentence.phonetic}
              </span>
              <span>
                <strong>E:</strong> {targetSentence.english}
              </span>
            </div>
            <button
              onClick={clearTargetSentence}
              className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
              type="button"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <hr className="my-2 border-t" />

      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-md">2. Ordered Pieces</h4>
        <p className="text-sm text-slate-600 mb-2">
          Add constituent word-parts in the correct order to form the sentence.
        </p>

        <VocabFindCreate onSelected={handlePieceSelected} />

        <div className="mt-4">
          <h5 className="font-medium text-sm mb-2">
            Current Pieces ({orderedPieces.length})
          </h5>
          {orderedPieces.length === 0 ? (
            <p className="text-sm text-slate-500">No pieces added yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {orderedPieces.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="flex items-center justify-between p-2 border rounded bg-white gap-4"
                >
                  <div className="font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                    #{index + 1}
                  </div>
                  <div className="flex gap-4 flex-1">
                    <span>
                      <strong>Ꮳ:</strong> {item.cherokee}
                    </span>
                    <span>
                      <strong>P:</strong> {item.phonetic}
                    </span>
                    <span>
                      <strong>E:</strong> {item.english}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMovePieceUp(index)}
                      disabled={index === 0}
                      className="px-2 py-1 text-xs border rounded disabled:opacity-50 hover:bg-slate-50"
                      type="button"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleMovePieceDown(index)}
                      disabled={index === orderedPieces.length - 1}
                      className="px-2 py-1 text-xs border rounded disabled:opacity-50 hover:bg-slate-50"
                      type="button"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => handleRemovePiece(index)}
                      className="px-2 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
