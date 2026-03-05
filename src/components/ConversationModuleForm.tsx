import React, { useMemo } from "react";
import { type Module, type ConversationModuleData } from "../types/lesson";
import { VocabFindCreate } from "./VocabFindCreate";
import { useVocabContextOrThrow, type VocabItem } from "../vocab-context";
import { Trash2, MessageSquare, X, Eye, Settings2 } from "lucide-react";

interface ConversationModuleFormProps {
  module: Module & { type: "conversation" };
  onChange: (updatedModule: Module) => void;
}

export const ConversationModuleForm: React.FC<ConversationModuleFormProps> = ({
  module,
  onChange,
}) => {
  const { data: vocabData } = useVocabContextOrThrow();
  const {
    config,
    lines,
    distractorOptions: distractorIds,
  } = module.data as ConversationModuleData;

  const handleFieldToggle = (field: "cherokee" | "phonetic" | "english") => {
    const isVisible = config.visibleFields.includes(field);
    const newVisibleFields = isVisible
      ? config.visibleFields.filter((f) => f !== field)
      : [...config.visibleFields, field];

    onChange({
      ...module,
      data: {
        ...module.data,
        config: { ...config, visibleFields: newVisibleFields },
      },
    });
  };

  const handleTargetFieldChange = (
    field: "cherokee" | "phonetic" | "english",
  ) => {
    // When target field changes, clear all masked indices to avoid out-of-bounds/incorrect masks
    const newLines = lines.map((line) => ({ ...line, maskedWords: [] }));

    onChange({
      ...module,
      data: {
        ...module.data,
        config: { ...config, targetField: field },
        lines: newLines,
      },
    });
  };

  const handeAddLine = (sentenceItem: VocabItem) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        lines: [
          ...lines,
          { speaker: "npc", sentence: sentenceItem.id, maskedWords: [] },
        ],
      },
    });
  };

  const handleRemoveLine = (indexToRemove: number) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        lines: lines.filter((_, idx) => idx !== indexToRemove),
      },
    });
  };

  const handleAddDistractor = (item: VocabItem) => {
    if (!distractorIds.includes(item.id)) {
      onChange({
        ...module,
        data: {
          ...module.data,
          distractorOptions: [...distractorIds, item.id],
        },
      });
    }
  };

  const handleRemoveDistractor = (idToRemove: string) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        distractorOptions: distractorIds.filter((id) => id !== idToRemove),
      },
    });
  };

  const distractorOptions = useMemo(() => {
    return distractorIds.map((id) => vocabData.vocabItems[id]).filter(Boolean);
  }, [distractorIds, vocabData.vocabItems]);

  return (
    <div className="space-y-8">
      {/* 1. Configuration Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Settings2 size={14} />
            Visible Fields in Player
          </h4>
          <div className="flex gap-4">
            {(["cherokee", "phonetic", "english"] as const).map((field) => (
              <label
                key={field}
                className="group flex items-center gap-2 cursor-pointer"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-blue-600 checked:border-blue-600 transition-all shadow-sm"
                    checked={config.visibleFields.includes(field)}
                    onChange={() => handleFieldToggle(field)}
                  />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700 capitalize group-hover:text-blue-600 transition-colors">
                  {field}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <Eye size={14} />
            Target field for activity
          </h4>
          <div className="flex gap-4">
            {(["cherokee", "phonetic", "english"] as const).map((field) => (
              <label
                key={field}
                className="group flex items-center gap-2 cursor-pointer"
              >
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="targetField"
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 checked:bg-blue-600 checked:border-blue-600 transition-all shadow-sm"
                    checked={config.targetField === field}
                    onChange={() => handleTargetFieldChange(field)}
                  />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm font-medium text-gray-700 capitalize group-hover:text-blue-600 transition-colors">
                  {field}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Conversation Dialogue Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 px-1">
          <MessageSquare size={14} className="text-blue-500" />
          Dialogue Lines
        </h4>

        <div className="space-y-4">
          {lines.length > 0 && (
            <div className="space-y-4">
              {lines.map((line, index) => {
                const sentence = vocabData.vocabItems[line.sentence];
                if (!sentence) return null;

                return (
                  <div
                    key={`${line.sentence}-${index}`}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm"
                  >
                    <div className="px-4 py-2 bg-gray-50/50 border-b border-gray-200 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          Line #{index + 1}
                        </span>
                        <div className="flex bg-gray-200/50 p-0.5 rounded-lg border border-gray-300">
                          {(["npc", "user"] as const).map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                const newLines = [...lines];
                                newLines[index] = { ...line, speaker: s };
                                onChange({
                                  ...module,
                                  data: { ...module.data, lines: newLines },
                                });
                              }}
                              className={`px-3 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tighter transition-all ${
                                line.speaker === s
                                  ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                                  : "text-gray-400 hover:text-gray-600"
                              }`}
                            >
                              {s === "npc" ? "NPC (Left)" : "User (Right)"}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveLine(index)}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-gray-400 mb-0.5">
                            Cherokee
                          </span>
                          <span className="text-sm font-bold text-gray-900 leading-tight">
                            {sentence.cherokee}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-gray-400 mb-0.5">
                            English
                          </span>
                          <span className="text-sm text-gray-600 leading-tight">
                            {sentence.english}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-gray-400 mb-0.5">
                            Phonetic
                          </span>
                          <span className="text-xs text-gray-400 italic font-serif leading-tight">
                            {sentence.phonetic}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1.5">
                          <Eye size={10} className="text-gray-400" />
                          Masked Words for Activity
                        </label>
                        <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg">
                          {sentence[config.targetField]
                            .split(/\s+/)
                            .map((word, wordIdx) => {
                              const isMasked =
                                line.maskedWords.includes(wordIdx);
                              return (
                                <button
                                  key={wordIdx}
                                  onClick={() => {
                                    const newMasked = isMasked
                                      ? line.maskedWords.filter(
                                          (i) => i !== wordIdx,
                                        )
                                      : [...line.maskedWords, wordIdx];
                                    const newLines = [...lines];
                                    newLines[index] = {
                                      ...line,
                                      maskedWords: newMasked,
                                    };
                                    onChange({
                                      ...module,
                                      data: { ...module.data, lines: newLines },
                                    });
                                  }}
                                  className={`px-2 py-1 rounded text-sm transition-all ${
                                    isMasked
                                      ? "bg-blue-600 text-white shadow-sm"
                                      : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                                  }`}
                                >
                                  {word}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-gray-50/30 border border-dashed border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-4 px-1 italic text-center">
              Construct the dialogue flow by adding sentences below.
            </p>
            <VocabFindCreate onSelected={handeAddLine} />
          </div>
        </div>
      </div>

      {/* 3. Distractors Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 px-1">
          <Settings2 size={14} className="text-blue-500" />
          Distractor Options (Incorrect choices)
        </h4>

        <div className="space-y-4">
          {distractorOptions.length > 0 && (
            <div className="flex flex-wrap gap-2 p-1">
              {distractorOptions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 bg-white border border-gray-200 pl-3 pr-2 py-1.5 rounded-full text-sm shadow-sm hover:border-blue-200 transition-all group"
                >
                  <span className="font-medium text-gray-700">
                    {item.cherokee}
                  </span>
                  <button
                    onClick={() => handleRemoveDistractor(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-gray-100">
            <VocabFindCreate onSelected={handleAddDistractor} />
          </div>
        </div>
      </div>
    </div>
  );
};
