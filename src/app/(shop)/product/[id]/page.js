


// "use client";

// import { useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";

// import { fetchProduct } from "@/features/products/productSlice";
// import { addToCart } from "@/features/cart/cartSlice";

// export default function ProductPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const params = useParams();

//   const id = params?.id;
//   const product = useSelector((state) => state.products.product);

//   useEffect(() => {
//     if (!id) return;
//     dispatch(fetchProduct(id));
//   }, [id, dispatch]);

//   const handleAddToCart = async () => {
//     if (!product) return;

//     try {
//       await dispatch(addToCart({ product, quantity: 1 })).unwrap();
//       router.push("/cart");
//     } catch (err) {
//       console.error("Add to cart failed:", err);
//       alert("Failed to add product to cart");
//     }
//   };

//   if (!product) {
//     return (
//       <div
//         style={{
//           minHeight: "100vh",
//           background: "#f8f8f8",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           fontSize: "18px",
//           color: "#444",
//         }}
//       >
//         Loading product...
//       </div>
//     );
//   }

//   const reviewCount = product.reviews?.length || 0;
//   const averageRating =
//     reviewCount > 0
//       ? (
//           product.reviews.reduce((sum, review) => sum + review.rating, 0) /
//           reviewCount
//         ).toFixed(1)
//       : 0;

//   const roundedAverage =
//     reviewCount > 0 ? Math.round(Number(averageRating)) : 0;

//   return (
//     <div
//       style={{
//         background: "#f6f7fb",
//         minHeight: "100vh",
//         padding: "32px 20px 60px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "1280px",
//           margin: "0 auto",
//         }}
//       >
//         <div
//           style={{
//             fontSize: "14px",
//             color: "#6b7280",
//             marginBottom: "18px",
//           }}
//         >
//           Home / Products /{" "}
//           <span style={{ color: "#111827", fontWeight: 600 }}>
//             {product.title}
//           </span>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             gap: "32px",
//             alignItems: "flex-start",
//             flexWrap: "wrap",
//           }}
//         >
//           {/* LEFT SIDE IMAGES */}
//           <div
//             style={{
//               flex: "1 1 520px",
//               background: "#fff",
//               borderRadius: "18px",
//               padding: "24px",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
//               border: "1px solid #ececec",
//             }}
//           >
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//                 gap: "18px",
//               }}
//             >
//               {product.images?.map((img, i) => {
//                 const imageUrl =
//                   typeof img === "string" ? img : img?.imageUrl;

//                 return (
//                   <div
//                     key={i}
//                     style={{
//                       background: "#fafafa",
//                       border: "1px solid #e5e7eb",
//                       borderRadius: "14px",
//                       overflow: "hidden",
//                       padding: "10px",
//                       transition: "0.3s ease",
//                     }}
//                   >
//                     <img
//                       src={
//                         imageUrl?.startsWith("http")
//                           ? imageUrl
//                           : `${process.env.NEXT_PUBLIC_API_BASE}${imageUrl}`
//                       }
//                       alt={product.title}
//                       style={{
//                         width: "100%",
//                         height: "320px",
//                         objectFit: "cover",
//                         borderRadius: "10px",
//                         display: "block",
//                         background: "#fff",
//                       }}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* RIGHT SIDE PRODUCT INFO */}
//           <div
//             style={{
//               flex: "1 1 420px",
//               background: "#fff",
//               borderRadius: "18px",
//               padding: "30px",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
//               border: "1px solid #ececec",
//               position: "sticky",
//               top: "20px",
//             }}
//           >
//             <div
//               style={{
//                 display: "inline-block",
//                 background: "#111827",
//                 color: "#fff",
//                 padding: "6px 12px",
//                 borderRadius: "999px",
//                 fontSize: "12px",
//                 fontWeight: "700",
//                 letterSpacing: "0.4px",
//                 marginBottom: "16px",
//               }}
//             >
//               PREMIUM COLLECTION
//             </div>

//             <h1
//               style={{
//                 fontSize: "34px",
//                 lineHeight: "1.25",
//                 margin: "0 0 14px",
//                 color: "#111827",
//                 fontWeight: "800",
//               }}
//             >
//               {product.title}
//             </h1>

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "12px",
//                 flexWrap: "wrap",
//                 marginBottom: "20px",
//               }}
//             >
//               <div
//                 style={{
//                   color: "#f59e0b",
//                   fontWeight: "700",
//                   fontSize: "20px",
//                   letterSpacing: "1px",
//                 }}
//               >
//                 {"★".repeat(roundedAverage)}
//                 {"☆".repeat(5 - roundedAverage)}
//               </div>

//               <div
//                 style={{
//                   color: "#374151",
//                   fontSize: "15px",
//                   fontWeight: "600",
//                 }}
//               >
//                 {reviewCount > 0
//                   ? `${averageRating} rating • ${reviewCount} review${
//                       reviewCount > 1 ? "s" : ""
//                     }`
//                   : "No ratings yet"}
//               </div>
//             </div>

//             <div
//               style={{
//                 marginBottom: "22px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "14px",
//                 flexWrap: "wrap",
//               }}
//             >
//               <h2
//                 style={{
//                   color: "#B12704",
//                   fontSize: "34px",
//                   fontWeight: "800",
//                   margin: 0,
//                 }}
//               >
//                 ₹ {product.priceInr}
//               </h2>

//               <span
//                 style={{
//                   background: "#ecfdf5",
//                   color: "#047857",
//                   padding: "6px 12px",
//                   borderRadius: "999px",
//                   fontSize: "13px",
//                   fontWeight: "700",
//                 }}
//               >
//                 In Stock
//               </span>
//             </div>

//             <div
//               style={{
//                 borderTop: "1px solid #f0f0f0",
//                 borderBottom: "1px solid #f0f0f0",
//                 padding: "18px 0",
//                 marginBottom: "22px",
//               }}
//             >
//               <p
//                 style={{
//                   margin: 0,
//                   color: "#4b5563",
//                   fontSize: "16px",
//                   lineHeight: "1.8",
//                 }}
//               >
//                 {product.description}
//               </p>
//             </div>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(2, minmax(140px, 1fr))",
//                 gap: "14px",
//                 marginBottom: "26px",
//               }}
//             >
//               <div
//                 style={{
//                   background: "#f9fafb",
//                   border: "1px solid #e5e7eb",
//                   borderRadius: "12px",
//                   padding: "14px",
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: "12px",
//                     color: "#6b7280",
//                     marginBottom: "6px",
//                     fontWeight: "700",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.5px",
//                   }}
//                 >
//                   Stock
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "18px",
//                     color: "#111827",
//                     fontWeight: "700",
//                   }}
//                 >
//                   {product.stock}
//                 </div>
//               </div>

//               <div
//                 style={{
//                   background: "#f9fafb",
//                   border: "1px solid #e5e7eb",
//                   borderRadius: "12px",
//                   padding: "14px",
//                 }}
//               >
//                 <div
//                   style={{
//                     fontSize: "12px",
//                     color: "#6b7280",
//                     marginBottom: "6px",
//                     fontWeight: "700",
//                     textTransform: "uppercase",
//                     letterSpacing: "0.5px",
//                   }}
//                 >
//                   Category
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "18px",
//                     color: "#111827",
//                     fontWeight: "700",
//                   }}
//                 >
//                   {product.category || "N/A"}
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={handleAddToCart}
//               style={{
//                 width: "100%",
//                 padding: "16px 24px",
//                 background:
//                   "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "14px",
//                 cursor: "pointer",
//                 fontWeight: "800",
//                 fontSize: "16px",
//                 boxShadow: "0 12px 24px rgba(17,24,39,0.18)",
//                 transition: "0.3s ease",
//               }}
//             >
//               Add To Cart
//             </button>

//             <div
//               style={{
//                 marginTop: "18px",
//                 display: "grid",
//                 gap: "10px",
//               }}
//             >
//               <div
//                 style={{
//                   background: "#f9fafb",
//                   borderRadius: "12px",
//                   padding: "12px 14px",
//                   color: "#374151",
//                   fontSize: "14px",
//                   border: "1px solid #eceff3",
//                 }}
//               >
//                 Secure checkout and trusted shopping experience
//               </div>
//               <div
//                 style={{
//                   background: "#f9fafb",
//                   borderRadius: "12px",
//                   padding: "12px 14px",
//                   color: "#374151",
//                   fontSize: "14px",
//                   border: "1px solid #eceff3",
//                 }}
//               >
//                 Premium quality product with customer satisfaction focus
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* REVIEWS SECTION */}
//         <div
//           style={{
//             marginTop: "42px",
//             background: "#fff",
//             borderRadius: "18px",
//             padding: "30px",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
//             border: "1px solid #ececec",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: "12px",
//               marginBottom: "24px",
//             }}
//           >
//             <h2
//               style={{
//                 margin: 0,
//                 fontSize: "28px",
//                 color: "#111827",
//                 fontWeight: "800",
//               }}
//             >
//               Customer Reviews
//             </h2>

//             {reviewCount > 0 && (
//               <div
//                 style={{
//                   background: "#f9fafb",
//                   border: "1px solid #e5e7eb",
//                   borderRadius: "12px",
//                   padding: "10px 14px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                 }}
//               >
//                 <span
//                   style={{
//                     color: "#f59e0b",
//                     fontSize: "18px",
//                     fontWeight: "700",
//                   }}
//                 >
//                   {"★".repeat(roundedAverage)}
//                   {"☆".repeat(5 - roundedAverage)}
//                 </span>
//                 <span
//                   style={{
//                     color: "#374151",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {averageRating} / 5 from {reviewCount} review
//                   {reviewCount > 1 ? "s" : ""}
//                 </span>
//               </div>
//             )}
//           </div>

//           {!product.reviews || product.reviews.length === 0 ? (
//             <div
//               style={{
//                 textAlign: "center",
//                 padding: "32px 20px",
//                 background: "#f9fafb",
//                 borderRadius: "14px",
//                 border: "1px dashed #d1d5db",
//                 color: "#6b7280",
//                 fontSize: "16px",
//               }}
//             >
//               No reviews yet.
//             </div>
//           ) : (
//             <div style={{ display: "grid", gap: "18px" }}>
//               {product.reviews.map((review) => (
//                 <div
//                   key={review.id}
//                   style={{
//                     border: "1px solid #e5e7eb",
//                     borderRadius: "14px",
//                     padding: "20px",
//                     background: "#fcfcfd",
//                     boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginBottom: "10px",
//                       flexWrap: "wrap",
//                       gap: "10px",
//                     }}
//                   >
//                     <div>
//                       <div
//                         style={{
//                           fontWeight: "800",
//                           color: "#111827",
//                           fontSize: "16px",
//                           marginBottom: "4px",
//                         }}
//                       >
//                         {review.reviewerName}
//                       </div>
//                       <div
//                         style={{
//                           color: "#6b7280",
//                           fontSize: "13px",
//                         }}
//                       >
//                         Verified customer review
//                       </div>
//                     </div>

//                     <div
//                       style={{
//                         color: "#f59e0b",
//                         fontWeight: "800",
//                         fontSize: "16px",
//                         letterSpacing: "1px",
//                       }}
//                     >
//                       {"★".repeat(review.rating)}
//                       {"☆".repeat(5 - review.rating)}
//                     </div>
//                   </div>

//                   {review.featured && (
//                     <div
//                       style={{
//                         display: "inline-block",
//                         marginBottom: "12px",
//                         padding: "6px 10px",
//                         borderRadius: "999px",
//                         background: "#eef2ff",
//                         color: "#4338ca",
//                         fontSize: "12px",
//                         fontWeight: "800",
//                       }}
//                     >
//                       Featured Review
//                     </div>
//                   )}

//                   <p
//                     style={{
//                       margin: 0,
//                       lineHeight: "1.8",
//                       color: "#374151",
//                       fontSize: "15px",
//                     }}
//                   >
//                     {review.reviewText}
//                   </p>
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
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { fetchProduct } from "@/features/products/productSlice";
import { addToCart } from "@/features/cart/cartSlice";

export default function ProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  const id = params?.id;
  const product = useSelector((state) => state.products.product);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

  const galleryImages = useMemo(() => {
    if (!product?.images?.length) return [];
    return product.images
      .map((img) => (typeof img === "string" ? img : img?.imageUrl))
      .filter(Boolean)
      .map((imageUrl) =>
        imageUrl?.startsWith("http")
          ? imageUrl
          : `${process.env.NEXT_PUBLIC_API_BASE}${imageUrl}`
      );
  }, [product]);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (galleryImages.length > 0) {
      setSelectedImage(galleryImages[0]);
    }
  }, [galleryImages]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await dispatch(addToCart({ product, quantity: 1 })).unwrap();
      router.push("/cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add product to cart");
    }
  };

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, #ffffff 0%, #f6f7fb 45%, #eef1f6 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          color: "#444",
          letterSpacing: "0.2px",
        }}
      >
        Loading product...
      </div>
    );
  }

  const reviewCount = product.reviews?.length || 0;
  const averageRating =
    reviewCount > 0
      ? (
          product.reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviewCount
        ).toFixed(1)
      : 0;

  const roundedAverage =
    reviewCount > 0 ? Math.round(Number(averageRating)) : 0;

  const stockLabel =
    product.stock > 10
      ? "In Stock"
      : product.stock > 0
      ? `Only ${product.stock} left`
      : "Out of Stock";

  const stockBg =
    product.stock > 0
      ? "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
      : "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)";

  const stockColor = product.stock > 0 ? "#047857" : "#b91c1c";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #f4f6fb 35%, #eef2f7 100%)",
        padding: "28px 18px 70px",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "18px",
            color: "#6b7280",
            fontSize: "13px",
            letterSpacing: "0.2px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span style={{ color: "#111827", fontWeight: 700 }}>
            {product.title}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.25fr) minmax(360px, 0.75fr)",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* LEFT SIDE */}
          <div
            style={{
              display: "grid",
              gap: "24px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.7)",
                borderRadius: "28px",
                padding: "22px",
                boxShadow:
                  "0 20px 60px rgba(15,23,42,0.07), 0 10px 24px rgba(15,23,42,0.04)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: galleryImages.length > 1 ? "96px 1fr" : "1fr",
                  gap: "18px",
                  alignItems: "start",
                }}
              >
                {galleryImages.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      maxHeight: "720px",
                      overflowY: "auto",
                      paddingRight: "4px",
                    }}
                  >
                    {galleryImages.map((img, i) => {
                      const active = selectedImage === img;

                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedImage(img)}
                          style={{
                            border: active
                              ? "1.5px solid #111827"
                              : "1px solid #e5e7eb",
                            background: active
                              ? "linear-gradient(135deg, #f9fafb 0%, #eef2f7 100%)"
                              : "#ffffff",
                            borderRadius: "18px",
                            padding: "8px",
                            cursor: "pointer",
                            boxShadow: active
                              ? "0 10px 20px rgba(17,24,39,0.10)"
                              : "0 4px 10px rgba(15,23,42,0.04)",
                            transform: active ? "translateY(-1px)" : "translateY(0)",
                            transition: "all 0.25s ease",
                          }}
                        >
                          <img
                            src={img}
                            alt={`${product.title} thumbnail ${i + 1}`}
                            style={{
                              width: "100%",
                              height: "86px",
                              objectFit: "cover",
                              borderRadius: "12px",
                              display: "block",
                              background: "#fff",
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                <div
                  style={{
                    display: "grid",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      background:
                        "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                      border: "1px solid #edf1f5",
                      borderRadius: "26px",
                      overflow: "hidden",
                      minHeight: "660px",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "18px",
                        left: "18px",
                        zIndex: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          background: "rgba(17,24,39,0.92)",
                          color: "#fff",
                          padding: "8px 12px",
                          borderRadius: "999px",
                          fontSize: "11px",
                          fontWeight: 800,
                          letterSpacing: "0.7px",
                          textTransform: "uppercase",
                          boxShadow: "0 8px 18px rgba(17,24,39,0.16)",
                        }}
                      >
                        Premium Pick
                      </span>

                      {galleryImages.length > 1 && (
                        <span
                          style={{
                            background: "rgba(255,255,255,0.95)",
                            color: "#111827",
                            padding: "8px 12px",
                            borderRadius: "999px",
                            fontSize: "11px",
                            fontWeight: 800,
                            border: "1px solid rgba(17,24,39,0.08)",
                          }}
                        >
                          {galleryImages.findIndex((img) => img === selectedImage) + 1} /{" "}
                          {galleryImages.length}
                        </span>
                      )}
                    </div>

                    <img
                      src={selectedImage || galleryImages[0] || "/placeholder.png"}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "660px",
                        objectFit: "cover",
                        display: "block",
                        background: "#fff",
                        transition: "transform 0.35s ease",
                      }}
                    />
                  </div>

                  {galleryImages.length > 1 && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                        gap: "14px",
                      }}
                    >
                      {galleryImages.slice(0, 4).map((img, i) => {
                        const active = selectedImage === img;

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedImage(img)}
                            style={{
                              border: active
                                ? "1.5px solid #111827"
                                : "1px solid #e5e7eb",
                              background: "#fff",
                              borderRadius: "18px",
                              padding: "8px",
                              cursor: "pointer",
                              overflow: "hidden",
                              boxShadow: active
                                ? "0 12px 22px rgba(17,24,39,0.10)"
                                : "0 6px 14px rgba(15,23,42,0.04)",
                              transition: "all 0.25s ease",
                            }}
                          >
                            <img
                              src={img}
                              alt={`${product.title} preview ${i + 1}`}
                              style={{
                                width: "100%",
                                height: "116px",
                                objectFit: "cover",
                                borderRadius: "12px",
                                display: "block",
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: "24px",
                padding: "24px",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow:
                  "0 18px 48px rgba(15,23,42,0.06), 0 6px 18px rgba(15,23,42,0.04)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "14px",
                }}
              >
                {[
                  {
                    title: "Secure Checkout",
                    text: "Trusted payment flow with a smooth buying experience.",
                  },
                  {
                    title: "Premium Quality",
                    text: "Designed for style, finish, and everyday durability.",
                  },
                  {
                    title: "Fast Dispatch",
                    text: "Production-ready store experience with quick order handling.",
                  },
                  {
                    title: "Multi-Photo View",
                    text: "Real ecommerce-style gallery to highlight every angle.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      background:
                        "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                      border: "1px solid #edf0f4",
                      borderRadius: "18px",
                      padding: "16px",
                      boxShadow: "0 6px 14px rgba(15,23,42,0.03)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        color: "#111827",
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#4b5563",
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            style={{
              position: "sticky",
              top: "18px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(14px)",
                borderRadius: "28px",
                padding: "28px",
                border: "1px solid rgba(255,255,255,0.72)",
                boxShadow:
                  "0 24px 70px rgba(15,23,42,0.08), 0 8px 22px rgba(15,23,42,0.05)",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #111827 0%, #374151 100%)",
                  color: "#fff",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                  boxShadow: "0 12px 24px rgba(17,24,39,0.16)",
                }}
              >
                Premium Collection
              </div>

              <h1
                style={{
                  fontSize: "36px",
                  lineHeight: "1.18",
                  margin: "0 0 14px",
                  color: "#111827",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
              >
                {product.title}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    color: "#f59e0b",
                    fontWeight: 800,
                    fontSize: "18px",
                    letterSpacing: "1px",
                  }}
                >
                  {"★".repeat(roundedAverage)}
                  {"☆".repeat(5 - roundedAverage)}
                </div>

                <div
                  style={{
                    color: "#374151",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {reviewCount > 0
                    ? `${averageRating} rating • ${reviewCount} review${
                        reviewCount > 1 ? "s" : ""
                      }`
                    : "No ratings yet"}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginBottom: "22px",
                }}
              >
                <h2
                  style={{
                    color: "#9a3412",
                    fontSize: "40px",
                    fontWeight: 900,
                    margin: 0,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  ₹ {product.priceInr}
                </h2>

                <span
                  style={{
                    background: stockBg,
                    color: stockColor,
                    padding: "8px 14px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 800,
                    border: "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  {stockLabel}
                </span>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(249,250,251,0.96) 0%, rgba(255,255,255,0.96) 100%)",
                  border: "1px solid #eceff3",
                  borderRadius: "20px",
                  padding: "18px 18px",
                  marginBottom: "22px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#4b5563",
                    fontSize: "15px",
                    lineHeight: "1.85",
                  }}
                >
                  {product.description}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(140px, 1fr))",
                  gap: "14px",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                    border: "1px solid #e8edf3",
                    borderRadius: "18px",
                    padding: "16px",
                    boxShadow: "0 8px 18px rgba(15,23,42,0.03)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#6b7280",
                      marginBottom: "7px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.7px",
                    }}
                  >
                    Stock
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#111827",
                      fontWeight: 800,
                    }}
                  >
                    {product.stock}
                  </div>
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                    border: "1px solid #e8edf3",
                    borderRadius: "18px",
                    padding: "16px",
                    boxShadow: "0 8px 18px rgba(15,23,42,0.03)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#6b7280",
                      marginBottom: "7px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.7px",
                    }}
                  >
                    Category
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#111827",
                      fontWeight: 800,
                    }}
                  >
                    {product.category || "N/A"}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                  marginBottom: "22px",
                }}
              >
                {[
                  "Free-flow product presentation with a premium shopping feel",
                  "Refined gallery layout for multi-angle product viewing",
                  "Clean sticky buy box for real ecommerce conversion UX",
                ].map((point, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "start",
                      background: "#fafbfc",
                      border: "1px solid #edf0f3",
                      borderRadius: "16px",
                      padding: "12px 14px",
                    }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        minWidth: "20px",
                        borderRadius: "999px",
                        background: "#111827",
                        color: "#fff",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 800,
                        marginTop: "2px",
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        color: "#374151",
                        fontSize: "14px",
                        lineHeight: "1.6",
                        fontWeight: 500,
                      }}
                    >
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                style={{
                  width: "100%",
                  padding: "18px 24px",
                  background:
                    product.stock > 0
                      ? "linear-gradient(135deg, #111827 0%, #1f2937 45%, #374151 100%)"
                      : "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "18px",
                  cursor: product.stock > 0 ? "pointer" : "not-allowed",
                  fontWeight: 900,
                  fontSize: "16px",
                  letterSpacing: "0.3px",
                  boxShadow:
                    product.stock > 0
                      ? "0 18px 30px rgba(17,24,39,0.18)"
                      : "none",
                  transition: "all 0.3s ease",
                }}
              >
                {product.stock > 0 ? "Add To Cart" : "Currently Unavailable"}
              </button>

              <div
                style={{
                  marginTop: "18px",
                  display: "grid",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                    borderRadius: "16px",
                    padding: "13px 14px",
                    color: "#374151",
                    fontSize: "14px",
                    border: "1px solid #eceff3",
                  }}
                >
                  Secure checkout and trusted shopping experience
                </div>
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                    borderRadius: "16px",
                    padding: "13px 14px",
                    color: "#374151",
                    fontSize: "14px",
                    border: "1px solid #eceff3",
                  }}
                >
                  Premium quality product with customer satisfaction focus
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div
          style={{
            marginTop: "36px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            borderRadius: "28px",
            padding: "30px",
            border: "1px solid rgba(255,255,255,0.72)",
            boxShadow:
              "0 22px 60px rgba(15,23,42,0.06), 0 8px 22px rgba(15,23,42,0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "30px",
                color: "#111827",
                fontWeight: "900",
                letterSpacing: "-0.02em",
              }}
            >
              Customer Reviews
            </h2>

            {reviewCount > 0 && (
              <div
                style={{
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 8px 18px rgba(15,23,42,0.03)",
                }}
              >
                <span
                  style={{
                    color: "#f59e0b",
                    fontSize: "18px",
                    fontWeight: "800",
                  }}
                >
                  {"★".repeat(roundedAverage)}
                  {"☆".repeat(5 - roundedAverage)}
                </span>
                <span
                  style={{
                    color: "#374151",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  {averageRating} / 5 from {reviewCount} review
                  {reviewCount > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>

          {!product.reviews || product.reviews.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "36px 20px",
                background:
                  "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
                borderRadius: "18px",
                border: "1px dashed #d1d5db",
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              No reviews yet.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    border: "1px solid #e8edf3",
                    borderRadius: "20px",
                    padding: "22px",
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #fbfcfe 100%)",
                    boxShadow: "0 10px 24px rgba(15,23,42,0.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: "900",
                          color: "#111827",
                          fontSize: "16px",
                          marginBottom: "4px",
                        }}
                      >
                        {review.reviewerName}
                      </div>
                      <div
                        style={{
                          color: "#6b7280",
                          fontSize: "13px",
                        }}
                      >
                        Verified customer review
                      </div>
                    </div>

                    <div
                      style={{
                        color: "#f59e0b",
                        fontWeight: "800",
                        fontSize: "16px",
                        letterSpacing: "1px",
                      }}
                    >
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>

                  {review.featured && (
                    <div
                      style={{
                        display: "inline-block",
                        marginBottom: "12px",
                        padding: "7px 11px",
                        borderRadius: "999px",
                        background: "#eef2ff",
                        color: "#4338ca",
                        fontSize: "12px",
                        fontWeight: "800",
                      }}
                    >
                      Featured Review
                    </div>
                  )}

                  <p
                    style={{
                      margin: 0,
                      lineHeight: "1.85",
                      color: "#374151",
                      fontSize: "15px",
                    }}
                  >
                    {review.reviewText}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}