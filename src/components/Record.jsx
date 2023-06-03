import React, { useEffect, useRef, useState } from "react";
import allMusic from "../music-list";
import Controls from "./Controls";
import MusicList from "./MusicList";

export default function Record({
  currentPlayMusic,
  listDuration,
  durationLimit,
}) {
  let [currentIndex, setCurrentIndex] = useState(0);
  const currentMusic = allMusic[currentIndex];
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [repeatMode, setRepeatMode] = useState("shuffle");
  const [userGesture, setUserGesture] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const toggleMusicList = () => {
    document.querySelector(".music-list").classList.add("show");
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  };

  const playAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    }
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const skipToNext = () => {
    const newIndex =
      currentIndex === allMusic.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setIsLoading(true);
    setIsPlaying(true);
  };

  const skipToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? allMusic.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setIsLoading(true);
    setIsPlaying(true);
  };

  const getRandomIndex = () => {
    const newIndex = Math.floor(Math.random() * allMusic.length);
    return newIndex !== currentIndex ? newIndex : getRandomIndex();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const updateProgress = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const progressPercent = (currentTime / duration) * 100;
    setProgress(progressPercent);
  };

  const handleProgressBarClick = (event) => {
    const progressBar = event.target;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const progressBarWidth = rect.width;
    const clickPercentage = offsetX / progressBarWidth;
    const newTime = clickPercentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    updateProgress();
    togglePlay();
  };

  const handleLiClick = (musicSrc, songIndex) => {
    const musicIndex = allMusic.findIndex((music) => music.src === musicSrc);
    setCurrentIndex(musicIndex);
    setCurrentSongIndex(songIndex);
    setIsPlaying(true);
    setIsPaused(false);
    setProgress(0);
  };

  const handleMusicEnd = () => {
    if (repeatMode === "repeat") {
      skipToNext();
    } else if (repeatMode === "shuffle") {
      const randomIndex = getRandomIndex();
      setCurrentIndex(randomIndex);
      setIsLoading(true);
      setIsPlaying(true);
    } else if (repeatMode === "repeat_one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    const newMusic = allMusic[currentIndex];
    setProgress((currentTime / newMusic.duration) * 100);
  };

  const toggleRepeatMode = () => {
    if (repeatMode === "shuffle") {
      setRepeatMode("repeat");
    } else if (repeatMode === "repeat") {
      setRepeatMode("repeat_one");
    } else {
      setRepeatMode("shuffle");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    audioRef.current.addEventListener("canplaythrough", () => {
      setIsLoading(false);
      setDuration(audioRef.current.duration);
    });
    setIsPlaying(true);

    audioRef.current.addEventListener("timeupdate", () => {
      setCurrentTime(audioRef.current.currentTime);
      updateProgress();
    });

    if (!isLoading && audioRef.current.paused) {
      pauseAudio();
      setIsPaused(true);
    } else {
      playAudio();
      setIsPlaying(true);
      setIsPaused(false);
    }

    return () => {
      audioRef.current.removeEventListener("canplaythrough", () => {
        setIsLoading(false);
        setCurrentTime(audioRef.current.duration);
        updateProgress();
      });

      audioRef.current.removeEventListener("timeupdate", () => {
        setDuration(audioRef.current.currentTime);
      });
    };
  }, [isLoading]);

  useEffect(() => {
    const randomIndex = getRandomIndex();
    setCurrentIndex(randomIndex);
  }, []);

  useEffect(() => {
    audioRef.current.addEventListener("ended", handleMusicEnd);

    return () => {
      audioRef.current.removeEventListener("ended", handleMusicEnd);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (
      listDuration &&
      listDuration[currentPlayMusic] &&
      durationLimit &&
      durationLimit[currentPlayMusic]
    ) {
      const progressPercentage =
        (listDuration[currentPlayMusic.src] /
          durationLimit[currentPlayMusic.src]) *
        100;
      setProgress(progressPercentage);
    } else {
      setProgress(0);
    }
  }, [currentPlayMusic, listDuration, durationLimit]);

  useEffect(() => {
    if (currentMusic) {
      audioRef.current.load();
      setIsLoading(true);
      setIsPlaying(true);
      setIsPaused(false);
      setProgress(0);
      setCurrentTime(0);

      const handleCanPlayThrough = () => {
        setIsLoading(false);
        playAudio();
      };

      audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough);

      return () => {
        audioRef.current.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      };
    }
  }, [currentMusic]);

  return (
    <>
      <div className="img-area">
        <img
          src={`${process.env.PUBLIC_URL}/images/${currentMusic.img}.jpg`}
          alt="Music Cover"
        />
      </div>
      <div className="song-details">
        <p className="name">{currentMusic.name}</p>
        <p className="artist">{currentMusic.artist}</p>
      </div>
      <div className="progress-area" onClick={handleProgressBarClick}>
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="timer">
          <span className="current">{formatTime(currentTime)}</span>
          <span className="duration">{formatTime(duration)}</span>
        </div>
      </div>
      <a
        className="download"
        href={`${process.env.PUBLIC_URL}/music/${currentMusic.src}.mp3`}
        download={`${currentMusic.name}(${currentMusic.artist})`}
        id="audio-download"
      >
        <audio
          ref={audioRef}
          src={`${process.env.PUBLIC_URL}/music/${currentMusic.src}.mp3`}
          id="main-audio"
          type="audio/mp3"
        ></audio>
        <i className="material-icons">download_for_offline</i>
      </a>
      <Controls
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        skipToNext={skipToNext}
        skipToPrevious={skipToPrevious}
        repeatMode={repeatMode}
        toggleRepeatMode={toggleRepeatMode}
        toggleMusicList={toggleMusicList}
        currentSongIndex={currentSongIndex}
      />
      <MusicList
        onLiClick={handleLiClick}
        isPaused={isPaused}
        currentSongIndex={currentSongIndex}
        currentPlayingMusic={currentMusic.src}
      />
    </>
  );
}
