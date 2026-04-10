


// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addGiftSetCartItem,
//   addGuestGiftSetItem,
//   clearGiftSetCart,
//   clearGiftSetError,
//   clearGuestGiftSetCart,
//   fetchGiftSetCart,
//   loadGuestGiftSetCart,
//   removeGiftSetCartItem,
//   removeGuestGiftSetItem,
//   syncGuestGiftSetCart,
// } from "@/features/giftSet/giftSetSlice";
// import { fetchActiveGiftBoxes } from "@/features/giftBoxes/giftBoxSlice";
// import SelectedGiftSetItems from "./SelectedGiftSetItems";
// import GiftSetSummary from "./GiftSetSummary";
// import getImageUrl from "@/lib/getImageUrl";

// function getProductImage(product) {
//   const rawImage =
//     Array.isArray(product?.images) && product.images.length > 0
//       ? product.images[0]
//       : null;

//   return rawImage ? getImageUrl(rawImage) : "/images/placeholder.png";
// }

// function getGiftBoxImage(box) {
//   return box?.imagePath ? getImageUrl(box.imagePath) : "/images/placeholder.png";
// }

// export default function GiftSetBuilder({ products = [] }) {
//   const dispatch = useDispatch();
//   const [mounted, setMounted] = useState(false);

//   const { token, initialized: authInitialized } = useSelector(
//     (state) => state.auth
//   );

//   const {
//     publicGiftBoxes = [],
//     loading: giftBoxLoading,
//     error: giftBoxError,
//   } = useSelector((state) => state.giftBoxes);

//   const { summary, loading, error } = useSelector((state) => state.giftSet);

//   const [activeProduct, setActiveProduct] = useState(null);
//   const [addingProductId, setAddingProductId] = useState(null);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     dispatch(fetchActiveGiftBoxes());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!mounted || !authInitialized) return;

//     if (!token) {
//       dispatch(clearGiftSetError());
//       dispatch(loadGuestGiftSetCart());
//       return;
//     }

//     dispatch(syncGuestGiftSetCart()).finally(() => {
//       dispatch(fetchGiftSetCart());
//     });
//   }, [dispatch, token, authInitialized, mounted]);

//   const selectedItems = summary?.items || [];

//   const selectedIds = useMemo(() => {
//     return new Set(selectedItems.map((item) => item.productId));
//   }, [selectedItems]);

//   const enrichedSelectedItems = useMemo(() => {
//     return selectedItems.map((item, index) => {
//       const matchedProduct = products.find((p) => p.id === item.productId);

//       return {
//         ...item,
//         guestItemKey:
//           item.guestItemKey || `${item.productId}-${item.giftBoxId}-${index}`,
//         productImageUrl:
//           item?.productImageUrl || matchedProduct?.images?.[0] || null,
//         productImages:
//           Array.isArray(item?.productImages) && item.productImages.length > 0
//             ? item.productImages
//             : matchedProduct?.images || [],
//       };
//     });
//   }, [selectedItems, products]);

//   useEffect(() => {
//     if (!activeProduct) return;
//     if (selectedIds.has(activeProduct.id)) {
//       setActiveProduct(null);
//     }
//   }, [selectedIds, activeProduct]);

//   const handlePickProduct = (product) => {
//     const alreadyAdded = selectedIds.has(product.id);
//     const maxReached = !alreadyAdded && selectedItems.length >= 5;

//     if (maxReached) return;
//     setActiveProduct(product);
//   };

//   const handleAddWithGiftBox = async (product, giftBoxId) => {
//     const selectedBox = publicGiftBoxes.find((box) => box.id === giftBoxId);

//     if (!selectedBox) return;

//     if (!token) {
//       dispatch(
//         addGuestGiftSetItem({
//           productId: product.id,
//           productTitle: product.title,
//           productPriceInr: product.priceInr,
//           productImagePath: product.images?.[0] || null,
//           giftBoxId: selectedBox.id,
//           giftBoxName: selectedBox.name,
//           giftBoxPriceInr: selectedBox.priceInr,
//           giftBoxImagePath: selectedBox.imagePath,
//           lineTotalInr: (product.priceInr || 0) + (selectedBox.priceInr || 0),
//         })
//       );

//       setActiveProduct(null);
//       return;
//     }

//     try {
//       setAddingProductId(product.id);

//       await dispatch(
//         addGiftSetCartItem({
//           productId: product.id,
//           giftBoxId: Number(giftBoxId),
//         })
//       ).unwrap();

//       setActiveProduct(null);
//     } finally {
//       setAddingProductId(null);
//     }
//   };

//   const handleRemove = (itemKey) => {
//     if (token) {
//       dispatch(removeGiftSetCartItem(itemKey));
//       return;
//     }

//     dispatch(removeGuestGiftSetItem(itemKey));
//   };

//   const handleClear = () => {
//     if (token) {
//       dispatch(clearGiftSetCart());
//       return;
//     }

//     dispatch(clearGuestGiftSetCart());
//   };

//   const visibleError = token ? error : null;
//   const totalSelected = selectedItems.length;
//   const maxReached = totalSelected >= 5;

//   return (
//     <section className="bg-white text-[#1a1a1a]">
//       <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-6 lg:px-10">
//         <div className="mb-8 rounded-3xl border border-[#e8e8e8] bg-[#fafafa] p-5 md:p-6">
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="text-xl font-medium tracking-wide">
//                 Your Gift Set
//               </h2>
//               <p className="mt-1 text-sm text-[#666]">
//                 {totalSelected}/5 products selected
//               </p>
//             </div>

//             {mounted && authInitialized && !token ? (
//               <div className="rounded-full border border-[#e0e0e0] bg-white px-4 py-2 text-sm text-[#666]">
//                 Explore freely now. Login is only needed at checkout.
//               </div>
//             ) : null}
//           </div>

//           <div className="mt-5">
//             {!mounted || !authInitialized ? (
//               <div className="text-sm text-[#666]">Loading...</div>
//             ) : (
//               <SelectedGiftSetItems
//                 items={enrichedSelectedItems}
//                 onRemove={handleRemove}
//               />
//             )}
//           </div>
//         </div>

//         {visibleError ? (
//           <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//             {visibleError}
//           </div>
//         ) : null}

//         {giftBoxError ? (
//           <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//             {giftBoxError}
//           </div>
//         ) : null}

//         <div className="mb-5 flex items-center justify-between gap-4">
//           <div>
//             <p className="text-xs uppercase tracking-[0.25em] text-[#8a8a8a]">
//               Step 1
//             </p>
//             <h2 className="mt-1 text-2xl font-medium">Pick your style</h2>
//           </div>

//           {maxReached ? (
//             <div className="rounded-full border border-[#e0e0e0] px-4 py-2 text-sm text-[#666]">
//               Maximum 5 products selected
//             </div>
//           ) : null}
//         </div>

//         {products.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-[#dadada] p-8 text-center text-sm text-[#666]">
//             No products available right now.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {products.map((product) => {
//               const alreadyAdded = selectedIds.has(product.id);
//               const disablePick = !alreadyAdded && maxReached;
//               const isActive = activeProduct?.id === product.id;

//               return (
//                 <div
//                   key={product.id}
//                   className={`overflow-hidden rounded-[28px] border bg-white transition ${
//                     isActive
//                       ? "border-black shadow-lg"
//                       : "border-[#ececec] shadow-sm hover:shadow-md"
//                   }`}
//                 >
//                   <div className="aspect-[4/5] overflow-hidden bg-[#f7f7f7]">
//                     <img
//                       src={getProductImage(product)}
//                       alt={product.title}
//                       className="h-full w-full object-contain p-4"
//                     />
//                   </div>

//                   <div className="p-4">
//                     <h3 className="line-clamp-2 text-base font-medium text-[#111]">
//                       {product.title}
//                     </h3>

//                     <p className="mt-2 text-sm text-[#666]">₹{product.priceInr}</p>

//                     <div className="mt-4">
//                       {alreadyAdded ? (
//                         <div className="rounded-xl bg-[#f5f5f5] px-4 py-3 text-center text-sm font-medium text-[#333]">
//                           Already added
//                         </div>
//                       ) : (
//                         <button
//                           type="button"
//                           onClick={() => handlePickProduct(product)}
//                           disabled={disablePick}
//                           className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition ${
//                             disablePick
//                               ? "cursor-not-allowed bg-gray-200 text-gray-400"
//                               : "bg-black text-white hover:opacity-90"
//                           }`}
//                         >
//                           {isActive ? "Choose Gift Box Below" : "Select Product"}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <div className="mt-10 grid gap-8 lg:grid-cols-[1.45fr_0.75fr]">
//           <div>
//             <div className="mb-5 flex items-center justify-between gap-4">
//               <div>
//                 <p className="text-xs uppercase tracking-[0.25em] text-[#8a8a8a]">
//                   Step 2
//                 </p>
//                 <h2 className="mt-1 text-2xl font-medium">Choose your gift box</h2>
//               </div>

//               {activeProduct ? (
//                 <div className="rounded-full border border-[#e0e0e0] px-4 py-2 text-sm text-[#666]">
//                   For: {activeProduct.title}
//                 </div>
//               ) : null}
//             </div>

//             {!activeProduct ? (
//               <div className="rounded-2xl border border-dashed border-[#dadada] p-8 text-center text-sm text-[#666]">
//                 Select a product first, then choose its gift box.
//               </div>
//             ) : giftBoxLoading ? (
//               <div className="rounded-2xl border border-dashed border-[#dadada] p-8 text-center text-sm text-[#666]">
//                 Loading gift boxes...
//               </div>
//             ) : publicGiftBoxes.length === 0 ? (
//               <div className="rounded-2xl border border-dashed border-[#dadada] p-8 text-center text-sm text-[#666]">
//                 No gift boxes available right now.
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//                 {publicGiftBoxes.map((box) => {
//                   const isSubmitting =
//                     addingProductId === activeProduct?.id && loading;

//                   return (
//                     <div
//                       key={box.id}
//                       className="overflow-hidden rounded-[28px] border border-[#ececec] bg-white shadow-sm transition hover:shadow-md"
//                     >
//                       <div className="aspect-[4/5] overflow-hidden bg-[#f7f7f7]">
//                         <img
//                           src={getGiftBoxImage(box)}
//                           alt={box.name}
//                           className="h-full w-full object-contain p-4"
//                         />
//                       </div>

//                       <div className="p-4">
//                         <h3 className="text-base font-medium text-[#111]">
//                           {box.name}
//                         </h3>

//                         {box.description ? (
//                           <p className="mt-2 line-clamp-2 text-sm text-[#666]">
//                             {box.description}
//                           </p>
//                         ) : null}

//                         <p className="mt-2 text-sm text-[#666]">₹{box.priceInr}</p>

//                         <button
//                           type="button"
//                           onClick={() => handleAddWithGiftBox(activeProduct, box.id)}
//                           disabled={isSubmitting}
//                           className="mt-4 w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
//                         >
//                           {isSubmitting ? "Adding..." : "Add With This Box"}
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           <GiftSetSummary
//             summary={summary}
//             loading={loading}
//             onClear={handleClear}
//             showCheckoutLink
//             mode="builder"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }















"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGiftSetCartItem,
  addGuestGiftSetItem,
  clearGiftSetCart,
  clearGiftSetError,
  clearGuestGiftSetCart,
  fetchGiftSetCart,
  loadGuestGiftSetCart,
  removeGiftSetCartItem,
  removeGuestGiftSetItem,
  syncGuestGiftSetCart,
} from "@/features/giftSet/giftSetSlice";
import { fetchActiveGiftBoxes } from "@/features/giftBoxes/giftBoxSlice";
import SelectedGiftSetItems from "./SelectedGiftSetItems";
import GiftSetSummary from "./GiftSetSummary";
import getImageUrl from "@/lib/getImageUrl";

function getProductImage(product) {
  const rawImage =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images[0]
      : null;

  return rawImage ? getImageUrl(rawImage) : "/images/placeholder.png";
}

function getGiftBoxImage(box) {
  return box?.imagePath ? getImageUrl(box.imagePath) : "/images/placeholder.png";
}

export default function GiftSetBuilder({ products = [] }) {
  const dispatch = useDispatch();

  const { token, initialized: authInitialized } = useSelector(
    (state) => state.auth
  );

  const {
    publicGiftBoxes = [],
    loading: giftBoxLoading,
    error: giftBoxError,
  } = useSelector((state) => state.giftBoxes);

  const { summary, loading, error } = useSelector((state) => state.giftSet);

  const [activeProduct, setActiveProduct] = useState(null);
  const [addingProductId, setAddingProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchActiveGiftBoxes());
  }, [dispatch]);

  useEffect(() => {
    if (!authInitialized) return;

    if (!token) {
      dispatch(clearGiftSetError());
      dispatch(loadGuestGiftSetCart());
      return;
    }

    dispatch(syncGuestGiftSetCart()).finally(() => {
      dispatch(fetchGiftSetCart());
    });
  }, [dispatch, token, authInitialized]);

  const selectedItems = summary?.items || [];

  const selectedIds = useMemo(() => {
    return new Set(selectedItems.map((item) => item.productId));
  }, [selectedItems]);

  const enrichedSelectedItems = useMemo(() => {
    return selectedItems.map((item, index) => {
      const matchedProduct = products.find((p) => p.id === item.productId);

      return {
        ...item,
        guestItemKey:
          item.guestItemKey || `${item.productId}-${item.giftBoxId}-${index}`,
        productImageUrl:
          item?.productImageUrl || matchedProduct?.images?.[0] || null,
        productImages:
          Array.isArray(item?.productImages) && item.productImages.length > 0
            ? item.productImages
            : matchedProduct?.images || [],
      };
    });
  }, [selectedItems, products]);

  useEffect(() => {
    if (!activeProduct) return;
    if (selectedIds.has(activeProduct.id)) {
      setActiveProduct(null);
    }
  }, [selectedIds, activeProduct]);

  const handlePickProduct = (product) => {
    const alreadyAdded = selectedIds.has(product.id);
    const maxReached = !alreadyAdded && selectedItems.length >= 5;

    if (maxReached) return;

    setActiveProduct(product);
  };

  const handleAddWithGiftBox = async (product, giftBoxId) => {
    const selectedBox = publicGiftBoxes.find((box) => box.id === giftBoxId);

    if (!selectedBox) return;

    if (!token) {
      dispatch(
        addGuestGiftSetItem({
          productId: product.id,
          productTitle: product.title,
          productPriceInr: product.priceInr,
          productImagePath: product.images?.[0] || null,
          giftBoxId: selectedBox.id,
          giftBoxName: selectedBox.name,
          giftBoxPriceInr: selectedBox.priceInr,
          giftBoxImagePath: selectedBox.imagePath,
          lineTotalInr: (product.priceInr || 0) + (selectedBox.priceInr || 0),
        })
      );

      setActiveProduct(null);
      return;
    }

    try {
      setAddingProductId(product.id);

      await dispatch(
        addGiftSetCartItem({
          productId: product.id,
          giftBoxId: Number(giftBoxId),
        })
      ).unwrap();

      setActiveProduct(null);
    } finally {
      setAddingProductId(null);
    }
  };

  const handleRemove = (itemKey) => {
    if (token) {
      dispatch(removeGiftSetCartItem(itemKey));
      return;
    }

    dispatch(removeGuestGiftSetItem(itemKey));
  };

  const handleClear = () => {
    if (token) {
      dispatch(clearGiftSetCart());
      return;
    }

    dispatch(clearGuestGiftSetCart());
  };

  const visibleError = token ? error : null;
  const totalSelected = selectedItems.length;
  const maxReached = totalSelected >= 5;

  return (
    <section className="bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-6 lg:px-10">
        <div className="mb-8 rounded-3xl border border-[#e8e8e8] bg-[#fafafa] p-5 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-medium tracking-wide">
                Your Gift Set
              </h2>
              <p className="mt-1 text-sm text-[#666]">
                {totalSelected}/5 products selected
              </p>
            </div>

            {authInitialized && !token && (
              <div className="rounded-full border border-[#e0e0e0] bg-white px-4 py-2 text-sm text-[#666]">
                Explore freely now. Login is only needed at checkout.
              </div>
            )}
          </div>

          <div className="mt-5">
            {authInitialized ? (
              <SelectedGiftSetItems
                items={enrichedSelectedItems}
                onRemove={handleRemove}
              />
            ) : (
              <div className="text-sm text-[#666]">Loading...</div>
            )}
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#8a8a8a]">
              Step 1
            </p>
            <h2 className="mt-1 text-2xl font-medium">Pick your style</h2>
          </div>

          {maxReached && (
            <div className="rounded-full border border-[#e0e0e0] px-4 py-2 text-sm text-[#666]">
              Maximum 5 products selected
            </div>
          )}
        </div>

        <div>
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#dadada] p-8 text-center text-sm text-[#666]">
              No products available right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => {
                const selected = selectedIds.has(product.id);
                const disabled = !selected && selectedItems.length >= 5;
                const isActive = activeProduct?.id === product.id;

                return (
                  <div
                    key={product.id}
                    className={`overflow-hidden rounded-[26px] border bg-white transition ${
                      isActive
                        ? "border-black shadow-md"
                        : "border-[#ececec] hover:shadow-sm"
                    }`}
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-[white]">
                      <img
                        src={getProductImage(product)}
                        alt={product.title}
                        className="h-full w-full object-contain p-6 transition duration-300 hover:scale-[1.02]"
                      />
                    </div>

                    <div className="border-t border-[#f0f0f0] px-4 pb-5 pt-4">
                      <h3 className="line-clamp-2 min-h-[52px] text-[15px] font-medium uppercase tracking-wide text-[#111]">
                        {product.title}
                      </h3>

                      <p className="mt-1 text-sm text-[#666]">
                        ₹{product.priceInr}
                      </p>

                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => handlePickProduct(product)}
                          disabled={
                            selected || disabled || giftBoxLoading || loading
                          }
                          className={`w-full rounded-full border px-4 py-3 text-sm transition ${
                            selected
                              ? "cursor-not-allowed border-[#d8d8d8] bg-[#f4f4f4] text-[#8a8a8a]"
                              : isActive
                              ? "border-black bg-black text-white"
                              : "border-black bg-white text-black hover:bg-black hover:text-white"
                          } disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {selected
                            ? "Already Added"
                            : isActive
                            ? "Selected"
                            : "Add to your giftset"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {activeProduct && (
          <div className="mt-8 grid grid-cols-1 gap-6 rounded-[28px] border border-[#ebebeb] bg-[#fcfcfc] p-5 md:p-7 xl:grid-cols-[340px_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-[24px] border border-[#e7e7e7] bg-white">
              <div className="aspect-[4/5] overflow-hidden bg-[#efefef]">
                <img
                  src={getProductImage(activeProduct)}
                  alt={activeProduct.title}
                  className="h-full w-full object-contain p-6"
                />
              </div>

              <div className="border-t border-[#f0f0f0] px-4 pb-5 pt-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#8a8a8a]">
                  Selected Product
                </p>
                <h3 className="mt-2 line-clamp-2 text-[16px] font-medium uppercase tracking-wide text-[#111]">
                  {activeProduct.title}
                </h3>
                <p className="mt-2 text-sm text-[#666]">
                  ₹{activeProduct.priceInr}
                </p>

                <button
                  type="button"
                  onClick={() => setActiveProduct(null)}
                  className="mt-4 w-full rounded-full border border-[#d8d8d8] px-4 py-3 text-sm text-[#222] transition hover:bg-black hover:text-white"
                >
                  Cancel Selection
                </button>
              </div>
            </div>

            <div>
              <div className="mb-5">
                <p className="text-xs uppercase tracking-[0.25em] text-[#8a8a8a]">
                  Step 2
                </p>
                <h3 className="mt-1 text-2xl font-medium">
                  Choose a gift box
                </h3>
                <p className="mt-1 text-sm text-[#666]">
                  Select a gift box for{" "}
                  <span className="font-medium">{activeProduct.title}</span>.
                  After adding it, you can choose the next product.
                </p>
              </div>

              {giftBoxLoading ? (
                <div className="rounded-2xl bg-white p-6 text-sm text-[#666]">
                  Loading gift boxes...
                </div>
              ) : publicGiftBoxes.length === 0 ? (
                <div className="rounded-2xl bg-white p-6 text-sm text-[#666]">
                  No gift boxes available right now.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {publicGiftBoxes.map((box) => (
                    <button
                      key={box.id}
                      type="button"
                      onClick={() => handleAddWithGiftBox(activeProduct, box.id)}
                      disabled={loading || addingProductId === activeProduct.id}
                      className="group overflow-hidden rounded-[24px] border border-[#e7e7e7] bg-white text-left transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-[#f1f1f1]">
                        <img
                          src={getGiftBoxImage(box)}
                          alt={box.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="p-4">
                        <h4 className="text-base font-medium uppercase tracking-wide text-[#1a1a1a]">
                          {box.name}
                        </h4>
                        <p className="mt-1 text-sm text-[#666]">
                          ₹{box.priceInr}
                        </p>

                        <div className="mt-4 inline-flex rounded-full border border-black px-4 py-2 text-sm text-black transition group-hover:bg-black group-hover:text-white">
                          {addingProductId === activeProduct.id
                            ? "Adding..."
                            : "Choose this box"}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {(visibleError || giftBoxError) && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {visibleError || giftBoxError}
          </div>
        )}

        <div className="mt-10">
          <GiftSetSummary
            summary={summary}
            loading={loading || giftBoxLoading}
            onClear={handleClear}
            showCheckoutLink
            mode="builder"
          />
        </div>
      </div>
    </section>
  );
}