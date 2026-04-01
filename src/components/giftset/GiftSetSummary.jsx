"use client";

export default function GiftSetSummary({
  summary,
  selectedCount,
  allSelected,
  onCalculate,
  onClear,
  loading,
}) {
  return (
    <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Gift Set Summary</h2>

      {!summary ? (
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>Selected Products: {selectedCount}/5</p>
          <p>1 Product → 0% discount</p>
          <p>2 Products → 10% discount</p>
          <p>3 to 5 Products → 15% discount</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Total Products</span>
            <span>{summary.totalProducts}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{summary.subtotalInr}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount ({summary.discountPercent}%)</span>
            <span>-₹{summary.discountAmountInr}</span>
          </div>
          <div className="flex justify-between border-t pt-3 text-base font-bold">
            <span>Final Total</span>
            <span>₹{summary.finalTotalInr}</span>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={onCalculate}
          disabled={!allSelected || !selectedCount || loading}
          className="w-full rounded-xl bg-black px-4 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Calculating..." : "Calculate Gift Set"}
        </button>

        <button
          type="button"
          onClick={onClear}
          className="w-full rounded-xl border px-4 py-3"
        >
          Clear
        </button>
      </div>

      {!allSelected && selectedCount > 0 && (
        <p className="mt-3 text-xs text-red-500">
          Please choose a gift box for every selected product.
        </p>
      )}
    </div>
  );
}