"use client";

import Link from "next/link";
import StarRating from "@/components/StarRating";
import getImageUrl from "@/lib/getImageUrl";

export default function ProductCard({ product }) {
  const firstImage = product.images?.[0];
  const reviewCount = product.reviews?.length || 0;

  const avgRating =
    reviewCount > 0
      ? (
          product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        ).toFixed(1)
      : 0;

  const sellingPrice = Number(product.priceInr || 0);
  const mrp = Number(product.mrpInr || 0);

  const discountPercent =
    mrp > 0 && sellingPrice > 0 && mrp > sellingPrice
      ? Math.round(((mrp - sellingPrice) / mrp) * 100)
      : 0;

  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
        <div className="relative overflow-hidden bg-[#f5f5f5]">
          {firstImage ? (
            <img
              src={getImageUrl(firstImage)}
              alt={product.title}
              className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[250px] lg:h-[270px]"
            />
          ) : (
            <div className="flex h-[220px] items-center justify-center text-[14px] text-neutral-500 sm:h-[250px] lg:h-[270px]">
              No Image
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#111111] shadow-sm sm:left-4 sm:top-4 sm:text-[10px]">
            Trendz Firenze
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="line-clamp-2 min-h-[48px] text-[16px] font-semibold leading-6 text-[#111111] sm:min-h-[52px] sm:text-[17px]">
            {product.title}
          </h3>

          <div className="mt-2.5 flex items-center gap-2">
            <StarRating value={Number(avgRating)} size="14px" />
            <span className="text-[12px] text-neutral-600">
              {reviewCount > 0
                ? `${avgRating} (${reviewCount})`
                : "No reviews yet"}
            </span>
          </div>

          <div className="mt-3.5 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-2.5">
                {discountPercent > 0 && (
                  <span className="text-[20px] font-medium leading-none tracking-[-0.02em] text-[#cc0c39] sm:text-[24px]">
                    -{discountPercent}%
                  </span>
                )}

                <p className="m-0 text-[30px] font-medium leading-none tracking-[-0.03em] text-[#111111] sm:text-[34px]">
                  ₹{sellingPrice.toLocaleString("en-IN")}
                </p>
              </div>

              {mrp > 0 && (
                <p className="mt-1 text-[13px] font-medium leading-[1.3] text-neutral-500 sm:text-[14px]">
                  <span>M.R.P.:</span>{" "}
                  <span className="line-through">
                    ₹{mrp.toLocaleString("en-IN")}
                  </span>
                </p>
              )}
            </div>

            <span
              className={`text-right text-[11px] font-semibold uppercase tracking-[0.1em] ${
                product.stock === 0
                  ? "text-red-600"
                  : product.stock <= 5
                  ? "text-amber-600"
                  : "text-green-700"
              }`}
            >
              {product.stock === 0
                ? "Out of Stock"
                : product.stock <= 5
                ? `${product.stock} Left`
                : "In Stock"}
            </span>
          </div>

          <p className="mt-2.5 text-[12px] text-neutral-500">
            Category: {product.category}
          </p>

          <div className="mt-4">
            <div className="inline-flex min-h-[42px] w-full items-center justify-center rounded-full bg-[#111111] px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-black">
              View Product
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}