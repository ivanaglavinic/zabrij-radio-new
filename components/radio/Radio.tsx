"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./Radio.css"; // merged CSS

export const Radio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackInfo, setTrackInfo] = useState<string>("Loading track…");

  const STATION_ID = "zabrij-radio";
  const API_KEY = "pk_f59abf349a934227bd94f5af5d945086";

  // Play/pause audio based on state
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.warn("Playback blocked:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleMixcloudPlay = () => setIsPlaying(false); // pause radio
    const handleMixcloudPause = () => {
      // Optional: resume radio if needed
      // setIsPlaying(true);
    };

    window.addEventListener("mixcloudPlay", handleMixcloudPlay);
    window.addEventListener("mixcloudPause", handleMixcloudPause);

    return () => {
      window.removeEventListener("mixcloudPlay", handleMixcloudPlay);
      window.removeEventListener("mixcloudPause", handleMixcloudPause);
    };
  }, []);

  // Fetch current track info every 10 seconds
  useEffect(() => {
    const fetchTrackInfo = async () => {
      try {
        const res = await fetch(
          `https://api.radiocult.fm/api/station/${STATION_ID}/schedule/live`,
          {
            headers: {
              "x-api-key": API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log("Live now API response:", data);

        const status = data?.result?.status;
        const meta = data?.result?.metadata;
        const content = data?.result?.content;

        if (status === "schedule" || status === "defaultPlaylist") {
          // Prefer artist + title if both exist
          if (meta?.artist && meta?.title) {
            setTrackInfo(`${meta.artist} – ${meta.title}`);
          }
          // If only title exists (no artist)
          else if (meta?.title) {
            setTrackInfo(meta.title);
          }
          // Fallback to schedule title (e.g. show name)
          else if (content?.title) {
            setTrackInfo(content.title);
          }
          // Final fallback
          else {
            setTrackInfo("ZABRIJ RADIO PLAYLIST");
          }
        } else if (status === "offAir") {
          setTrackInfo("We are off air right now.");
        } else {
          setTrackInfo("");
        }
      } catch (err) {
        console.error(err);
        setTrackInfo("Error loading track info");
      }
    };

    fetchTrackInfo();
    const interval = setInterval(fetchTrackInfo, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-radio-player">
      <audio
        ref={audioRef}
        src="https://zabrij-radio.radiocult.fm/stream"
        preload="none"
      />

      <div className="player-content">
        <button
          className="player-toggle"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <Image
            src={isPlaying ? "/images/pause.png" : "/images/play.png"}
            alt={isPlaying ? "Pause" : "Play"}
            width={32}
            height={32}
            className="player-icon"
          />
        </button>

        <div className="player-info">
          <div className="station-name">ON AIR</div>
          <div className="track-info">{trackInfo}</div>
        </div>
      </div>
    </div>
  );
};
