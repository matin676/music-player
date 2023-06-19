import React from "react";

export default function SongDetails({ currentMusic }) {
  return (
    <div className="song-details">
      <p className="name">{currentMusic.name}</p>
      <p className="artist">{currentMusic.artist}</p>
    </div>
  );
}
