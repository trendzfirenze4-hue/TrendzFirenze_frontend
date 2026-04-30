



// "use client";

// import { useEffect, useMemo, useState } from "react";

// function ReelCard({ post }) {
//   const item =
//     Array.isArray(post.items) && post.items.length > 0
//       ? post.items[0]
//       : {
//           id: post.id,
//           mediaType: post.mediaType,
//           mediaUrl: post.mediaUrl,
//           thumbnailUrl: post.thumbnailUrl,
//           alt: post.alt,
//           video: post.video,
//         };

//   return (
//     <a
//       href={post.permalink}
//       target="_blank"
//       rel="noreferrer"
//       className="group block h-full overflow-hidden rounded-[16px] sm:rounded-[20px] border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
//     >
//       <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
//         <video
//           src={item.mediaUrl}
//           poster={item.thumbnailUrl || ""}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
//           muted
//           playsInline
//           autoPlay
//           loop
//           preload="metadata"
//         />

//         <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold text-white sm:right-3 sm:top-3">
//           Reel
//         </div>

//         <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
//       </div>
//     </a>
//   );
// }

// export default function InstagramReelsSection() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let ignore = false;

//     async function loadInstagramPosts() {
//       try {
//         setError("");

//         const res = await fetch("/api/instagram?limit=12");
//         const data = await res.json();

//         if (ignore) return;

//         if (res.ok && Array.isArray(data.posts)) {
//           setPosts(data.posts);
//         } else {
//           setPosts([]);
//           setError(data?.error || "Failed to load Instagram posts");
//         }
//       } catch (err) {
//         if (!ignore) {
//           setPosts([]);
//           setError("Failed to load Instagram posts");
//           console.error("Instagram fetch failed:", err);
//         }
//       } finally {
//         if (!ignore) {
//           setLoading(false);
//         }
//       }
//     }

//     loadInstagramPosts();

//     return () => {
//       ignore = true;
//     };
//   }, []);

//   const visiblePosts = useMemo(() => {
//     return posts.filter((post) => post.mediaType === "VIDEO").slice(0, 4);
//   }, [posts]);

//   return (
//     <section className="w-full bg-[#f8f8f8]">
//       <div className="w-full px-4 py-12 sm:px-6 sm:py-14 md:px-8 lg:px-10 lg:py-16 xl:px-14 2xl:px-20">
//         <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
//           <div className="max-w-full">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
//               Social Style
//             </p>

//             <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[32px] lg:text-[38px]">
//               Latest Reels
//             </h2>
//           </div>

//           <a
//             href="https://www.instagram.com/trendzfirenze/"
//             target="_blank"
//             rel="noreferrer"
//             className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#111111] transition-colors duration-300 hover:text-neutral-600 sm:text-[13px]"
//           >
//             @trendzfirenze
//           </a>
//         </div>

//         {loading ? (
//           <p className="text-sm text-neutral-500">Loading the latest reels...</p>
//         ) : error ? (
//           <p className="text-sm text-red-500">
//             Unable to load Instagram reels right now.
//           </p>
//         ) : visiblePosts.length === 0 ? (
//           <p className="text-sm text-neutral-500">
//             Instagram reels will appear here soon.
//           </p>
//         ) : (
//           <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6 xl:gap-7">
//             {visiblePosts.map((post) => (
//               <ReelCard key={post.id} post={post} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }









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
      className="group block h-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
      aria-label={item?.alt || "Open Instagram reel"}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <video
          src={item.mediaUrl}
          poster={item.thumbnailUrl || ""}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          muted
          playsInline
          autoPlay
          loop
          preload="metadata"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-90" />

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111111] shadow-sm backdrop-blur-sm sm:left-4 sm:top-4">
          Reel
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-end justify-between sm:bottom-4 sm:left-4 sm:right-4">
          <div className="max-w-[70%] rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm sm:text-[11px]">
            Trendz Firenze
          </div>

          <div className="rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-[#111111]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M9 7h8v8" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function InstagramReelsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileSlide, setMobileSlide] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadInstagramPosts() {
      try {
        setError("");

        const res = await fetch("/api/instagram?limit=12");
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

  const mobileSlides = useMemo(() => {
    const slides = [];

    for (let i = 0; i < visiblePosts.length; i += 2) {
      slides.push(visiblePosts.slice(i, i + 2));
    }

    return slides;
  }, [visiblePosts]);

  useEffect(() => {
    if (mobileSlides.length <= 1) return;

    const timer = setInterval(() => {
      setMobileSlide((prev) => (prev + 1) % mobileSlides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [mobileSlides.length]);

  useEffect(() => {
    setMobileSlide(0);
  }, [visiblePosts.length]);

  return (
    <section className="w-full bg-gradient-to-b from-[#fcfcfc] via-[#f8f8f8] to-[#f3f3f3]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-10 lg:py-16 xl:px-14 2xl:px-20">
        <div className="mb-8 flex flex-col gap-4 border-b border-neutral-200/80 pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-7">
          <div className="max-w-[760px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500 sm:text-[12px]">
              Social Style
            </p>

            <h2 className="mt-3 text-[24px] font-semibold leading-tight tracking-[-0.04em] text-[#111111] sm:text-[30px] md:text-[34px] lg:text-[38px]">
              Latest Reels
            </h2>

            <p className="mt-3 max-w-[620px] text-sm leading-6 text-neutral-600 sm:text-[15px]">
              Discover the newest fashion moments, styling inspiration, and
              premium handbag highlights from Trendz Firenze.
            </p>
          </div>

          <a
            href="https://www.instagram.com/trendzfirenze/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50 sm:text-[12px]"
          >
            <span>@trendzfirenze</span>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M9 7h8v8" />
            </svg>
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="aspect-[4/5] w-full animate-pulse bg-neutral-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-600 sm:px-5">
            Unable to load Instagram reels right now.
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-5 text-sm text-neutral-500 shadow-sm sm:px-5">
            Instagram reels will appear here soon.
          </div>
        ) : (
          <>
            {/* Small device only: 2 reels per slide, auto slide, no bottom buttons */}
            <div className="overflow-hidden sm:hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${mobileSlide * 100}%)`,
                }}
              >
                {mobileSlides.map((slide, slideIndex) => (
                  <div key={slideIndex} className="min-w-full">
                    <div className="grid grid-cols-2 gap-3">
                      {slide.map((post) => (
                        <ReelCard key={post.id} post={post} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tablet/Desktop unchanged */}
            <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6 xl:gap-7">
              {visiblePosts.map((post) => (
                <ReelCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}