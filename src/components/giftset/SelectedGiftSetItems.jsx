

"use client";

function getItemImage(item) {
  if (item?.productImageUrl) return item.productImageUrl;
  if (item?.productImagePath) return item.productImagePath;
  if (Array.isArray(item?.productImages) && item.productImages.length > 0) {
    return item.productImages[0];
  }
  return "/placeholder.png";
}

function getGiftBoxImage(item) {
  if (item?.giftBoxImagePath) return item.giftBoxImagePath;
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
        const removeKey =
          item.cartItemId ??
          item.guestItemKey ??
          `${item.productId}-${item.giftBoxId}-${index}`;

        return (
          <div
            key={removeKey}
            className="overflow-hidden rounded-[24px] border border-[#e8e8e8] bg-white"
          >
            <div className="p-4 md:p-5">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-start">
                <div className="rounded-[20px] border border-[#efefef] bg-[#fcfcfc] p-3">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-24 w-full shrink-0 overflow-hidden rounded-2xl bg-[#f1f1f1] sm:w-24">
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
                      <p className="mt-2 text-sm text-[#666]">
                        Price: ₹{item.productPriceInr}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[20px] border border-[#efefef] bg-[#fcfcfc] p-3">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-24 w-full shrink-0 overflow-hidden rounded-2xl bg-[#f1f1f1] sm:w-24">
                      <img
                        src={getGiftBoxImage(item)}
                        alt={item.giftBoxName || `Gift Box ${index + 1}`}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#8a8a8a]">
                        Gift Box
                      </p>
                      <h3 className="mt-1 text-base font-medium text-[#111]">
                        {item.giftBoxName}
                      </h3>
                      <p className="mt-2 text-sm text-[#666]">
                        Price: ₹{item.giftBoxPriceInr}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:min-w-[140px] lg:items-end">
                  <p className="text-sm font-medium text-[#111]">
                    Line Total: ₹{item.lineTotalInr}
                  </p>

                  <button
                    type="button"
                    onClick={() => onRemove(removeKey)}
                    className="rounded-full border border-[#d9d9d9] px-4 py-2 text-sm text-[#222] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}