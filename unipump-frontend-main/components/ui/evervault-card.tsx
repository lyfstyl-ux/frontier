"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const EvervaultCard = ({ className }: { className?: string }) => {
  // Render a static background only, no animation or mouse tracking
  return (
    <div
      className={cn(
        "p-0.5 bg-transparent aspect-square absolute flex items-center justify-center w-full h-full",
        className,
      )}
    >
      <div className="w-full h-full bg-site-main opacity-80 rounded-2xl" />
    </div>
  );
};
