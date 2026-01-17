import React, { useRef, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Music } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export default function Playlist() {
  const { state, dispatch, allMusic } = usePlayer();
  const listRef = useRef(null);

  // Scroll to current track when playlist opens
  useEffect(() => {
    if (state.isPlaylistOpen && listRef.current) {
      const activeItem = listRef.current.querySelector('[data-active="true"]');
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [state.isPlaylistOpen]);

  return (
    <AnimatePresence>
      {state.isPlaylistOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute inset-x-0 bottom-0 h-[60%] bg-neutral-900/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl z-50 flex flex-col shadow-2xl"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-white">
              <Music className="w-5 h-5" />
              <span className="font-semibold">Playlist</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "TOGGLE_PLAYLIST" })}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ul className="flex-1 overflow-y-auto p-2 space-y-1" ref={listRef}>
            {allMusic.map((track, index) => {
              const isActive = state.currentTrackIndex === index;
              const isPlaying = isActive && state.isPlaying && !state.isPaused;

              return (
                <li
                  key={track.src}
                  data-active={isActive}
                  onClick={() =>
                    dispatch({ type: "SET_TRACK", payload: index })
                  }
                  className={`p-3 rounded-lg cursor-pointer flex items-center justify-between transition-colors
                            ${isActive ? "bg-white/10" : "hover:bg-white/5"}
                        `}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-medium ${isActive ? "text-pink-500" : "text-white"}`}
                    >
                      {track.name}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {track.artist}
                    </span>
                  </div>
                  {isPlaying && (
                    <div className="flex gap-1 items-end h-3">
                      <span className="w-1 bg-pink-500 rounded-full animate-music-bar-1 h-2"></span>
                      <span className="w-1 bg-pink-500 rounded-full animate-music-bar-2 h-3"></span>
                      <span className="w-1 bg-pink-500 rounded-full animate-music-bar-3 h-1"></span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
