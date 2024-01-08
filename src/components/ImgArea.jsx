import React from "react";

export default function ImgArea({ currentMusic }) {
  return (
    <div className="image-container">
      <div className="top-bar">
        <span>Now Playing</span>
      </div>
      <div className="img-area">
        <img
          src={`${process.env.PUBLIC_URL}/images/${currentMusic.img}.webp`}
          alt="Music Cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
