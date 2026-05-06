// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCart, clearCart } from "@/features/cart/cartSlice";
// import {
//   createAddress,
//   fetchAddresses,
//   setDefaultAddress,
// } from "@/features/address/addressSlice";
// import { clearPlacedOrder, placeOrder } from "@/features/orders/orderSlice";
// import {
//   fetchGiftSetCart,
//   placeGiftSetOrder,
//   createGiftSetRazorpayOrder,
//   verifyGiftSetRazorpayPayment,
//   clearPlacedGiftSetOrder,
// } from "@/features/giftSet/giftSetSlice";
// import {
//   createRazorpayOrderApi,
//   verifyRazorpayPaymentApi,
// } from "@/features/payment/paymentApi";
// import { applyCouponApi } from "@/features/coupons/couponApi";
// import { loadRazorpayScript } from "@/lib/loadRazorpay";
// import { useRouter, useSearchParams } from "next/navigation";
// import { redirectToLogin } from "@/lib/authRedirect";

// const initialForm = {
//   fullName: "",
//   phone: "",
//   line1: "",
//   line2: "",
//   city: "",
//   state: "",
//   pincode: "",
//   country: "India",
//   isDefault: true,
// };

// export default function CheckoutPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const source = searchParams.get("source") === "giftset" ? "giftset" : "cart";
//   const isGiftSetMode = source === "giftset";

//   const { token, user, loading: authLoading } = useSelector((state) => state.auth);

//   const {
//     items: cartItems = [],
//     subtotal: cartSubtotal = 0,
//     totalItems: cartTotalItems = 0,
//     loading: cartLoading,
//   } = useSelector((state) => state.cart);

//   const {
//     addresses = [],
//     loading: addressLoading,
//     error: addressError,
//   } = useSelector((state) => state.address);

//   const {
//     placedOrder,
//     loading: orderLoading,
//     error: orderError,
//   } = useSelector((state) => state.orders);

//   const {
//     summary: giftSetSummary,
//     placedOrder: placedGiftSetOrder,
//     loading: giftSetLoading,
//     error: giftSetError,
//   } = useSelector((state) => state.giftSet);

//   const [form, setForm] = useState(initialForm);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [processingOnlinePayment, setProcessingOnlinePayment] = useState(false);
//   const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

//   const [couponCode, setCouponCode] = useState("");
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [couponError, setCouponError] = useState("");
//   const [couponResult, setCouponResult] = useState(null);

//   const [mounted, setMounted] = useState(false);

//   const selectedAddress = useMemo(
//     () => addresses.find((a) => a.id === selectedAddressId) || null,
//     [addresses, selectedAddressId]
//   );

//   const checkoutItems = useMemo(() => {
//     if (isGiftSetMode) return giftSetSummary?.items || [];
//     return cartItems || [];
//   }, [isGiftSetMode, giftSetSummary, cartItems]);

//   const subtotal = isGiftSetMode
//     ? Number(giftSetSummary?.subtotalInr || 0)
//     : Number(cartSubtotal || 0);

//   const totalItems = isGiftSetMode
//     ? Number(giftSetSummary?.totalProducts || 0)
//     : Number(cartTotalItems || 0);

//   const baseDiscount = isGiftSetMode
//     ? Number(giftSetSummary?.discountAmountInr || 0)
//     : 0;

//   const couponDiscount = couponResult?.valid
//     ? Number(couponResult.discountAmount || 0)
//     : 0;

//   const finalTotal = Math.max(subtotal - baseDiscount - couponDiscount, 0);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     dispatch(clearPlacedOrder());
//     dispatch(clearPlacedGiftSetOrder());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!mounted || authLoading) return;

//     if (!token) {
//       redirectToLogin(router, isGiftSetMode ? "/checkout?source=giftset" : "/checkout");
//       return;
//     }

//     if (isGiftSetMode) {
//       dispatch(fetchGiftSetCart());
//     } else {
//       dispatch(fetchCart());
//     }

//     dispatch(fetchAddresses());
//   }, [mounted, dispatch, token, authLoading, router, isGiftSetMode]);

//   useEffect(() => {
//     if (addresses.length > 0) {
//       const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];
//       setSelectedAddressId(defaultAddress?.id || null);
//     }
//   }, [addresses]);

//   useEffect(() => {
//     if (!isGiftSetMode && placedOrder?.id) {
//       const orderId = placedOrder.id;
//       setSuccessMessage(
//         `Order placed successfully. Your order number is ${placedOrder.orderNumber}.`
//       );

//       const timer = setTimeout(() => {
//         dispatch(fetchCart());
//         dispatch(clearPlacedOrder());
//         dispatch(clearCart());
//         router.replace(`/account/orders/${orderId}?success=cod`);
//       }, 1200);

//       return () => clearTimeout(timer);
//     }
//   }, [placedOrder, dispatch, router, isGiftSetMode]);

//   useEffect(() => {
//     if (isGiftSetMode && placedGiftSetOrder?.id) {
//       const orderId = placedGiftSetOrder.id;
//       setSuccessMessage(
//         `Gift set order placed successfully. Your order number is ${placedGiftSetOrder.orderNumber}.`
//       );

//       const timer = setTimeout(() => {
//         dispatch(fetchGiftSetCart());
//         dispatch(clearPlacedGiftSetOrder());
//         router.replace(`/account/giftset-orders/${orderId}?success=cod`);
//       }, 1200);

//       return () => clearTimeout(timer);
//     }
//   }, [placedGiftSetOrder, dispatch, router, isGiftSetMode]);

//   useEffect(() => {
//     if (!couponResult?.valid) return;

//     const expectedDiscount = Number(couponResult.discountAmount || 0);
//     const couponFinalTotal = Number(couponResult.finalTotal || 0);
//     const recalculatedFinal = Math.max(subtotal - expectedDiscount, 0);

//     if (Math.abs(recalculatedFinal - couponFinalTotal) > 0.01) {
//       setCouponResult(null);
//       setCouponError("Cart changed. Please apply coupon again.");
//     }
//   }, [subtotal, couponResult]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleCreateAddress = async (e) => {
//     e.preventDefault();

//     if (!form.fullName.trim()) {
//       alert("Full name is required");
//       return;
//     }

//     if (!/^[0-9]{10}$/.test(form.phone)) {
//       alert("Phone must be exactly 10 digits");
//       return;
//     }

//     if (!form.line1.trim()) {
//       alert("Address Line 1 is required");
//       return;
//     }

//     if (!form.city.trim()) {
//       alert("City is required");
//       return;
//     }

//     if (!form.state.trim()) {
//       alert("State is required");
//       return;
//     }

//     if (!/^[0-9]{6}$/.test(form.pincode)) {
//       alert("Pincode must be exactly 6 digits");
//       return;
//     }

//     const result = await dispatch(createAddress(form));

//     if (createAddress.fulfilled.match(result)) {
//       setSelectedAddressId(result.payload.id);
//       setForm(initialForm);
//       dispatch(fetchAddresses());
//       alert("Address saved successfully");
//     } else {
//       alert(result.payload || "Failed to save address");
//     }
//   };

//   const handleApplyCoupon = async () => {
//     if (!couponCode.trim()) {
//       setCouponError("Please enter coupon code");
//       setCouponResult(null);
//       return;
//     }

//     try {
//       setCouponLoading(true);
//       setCouponError("");

//       const result = await applyCouponApi({
//         code: couponCode.trim(),
//         cartTotal: subtotal,
//       });

//       setCouponResult(result);
//     } catch (err) {
//       setCouponResult(null);
//       setCouponError(
//         err?.response?.data?.message ||
//           err?.response?.data ||
//           "Invalid coupon code"
//       );
//     } finally {
//       setCouponLoading(false);
//     }
//   };

//   const handleRemoveCoupon = () => {
//     setCouponCode("");
//     setCouponResult(null);
//     setCouponError("");
//   };

//   const handleCodOrder = async () => {
//     if (isGiftSetMode) {
//       const result = await dispatch(
//         placeGiftSetOrder({
//           addressId: selectedAddressId,
//           paymentMethod: "COD",
//           couponCode: couponResult?.valid ? couponResult.code : null,
//         })
//       );

//       if (placeGiftSetOrder.rejected.match(result)) {
//         alert(result.payload || "Failed to place gift set COD order");
//       }
//       return;
//     }

//     const result = await dispatch(
//       placeOrder({
//         addressId: selectedAddressId,
//         paymentMethod: "COD",
//         couponCode: couponResult?.valid ? couponResult.code : null,
//       })
//     );

//     if (placeOrder.rejected.match(result)) {
//       alert(result.payload || "Failed to place COD order");
//     }
//   };

//   const handleOnlinePayment = async () => {
//     const loaded = await loadRazorpayScript();

//     if (!loaded) {
//       alert("Razorpay SDK failed to load");
//       return;
//     }

//     try {
//       setProcessingOnlinePayment(true);

//       let razorpayOrder;

//       if (isGiftSetMode) {
//         const result = await dispatch(
//           createGiftSetRazorpayOrder({
//             addressId: selectedAddressId,
//             couponCode: couponResult?.valid ? couponResult.code : null,
//           })
//         );

//         if (createGiftSetRazorpayOrder.rejected.match(result)) {
//           setProcessingOnlinePayment(false);
//           alert(result.payload || "Failed to create gift set payment order");
//           return;
//         }

//         razorpayOrder = result.payload;
//       } else {
//         razorpayOrder = await createRazorpayOrderApi({
//           addressId: selectedAddressId,
//           couponCode: couponResult?.valid ? couponResult.code : null,
//         });
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || razorpayOrder.key,
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//         name: "Trendz Firenze",
//         description: isGiftSetMode ? "Gift Set Order Payment" : "Order Payment",
//         order_id: razorpayOrder.razorpayOrderId,
//         prefill: {
//           name: user?.name || selectedAddress?.fullName || "",
//           email: user?.email || "",
//           contact: selectedAddress?.phone || "",
//         },
//         notes: {
//           internalOrderId: String(razorpayOrder.orderId),
//           couponCode: couponResult?.valid ? couponResult.code : "",
//           source,
//         },
//         handler: async function (response) {
//           try {
//             if (isGiftSetMode) {
//               const verifyAction = await dispatch(
//                 verifyGiftSetRazorpayPayment({
//                   orderId: razorpayOrder.orderId,
//                   razorpayOrderId: response.razorpay_order_id,
//                   razorpayPaymentId: response.razorpay_payment_id,
//                   razorpaySignature: response.razorpay_signature,
//                 })
//               );

//               if (verifyGiftSetRazorpayPayment.fulfilled.match(verifyAction)) {
//                 setSuccessMessage(
//                   verifyAction.payload.message ||
//                     "Payment successful. Your gift set order has been confirmed."
//                 );

//                 dispatch(fetchGiftSetCart());

//                 setTimeout(() => {
//                   router.replace(
//                     `/account/giftset-orders/${verifyAction.payload.orderId}?success=paid`
//                   );
//                 }, 1200);
//               } else {
//                 alert(verifyAction.payload || "Payment verification failed");
//               }
//             } else {
//               const verifyResponse = await verifyRazorpayPaymentApi({
//                 orderId: razorpayOrder.orderId,
//                 razorpayOrderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id,
//                 razorpaySignature: response.razorpay_signature,
//               });

//               setSuccessMessage(
//                 verifyResponse.message ||
//                   "Payment successful. Your order has been confirmed."
//               );

//               dispatch(fetchCart());
//               dispatch(clearCart());

//               setTimeout(() => {
//                 router.replace(`/account/orders/${verifyResponse.orderId}?success=paid`);
//               }, 1200);
//             }
//           } catch (err) {
//             alert(
//               err?.response?.data?.message ||
//                 err.message ||
//                 "Payment verification failed"
//             );
//           } finally {
//             setProcessingOnlinePayment(false);
//           }
//         },
//         modal: {
//           ondismiss: function () {
//             setProcessingOnlinePayment(false);
//           },
//         },
//         theme: {
//           color: "#111111",
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     } catch (err) {
//       setProcessingOnlinePayment(false);
//       alert(
//         err?.response?.data?.message ||
//           err.message ||
//           "Failed to start online payment"
//       );
//     }
//   };

//   const handlePlaceOrder = async () => {
//     setSuccessMessage("");

//     if (!selectedAddressId) {
//       alert("Please select address");
//       return;
//     }

//     if (!checkoutItems.length) {
//       alert(isGiftSetMode ? "Gift set cart is empty" : "Cart is empty");
//       return;
//     }

//     try {
//       setIsSubmittingOrder(true);

//       if (paymentMethod === "COD") {
//         await handleCodOrder();
//         return;
//       }

//       await handleOnlinePayment();
//     } finally {
//       setIsSubmittingOrder(false);
//     }
//   };

//   if (!mounted || authLoading) {
//     return <div style={{ padding: 20 }}>Loading...</div>;
//   }

//   if (!token) return null;

//   const disablePlaceOrder =
//     isSubmittingOrder || processingOnlinePayment || checkoutItems.length === 0;

//   const pageTitle = isGiftSetMode ? "Gift Set Checkout" : "Secure Checkout";
//   const pageDescription = isGiftSetMode
//     ? "Complete your gift set order by selecting a delivery address, reviewing your gift bundle, and choosing your payment method."
//     : "Complete your order by selecting a delivery address, reviewing your cart, and choosing your preferred payment method.";

//   const currentError = isGiftSetMode ? giftSetError : orderError;

//   return (
//     <>
//       <div className="checkout-shell">
//         <div className="checkout-bg-orb orb-one" />
//         <div className="checkout-bg-orb orb-two" />
//         <div className="checkout-grid-lines" />

//         <div className="checkout-container">
//           <div className="checkout-hero fade-up">
//             <div className="checkout-hero-badge">
//               {isGiftSetMode ? "Trendz Firenze Gift Set Checkout" : "Trendz Firenze Secure Checkout"}
//             </div>

//             <div className="checkout-hero-top">
//               <div>
//                 <h1 className="checkout-title">{pageTitle}</h1>
//                 <p className="checkout-subtitle">{pageDescription}</p>
//               </div>

//               <div className="checkout-stats">
//                 <div className="stat-card">
//                   <span className="stat-label">Items</span>
//                   <span className="stat-value">{totalItems}</span>
//                 </div>
//                 <div className="stat-card">
//                   <span className="stat-label">Total</span>
//                   <span className="stat-value">₹{finalTotal}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {successMessage && (
//             <div className="success-banner fade-up">
//               <div className="success-icon">✓</div>
//               <div>{successMessage}</div>
//             </div>
//           )}

//           <div className="checkout-layout">
//             <div className="left-column">
//               <section className="glass-card fade-up delay-1">
//                 <div className="section-head">
//                   <div>
//                     <p className="section-kicker">Delivery</p>
//                     <h2 className="section-title">Select Address</h2>
//                     <p className="section-desc">
//                       Choose your delivery location for this order.
//                     </p>
//                   </div>
//                 </div>

//                 {addressLoading ? (
//                   <div className="empty-state">Loading addresses...</div>
//                 ) : addresses.length === 0 ? (
//                   <div className="empty-state">No saved address yet.</div>
//                 ) : (
//                   <div className="address-list">
//                     {addresses.map((a) => {
//                       const isSelected = selectedAddressId === a.id;

//                       return (
//                         <label
//                           key={a.id}
//                           className={`address-card ${isSelected ? "selected" : ""}`}
//                         >
//                           <div className="address-left">
//                             <input
//                               type="radio"
//                               name="selectedAddress"
//                               checked={isSelected}
//                               onChange={() => setSelectedAddressId(a.id)}
//                               className="radio-input"
//                             />

//                             <div className="address-content">
//                               <div className="address-head">
//                                 <strong className="address-name">{a.fullName}</strong>

//                                 {a.isDefault && (
//                                   <span className="pill success">Default</span>
//                                 )}

//                                 {isSelected && (
//                                   <span className="pill dark">Selected</span>
//                                 )}
//                               </div>

//                               <div className="address-body">
//                                 <div>{a.phone}</div>
//                                 <div>{a.line1}</div>
//                                 {a.line2 && <div>{a.line2}</div>}
//                                 <div>
//                                   {a.city}, {a.state} - {a.pincode}
//                                 </div>
//                                 <div>{a.country}</div>
//                               </div>
//                             </div>
//                           </div>

//                           {!a.isDefault && (
//                             <button
//                               type="button"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 dispatch(setDefaultAddress(a.id));
//                               }}
//                               className="secondary-btn small-btn"
//                             >
//                               Make Default
//                             </button>
//                           )}
//                         </label>
//                       );
//                     })}
//                   </div>
//                 )}

//                 {addressError && <p className="error-text">{addressError}</p>}
//               </section>

//               <form onSubmit={handleCreateAddress} className="glass-card fade-up delay-2">
//                 <div className="section-head">
//                   <div>
//                     <p className="section-kicker">Address Book</p>
//                     <h2 className="section-title">Add New Address</h2>
//                     <p className="section-desc">
//                       Save a delivery address for this and future orders.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="form-grid two-col">
//                   <input
//                     name="fullName"
//                     value={form.fullName}
//                     onChange={handleChange}
//                     placeholder="Full Name"
//                     style={inputStyle}
//                   />
//                   <input
//                     name="phone"
//                     value={form.phone}
//                     onChange={handleChange}
//                     placeholder="Phone Number"
//                     style={inputStyle}
//                   />
//                 </div>

//                 <input
//                   name="line1"
//                   value={form.line1}
//                   onChange={handleChange}
//                   placeholder="Address Line 1"
//                   style={inputStyle}
//                 />
//                 <input
//                   name="line2"
//                   value={form.line2}
//                   onChange={handleChange}
//                   placeholder="Address Line 2 (Optional)"
//                   style={inputStyle}
//                 />

//                 <div className="form-grid two-col">
//                   <input
//                     name="city"
//                     value={form.city}
//                     onChange={handleChange}
//                     placeholder="City"
//                     style={inputStyle}
//                   />
//                   <input
//                     name="state"
//                     value={form.state}
//                     onChange={handleChange}
//                     placeholder="State"
//                     style={inputStyle}
//                   />
//                 </div>

//                 <div className="form-grid two-col">
//                   <input
//                     name="pincode"
//                     value={form.pincode}
//                     onChange={handleChange}
//                     placeholder="Pincode"
//                     style={inputStyle}
//                   />
//                   <input
//                     name="country"
//                     value={form.country}
//                     onChange={handleChange}
//                     placeholder="Country"
//                     style={inputStyle}
//                   />
//                 </div>

//                 <label className="checkbox-row">
//                   <input
//                     type="checkbox"
//                     name="isDefault"
//                     checked={form.isDefault}
//                     onChange={handleChange}
//                   />
//                   <span>Set this as default address</span>
//                 </label>

//                 <button type="submit" className="primary-btn submit-btn">
//                   Save Address
//                 </button>
//               </form>
//             </div>

//             <div className="right-column fade-up delay-3">
//               <aside className="summary-card">
//                 <div className="summary-header">
//                   <div>
//                     <p className="section-kicker">Review</p>
//                     <h2 className="section-title">Order Summary</h2>
//                     <p className="section-desc">
//                       Review your order before placing it.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="summary-items-box">
//                   {cartLoading || giftSetLoading ? (
//                     <p className="muted-text" style={{ margin: 0 }}>Loading order...</p>
//                   ) : checkoutItems.length === 0 ? (
//                     <p className="muted-text" style={{ margin: 0 }}>
//                       {isGiftSetMode ? "Your gift set cart is empty." : "Your cart is empty."}
//                     </p>
//                   ) : isGiftSetMode ? (
//                     checkoutItems.map((item, index) => (
//                       <div
//                         key={item.cartItemId || `${item.productId}-${item.giftBoxId}-${index}`}
//                         className="summary-item"
//                       >
//                         <div className="summary-item-info">
//                           <div className="summary-item-title">{item.productTitle}</div>
//                           <div className="summary-item-meta">
//                             Gift Box: {item.giftBoxName}
//                           </div>
//                         </div>
//                         <div className="summary-item-price">₹{item.lineTotalInr}</div>
//                       </div>
//                     ))
//                   ) : (
//                     checkoutItems.map((item, index) => (
//                       <div key={item.itemId || item.id} className="summary-item">
//                         <div className="summary-item-info">
//                           <div className="summary-item-title">{item.title}</div>
//                           <div className="summary-item-meta">Qty: {item.quantity}</div>
//                         </div>
//                         <div className="summary-item-price">₹{item.lineTotal}</div>
//                       </div>
//                     ))
//                   )}
//                 </div>

//                 <div className="summary-pricing">
//                   <div style={summaryRowStyle}>
//                     <span>Items</span>
//                     <span>{totalItems}</span>
//                   </div>

//                   <div style={summaryRowStyle}>
//                     <span>Subtotal</span>
//                     <span>₹{subtotal}</span>
//                   </div>

//                   <div style={summaryRowStyle}>
//                     <span>Shipping</span>
//                     <span className="green-text">Free</span>
//                   </div>

//                   {isGiftSetMode && baseDiscount > 0 && (
//                     <div style={{ ...summaryRowStyle, color: "#166534", fontWeight: 700 }}>
//                       <span>Gift Set Discount</span>
//                       <span>-₹{baseDiscount}</span>
//                     </div>
//                   )}

//                   {couponResult?.valid && (
//                     <div style={{ ...summaryRowStyle, color: "#166534", fontWeight: 700 }}>
//                       <span>Coupon ({couponResult.code})</span>
//                       <span>-₹{couponResult.discountAmount}</span>
//                     </div>
//                   )}

//                   <div className="total-row">
//                     <span>Total</span>
//                     <span>₹{finalTotal}</span>
//                   </div>
//                 </div>

//                 <div className="inner-panel">
//                   <h3 className="inner-title">Coupon Code</h3>

//                   <div className="coupon-row">
//                     <input
//                       type="text"
//                       value={couponCode}
//                       onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                       placeholder="Enter coupon code"
//                       className="coupon-input"
//                     />

//                     <button
//                       type="button"
//                       onClick={handleApplyCoupon}
//                       disabled={couponLoading || !subtotal}
//                       className="primary-btn coupon-btn"
//                     >
//                       {couponLoading ? "Applying..." : "Apply"}
//                     </button>
//                   </div>

//                   {couponResult?.valid && (
//                     <div className="coupon-applied-row">
//                       <span className="pill success">Applied: {couponResult.code}</span>

//                       <button
//                         type="button"
//                         onClick={handleRemoveCoupon}
//                         className="secondary-btn small-btn"
//                       >
//                         Remove Coupon
//                       </button>
//                     </div>
//                   )}

//                   {couponError && <p className="error-text">{couponError}</p>}
//                 </div>

//                 <div className="inner-panel">
//                   <h3 className="inner-title">Payment Method</h3>

//                   <label className={`payment-card ${paymentMethod === "COD" ? "active" : ""}`}>
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       checked={paymentMethod === "COD"}
//                       onChange={() => setPaymentMethod("COD")}
//                     />
//                     <div>
//                       <div className="payment-title">Cash on Delivery</div>
//                       <div className="payment-desc">
//                         Pay with cash when your order is delivered
//                       </div>
//                     </div>
//                   </label>

//                   <label className={`payment-card ${paymentMethod === "ONLINE" ? "active" : ""}`}>
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       checked={paymentMethod === "ONLINE"}
//                       onChange={() => setPaymentMethod("ONLINE")}
//                     />
//                     <div>
//                       <div className="payment-title">Online Payment</div>
//                       <div className="payment-desc">
//                         Pay securely using Razorpay
//                       </div>
//                     </div>
//                   </label>
//                 </div>

//                 {currentError && <p className="error-text">{currentError}</p>}

//                 <button
//                   onClick={handlePlaceOrder}
//                   disabled={disablePlaceOrder}
//                   className={`place-order-btn ${disablePlaceOrder ? "disabled" : ""}`}
//                 >
//                   {isSubmittingOrder || processingOnlinePayment
//                     ? "Processing..."
//                     : paymentMethod === "COD"
//                     ? isGiftSetMode
//                       ? "Place Gift Set COD Order"
//                       : "Place COD Order"
//                     : "Pay Now"}
//                 </button>

//                 <p className="footer-note">
//                   By continuing, you confirm that your order details, address, and
//                   payment selection are correct.
//                 </p>
//               </aside>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .checkout-shell {
//           position: relative;
//           min-height: 100vh;
//           overflow: hidden;
//           background:
//             radial-gradient(circle at top left, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 32%, #f8fafc 100%);
//         }

//         .checkout-container {
//           position: relative;
//           z-index: 2;
//           width: 100%;
//           max-width: 1600px;
//           margin: 0 auto;
//           padding: 28px 24px 72px;
//         }

//         .checkout-bg-orb {
//           position: absolute;
//           border-radius: 999px;
//           filter: blur(70px);
//           opacity: 0.45;
//           pointer-events: none;
//         }

//         .orb-one {
//           width: 340px;
//           height: 340px;
//           background: rgba(17, 24, 39, 0.08);
//           top: -80px;
//           left: -70px;
//           animation: floatOrb 9s ease-in-out infinite;
//         }

//         .orb-two {
//           width: 420px;
//           height: 420px;
//           background: rgba(148, 163, 184, 0.14);
//           right: -100px;
//           top: 120px;
//           animation: floatOrb 12s ease-in-out infinite;
//         }

//         .checkout-grid-lines {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px);
//           background-size: 36px 36px;
//           mask-image: linear-gradient(to bottom, rgba(0,0,0,0.18), transparent 60%);
//           pointer-events: none;
//         }

//         .checkout-hero {
//           position: relative;
//           margin-bottom: 28px;
//           padding: 28px;
//           border: 1px solid rgba(255,255,255,0.65);
//           border-radius: 30px;
//           background:
//             linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.82));
//           box-shadow:
//             0 20px 60px rgba(15, 23, 42, 0.08),
//             inset 0 1px 0 rgba(255,255,255,0.8);
//           backdrop-filter: blur(18px);
//         }

//         .checkout-hero-badge {
//           display: inline-flex;
//           align-items: center;
//           padding: 8px 14px;
//           border-radius: 999px;
//           background: rgba(17, 24, 39, 0.06);
//           border: 1px solid rgba(17, 24, 39, 0.08);
//           color: #475569;
//           font-size: 12px;
//           font-weight: 700;
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//           margin-bottom: 18px;
//         }

//         .checkout-hero-top {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-end;
//           gap: 24px;
//           flex-wrap: wrap;
//         }

//         .checkout-title {
//           margin: 0;
//           font-size: clamp(2rem, 3vw, 3.3rem);
//           line-height: 1.05;
//           font-weight: 900;
//           color: #0f172a;
//           letter-spacing: -0.05em;
//         }

//         .checkout-subtitle {
//           margin: 14px 0 0 0;
//           max-width: 850px;
//           font-size: 15px;
//           line-height: 1.7;
//           color: #64748b;
//         }

//         .checkout-stats {
//           display: flex;
//           gap: 14px;
//           flex-wrap: wrap;
//         }

//         .stat-card {
//           min-width: 140px;
//           padding: 16px 18px;
//           border-radius: 20px;
//           background: rgba(255,255,255,0.88);
//           border: 1px solid rgba(226,232,240,0.9);
//           box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
//         }

//         .stat-label {
//           display: block;
//           font-size: 12px;
//           color: #64748b;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.08em;
//           margin-bottom: 8px;
//         }

//         .stat-value {
//           display: block;
//           font-size: 24px;
//           color: #0f172a;
//           font-weight: 800;
//           letter-spacing: -0.03em;
//         }

//         .success-banner {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           margin-bottom: 22px;
//           padding: 16px 18px;
//           border-radius: 20px;
//           background: linear-gradient(180deg, #ecfdf3 0%, #f0fdf4 100%);
//           color: #166534;
//           border: 1px solid #bbf7d0;
//           font-weight: 700;
//           box-shadow: 0 12px 28px rgba(22,101,52,0.08);
//         }

//         .success-icon {
//           width: 30px;
//           height: 30px;
//           border-radius: 999px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #16a34a;
//           color: #fff;
//           font-weight: 900;
//           flex-shrink: 0;
//         }

//         .checkout-layout {
//           display: grid;
//           grid-template-columns: minmax(0, 1.35fr) minmax(380px, 0.8fr);
//           gap: 30px;
//           align-items: start;
//         }

//         .left-column {
//           display: grid;
//           gap: 24px;
//         }

//         .right-column {
//           position: sticky;
//           top: 18px;
//         }

//         .glass-card,
//         .summary-card {
//           position: relative;
//           overflow: hidden;
//           border-radius: 28px;
//           border: 1px solid rgba(226,232,240,0.85);
//           background:
//             linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 100%);
//           box-shadow:
//             0 20px 55px rgba(15, 23, 42, 0.08),
//             inset 0 1px 0 rgba(255,255,255,0.8);
//           backdrop-filter: blur(14px);
//         }

//         .glass-card {
//           padding: 28px;
//         }

//         .summary-card {
//           padding: 28px;
//         }

//         .section-head {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           gap: 18px;
//           margin-bottom: 20px;
//         }

//         .section-kicker {
//           margin: 0 0 8px 0;
//           font-size: 11px;
//           font-weight: 800;
//           color: #64748b;
//           text-transform: uppercase;
//           letter-spacing: 0.12em;
//         }

//         .section-title {
//           margin: 0;
//           font-size: 28px;
//           line-height: 1.1;
//           font-weight: 850;
//           color: #0f172a;
//           letter-spacing: -0.04em;
//         }

//         .section-desc {
//           margin: 10px 0 0 0;
//           font-size: 14px;
//           line-height: 1.65;
//           color: #64748b;
//         }

//         .empty-state {
//           padding: 18px;
//           border-radius: 18px;
//           background: linear-gradient(180deg, #f8fafc 0%, #f9fafb 100%);
//           color: #64748b;
//           border: 1px solid #eef2f7;
//         }

//         .address-list {
//           display: grid;
//           gap: 14px;
//         }

//         .address-card {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           gap: 18px;
//           padding: 18px;
//           border-radius: 22px;
//           border: 1px solid #e5e7eb;
//           background: linear-gradient(180deg, #ffffff 0%, #fcfcfd 100%);
//           cursor: pointer;
//           transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
//         }

//         .address-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 16px 36px rgba(15, 23, 42, 0.06);
//         }

//         .address-card.selected {
//           border: 1.5px solid #0f172a;
//           background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
//           box-shadow: 0 18px 42px rgba(15, 23, 42, 0.09);
//         }

//         .address-left {
//           display: flex;
//           gap: 14px;
//           flex: 1;
//           min-width: 0;
//         }

//         .radio-input {
//           margin-top: 4px;
//           transform: scale(1.05);
//         }

//         .address-content {
//           flex: 1;
//           min-width: 0;
//         }

//         .address-head {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 8px;
//           align-items: center;
//           margin-bottom: 10px;
//         }

//         .address-name {
//           font-size: 16px;
//           color: #0f172a;
//           font-weight: 800;
//         }

//         .address-body {
//           display: grid;
//           gap: 4px;
//           font-size: 14px;
//           line-height: 1.55;
//           color: #475569;
//         }

//         .pill {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           padding: 5px 10px;
//           border-radius: 999px;
//           font-size: 11px;
//           font-weight: 800;
//           letter-spacing: 0.03em;
//         }

//         .pill.success {
//           background: #ecfdf3;
//           color: #166534;
//           border: 1px solid #bbf7d0;
//         }

//         .pill.dark {
//           background: #0f172a;
//           color: #ffffff;
//           border: 1px solid #0f172a;
//         }

//         .form-grid {
//           display: grid;
//           gap: 14px;
//         }

//         .two-col {
//           grid-template-columns: 1fr 1fr;
//         }

//         .checkbox-row {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-top: 16px;
//           font-size: 14px;
//           font-weight: 600;
//           color: #334155;
//         }

//         .primary-btn,
//         .secondary-btn,
//         .place-order-btn {
//           transition: all 0.25s ease;
//         }

//         .primary-btn {
//           border: none;
//           background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
//           color: #fff;
//           cursor: pointer;
//           font-weight: 800;
//           box-shadow: 0 16px 34px rgba(17,24,39,0.18);
//         }

//         .primary-btn:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 18px 38px rgba(17,24,39,0.22);
//         }

//         .submit-btn {
//           margin-top: 20px;
//           padding: 15px 20px;
//           border-radius: 16px;
//           font-size: 15px;
//         }

//         .secondary-btn {
//           border: 1px solid #d1d5db;
//           background: #ffffff;
//           color: #111827;
//           cursor: pointer;
//           font-weight: 700;
//           box-shadow: 0 8px 20px rgba(15,23,42,0.04);
//         }

//         .secondary-btn:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 12px 26px rgba(15,23,42,0.08);
//         }

//         .small-btn {
//           padding: 10px 13px;
//           border-radius: 12px;
//           font-size: 13px;
//           white-space: nowrap;
//         }

//         .summary-header {
//           margin-bottom: 18px;
//         }

//         .summary-items-box {
//           border: 1px solid #eef2f7;
//           border-radius: 22px;
//           padding: 16px;
//           background: linear-gradient(180deg, #f8fafc 0%, #fbfdff 100%);
//           margin-bottom: 20px;
//         }

//         .summary-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           gap: 14px;
//           padding-bottom: 14px;
//           margin-bottom: 14px;
//           border-bottom: 1px solid #e5e7eb;
//         }

//         .summary-item:last-child {
//           margin-bottom: 0;
//           padding-bottom: 0;
//           border-bottom: none;
//         }

//         .summary-item-info {
//           flex: 1;
//           min-width: 0;
//         }

//         .summary-item-title {
//           font-size: 15px;
//           line-height: 1.5;
//           font-weight: 700;
//           color: #0f172a;
//         }

//         .summary-item-meta {
//           margin-top: 5px;
//           font-size: 13px;
//           color: #64748b;
//           font-weight: 600;
//         }

//         .summary-item-price {
//           white-space: nowrap;
//           font-size: 15px;
//           font-weight: 800;
//           color: #0f172a;
//         }

//         .summary-pricing {
//           border-top: 1px solid #e5e7eb;
//           padding-top: 18px;
//         }

//         .total-row {
//           margin-top: 16px;
//           padding-top: 16px;
//           border-top: 1px dashed #cbd5e1;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-size: 18px;
//           font-weight: 900;
//           color: #0f172a;
//         }

//         .total-row span:last-child {
//           font-size: 30px;
//           letter-spacing: -0.04em;
//         }

//         .inner-panel {
//           margin-top: 24px;
//           padding: 18px;
//           border: 1px solid #e5e7eb;
//           border-radius: 20px;
//           background: linear-gradient(180deg, #fcfcfd 0%, #ffffff 100%);
//         }

//         .inner-title {
//           margin: 0 0 14px 0;
//           font-size: 18px;
//           font-weight: 800;
//           color: #0f172a;
//         }

//         .coupon-row {
//           display: flex;
//           gap: 10px;
//         }

//         .coupon-input {
//           flex: 1;
//           min-width: 0;
//           padding: 13px 14px;
//           border: 1px solid #d1d5db;
//           border-radius: 14px;
//           font-size: 14px;
//           outline: none;
//           background: #fff;
//           color: #111827;
//         }

//         .coupon-input:focus {
//           border-color: #0f172a;
//           box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
//         }

//         .coupon-btn {
//           padding: 12px 18px;
//           border-radius: 14px;
//           font-size: 14px;
//         }

//         .coupon-btn:disabled {
//           background: #9ca3af;
//           box-shadow: none;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .coupon-applied-row {
//           margin-top: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 10px;
//           flex-wrap: wrap;
//         }

//         .payment-card {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 15px 14px;
//           border-radius: 16px;
//           border: 1px solid #e5e7eb;
//           background: #fff;
//           cursor: pointer;
//           transition: all 0.25s ease;
//           margin-bottom: 10px;
//         }

//         .payment-card:last-child {
//           margin-bottom: 0;
//         }

//         .payment-card.active {
//           border: 1.5px solid #0f172a;
//           background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
//           box-shadow: 0 14px 30px rgba(15,23,42,0.06);
//         }

//         .payment-title {
//           font-size: 14px;
//           font-weight: 800;
//           color: #111827;
//         }

//         .payment-desc {
//           margin-top: 3px;
//           font-size: 12px;
//           color: #6b7280;
//         }

//         .place-order-btn {
//           width: 100%;
//           margin-top: 24px;
//           padding: 17px 18px;
//           border: none;
//           border-radius: 18px;
//           background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
//           color: #fff;
//           font-size: 15px;
//           font-weight: 900;
//           cursor: pointer;
//           letter-spacing: 0.01em;
//           box-shadow: 0 18px 36px rgba(17,24,39,0.2);
//         }

//         .place-order-btn:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 22px 40px rgba(17,24,39,0.24);
//         }

//         .place-order-btn.disabled,
//         .place-order-btn:disabled {
//           background: #9ca3af;
//           box-shadow: none;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .footer-note {
//           margin: 14px 0 0 0;
//           text-align: center;
//           font-size: 12px;
//           color: #6b7280;
//           line-height: 1.6;
//         }

//         .error-text {
//           color: #dc2626;
//           margin-top: 14px;
//           margin-bottom: 0;
//           font-size: 14px;
//           font-weight: 600;
//         }

//         .muted-text {
//           color: #6b7280;
//         }

//         .green-text {
//           color: #059669;
//           font-weight: 800;
//         }

//         .fade-up {
//           opacity: 0;
//           transform: translateY(14px);
//           animation: fadeUp 0.65s ease forwards;
//         }

//         .delay-1 {
//           animation-delay: 0.08s;
//         }

//         .delay-2 {
//           animation-delay: 0.16s;
//         }

//         .delay-3 {
//           animation-delay: 0.24s;
//         }

//         @keyframes fadeUp {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes floatOrb {
//           0%, 100% {
//             transform: translateY(0px) translateX(0px) scale(1);
//           }
//           50% {
//             transform: translateY(18px) translateX(12px) scale(1.04);
//           }
//         }

//         @media (max-width: 1200px) {
//           .checkout-layout {
//             grid-template-columns: 1fr;
//           }

//           .right-column {
//             position: static;
//           }
//         }

//         @media (max-width: 768px) {
//           .checkout-container {
//             padding: 18px 14px 56px;
//           }

//           .checkout-hero,
//           .glass-card,
//           .summary-card {
//             border-radius: 24px;
//             padding: 20px;
//           }

//           .two-col {
//             grid-template-columns: 1fr;
//           }

//           .coupon-row {
//             flex-direction: column;
//           }

//           .checkout-stats {
//             width: 100%;
//           }

//           .stat-card {
//             flex: 1;
//           }

//           .address-card {
//             flex-direction: column;
//           }

//           .small-btn {
//             width: 100%;
//           }

//           .total-row span:last-child {
//             font-size: 26px;
//           }

//           .section-title {
//             font-size: 24px;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// const inputStyle = {
//   display: "block",
//   width: "100%",
//   padding: "14px 14px",
//   marginTop: 14,
//   border: "1px solid #d1d5db",
//   borderRadius: 14,
//   background: "#fff",
//   color: "#111827",
//   fontSize: 14,
//   outline: "none",
//   boxSizing: "border-box",
//   transition: "all 0.2s ease",
// };

// const summaryRowStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: 10,
//   color: "#374151",
//   fontSize: 14,
//   fontWeight: 500,
// };





















// "use client";

// import { useEffect, useState } from "react";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   fetchCart,
//   clearCart,
//   mergeGuestCartAfterLogin,
// } from "@/features/cart/cartSlice";

// import {
//   fetchAddresses,
//   createAddress,
// } from "@/features/address/addressSlice";

// import {
//   clearPlacedOrder,
//   placeOrder,
// } from "@/features/orders/orderSlice";

// import {
//   setCredentials,
// } from "@/features/auth/authSlice";

// import {
//   getGuestCart,
// } from "@/lib/guestCart";

// import {
//   checkGuestEmailApi,
//   guestContinueApi,
// } from "@/features/guestCheckout/guestCheckoutApi";

// /* =========================================
//    INITIAL ADDRESS FORM
// ========================================= */

// const initialForm = {
//   fullName: "",
//   phone: "",
//   line1: "",
//   line2: "",
//   city: "",
//   state: "",
//   pincode: "",
//   country: "India",
// };

// export default function CheckoutPage() {
//   const dispatch = useDispatch();

//   /* =========================================
//      STORE
//   ========================================= */

//   const { token } = useSelector((state) => state.auth);

//   const { items = [], loading } = useSelector(
//     (state) => state.cart
//   );

//   const { addresses = [] } = useSelector(
//     (state) => state.address
//   );

//   /* =========================================
//      UI STATE
//   ========================================= */

//   const [checkoutStep, setCheckoutStep] = useState(
//     token ? "address" : "email"
//   );

//   const [form, setForm] = useState(initialForm);

//   const [selectedAddressId, setSelectedAddressId] =
//     useState(null);

//   const [paymentMethod, setPaymentMethod] =
//     useState("COD");

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   /* =========================================
//      GUEST AUTH STATE
//   ========================================= */

//   const [guestEmail, setGuestEmail] = useState("");

//   const [guestPassword, setGuestPassword] =
//     useState("");

//   const [guestName, setGuestName] = useState("");

//   const [guestPhone, setGuestPhone] = useState("");

//   const [guestEmailChecked, setGuestEmailChecked] =
//     useState(false);

//   const [guestEmailExists, setGuestEmailExists] =
//     useState(false);

//   const [guestLoading, setGuestLoading] =
//     useState(false);

//   const [emailTimer, setEmailTimer] =
//     useState(null);

//   /* =========================================
//      CART SOURCE
//   ========================================= */

//   const cartItems = token
//     ? items
//     : getGuestCart() || [];

//   /* =========================================
//      INITIAL LOAD
//   ========================================= */

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchCart());
//       dispatch(fetchAddresses());
//       setCheckoutStep("address");
//     }

//     dispatch(clearPlacedOrder());
//   }, [dispatch, token]);

//   /* =========================================
//      AUTO SELECT ADDRESS
//   ========================================= */

//   useEffect(() => {
//     if (
//       addresses.length > 0 &&
//       !selectedAddressId
//     ) {
//       setSelectedAddressId(addresses[0].id);
//     }
//   }, [addresses, selectedAddressId]);

//   /* =========================================
//      EMAIL CHECK
//   ========================================= */

//   const handleEmailChange = (value) => {
//     const clean = value.trim();

//     setGuestEmail(clean);
//     setGuestEmailChecked(false);
//     setGuestEmailExists(false);
//     setGuestPassword("");
//     setGuestName("");
//     setGuestPhone("");

//     if (emailTimer) {
//       clearTimeout(emailTimer);
//     }

//     const timer = setTimeout(async () => {
//       if (
//         !clean ||
//         !/^\S+@\S+\.\S+$/.test(clean)
//       ) {
//         return;
//       }

//       try {
//         setGuestLoading(true);

//         const res =
//           await checkGuestEmailApi(clean);

//         setGuestEmailChecked(true);
//         setGuestEmailExists(res.exists);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setGuestLoading(false);
//       }
//     }, 500);

//     setEmailTimer(timer);
//   };

//   /* =========================================
//      LOGIN / REGISTER
//   ========================================= */

//   const handleGuestAuth = async () => {
//     try {
//       if (!guestEmailChecked) {
//         alert("Enter valid email");
//         return null;
//       }

//       if (!guestPassword) {
//         alert("Enter password");
//         return null;
//       }

//       const guestCartItems = getGuestCart().map(
//         (item) => ({
//           productId: item.productId,
//           quantity: item.quantity,
//         })
//       );

//       const res = await guestContinueApi({
//         email: guestEmail,
//         password: guestPassword,
//         name: guestName,
//         phone: guestPhone,
//         items: guestCartItems,
//       });

//       if (!res?.token) {
//         alert("Authentication failed");
//         return null;
//       }

//       dispatch(
//         setCredentials({
//           token: res.token,
//           userId: res.userId,
//           name: res.name,
//           email: res.email,
//           role: res.role,
//         })
//       );

//       await dispatch(mergeGuestCartAfterLogin());

//       await dispatch(fetchAddresses());

//       if (!res.existingUser) {
//         setForm((prev) => ({
//           ...prev,
//           fullName: guestName,
//           phone: guestPhone,
//         }));
//       }

//       setCheckoutStep("address");

//       setSuccessMessage(
//         res.existingUser
//           ? "Login successful. Continue checkout."
//           : "Account created successfully. Continue checkout."
//       );

//       return res.token;
//     } catch (err) {
//       console.error(err);

//       alert(
//         err?.response?.data?.message ||
//           "Authentication failed"
//       );

//       return null;
//     }
//   };

//   /* =========================================
//      SAVE ADDRESS
//   ========================================= */

//   const handleSaveAddress = async () => {
//     try {
//       if (!form.fullName.trim()) {
//         return alert("Full name required");
//       }

//       if (!/^[0-9]{10}$/.test(form.phone)) {
//         return alert("Phone must be 10 digits");
//       }

//       if (!form.line1.trim()) {
//         return alert("Address required");
//       }

//       if (!form.city.trim()) {
//         return alert("City required");
//       }

//       if (!form.state.trim()) {
//         return alert("State required");
//       }

//       if (!/^[0-9]{6}$/.test(form.pincode)) {
//         return alert("Pincode must be 6 digits");
//       }

//       const payload = {
//         fullName: form.fullName.trim(),
//         phone: form.phone.trim(),
//         line1: form.line1.trim(),
//         line2: form.line2?.trim() || "",
//         city: form.city.trim(),
//         state: form.state.trim(),
//         pincode: form.pincode.trim(),
//         country: "India",
//       };

//       const res = await dispatch(
//         createAddress(payload)
//       );

//       if (createAddress.fulfilled.match(res)) {
//         await dispatch(fetchAddresses());

//         setSelectedAddressId(res.payload.id);

//         setForm(initialForm);

//         alert("Address saved");
//       } else {
//         alert("Address failed");
//       }
//     } catch (err) {
//       console.error(err);

//       alert("Address failed");
//     }
//   };

//   /* =========================================
//      PLACE ORDER
//   ========================================= */

//   const handleOrder = async () => {
//     try {
//       if (!cartItems.length) {
//         return alert("Cart empty");
//       }

//       let currentToken = token;

//       if (!currentToken) {
//         currentToken = await handleGuestAuth();

//         if (!currentToken) {
//           return;
//         }
//       }

//       if (!selectedAddressId) {
//         return alert("Select address");
//       }

//       const result = await dispatch(
//         placeOrder({
//           addressId: selectedAddressId,
//           paymentMethod,
//         })
//       );

//       if (placeOrder.fulfilled.match(result)) {
//         setSuccessMessage(
//           `Order placed successfully. Order No: ${result.payload.orderNumber}`
//         );

//         dispatch(clearCart());
//       } else {
//         alert(
//           result?.payload?.message ||
//             "Order failed"
//         );
//       }
//     } catch (err) {
//       console.error(err);

//       alert("Checkout failed");
//     }
//   };

//   /* =========================================
//      UI
//   ========================================= */

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Checkout</h2>

//       {successMessage && (
//         <div
//           style={{
//             background: "#d1fae5",
//             padding: 10,
//             marginBottom: 15,
//           }}
//         >
//           {successMessage}
//         </div>
//       )}

//       {/* =====================================
//          EMAIL STEP
//       ===================================== */}

//       {checkoutStep === "email" && !token && (
//         <div>
//           <input
//             placeholder="Email"
//             value={guestEmail}
//             onChange={(e) =>
//               handleEmailChange(e.target.value)
//             }
//           />

//           {guestLoading && <p>Checking...</p>}

//           {guestEmailChecked && (
//             <>
//               <p>
//                 {guestEmailExists
//                   ? "Account found"
//                   : "New customer"}
//               </p>

//               <input
//                 type="password"
//                 placeholder={
//                   guestEmailExists
//                     ? "Enter password"
//                     : "Create password"
//                 }
//                 value={guestPassword}
//                 onChange={(e) =>
//                   setGuestPassword(e.target.value)
//                 }
//               />

//               {!guestEmailExists && (
//                 <>
//                   <input
//                     placeholder="Name"
//                     value={guestName}
//                     onChange={(e) =>
//                       setGuestName(e.target.value)
//                     }
//                   />

//                   <input
//                     placeholder="Phone"
//                     value={guestPhone}
//                     onChange={(e) =>
//                       setGuestPhone(e.target.value)
//                     }
//                   />
//                 </>
//               )}

//               <button
//                 onClick={handleGuestAuth}
//                 disabled={guestLoading}
//               >
//                 Continue
//               </button>
//             </>
//           )}
//         </div>
//       )}

//       {/* =====================================
//          ADDRESS STEP
//       ===================================== */}

//       {checkoutStep === "address" && token && (
//         <div>
//           <h3>Select Address</h3>

//           {addresses.map((a) => (
//             <div key={a.id}>
//               <input
//                 type="radio"
//                 checked={selectedAddressId === a.id}
//                 onChange={() =>
//                   setSelectedAddressId(a.id)
//                 }
//               />

//               {a.fullName}
//               {" - "}
//               {a.city}
//             </div>
//           ))}

//           <h4>Add New Address</h4>

//           <input
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 fullName: e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="Phone"
//             value={form.phone}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 phone: e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="Address Line 1"
//             value={form.line1}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 line1: e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="Address Line 2 / Landmark / Area (Optional)"
//             value={form.line2}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 line2: e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="City"
//             value={form.city}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 city: e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="State"
//             value={form.state}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 state: e.target.value,
//               })
//             }
//           />

//           <input
//             placeholder="Pincode"
//             value={form.pincode}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 pincode: e.target.value,
//               })
//             }
//           />

//           <button onClick={handleSaveAddress}>
//             Save Address
//           </button>

//           <div style={{ marginTop: 20 }}>
//             <h3>Payment Method</h3>

//             <label>
//               <input
//                 type="radio"
//                 value="COD"
//                 checked={paymentMethod === "COD"}
//                 onChange={(e) =>
//                   setPaymentMethod(e.target.value)
//                 }
//               />

//               Cash on Delivery
//             </label>
//           </div>
//         </div>
//       )}

//       <button
//         onClick={handleOrder}
//         disabled={loading}
//         style={{ marginTop: 20 }}
//       >
//         {loading ? "Processing..." : "Place Order"}
//       </button>
//     </div>
//   );
// }














































































































































































"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import {
  fetchCart,
  clearCart,
  mergeGuestCartAfterLogin,
} from "@/features/cart/cartSlice";

import {
  fetchAddresses,
  createAddress,
  setDefaultAddress,
} from "@/features/address/addressSlice";

import {
  clearPlacedOrder,
  placeOrder,
} from "@/features/orders/orderSlice";

import {
  fetchGiftSetCart,
  placeGiftSetOrder,
  createGiftSetRazorpayOrder,
  verifyGiftSetRazorpayPayment,
  clearPlacedGiftSetOrder,
} from "@/features/giftSet/giftSetSlice";

import {
  createRazorpayOrderApi,
  verifyRazorpayPaymentApi,
} from "@/features/payment/paymentApi";

import { applyCouponApi } from "@/features/coupons/couponApi";
import { loadRazorpayScript } from "@/lib/loadRazorpay";

import { setCredentials } from "@/features/auth/authSlice";

import { getGuestCart } from "@/lib/guestCart";

import {
  checkGuestEmailApi,
  guestContinueApi,
} from "@/features/guestCheckout/guestCheckoutApi";

const initialForm = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  isDefault: true,
};

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const source =
    searchParams.get("source") === "giftset"
      ? "giftset"
      : "cart";

  const isGiftSetMode = source === "giftset";

  const {
    token,
    user,
    loading: authLoading,
  } = useSelector((state) => state.auth);

  const {
    items: reduxCartItems = [],
    subtotal: cartSubtotal = 0,
    totalItems: cartTotalItems = 0,
    loading: cartLoading,
  } = useSelector((state) => state.cart);

  const {
    addresses = [],
    loading: addressLoading,
    error: addressError,
  } = useSelector((state) => state.address);

  const {
    placedOrder,
    loading: orderLoading,
    error: orderError,
  } = useSelector((state) => state.orders);

  const {
    summary: giftSetSummary,
    placedOrder: placedGiftSetOrder,
    loading: giftSetLoading,
    error: giftSetError,
  } = useSelector((state) => state.giftSet);

  const [checkoutStep, setCheckoutStep] = useState(
    token ? "address" : "email"
  );

  const [form, setForm] = useState(initialForm);
  const [selectedAddressId, setSelectedAddressId] =
    useState(null);

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [processingOnlinePayment, setProcessingOnlinePayment] =
    useState(false);

  const [isSubmittingOrder, setIsSubmittingOrder] =
    useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponResult, setCouponResult] = useState(null);

  const [mounted, setMounted] = useState(false);

  const [guestEmail, setGuestEmail] = useState("");
  const [guestPassword, setGuestPassword] =
    useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const [guestEmailChecked, setGuestEmailChecked] =
    useState(false);
  const [guestEmailExists, setGuestEmailExists] =
    useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [emailTimer, setEmailTimer] = useState(null);

  const guestCartItems = !token ? getGuestCart() || [] : [];

  const selectedAddress = useMemo(
    () =>
      addresses.find((a) => a.id === selectedAddressId) ||
      null,
    [addresses, selectedAddressId]
  );

  const checkoutItems = useMemo(() => {
    if (isGiftSetMode) {
      return giftSetSummary?.items || [];
    }

    return token ? reduxCartItems || [] : guestCartItems || [];
  }, [
    isGiftSetMode,
    giftSetSummary,
    reduxCartItems,
    guestCartItems,
    token,
  ]);

  const guestSubtotal = useMemo(() => {
    return guestCartItems.reduce((total, item) => {
      const price = Number(item.unitPrice || 0);
      const qty = Number(item.quantity || 1);
      return total + price * qty;
    }, 0);
  }, [guestCartItems]);

  const guestTotalItems = useMemo(() => {
    return guestCartItems.reduce((total, item) => {
      return total + Number(item.quantity || 1);
    }, 0);
  }, [guestCartItems]);

  const subtotal = isGiftSetMode
    ? Number(giftSetSummary?.subtotalInr || 0)
    : token
    ? Number(cartSubtotal || 0)
    : Number(guestSubtotal || 0);

  const totalItems = isGiftSetMode
    ? Number(giftSetSummary?.totalProducts || 0)
    : token
    ? Number(cartTotalItems || 0)
    : Number(guestTotalItems || 0);

  const baseDiscount = isGiftSetMode
    ? Number(giftSetSummary?.discountAmountInr || 0)
    : 0;

  const couponDiscount = couponResult?.valid
    ? Number(couponResult.discountAmount || 0)
    : 0;

  const finalTotal = Math.max(
    subtotal - baseDiscount - couponDiscount,
    0
  );

  const currentError = isGiftSetMode
    ? giftSetError
    : orderError;

  const disablePlaceOrder =
    isSubmittingOrder ||
    processingOnlinePayment ||
    orderLoading ||
    cartLoading ||
    giftSetLoading ||
    checkoutItems.length === 0;

  const pageTitle = isGiftSetMode
    ? "Gift Set Checkout"
    : "Secure Checkout";

  const pageDescription = isGiftSetMode
    ? "Complete your gift set order by selecting a delivery address, reviewing your gift bundle, and choosing your payment method."
    : "Complete your order by selecting a delivery address, reviewing your cart, and choosing your preferred payment method.";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch(clearPlacedOrder());
    dispatch(clearPlacedGiftSetOrder());
  }, [dispatch]);

  useEffect(() => {
    if (!mounted || authLoading) return;

    if (token) {
      setCheckoutStep("address");

      if (isGiftSetMode) {
        dispatch(fetchGiftSetCart());
      } else {
        dispatch(fetchCart());
      }

      dispatch(fetchAddresses());
    }
  }, [
    mounted,
    dispatch,
    token,
    authLoading,
    isGiftSetMode,
  ]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddress =
        addresses.find((a) => a.isDefault) || addresses[0];

      setSelectedAddressId(defaultAddress?.id || null);
    }
  }, [addresses, selectedAddressId]);

  useEffect(() => {
    if (!isGiftSetMode && placedOrder?.id) {
      const orderId = placedOrder.id;

      setSuccessMessage(
        `Order placed successfully. Your order number is ${placedOrder.orderNumber}.`
      );

      const timer = setTimeout(() => {
        dispatch(fetchCart());
        dispatch(clearPlacedOrder());
        dispatch(clearCart());
        router.replace(`/account/orders/${orderId}?success=cod`);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [placedOrder, dispatch, router, isGiftSetMode]);

  useEffect(() => {
    if (isGiftSetMode && placedGiftSetOrder?.id) {
      const orderId = placedGiftSetOrder.id;

      setSuccessMessage(
        `Gift set order placed successfully. Your order number is ${placedGiftSetOrder.orderNumber}.`
      );

      const timer = setTimeout(() => {
        dispatch(fetchGiftSetCart());
        dispatch(clearPlacedGiftSetOrder());
        router.replace(
          `/account/giftset-orders/${orderId}?success=cod`
        );
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [
    placedGiftSetOrder,
    dispatch,
    router,
    isGiftSetMode,
  ]);

  useEffect(() => {
    if (!couponResult?.valid) return;

    const expectedDiscount = Number(
      couponResult.discountAmount || 0
    );

    const couponFinalTotal = Number(
      couponResult.finalTotal || 0
    );

    const recalculatedFinal = Math.max(
      subtotal - expectedDiscount,
      0
    );

    if (
      Math.abs(recalculatedFinal - couponFinalTotal) >
      0.01
    ) {
      setCouponResult(null);
      setCouponError("Cart changed. Please apply coupon again.");
    }
  }, [subtotal, couponResult]);

  const handleEmailChange = (value) => {
    const clean = value.trim();

    setGuestEmail(clean);
    setGuestEmailChecked(false);
    setGuestEmailExists(false);
    setGuestPassword("");
    setGuestName("");
    setGuestPhone("");

    if (emailTimer) {
      clearTimeout(emailTimer);
    }

    const timer = setTimeout(async () => {
      if (!clean || !/^\S+@\S+\.\S+$/.test(clean)) {
        return;
      }

      try {
        setGuestLoading(true);

        const res = await checkGuestEmailApi(clean);

        setGuestEmailChecked(true);
        setGuestEmailExists(res.exists);
      } catch (err) {
        console.error(err);
      } finally {
        setGuestLoading(false);
      }
    }, 500);

    setEmailTimer(timer);
  };

  const handleGuestAuth = async () => {
    try {
      if (!guestEmailChecked) {
        alert("Enter valid email");
        return null;
      }

      if (!guestPassword) {
        alert("Enter password");
        return null;
      }

      if (!guestEmailExists) {
        if (!guestName.trim()) {
          alert("Name is required");
          return null;
        }

        if (!/^[0-9]{10}$/.test(guestPhone)) {
          alert("Phone must be 10 digits");
          return null;
        }
      }

      const guestCartPayloadItems = getGuestCart().map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const res = await guestContinueApi({
        email: guestEmail,
        password: guestPassword,
        name: guestName,
        phone: guestPhone,
        items: guestCartPayloadItems,
      });

      if (!res?.token) {
        alert("Authentication failed");
        return null;
      }

      dispatch(
        setCredentials({
          token: res.token,
          userId: res.userId,
          name: res.name,
          email: res.email,
          role: res.role,
        })
      );

      await dispatch(mergeGuestCartAfterLogin());

      if (isGiftSetMode) {
        await dispatch(fetchGiftSetCart());
      } else {
        await dispatch(fetchCart());
      }

      await dispatch(fetchAddresses());

      if (!res.existingUser) {
        setForm((prev) => ({
          ...prev,
          fullName: guestName,
          phone: guestPhone,
        }));
      }

      setCheckoutStep("address");

      setSuccessMessage(
        res.existingUser
          ? "Login successful. Continue checkout."
          : "Account created successfully. Continue checkout."
      );

      return res.token;
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Authentication failed"
      );

      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();

    if (!form.fullName.trim()) {
      alert("Full name is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      alert("Phone must be exactly 10 digits");
      return;
    }

    if (!form.line1.trim()) {
      alert("Address Line 1 is required");
      return;
    }

    if (!form.city.trim()) {
      alert("City is required");
      return;
    }

    if (!form.state.trim()) {
      alert("State is required");
      return;
    }

    if (!/^[0-9]{6}$/.test(form.pincode)) {
      alert("Pincode must be exactly 6 digits");
      return;
    }

    const payload = {
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      line1: form.line1.trim(),
      line2: form.line2?.trim() || "",
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode.trim(),
      country: form.country || "India",
      isDefault: form.isDefault,
    };

    const result = await dispatch(createAddress(payload));

    if (createAddress.fulfilled.match(result)) {
      setSelectedAddressId(result.payload.id);
      setForm(initialForm);
      dispatch(fetchAddresses());
      alert("Address saved successfully");
    } else {
      alert(result.payload || "Failed to save address");
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter coupon code");
      setCouponResult(null);
      return;
    }

    try {
      setCouponLoading(true);
      setCouponError("");

      const result = await applyCouponApi({
        code: couponCode.trim(),
        cartTotal: subtotal,
      });

      setCouponResult(result);
    } catch (err) {
      setCouponResult(null);
      setCouponError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Invalid coupon code"
      );
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponResult(null);
    setCouponError("");
  };

  const ensureAuthenticated = async () => {
    if (token) {
      return token;
    }

    return await handleGuestAuth();
  };

  const handleCodOrder = async () => {
    if (isGiftSetMode) {
      const result = await dispatch(
        placeGiftSetOrder({
          addressId: selectedAddressId,
          paymentMethod: "COD",
          couponCode: couponResult?.valid
            ? couponResult.code
            : null,
        })
      );

      if (placeGiftSetOrder.rejected.match(result)) {
        alert(result.payload || "Failed to place gift set COD order");
      }

      return;
    }

    const result = await dispatch(
      placeOrder({
        addressId: selectedAddressId,
        paymentMethod: "COD",
        couponCode: couponResult?.valid
          ? couponResult.code
          : null,
      })
    );

    if (placeOrder.rejected.match(result)) {
      alert(result.payload || "Failed to place COD order");
    }
  };

  const handleOnlinePayment = async () => {
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      setProcessingOnlinePayment(true);

      let razorpayOrder;

      if (isGiftSetMode) {
        const result = await dispatch(
          createGiftSetRazorpayOrder({
            addressId: selectedAddressId,
            couponCode: couponResult?.valid
              ? couponResult.code
              : null,
          })
        );

        if (createGiftSetRazorpayOrder.rejected.match(result)) {
          setProcessingOnlinePayment(false);
          alert(
            result.payload ||
              "Failed to create gift set payment order"
          );
          return;
        }

        razorpayOrder = result.payload;
      } else {
        razorpayOrder = await createRazorpayOrderApi({
          addressId: selectedAddressId,
          couponCode: couponResult?.valid
            ? couponResult.code
            : null,
        });
      }

      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          razorpayOrder.key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Trendz Firenze",
        description: isGiftSetMode
          ? "Gift Set Order Payment"
          : "Order Payment",
        order_id: razorpayOrder.razorpayOrderId,
        prefill: {
          name: user?.name || selectedAddress?.fullName || "",
          email: user?.email || guestEmail || "",
          contact: selectedAddress?.phone || guestPhone || "",
        },
        notes: {
          internalOrderId: String(razorpayOrder.orderId),
          couponCode: couponResult?.valid
            ? couponResult.code
            : "",
          source,
        },
        handler: async function (response) {
          try {
            if (isGiftSetMode) {
              const verifyAction = await dispatch(
                verifyGiftSetRazorpayPayment({
                  orderId: razorpayOrder.orderId,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId:
                    response.razorpay_payment_id,
                  razorpaySignature:
                    response.razorpay_signature,
                })
              );

              if (
                verifyGiftSetRazorpayPayment.fulfilled.match(
                  verifyAction
                )
              ) {
                setSuccessMessage(
                  verifyAction.payload.message ||
                    "Payment successful. Your gift set order has been confirmed."
                );

                dispatch(fetchGiftSetCart());

                setTimeout(() => {
                  router.replace(
                    `/account/giftset-orders/${verifyAction.payload.orderId}?success=paid`
                  );
                }, 1200);
              } else {
                alert(
                  verifyAction.payload ||
                    "Payment verification failed"
                );
              }
            } else {
              const verifyResponse =
                await verifyRazorpayPaymentApi({
                  orderId: razorpayOrder.orderId,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId:
                    response.razorpay_payment_id,
                  razorpaySignature:
                    response.razorpay_signature,
                });

              setSuccessMessage(
                verifyResponse.message ||
                  "Payment successful. Your order has been confirmed."
              );

              dispatch(fetchCart());
              dispatch(clearCart());

              setTimeout(() => {
                router.replace(
                  `/account/orders/${verifyResponse.orderId}?success=paid`
                );
              }, 1200);
            }
          } catch (err) {
            alert(
              err?.response?.data?.message ||
                err.message ||
                "Payment verification failed"
            );
          } finally {
            setProcessingOnlinePayment(false);
          }
        },
        modal: {
          ondismiss: function () {
            setProcessingOnlinePayment(false);
          },
        },
        theme: {
          color: "#111111",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setProcessingOnlinePayment(false);

      alert(
        err?.response?.data?.message ||
          err.message ||
          "Failed to start online payment"
      );
    }
  };

  const handlePlaceOrder = async () => {
    setSuccessMessage("");

    if (!checkoutItems.length) {
      alert(
        isGiftSetMode
          ? "Gift set cart is empty"
          : "Cart is empty"
      );
      return;
    }

    const currentToken = await ensureAuthenticated();

    if (!currentToken) {
      return;
    }

    if (!selectedAddressId) {
      alert("Please select address");
      return;
    }

    try {
      setIsSubmittingOrder(true);

      if (paymentMethod === "COD") {
        await handleCodOrder();
        return;
      }

      await handleOnlinePayment();
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  if (!mounted || authLoading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <>
      <div className="checkout-shell">
        <div className="checkout-bg-orb orb-one" />
        <div className="checkout-bg-orb orb-two" />
        <div className="checkout-grid-lines" />

        <div className="checkout-container">
          <div className="checkout-hero fade-up">
            <div className="checkout-hero-badge">
              {isGiftSetMode
                ? "Trendz Firenze Gift Set Checkout"
                : "Trendz Firenze Secure Checkout"}
            </div>

            <div className="checkout-hero-top">
              <div>
                <h1 className="checkout-title">{pageTitle}</h1>
                <p className="checkout-subtitle">
                  {pageDescription}
                </p>
              </div>

              <div className="checkout-stats">
                <div className="stat-card">
                  <span className="stat-label">Items</span>
                  <span className="stat-value">{totalItems}</span>
                </div>

                <div className="stat-card">
                  <span className="stat-label">Total</span>
                  <span className="stat-value">₹{finalTotal}</span>
                </div>
              </div>
            </div>
          </div>

          {successMessage && (
            <div className="success-banner fade-up">
              <div className="success-icon">✓</div>
              <div>{successMessage}</div>
            </div>
          )}

          <div className="checkout-layout">
            <div className="left-column">
              {checkoutStep === "email" && !token && (
                <section className="glass-card fade-up delay-1">
                  <div className="section-head">
                    <div>
                      <p className="section-kicker">Account</p>
                      <h2 className="section-title">
                        Continue Checkout
                      </h2>
                      <p className="section-desc">
                        Enter your email. If you already have an account,
                        continue with your password. New customers can create an
                        account instantly during checkout.
                      </p>
                    </div>
                  </div>

                  <input
                    placeholder="Email"
                    value={guestEmail}
                    onChange={(e) =>
                      handleEmailChange(e.target.value)
                    }
                    style={inputStyle}
                  />

                  {guestLoading && (
                    <p className="muted-text">Checking...</p>
                  )}

                  {guestEmailChecked && (
                    <>
                      <p className="muted-text">
                        {guestEmailExists
                          ? "Account found. Enter your password."
                          : "New customer. Create your account to continue."}
                      </p>

                      <input
                        type="password"
                        placeholder={
                          guestEmailExists
                            ? "Enter password"
                            : "Create password"
                        }
                        value={guestPassword}
                        onChange={(e) =>
                          setGuestPassword(e.target.value)
                        }
                        style={inputStyle}
                      />

                      {!guestEmailExists && (
                        <>
                          <input
                            placeholder="Name"
                            value={guestName}
                            onChange={(e) =>
                              setGuestName(e.target.value)
                            }
                            style={inputStyle}
                          />

                          <input
                            placeholder="Phone"
                            value={guestPhone}
                            onChange={(e) =>
                              setGuestPhone(e.target.value)
                            }
                            style={inputStyle}
                          />
                        </>
                      )}

                      <button
                        type="button"
                        onClick={handleGuestAuth}
                        disabled={guestLoading}
                        className="primary-btn submit-btn"
                      >
                        Continue
                      </button>
                    </>
                  )}
                </section>
              )}

              {checkoutStep === "address" && token && (
                <>
                  <section className="glass-card fade-up delay-1">
                    <div className="section-head">
                      <div>
                        <p className="section-kicker">Delivery</p>
                        <h2 className="section-title">
                          Select Address
                        </h2>
                        <p className="section-desc">
                          Choose your delivery location for this order.
                        </p>
                      </div>
                    </div>

                    {addressLoading ? (
                      <div className="empty-state">
                        Loading addresses...
                      </div>
                    ) : addresses.length === 0 ? (
                      <div className="empty-state">
                        No saved address yet.
                      </div>
                    ) : (
                      <div className="address-list">
                        {addresses.map((a) => {
                          const isSelected =
                            selectedAddressId === a.id;

                          return (
                            <label
                              key={a.id}
                              className={`address-card ${
                                isSelected ? "selected" : ""
                              }`}
                            >
                              <div className="address-left">
                                <input
                                  type="radio"
                                  name="selectedAddress"
                                  checked={isSelected}
                                  onChange={() =>
                                    setSelectedAddressId(a.id)
                                  }
                                  className="radio-input"
                                />

                                <div className="address-content">
                                  <div className="address-head">
                                    <strong className="address-name">
                                      {a.fullName}
                                    </strong>

                                    {a.isDefault && (
                                      <span className="pill success">
                                        Default
                                      </span>
                                    )}

                                    {isSelected && (
                                      <span className="pill dark">
                                        Selected
                                      </span>
                                    )}
                                  </div>

                                  <div className="address-body">
                                    <div>{a.phone}</div>
                                    <div>{a.line1}</div>
                                    {a.line2 && <div>{a.line2}</div>}
                                    <div>
                                      {a.city}, {a.state} - {a.pincode}
                                    </div>
                                    <div>{a.country}</div>
                                  </div>
                                </div>
                              </div>

                              {!a.isDefault && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(setDefaultAddress(a.id));
                                  }}
                                  className="secondary-btn small-btn"
                                >
                                  Make Default
                                </button>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {addressError && (
                      <p className="error-text">{addressError}</p>
                    )}
                  </section>

                  <form
                    onSubmit={handleCreateAddress}
                    className="glass-card fade-up delay-2"
                  >
                    <div className="section-head">
                      <div>
                        <p className="section-kicker">Address Book</p>
                        <h2 className="section-title">
                          Add New Address
                        </h2>
                        <p className="section-desc">
                          Save a delivery address for this and future orders.
                        </p>
                      </div>
                    </div>

                    <div className="form-grid two-col">
                      <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        style={inputStyle}
                      />

                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        style={inputStyle}
                      />
                    </div>

                    <input
                      name="line1"
                      value={form.line1}
                      onChange={handleChange}
                      placeholder="Address Line 1"
                      style={inputStyle}
                    />

                    <input
                      name="line2"
                      value={form.line2}
                      onChange={handleChange}
                      placeholder="Address Line 2 / Landmark / Area (Optional)"
                      style={inputStyle}
                    />

                    <div className="form-grid two-col">
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                        style={inputStyle}
                      />

                      <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="State"
                        style={inputStyle}
                      />
                    </div>

                    <div className="form-grid two-col">
                      <input
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        style={inputStyle}
                      />

                      <input
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="Country"
                        style={inputStyle}
                      />
                    </div>

                    <label className="checkbox-row">
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={form.isDefault}
                        onChange={handleChange}
                      />
                      <span>Set this as default address</span>
                    </label>

                    <button
                      type="submit"
                      className="primary-btn submit-btn"
                    >
                      Save Address
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="right-column fade-up delay-3">
              <aside className="summary-card">
                <div className="summary-header">
                  <div>
                    <p className="section-kicker">Review</p>
                    <h2 className="section-title">
                      Order Summary
                    </h2>
                    <p className="section-desc">
                      Review your order before placing it.
                    </p>
                  </div>
                </div>

                <div className="summary-items-box">
                  {cartLoading || giftSetLoading ? (
                    <p className="muted-text" style={{ margin: 0 }}>
                      Loading order...
                    </p>
                  ) : checkoutItems.length === 0 ? (
                    <p className="muted-text" style={{ margin: 0 }}>
                      {isGiftSetMode
                        ? "Your gift set cart is empty."
                        : "Your cart is empty."}
                    </p>
                  ) : isGiftSetMode ? (
                    checkoutItems.map((item, index) => (
                      <div
                        key={
                          item.cartItemId ||
                          `${item.productId}-${item.giftBoxId}-${index}`
                        }
                        className="summary-item"
                      >
                        <div className="summary-item-info">
                          <div className="summary-item-title">
                            {item.productTitle}
                          </div>
                          <div className="summary-item-meta">
                            Gift Box: {item.giftBoxName}
                          </div>
                        </div>
                        <div className="summary-item-price">
                          ₹{item.lineTotalInr}
                        </div>
                      </div>
                    ))
                  ) : (
                    checkoutItems.map((item, index) => {
                      const itemTitle =
                        item.title || item.productTitle || "Product";

                      const quantity = Number(item.quantity || 1);

                      const lineTotal =
                        item.lineTotal ??
                        Number(item.unitPrice || 0) * quantity;

                      return (
                        <div
                          key={item.itemId || item.id || index}
                          className="summary-item"
                        >
                          <div className="summary-item-info">
                            <div className="summary-item-title">
                              {itemTitle}
                            </div>
                            <div className="summary-item-meta">
                              Qty: {quantity}
                            </div>
                          </div>
                          <div className="summary-item-price">
                            ₹{lineTotal}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="summary-pricing">
                  <div style={summaryRowStyle}>
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>

                  <div style={summaryRowStyle}>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div style={summaryRowStyle}>
                    <span>Shipping</span>
                    <span className="green-text">Free</span>
                  </div>

                  {isGiftSetMode && baseDiscount > 0 && (
                    <div
                      style={{
                        ...summaryRowStyle,
                        color: "#166534",
                        fontWeight: 700,
                      }}
                    >
                      <span>Gift Set Discount</span>
                      <span>-₹{baseDiscount}</span>
                    </div>
                  )}

                  {couponResult?.valid && (
                    <div
                      style={{
                        ...summaryRowStyle,
                        color: "#166534",
                        fontWeight: 700,
                      }}
                    >
                      <span>Coupon ({couponResult.code})</span>
                      <span>-₹{couponResult.discountAmount}</span>
                    </div>
                  )}

                  <div className="total-row">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                {checkoutStep === "address" && token && (
                  <>
                    <div className="inner-panel">
                      <h3 className="inner-title">Coupon Code</h3>

                      <div className="coupon-row">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) =>
                            setCouponCode(e.target.value.toUpperCase())
                          }
                          placeholder="Enter coupon code"
                          className="coupon-input"
                        />

                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={couponLoading || !subtotal}
                          className="primary-btn coupon-btn"
                        >
                          {couponLoading ? "Applying..." : "Apply"}
                        </button>
                      </div>

                      {couponResult?.valid && (
                        <div className="coupon-applied-row">
                          <span className="pill success">
                            Applied: {couponResult.code}
                          </span>

                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="secondary-btn small-btn"
                          >
                            Remove Coupon
                          </button>
                        </div>
                      )}

                      {couponError && (
                        <p className="error-text">{couponError}</p>
                      )}
                    </div>

                    <div className="inner-panel">
                      <h3 className="inner-title">Payment Method</h3>

                      <label
                        className={`payment-card ${
                          paymentMethod === "COD" ? "active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === "COD"}
                          onChange={() => setPaymentMethod("COD")}
                        />

                        <div>
                          <div className="payment-title">
                            Cash on Delivery
                          </div>
                          <div className="payment-desc">
                            Pay with cash when your order is delivered.
                          </div>
                        </div>
                      </label>

                      <label
                        className={`payment-card ${
                          paymentMethod === "ONLINE" ? "active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === "ONLINE"}
                          onChange={() => setPaymentMethod("ONLINE")}
                        />

                        <div>
                          <div className="payment-title">
                            Online Payment
                          </div>
                          <div className="payment-desc">
                            Pay securely using Razorpay.
                          </div>
                        </div>
                      </label>
                    </div>

                    {currentError && (
                      <p className="error-text">{currentError}</p>
                    )}

                    <button
                      onClick={handlePlaceOrder}
                      disabled={disablePlaceOrder}
                      className={`place-order-btn ${
                        disablePlaceOrder ? "disabled" : ""
                      }`}
                    >
                      {isSubmittingOrder || processingOnlinePayment
                        ? "Processing..."
                        : paymentMethod === "COD"
                        ? isGiftSetMode
                          ? "Place Gift Set COD Order"
                          : "Place COD Order"
                        : "Pay Now"}
                    </button>

                    <p className="footer-note">
                      By continuing, you confirm that your order details,
                      address, and payment selection are correct.
                    </p>
                  </>
                )}

                {checkoutStep === "email" && !token && (
                  <button
                    type="button"
                    onClick={handleGuestAuth}
                    disabled={!guestEmailChecked || guestLoading}
                    className="place-order-btn"
                  >
                    Continue to Address
                  </button>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-shell {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: radial-gradient(
            circle at top left,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(248, 250, 252, 0.98) 32%,
            #f8fafc 100%
          );
        }

        .checkout-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 28px 24px 72px;
        }

        .checkout-bg-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(70px);
          opacity: 0.45;
          pointer-events: none;
        }

        .orb-one {
          width: 340px;
          height: 340px;
          background: rgba(17, 24, 39, 0.08);
          top: -80px;
          left: -70px;
          animation: floatOrb 9s ease-in-out infinite;
        }

        .orb-two {
          width: 420px;
          height: 420px;
          background: rgba(148, 163, 184, 0.14);
          right: -100px;
          top: 120px;
          animation: floatOrb 12s ease-in-out infinite;
        }

        .checkout-grid-lines {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              rgba(15, 23, 42, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(15, 23, 42, 0.03) 1px,
              transparent 1px
            );
          background-size: 36px 36px;
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.18),
            transparent 60%
          );
          pointer-events: none;
        }

        .checkout-hero {
          position: relative;
          margin-bottom: 28px;
          padding: 28px;
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 30px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.82)
          );
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(18px);
        }

        .checkout-hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(17, 24, 39, 0.06);
          border: 1px solid rgba(17, 24, 39, 0.08);
          color: #475569;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .checkout-hero-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          flex-wrap: wrap;
        }

        .checkout-title {
          margin: 0;
          font-size: clamp(2rem, 3vw, 3.3rem);
          line-height: 1.05;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.05em;
        }

        .checkout-subtitle {
          margin: 14px 0 0 0;
          max-width: 850px;
          font-size: 15px;
          line-height: 1.7;
          color: #64748b;
        }

        .checkout-stats {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .stat-card {
          min-width: 140px;
          padding: 16px 18px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
        }

        .stat-label {
          display: block;
          font-size: 12px;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .stat-value {
          display: block;
          font-size: 24px;
          color: #0f172a;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .success-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          padding: 16px 18px;
          border-radius: 20px;
          background: linear-gradient(180deg, #ecfdf3 0%, #f0fdf4 100%);
          color: #166534;
          border: 1px solid #bbf7d0;
          font-weight: 700;
          box-shadow: 0 12px 28px rgba(22, 101, 52, 0.08);
        }

        .success-icon {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #16a34a;
          color: #fff;
          font-weight: 900;
          flex-shrink: 0;
        }

        .checkout-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(380px, 0.8fr);
          gap: 30px;
          align-items: start;
        }

        .left-column {
          display: grid;
          gap: 24px;
        }

        .right-column {
          position: sticky;
          top: 18px;
        }

        .glass-card,
        .summary-card {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(226, 232, 240, 0.85);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(255, 255, 255, 0.92) 100%
          );
          box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(14px);
        }

        .glass-card,
        .summary-card {
          padding: 28px;
        }

        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 20px;
        }

        .section-kicker {
          margin: 0 0 8px 0;
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .section-title {
          margin: 0;
          font-size: 28px;
          line-height: 1.1;
          font-weight: 850;
          color: #0f172a;
          letter-spacing: -0.04em;
        }

        .section-desc {
          margin: 10px 0 0 0;
          font-size: 14px;
          line-height: 1.65;
          color: #64748b;
        }

        .empty-state {
          padding: 18px;
          border-radius: 18px;
          background: linear-gradient(180deg, #f8fafc 0%, #f9fafb 100%);
          color: #64748b;
          border: 1px solid #eef2f7;
        }

        .address-list {
          display: grid;
          gap: 14px;
        }

        .address-card {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          padding: 18px;
          border-radius: 22px;
          border: 1px solid #e5e7eb;
          background: linear-gradient(180deg, #ffffff 0%, #fcfcfd 100%);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease,
            border-color 0.25s ease, background 0.25s ease;
        }

        .address-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.06);
        }

        .address-card.selected {
          border: 1.5px solid #0f172a;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.09);
        }

        .address-left {
          display: flex;
          gap: 14px;
          flex: 1;
          min-width: 0;
        }

        .radio-input {
          margin-top: 4px;
          transform: scale(1.05);
        }

        .address-content {
          flex: 1;
          min-width: 0;
        }

        .address-head {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          margin-bottom: 10px;
        }

        .address-name {
          font-size: 16px;
          color: #0f172a;
          font-weight: 800;
        }

        .address-body {
          display: grid;
          gap: 4px;
          font-size: 14px;
          line-height: 1.55;
          color: #475569;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.03em;
        }

        .pill.success {
          background: #ecfdf3;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .pill.dark {
          background: #0f172a;
          color: #ffffff;
          border: 1px solid #0f172a;
        }

        .form-grid {
          display: grid;
          gap: 14px;
        }

        .two-col {
          grid-template-columns: 1fr 1fr;
        }

        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 16px;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }

        .primary-btn,
        .secondary-btn,
        .place-order-btn {
          transition: all 0.25s ease;
        }

        .primary-btn {
          border: none;
          background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
          color: #fff;
          cursor: pointer;
          font-weight: 800;
          box-shadow: 0 16px 34px rgba(17, 24, 39, 0.18);
        }

        .primary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 38px rgba(17, 24, 39, 0.22);
        }

        .submit-btn {
          margin-top: 20px;
          padding: 15px 20px;
          border-radius: 16px;
          font-size: 15px;
        }

        .secondary-btn {
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #111827;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
        }

        .secondary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 26px rgba(15, 23, 42, 0.08);
        }

        .small-btn {
          padding: 10px 13px;
          border-radius: 12px;
          font-size: 13px;
          white-space: nowrap;
        }

        .summary-header {
          margin-bottom: 18px;
        }

        .summary-items-box {
          border: 1px solid #eef2f7;
          border-radius: 22px;
          padding: 16px;
          background: linear-gradient(180deg, #f8fafc 0%, #fbfdff 100%);
          margin-bottom: 20px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid #e5e7eb;
        }

        .summary-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .summary-item-info {
          flex: 1;
          min-width: 0;
        }

        .summary-item-title {
          font-size: 15px;
          line-height: 1.5;
          font-weight: 700;
          color: #0f172a;
        }

        .summary-item-meta {
          margin-top: 5px;
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
        }

        .summary-item-price {
          white-space: nowrap;
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
        }

        .summary-pricing {
          border-top: 1px solid #e5e7eb;
          padding-top: 18px;
        }

        .total-row {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px dashed #cbd5e1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          font-weight: 900;
          color: #0f172a;
        }

        .total-row span:last-child {
          font-size: 30px;
          letter-spacing: -0.04em;
        }

        .inner-panel {
          margin-top: 24px;
          padding: 18px;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          background: linear-gradient(180deg, #fcfcfd 0%, #ffffff 100%);
        }

        .inner-title {
          margin: 0 0 14px 0;
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
        }

        .coupon-row {
          display: flex;
          gap: 10px;
        }

        .coupon-input {
          flex: 1;
          min-width: 0;
          padding: 13px 14px;
          border: 1px solid #d1d5db;
          border-radius: 14px;
          font-size: 14px;
          outline: none;
          background: #fff;
          color: #111827;
        }

        .coupon-input:focus {
          border-color: #0f172a;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
        }

        .coupon-btn {
          padding: 12px 18px;
          border-radius: 14px;
          font-size: 14px;
        }

        .coupon-btn:disabled {
          background: #9ca3af;
          box-shadow: none;
          cursor: not-allowed;
          transform: none;
        }

        .coupon-applied-row {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .payment-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 14px;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          background: #fff;
          cursor: pointer;
          transition: all 0.25s ease;
          margin-bottom: 10px;
        }

        .payment-card:last-child {
          margin-bottom: 0;
        }

        .payment-card.active {
          border: 1.5px solid #0f172a;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
        }

        .payment-title {
          font-size: 14px;
          font-weight: 800;
          color: #111827;
        }

        .payment-desc {
          margin-top: 3px;
          font-size: 12px;
          color: #6b7280;
        }

        .place-order-btn {
          width: 100%;
          margin-top: 24px;
          padding: 17px 18px;
          border: none;
          border-radius: 18px;
          background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
          color: #fff;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          letter-spacing: 0.01em;
          box-shadow: 0 18px 36px rgba(17, 24, 39, 0.2);
        }

        .place-order-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 22px 40px rgba(17, 24, 39, 0.24);
        }

        .place-order-btn.disabled,
        .place-order-btn:disabled {
          background: #9ca3af;
          box-shadow: none;
          cursor: not-allowed;
          transform: none;
        }

        .footer-note {
          margin: 14px 0 0 0;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
          line-height: 1.6;
        }

        .error-text {
          color: #dc2626;
          margin-top: 14px;
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 600;
        }

        .muted-text {
          color: #6b7280;
        }

        .green-text {
          color: #059669;
          font-weight: 800;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(14px);
          animation: fadeUp 0.65s ease forwards;
        }

        .delay-1 {
          animation-delay: 0.08s;
        }

        .delay-2 {
          animation-delay: 0.16s;
        }

        .delay-3 {
          animation-delay: 0.24s;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatOrb {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }

          50% {
            transform: translateY(18px) translateX(12px) scale(1.04);
          }
        }

        @media (max-width: 1200px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }

          .right-column {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .checkout-container {
            padding: 18px 14px 56px;
          }

          .checkout-hero,
          .glass-card,
          .summary-card {
            border-radius: 24px;
            padding: 20px;
          }

          .two-col {
            grid-template-columns: 1fr;
          }

          .coupon-row {
            flex-direction: column;
          }

          .checkout-stats {
            width: 100%;
          }

          .stat-card {
            flex: 1;
          }

          .address-card {
            flex-direction: column;
          }

          .small-btn {
            width: 100%;
          }

          .total-row span:last-child {
            font-size: 26px;
          }

          .section-title {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "14px 14px",
  marginTop: 14,
  border: "1px solid #d1d5db",
  borderRadius: 14,
  background: "#fff",
  color: "#111827",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.2s ease",
};

const summaryRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
  color: "#374151",
  fontSize: 14,
  fontWeight: 500,
};