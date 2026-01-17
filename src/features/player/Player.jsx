import React from "react";
import NowPlaying from "./components/NowPlaying";
import ProgressBar from "./components/ProgressBar";
import Controls from "./components/Controls";
import Playlist from "./components/Playlist";
import { useAudio } from "./hooks/useAudio";

export default function Player() {
  const { currentTime, duration, seek, audioRef } = useAudio();

  return (
    <div className="w-full relative">
      <audio ref={audioRef} hidden />

      <NowPlaying />

      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={seek}
      />

      <Controls />

      <Playlist />
    </div>
  );
}
