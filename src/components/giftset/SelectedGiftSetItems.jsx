


"use client";

function getItemImage(item) {
  if (item?.productImageUrl) return item.productImageUrl;
  if (Array.isArray(item?.productImages) && item.productImages.length > 0) {
    return item.productImages[0];
  }
  return "/placeholder.png";
}

export default function SelectedGiftSetItems({ items, onRemove }) {
  if (!items?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#d7d7d7] bg-white px-4 py-8 text-center text-sm text-[#666]">
        No products selected yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const canRemove = !!item.cartItemId;

        return (
          <div
            key={item.cartItemId || `${item.productId}-${item.giftBoxId}-${index}`}
            className="overflow-hidden rounded-[24px] border border-[#e8e8e8] bg-white"
          >
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
              <div className="h-24 w-full shrink-0 overflow-hidden rounded-2xl bg-[#f1f1f1] md:w-24">
                <img
                  src={getItemImage(item)}
                  alt={item.productTitle || `Product ${index + 1}`}
                  className="h-full w-full object-contain p-2"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.22em] text-[#8a8a8a]">
                  Product {index + 1}
                </p>
                <h3 className="mt-1 text-base font-medium text-[#111]">
                  {item.productTitle}
                </h3>

                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#666]">
                  <p>Product: ₹{item.productPriceInr}</p>
                  <p>Gift Box: {item.giftBoxName} — ₹{item.giftBoxPriceInr}</p>
                  <p className="font-medium text-[#111]">
                    Line Total: ₹{item.lineTotalInr}
                  </p>
                </div>
              </div>

              <div className="md:self-start">
                <button
                  type="button"
                  onClick={() => canRemove && onRemove(item.cartItemId)}
                  disabled={!canRemove}
                  className="rounded-full border border-[#d9d9d9] px-4 py-2 text-sm text-[#222] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}