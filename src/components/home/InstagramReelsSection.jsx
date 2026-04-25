
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
//       className="group block h-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
//       aria-label={item?.alt || "Open Instagram reel"}
//     >
//       <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
//         <video
//           src={item.mediaUrl}
//           poster={item.thumbnailUrl || ""}
//           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
//           muted
//           playsInline
//           autoPlay
//           loop
//           preload="metadata"
//         />

//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-90" />

//         <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/20 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111111] shadow-sm backdrop-blur-sm sm:left-4 sm:top-4">
//           Reel
//         </div>

//         <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-end justify-between sm:bottom-4 sm:left-4 sm:right-4">
//           <div className="max-w-[70%] rounded-full bg-black/55 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm sm:text-[11px]">
//             Trendz Firenze
//           </div>

//           <div className="rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
//             <svg
//               viewBox="0 0 24 24"
//               className="h-4 w-4 text-[#111111]"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               aria-hidden="true"
//             >
//               <path d="M7 17L17 7" />
//               <path d="M9 7h8v8" />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </a>
//   );
// }

// export default function InstagramReelsSection() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [mobileSlide, setMobileSlide] = useState(0);

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

//   const mobileSlides = useMemo(() => {
//     const slides = [];

//     for (let i = 0; i < visiblePosts.length; i += 2) {
//       slides.push(visiblePosts.slice(i, i + 2));
//     }

//     return slides;
//   }, [visiblePosts]);

//   useEffect(() => {
//     if (mobileSlides.length <= 1) return;

//     const interval = setInterval(() => {
//       setMobileSlide((prev) =>
//         prev === mobileSlides.length - 1 ? 0 : prev + 1
//       );
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [mobileSlides.length]);

//   useEffect(() => {
//     if (mobileSlide > mobileSlides.length - 1) {
//       setMobileSlide(0);
//     }
//   }, [mobileSlide, mobileSlides.length]);

//   return (
//     <section className="w-full bg-gradient-to-b from-[#fcfcfc] via-[#f8f8f8] to-[#f3f3f3]">
//       <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-10 lg:py-16 xl:px-14 2xl:px-20">
//         <div className="mb-8 flex flex-col gap-4 border-b border-neutral-200/80 pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-7">
//           <div className="max-w-[760px]">
//             <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500 sm:text-[12px]">
//               Social Style
//             </p>

//             <h2 className="mt-3 text-[24px] font-semibold leading-tight tracking-[-0.04em] text-[#111111] sm:text-[30px] md:text-[34px] lg:text-[38px]">
//               Latest Reels
//             </h2>

//             <p className="mt-3 max-w-[620px] text-sm leading-6 text-neutral-600 sm:text-[15px]">
//               Discover the newest fashion moments, styling inspiration, and
//               premium handbag highlights from Trendz Firenze.
//             </p>
//           </div>

//           <a
//             href="https://www.instagram.com/trendzfirenze/"
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50 sm:text-[12px]"
//           >
//             <span>@trendzfirenze</span>
//             <svg
//               viewBox="0 0 24 24"
//               className="h-4 w-4"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               aria-hidden="true"
//             >
//               <path d="M7 17L17 7" />
//               <path d="M9 7h8v8" />
//             </svg>
//           </a>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
//             {[...Array(4)].map((_, index) => (
//               <div
//                 key={index}
//                 className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
//               >
//                 <div className="aspect-[4/5] w-full animate-pulse bg-neutral-200" />
//               </div>
//             ))}
//           </div>
//         ) : error ? (
//           <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-600 sm:px-5">
//             Unable to load Instagram reels right now.
//           </div>
//         ) : visiblePosts.length === 0 ? (
//           <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-5 text-sm text-neutral-500 shadow-sm sm:px-5">
//             Instagram reels will appear here soon.
//           </div>
//         ) : (
//           <>
//             {/* MOBILE AUTO SLIDER */}
//             <div className="md:hidden">
//               <div className="overflow-hidden">
//                 <div
//                   className="flex transition-transform duration-700 ease-out"
//                   style={{
//                     transform: `translateX(-${mobileSlide * 100}%)`,
//                   }}
//                 >
//                   {mobileSlides.map((slide, slideIndex) => (
//                     <div
//                       key={slideIndex}
//                       className="grid min-w-full grid-cols-2 gap-3"
//                     >
//                       {slide.map((post) => (
//                         <ReelCard key={post.id} post={post} />
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* DESKTOP/TABLET SAME GRID UI */}
//             <div className="hidden md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6 xl:gap-7">
//               {visiblePosts.map((post) => (
//                 <ReelCard key={post.id} post={post} />
//               ))}
//             </div>
//           </>
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
      className="group block h-full overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:rounded-2xl"
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

        <div className="pointer-events-none absolute left-2 top-2 rounded-full border border-white/20 bg-white/90 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#111111] shadow-sm backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px] lg:text-[11px]">
          Reel
        </div>

        <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-end justify-between sm:bottom-4 sm:left-4 sm:right-4">
          <div className="max-w-[72%] rounded-full bg-black/55 px-2.5 py-1 text-[8px] font-medium text-white backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[10px] lg:text-[11px]">
            Trendz Firenze
          </div>

          <div className="rounded-full bg-white/90 p-1.5 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:p-2">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 text-[#111111] sm:h-4 sm:w-4"
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

    const interval = setInterval(() => {
      setMobileSlide((prev) =>
        prev === mobileSlides.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [mobileSlides.length]);

  useEffect(() => {
    if (mobileSlide > mobileSlides.length - 1) {
      setMobileSlide(0);
    }
  }, [mobileSlide, mobileSlides.length]);

  return (
    <section className="w-full bg-white">
      <div className="w-full px-2 py-7 sm:px-4 sm:py-9 md:px-5 md:py-8 lg:px-2 lg:py-6 xl:px-4 2xl:px-6">
        <div className="mb-5 flex flex-col gap-3 border-b border-neutral-200/80 pb-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between sm:pb-5 md:mb-6 md:pb-5">
          <div className="max-w-[760px]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-[11px] md:text-[12px]">
              Social Style
            </p>

            <h2 className="mt-2 text-[20px] font-semibold leading-tight tracking-[-0.04em] text-[#111111] sm:text-[26px] md:text-[32px] lg:text-[36px] xl:text-[38px]">
              Latest Reels
            </h2>

            <p className="mt-2 max-w-[620px] text-[12px] leading-5 text-neutral-600 sm:text-[14px] sm:leading-6 md:text-[15px]">
              Discover the newest fashion moments, styling inspiration, and
              premium handbag highlights from Trendz Firenze.
            </p>
          </div>

          <a
            href="https://www.instagram.com/trendzfirenze/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#111111] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50 sm:px-4 sm:py-2.5 sm:text-[11px] md:text-[12px]"
          >
            <span>@trendzfirenze</span>
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
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
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-4 xl:gap-5">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm sm:rounded-2xl"
              >
                <div className="aspect-[4/5] w-full animate-pulse bg-neutral-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-[12px] text-red-600 sm:text-sm">
            Unable to load Instagram reels right now.
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-5 text-[12px] text-neutral-500 shadow-sm sm:text-sm">
            Instagram reels will appear here soon.
          </div>
        ) : (
          <>
            {/* MOBILE AUTO SLIDER */}
            <div className="md:hidden">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${mobileSlide * 100}%)`,
                  }}
                >
                  {mobileSlides.map((slide, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="grid min-w-full grid-cols-2 gap-2 sm:gap-3"
                    >
                      {slide.map((post) => (
                        <ReelCard key={post.id} post={post} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DESKTOP/TABLET GRID UI */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-4 xl:gap-5">
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