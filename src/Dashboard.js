import { useState, useEffect, cloneElement } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form, Navbar } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import TopTrackList from "./TopTrackList";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import "./Dashboard.css";
import ResponsiveNavbar from "./Navbar";
import ReactLoading from "react-loading";
import { FadeIn } from "react-slide-fade-in";
import Countdown from "react-countdown";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
});

export default function Dashboard({ code }) {
  const accessToken = code;
  // const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  // const [lyrics, setLyrics] = useState("");
  const [topTracks, setTopTracks] = useState();
  const [loading, setLoading] = useState(true);

  function chooseTrack(track) {
    console.log(track);
    setPlayingTrack(track);
    // setSearch("");
    // setLyrics("");
    const spotifyEmbedWindow = document.querySelector("iframe");
    spotifyEmbedWindow.onload = () => {
      spotifyEmbedWindow.contentWindow.postMessage({ command: "toggle" }, "*");
    };
  }

  function saveToPng() {
    let list = document.getElementById("top-track-list");
    list.style.overflowY = "";
    let trademark = document.getElementById("trademark");
    trademark.hidden = false;
    let node = document.getElementById("save-to-jpg");

    let viewport = document.querySelector("meta[name=viewport]");
    // if (document.documentElement.clientWidth < 500) {
    viewport.setAttribute("content", "width=500 , initial-scale=0.9");
    // }

    const filter = (node) => {
      if (node.nodeName == "#text") return true;

      const exclusionClasses = ["btn-download"];
      return !exclusionClasses.some((classname) =>
        node.classList.contains(classname)
      );
    };

    htmlToImage
      .toJpeg(node, {
        quality: 0.95,
        // canvasWidth: "1750",
        // width: "500",
        height: "1100",
        filter: filter,
      })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "top-track-list.jpeg";
        link.href = dataUrl;
        link.click();
      });

    setTimeout(() => {
      list.style.overflowY = "auto";
      viewport.setAttribute("content", "width=device-width, initial-scale=1");
      trademark.hidden = true;
    }, "500");
  }

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return (
        <div
          className='d-flex flex-row justify-content-center align-items-center btn-sm btn-primary my-3 btn-download'
          onClick={saveToPng}
          style={{
            cursor: "pointer",
            borderRadius: "1000px",
            // width: "120px",
          }}
        >
          <div className='mx-2'>
            <i className='fa-solid fa-download mr-2'></i>Save as Jpg
          </div>
        </div>
      );
    } else {
      // Render a countdown
      return (
        <div
          className='d-flex flex-row justify-content-center align-items-center btn-sm btn-secondary my-3 '
          style={{
            cursor: "pointer",
            borderRadius: "1000px",
            // width: "120px",
            color: "white",
          }}
        >
          <div className='mx-2'>
            <i className='fa-solid fa-download mr-2'></i>Please wait for{" "}
            {seconds} seconds
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    setLoading(true);
    setTimeout(() => {
      axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          params: { limit: 10, offset: 0 },
        })
        .then((res) => {
          setTopTracks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, "1500");
  }, [accessToken]);

  return (
    <>
      <ResponsiveNavbar />
      <div id='save-to-jpg'>
        <Container
          id='dashboard-container'
          className='d-flex flex-column py-2 dashboard-container'
          style={{
            height: "calc(93vh + 1.5px)",
            width: "auto",
            maxWidth: "500px",
            // marginTop: "8vh",
          }}
        >
          <div id='dashboard-header' className='mx-2'>
            <h2 className='my-0 text-center' style={{ color: "#fff" }}>
              Your Top 10 Tracks
            </h2>
            <p className='text-center my-0' style={{ color: "#fff" }}>
              (approximately from last 6 months)
            </p>
          </div>
          {/* <Form.Control
        type='search'
        placeholder='Search Songs/Artists'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='flex-grow-1 my-2' style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className='text-center' style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div> */}
          <div
            id='top-track-list'
            className='flex-grow-1 mt-2 style-7'
            style={{ overflowY: "auto" }}
          >
            {loading ? (
              <div
                className='d-flex flex-column align-items-center justify-content-center'
                style={{ height: "400px" }}
              >
                <ReactLoading type='spin' />
                <p className='f4 text-white my-4'>Loading ...</p>
              </div>
            ) : (
              topTracks.items.map((track, index) => (
                <FadeIn
                  from={index % 2 === 0 ? "left" : "right"}
                  positionOffset={0}
                  triggerOffset={1000}
                  delayInMilliseconds={index * 400}
                >
                  <TopTrackList
                    track={track}
                    key={track.id}
                    idx={index}
                    chooseTrack={chooseTrack}
                  />
                </FadeIn>
              ))
            )}
          </div>
          <div
            className='d-flex flex-column justify-content-center align-items-center spotify-player'
            id='spotify-player'
          >
            <div hidden id='trademark'>
              <div
                className='d-flex flex-row justify-content-center align-items-center btn-sm btn-secondary my-3'
                style={{
                  cursor: "pointer",
                  borderRadius: "1000px",
                }}
              >
                <div className='mx-2'>
                  <i className='fa-brands fa-spotify mr-2'></i>
                  Made by @ryandrie with Spotify API
                </div>
              </div>
            </div>
            <Countdown date={Date.now() + 5000} renderer={renderer} />
            <FadeIn
              from='top'
              positionOffset={100}
              triggerOffset={100}
              delayInMilliseconds={500}
            >
              <Player
                accessToken={accessToken}
                trackUri={playingTrack?.uri}
                defaultTrack={"spotify:track:4jzNb4SziJCRL7K7dVimn7"}
              />
            </FadeIn>
          </div>
        </Container>
      </div>
    </>
  );
}
