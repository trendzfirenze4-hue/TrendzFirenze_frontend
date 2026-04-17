// "use client";

// import { useEffect, useState } from "react";

// export default function InstagramSection() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let ignore = false;

//     async function loadInstagramPosts() {
//       try {
//         setError("");

//         const res = await fetch("/api/instagram", {
//           cache: "no-store",
//         });

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

//   return (
//     <section className="bg-[#f8f8f8]">
//       <div className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 lg:max-w-full lg:px-10 lg:py-18">
//         <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
//               Social Style
//             </p>
//             <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[38px]">
//               Follow the Trendz Firenze mood
//             </h2>
//           </div>

//           <a
//             href="https://www.instagram.com/trendzfirenze/"
//             target="_blank"
//             rel="noreferrer"
//             className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#111111]"
//           >
//             @trendzfirenze
//           </a>
//         </div>

//         {loading ? (
//           <p className="text-sm text-neutral-500">Loading latest posts...</p>
//         ) : error ? (
//           <p className="text-sm text-red-500">{error}</p>
//         ) : posts.length === 0 ? (
//           <p className="text-sm text-neutral-500">No Instagram posts found.</p>
//         ) : (
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//             {posts.map((post) => {
//               const isVideo = post.video || post.mediaType === "VIDEO";

//               return (
//                 <a
//                   key={post.id}
//                   href={post.permalink}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="group overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
//                 >
//                   <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
//                     {isVideo ? (
//                       <>
//                         <video
//                           src={post.mediaUrl}
//                           poster={post.thumbnailUrl || ""}
//                           className="h-full w-full object-cover"
//                           muted
//                           playsInline
//                           controls
//                           preload="metadata"
//                         />
//                         <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
//                           Reel
//                         </div>
//                       </>
//                     ) : (
//                       <img
//                         src={post.mediaUrl}
//                         alt={post.alt || "Trendz Firenze Instagram post"}
//                         className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                         loading="lazy"
//                       />
//                     )}
//                   </div>

//                   <div className="p-4">
//                     <p className="line-clamp-6 text-[14px] leading-7 text-[#111111]">
//                       {post.caption}
//                     </p>
//                   </div>
//                 </a>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }









// "use client";

// import { useEffect, useState } from "react";

// export default function InstagramSection() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let ignore = false;

//     async function loadInstagramPosts() {
//       try {
//         setError("");

//         const res = await fetch("/api/instagram", {
//           cache: "no-store",
//         });

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

//   return (
//     <section className="bg-[#f8f8f8]">
//       <div className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 lg:max-w-full lg:px-10 lg:py-18">
//         <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
//               Social Style
//             </p>
//             <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[38px]">
//               Follow the Trendz Firenze mood
//             </h2>
//           </div>

//           <a
//             href="https://www.instagram.com/trendzfirenze/"
//             target="_blank"
//             rel="noreferrer"
//             className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#111111]"
//           >
//             @trendzfirenze
//           </a>
//         </div>

//         {loading ? (
//           <p className="text-sm text-neutral-500">Loading latest posts...</p>
//         ) : error ? (
//           <p className="text-sm text-red-500">{error}</p>
//         ) : posts.length === 0 ? (
//           <p className="text-sm text-neutral-500">No Instagram posts found.</p>
//         ) : (
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//             {posts.map((post) => {
//               const isVideo = post.video || post.mediaType === "VIDEO";

//               return (
//                 <a
//                   key={post.id}
//                   href={post.permalink}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="group overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
//                 >
//                   <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
//                     {isVideo ? (
//                       <>
//                         <video
//                           src={post.mediaUrl}
//                           poster={post.thumbnailUrl || ""}
//                           className="h-full w-full object-cover"
//                           muted
//                           playsInline
//                           controls
//                           preload="metadata"
//                         />
//                         <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
//                           Reel
//                         </div>
//                       </>
//                     ) : (
//                       <img
//                         src={post.mediaUrl}
//                         alt={post.alt || "Trendz Firenze Instagram post"}
//                         className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                         loading="lazy"
//                       />
//                     )}
//                   </div>
//                 </a>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

















"use client";

import { useEffect, useState } from "react";

export default function InstagramSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadInstagramPosts() {
      try {
        setError("");

        // ✅ LIMIT = 4 from backend
        const res = await fetch("/api/instagram?limit=4", {
          cache: "no-store",
        });

        const data = await res.json();

        if (ignore) return;

        if (res.ok && Array.isArray(data.posts)) {
          // ✅ extra safety limit (frontend)
          setPosts(data.posts.slice(0, 4));
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

  return (
    <section className="bg-[#f8f8f8]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 lg:max-w-full lg:px-10 lg:py-18">
        
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Social Style
            </p>
            <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[38px]">
              Follow the Trendz Firenze mood
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

        {/* States */}
        {loading ? (
          <p className="text-sm text-neutral-500">Loading latest posts...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-neutral-500">No Instagram posts found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {posts.map((post) => {
              const isVideo = post.video || post.mediaType === "VIDEO";

              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-[20px] border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">

                    {isVideo ? (
                      <>
                        <video
                          src={post.mediaUrl}
                          poster={post.thumbnailUrl || ""}
                          className="h-full w-full object-cover"
                          muted
                          playsInline
                          controls
                          preload="metadata"
                        />
                        <div className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
                          Reel
                        </div>
                      </>
                    ) : (
                      <img
                        src={post.mediaUrl}
                        alt={post.alt || "Trendz Firenze Instagram post"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}

                    {/* Optional premium hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}














// "use client";

// import { useEffect, useMemo, useState } from "react";

// export default function InstagramSection() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     let ignore = false;

//     async function loadInstagramPosts() {
//       try {
//         setError("");

//         const res = await fetch("/api/instagram?limit=12", {
//           cache: "no-store",
//         });

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

//   const loopPosts = useMemo(() => {
//     if (!posts.length) return [];
//     return [...posts, ...posts];
//   }, [posts]);

//   return (
//     <section
//       className="bg-[#f8f8f8]"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <div className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
//         <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
//               Social Style
//             </p>
//             <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[38px]">
//               Follow the Trendz Firenze mood
//             </h2>
//           </div>

//           <a
//             href="https://www.instagram.com/trendzfirenze/"
//             target="_blank"
//             rel="noreferrer"
//             className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#111111]"
//           >
//             @trendzfirenze
//           </a>
//         </div>

//         {loading ? (
//           <p className="text-sm text-neutral-500">Loading latest posts...</p>
//         ) : error ? (
//           <p className="text-sm text-red-500">{error}</p>
//         ) : posts.length === 0 ? (
//           <p className="text-sm text-neutral-500">No Instagram posts found.</p>
//         ) : (
//           <div className="relative overflow-hidden">
//             <div
//               className={`instagram-track flex w-max gap-5 ${
//                 isPaused ? "paused" : ""
//               }`}
//             >
//               {loopPosts.map((post, index) => {
//                 const isVideo = post.video || post.mediaType === "VIDEO";

//                 return (
//                   <a
//                     key={`${post.id}-${index}`}
//                     href={post.permalink}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="group block w-[260px] shrink-0 overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md sm:w-[280px] lg:w-[300px]"
//                   >
//                     <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
//                       {isVideo ? (
//                         <>
//                           <video
//                             src={post.mediaUrl}
//                             poster={post.thumbnailUrl || ""}
//                             className="h-full w-full object-cover"
//                             muted
//                             playsInline
//                             controls
//                             preload="metadata"
//                             onMouseEnter={() => setIsPaused(true)}
//                             onMouseLeave={() => setIsPaused(false)}
//                           />
//                           <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
//                             Reel
//                           </div>
//                         </>
//                       ) : (
//                         <img
//                           src={post.mediaUrl}
//                           alt={post.alt || "Trendz Firenze Instagram post"}
//                           className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                           loading="lazy"
//                         />
//                       )}
//                     </div>
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .instagram-track {
//           animation: instagramMarquee 35s linear infinite;
//           animation-play-state: running;
//         }

//         .instagram-track.paused {
//           animation-play-state: paused;
//         }

//         @keyframes instagramMarquee {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(calc(-50% - 10px));
//           }
//         }
//       `}</style>
//     </section>
//   );
// }