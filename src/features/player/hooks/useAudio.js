import { useRef, useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";

export function useAudio() {
  const audioRef = useRef(new Audio());
  const { state, dispatch, currentTrack } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handle source change
  useEffect(() => {
    // Vite base url handling for assets
    const baseUrl = import.meta.env.BASE_URL || "/";
    const src = `${baseUrl}music/${currentTrack.src}.mp3`;

    // Only update src if it's different to prevent reloading
    if (!audioRef.current.src.includes(currentTrack.src)) {
      audioRef.current.src = src;
      audioRef.current.load();
    }
  }, [currentTrack]);

  // Handle play/pause
  useEffect(() => {
    if (state.isPlaying && !state.isPaused) {
      audioRef.current.play().catch((e) => {
        if (e.name !== "NotAllowedError" && e.name !== "AbortError") {
          console.error("Playback failed", e);
        }
        // If autoplay blocked, sync state
        // dispatch({ type: "SET_PLAYING", payload: false }); // Optional: could force UI update
      });
    } else {
      audioRef.current.pause();
    }
  }, [state.isPlaying, state.isPaused, currentTrack]); // currentTrack dependency ensures replay on change

  // Events
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (state.repeatMode === "repeat_one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        dispatch({ type: "NEXT_TRACK" });
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [dispatch, state.repeatMode]);

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return { currentTime, duration, seek, audioRef };
}
