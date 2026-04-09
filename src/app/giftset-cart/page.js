


"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearGiftSetCart,
  fetchGiftSetCart,
  removeGiftSetCartItem,
} from "@/features/giftSet/giftSetSlice";
import SelectedGiftSetItems from "@/components/giftset/SelectedGiftSetItems";
import GiftSetSummary from "@/components/giftset/GiftSetSummary";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GiftSetCartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { token, initialized: authInitialized } = useSelector((state) => state.auth);
  const { summary, loading, error } = useSelector((state) => state.giftSet);

  useEffect(() => {
    if (!authInitialized) return;

    if (!token) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirectAfterLogin", "/giftset-cart");
      }
      router.replace("/login?next=%2Fgiftset-cart");
      return;
    }

    dispatch(fetchGiftSetCart());
  }, [dispatch, token, authInitialized, router]);

  const items = summary?.items || [];
  const isEmpty = items.length === 0;

  if (!authInitialized) {
    return <div className="min-h-screen px-4 py-10">Loading...</div>;
  }

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-stone-50 to-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              Gift Set Cart
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">
              Review your selected gift bundle
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Remove items, review totals, and continue to checkout.
            </p>
          </div>

          <Link
            href="/giftsets"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm"
          >
            Back to Builder
          </Link>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.75fr]">
          <div className="rounded-3xl border bg-white p-5 shadow-sm">
            {isEmpty ? (
              <div className="rounded-2xl border border-dashed bg-white p-8 text-center">
                <p className="text-base font-semibold text-gray-900">
                  Your gift set cart is empty
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Add products with a gift box to continue.
                </p>
                <Link
                  href="/giftsets"
                  className="mt-5 inline-block rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
                >
                  Go to Gift Set Builder
                </Link>
              </div>
            ) : (
              <SelectedGiftSetItems
                items={items}
                onRemove={(itemId) => dispatch(removeGiftSetCartItem(itemId))}
              />
            )}
          </div>

          <GiftSetSummary
            summary={summary}
            loading={loading}
            onClear={() => dispatch(clearGiftSetCart())}
            showCheckoutLink
            mode="cart"
          />
        </div>
      </div>
    </div>
  );
}