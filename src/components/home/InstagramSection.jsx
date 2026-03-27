"use client";

export default function InstagramSection() {
  // 🔥 Add your multiple image paths here
  const images = [
    "/images/9.png",
    "/images/5.png",
    "/images/6.png",
    "/images/7.png",
  ];

  return (
    <section className="bg-[#f8f8f8]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
        
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Social Style
            </p>

            <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-[#111111] sm:text-[38px]">
              Follow the Trendz Firenze mood
            </h2>
          </div>

          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#111111]">
            @trendzfirenze
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-[24px] border border-neutral-200 bg-white"
            >
              <img
                src={src}
                alt={`Trendz Firenze style ${index + 1}`}
                className="h-[180px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-[240px] lg:h-[300px]"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}