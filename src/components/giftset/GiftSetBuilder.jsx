


"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import {
  addGiftSetCartItem,
  clearGiftSetCart,
  fetchGiftSetCart,
  removeGiftSetCartItem,
  clearGiftSetError,
} from "@/features/giftSet/giftSetSlice";
import { fetchActiveGiftBoxes } from "@/features/giftBoxes/giftBoxSlice";
import SelectedGiftSetItems from "./SelectedGiftSetItems";
import GiftSetSummary from "./GiftSetSummary";

function getProductImage(product) {
  if (Array.isArray(product?.images) && product.images.length > 0) {
    return product.images[0];
  }
  return "/placeholder.png";
}

function getGiftBoxImage(box) {
  return box?.imagePath || "/placeholder.png";
}

const STEPS = [
  "Pick your style",
  "Choose a gift box",
  "Make it charming",
  "Select a Dust Bag",
  "Say it with a card",
];

export default function GiftSetBuilder({ products = [] }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

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
      return;
    }

    dispatch(fetchGiftSetCart());
  }, [dispatch, token, authInitialized]);

  const selectedItems = summary?.items || [];

  const selectedIds = useMemo(() => {
    return new Set(selectedItems.map((item) => item.productId));
  }, [selectedItems]);

  useEffect(() => {
    if (!activeProduct) return;
    if (selectedIds.has(activeProduct.id)) {
      setActiveProduct(null);
    }
  }, [selectedIds, activeProduct]);

  const redirectToLogin = () => {
    const redirectPath = pathname || "/giftsets";

    if (typeof window !== "undefined") {
      sessionStorage.setItem("redirectAfterLogin", redirectPath);
    }

    router.push(`/login?next=${encodeURIComponent(redirectPath)}`);
  };

  const handlePickProduct = (product) => {
    const alreadyAdded = selectedIds.has(product.id);
    const maxReached = !alreadyAdded && selectedItems.length >= 5 && !!token;

    if (maxReached) return;

    setActiveProduct(product);
    window?.scrollTo?.({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAddWithGiftBox = async (product, giftBoxId) => {
    if (!token) {
      redirectToLogin();
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
    } catch (err) {
      const status = err?.status || err?.response?.status;

      if (status === 401 || status === 403) {
        redirectToLogin();
      }
    } finally {
      setAddingProductId(null);
    }
  };

  const visibleError = token ? error : null;
  const totalSelected = selectedItems.length;
  const maxReached = totalSelected >= 5 && !!token;

  return (
    <section className="bg-white text-[#1a1a1a]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-6 lg:px-10">
        {/* Step Header */}
        <div className="mb-8 hidden md:block">
          <div className="relative mx-auto mb-3 flex max-w-6xl items-center justify-between">
            <div className="absolute left-0 right-0 top-[10px] h-[1px] bg-[#d9d9d9]" />
            {STEPS.map((step, index) => (
              <div
                key={step}
                className="relative z-10 flex flex-1 flex-col items-center text-center"
              >
                <span
                  className={`mb-3 h-4 w-4 rounded-full border ${
                    index === 0
                      ? "border-black bg-black"
                      : "border-[#d9d9d9] bg-white"
                  }`}
                />
                <span className="text-[14px] font-normal text-[#6f6f6f]">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected products section */}
        <div className="mb-8 rounded-3xl border border-[#e8e8e8] bg-[#fafafa] p-5 md:p-6">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-medium tracking-wide">
                Your Gift Set
              </h2>
              <p className="mt-1 text-sm text-[#666]">
                {totalSelected}/5 products selected
              </p>
            </div>

            {!token && (
              <div className="rounded-full border border-[#e0e0e0] bg-white px-4 py-2 text-sm text-[#666]">
                Sign in to save and review your gift set.
              </div>
            )}
          </div>

          {token ? (
            <SelectedGiftSetItems
              items={selectedItems}
              onRemove={(cartItemId) => dispatch(removeGiftSetCartItem(cartItemId))}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d7d7d7] bg-white px-4 py-8 text-center text-sm text-[#666]">
              Sign in to start adding products to your gift set.
            </div>
          )}
        </div>

        {/* Gift box chooser for selected product */}
        {activeProduct && (
          <div className="mb-10 rounded-[28px] border border-[#ebebeb] bg-[#fcfcfc] p-5 md:p-7">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#8a8a8a]">
                  Step 2
                </p>
                <h3 className="mt-1 text-2xl font-medium">
                  Choose a gift box for {activeProduct.title}
                </h3>
                <p className="mt-1 text-sm text-[#666]">
                  Select one gift box to add this product to your gift set.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveProduct(null)}
                className="rounded-full border border-[#d8d8d8] px-4 py-2 text-sm transition hover:bg-white"
              >
                Cancel
              </button>
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        )}

        {/* Product grid */}
        <div>
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

          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#dadada] p-8 text-center text-sm text-[#666]">
              No products available right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => {
                const selected = selectedIds.has(product.id);
                const disabled = !selected && selectedItems.length >= 5 && !!token;
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
                    <div className="aspect-[4/5] overflow-hidden bg-[#efefef]">
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

                      <p className="mt-1 text-sm text-[#666]">₹{product.priceInr}</p>

                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => handlePickProduct(product)}
                          disabled={selected || disabled || giftBoxLoading || loading}
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
                            ? "Selected - choose a gift box"
                            : "Pick this style"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {(visibleError || giftBoxError) && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {visibleError || giftBoxError}
          </div>
        )}

        <div className="mt-10">
          <GiftSetSummary
            summary={token ? summary : null}
            loading={loading || giftBoxLoading}
            onClear={() => dispatch(clearGiftSetCart())}
            showCheckoutLink
            mode="builder"
          />
        </div>
      </div>
    </section>
  );
}