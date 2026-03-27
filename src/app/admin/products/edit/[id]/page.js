

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import api from "@/lib/apiClient";

import { fetchCategories } from "@/features/categories/categorySlice";
import {
  updateProduct,
  addProductReview,
  updateProductReview,
  deleteProductReview,
} from "@/features/adminProducts/adminProductThunks";
import { uploadProductImages } from "@/features/products/uploadSlice";

export default function EditProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  const id = params?.id;
  const productId = Number(id);

  const [loading, setLoading] = useState(false);

  const categories = useSelector((state) => state.categories.items);

  const [product, setProduct] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [featured, setFeatured] = useState(false);

  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!id) return;

    api.get(`/api/admin/products/${id}`).then((res) => {
      const p = res.data;

      setProduct(p);

      setTitle(p.title || "");
      setDescription(p.description || "");
      setPrice(p.priceInr || "");
      setStock(p.stock || "");
      setCategoryId(p.category?.id || "");

      setImages(p.images || []);
      setReviews(p.reviews || []);
    });
  }, [id]);

  const removeImage = (index) => {
    const arr = [...images];
    arr.splice(index, 1);
    setImages(arr);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      const res = await dispatch(uploadProductImages(files)).unwrap();
      setImages((prev) => [...prev, ...res]);
      setFiles([]);
    } catch (err) {
      alert("Upload failed");
    }
  };

  const handleUpdate = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const data = {
        title,
        description,
        priceInr: Number(price),
        stock: Number(stock),
        categoryId: Number(categoryId) || 1,
        images: images.map((img) =>
          typeof img === "string" ? img : img.imageUrl
        ),
      };

      await dispatch(updateProduct({ id: productId, data })).unwrap();

      alert("Product updated");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }

    setLoading(false);
  };

  const resetReviewForm = () => {
    setReviewerName("");
    setRating("5");
    setReviewText("");
    setFeatured(false);
    setEditingReviewId(null);
  };

  const handleSaveReview = async () => {
    if (!reviewerName.trim() || !reviewText.trim()) {
      alert("Reviewer name and review text are required");
      return;
    }

    const data = {
      reviewerName,
      rating: Number(rating),
      reviewText,
      featured,
    };

    try {
      if (editingReviewId) {
        const result = await dispatch(
          updateProductReview({
            productId,
            reviewId: editingReviewId,
            data,
          })
        ).unwrap();

        setReviews((prev) =>
          prev.map((r) => (r.id === result.review.id ? result.review : r))
        );
        alert("Review updated");
      } else {
        const result = await dispatch(
          addProductReview({
            productId,
            data,
          })
        ).unwrap();

        setReviews((prev) => [result.review, ...prev]);
        alert("Review added");
      }

      resetReviewForm();
    } catch (err) {
      console.error(err);
      alert("Review save failed");
    }
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review.id);
    setReviewerName(review.reviewerName || "");
    setRating(String(review.rating || 5));
    setReviewText(review.reviewText || "");
    setFeatured(!!review.featured);
  };

  const handleDeleteReview = async (reviewId) => {
    const ok = window.confirm("Delete this review?");
    if (!ok) return;

    try {
      await dispatch(deleteProductReview({ productId, reviewId })).unwrap();
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      if (editingReviewId === reviewId) resetReviewForm();
      alert("Review deleted");
    } catch (err) {
      console.error(err);
      alert("Review delete failed");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Edit Product</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <br /><br />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="file"
        multiple
        onChange={(e) => setFiles([...e.target.files])}
      />

      <button onClick={handleUpload}>
        Upload Images
      </button>

      <br /><br />

      <h3>Images</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {images.map((img, i) => {
          const url = typeof img === "string" ? img : img.imageUrl;

          return (
            <div
              key={i}
              style={{
                position: "relative",
                border: "1px solid #ddd",
                padding: "4px",
                borderRadius: "6px",
              }}
            >
              <img
                src={
                  url.startsWith("http")
                    ? url
                    : `${process.env.NEXT_PUBLIC_API_BASE}${url}`
                }
                width="120"
                alt="Product"
              />

              <button
                onClick={() => removeImage(i)}
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      <br /><br />

      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update Product"}
      </button>

      <hr style={{ margin: "40px 0" }} />

      <h2>Manage Reviews</h2>

      <input
        placeholder="Reviewer name"
        value={reviewerName}
        onChange={(e) => setReviewerName(e.target.value)}
      />

      <br /><br />

      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="5">5 Star</option>
        <option value="4">4 Star</option>
        <option value="3">3 Star</option>
        <option value="2">2 Star</option>
        <option value="1">1 Star</option>
      </select>

      <br /><br />

      <textarea
        placeholder="Review text"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        {" "}Featured review
      </label>

      <br /><br />

      <button onClick={handleSaveReview}>
        {editingReviewId ? "Update Review" : "Add Review"}
      </button>

      {editingReviewId && (
        <button
          onClick={resetReviewForm}
          style={{ marginLeft: "10px" }}
        >
          Cancel Edit
        </button>
      )}

      <br /><br />

      <h3>Existing Reviews</h3>

      {reviews.length === 0 ? (
        <p>No reviews added yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {review.reviewerName} - {review.rating}/5
                {review.featured ? " • Featured" : ""}
              </div>

              <div style={{ marginTop: "6px" }}>
                {review.reviewText}
              </div>

              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleEditReview(review)}>
                  Edit Review
                </button>

                <button
                  onClick={() => handleDeleteReview(review.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}