import React from "react";
import { type Module, type SentenceModuleData } from "../types/lesson";
import { VocabFindCreate } from "./VocabFindCreate";
import { type VocabItem } from "../vocab-context";
import { Trash2, ChevronUp, ChevronDown, Info, Plus, X } from "lucide-react";

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
    <div className="space-y-8">
      {/* 1. Configuration Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
        <label className="space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Target Sentence Display
          </span>
          <select
            value={config.sentenceField}
            onChange={(e) => handleConfigChange(e, "sentenceField")}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          >
            <option value="cherokee">Cherokee</option>
            <option value="phonetic">Phonetics</option>
            <option value="english">English</option>
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Workpieces Display
          </span>
          <select
            value={config.pieceField}
            onChange={(e) => handleConfigChange(e, "pieceField")}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          >
            <option value="cherokee">Cherokee</option>
            <option value="phonetic">Phonetics</option>
            <option value="english">English</option>
          </select>
        </label>
      </div>

      {/* 2. Target Sentence Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 px-1">
          <Info size={14} className="text-blue-500" />
          1. Full Target Sentence
        </h4>

        {!targetSentence ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-xs text-gray-400 mb-4 italic">
              Identify the complete sentence for this module.
            </p>
            <VocabFindCreate onSelected={handleTargetSentenceSelected} />
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-blue-50/30 border border-blue-100 rounded-xl shadow-sm">
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-blue-400">
                  Cherokee
                </span>
                <span className="text-sm font-bold text-gray-900 leading-tight">
                  {targetSentence.cherokee}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-blue-400">
                  English
                </span>
                <span className="text-sm text-gray-700 leading-tight">
                  {targetSentence.english}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-blue-400">
                  Phonetic
                </span>
                <span className="text-sm text-gray-500 italic font-serif leading-tight">
                  {targetSentence.phonetic}
                </span>
              </div>
            </div>
            <button
              onClick={clearTargetSentence}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Clear target sentence"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* 3. Ordered Pieces Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 px-1">
          <Plus size={14} className="text-blue-500" />
          2. Word Fragments (In order)
        </h4>

        <div className="space-y-4">
          {orderedPieces.length > 0 && (
            <div className="grid grid-cols-1 gap-2">
              {orderedPieces.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-all group"
                >
                  <div className="w-6 h-6 bg-gray-100 rounded text-[10px] font-bold text-gray-400 flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>

                  <div className="flex-1 grid grid-cols-3 gap-3 overflow-hidden">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {item.cherokee}
                    </span>
                    <span className="text-sm text-gray-500 truncate">
                      {item.english}
                    </span>
                    <span className="text-xs text-gray-400 italic font-serif truncate">
                      {item.phonetic}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMovePieceUp(index)}
                      disabled={index === 0}
                      className="p-1 text-gray-300 hover:text-gray-600 disabled:opacity-0 transition-all"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      onClick={() => handleMovePieceDown(index)}
                      disabled={index === orderedPieces.length - 1}
                      className="p-1 text-gray-300 hover:text-gray-600 disabled:opacity-0 transition-all"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      onClick={() => handleRemovePiece(index)}
                      className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors ml-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-gray-50/30 border border-dashed border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-4 px-1">
              Add words or particles in the correct order to form the sentence.
            </p>
            <VocabFindCreate onSelected={handlePieceSelected} />
          </div>
        </div>
      </div>
    </div>
  );
};
