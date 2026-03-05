import { useState, useMemo, type ReactElement } from "react";
import { useVocabContextOrThrow, type VocabItem } from "../vocab-context";
import { VocabCreateForm } from "./VocabCreateForm";
import { Search, Plus, X } from "lucide-react";

/**
 * Component to search or create a new vocab item.
 */
export function VocabFindCreate({
  onSelected,
}: {
  onSelected: (selectedItem: VocabItem) => void;
}): ReactElement {
  const { data } = useVocabContextOrThrow();
  const [searchInput, setSearchInput] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const filteredItems = useMemo(() => {
    const query = searchInput.toLowerCase().trim();
    if (!query) return [];

    return Object.values(data.vocabItems).filter(
      (item) =>
        item.cherokee.toLowerCase().includes(query) ||
        item.phonetic.toLowerCase().includes(query) ||
        item.english.toLowerCase().includes(query),
    );
  }, [data.vocabItems, searchInput]);

  const handleCreated = (item: VocabItem) => {
    onSelected(item);
    setIsCreating(false);
    setSearchInput("");
  };

  return (
    <div className="relative w-full">
      {!isCreating ? (
        <div className="space-y-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search vocabulary..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {filteredItems.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto overflow-x-hidden">
              <ul className="divide-y divide-gray-100">
                {filteredItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      onSelected(item);
                      setSearchInput("");
                    }}
                    className="p-3 cursor-pointer hover:bg-blue-50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-gray-900">
                        {item.cherokee}
                      </div>
                      <div className="text-xs text-gray-500 font-medium tracking-wide translate-y-0.5">
                        {item.english}{" "}
                        <span className="opacity-50 mx-1">•</span>{" "}
                        {item.phonetic}
                      </div>
                    </div>
                    <Plus
                      size={14}
                      className="text-blue-500 opacity-0 group-hover:opacity-100"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchInput && filteredItems.length === 0 && (
            <div className="text-xs text-gray-500 py-1 px-1 italic">
              No matches found.
            </div>
          )}

          <button
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
          >
            <Plus size={16} />
            Add new vocabulary item
          </button>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Create New Item
            </h4>
            <button
              onClick={() => setIsCreating(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <VocabCreateForm
            initialCherokee={searchInput}
            onCreated={handleCreated}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      )}
    </div>
  );
}
