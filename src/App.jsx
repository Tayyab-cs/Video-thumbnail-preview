import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import "./App.css";

function App() {
  const [played, setPlayed] = useState(0);
  const [hoveredTime, setHoveredTime] = useState(null);
  const playerRef = useRef(null);
  const hoverPlayerRef = useRef(null);
  const [seekTime, setSeekTime] = useState(0);

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  const handleSeekChange = (e) => {
    const newTime = e.target.value * playerRef.current.getDuration();
    playerRef.current.seekTo(newTime);
    hoverPlayerRef.current.player.seekTo(parseFloat(e.target.value));
  };

  const handleMouseMove = (e) => {
    const barRect = e.target.getBoundingClientRect();
    const hoverTime = (e.clientX - barRect.left) / barRect.width;
    setHoveredTime(hoverTime * playerRef.current.getDuration());
  };

  const handleMouseLeave = () => {
    setHoveredTime(null);
  };

  const handleSeek = (seek) => {
    console.log("handleSeek: ", seek);
    setSeekTime(seek);
  };

  return (
    <div className="App">
      <h1>Custom Video Player</h1>
      <ReactPlayer
        ref={playerRef}
        url={
          "https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8"
        }
        controls
        light={true}
        onProgress={handleProgress}
        onSeek={handleSeek}
      />
      <div
        className="seekbar-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeekChange}
        />
        {hoveredTime !== null && (
          <div className="thumbnail-preview">
            <ReactPlayer
              ref={hoverPlayerRef}
              width={100}
              height={70}
              url={
                "https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8"
              }
              playing={false}
            />
            <h6>{seekTime}</h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
