import React, { useEffect, useState } from "react";
import allMusic from "../music-list";

export default function MusicList({
  onLiClick,
  isPaused,
  currentSongIndex,
  currentPlayingMusic,
}) {
  const [duration, setDuration] = useState({});
  const [playingMusic, setPlayingMusic] = useState(null);

  const toggleClose = () => {
    document.querySelector(".music-list").classList.remove("show");
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const handleLoadedMetadata = (event) => {
    const audio = event.target;
    setDuration((prevDuration) => ({
      ...prevDuration,
      [audio.id]: audio.duration,
    }));
  };

  const handleLiClick = (music) => {
    const audioElement = document.getElementById(music.src);
    const liElements = document.querySelectorAll(".music-list li");

    if (playingMusic === music.src) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setPlayingMusic(null);
      onLiClick(null);
    } else {
      if (playingMusic) {
        const prevAudioElement = document.getElementById(playingMusic);
        prevAudioElement.pause();
        prevAudioElement.currentTime = 0;
      }
      audioElement.play();
      setPlayingMusic(music.src);
    }

    liElements.forEach((li) => {
      if (li.getAttribute("li-index") === music.src) {
        li.classList.add("playing");
      } else {
        li.classList.remove("playing");
      }
    });

    onLiClick(music.src);
  };

  useEffect(() => {
    const audioElements = document.querySelectorAll(".music-list audio");
    audioElements.forEach((audio) => {
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    });

    return () => {
      audioElements.forEach((audio) => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      });
    };
  }, []);

  useEffect(() => {
    const audioElement = document.getElementById(playingMusic);

    if (audioElement) {
      const interval = setInterval(() => {
        if (audioElement.paused) {
          clearInterval(interval);
        } else {
          setDuration((prevDuration) => ({
            ...prevDuration,
            [playingMusic]: audioElement.currentTime,
          }));
        }
      }, 1000);
    }

    if (isPaused && audioElement) {
      audioElement.pause();
    }
  }, [playingMusic, isPaused]);

  useEffect(() => {
    const listItems = document.querySelectorAll(".music-list li");
    listItems.forEach((item, index) => {
      if (index === currentSongIndex) {
        item.classList.add("playing");
      } else {
        item.classList.remove("playing");
      }
    });
  }, [currentSongIndex]);

  return (
    <>
      <div className="music-list">
        <div className="header">
          <div className="row">
            <i className="material-icons">queue_music</i>
            <span>Music list</span>
          </div>
          <i id="close" className="material-icons" onClick={toggleClose}>
            close
          </i>
        </div>
        <ul>
          {allMusic.map((music, index) => (
            <li
              key={index}
              onClick={() => handleLiClick(music)}
              li-index={music.src}
              className={currentPlayingMusic === music.src ? "playing" : ""}
            >
              <div className="row">
                <span>{music.name}</span>
                <p>{music.artist}</p>
              </div>
              <audio
                className={music.src}
                src={`/music/${music.src}.mp3`}
                id={music.src}
              ></audio>
              <span id={music.src} className="audio-duration">
                {currentPlayingMusic === music.src
                  ? "Playing..."
                  : duration[music.src]
                  ? formatTime(duration[music.src])
                  : "Loading..."}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
