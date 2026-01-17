import React from "react";
import { cn } from "../../features/player/utils/cn";

export const Slider = React.forwardRef(
  ({ className, value, max, onChange, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative w-full h-1 bg-neutral-600 rounded-full cursor-pointer group",
          className,
        )}
      >
        <input
          type="range"
          min="0"
          max={max}
          value={value}
          onChange={onChange}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          {...props}
        />
        <div
          className="h-full bg-linear-to-r from-pink-500 to-red-500 rounded-full pointer-events-none"
          style={{ width: `${(value / max) * 100}%` }}
        />
        <div
          className="absolute h-3 w-3 bg-white rounded-full top-1/2 -translate-y-1/2 -ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ left: `${(value / max) * 100}%` }}
        />
      </div>
    );
  },
);

Slider.displayName = "Slider";
