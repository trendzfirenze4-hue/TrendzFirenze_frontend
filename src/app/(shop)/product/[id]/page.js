


"use client";

import { useEffect } from "react";
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
          background: "#f8f8f8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          color: "#444",
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

  return (
    <div
      style={{
        background: "#f6f7fb",
        minHeight: "100vh",
        padding: "32px 20px 60px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "18px",
          }}
        >
          Home / Products /{" "}
          <span style={{ color: "#111827", fontWeight: 600 }}>
            {product.title}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* LEFT SIDE IMAGES */}
          <div
            style={{
              flex: "1 1 520px",
              background: "#fff",
              borderRadius: "18px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              border: "1px solid #ececec",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "18px",
              }}
            >
              {product.images?.map((img, i) => {
                const imageUrl =
                  typeof img === "string" ? img : img?.imageUrl;

                return (
                  <div
                    key={i}
                    style={{
                      background: "#fafafa",
                      border: "1px solid #e5e7eb",
                      borderRadius: "14px",
                      overflow: "hidden",
                      padding: "10px",
                      transition: "0.3s ease",
                    }}
                  >
                    <img
                      src={
                        imageUrl?.startsWith("http")
                          ? imageUrl
                          : `${process.env.NEXT_PUBLIC_API_BASE}${imageUrl}`
                      }
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "320px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        display: "block",
                        background: "#fff",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE PRODUCT INFO */}
          <div
            style={{
              flex: "1 1 420px",
              background: "#fff",
              borderRadius: "18px",
              padding: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              border: "1px solid #ececec",
              position: "sticky",
              top: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "#111827",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.4px",
                marginBottom: "16px",
              }}
            >
              PREMIUM COLLECTION
            </div>

            <h1
              style={{
                fontSize: "34px",
                lineHeight: "1.25",
                margin: "0 0 14px",
                color: "#111827",
                fontWeight: "800",
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
                  fontWeight: "700",
                  fontSize: "20px",
                  letterSpacing: "1px",
                }}
              >
                {"★".repeat(roundedAverage)}
                {"☆".repeat(5 - roundedAverage)}
              </div>

              <div
                style={{
                  color: "#374151",
                  fontSize: "15px",
                  fontWeight: "600",
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
                marginBottom: "22px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  color: "#B12704",
                  fontSize: "34px",
                  fontWeight: "800",
                  margin: 0,
                }}
              >
                ₹ {product.priceInr}
              </h2>

              <span
                style={{
                  background: "#ecfdf5",
                  color: "#047857",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                In Stock
              </span>
            </div>

            <div
              style={{
                borderTop: "1px solid #f0f0f0",
                borderBottom: "1px solid #f0f0f0",
                padding: "18px 0",
                marginBottom: "22px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#4b5563",
                  fontSize: "16px",
                  lineHeight: "1.8",
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
                marginBottom: "26px",
              }}
            >
              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginBottom: "6px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Stock
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "#111827",
                    fontWeight: "700",
                  }}
                >
                  {product.stock}
                </div>
              </div>

              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "14px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginBottom: "6px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Category
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: "#111827",
                    fontWeight: "700",
                  }}
                >
                  {product.category || "N/A"}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                width: "100%",
                padding: "16px 24px",
                background:
                  "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "14px",
                cursor: "pointer",
                fontWeight: "800",
                fontSize: "16px",
                boxShadow: "0 12px 24px rgba(17,24,39,0.18)",
                transition: "0.3s ease",
              }}
            >
              Add To Cart
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
                  background: "#f9fafb",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  color: "#374151",
                  fontSize: "14px",
                  border: "1px solid #eceff3",
                }}
              >
                Secure checkout and trusted shopping experience
              </div>
              <div
                style={{
                  background: "#f9fafb",
                  borderRadius: "12px",
                  padding: "12px 14px",
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

        {/* REVIEWS SECTION */}
        <div
          style={{
            marginTop: "42px",
            background: "#fff",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            border: "1px solid #ececec",
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
                fontSize: "28px",
                color: "#111827",
                fontWeight: "800",
              }}
            >
              Customer Reviews
            </h2>

            {reviewCount > 0 && (
              <div
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    color: "#f59e0b",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  {"★".repeat(roundedAverage)}
                  {"☆".repeat(5 - roundedAverage)}
                </span>
                <span
                  style={{
                    color: "#374151",
                    fontSize: "14px",
                    fontWeight: "600",
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
                padding: "32px 20px",
                background: "#f9fafb",
                borderRadius: "14px",
                border: "1px dashed #d1d5db",
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              No reviews yet.
            </div>
          ) : (
            <div style={{ display: "grid", gap: "18px" }}>
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "14px",
                    padding: "20px",
                    background: "#fcfcfd",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: "800",
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
                        padding: "6px 10px",
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
                      lineHeight: "1.8",
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


