"use client";

import Link from "next/link";

export default function GiftSetSummary({ summary, loading, onClear }) {
  const safeSummary = summary || {
    items: [],
    totalProducts: 0,
    subtotalInr: 0,
    discountPercent: 0,
    discountAmountInr: 0,
    finalTotalInr: 0,
  };

  return (
    <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Gift Set Summary</h2>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Total Products</span>
          <span>{safeSummary.totalProducts}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{safeSummary.subtotalInr}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount ({safeSummary.discountPercent}%)</span>
          <span>-₹{safeSummary.discountAmountInr}</span>
        </div>

        <div className="flex justify-between border-t pt-3 text-base font-bold">
          <span>Final Total</span>
          <span>₹{safeSummary.finalTotalInr}</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={onClear}
          disabled={loading || safeSummary.totalProducts === 0}
          className="w-full rounded-xl border px-4 py-3 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Clear"}
        </button>

        <Link
          href="/giftset-cart"
          className={`block w-full rounded-xl px-4 py-3 text-center ${
            safeSummary.totalProducts === 0
              ? "pointer-events-none bg-gray-200 text-gray-400"
              : "bg-black text-white"
          }`}
        >
          View Gift Set Cart
        </Link>
      </div>
    </div>
  );
}