


// "use client";

// import Link from "next/link";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPublicHeroSections } from "@/features/heroSections/heroSectionSlice";

// export default function HeroSectionCustom() {
//   const dispatch = useDispatch();
//   const { publicItems, loadingPublic } = useSelector((state) => state.heroSections);

//   useEffect(() => {
//     dispatch(fetchPublicHeroSections());
//   }, [dispatch]);

//   if (loadingPublic) {
//     return <div style={{ padding: "20px" }}>Loading hero section...</div>;
//   }

//   if (!publicItems || publicItems.length === 0) return null;

//   const hero = publicItems[0];

//   return (
//     <>
//       <section className="hero-section-custom">
//         <div className="bg-orb orb-1"></div>
//         <div className="bg-orb orb-2"></div>
//         <div className="bg-orb orb-3"></div>

//         <div className="hero-card">

//           {/* LEFT 50% IMAGE */}
//           <Link href={`/product/${hero.productId}`} className="hero-image-link">
//             <div className="hero-image-wrap">
//               <div className="hero-image-glow"></div>
//               <img
//                 src={hero.imageUrl}
//                 alt={hero.title}
//                 className="hero-image"
//               />
//             </div>
//           </Link>

//           {/* RIGHT 50% CONTENT */}
//           <div className="hero-content">
//             <div className="hero-content-glow"></div>

//             <p className="hero-label">FEATURED EDIT</p>

//             <h2 className="hero-title">{hero.title}</h2>

//             {hero.description && (
//               <p className="hero-description">{hero.description}</p>
//             )}

//             <Link href={`/product/${hero.productId}`} className="hero-button">
//               <span className="hero-button-bg"></span>
//               <span className="hero-button-text">SHOP THE EDIT</span>
//               <span className="hero-button-arrow">→</span>
//             </Link>
//           </div>

//         </div>
//       </section>

//       <style jsx>{`
//         .hero-section-custom {
//           position: relative;
//           width: 100%;
//           overflow: hidden;
//         }

//         /* ✅ FIX: CONTROL HEIGHT */
//         .hero-card {
//           display: flex;
//           width: 100%;
//           min-height: 520px; /* desktop height */
//         }

//         /* ✅ PERFECT 50% LEFT */
//         .hero-image-link {
//           width: 50%;
//           flex: 0 0 50%;
//           display: block;
//         }

//         /* ✅ PERFECT 50% RIGHT */
//         .hero-content {
//           width: 50%;
//           flex: 0 0 50%;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           padding: 60px;
//         }

//         .hero-image-wrap {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//         }

//         .hero-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         /* OPTIONAL: MAKE IMAGE FULL HEIGHT ALWAYS */
//         .hero-image-link,
//         .hero-image-wrap {
//           height: 100%;
//         }

//         /* ================= MOBILE ================= */
//         @media (max-width: 768px) {
//           .hero-card {
//             flex-direction: column;
//             min-height: auto;
//           }

//           .hero-image-link,
//           .hero-content {
//             width: 100%;
//             flex: unset;
//           }

//           .hero-image-wrap {
//             height: 300px; /* mobile image height */
//           }

//           .hero-content {
//             padding: 20px;
//           }
//         }
//       `}</style>
//     </>
//   );
// }














"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicHeroSections } from "@/features/heroSections/heroSectionSlice";

export default function HeroSectionCustom() {
  const dispatch = useDispatch();
  const { publicItems, loadingPublic } = useSelector(
    (state) => state.heroSections
  );

  useEffect(() => {
    dispatch(fetchPublicHeroSections());
  }, [dispatch]);

  if (loadingPublic) {
    return <div style={{ padding: "20px" }}>Loading hero section...</div>;
  }

  if (!publicItems || publicItems.length === 0) return null;

  const hero = publicItems[0];

  return (
    <>
      <section className="hero-section-custom">
        <div className="hero-card">
          
          {/* LEFT IMAGE */}
          <Link href={`/product/${hero.productId}`} className="hero-image-link">
            <div className="hero-image-wrap">
              <img
                src={hero.imageUrl}
                alt={hero.title}
                className="hero-image"
              />
            </div>
          </Link>

          {/* RIGHT CONTENT */}
          <div className="hero-content">
            <p className="hero-label">FEATURED EDIT</p>

            <h2 className="hero-title">{hero.title}</h2>

            {hero.description && (
              <p className="hero-description">{hero.description}</p>
            )}

            <Link href={`/product/${hero.productId}`} className="hero-button">
              <span className="hero-button-text">SHOP THE EDIT</span>
              <span className="hero-button-arrow">→</span>
            </Link>
          </div>

        </div>
      </section>

      <style jsx>{`
        .hero-section-custom {
          width: 100%;
          padding: 8px;
          background: #ffffff;
        }

        .hero-card {
          display: flex;
          width: 100%;
          min-height: 280px;
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #eee;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          animation: fadeUp 0.6s ease;
        }

        .hero-image-link {
          width: 50%;
          flex: 0 0 50%;
        }

        .hero-image-wrap {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .hero-image-link:hover .hero-image {
          transform: scale(1.05);
        }

        .hero-content {
          width: 50%;
          flex: 0 0 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(28px, 4vw, 60px);
          background: #ffffff;
        }

        .hero-label {
          font-size: 11px;
          letter-spacing: 0.25em;
          font-weight: 700;
          color: #888;
          margin-bottom: 10px;
        }

        .hero-title {
          font-size: clamp(30px, 5vw, 64px);
          font-weight: 800;
          line-height: 1;
          color: #111;
        }

        .hero-description {
          margin-top: 16px;
          font-size: 16px;
          line-height: 1.6;
          color: #555;
          max-width: 500px;
        }

        .hero-button {
          margin-top: 28px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          border-radius: 999px;
          background: #111;
          color: #fff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .hero-button-arrow {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .hero-button:hover {
          transform: translateY(-2px);
        }

        .hero-button:hover .hero-button-arrow {
          transform: translateX(4px);
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .hero-card {
            min-height: 240px;
          }
        }

        @media (max-width: 768px) {
          .hero-card {
            flex-direction: column;
          }

          .hero-image-link,
          .hero-content {
            width: 100%;
          }

          .hero-image-wrap {
            height: 320px;
          }

          .hero-content {
            padding: 24px;
          }
        }

        @media (max-width: 480px) {
          .hero-section-custom {
            padding: 6px;
          }

          .hero-image-wrap {
            height: 260px;
          }

          .hero-button {
            width: 100%;
            justify-content: center;
          }
        }

        /* ✅ DESKTOP FIX */
        @media (min-width: 1024px) {
          .hero-section-custom {
            padding: 28px 8px; /* py-7 px-2 */
          }
        }
      `}</style>
    </>
  );
}