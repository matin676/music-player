import React from "react";
import { usePlayer } from "../context/PlayerContext";
import { motion } from "framer-motion";

export default function NowPlaying() {
  const { currentTrack, state } = usePlayer();
  // Ensure we handle assets correctly with Vite's BASE_URL
  const baseUrl = import.meta.env.BASE_URL || "/";
  const imgSrc = `${baseUrl}images/${currentTrack.img}.webp`;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 mt-4">
      <motion.div
        className="relative w-64 h-64 rounded-xl overflow-hidden shadow-xl border-2 border-white/10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={imgSrc}
          alt="Album Art"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="text-center space-y-1">
        <motion.h2
          className="text-2xl font-bold text-white tracking-wide"
          key={currentTrack.name} // Animate on change
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {currentTrack.name}
        </motion.h2>
        <motion.p
          className="text-neutral-400 text-lg"
          key={currentTrack.artist}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {currentTrack.artist}
        </motion.p>
      </div>
    </div>
  );
}
