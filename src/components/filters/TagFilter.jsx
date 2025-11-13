export default function TagFilter({
  label,
  selectedTags,
  availableTags,
  onToggle,
}) {
  return (
    <div className="flex flex-col overflow-hidden">
      <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
        {label}
      </label>

      {/* Выбранные теги */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#FF6B9D] text-white cursor-pointer"
              onClick={() => onToggle(tag)}
            >
              {tag}
              <span className="ml-1 text-sm">×</span>
            </span>
          ))}
        </div>
      )}

      {/* Доступные теги */}
      <div className="flex flex-wrap gap-2 overflow-y-auto md:overflow-visible">
        {availableTags
          .filter((tag) => !selectedTags.includes(tag))
          .map((tag) => (
            <button
              key={tag}
              onClick={() => onToggle(tag)}
              className="px-3 py-1 rounded-full text-sm border border-[#E0E0E0] dark:border-[#404040] text-[#666666] dark:text-[#AAAAAA] hover:border-[#FF6B9D] hover:text-[#FF6B9D] transition-colors"
            >
              {tag}
            </button>
          ))}
      </div>
    </div>
  );
}
