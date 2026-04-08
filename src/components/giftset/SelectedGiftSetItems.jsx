// "use client";

// export default function SelectedGiftSetItems({ items, onRemove }) {
//   if (!items?.length) {
//     return (
//       <div className="rounded-2xl border border-dashed bg-white p-6 text-sm text-gray-500">
//         No products selected yet.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {items.map((item, index) => (
//         <div
//           key={item.cartItemId || `${item.productId}-${item.giftBoxId}-${index}`}
//           className="rounded-2xl border bg-white p-5"
//         >
//           <div className="mb-4 flex items-start justify-between gap-4">
//             <div>
//               <p className="text-xs uppercase tracking-wide text-gray-500">
//                 Product {index + 1}
//               </p>
//               <h3 className="text-base font-semibold">{item.productTitle}</h3>
//               <p className="text-sm text-gray-600">₹{item.productPriceInr}</p>
//               <p className="text-sm text-gray-600">
//                 Gift Box: {item.giftBoxName} — ₹{item.giftBoxPriceInr}
//               </p>
//               <p className="mt-1 text-sm font-semibold text-black">
//                 Line Total: ₹{item.lineTotalInr}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => onRemove(item.cartItemId)}
//               className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }






















"use client";

export default function SelectedGiftSetItems({ items, onRemove }) {
  if (!items?.length) {
    return (
      <div className="rounded-2xl border border-dashed bg-white p-6 text-sm text-gray-500">
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
            className="rounded-2xl border bg-white p-5"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Product {index + 1}
                </p>
                <h3 className="text-base font-semibold">{item.productTitle}</h3>
                <p className="text-sm text-gray-600">₹{item.productPriceInr}</p>
                <p className="text-sm text-gray-600">
                  Gift Box: {item.giftBoxName} — ₹{item.giftBoxPriceInr}
                </p>
                <p className="mt-1 text-sm font-semibold text-black">
                  Line Total: ₹{item.lineTotalInr}
                </p>
              </div>

              <button
                type="button"
                onClick={() => canRemove && onRemove(item.cartItemId)}
                disabled={!canRemove}
                className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}