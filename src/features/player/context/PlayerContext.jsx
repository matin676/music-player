import { createContext, useContext, useReducer } from "react";
import allMusic from "../../../data/music-list";

const PlayerContext = createContext();

const initialState = {
  currentTrackIndex: 0,
  isPlaying: false,
  isPaused: false, // Explicit paused state for UI (optional, can be derived)
  repeatMode: "shuffle", // "shuffle", "repeat", "repeat_one"
  isPlaylistOpen: false,
  volume: 1,
};

function playerReducer(state, action) {
  switch (action.type) {
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_PAUSED":
      return { ...state, isPaused: action.payload };
    case "SET_TRACK":
      return {
        ...state,
        currentTrackIndex: action.payload,
        isPlaying: true,
        isPaused: false,
      };
    case "TOGGLE_PLAYLIST":
      return { ...state, isPlaylistOpen: !state.isPlaylistOpen };
    case "SET_REPEAT_MODE":
      return { ...state, repeatMode: action.payload };
    case "NEXT_TRACK": {
      let nextIndex;
      if (state.repeatMode === "shuffle") {
        let randIndex = Math.floor(Math.random() * allMusic.length);
        while (randIndex === state.currentTrackIndex) {
          randIndex = Math.floor(Math.random() * allMusic.length);
        }
        nextIndex = randIndex;
      } else {
        nextIndex = (state.currentTrackIndex + 1) % allMusic.length;
      }
      return {
        ...state,
        currentTrackIndex: nextIndex,
        isPlaying: true,
        isPaused: false,
      };
    }
    case "PREV_TRACK": {
      const prevIndex =
        state.currentTrackIndex === 0
          ? allMusic.length - 1
          : state.currentTrackIndex - 1;
      return {
        ...state,
        currentTrackIndex: prevIndex,
        isPlaying: true,
        isPaused: false,
      };
    }
    default:
      return state;
  }
}

export function PlayerProvider({ children }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const currentTrack = allMusic[state.currentTrackIndex];

  return (
    <PlayerContext.Provider value={{ state, dispatch, currentTrack, allMusic }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
