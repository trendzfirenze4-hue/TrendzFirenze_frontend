

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicHeroSections } from "@/features/heroSections/heroSectionSlice";

export default function HeroSectionCustom() {
  const dispatch = useDispatch();
  const { publicItems, loadingPublic } = useSelector((state) => state.heroSections);

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
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>

        <div className="hero-card">
          <Link href={`/product/${hero.productId}`} className="hero-image-link">
            <div className="hero-image-wrap">
              <div className="hero-image-glow"></div>
              <img
                src={hero.imageUrl}
                alt={hero.title}
                className="hero-image"
              />
            </div>
          </Link>

          <div className="hero-content">
            <div className="hero-content-glow"></div>

            <p className="hero-label">FEATURED EDIT</p>

            <h2 className="hero-title">{hero.title}</h2>

            {hero.description && (
              <p className="hero-description">{hero.description}</p>
            )}

            <Link href={`/product/${hero.productId}`} className="hero-button">
              <span className="hero-button-bg"></span>
              <span className="hero-button-text">SHOP THE EDIT</span>
              <span className="hero-button-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-section-custom {
          position: relative;
          padding: 0;
          background:
            radial-gradient(circle at top left, rgba(255,255,255,0.96) 0%, rgba(246,246,246,1) 36%, rgba(239,239,239,1) 100%);
          width: 100%;
          overflow: hidden;
          isolation: isolate;
        }

        .bg-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(70px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.7;
        }

        .orb-1 {
          width: 240px;
          height: 240px;
          top: -50px;
          left: -30px;
          background: rgba(255, 255, 255, 0.95);
          animation: orbFloat1 8s ease-in-out infinite;
        }

        .orb-2 {
          width: 280px;
          height: 280px;
          right: -100px;
          top: 18%;
          background: rgba(220, 220, 220, 0.65);
          animation: orbFloat2 10s ease-in-out infinite;
        }

        .orb-3 {
          width: 220px;
          height: 220px;
          bottom: -80px;
          left: 28%;
          background: rgba(255, 255, 255, 0.8);
          animation: orbFloat3 11s ease-in-out infinite;
        }

        .hero-card {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 40px;
          background: linear-gradient(135deg, rgba(255,255,255,0.42), rgba(255,255,255,0.16));
          backdrop-filter: blur(10px);
          padding: 20px;
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.55);
          box-shadow:
            0 10px 28px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .hero-image-link {
          flex: 0 0 calc(50% - 20px);
          max-width: calc(50% - 20px);
          display: block;
          text-decoration: none;
          animation: imageReveal 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hero-image-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 25px;
          box-shadow:
            0 18px 40px rgba(0, 0, 0, 0.10),
            0 8px 20px rgba(0, 0, 0, 0.06);
          transform: translateY(0);
          transition: transform 0.7s ease, box-shadow 0.7s ease;
          animation: floatImage 6s ease-in-out infinite;
          background: #eaeaea;
        }

        .hero-image-glow {
          position: absolute;
          inset: -20%;
          background: radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%);
          z-index: 1;
          pointer-events: none;
          animation: imageGlowPulse 4s ease-in-out infinite;
        }

        .hero-image-wrap::before {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 75%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.42) 50%,
            rgba(255,255,255,0) 100%
          );
          transform: skewX(-18deg);
          z-index: 3;
          pointer-events: none;
        }

        .hero-image-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.10) 0%,
            rgba(255,255,255,0.02) 35%,
            rgba(0,0,0,0.05) 100%
          );
          z-index: 2;
          pointer-events: none;
        }

        .hero-image-link:hover .hero-image-wrap::before {
          animation: shineSweep 1.35s ease;
        }

        .hero-image-link:hover .hero-image-wrap {
          transform: translateY(-10px) scale(1.01);
          box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.16),
            0 14px 28px rgba(0, 0, 0, 0.09);
        }

        .hero-image {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 25px;
          display: block;
          transform: scale(1.02);
          transition: transform 1s ease;
          animation: slowZoom 8s ease-in-out infinite alternate;
        }

        .hero-image-link:hover .hero-image {
          transform: scale(1.09);
        }

        .hero-content {
          position: relative;
          flex: 0 0 calc(50% - 20px);
          max-width: calc(50% - 20px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          padding: 6px 0;
        }

        .hero-content-glow {
          position: absolute;
          width: 280px;
          height: 280px;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 70%);
          filter: blur(20px);
          pointer-events: none;
          animation: contentGlowPulse 5s ease-in-out infinite;
        }

        .hero-label {
          position: relative;
          z-index: 2;
          letter-spacing: 4px;
          font-size: 12px;
          color: #666;
          margin: 0 0 14px 0;
          font-weight: 600;
          animation: fadeUp 0.7s ease both;
        }

        .hero-title {
          position: relative;
          z-index: 2;
          font-size: 48px;
          font-weight: 700;
          line-height: 1.08;
          margin: 0;
          color: #111;
          letter-spacing: -0.03em;
          animation: fadeUp 0.9s ease both;
          animation-delay: 0.12s;
        }

        .hero-description {
          position: relative;
          z-index: 2;
          margin-top: 14px;
          color: #555;
          font-size: 15px;
          line-height: 1.7;
          animation: fadeUp 1.1s ease both;
          animation-delay: 0.24s;
        }

        .hero-button {
          margin-top: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          width: fit-content;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          color: #fff;
          background: linear-gradient(180deg, #111 0%, #000 100%);
          box-shadow:
            0 12px 26px rgba(0, 0, 0, 0.20),
            0 0 0 rgba(255,255,255,0);
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            letter-spacing 0.35s ease;
          animation: fadeUp 1.2s ease both, buttonGlowPulse 2.8s ease-in-out infinite;
          animation-delay: 0.36s, 0s;
        }

        .hero-button-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.10) 25%,
            rgba(255,255,255,0.24) 50%,
            rgba(255,255,255,0.10) 75%,
            rgba(255,255,255,0) 100%
          );
          left: -140%;
          width: 75%;
          transform: skewX(-20deg);
          pointer-events: none;
        }

        .hero-button:hover .hero-button-bg {
          animation: buttonSweep 1s ease;
        }

        .hero-button:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow:
            0 18px 34px rgba(0, 0, 0, 0.26),
            0 0 30px rgba(255,255,255,0.12);
          letter-spacing: 0.16em;
        }

        .hero-button:active {
          transform: translateY(-1px) scale(1.01);
        }

        .hero-button-text,
        .hero-button-arrow {
          position: relative;
          z-index: 2;
        }

        .hero-button-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
          animation: arrowMove 1.2s ease-in-out infinite;
        }

        .hero-button:hover .hero-button-arrow {
          transform: translateX(5px);
        }

        @keyframes imageReveal {
          0% {
            opacity: 0;
            transform: translateX(-32px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(22px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slowZoom {
          0% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1.06);
          }
        }

        @keyframes floatImage {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes shineSweep {
          0% {
            left: -150%;
          }
          100% {
            left: 170%;
          }
        }

        @keyframes buttonSweep {
          0% {
            left: -140%;
          }
          100% {
            left: 170%;
          }
        }

        @keyframes arrowMove {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
        }

        @keyframes buttonGlowPulse {
          0%, 100% {
            box-shadow:
              0 12px 26px rgba(0, 0, 0, 0.20),
              0 0 0 rgba(255,255,255,0);
          }
          50% {
            box-shadow:
              0 16px 30px rgba(0, 0, 0, 0.24),
              0 0 22px rgba(255,255,255,0.10);
          }
        }

        @keyframes imageGlowPulse {
          0%, 100% {
            opacity: 0.45;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.08);
          }
        }

        @keyframes contentGlowPulse {
          0%, 100% {
            opacity: 0.55;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-50%) scale(1.08);
          }
        }

        @keyframes orbFloat1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(18px, 20px);
          }
        }

        @keyframes orbFloat2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-24px, 14px);
          }
        }

        @keyframes orbFloat3 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(16px, -16px);
          }
        }

        @media (max-width: 992px) {
          .hero-card {
            gap: 24px;
            padding: 18px;
          }

          .hero-image-link {
            flex: 0 0 calc(50% - 12px);
            max-width: calc(50% - 12px);
          }

          .hero-content {
            flex: 0 0 calc(50% - 12px);
            max-width: calc(50% - 12px);
          }

          .hero-image {
            height: 400px;
          }

          .hero-title {
            font-size: 34px;
          }
        }

        @media (max-width: 768px) {
          .hero-card {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
            padding: 16px;
          }

          .hero-image-link {
            flex: unset;
            max-width: 100%;
            width: 100%;
          }

          .hero-content {
            flex: unset;
            max-width: 100%;
            width: 100%;
          }

          .hero-image-wrap,
          .hero-image {
            border-radius: 20px;
          }

          .hero-image {
            height: 320px;
          }

          .hero-label {
            font-size: 11px;
            letter-spacing: 3px;
            margin: 0 0 10px 0;
          }

          .hero-title {
            font-size: 26px;
            line-height: 1.15;
          }

          .hero-description {
            margin-top: 12px;
            font-size: 14px;
            line-height: 1.6;
          }

          .hero-button {
            margin-top: 20px;
            padding: 13px 22px;
            font-size: 11px;
            letter-spacing: 0.12em;
          }
        }

        @media (max-width: 480px) {
          .hero-card {
            gap: 16px;
            padding: 12px;
          }

          .hero-image-wrap,
          .hero-image {
            border-radius: 16px;
          }

          .hero-image {
            height: 240px;
          }

          .hero-label {
            font-size: 10px;
            letter-spacing: 2.5px;
          }

          .hero-title {
            font-size: 20px;
          }

          .hero-description {
            font-size: 13px;
            line-height: 1.55;
          }

          .hero-button {
            margin-top: 16px;
            padding: 12px 18px;
            font-size: 10px;
          }
        }
      `}</style>
    </>
  );
}