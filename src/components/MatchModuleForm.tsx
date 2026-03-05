import React, { useMemo } from "react";
import { type Module } from "../types/lesson";
import { VocabFindCreate } from "./VocabFindCreate";
import { useVocabContextOrThrow, type VocabItem } from "../vocab-context";
import { Trash2, GripVertical, Plus } from "lucide-react";

interface MatchModuleFormProps {
  module: Module & { type: "match" };
  onChange: (updatedModule: Module) => void;
}

export const MatchModuleForm: React.FC<MatchModuleFormProps> = ({
  module,
  onChange,
}) => {
  const { data: vocabData } = useVocabContextOrThrow();
  const { config, data: matchIds } = module.data;

  const data = useMemo(() => {
    return matchIds.map((id) => vocabData.vocabItems[id]).filter(Boolean);
  }, [matchIds, vocabData.vocabItems]);

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
    if (!matchIds.includes(item.id)) {
      onChange({
        ...module,
        data: {
          ...module.data,
          data: [...matchIds, item.id],
        },
      });
    }
  };

  const handleRemove = (idToRemove: string) => {
    onChange({
      ...module,
      data: {
        ...module.data,
        data: matchIds.filter((id) => id !== idToRemove),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
        <label className="space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Front Field
          </span>
          <select
            value={config.front}
            onChange={(e) => handleConfigChange(e, "front")}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          >
            <option value="cherokee">Cherokee</option>
            <option value="phonetic">Phonetics</option>
            <option value="english">English</option>
          </select>
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Back Field
          </span>
          <select
            value={config.back}
            onChange={(e) => handleConfigChange(e, "back")}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          >
            <option value="cherokee">Cherokee</option>
            <option value="phonetic">Phonetics</option>
            <option value="english">English</option>
          </select>
        </label>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <Plus size={14} />
            Matches ({data.length})
          </h4>
        </div>

        <div className="space-y-3">
          {data.length === 0 ? (
            <div className="text-center py-8 bg-gray-50/30 border border-dashed border-gray-200 rounded-lg">
              <p className="text-sm text-gray-400">
                No matching pairs added yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm group hover:border-gray-300 transition-all"
                >
                  <GripVertical
                    size={14}
                    className="text-gray-300 cursor-grab"
                  />
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-gray-400">
                        Cherokee
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {item.cherokee}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-gray-400">
                        English
                      </span>
                      <span className="text-sm text-gray-600">
                        {item.english}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-gray-400">
                        Phonetic
                      </span>
                      <span className="text-sm text-gray-500 italic font-serif">
                        {item.phonetic}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                    type="button"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2">
          <VocabFindCreate onSelected={handleSelected} />
        </div>
      </div>
    </div>
  );
};
