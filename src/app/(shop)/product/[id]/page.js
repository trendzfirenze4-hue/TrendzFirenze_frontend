


"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { fetchProduct } from "@/features/products/productSlice";
import { addToCart } from "@/features/cart/cartSlice";

function getImageUrl(imageUrl) {
  if (!imageUrl) return "/placeholder.png";
  if (imageUrl.startsWith("http")) return imageUrl;

  const base = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/$/, "");
  const path = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;

  return base ? `${base}${path}` : path;
}

export default function ProductPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  const id = params?.id;
  const product = useSelector((state) => state.products.product);

  const [selectedImage, setSelectedImage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  const zoomStageRef = useRef(null);
  const dragDataRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
    moved: false,
  });

  useEffect(() => {
    if (!id) return;
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

  const galleryImages = useMemo(() => {
    if (!product?.images?.length) return [];

    return product.images
      .map((img) => (typeof img === "string" ? img : img?.imageUrl))
      .filter(Boolean)
      .map(getImageUrl);
  }, [product]);

  useEffect(() => {
    if (!galleryImages.length) {
      setSelectedImage("");
      return;
    }

    setSelectedImage((prev) =>
      galleryImages.includes(prev) ? prev : galleryImages[0]
    );
  }, [galleryImages]);

  const activeImage = selectedImage || galleryImages[0] || "/placeholder.png";

  const activeImageIndex = Math.max(
    0,
    galleryImages.findIndex((img) => img === activeImage)
  );

  const resetZoomScroll = () => {
    const stage = zoomStageRef.current;
    if (!stage) return;

    stage.scrollLeft = 0;
    stage.scrollTop = 0;
  };

  const goToPreviousImage = () => {
    if (galleryImages.length <= 1) return;

    setIsZoomed(false);

    const previousIndex =
      activeImageIndex <= 0 ? galleryImages.length - 1 : activeImageIndex - 1;

    setSelectedImage(galleryImages[previousIndex]);
  };

  const goToNextImage = () => {
    if (galleryImages.length <= 1) return;

    setIsZoomed(false);

    const nextIndex =
      activeImageIndex >= galleryImages.length - 1 ? 0 : activeImageIndex + 1;

    setSelectedImage(galleryImages[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        goToPreviousImage();
      }

      if (event.key === "ArrowRight") {
        goToNextImage();
      }

      if (event.key === "Escape") {
        setIsZoomed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, galleryImages]);

  useEffect(() => {
    if (!isZoomed) {
      resetZoomScroll();
    }
  }, [isZoomed, activeImage]);

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) return;

    try {
      await dispatch(addToCart({ product, quantity: 1 })).unwrap();
      router.push("/cart");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add product to cart");
    }
  };

  // const handleBuyNow = async () => {
  //   if (!product || product.stock <= 0) return;

  //   try {
  //     await dispatch(addToCart({ product, quantity: 1 })).unwrap();
  //     router.push("/checkout");
  //   } catch (err) {
  //     console.error("Buy now failed:", err);
  //     alert("Failed to proceed to checkout");
  //   }
  // };
  const handleBuyNow = async () => {
  if (!product || product.stock <= 0) return;

  try {
    const result = await dispatch(
      addToCart({ product, quantity: 1 })
    ).unwrap();

    // 🔥 CRITICAL FIX
    if (!result.cartId) {
      // guest cart
      router.push("/checkout?guest=true");
    } else {
      // logged-in cart
      router.push("/checkout");
    }

  } catch (err) {
    console.error("Buy now failed:", err);
    alert("Failed to proceed to checkout");
  }
};




  const handleMainThumbClick = (img) => {
    setSelectedImage(img);
    setIsZoomed(false);
  };

  const handleZoomToggle = () => {
    setIsZoomed((prev) => !prev);
  };

  const handleZoomStageMouseDown = (event) => {
    if (!isZoomed || !zoomStageRef.current) return;

    dragDataRef.current = {
      isDragging: true,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: zoomStageRef.current.scrollLeft,
      scrollTop: zoomStageRef.current.scrollTop,
      moved: false,
    };
  };

  const handleZoomStageMouseMove = (event) => {
    if (!isZoomed || !dragDataRef.current.isDragging || !zoomStageRef.current) {
      return;
    }

    event.preventDefault();

    const deltaX = event.clientX - dragDataRef.current.startX;
    const deltaY = event.clientY - dragDataRef.current.startY;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      dragDataRef.current.moved = true;
    }

    zoomStageRef.current.scrollLeft =
      dragDataRef.current.scrollLeft - deltaX;
    zoomStageRef.current.scrollTop = dragDataRef.current.scrollTop - deltaY;
  };

  const handleZoomStageMouseUp = () => {
    dragDataRef.current.isDragging = false;
  };

  const handleZoomStageMouseLeave = () => {
    dragDataRef.current.isDragging = false;
  };

  const handleZoomStageTouchStart = (event) => {
    if (!isZoomed || !zoomStageRef.current) return;

    const touch = event.touches[0];

    dragDataRef.current = {
      isDragging: true,
      startX: touch.clientX,
      startY: touch.clientY,
      scrollLeft: zoomStageRef.current.scrollLeft,
      scrollTop: zoomStageRef.current.scrollTop,
      moved: false,
    };
  };

  const handleZoomStageTouchMove = (event) => {
    if (!isZoomed || !dragDataRef.current.isDragging || !zoomStageRef.current) {
      return;
    }

    const touch = event.touches[0];

    const deltaX = touch.clientX - dragDataRef.current.startX;
    const deltaY = touch.clientY - dragDataRef.current.startY;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      dragDataRef.current.moved = true;
    }

    zoomStageRef.current.scrollLeft =
      dragDataRef.current.scrollLeft - deltaX;
    zoomStageRef.current.scrollTop = dragDataRef.current.scrollTop - deltaY;
  };

  const handleZoomStageTouchEnd = () => {
    dragDataRef.current.isDragging = false;
  };

  const handleZoomStageClick = () => {
    if (dragDataRef.current.moved) {
      dragDataRef.current.moved = false;
      return;
    }

    handleZoomToggle();
  };

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f6f7fb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          color: "#444",
          padding: "20px",
          textAlign: "center",
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

  const stockStatus =
    product.stock > 0
      ? product.stock > 10
        ? "In Stock"
        : `Only ${product.stock} left`
      : "Out of Stock";

  const showThumbRail = galleryImages.length > 1;

  const sellingPrice = Number(product.priceInr || 0);
  const mrp = Number(product.mrpInr || 0);

  const discountPercent =
    mrp > 0 && sellingPrice > 0 && mrp > sellingPrice
      ? Math.round(((mrp - sellingPrice) / mrp) * 100)
      : 0;

  return (
    <>
      <div
        style={{
          background: "#f6f7fb",
          minHeight: "100vh",
          padding: "32px 20px 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1380px",
            margin: "0 auto",
          }}
        >
          <div className="product-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span className="breadcrumb-current">{product.title}</span>
          </div>

          <div className="product-main-layout">
            <div className="product-gallery-card">
              <div
                className={`product-gallery-grid ${
                  showThumbRail ? "has-thumbs" : "no-thumbs"
                }`}
              >
                {showThumbRail && (
                  <div className="thumbnail-rail">
                    <div className="thumbnail-list">
                      {galleryImages.map((img, i) => {
                        const isActive = activeImage === img;

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleMainThumbClick(img)}
                            className={`thumbnail-btn ${
                              isActive ? "active-thumb" : ""
                            }`}
                            aria-label={`View product image ${i + 1}`}
                          >
                            <img
                              src={img}
                              alt={`${product.title} thumbnail ${i + 1}`}
                              className="thumbnail-img"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="main-image-column">
                  <div className="main-image-wrapper">
                    <div className="main-image-badges">
                      <span className="badge-dark">PREMIUM</span>

                      {galleryImages.length > 1 && (
                        <span className="badge-light">
                          {activeImageIndex + 1} / {galleryImages.length}
                        </span>
                      )}
                    </div>

                    {galleryImages.length > 1 && (
                      <button
                        type="button"
                        className="main-arrow-btn main-arrow-left"
                        onClick={goToPreviousImage}
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                    )}

                    <div
                      ref={zoomStageRef}
                      role="button"
                      tabIndex={0}
                      className={`main-zoom-stage ${
                        isZoomed ? "main-zoomed" : ""
                      }`}
                      onClick={handleZoomStageClick}
                      onMouseDown={handleZoomStageMouseDown}
                      onMouseMove={handleZoomStageMouseMove}
                      onMouseUp={handleZoomStageMouseUp}
                      onMouseLeave={handleZoomStageMouseLeave}
                      onTouchStart={handleZoomStageTouchStart}
                      onTouchMove={handleZoomStageTouchMove}
                      onTouchEnd={handleZoomStageTouchEnd}
                      aria-label={isZoomed ? "Zoom out image" : "Zoom in image"}
                    >
                      <img
                        src={activeImage}
                        alt={product.title}
                        className="main-product-image"
                        draggable={false}
                      />
                    </div>

                    {galleryImages.length > 1 && (
                      <button
                        type="button"
                        className="main-arrow-btn main-arrow-right"
                        onClick={goToNextImage}
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    )}

                    <div className="main-zoom-hint">
                      {isZoomed
                        ? "Drag image to move • Click to zoom out"
                        : "Click image to zoom in"}
                    </div>
                  </div>

                  {galleryImages.length > 1 && (
                    <button
                      type="button"
                      className="full-view-trigger"
                      onClick={handleZoomToggle}
                      aria-label="Zoom product image"
                    >
                      {isZoomed ? "Click to zoom out" : "Click to see full view"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="product-info-card">
              <div className="top-label">PREMIUM COLLECTION</div>

              <h1 className="product-title">{product.title}</h1>

              <div className="rating-row">
                <div className="stars">
                  {"★".repeat(roundedAverage)}
                  {"☆".repeat(5 - roundedAverage)}
                </div>

                <div className="rating-text">
                  {reviewCount > 0
                    ? `${averageRating} rating • ${reviewCount} review${
                        reviewCount > 1 ? "s" : ""
                      }`
                    : "No ratings yet"}
                </div>
              </div>

              <div className="price-stock-row">
                <div className="price-block">
                  <div className="price-display-row">
                    {discountPercent > 0 && (
                      <span className="discount-badge">
                        -{discountPercent}%
                      </span>
                    )}

                    <h2 className="price-text">
                      ₹{sellingPrice.toLocaleString("en-IN")}
                    </h2>
                  </div>

                  {mrp > 0 && (
                    <div className="mrp-line">
                      <span className="mrp-label">M.R.P.:</span>{" "}
                      <span className="mrp-value">
                        ₹{mrp.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>

                <span
                  className="stock-pill"
                  style={{
                    background: product.stock > 0 ? "#ecfdf5" : "#fef2f2",
                    color: product.stock > 0 ? "#047857" : "#b91c1c",
                  }}
                >
                  {stockStatus}
                </span>
              </div>

              <div className="description-box">
                <p className="description-text">{product.description}</p>
              </div>

              <div className="action-buttons">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="add-to-cart-btn"
                  style={{
                    background:
                      product.stock > 0
                        ? "linear-gradient(135deg, #111827 0%, #1f2937 100%)"
                        : "#9ca3af",
                    cursor: product.stock > 0 ? "pointer" : "not-allowed",
                    boxShadow:
                      product.stock > 0
                        ? "0 12px 24px rgba(17,24,39,0.18)"
                        : "none",
                  }}
                >
                  {product.stock > 0 ? "Add To Cart" : "Out of Stock"}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="buy-now-btn"
                >
                  Buy Now
                </button>
              </div>

              <div className="trust-grid">
                <div className="trust-box">
                  Secure checkout and trusted shopping experience
                </div>
                <div className="trust-box">
                  Premium quality product with customer satisfaction focus
                </div>
              </div>
            </div>
          </div>

          <div className="reviews-card">
            <div className="reviews-head">
              <h2 className="reviews-title">Customer Reviews</h2>

              {reviewCount > 0 && (
                <div className="reviews-summary">
                  <span className="summary-stars">
                    {"★".repeat(roundedAverage)}
                    {"☆".repeat(5 - roundedAverage)}
                  </span>
                  <span className="summary-text">
                    {averageRating} / 5 from {reviewCount} review
                    {reviewCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>

            {!product.reviews || product.reviews.length === 0 ? (
              <div className="no-reviews-box">No reviews yet.</div>
            ) : (
              <div className="reviews-list">
                {product.reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-top">
                      <div>
                        <div className="reviewer-name">
                          {review.reviewerName}
                        </div>
                        <div className="review-subtext">
                          Verified customer review
                        </div>
                      </div>

                      <div className="review-stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>

                    {review.featured && (
                      <div className="featured-review-badge">
                        Featured Review
                      </div>
                    )}

                    <p className="review-text">{review.reviewText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-breadcrumb {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 18px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .breadcrumb-current {
          color: #111827;
          font-weight: 700;
          word-break: break-word;
        }

        .product-main-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(360px, 440px);
          gap: 32px;
          align-items: start;
        }

        .product-gallery-card {
          background: #fff;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          border: 1px solid #ececec;
          min-width: 0;
          overflow: visible;
        }

        .product-gallery-grid {
          display: grid;
          gap: 18px;
          align-items: start;
          min-width: 0;
        }

        .product-gallery-grid.has-thumbs {
          grid-template-columns: 92px minmax(0, 1fr);
        }

        .product-gallery-grid.no-thumbs {
          grid-template-columns: 1fr;
        }

        .thumbnail-rail {
          min-width: 0;
          overflow: hidden;
        }

        .thumbnail-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 100%;
          max-height: 680px;
          overflow-y: auto;
          padding-right: 2px;
          scrollbar-width: thin;
        }

        .thumbnail-btn {
          width: 100%;
          border: 1px solid #dbe1ea;
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          padding: 6px;
          cursor: pointer;
          transition: all 0.25s ease;
          flex: 0 0 auto;
        }

        .thumbnail-btn:hover {
          border-color: #94a3b8;
          transform: translateY(-1px);
        }

        .thumbnail-btn.active-thumb {
          border: 2px solid #111827;
          box-shadow: 0 6px 18px rgba(17, 24, 39, 0.12);
        }

        .thumbnail-img {
          width: 100%;
          height: 88px;
          object-fit: contain;
          border-radius: 10px;
          display: block;
          background: #fff;
        }

        .main-image-column {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .main-image-wrapper {
          position: relative;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          overflow: hidden;
          padding: 14px;
        }

        .main-image-badges {
          position: absolute;
          top: 22px;
          left: 22px;
          z-index: 5;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          pointer-events: none;
        }

        .badge-dark {
          background: #111827;
          color: #fff;
          padding: 7px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .badge-light {
          background: #ffffff;
          color: #111827;
          padding: 7px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          border: 1px solid #e5e7eb;
        }

        .main-zoom-stage {
          width: 100%;
          aspect-ratio: 1 / 1;
          max-height: 680px;
          border: none;
          background: #fff;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-in;
          overflow: auto;
          border-radius: 14px;
          outline: none;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          touch-action: none;
          scrollbar-width: thin;
        }

        .main-zoom-stage.main-zoomed {
          cursor: grab;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .main-zoom-stage.main-zoomed:active {
          cursor: grabbing;
        }

        .main-product-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 30px;
          border-radius: 14px;
          display: block;
          background: #fff;
          transition: transform 0.28s ease;
          transform-origin: center center;
          user-select: none;
          -webkit-user-drag: none;
          pointer-events: none;
        }

        .main-zoomed .main-product-image {
          width: auto;
          height: auto;
          max-width: none;
          max-height: none;
          transform: scale(1.85);
          margin: 120px;
          padding: 0;
        }

        .main-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          background: rgba(255, 255, 255, 0.94);
          color: #111827;
          font-size: 38px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 6;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
          transition: all 0.2s ease;
        }

        .main-arrow-btn:hover {
          background: #111827;
          color: #fff;
          border-color: #111827;
        }

        .main-arrow-left {
          left: 18px;
        }

        .main-arrow-right {
          right: 18px;
        }

        .main-zoom-hint {
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 6;
          background: rgba(255, 255, 255, 0.92);
          color: #111827;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          font-size: 12px;
          font-weight: 700;
          pointer-events: none;
        }

        .full-view-trigger {
          align-self: center;
          margin-top: 12px;
          border: none;
          background: transparent;
          color: #2563eb;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.2;
          text-align: center;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .full-view-trigger:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        .product-info-card {
          background: #fff;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          border: 1px solid #ececec;
          position: sticky;
          top: 20px;
          min-width: 0;
        }

        .top-label {
          display: inline-block;
          background: #111827;
          color: #fff;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.4px;
          margin-bottom: 16px;
        }

        .product-title {
          font-size: 34px;
          line-height: 1.25;
          margin: 0 0 14px;
          color: #111827;
          font-weight: 800;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .stars {
          color: #f59e0b;
          font-weight: 700;
          font-size: 20px;
          letter-spacing: 1px;
        }

        .rating-text {
          color: #374151;
          font-size: 15px;
          font-weight: 600;
        }

        .price-stock-row {
          margin-bottom: 22px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }

        .price-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        .price-display-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }

        .discount-badge {
          color: #cc0c39;
          font-size: 32px;
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .price-text {
          color: #111111;
          font-size: 48px;
          font-weight: 500;
          line-height: 1;
          margin: 0;
          letter-spacing: -0.03em;
        }

        .mrp-line {
          color: #6b7280;
          font-size: 18px;
          font-weight: 500;
          line-height: 1.3;
          margin-top: 4px;
        }

        .mrp-label {
          color: #6b7280;
        }

        .mrp-value {
          text-decoration: line-through;
          color: #6b7280;
        }

        .stock-pill {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
        }

        .description-box {
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
          padding: 18px 0;
          margin-bottom: 22px;
        }

        .description-text {
          margin: 0;
          color: #4b5563;
          font-size: 16px;
          line-height: 1.8;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        .action-buttons {
          display: grid;
          gap: 12px;
        }

        .add-to-cart-btn,
        .buy-now-btn {
          width: 100%;
          padding: 16px 24px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 16px;
          transition: 0.3s ease;
        }

        .add-to-cart-btn {
          color: #fff;
          border: none;
        }

        .buy-now-btn {
          background: #fff;
          color: #111827;
          border: 1.5px solid #111827;
          cursor: pointer;
        }

        .buy-now-btn:hover {
          background: #111827;
          color: #fff;
          box-shadow: 0 12px 24px rgba(17, 24, 39, 0.12);
        }

        .buy-now-btn:disabled {
          background: #f3f4f6;
          color: #9ca3af;
          border-color: #d1d5db;
          cursor: not-allowed;
          box-shadow: none;
        }

        .trust-grid {
          margin-top: 18px;
          display: grid;
          gap: 10px;
        }

        .trust-box {
          background: #f9fafb;
          border-radius: 12px;
          padding: 12px 14px;
          color: #374151;
          font-size: 14px;
          border: 1px solid #eceff3;
        }

        .reviews-card {
          margin-top: 42px;
          background: #fff;
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          border: 1px solid #ececec;
        }

        .reviews-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .reviews-title {
          margin: 0;
          font-size: 28px;
          color: #111827;
          font-weight: 800;
        }

        .reviews-summary {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .summary-stars {
          color: #f59e0b;
          font-size: 18px;
          font-weight: 700;
        }

        .summary-text {
          color: #374151;
          font-size: 14px;
          font-weight: 600;
        }

        .no-reviews-box {
          text-align: center;
          padding: 32px 20px;
          background: #f9fafb;
          border-radius: 14px;
          border: 1px dashed #d1d5db;
          color: #6b7280;
          font-size: 16px;
        }

        .reviews-list {
          display: grid;
          gap: 18px;
        }

        .review-card {
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 20px;
          background: #fcfcfd;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
        }

        .review-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .reviewer-name {
          font-weight: 800;
          color: #111827;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .review-subtext {
          color: #6b7280;
          font-size: 13px;
        }

        .review-stars {
          color: #f59e0b;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 1px;
        }

        .featured-review-badge {
          display: inline-block;
          margin-bottom: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          background: #eef2ff;
          color: #4338ca;
          font-size: 12px;
          font-weight: 800;
        }

        .review-text {
          margin: 0;
          line-height: 1.8;
          color: #374151;
          font-size: 15px;
          word-break: break-word;
          overflow-wrap: anywhere;
        }

        @media (max-width: 1199px) {
          .product-main-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .product-info-card {
            position: static;
            top: unset;
          }
        }

        @media (max-width: 767px) {
          .product-breadcrumb {
            font-size: 12px;
            gap: 6px;
            margin-bottom: 14px;
          }

          .product-gallery-card,
          .product-info-card,
          .reviews-card {
            padding: 16px;
            border-radius: 16px;
          }

          .product-gallery-grid.has-thumbs {
            grid-template-columns: 1fr;
          }

          .thumbnail-list {
            order: 2;
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
            gap: 10px;
            padding-bottom: 4px;
            max-height: none;
          }

          .thumbnail-btn {
            min-width: 72px;
            width: 72px;
            flex: 0 0 72px;
            padding: 4px;
          }

          .thumbnail-img {
            height: 72px;
          }

          .main-image-wrapper {
            padding: 10px;
            border-radius: 14px;
          }

          .main-image-badges {
            top: 14px;
            left: 14px;
            gap: 8px;
          }

          .badge-dark,
          .badge-light {
            font-size: 10px;
            padding: 6px 10px;
          }

          .main-zoom-stage {
            aspect-ratio: 4 / 5;
            border-radius: 12px;
          }

          .main-product-image {
            padding: 24px;
            border-radius: 12px;
          }

          .main-zoomed .main-product-image {
            transform: scale(1.65);
            margin: 80px;
            padding: 0;
          }

          .main-arrow-btn {
            width: 40px;
            height: 40px;
            font-size: 32px;
          }

          .main-arrow-left {
            left: 12px;
          }

          .main-arrow-right {
            right: 12px;
          }

          .main-zoom-hint {
            right: 12px;
            bottom: 12px;
            font-size: 11px;
          }

          .full-view-trigger {
            font-size: 17px;
            margin-top: 12px;
          }

          .product-title {
            font-size: 26px;
            line-height: 1.3;
          }

          .price-display-row {
            gap: 8px;
          }

          .discount-badge {
            font-size: 24px;
          }

          .price-text {
            font-size: 36px;
          }

          .mrp-line {
            font-size: 15px;
          }

          .stars {
            font-size: 18px;
          }

          .rating-text,
          .description-text,
          .review-text {
            font-size: 14px;
          }

          .add-to-cart-btn,
          .buy-now-btn {
            padding: 15px 20px;
            font-size: 15px;
          }

          .reviews-title {
            font-size: 22px;
          }

          .reviews-summary {
            width: 100%;
          }
        }

        @media (max-width: 479px) {
          .main-zoom-stage {
            aspect-ratio: 1 / 1.15;
          }

          .product-title {
            font-size: 22px;
          }

          .discount-badge {
            font-size: 20px;
          }

          .price-text {
            font-size: 30px;
          }

          .mrp-line {
            font-size: 14px;
          }

          .top-label {
            font-size: 11px;
          }

          .trust-box {
            font-size: 13px;
          }

          .review-card {
            padding: 16px;
          }

          .full-view-trigger {
            font-size: 16px;
          }

          .main-zoom-hint {
            display: none;
          }

          .main-zoomed .main-product-image {
            transform: scale(1.55);
            margin: 60px;
          }
        }
      `}</style>
    </>
  );
}