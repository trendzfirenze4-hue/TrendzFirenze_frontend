// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import api from "@/lib/apiClient";

// import { fetchAdminCategories } from "@/features/categories/categorySlice";

// import {
//   updateProduct,
//   addProductReview,
//   updateProductReview,
//   deleteProductReview,
// } from "@/features/adminProducts/adminProductThunks";
// import { uploadProductImages } from "@/features/products/uploadSlice";

// export default function EditProductPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const params = useParams();

//   const id = params?.id;
//   const productId = Number(id);

//   const [loading, setLoading] = useState(false);

//   // FIXED: use adminCategories and keep safe fallback
//   const categories = useSelector(
//     (state) => state.categories?.adminCategories || []
//   );

//   const [product, setProduct] = useState(null);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [categoryId, setCategoryId] = useState("");

//   const [files, setFiles] = useState([]);
//   const [images, setImages] = useState([]);

//   const [reviews, setReviews] = useState([]);

//   const [reviewerName, setReviewerName] = useState("");
//   const [rating, setRating] = useState("5");
//   const [reviewText, setReviewText] = useState("");
//   const [featured, setFeatured] = useState(false);

//   const [editingReviewId, setEditingReviewId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchAdminCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!id) return;

//     api.get(`/api/admin/products/${id}`).then((res) => {
//       const p = res.data;

//       setProduct(p);

//       setTitle(p.title || "");
//       setDescription(p.description || "");
//       setPrice(p.priceInr || "");
//       setStock(p.stock || "");
//       setCategoryId(p.category?.id || "");

//       setImages(p.images || []);
//       setReviews(p.reviews || []);
//     });
//   }, [id]);

//   const removeImage = (index) => {
//     const arr = [...images];
//     arr.splice(index, 1);
//     setImages(arr);
//   };

//   const handleUpload = async () => {
//     if (files.length === 0) return;

//     try {
//       const res = await dispatch(uploadProductImages(files)).unwrap();
//       setImages((prev) => [...prev, ...res]);
//       setFiles([]);
//     } catch (err) {
//       alert("Upload failed");
//     }
//   };

//   const handleUpdate = async () => {
//     if (loading) return;

//     setLoading(true);

//     try {
//       const data = {
//         title,
//         description,
//         priceInr: Number(price),
//         stock: Number(stock),
//         categoryId: Number(categoryId) || 1,
//         images: images.map((img) =>
//           typeof img === "string" ? img : img.imageUrl
//         ),
//       };

//       await dispatch(updateProduct({ id: productId, data })).unwrap();

//       alert("Product updated");
//       router.push("/admin/products");
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }

//     setLoading(false);
//   };

//   const resetReviewForm = () => {
//     setReviewerName("");
//     setRating("5");
//     setReviewText("");
//     setFeatured(false);
//     setEditingReviewId(null);
//   };

//   const handleSaveReview = async () => {
//     if (!reviewerName.trim() || !reviewText.trim()) {
//       alert("Reviewer name and review text are required");
//       return;
//     }

//     const data = {
//       reviewerName,
//       rating: Number(rating),
//       reviewText,
//       featured,
//     };

//     try {
//       if (editingReviewId) {
//         const result = await dispatch(
//           updateProductReview({
//             productId,
//             reviewId: editingReviewId,
//             data,
//           })
//         ).unwrap();

//         setReviews((prev) =>
//           prev.map((r) => (r.id === result.review.id ? result.review : r))
//         );
//         alert("Review updated");
//       } else {
//         const result = await dispatch(
//           addProductReview({
//             productId,
//             data,
//           })
//         ).unwrap();

//         setReviews((prev) => [result.review, ...prev]);
//         alert("Review added");
//       }

//       resetReviewForm();
//     } catch (err) {
//       console.error(err);
//       alert("Review save failed");
//     }
//   };

//   const handleEditReview = (review) => {
//     setEditingReviewId(review.id);
//     setReviewerName(review.reviewerName || "");
//     setRating(String(review.rating || 5));
//     setReviewText(review.reviewText || "");
//     setFeatured(!!review.featured);
//   };

//   const handleDeleteReview = async (reviewId) => {
//     const ok = window.confirm("Delete this review?");
//     if (!ok) return;

//     try {
//       await dispatch(deleteProductReview({ productId, reviewId })).unwrap();
//       setReviews((prev) => prev.filter((r) => r.id !== reviewId));
//       if (editingReviewId === reviewId) resetReviewForm();
//       alert("Review deleted");
//     } catch (err) {
//       console.error(err);
//       alert("Review delete failed");
//     }
//   };

//   if (!product) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#f8f8f8",
//           padding: "40px 16px",
//           color: "#111827",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: "960px",
//             margin: "0 auto",
//             background: "#ffffff",
//             border: "1px solid #e5e7eb",
//             borderRadius: "16px",
//             padding: "24px",
//             boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
//           }}
//         >
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#f8f8f8",
//         padding: "40px 16px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "960px",
//           margin: "0 auto",
//           background: "#ffffff",
//           border: "1px solid #e5e7eb",
//           borderRadius: "16px",
//           padding: "28px",
//           boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
//         }}
//       >
//         <h1
//           style={{
//             margin: "0 0 24px 0",
//             fontSize: "28px",
//             fontWeight: "700",
//             color: "#111827",
//           }}
//         >
//           Edit Product
//         </h1>

//         <div style={{ display: "grid", gap: "18px" }}>
//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 color: "#111827",
//               }}
//             >
//               Title
//             </label>
//             <input
//               placeholder="Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px 14px",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "10px",
//                 fontSize: "15px",
//                 color: "#111827",
//                 background: "#ffffff",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             />
//           </div>

//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 color: "#111827",
//               }}
//             >
//               Description
//             </label>
//             <textarea
//               placeholder="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={5}
//               style={{
//                 width: "100%",
//                 padding: "12px 14px",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "10px",
//                 fontSize: "15px",
//                 color: "#111827",
//                 background: "#ffffff",
//                 outline: "none",
//                 resize: "vertical",
//                 boxSizing: "border-box",
//               }}
//             />
//           </div>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//               gap: "18px",
//             }}
//           >
//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: "8px",
//                   fontSize: "14px",
//                   fontWeight: "600",
//                   color: "#111827",
//                 }}
//               >
//                 Price
//               </label>
//               <input
//                 placeholder="Price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "12px 14px",
//                   border: "1px solid #d1d5db",
//                   borderRadius: "10px",
//                   fontSize: "15px",
//                   color: "#111827",
//                   background: "#ffffff",
//                   outline: "none",
//                   boxSizing: "border-box",
//                 }}
//               />
//             </div>

//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: "8px",
//                   fontSize: "14px",
//                   fontWeight: "600",
//                   color: "#111827",
//                 }}
//               >
//                 Stock
//               </label>
//               <input
//                 placeholder="Stock"
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "12px 14px",
//                   border: "1px solid #d1d5db",
//                   borderRadius: "10px",
//                   fontSize: "15px",
//                   color: "#111827",
//                   background: "#ffffff",
//                   outline: "none",
//                   boxSizing: "border-box",
//                 }}
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 color: "#111827",
//               }}
//             >
//               Category
//             </label>
//             <select
//               value={categoryId}
//               onChange={(e) => setCategoryId(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px 14px",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "10px",
//                 fontSize: "15px",
//                 color: "#111827",
//                 background: "#ffffff",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 color: "#111827",
//               }}
//             >
//               Upload More Images
//             </label>
//             <input
//               type="file"
//               multiple
//               onChange={(e) => setFiles([...e.target.files])}
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "10px",
//                 fontSize: "14px",
//                 color: "#111827",
//                 background: "#ffffff",
//                 boxSizing: "border-box",
//               }}
//             />
//           </div>

//           <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
//             <button
//               onClick={handleUpload}
//               style={{
//                 padding: "12px 18px",
//                 background: "#111827",
//                 color: "#ffffff",
//                 border: "none",
//                 borderRadius: "10px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 cursor: "pointer",
//               }}
//             >
//               Upload Images
//             </button>

//             <button
//               onClick={handleUpdate}
//               disabled={loading}
//               style={{
//                 padding: "12px 18px",
//                 background: loading ? "#9ca3af" : "#2563eb",
//                 color: "#ffffff",
//                 border: "none",
//                 borderRadius: "10px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 cursor: loading ? "not-allowed" : "pointer",
//               }}
//             >
//               {loading ? "Updating..." : "Update Product"}
//             </button>
//           </div>
//         </div>

//         <div style={{ marginTop: "28px" }}>
//           <h3
//             style={{
//               fontSize: "18px",
//               fontWeight: "700",
//               color: "#111827",
//               marginBottom: "14px",
//             }}
//           >
//             Images
//           </h3>

//           <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
//             {images.map((img, i) => {
//               const url = typeof img === "string" ? img : img.imageUrl;

//               return (
//                 <div
//                   key={i}
//                   style={{
//                     position: "relative",
//                     border: "1px solid #e5e7eb",
//                     padding: "8px",
//                     borderRadius: "12px",
//                     background: "#ffffff",
//                     boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
//                   }}
//                 >
//                   <img
//                     src={
//                       url?.startsWith("http")
//                         ? url
//                         : `${process.env.NEXT_PUBLIC_API_BASE}${url}`
//                     }
//                     width="120"
//                     alt="Product"
//                     style={{
//                       display: "block",
//                       width: "120px",
//                       height: "120px",
//                       objectFit: "cover",
//                       borderRadius: "8px",
//                     }}
//                   />

//                   <button
//                     onClick={() => removeImage(i)}
//                     style={{
//                       position: "absolute",
//                       top: "-8px",
//                       right: "-8px",
//                       background: "#dc2626",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "50%",
//                       width: "24px",
//                       height: "24px",
//                       cursor: "pointer",
//                       fontSize: "16px",
//                       fontWeight: "700",
//                     }}
//                   >
//                     ×
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <hr style={{ margin: "40px 0", borderColor: "#e5e7eb" }} />

//         <h2
//           style={{
//             fontSize: "24px",
//             fontWeight: "700",
//             color: "#111827",
//             marginBottom: "20px",
//           }}
//         >
//           Manage Reviews
//         </h2>

//         <div style={{ display: "grid", gap: "18px" }}>
//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 color: "#111827",
//               }}
//             >
//               Reviewer Name
//             </label>
//             <input
//               placeholder="Reviewer name"
//               value={reviewerName}
//               onChange={(e) => setReviewerName(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px 14px",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "10px",
//                 fontSize: "15px",
//                 color: "#111827",
//                 background: "#ffffff",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             />
//           </div>

//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 color: "#111827",
//               }}
//             >
//               Rating
//             </label>
//             <select
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px 14px",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "10px",
//                 fontSize: "15px",
//                 color: "#111827",
//                 background: "#ffffff",
//                 outline: "none",
//                 boxSizing: "border-box",
//               }}
//             >
//               <option value="5">5 Star</option>
//               <option value="4">4 Star</option>
//               <option value="3">3 Star</option>
//               <option value="2">2 Star</option>
//               <option value="1">1 Star</option>
//             </select>
//           </div>

//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "8px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 color: "#111827",
//               }}
//             >
//               Review Text
//             </label>
//             <textarea
//               placeholder="Review text"
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               rows={4}
//               style={{
//                 width: "100%",
//                 padding: "12px 14px",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "10px",
//                 fontSize: "15px",
//                 color: "#111827",
//                 background: "#ffffff",
//                 outline: "none",
//                 resize: "vertical",
//                 boxSizing: "border-box",
//               }}
//             />
//           </div>

//           <label
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               fontSize: "14px",
//               fontWeight: "500",
//               color: "#111827",
//             }}
//           >
//             <input
//               type="checkbox"
//               checked={featured}
//               onChange={(e) => setFeatured(e.target.checked)}
//             />
//             Featured review
//           </label>

//           <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
//             <button
//               onClick={handleSaveReview}
//               style={{
//                 padding: "12px 18px",
//                 background: "#111827",
//                 color: "#ffffff",
//                 border: "none",
//                 borderRadius: "10px",
//                 fontSize: "14px",
//                 fontWeight: "600",
//                 cursor: "pointer",
//               }}
//             >
//               {editingReviewId ? "Update Review" : "Add Review"}
//             </button>

//             {editingReviewId && (
//               <button
//                 onClick={resetReviewForm}
//                 style={{
//                   padding: "12px 18px",
//                   background: "#e5e7eb",
//                   color: "#111827",
//                   border: "none",
//                   borderRadius: "10px",
//                   fontSize: "14px",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                 }}
//               >
//                 Cancel Edit
//               </button>
//             )}
//           </div>
//         </div>

//         <div style={{ marginTop: "28px" }}>
//           <h3
//             style={{
//               fontSize: "18px",
//               fontWeight: "700",
//               color: "#111827",
//               marginBottom: "14px",
//             }}
//           >
//             Existing Reviews
//           </h3>

//           {reviews.length === 0 ? (
//             <p style={{ color: "#4b5563", margin: 0 }}>No reviews added yet.</p>
//           ) : (
//             <div style={{ display: "grid", gap: "12px" }}>
//               {reviews.map((review) => (
//                 <div
//                   key={review.id}
//                   style={{
//                     border: "1px solid #e5e7eb",
//                     borderRadius: "12px",
//                     padding: "14px",
//                     background: "#ffffff",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontWeight: "700",
//                       color: "#111827",
//                       fontSize: "15px",
//                     }}
//                   >
//                     {review.reviewerName} - {review.rating}/5
//                     {review.featured ? " • Featured" : ""}
//                   </div>

//                   <div
//                     style={{
//                       marginTop: "8px",
//                       color: "#374151",
//                       fontSize: "14px",
//                       lineHeight: "1.6",
//                     }}
//                   >
//                     {review.reviewText}
//                   </div>

//                   <div
//                     style={{
//                       marginTop: "12px",
//                       display: "flex",
//                       gap: "10px",
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     <button
//                       onClick={() => handleEditReview(review)}
//                       style={{
//                         padding: "10px 14px",
//                         background: "#111827",
//                         color: "#ffffff",
//                         border: "none",
//                         borderRadius: "8px",
//                         cursor: "pointer",
//                         fontWeight: "600",
//                       }}
//                     >
//                       Edit Review
//                     </button>

//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       style={{
//                         padding: "10px 14px",
//                         background: "#dc2626",
//                         color: "#ffffff",
//                         border: "none",
//                         borderRadius: "8px",
//                         cursor: "pointer",
//                         fontWeight: "600",
//                       }}
//                     >
//                       Delete Review
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }












"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import api from "@/lib/apiClient";

import { fetchAdminCategories } from "@/features/categories/categorySlice";

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

  const categories = useSelector(
    (state) => state.categories?.adminCategories || []
  );

  const [product, setProduct] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
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
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!id) return;

    api
      .get(`/api/admin/products/${id}`)
      .then((res) => {
        const p = res.data;

        setProduct(p);

        setTitle(p.title || "");
        setDescription(p.description || "");
        setPrice(
          p.priceInr === null || p.priceInr === undefined ? "" : String(p.priceInr)
        );
        setMrp(
          p.mrpInr === null || p.mrpInr === undefined ? "" : String(p.mrpInr)
        );
        setStock(
          p.stock === null || p.stock === undefined ? "" : String(p.stock)
        );

        const resolvedCategoryId =
          typeof p.category === "object" && p.category !== null
            ? p.category.id
            : p.categoryId;

        setCategoryId(
          resolvedCategoryId === null || resolvedCategoryId === undefined
            ? ""
            : String(resolvedCategoryId)
        );

        setImages(p.images || []);
        setReviews(p.reviews || []);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load product");
      });
  }, [id]);

  const discountPercent = useMemo(() => {
    const sellingPrice = Number(price);
    const originalPrice = Number(mrp);

    if (
      !Number.isFinite(sellingPrice) ||
      !Number.isFinite(originalPrice) ||
      sellingPrice <= 0 ||
      originalPrice <= 0 ||
      sellingPrice >= originalPrice
    ) {
      return 0;
    }

    return Math.round(((originalPrice - sellingPrice) * 100) / originalPrice);
  }, [price, mrp]);

  const removeImage = (index) => {
    const arr = [...images];
    arr.splice(index, 1);
    setImages(arr);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select image files first");
      return;
    }

    try {
      const res = await dispatch(uploadProductImages(files)).unwrap();
      setImages((prev) => [...prev, ...res]);
      setFiles([]);
      alert("Images uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleUpdate = async () => {
    if (loading) return;

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!price || Number(price) <= 0) {
      alert("Please enter a valid selling price");
      return;
    }

    if (mrp && Number(mrp) <= 0) {
      alert("Please enter a valid MRP");
      return;
    }

    if (mrp && Number(mrp) < Number(price)) {
      alert("MRP must be greater than or equal to selling price");
      return;
    }

    if (!stock && stock !== 0) {
      alert("Stock is required");
      return;
    }

    if (Number(stock) < 0) {
      alert("Stock cannot be negative");
      return;
    }

    if (!categoryId) {
      alert("Please select category");
      return;
    }

    setLoading(true);

    try {
      const data = {
        title: title.trim(),
        description: description.trim(),
        priceInr: Number(price),
        mrpInr: mrp ? Number(mrp) : null,
        stock: Number(stock),
        categoryId: Number(categoryId),
        images: images.map((img) =>
          typeof img === "string" ? img : img.imageUrl
        ),
      };

      await dispatch(updateProduct({ id: productId, data })).unwrap();

      alert("Product updated");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert(typeof err === "string" ? err : err?.message || "Update failed");
    } finally {
      setLoading(false);
    }
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

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#111827",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#111827",
    background: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
  };

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8f8f8",
          padding: "40px 16px",
          color: "#111827",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f8f8",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
        }}
      >
        <h1
          style={{
            margin: "0 0 24px 0",
            fontSize: "28px",
            fontWeight: "700",
            color: "#111827",
          }}
        >
          Edit Product
        </h1>

        <div style={{ display: "grid", gap: "18px" }}>
          <div>
            <label style={labelStyle}>Title</label>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}
          >
            <div>
              <label style={labelStyle}>Selling Price (₹)</label>
              <input
                type="number"
                min="0"
                placeholder="Selling price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>MRP / Original Price (₹)</label>
              <input
                type="number"
                min="0"
                placeholder="MRP"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Stock</label>
              <input
                type="number"
                min="0"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              background: "#f9fafb",
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#6b7280",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Price Preview
            </div>

            {price ? (
              <div>
                {discountPercent > 0 ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          color: "#cc0c39",
                          fontSize: "20px",
                          fontWeight: "700",
                        }}
                      >
                        -{discountPercent}%
                      </span>

                      <span
                        style={{
                          color: "#111827",
                          fontSize: "28px",
                          fontWeight: "800",
                        }}
                      >
                        ₹{Number(price).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "14px",
                        color: "#6b7280",
                      }}
                    >
                      M.R.P.:{" "}
                      <span style={{ textDecoration: "line-through" }}>
                        ₹{Number(mrp).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      color: "#111827",
                      fontSize: "28px",
                      fontWeight: "800",
                    }}
                  >
                    ₹{Number(price).toLocaleString("en-IN")}
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                Enter selling price and MRP to preview discount.
              </div>
            )}
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Upload More Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                fontSize: "14px",
                color: "#111827",
                background: "#ffffff",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={handleUpload}
              style={{
                padding: "12px 18px",
                background: "#111827",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Upload Images
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              style={{
                padding: "12px 18px",
                background: loading ? "#9ca3af" : "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </div>

        <div style={{ marginTop: "28px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "14px",
            }}
          >
            Images
          </h3>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {images.map((img, i) => {
              const url = typeof img === "string" ? img : img.imageUrl;

              return (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    border: "1px solid #e5e7eb",
                    padding: "8px",
                    borderRadius: "12px",
                    background: "#ffffff",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                  }}
                >
                  <img
                    src={
                      url?.startsWith("http")
                        ? url
                        : `${process.env.NEXT_PUBLIC_API_BASE}${url}`
                    }
                    width="120"
                    alt="Product"
                    style={{
                      display: "block",
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <button
                    onClick={() => removeImage(i)}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <hr style={{ margin: "40px 0", borderColor: "#e5e7eb" }} />

        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "20px",
          }}
        >
          Manage Reviews
        </h2>

        <div style={{ display: "grid", gap: "18px" }}>
          <div>
            <label style={labelStyle}>Reviewer Name</label>
            <input
              placeholder="Reviewer name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={inputStyle}
            >
              <option value="5">5 Star</option>
              <option value="4">4 Star</option>
              <option value="3">3 Star</option>
              <option value="2">2 Star</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Review Text</label>
            <textarea
              placeholder="Review text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#111827",
            }}
          >
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured review
          </label>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={handleSaveReview}
              style={{
                padding: "12px 18px",
                background: "#111827",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {editingReviewId ? "Update Review" : "Add Review"}
            </button>

            {editingReviewId && (
              <button
                onClick={resetReviewForm}
                style={{
                  padding: "12px 18px",
                  background: "#e5e7eb",
                  color: "#111827",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        <div style={{ marginTop: "28px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "14px",
            }}
          >
            Existing Reviews
          </h3>

          {reviews.length === 0 ? (
            <p style={{ color: "#4b5563", margin: 0 }}>No reviews added yet.</p>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "14px",
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "700",
                      color: "#111827",
                      fontSize: "15px",
                    }}
                  >
                    {review.reviewerName} - {review.rating}/5
                    {review.featured ? " • Featured" : ""}
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      color: "#374151",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    {review.reviewText}
                  </div>

                  <div
                    style={{
                      marginTop: "12px",
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => handleEditReview(review)}
                      style={{
                        padding: "10px 14px",
                        background: "#111827",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Edit Review
                    </button>

                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      style={{
                        padding: "10px 14px",
                        background: "#dc2626",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}