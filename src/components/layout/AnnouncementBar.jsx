"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_MESSAGES = [
  "Free shipping on selected orders",
  "New arrivals live now",
  "Easy returns available",
  "COD available",
];

export default function AnnouncementBar({
  messages = DEFAULT_MESSAGES,
  autoRotate = true,
  interval = 3000,
}) {
  const safeMessages = useMemo(
    () => (Array.isArray(messages) && messages.length ? messages : DEFAULT_MESSAGES),
    [messages]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    if (!autoRotate || safeMessages.length <= 1) return;

    const timer = setInterval(() => {
      setDirection("next");
      setActiveIndex((prev) => (prev + 1) % safeMessages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoRotate, interval, safeMessages.length]);

  const handlePrev = () => {
    setDirection("prev");
    setActiveIndex((prev) =>
      prev === 0 ? safeMessages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % safeMessages.length);
  };

  return (
    <div className="relative z-50 w-full border-b border-neutral-200 bg-[#f3f3f3] text-[#111]">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-4 lg:px-6">
        <div className="relative flex min-h-[40px] items-center justify-center sm:min-h-[42px]">
          
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous announcement"
            className="group absolute left-[25%] top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 hover:bg-black/5 active:scale-95"
          >
            <svg
              className="h-3.5 w-3.5 text-neutral-600 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            className="relative flex h-[40px] w-full items-center justify-center overflow-hidden"
            aria-label="Store announcements"
            role="status"
          >
            {safeMessages.map((message, index) => {
              const isActive = activeIndex === index;

              return (
                <p
                  key={`${message}-${index}`}
                  className={[
                    "absolute left-1/2 top-1/2 w-full max-w-[90%] -translate-x-1/2 text-center",
                    "px-16 text-[11px] font-medium uppercase tracking-[0.14em] sm:text-xs md:text-[13px]",
                    "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "translate-y-[-50%] opacity-100 blur-0"
                      : direction === "next"
                      ? "-translate-y-[180%] opacity-0 blur-[2px] pointer-events-none"
                      : "translate-y-[80%] opacity-0 blur-[2px] pointer-events-none",
                  ].join(" ")}
                >
                  {message}
                </p>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next announcement"
            className="group absolute right-[25%] top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 hover:bg-black/5 active:scale-95"
          >
            <svg
              className="h-3.5 w-3.5 text-neutral-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-black/5">
            <div
              key={activeIndex}
              className="h-full w-full origin-left animate-[announcementProgress_3s_linear]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.08), rgba(0,0,0,0.35), rgba(0,0,0,0.08))",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes announcementProgress {
          from {
            transform: scaleX(0);
            opacity: 0.7;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}