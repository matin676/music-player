import React from "react";

export default function Controls({
  isPlaying,
  togglePlay,
  skipToNext,
  skipToPrevious,
  repeatMode,
  toggleRepeatMode,
  toggleMusicList,
}) {
  const getRepeatModeTitle = () => {
    if (repeatMode === "shuffle") {
      return "Playlist shuffled";
    } else if (repeatMode === "repeat") {
      return "Playlist looped";
    } else if (repeatMode === "repeat_one") {
      return "Song looped";
    }
  };

  return (
    <div className="controls">
      <i
        id="repeat-list"
        className="material-icons"
        onClick={toggleRepeatMode}
        title={getRepeatModeTitle()}
      >
        {repeatMode}
      </i>
      <div className="main-controls">
        <div className="skip-prev">
          <i id="prev" className="material-icons" onClick={skipToPrevious}>
            skip_previous
          </i>
        </div>
        <div className="play-pause" onClick={togglePlay}>
          {isPlaying ? (
            <i className="material-icons">pause</i>
          ) : (
            <i className="material-icons">play_arrow</i>
          )}
        </div>
        <div className="skip-next">
          <i id="next" className="material-icons" onClick={skipToNext}>
            skip_next
          </i>
        </div>
      </div>
      <i id="more-music" className="material-icons" onClick={toggleMusicList}>
        queue_music
      </i>
    </div>
  );
}
