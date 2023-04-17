import { useState, useEffect } from "react";
// import SpotifyPlayer from "react-spotify-web-playback"
import SpotifyPlayer from "react-spotify-player";

export default function Player({ accessToken, trackUri, defaultTrack }) {
  // const [play, setPlay] = useState(false)

  // useEffect(() => setPlay(true), [trackUri])

  // if (!accessToken) return null
  // return (
  //   <SpotifyPlayer
  //     token={accessToken}
  //     showSaveIcon
  //     callback={state => {
  //       if (!state.isPlaying) setPlay(false)
  //     }}
  //     play={play}
  //     uris={trackUri ? [trackUri] : []}
  //   />
  // )

  const size = {
    width: "100%",
    height: 80,
  };
  const view = "coverart"; // or 'coverart'
  const theme = "black"; // or 'white'

  return (
    <>
      <SpotifyPlayer
        uri={trackUri ? trackUri : defaultTrack}
        size={size}
        view={view}
      />
    </>
  );
}
