import { useState } from "react";
import { FastAverageColor } from "fast-average-color";

export default function TopTrackList({ track, idx, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  function changeBgColor() {
    const fac = new FastAverageColor();
    const container = document.querySelector(`.img-${track.id}`);

    fac
      .getColorAsync(container.querySelector("img"))
      .then((color) => {
        container.style.backgroundColor = color.rgba;
        container.style.color = color.isDark ? "#fff" : "#000";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div
      className={`d-flex ${idx % 2 !== 0 ? "flex-row-reverse" : ""}  p-2 ${
        idx === 9 ? "mx-2 mt-2" : "m-2"
      } align-items-center img-${track.id}`}
      style={{ cursor: "pointer", borderRadius: "10px" }}
      onClick={handlePlay}
      onLoad={changeBgColor}
    >
      <img
        className='flex'
        crossOrigin='anonymous'
        src={track.album.images[0].url}
        style={{ height: "64px", width: "64px", borderRadius: "5px" }}
      />
      <div className='flex-grow-1 mx-3'>
        <div
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "18px",
            letterSpacing: "1px",
          }}
          className={"d-flex justify-content-center"}
        >
          {track.name}
        </div>
        <div
          style={{ fontSize: "12px" }}
          className={"d-flex justify-content-center"}
        >
          {track.artists[0].name}
        </div>
      </div>
      <div
        className={`d-flex align-items-center justify-content-center`}
        style={{
          width: "64px",
          height: "64px",
        }}
      >
        <div
          id='track-number'
          className={`d-flex align-items-center justify-content-center`}
          style={{
            width: "25px",
            height: "25px",
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "1000px",
            fontFamily: "Roboto Slab, serif",
            fontSize: "13px",
          }}
        >
          {idx + 1}
        </div>
      </div>
    </div>
  );
}
