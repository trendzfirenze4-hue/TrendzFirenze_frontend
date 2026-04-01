"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToGiftSet,
  calculateGiftSet,
  clearGiftSet,
  removeProductFromGiftSet,
  setGiftBoxForProduct,
} from "@/features/giftSet/giftSetSlice";
import { fetchActiveGiftBoxes } from "@/features/giftBoxes/giftBoxSlice";
import SelectedGiftSetItems from "./SelectedGiftSetItems";
import GiftSetSummary from "./GiftSetSummary";

export default function GiftSetBuilder({ products }) {
  const dispatch = useDispatch();
  const { publicGiftBoxes, loading: giftBoxLoading } = useSelector((state) => state.giftBoxes);
  const { selectedItems, summary, loading, error } = useSelector((state) => state.giftSet);

  useEffect(() => {
    dispatch(fetchActiveGiftBoxes());
  }, [dispatch]);

  const selectedIds = useMemo(
    () => new Set(selectedItems.map((item) => item.productId)),
    [selectedItems]
  );

  const allSelected = selectedItems.every((item) => !!item.giftBoxId);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-8">
        <div className="rounded-3xl border bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Selected Products</h2>
            <p className="text-sm text-gray-500">{selectedItems.length}/5 selected</p>
          </div>

          <SelectedGiftSetItems
            selectedItems={selectedItems}
            giftBoxes={publicGiftBoxes}
            onRemove={(productId) => dispatch(removeProductFromGiftSet(productId))}
            onSelectGiftBox={(productId, giftBoxId) =>
              dispatch(setGiftBoxForProduct({ productId, giftBoxId }))
            }
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
                  <h3 className="line-clamp-2 text-sm font-semibold">{product.title}</h3>
                  <p className="mt-2 text-base font-bold">₹{product.priceInr}</p>

                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                      dispatch(
                        selected
                          ? removeProductFromGiftSet(product.id)
                          : addProductToGiftSet(product)
                      )
                    }
                    className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-semibold ${
                      selected
                        ? "bg-red-600 text-white"
                        : "bg-black text-white disabled:opacity-50"
                    }`}
                  >
                    {selected ? "Remove" : "Select Product"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      <GiftSetSummary
        summary={summary}
        selectedCount={selectedItems.length}
        allSelected={allSelected}
        loading={loading || giftBoxLoading}
        onCalculate={() => dispatch(calculateGiftSet())}
        onClear={() => dispatch(clearGiftSet())}
      />
    </div>
  );
}