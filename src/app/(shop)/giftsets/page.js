// import GiftSetBuilder from "@/components/giftset/GiftSetBuilder";
// import apiClient from "@/lib/apiClient";

// async function getProducts() {
//   try {
//     const res = await apiClient.get("/api/products");
//     const data = res.data;

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





















"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

const MAX_ITEMS = 5;

const DEFAULT_GIFT_BOXES = [
  {
    id: "white-box",
    name: "White Gift Box",
    color: "White",
    priceInr: 149,
    image:
      "https://dummyimage.com/600x600/f5f5f5/111111&text=White+Box",
  },
  {
    id: "black-box",
    name: "Black Gift Box",
    color: "Black",
    priceInr: 149,
    image:
      "https://dummyimage.com/600x600/111111/ffffff&text=Black+Box",
  },
  {
    id: "grey-box",
    name: "Grey Gift Box",
    color: "Grey",
    priceInr: 149,
    image:
      "https://dummyimage.com/600x600/cfcfcf/111111&text=Grey+Box",
  },
];

function formatPrice(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function getProductId(product) {
  return product?.id ?? product?._id ?? product?.slug ?? product?.sku;
}

function getProductName(product) {
  return (
    product?.name ||
    product?.title ||
    product?.productName ||
    product?.product_name ||
    "Product"
  );
}

function getProductImage(product) {
  if (typeof product?.imageUrl === "string") return product.imageUrl;
  if (typeof product?.image === "string") return product.image;
  if (typeof product?.thumbnail === "string") return product.thumbnail;
  if (Array.isArray(product?.images) && product.images.length > 0) {
    const first = product.images[0];
    if (typeof first === "string") return first;
    if (typeof first?.url === "string") return first.url;
    if (typeof first?.imageUrl === "string") return first.imageUrl;
  }
  return "https://dummyimage.com/800x800/e8e8e8/555555&text=No+Image";
}

function getSalePrice(product) {
  return Number(
    product?.salePrice ??
      product?.discountPrice ??
      product?.price ??
      product?.sellingPrice ??
      0
  );
}

function getOriginalPrice(product) {
  return Number(
    product?.mrp ??
      product?.originalPrice ??
      product?.compareAtPrice ??
      product?.listPrice ??
      getSalePrice(product)
  );
}

function getDiscountPercent(product) {
  const sale = getSalePrice(product);
  const original = getOriginalPrice(product);
  if (!original || original <= sale) return 0;
  return Math.round(((original - sale) / original) * 100);
}

function getDiscountRate(count) {
  if (count >= 3) return 0.15;
  if (count === 2) return 0.1;
  return 0;
}

function ProductCard({
  product,
  disabled,
  alreadyAdded,
  onAdd,
  onFocusSelected,
  onRemoveSelected,
}) {
  const name = getProductName(product);
  const image = getProductImage(product);
  const salePrice = getSalePrice(product);
  const originalPrice = getOriginalPrice(product);
  const off = getDiscountPercent(product);

  return (
    <div className="group relative flex h-full flex-col bg-white">
      <div className="relative overflow-hidden bg-[#efefef]">
        <div className="aspect-[0.9/1] w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="line-clamp-2 min-h-[52px] text-[15px] font-medium uppercase tracking-[0.02em] text-black sm:text-[17px]">
          {name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-black">
          <span className="text-lg font-bold">{formatPrice(salePrice)}</span>
          {originalPrice > salePrice && (
            <span className="text-base text-gray-500 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          {off > 0 && (
            <span className="text-base font-semibold">{off}% OFF</span>
          )}
        </div>

        <div className="mt-5 flex gap-2">
          {!alreadyAdded ? (
            <button
              type="button"
              onClick={onAdd}
              disabled={disabled}
              className={clsx(
                "h-12 flex-1 border text-sm font-semibold uppercase tracking-[0.08em] transition",
                disabled
                  ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
                  : "border-black bg-black text-white hover:bg-white hover:text-black"
              )}
            >
              Add To Box
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onFocusSelected}
                className="h-12 flex-1 border border-gray-400 bg-[#f5f5f5] text-sm font-semibold uppercase tracking-[0.08em] text-black transition hover:bg-white"
              >
                Added
              </button>
              <button
                type="button"
                onClick={onRemoveSelected}
                className="grid h-12 w-12 place-items-center border border-black bg-white text-xl text-black transition hover:bg-black hover:text-white"
                aria-label={`Remove ${name}`}
              >
                ×
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function GiftBoxCard({ box, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "group overflow-hidden border bg-white text-left transition",
        selected
          ? "border-black shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
          : "border-gray-200 hover:border-black/70"
      )}
    >
      <div className="aspect-square overflow-hidden bg-[#f4f4f4]">
        <img
          src={box.image}
          alt={box.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          Gift Box
        </p>
        <h4 className="mt-1 text-sm font-semibold uppercase tracking-[0.04em] text-black">
          {box.name}
        </h4>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-base font-bold text-black">
            {formatPrice(box.priceInr)}
          </span>
          <span
            className={clsx(
              "text-xs font-semibold uppercase tracking-[0.12em]",
              selected ? "text-black" : "text-gray-500"
            )}
          >
            {selected ? "Selected" : "Choose"}
          </span>
        </div>
      </div>
    </button>
  );
}

function SelectedSlot({ item, index, isActive, onClick }) {
  const filled = Boolean(item);
  const label = filled ? getProductName(item.product) : "Add";

  return (
    <button
      type="button"
      onClick={filled ? onClick : undefined}
      className={clsx(
        "relative flex h-16 w-16 items-center justify-center border text-xs transition sm:h-20 sm:w-20",
        filled
          ? isActive
            ? "border-black bg-white shadow-sm"
            : "border-gray-400 bg-white"
          : "border-dashed border-gray-500 bg-white text-black"
      )}
    >
      {filled ? (
        <img
          src={getProductImage(item.product)}
          alt={label}
          className="h-full w-full object-contain p-1"
        />
      ) : (
        <span className="font-medium">Add</span>
      )}

      <span className="pointer-events-none absolute -top-2 -right-2 hidden h-6 min-w-6 items-center justify-center rounded-full border border-black bg-white px-1 text-[10px] font-bold text-black sm:inline-flex">
        {index + 1}
      </span>
    </button>
  );
}

export default function GiftSetBuilder({
  products = [],
  giftBoxes = DEFAULT_GIFT_BOXES,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [page, setPage] = useState(0);

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const visibleProducts = useMemo(() => {
    const start = page * pageSize;
    return products.slice(start, start + pageSize);
  }, [products, page]);

  const activeItem =
    activeIndex !== null && selectedItems[activeIndex]
      ? selectedItems[activeIndex]
      : null;

  const selectedProductIds = useMemo(
    () => new Set(selectedItems.map((item) => getProductId(item.product))),
    [selectedItems]
  );

  const canAddAnother =
    selectedItems.length === 0 ||
    (selectedItems.length < MAX_ITEMS &&
      selectedItems.every((item) => Boolean(item.giftBox)));

  const handleAddProduct = (product) => {
    const productId = getProductId(product);
    if (!productId) return;

    if (selectedProductIds.has(productId)) {
      const existingIndex = selectedItems.findIndex(
        (item) => getProductId(item.product) === productId
      );
      if (existingIndex !== -1) setActiveIndex(existingIndex);
      return;
    }

    if (selectedItems.length >= MAX_ITEMS) return;
    if (!canAddAnother) return;

    const nextItems = [...selectedItems, { product, giftBox: null }];
    setSelectedItems(nextItems);
    setActiveIndex(nextItems.length - 1);
  };

  const handleRemoveSelected = (productId) => {
    const indexToRemove = selectedItems.findIndex(
      (item) => getProductId(item.product) === productId
    );
    if (indexToRemove === -1) return;

    const nextItems = selectedItems.filter(
      (item) => getProductId(item.product) !== productId
    );
    setSelectedItems(nextItems);

    if (nextItems.length === 0) {
      setActiveIndex(null);
      return;
    }

    if (activeIndex === indexToRemove) {
      setActiveIndex(Math.max(0, indexToRemove - 1));
    } else if (activeIndex > indexToRemove) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleChooseGiftBox = (box) => {
    if (activeIndex === null) return;

    setSelectedItems((prev) =>
      prev.map((item, idx) =>
        idx === activeIndex ? { ...item, giftBox: box } : item
      )
    );

    const isLast = activeIndex === selectedItems.length - 1;
    const allCurrentCompleted = selectedItems.every((item, idx) =>
      idx === activeIndex ? true : Boolean(item.giftBox)
    );

    if (
      isLast &&
      allCurrentCompleted &&
      selectedItems.length < MAX_ITEMS
    ) {
      // keep active at current item; customer can now add next product
    }
  };

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + getSalePrice(item.product),
    0
  );

  const originalSubtotal = selectedItems.reduce(
    (sum, item) => sum + getOriginalPrice(item.product),
    0
  );

  const boxTotal = selectedItems.reduce(
    (sum, item) => sum + Number(item?.giftBox?.priceInr || 0),
    0
  );

  const discountRate = getDiscountRate(selectedItems.length);
  const discountAmount = Math.round(subtotal * discountRate);
  const finalTotal = subtotal + boxTotal - discountAmount;

  const allSelectedCompleted =
    selectedItems.length > 0 &&
    selectedItems.every((item) => Boolean(item.giftBox));

  return (
    <div className="overflow-hidden rounded-[26px] border border-black/10 bg-[#f7f7f7]">
      <div className="border-b border-black/10 bg-white px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">
              Gift Builder
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-black">
              Select products and assign one box to each
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Add 1 product first, choose its gift box, then continue to the next item.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="border border-black/10 bg-white px-4 py-2 text-xs font-medium text-black">
              Max {MAX_ITEMS} products
            </div>
            <div className="border border-black/10 bg-white px-4 py-2 text-xs font-medium text-black">
              1 box required per product
            </div>
            <div className="border border-black/10 bg-white px-4 py-2 text-xs font-medium text-black">
              Auto discount enabled
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-0 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="border-r-0 border-black/10 bg-[#f7f7f7] xl:border-r">
          <div className="grid grid-cols-1 gap-x-3 gap-y-8 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
            {visibleProducts.map((product) => {
              const productId = getProductId(product);
              const existingIndex = selectedItems.findIndex(
                (item) => getProductId(item.product) === productId
              );
              const alreadyAdded = existingIndex !== -1;

              return (
                <ProductCard
                  key={productId || getProductName(product)}
                  product={product}
                  disabled={!alreadyAdded && !canAddAnother}
                  alreadyAdded={alreadyAdded}
                  onAdd={() => handleAddProduct(product)}
                  onFocusSelected={() => setActiveIndex(existingIndex)}
                  onRemoveSelected={() => handleRemoveSelected(productId)}
                />
              );
            })}
          </div>
        </div>

        <div className="bg-white">
          <div className="border-b border-black/10 p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              Selected Product
            </p>

            {!activeItem ? (
              <div className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-[#fafafa] p-6 text-center">
                <p className="text-sm font-medium text-black">
                  No product selected yet
                </p>
                <p className="mt-1 text-xs leading-6 text-gray-500">
                  Choose your first product from the left side to start the gift set.
                </p>
              </div>
            ) : (
              <div className="mt-4 overflow-hidden border border-black/10 bg-[#fafafa]">
                <div className="aspect-square bg-[#efefef]">
                  <img
                    src={getProductImage(activeItem.product)}
                    alt={getProductName(activeItem.product)}
                    className="h-full w-full object-contain p-4"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold uppercase tracking-[0.04em] text-black">
                    {getProductName(activeItem.product)}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-lg font-bold text-black">
                      {formatPrice(getSalePrice(activeItem.product))}
                    </span>
                    {getOriginalPrice(activeItem.product) >
                      getSalePrice(activeItem.product) && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(getOriginalPrice(activeItem.product))}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 rounded-xl border border-black/10 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                      Gift Box Status
                    </p>
                    <p className="mt-1 text-sm font-medium text-black">
                      {activeItem.giftBox
                        ? `${activeItem.giftBox.name} selected`
                        : "Please select 1 box for this product"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                  Box Options
                </p>
                <h3 className="mt-1 text-lg font-bold text-black">
                  Choose one gift box
                </h3>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
              {giftBoxes.map((box) => (
                <GiftBoxCard
                  key={box.id}
                  box={box}
                  selected={activeItem?.giftBox?.id === box.id}
                  onClick={() => handleChooseGiftBox(box)}
                />
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-[#fafafa] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                Discount Rules
              </p>
              <p className="mt-2 text-sm text-black">
                1 product: 0% off · 2 products: 10% off · 3 to 5 products: 15% off
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 bg-white px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center justify-between gap-4 xl:min-w-[180px]">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(0, prev - 1))}
              disabled={page === 0}
              className={clsx(
                "h-12 min-w-[120px] border px-5 text-sm font-medium transition",
                page === 0
                  ? "cursor-not-allowed border-gray-300 bg-[#f6f6f6] text-gray-400"
                  : "border-black/20 bg-white text-black hover:border-black"
              )}
            >
              Previous
            </button>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-center gap-3">
            {Array.from({ length: MAX_ITEMS }).map((_, index) => {
              const item = selectedItems[index] || null;
              const showPlus = index < MAX_ITEMS - 1;

              return (
                <div key={index} className="flex items-center gap-3">
                  <SelectedSlot
                    item={item}
                    index={index}
                    isActive={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                  />
                  {showPlus && (
                    <span className="text-3xl font-semibold text-black">+</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 xl:min-w-[340px] xl:items-end">
            <div className="text-right">
              <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
                <span className="text-2xl font-bold text-black">
                  {formatPrice(finalTotal)}
                </span>

                {originalSubtotal > subtotal && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(originalSubtotal + boxTotal)}
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-gray-500">
                Products: {formatPrice(subtotal)} · Boxes: {formatPrice(boxTotal)} ·
                Discount: -{formatPrice(discountAmount)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={page >= totalPages - 1}
                className={clsx(
                  "h-12 min-w-[120px] border px-5 text-sm font-medium transition xl:hidden",
                  page >= totalPages - 1
                    ? "cursor-not-allowed border-gray-300 bg-[#f6f6f6] text-gray-400"
                    : "border-black/20 bg-white text-black hover:border-black"
                )}
              >
                Next Page
              </button>

              <button
                type="button"
                disabled={!allSelectedCompleted}
                className={clsx(
                  "h-12 min-w-[150px] border px-6 text-sm font-semibold uppercase tracking-[0.08em] transition",
                  allSelectedCompleted
                    ? "border-black bg-black text-white hover:bg-white hover:text-black"
                    : "cursor-not-allowed border-gray-300 bg-[#f6f6f6] text-gray-400"
                )}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 hidden justify-start xl:flex">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={page >= totalPages - 1}
            className={clsx(
              "h-12 min-w-[150px] border px-5 text-sm font-medium transition",
              page >= totalPages - 1
                ? "cursor-not-allowed border-gray-300 bg-[#f6f6f6] text-gray-400"
                : "border-black/20 bg-white text-black hover:border-black"
            )}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}