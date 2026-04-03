"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBrandShowcaseState,
  clearUploadResult,
  uploadBrandShowcaseModelImage,
} from "@/features/brandShowcases/brandShowcaseSlice";
import apiClient from "@/lib/apiClient";

export default function BrandShowcaseForm({
  initialData = null,
  onSubmit,
  submitLabel = "Save Showcase",
}) {
  const dispatch = useDispatch();

  const { uploading, uploadResult, saving, error, successMessage } = useSelector(
    (state) => state.brandShowcases
  );

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    modelImageUrl: initialData?.modelImageUrl || "",
    cloudinaryPublicId: initialData?.cloudinaryPublicId || "",
    displayOrder: initialData?.displayOrder ?? 0,
    active: initialData?.active ?? true,
    productIds: initialData?.products?.map((p) => p.id) || [],
  });

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setProductsLoading(true);
        const res = await apiClient.get("/api/products");
        if (!mounted) return;
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        if (mounted) setProductsLoading(false);
      }
    }

    loadProducts();

    return () => {
      mounted = false;
      dispatch(clearBrandShowcaseState());
      dispatch(clearUploadResult());
    };
  }, [dispatch]);

  useEffect(() => {
    if (uploadResult?.imageUrl) {
      setForm((prev) => ({
        ...prev,
        modelImageUrl: uploadResult.imageUrl,
        cloudinaryPublicId: uploadResult.cloudinaryPublicId || "",
      }));
    }
  }, [uploadResult]);

  const selectedProducts = useMemo(() => {
    return products.filter((p) => form.productIds.includes(p.id));
  }, [products, form.productIds]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "displayOrder"
          ? Number(value)
          : value,
    }));
  };

  const handleToggleProduct = (productId) => {
    setForm((prev) => {
      const exists = prev.productIds.includes(productId);

      if (exists) {
        return {
          ...prev,
          productIds: prev.productIds.filter((id) => id !== productId),
        };
      }

      return {
        ...prev,
        productIds: [...prev.productIds, productId],
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    dispatch(uploadBrandShowcaseModelImage(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      modelImageUrl: form.modelImageUrl.trim(),
      cloudinaryPublicId: form.cloudinaryPublicId.trim(),
      displayOrder: Number(form.displayOrder) || 0,
      active: !!form.active,
      productIds: form.productIds,
    };

    onSubmit(payload);
  };

  return (
    <div className="rounded-2xl border border-gray-700 bg-[#111111] p-5 shadow-sm text-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {String(error)}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {successMessage}
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="From the Brand"
              className="w-full rounded-xl border border-gray-600 bg-[#181818] px-4 py-3 text-white caret-white placeholder:text-gray-400 outline-none focus:border-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Display Order
            </label>
            <input
              type="number"
              name="displayOrder"
              value={form.displayOrder}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-600 bg-[#181818] px-4 py-3 text-white caret-white placeholder:text-gray-400 outline-none focus:border-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Subtitle
          </label>
          <textarea
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            rows={3}
            placeholder="Luxury that moves with you"
            className="w-full rounded-xl border border-gray-600 bg-[#181818] px-4 py-3 text-white caret-white placeholder:text-gray-400 outline-none focus:border-white"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Upload Model Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full rounded-xl border border-gray-600 bg-[#181818] px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
            />
            {uploading ? (
              <p className="mt-2 text-sm text-gray-400">Uploading image...</p>
            ) : null}
          </div>

          <div className="flex items-center gap-3 pt-8">
            <input
              id="active"
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="h-4 w-4 accent-white"
            />
            <label htmlFor="active" className="text-sm font-medium text-gray-300">
              Active
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Model Image URL
          </label>
          <input
            name="modelImageUrl"
            value={form.modelImageUrl}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-600 bg-[#181818] px-4 py-3 text-white caret-white placeholder:text-gray-400 outline-none focus:border-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Cloudinary Public ID
          </label>
          <input
            name="cloudinaryPublicId"
            value={form.cloudinaryPublicId}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-600 bg-[#181818] px-4 py-3 text-white caret-white placeholder:text-gray-400 outline-none focus:border-white"
          />
        </div>

        {form.modelImageUrl ? (
          <div>
            <p className="mb-2 text-sm font-medium text-gray-300">Preview</p>
            <div className="overflow-hidden rounded-2xl border border-gray-700 bg-[#181818]">
              <img
                src={form.modelImageUrl}
                alt="Model preview"
                className="h-[320px] w-full object-cover"
              />
            </div>
          </div>
        ) : null}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-300">
              Select Products
            </label>
            <span className="text-sm text-gray-400">
              Selected: {form.productIds.length}
            </span>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-[#141414]">
            {productsLoading ? (
              <div className="p-4 text-sm text-gray-400">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="p-4 text-sm text-gray-400">No products found.</div>
            ) : (
              <div className="max-h-[420px] overflow-y-auto p-3">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => {
                    const checked = form.productIds.includes(product.id);
                    const imageUrl = product.images?.[0]?.imageUrl || null;

                    return (
                      <button
                        type="button"
                        key={product.id}
                        onClick={() => handleToggleProduct(product.id)}
                        className={`overflow-hidden rounded-2xl border text-left transition ${
                          checked
                            ? "border-white bg-white text-black"
                            : "border-gray-700 bg-[#1a1a1a] text-white hover:border-gray-500"
                        }`}
                      >
                        <div className="aspect-[4/3] w-full bg-[#222222]">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="p-3">
                          <p className="line-clamp-2 text-sm font-semibold">
                            {product.title}
                          </p>
                          <p className="mt-1 text-xs opacity-80">
                            ₹{product.priceInr}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedProducts.length > 0 ? (
          <div>
            <p className="mb-3 text-sm font-medium text-gray-300">
              Selected Product Order
            </p>
            <div className="space-y-2">
              {selectedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-xl border border-gray-700 bg-[#181818] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {index + 1}. {product.title}
                    </p>
                    <p className="text-xs text-gray-400">Product ID: {product.id}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleProduct(product.id)}
                    className="text-sm font-medium text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}