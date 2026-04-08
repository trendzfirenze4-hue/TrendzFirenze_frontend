


// import GiftSetBuilder from "@/components/giftset/GiftSetBuilder";

// async function getProducts() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       return [];
//     }

//     const data = await res.json();

//     if (Array.isArray(data)) return data;
//     if (Array.isArray(data.products)) return data.products;
//     if (Array.isArray(data.content)) return data.content;
//     return [];
//   } catch (error) {
//     console.error("Failed to fetch products", error);
//     return [];
//   }
// }

// export default async function GiftSetsPage() {
//   const products = await getProducts();

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-stone-50 to-gray-100 text-gray-900">
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-black/5 blur-3xl animate-pulse" />
//           <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-stone-200/50 blur-3xl" />
//           <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-gray-300/30 blur-3xl" />
//         </div>

//         <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
//           <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
//             <div className="max-w-3xl">
//               <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700 shadow-sm backdrop-blur">
//                 <span className="inline-block h-2 w-2 rounded-full bg-black animate-pulse" />
//                 Gift Set Studio
//               </div>

//               <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
//                 Build a premium
//                 <span className="block bg-gradient-to-r from-black via-gray-800 to-gray-500 bg-clip-text text-transparent">
//                   custom gift set
//                 </span>
//               </h1>

//               <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
//                 Curate a beautifully packed gift experience by selecting your
//                 favorite products and pairing each one with a premium gift box.
//                 Simple, elegant, and designed for a refined shopping journey.
//               </p>

//               <div className="mt-8 grid gap-3 sm:grid-cols-3">
//                 <div className="group rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md">
//                   <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
//                     Step 1
//                   </p>
//                   <h3 className="mt-2 text-sm font-semibold text-gray-900">
//                     Select Products
//                   </h3>
//                   <p className="mt-1 text-xs leading-6 text-gray-600">
//                     Choose up to 5 products for one curated gift collection.
//                   </p>
//                 </div>

//                 <div className="group rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md">
//                   <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
//                     Step 2
//                   </p>
//                   <h3 className="mt-2 text-sm font-semibold text-gray-900">
//                     Add Gift Boxes
//                   </h3>
//                   <p className="mt-1 text-xs leading-6 text-gray-600">
//                     Every selected product must include one matching gift box.
//                   </p>
//                 </div>

//                 <div className="group rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md">
//                   <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
//                     Step 3
//                   </p>
//                   <h3 className="mt-2 text-sm font-semibold text-gray-900">
//                     Get Discount
//                   </h3>
//                   <p className="mt-1 text-xs leading-6 text-gray-600">
//                     2 products get 10% off, and 3 to 5 products get 15% off.
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-8 flex flex-wrap items-center gap-3">
//                 <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm">
//                   Maximum 5 products
//                 </div>
//                 <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm">
//                   Premium gift boxes
//                 </div>
//                 <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm">
//                   Auto discount summary
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-black/5 via-transparent to-black/10 blur-2xl" />
//               <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
//                       Gift Set Benefits
//                     </p>
//                     <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950">
//                       Elegant gifting, simplified
//                     </h2>
//                   </div>
//                   <div className="rounded-2xl bg-gray-950 px-4 py-2 text-xs font-semibold text-white shadow-sm">
//                     Premium
//                   </div>
//                 </div>

//                 <div className="mt-6 space-y-4">
//                   <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-stone-50 p-4 transition duration-300 hover:shadow-sm">
//                     <div className="flex items-start gap-3">
//                       <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-black text-xs font-bold text-white">
//                         01
//                       </div>
//                       <div>
//                         <h3 className="text-sm font-semibold text-gray-900">
//                           Luxury presentation
//                         </h3>
//                         <p className="mt-1 text-xs leading-6 text-gray-600">
//                           Let customers combine products and present them in a
//                           more premium, gift-ready format.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-stone-50 p-4 transition duration-300 hover:shadow-sm">
//                     <div className="flex items-start gap-3">
//                       <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-black text-xs font-bold text-white">
//                         02
//                       </div>
//                       <div>
//                         <h3 className="text-sm font-semibold text-gray-900">
//                           Smart bundled pricing
//                         </h3>
//                         <p className="mt-1 text-xs leading-6 text-gray-600">
//                           Your backend handles box pricing and discount slabs
//                           cleanly without changing the normal product flow.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-white to-stone-50 p-4 transition duration-300 hover:shadow-sm">
//                     <div className="flex items-start gap-3">
//                       <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-xl bg-black text-xs font-bold text-white">
//                         03
//                       </div>
//                       <div>
//                         <h3 className="text-sm font-semibold text-gray-900">
//                           Better conversion feel
//                         </h3>
//                         <p className="mt-1 text-xs leading-6 text-gray-600">
//                           A curated builder experience feels more premium than a
//                           normal cart and improves gifting appeal.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4">
//                   <div className="flex flex-wrap items-center justify-between gap-3">
//                     <div>
//                       <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
//                         Discount Rules
//                       </p>
//                       <p className="mt-1 text-sm text-gray-700">
//                         1 item: 0% · 2 items: 10% · 3–5 items: 15%
//                       </p>
//                     </div>
//                     <div className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
//                       Live backend calculation
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
//         </div>
//       </section>

//       <section className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
//         <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
//               Builder Section
//             </p>
//             <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
//               Create your gift bundle
//             </h2>
//             <p className="mt-2 text-sm leading-6 text-gray-600">
//               Select products, assign gift boxes, and let the system calculate
//               the final total automatically.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm">
//               Products loaded:{" "}
//               <span className="font-bold text-gray-950">{products.length}</span>
//             </div>
//             <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm">
//               Experience:{" "}
//               <span className="font-bold text-gray-950">Premium Builder</span>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-[2rem] border border-white/70 bg-white/60 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur sm:p-4 lg:p-5">
//           <GiftSetBuilder products={products} />
//         </div>
//       </section>
//     </div>
//   );
// }









import GiftSetBuilder from "@/components/giftset/GiftSetBuilder";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.products)) return data.products;
    if (Array.isArray(data.content)) return data.content;

    return [];
  } catch (error) {
    console.error("Failed to fetch products", error);
    return [];
  }
}

export default async function GiftSetsPage() {
  const products = await getProducts();

  return <GiftSetBuilder products={products} />;
}