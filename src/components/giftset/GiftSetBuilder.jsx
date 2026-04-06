"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGiftSetCartItem,
  clearGiftSetCart,
  fetchGiftSetCart,
  removeGiftSetCartItem,
} from "@/features/giftSet/giftSetSlice";
import { fetchActiveGiftBoxes } from "@/features/giftBoxes/giftBoxSlice";
import SelectedGiftSetItems from "./SelectedGiftSetItems";
import GiftSetSummary from "./GiftSetSummary";

export default function GiftSetBuilder({ products }) {
  const dispatch = useDispatch();

  const {
    publicGiftBoxes,
    loading: giftBoxLoading,
    error: giftBoxError,
  } = useSelector((state) => state.giftBoxes);

  const { summary, loading, error } = useSelector((state) => state.giftSet);

  const [giftBoxSelections, setGiftBoxSelections] = useState({});

  useEffect(() => {
    dispatch(fetchActiveGiftBoxes());
    dispatch(fetchGiftSetCart());
  }, [dispatch]);

  const selectedItems = summary?.items || [];

  const selectedIds = useMemo(
    () => new Set(selectedItems.map((item) => item.productId)),
    [selectedItems]
  );

  const handleGiftBoxChange = (productId, giftBoxId) => {
    setGiftBoxSelections((prev) => ({
      ...prev,
      [productId]: giftBoxId,
    }));
  };

  const handleAdd = (product) => {
    const selectedGiftBoxId = giftBoxSelections[product.id];

    if (!selectedGiftBoxId) {
      alert("Please select a gift box first.");
      return;
    }

    dispatch(
      addGiftSetCartItem({
        productId: product.id,
        giftBoxId: Number(selectedGiftBoxId),
      })
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-8">
        <div className="rounded-3xl border bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Selected Products</h2>
            <p className="text-sm text-gray-500">
              {selectedItems.length}/5 selected
            </p>
          </div>

          <SelectedGiftSetItems
            items={selectedItems}
            onRemove={(cartItemId) => dispatch(removeGiftSetCartItem(cartItemId))}
          />
        </div>

        <div className="rounded-3xl border bg-white p-5">
          <h2 className="mb-5 text-lg font-bold">All Products</h2>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const selected = selectedIds.has(product.id);
              const disabled = !selected && selectedItems.length >= 5;

              return (
                <div key={product.id} className="rounded-2xl border p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-base font-bold">₹{product.priceInr}</p>

                  <div className="mt-4">
                    <select
                      value={giftBoxSelections[product.id] || ""}
                      onChange={(e) =>
                        handleGiftBoxChange(product.id, e.target.value)
                      }
                      disabled={selected}
                      className="w-full rounded-xl border px-3 py-2 text-sm"
                    >
                      <option value="">Choose Gift Box</option>
                      {publicGiftBoxes.map((box) => (
                        <option key={box.id} value={box.id}>
                          {box.name} - ₹{box.priceInr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    disabled={disabled || selected || loading || giftBoxLoading}
                    onClick={() => handleAdd(product)}
                    className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-semibold ${
                      selected
                        ? "bg-green-600 text-white"
                        : "bg-black text-white disabled:opacity-50"
                    }`}
                  >
                    {selected ? "Already Added" : "Add to Gift Set"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {(error || giftBoxError) && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error || giftBoxError}
          </div>
        )}
      </div>

      <GiftSetSummary
        summary={summary}
        loading={loading || giftBoxLoading}
        onClear={() => dispatch(clearGiftSetCart())}
      />
    </div>
  );
}