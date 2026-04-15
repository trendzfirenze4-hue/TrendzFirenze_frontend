

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

//         if (!ignore) {
//           if (res.ok && Array.isArray(data.posts)) {
//             setPosts(data.posts);
//           } else {
//             setPosts([]);
//             setError(data?.error || "Failed to load Instagram posts");
//           }
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
//       <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
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
//           <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//             {posts.slice(0, 4).map((post) => (
//               <a
//                 key={post.id}
//                 href={post.permalink}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="group overflow-hidden rounded-[24px] border border-neutral-200 bg-white"
//               >
//                 <img
//                   src={post.image}
//                   alt={post.caption?.trim() || "Trendz Firenze Instagram post"}
//                   className="h-[180px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-[240px] lg:h-[300px]"
//                 />
//               </a>
//             ))}
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

        const res = await fetch("/api/instagram");
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

  return (
    <section className="bg-[#f8f8f8]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
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

        {loading ? (
          <p className="text-sm text-neutral-500">Loading latest posts...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-neutral-500">No Instagram posts found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-[24px] border border-neutral-200 bg-white"
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  className="h-[180px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-[240px] lg:h-[300px]"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}