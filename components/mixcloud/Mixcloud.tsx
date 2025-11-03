/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";

import "./mixcloud.css";

type Upload = {
  key: string;
  title: string;
  date: string;
  picture: string;
};

type MixcloudAPIResponse = {
  data: {
    key: string;
    name: string;
    created_time: string;
    pictures?: {
      large?: string;
    };
  }[];
  paging?: {
    next?: string;
  };
};

export const Mixcloud = () => {
  const [uploads, setUploads] = useState<Upload[]>([]); // paginated
  const [allUploads, setAllUploads] = useState<Upload[]>([]); // for full search
  const [filteredUploads, setFilteredUploads] = useState<Upload[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Upload | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const username = "zabrijradio";
  const limit = 14;
  const baseUrl = `https://api.mixcloud.com/${username}/cloudcasts/?limit=${limit}`;

  // 🔹 Fetch a single page (for pagination)
  const fetchUploadsPage = async (url: string) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error fetching: ${res.statusText}`);
      const data: MixcloudAPIResponse = await res.json();

      const newItems: Upload[] = data.data.map((item) => ({
        key: item.key,
        title: item.name,
        date: item.created_time,
        picture: item.pictures?.large || "/placeholder.png",
      }));

      setUploads((prev) => [...prev, ...newItems]);
      setNextPage(data.paging?.next || null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch all tracks for search (background)
  const fetchAllUploads = async () => {
    let url: string | null = `https://api.mixcloud.com/${username}/cloudcasts/`;
    let all: Upload[] = [];

    try {
      while (url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error fetching: ${res.statusText}`);
        const data: MixcloudAPIResponse = await res.json();

        const newItems: Upload[] = data.data.map((item) => ({
          key: item.key,
          title: item.name,
          date: item.created_time,
          picture: item.pictures?.large || "/placeholder.png",
        }));

        all = [...all, ...newItems];
        url = data.paging?.next || null;
      }

      setAllUploads(all);
    } catch (err: unknown) {
      console.error("Error fetching all tracks for search", err);
    }
  };

  // 🔹 Load first page and fetch all tracks in background
  useEffect(() => {
    fetchUploadsPage(baseUrl);
    fetchAllUploads();
  }, [baseUrl]);

  // 🔹 Filter tracks
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUploads(uploads); // show paginated tracks
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredUploads(
        allUploads.filter((upload) =>
          upload.title.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, uploads, allUploads]);

  if (error) return <div className="mixcloud-error">Error: {error}</div>;
  if (!uploads.length && loading)
    return <div className="mixcloud-loading"></div>;

  return (
    <div className="container">
      <h2 className="mixcloud-title">ARCHIVE</h2>

      {/* 🔹 Search input */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search by artist..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 🔹 Tracks grid */}
      <div className="grid">
        {filteredUploads.map((upload, index) => (
          <MixcloudCard
            key={`${upload.key}-${index}`}
            upload={upload}
            onPlay={() => setCurrentTrack(upload)}
          />
        ))}
      </div>

      {/* 🔹 Load More button */}
      {nextPage && !searchQuery && (
        <div className="load-more-wrapper">
          <button
            className="load-more-btn"
            onClick={() => fetchUploadsPage(nextPage)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* 🔹 Player */}
      {currentTrack && (
        <div className="player">
          <MixcloudIframe trackKey={currentTrack.key} />
        </div>
      )}
    </div>
  );
};

// 🎵 Single Mix Card
const MixcloudCard = ({
  upload,
  onPlay,
}: {
  upload: Upload;
  onPlay: () => void;
}) => {
  return (
    <div className="card">
      <div className="imageWrapper">
        <img
          src={upload.picture}
          alt={upload.title}
          width={600}
          height={600}
          className="image"
        />
        <button className="playButton" onClick={onPlay}>
          <div className="playIcon"></div>
        </button>
      </div>
      <h3 className="title">{upload.title}</h3>
      <p className="date">{new Date(upload.date).toLocaleDateString()}</p>
    </div>
  );
};

const MixcloudIframe = ({ trackKey }: { trackKey: string }) => {
  const src = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=1&feed=${encodeURIComponent(
    trackKey
  )}`;

  return (
    <iframe
      title="Mixcloud Player"
      width="100%"
      height={120}
      src={src}
      frameBorder={0}
      allow="autoplay; encrypted-media"
      loading="lazy"
    />
  );
};
