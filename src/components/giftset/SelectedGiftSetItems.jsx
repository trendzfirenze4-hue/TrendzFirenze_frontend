"use client";

import GiftBoxSelector from "./GiftBoxSelector";

export default function SelectedGiftSetItems({
  selectedItems,
  giftBoxes,
  onRemove,
  onSelectGiftBox,
}) {
  if (!selectedItems.length) {
    return (
      <div className="rounded-2xl border border-dashed bg-white p-6 text-sm text-gray-500">
        No products selected yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedItems.map((item, index) => (
        <div key={item.productId} className="rounded-2xl border bg-white p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Product {index + 1}
              </p>
              <h3 className="text-base font-semibold">{item.productTitle}</h3>
              <p className="text-sm text-gray-600">₹{item.productPriceInr}</p>
            </div>

            <button
              type="button"
              onClick={() => onRemove(item.productId)}
              className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
            >
              Remove
            </button>
          </div>

          <p className="mb-3 text-sm font-medium">
            Choose Gift Box <span className="text-red-500">*</span>
          </p>

          <GiftBoxSelector
            giftBoxes={giftBoxes}
            selectedGiftBoxId={item.giftBoxId}
            onSelect={(giftBoxId) =>
              onSelectGiftBox(item.productId, giftBoxId)
            }
          />
        </div>
      ))}
    </div>
  );
}