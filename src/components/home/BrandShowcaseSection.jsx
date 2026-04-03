"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveBrandShowcases } from "@/features/brandShowcases/brandShowcaseSlice";

const AUTO_SLIDE_MS = 4000;

function getSafeArray(value) {
  return Array.isArray(value) ? value : [];
}

function getProductImage(product) {
  return (
    product?.imageUrl ||
    product?.thumbnailUrl ||
    product?.primaryImageUrl ||
    product?.featuredImage ||
    ""
  );
}

export default function BrandShowcaseSection() {
  const dispatch = useDispatch();
  const { publicItems, loadingPublic } = useSelector((state) => state.brandShowcases);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    dispatch(fetchActiveBrandShowcases());
  }, [dispatch]);

  const orderedItems = useMemo(() => {
    const items = getSafeArray(publicItems);

    return [...items].sort((a, b) => {
      const aOrder = a?.displayOrder ?? a?.order ?? a?.position ?? a?.sortOrder ?? 9999;
      const bOrder = b?.displayOrder ?? b?.order ?? b?.position ?? b?.sortOrder ?? 9999;
      return aOrder - bOrder;
    });
  }, [publicItems]);

  const totalSlides = orderedItems.length;

  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timer);
  }, [totalSlides, isPaused]);

  useEffect(() => {
    if (currentIndex > totalSlides - 1) {
      setCurrentIndex(0);
    }
  }, [currentIndex, totalSlides]);

  if (loadingPublic) {
    return (
      <section className="mx-auto w-full max-w-[1280px] px-0 py-4">
        <div className="bg-[#efefef] px-5 py-6 text-sm text-gray-500">
          Loading brand showcase...
        </div>
      </section>
    );
  }

  if (!orderedItems.length) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-[1280px] px-0 py-4">
      <div
        className="relative overflow-hidden bg-[#efefef] shadow-[0_6px_20px_rgba(0,0,0,0.04)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={() => setIsPaused(true)}
      >
        <div
          className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {orderedItems.map((showcase) => {
            const products = getSafeArray(showcase?.products).slice(0, 4);

            return (
              <div
                key={showcase.id}
                className="w-full min-w-full flex-shrink-0 p-2"
              >
                <div className="flex h-[250px] w-full gap-2 sm:h-[290px] lg:h-[320px]">
                  {/* Left model image with title overlay */}
                  <div className="relative w-1/2 min-w-0 overflow-hidden bg-[#e9e9e9]">
                    {showcase?.modelImageUrl ? (
                      <img
                        src={showcase.modelImageUrl}
                        alt={showcase?.title || "Brand showcase"}
                        className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                        No showcase image
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-5">
                      <p className="line-clamp-2 text-[18px] font-semibold leading-5 tracking-[-0.01em] text-white sm:text-[20px] lg:text-[22px]">
                        {showcase?.title || "Collection"}
                      </p>

                      {showcase?.description ? (
                        <p className="mt-1 line-clamp-2 max-w-[90%] text-[11px] leading-4 text-white/85 sm:text-[12px]">
                          {showcase.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Right products */}
                  <div className="flex w-1/2 min-w-0 flex-col bg-[#efefef] p-0">
                    {products.length > 0 ? (
                      <div className="grid h-full grid-cols-2 gap-2">
                        {products.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="group/card flex min-w-0 flex-col overflow-hidden bg-[#f5f5f5] transition duration-300 hover:bg-white"
                          >
                            <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f7f7f7]">
                              {getProductImage(product) ? (
                                <img
                                  src={getProductImage(product)}
                                  alt={product?.title || "Product image"}
                                  className="h-full w-full object-contain p-2 transition duration-300 group-hover/card:scale-[1.035]"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                  No image
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                        No products available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {totalSlides > 1 && (
          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 bg-[#efefef]/90 px-2 py-1">
            {orderedItems.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to showcase ${index + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused(true);
                  setCurrentIndex(index);
                }}
                className={`h-[3px] transition-all duration-300 ${
                  index === currentIndex
                    ? "w-7 bg-black"
                    : "w-4 bg-black/20 hover:bg-black/35"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}




