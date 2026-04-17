

"use client";

import { useEffect, useMemo, useState } from "react";

function ReelCard({ post }) {
  const item =
    Array.isArray(post.items) && post.items.length > 0
      ? post.items[0]
      : {
          id: post.id,
          mediaType: post.mediaType,
          mediaUrl: post.mediaUrl,
          thumbnailUrl: post.thumbnailUrl,
          alt: post.alt,
          video: post.video,
        };

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-[20px] border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <video
          src={item.mediaUrl}
          poster={item.thumbnailUrl || ""}
          className="h-full w-full object-cover"
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
        />
        <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
          Reel
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
      </div>
    </a>
  );
}

export default function InstagramReelsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadInstagramPosts() {
      try {
        setError("");

        const res = await fetch("/api/instagram?limit=20", {
          cache: "no-store",
        });

        const data = await res.json();

        if (ignore) return;

        if (res.ok && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          setPosts([]);
          setError(data?.error || "Failed to load Instagram posts");
        }
      } catch (err) {
        if (!ignore) {
          setPosts([]);
          setError("Failed to load Instagram posts");
          console.error("Instagram fetch failed:", err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadInstagramPosts();

    return () => {
      ignore = true;
    };
  }, []);

  const visiblePosts = useMemo(() => {
    return posts.filter((post) => post.mediaType === "VIDEO").slice(0, 4);
  }, [posts]);

  return (
    <section className="bg-[#f8f8f8]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Social Style
            </p>
            <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[38px]">
              Latest Reels
            </h2>
          </div>

          <a
            href="https://www.instagram.com/trendzfirenze/"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#111111]"
          >
            @trendzfirenze
          </a>
        </div>

        {loading ? (
          <p className="text-sm text-neutral-500">Loading the latest reels...</p>
        ) : error ? (
          <p className="text-sm text-red-500">
            Unable to load Instagram reels right now.
          </p>
        ) : visiblePosts.length === 0 ? (
          <p className="text-sm text-neutral-500">
            Instagram reels will appear here soon.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {visiblePosts.map((post) => (
              <ReelCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}