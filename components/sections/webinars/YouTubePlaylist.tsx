"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { WebinarVideo } from "@/lib/webinar-videos";

interface YouTubePlaylistProps {
  videos: WebinarVideo[];
  playlistLabel?: string;
}

export function YouTubePlaylist({ videos, playlistLabel }: YouTubePlaylistProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = videos[activeIndex];

  const hasRealId = (id: string) => id !== "REPLACE_WITH_VIDEO_ID";

  return (
    <section className="relative overflow-hidden rounded-xl border border-gray-200 bg-white px-5 py-6 md:px-7 md:py-8">
      <div
        className="absolute inset-0 bg-white"
        aria-hidden
      />
      <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
        <defs>
          <pattern
            id="youtube-playlist-hex"
            x="0"
            y="0"
            width="60"
            height="34.64"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2)"
          >
            <path
              d="M0 17.32L10 0H30L40 17.32L30 34.64H10L0 17.32Z M40 17.32H60"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="0.55"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#youtube-playlist-hex)" />
      </svg>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Left: Player ── */}
          <div className="flex-1 min-w-0">
            {playlistLabel && (
              <div className="mb-3 inline-flex items-center rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                {playlistLabel}
              </div>
            )}
            {/* 16:9 responsive iframe */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-gray-900" style={{ paddingBottom: "56.25%" }}>
              {hasRealId(active.id) ? (
                <iframe
                  key={active.id}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${active.id}?rel=0&modestbranding=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                /* Placeholder when video ID hasn't been set yet */
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-blue-950 text-white gap-4 p-6">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                    <Play className="w-8 h-8 fill-white text-white ml-1" />
                  </div>
                  <p className="text-lg font-semibold text-center">{active.title}</p>
                  <p className="text-sm text-blue-200 text-center max-w-sm">
                    Video ID not yet configured. Update <code className="bg-white/10 px-1 rounded">lib/webinar-videos.ts</code> with the YouTube video ID.
                  </p>
                </div>
              )}
            </div>

            {/* Video info below player */}
            <div className="mt-4 space-y-1">
              <h2 className="text-xl font-bold text-brand-blue">{active.title}</h2>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                {active.date && <span>{active.date}</span>}
                {active.date && active.duration && <span>·</span>}
                {active.duration && <span>{active.duration}</span>}
              </div>
              {active.description && (
                <p className="text-gray-600 text-sm leading-relaxed pt-1">{active.description}</p>
              )}
            </div>
          </div>

          {/* ── Right: Playlist ── */}
          <div className="lg:w-72 xl:w-80 shrink-0">
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
              {/* Playlist header */}
              <div className="bg-brand-blue px-4 py-3">
                <p className="text-sm font-semibold text-white tracking-wide uppercase">Playlist</p>
              </div>

              {/* Scrollable list */}
              <div className="divide-y divide-gray-100 max-h-[560px] overflow-y-auto">
                {videos.map((video, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors group ${
                      i === activeIndex
                        ? "bg-brand-blue/5 border-l-4 border-brand-orange"
                        : "hover:bg-gray-50 border-l-4 border-transparent"
                    }`}
                  >
                    {/* Play icon */}
                    <span
                      className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        i === activeIndex
                          ? "bg-brand-orange text-white"
                          : "bg-gray-200 text-gray-500 group-hover:bg-brand-orange/80 group-hover:text-white"
                      }`}
                    >
                      <Play className="w-2.5 h-2.5 fill-current ml-px" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium leading-snug line-clamp-2 ${
                          i === activeIndex ? "text-brand-blue" : "text-gray-700"
                        }`}
                      >
                        {video.title}
                      </p>
                      {video.date && (
                        <p className="text-xs text-gray-400 mt-0.5">{video.date}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
