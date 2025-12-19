"use client";

export const Select = ({
  options,
  onSelect,
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <div className="relative">
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="
          w-full
          appearance-none
          rounded-lg
          border border-white/10
          bg-[#1c1b1b]
          px-4 py-2.5
          pr-10
          text-sm
          text-white
          shadow-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2 focus:ring-blue-500/30
          hover:border-white/20
        "
      >
        {options.map((option) => (
          <option
            key={option.key}
            value={option.key}
            className="bg-[#1c1b1b] text-white"
          >
            {option.value}
          </option>
        ))}
      </select>

      {/* Dropdown Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
        ▼
      </div>
    </div>
  );
};
