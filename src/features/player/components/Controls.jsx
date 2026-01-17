import React from "react";
import { usePlayer } from "../context/PlayerContext";
import { Button } from "../../../components/ui/Button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  ListMusic,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Controls() {
  const { state, dispatch } = usePlayer();

  const handleRepeatClick = () => {
    let nextMode = "shuffle";
    if (state.repeatMode === "shuffle") nextMode = "repeat";
    else if (state.repeatMode === "repeat") nextMode = "repeat_one";

    dispatch({ type: "SET_REPEAT_MODE", payload: nextMode });
  };

  return (
    <div className="flex items-center justify-between w-full px-4 mt-8 mb-4">
      {/* Repeat/Shuffle Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRepeatClick}
        className={
          state.repeatMode !== "shuffle" ? "text-pink-500" : "text-neutral-400"
        }
        title={`Mode: ${state.repeatMode}`}
      >
        {state.repeatMode === "repeat_one" ? (
          <Repeat className="w-5 h-5 relative">
            <span className="absolute text-[8px] font-bold top-[6px] left-[7px]">
              1
            </span>
          </Repeat>
        ) : state.repeatMode === "repeat" ? (
          <Repeat className="w-5 h-5" />
        ) : (
          <Shuffle className="w-5 h-5" />
        )}
      </Button>

      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch({ type: "PREV_TRACK" })}
        >
          <SkipBack className="w-8 h-8 fill-current" />
        </Button>

        <motion.div whileTap={{ scale: 0.9 }}>
          <Button
            variant="primary"
            size="lg"
            className="rounded-full shadow-lg shadow-pink-500/20 bg-linear-to-r from-pink-500 to-red-500 text-white border-none hover:opacity-90 transition-opacity"
            onClick={() =>
              dispatch({ type: "SET_PAUSED", payload: !state.isPaused })
            }
          >
            {state.isPlaying && !state.isPaused ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </Button>
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch({ type: "NEXT_TRACK" })}
        >
          <SkipForward className="w-8 h-8 fill-current" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch({ type: "TOGGLE_PLAYLIST" })}
        className={state.isPlaylistOpen ? "text-pink-500" : "text-neutral-400"}
      >
        <ListMusic className="w-5 h-5" />
      </Button>
    </div>
  );
}
