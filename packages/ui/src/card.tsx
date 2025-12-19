import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="
        relative
        rounded-2xl
        border border-white/10
        bg-gradient-to-br from-[#1c1b1b] to-[#111]
        p-6
        shadow-lg shadow-black/40
      "
    >
      {/* Header */}
      <h1
        className="
          mb-4
          flex items-center justify-between
          border-b border-white/10
          pb-3
          text-lg font-semibold
          text-white
        "
      >
        {title}
      </h1>

      {/* Content */}
      <div className="text-gray-300 space-y-3">
        {children}
      </div>
    </div>
  );
}
