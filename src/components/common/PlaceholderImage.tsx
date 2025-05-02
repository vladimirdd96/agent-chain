"use client";

import React from "react";

interface PlaceholderImageProps {
  title?: string;
  className?: string;
}

export function PlaceholderImage({
  title,
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20 ${className}`}
    >
      <div className="absolute inset-0 border border-white/10 rounded-lg" />
      {title && (
        <span className="text-white/50 text-sm font-medium">{title}</span>
      )}
    </div>
  );
}
