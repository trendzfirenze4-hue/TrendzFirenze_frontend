


// "use client";

// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";

// export default function GiftSetSummary({
//   summary,
//   loading,
//   onClear,
//   showCheckoutLink = true,
//   mode = "builder",
// }) {
//   const router = useRouter();
//   const token = useSelector((state) => state.auth?.token);

//   const safeSummary = summary || {
//     items: [],
//     totalProducts: 0,
//     subtotalInr: 0,
//     discountPercent: 0,
//     discountAmountInr: 0,
//     finalTotalInr: 0,
//   };

//   const disabled = loading || safeSummary.totalProducts === 0;

//   const handlePrimaryAction = () => {
//     if (safeSummary.totalProducts === 0) return;

//     if (mode === "builder") {
//       router.push("/giftset-cart");
//       return;
//     }

//     if (!token) {
//       if (typeof window !== "undefined") {
//         sessionStorage.setItem("redirectAfterLogin", "/checkout?source=giftset");
//       }
//       router.push("/login?next=%2Fcheckout%3Fsource%3Dgiftset");
//       return;
//     }

//     router.push("/checkout?source=giftset");
//   };

//   return (
//     <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">
//       <h2 className="text-lg font-bold">Gift Set Summary</h2>

//       <div className="mt-4 space-y-3 text-sm">
//         <div className="flex justify-between">
//           <span>Total Products</span>
//           <span>{safeSummary.totalProducts}</span>
//         </div>

//         <div className="flex justify-between">
//           <span>Subtotal</span>
//           <span>₹{safeSummary.subtotalInr}</span>
//         </div>

//         <div className="flex justify-between text-green-600">
//           <span>Discount ({safeSummary.discountPercent}%)</span>
//           <span>-₹{safeSummary.discountAmountInr}</span>
//         </div>

//         <div className="flex justify-between border-t pt-3 text-base font-bold">
//           <span>Final Total</span>
//           <span>₹{safeSummary.finalTotalInr}</span>
//         </div>
//       </div>

//       <div className="mt-6 space-y-3">
//         <button
//           type="button"
//           onClick={onClear}
//           disabled={disabled}
//           className="w-full rounded-xl border px-4 py-3 disabled:opacity-50"
//         >
//           {loading ? "Processing..." : "Clear"}
//         </button>

//         {showCheckoutLink ? (
//           <button
//             type="button"
//             onClick={handlePrimaryAction}
//             disabled={safeSummary.totalProducts === 0}
//             className={`block w-full rounded-xl px-4 py-3 text-center ${
//               safeSummary.totalProducts === 0
//                 ? "cursor-not-allowed bg-gray-200 text-gray-400"
//                 : "bg-black text-white"
//             }`}
//           >
//             {mode === "builder" ? "Review Gift Set" : "Proceed to Checkout"}
//           </button>
//         ) : null}
//       </div>
//     </div>
//   );
// }














"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function GiftSetSummary({
  summary,
  loading,
  onClear,
  showCheckoutLink = true,
  mode = "builder",
}) {
  const router = useRouter();
  const token = useSelector((state) => state.auth?.token);

  const safeSummary = summary || {
    items: [],
    totalProducts: 0,
    subtotalInr: 0,
    discountPercent: 0,
    discountAmountInr: 0,
    finalTotalInr: 0,
  };

  const disabled = loading || safeSummary.totalProducts === 0;

  const handlePrimaryAction = () => {
    if (safeSummary.totalProducts === 0) return;

    if (mode === "builder") {
      router.push("/giftset-cart");
      return;
    }

    if (!token) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "redirectAfterLogin",
          "/checkout?source=giftset"
        );
      }
      router.push("/login?next=%2Fcheckout%3Fsource%3Dgiftset");
      return;
    }

    router.push("/checkout?source=giftset");
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
          disabled={disabled}
          className="w-full rounded-xl border px-4 py-3 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Clear"}
        </button>

        {showCheckoutLink ? (
          <button
            type="button"
            onClick={handlePrimaryAction}
            disabled={safeSummary.totalProducts === 0}
            className={`block w-full rounded-xl px-4 py-3 text-center ${
              safeSummary.totalProducts === 0
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "bg-black text-white"
            }`}
          >
            {mode === "builder" ? "Review Gift Set" : "Proceed to Checkout"}
          </button>
        ) : null}
      </div>
    </div>
  );
}