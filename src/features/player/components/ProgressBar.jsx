import React from "react";
import { Slider } from "../../../components/ui/Slider";

export default function ProgressBar({ currentTime, duration, onSeek }) {
  const formatTime = (time) => {
    if (Number.isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleChange = (e) => {
    onSeek(Number(e.target.value));
  };

  return (
    <div className="w-full space-y-2 mt-8 px-4">
      <Slider
        value={currentTime}
        max={duration || 100} // Prevent div by zero
        onChange={handleChange}
      />
      <div className="flex justify-between text-xs text-neutral-400 font-medium">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
