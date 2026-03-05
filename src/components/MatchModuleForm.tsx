import React from "react";
import { type Module } from "../types/lesson";
import { VocabFindCreate } from "./VocabFindCreate";
import { type VocabItem } from "../vocab-context";

interface MatchModuleFormProps {
  module: Module & { type: "match" };
  onChange: (updatedModule: Module) => void;
}

export const MatchModuleForm: React.FC<MatchModuleFormProps> = ({
  module,
  onChange,
}) => {
  const { config, data } = module.data;

  const handleConfigChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: "front" | "back",
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

  const handleSelected = (item: VocabItem) => {
    if (!data.find((d) => d.id === item.id)) {
      onChange({
        ...module,
        data: {
          ...module.data,
          data: [...data, item],
        },
      });
    }
  };

  const handleRemove = (idToRemove: string) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        data: data.filter((item) => item.id !== idToRemove),
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded bg-slate-50">
      <h3 className="font-semibold text-lg">Match Module Config</h3>

      <div className="flex gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Front Field</span>
          <select
            value={config.front}
            onChange={(e) => handleConfigChange(e, "front")}
            className="p-2 border rounded"
          >
            <option value="cherokee">Cherokee</option>
            <option value="phonetic">Phonetics</option>
            <option value="english">English</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Back Field</span>
          <select
            value={config.back}
            onChange={(e) => handleConfigChange(e, "back")}
            className="p-2 border rounded"
          >
            <option value="cherokee">Cherokee</option>
            <option value="phonetic">Phonetics</option>
            <option value="english">English</option>
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Add Vocabulary</h4>
        <VocabFindCreate onSelected={handleSelected} />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="font-medium">Selected Vocabulary ({data.length})</h4>
        {data.length === 0 ? (
          <p className="text-sm text-slate-500">No items selected yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {data.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-2 border rounded bg-white"
              >
                <div className="flex gap-4">
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
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-2 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50"
                  type="button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
