import React from "react";
import { type Module, type ConversationModuleData } from "../types/lesson";
import { VocabFindCreate } from "./VocabFindCreate";
import { type VocabItem } from "../vocab-context";

interface ConversationModuleFormProps {
  module: Module & { type: "conversation" };
  onChange: (updatedModule: Module) => void;
}

export const ConversationModuleForm: React.FC<ConversationModuleFormProps> = ({
  module,
  onChange,
}) => {
  const { config, lines, distractorOptions } =
    module.data as ConversationModuleData;

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

  const handeAddLine = (sentenceItem: VocabItem) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        lines: [...lines, { sentence: sentenceItem, maskedWords: [] }],
      },
    });
  };

  const handleMaskedWordsChange = (index: number, newWordsStr: string) => {
    const words = newWordsStr
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    const newLines = [...lines];
    newLines[index] = { ...newLines[index], maskedWords: words };
    onChange({
      ...module,
      data: { ...module.data, lines: newLines },
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
    if (!distractorOptions.find((d) => d.id === item.id)) {
      onChange({
        ...module,
        data: {
          ...module.data,
          distractorOptions: [...distractorOptions, item],
        },
      });
    }
  };

  const handleRemoveDistractor = (idToRemove: string) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        distractorOptions: distractorOptions.filter((d) => d.id !== idToRemove),
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded bg-slate-50">
      <h3 className="font-semibold text-lg">Conversation Module Config</h3>

      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium">Visible Fields</h4>
        <div className="flex gap-4">
          {(["cherokee", "phonetic", "english"] as const).map((field) => (
            <label
              key={field}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={config.visibleFields.includes(field)}
                onChange={() => handleFieldToggle(field)}
              />
              <span className="capitalize">{field}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-2 border-t" />

      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-md">Conversation Lines</h4>
        <p className="text-sm text-slate-600 mb-2">
          Build the dialogue by adding sentence vocab items.
        </p>

        <VocabFindCreate onSelected={handeAddLine} />

        <div className="mt-4 flex flex-col gap-3">
          {lines.length === 0 ? (
            <p className="text-sm text-slate-500">No lines added yet.</p>
          ) : (
            lines.map((line, index) => (
              <div
                key={`${line.sentence.id}-${index}`}
                className="flex flex-col gap-2 p-3 border rounded bg-white relative"
              >
                <button
                  onClick={() => handleRemoveLine(index)}
                  className="absolute top-2 right-2 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                  type="button"
                >
                  Remove
                </button>
                <div className="font-mono text-xs text-slate-500 mb-1">
                  Line #{index + 1}
                </div>
                <div className="flex flex-col text-sm border-b pb-2 mb-2">
                  <span>
                    <strong>Ꮳ:</strong> {line.sentence.cherokee}
                  </span>
                  <span>
                    <strong>P:</strong> {line.sentence.phonetic}
                  </span>
                  <span>
                    <strong>E:</strong> {line.sentence.english}
                  </span>
                </div>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-slate-600">
                    Masked Words (comma separated)
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. osiyo, tohiju"
                    className="p-1 border rounded text-sm w-full"
                    value={line.maskedWords.join(", ")}
                    onChange={(e) =>
                      handleMaskedWordsChange(index, e.target.value)
                    }
                  />
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      <hr className="my-2 border-t" />

      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-md">Distractor Options</h4>
        <p className="text-sm text-slate-600 mb-2">
          Add incorrect options for the masked words.
        </p>

        <VocabFindCreate onSelected={handleAddDistractor} />

        <div className="mt-2">
          {distractorOptions.length === 0 ? (
            <p className="text-sm text-slate-500">No distractors added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {distractorOptions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 bg-white border px-2 py-1 rounded text-sm shadow-sm"
                >
                  <span>{item.cherokee}</span>
                  <button
                    onClick={() => handleRemoveDistractor(item.id)}
                    className="text-slate-400 hover:text-red-500 leading-none"
                    type="button"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
