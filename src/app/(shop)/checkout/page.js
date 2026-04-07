


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
//   createRazorpayOrderApi,
//   verifyRazorpayPaymentApi,
// } from "@/features/payment/paymentApi";
// import { applyCouponApi } from "@/features/coupons/couponApi";
// import { loadRazorpayScript } from "@/lib/loadRazorpay";
// import { useRouter } from "next/navigation";
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

//   const { token, user, loading: authLoading } = useSelector((state) => state.auth);

//   const {
//     items = [],
//     subtotal = 0,
//     totalItems = 0,
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

//   const [form, setForm] = useState(initialForm);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [processingOnlinePayment, setProcessingOnlinePayment] = useState(false);

//   const [couponCode, setCouponCode] = useState("");
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [couponError, setCouponError] = useState("");
//   const [couponResult, setCouponResult] = useState(null);

//   const [mounted, setMounted] = useState(false);

//   const selectedAddress = useMemo(
//     () => addresses.find((a) => a.id === selectedAddressId) || null,
//     [addresses, selectedAddressId]
//   );

//   const finalTotal = couponResult?.valid ? couponResult.finalTotal : subtotal;

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     dispatch(clearPlacedOrder());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!mounted || authLoading) return;

//     if (!token) {
//       redirectToLogin(router, "/checkout");
//       return;
//     }

//     dispatch(fetchCart());
//     dispatch(fetchAddresses());
//   }, [mounted, dispatch, token, authLoading, router]);

//   useEffect(() => {
//     if (addresses.length > 0) {
//       const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];
//       setSelectedAddressId(defaultAddress?.id || null);
//     }
//   }, [addresses]);

//   useEffect(() => {
//     if (placedOrder?.id) {
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
//   }, [placedOrder, dispatch, router]);

//   useEffect(() => {
//     if (!couponResult?.valid) return;

//     const currentSubtotal = Number(subtotal || 0);
//     const couponFinalTotal = Number(couponResult.finalTotal || 0);
//     const expectedDiscount = Number(couponResult.discountAmount || 0);
//     const recalculatedFinal = Math.max(currentSubtotal - expectedDiscount, 0);

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

//       const razorpayOrder = await createRazorpayOrderApi({
//         addressId: selectedAddressId,
//         couponCode: couponResult?.valid ? couponResult.code : null,
//       });

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: razorpayOrder.amount,
//         currency: razorpayOrder.currency,
//         name: "Trendz Firenze",
//         description: "Order Payment",
//         order_id: razorpayOrder.razorpayOrderId,
//         prefill: {
//           name: user?.name || selectedAddress?.fullName || "",
//           email: user?.email || "",
//           contact: selectedAddress?.phone || "",
//         },
//         notes: {
//           internalOrderId: String(razorpayOrder.orderId),
//           couponCode: couponResult?.valid ? couponResult.code : "",
//         },
//         handler: async function (response) {
//           try {
//             const verifyResponse = await verifyRazorpayPaymentApi({
//               orderId: razorpayOrder.orderId,
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//             });

//             setSuccessMessage(
//               verifyResponse.message ||
//                 "Payment successful. Your order has been confirmed."
//             );

//             dispatch(fetchCart());
//             dispatch(clearCart());

//             setTimeout(() => {
//               router.replace(`/account/orders/${verifyResponse.orderId}?success=paid`);
//             }, 1200);
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

//     if (!items.length) {
//       alert("Cart is empty");
//       return;
//     }

//     if (paymentMethod === "COD") {
//       await handleCodOrder();
//       return;
//     }

//     await handleOnlinePayment();
//   };

//   if (!mounted || authLoading) {
//     return <div style={{ padding: 20 }}>Loading...</div>;
//   }

//   if (!token) return null;

//   const disablePlaceOrder =
//     orderLoading || processingOnlinePayment || items.length === 0;

//   return (
//     <div
//       style={{
//         maxWidth: 1240,
//         margin: "0 auto",
//         padding: "32px 20px 60px",
//         background: "#f8fafc",
//         minHeight: "100vh",
//       }}
//     >
//       <div style={{ marginBottom: 24 }}>
//         <p
//           style={{
//             margin: 0,
//             fontSize: 13,
//             fontWeight: 600,
//             color: "#6b7280",
//             textTransform: "uppercase",
//             letterSpacing: "0.08em",
//           }}
//         >
//           Trendz Firenze Checkout
//         </p>

//         <h1
//           style={{
//             margin: "8px 0 0 0",
//             fontSize: 34,
//             lineHeight: 1.15,
//             fontWeight: 800,
//             color: "#111827",
//             letterSpacing: "-0.03em",
//           }}
//         >
//           Secure Checkout
//         </h1>

//         <p
//           style={{
//             margin: "10px 0 0 0",
//             fontSize: 15,
//             color: "#6b7280",
//             maxWidth: 720,
//           }}
//         >
//           Complete your order by selecting a delivery address, reviewing your cart,
//           and choosing your preferred payment method.
//         </p>
//       </div>

//       {successMessage && (
//         <div
//           style={{
//             marginBottom: 20,
//             padding: "16px 18px",
//             borderRadius: 16,
//             background: "linear-gradient(180deg, #ecfdf3 0%, #f0fdf4 100%)",
//             color: "#166534",
//             border: "1px solid #bbf7d0",
//             fontWeight: 600,
//             boxShadow: "0 8px 24px rgba(22,101,52,0.08)",
//           }}
//         >
//           {successMessage}
//         </div>
//       )}

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "minmax(0, 1.25fr) minmax(340px, 0.75fr)",
//           gap: 28,
//           alignItems: "start",
//         }}
//       >
//         <div style={{ display: "grid", gap: 22 }}>
//           <div
//             style={{
//               background: "#fff",
//               border: "1px solid #e5e7eb",
//               borderRadius: 22,
//               padding: 24,
//               boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
//             }}
//           >
//             <div style={{ marginBottom: 18 }}>
//               <h2
//                 style={{
//                   margin: 0,
//                   fontSize: 24,
//                   fontWeight: 750,
//                   color: "#111827",
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 Select Address
//               </h2>
//               <p
//                 style={{
//                   margin: "8px 0 0 0",
//                   fontSize: 14,
//                   color: "#6b7280",
//                 }}
//               >
//                 Choose your delivery location for this order.
//               </p>
//             </div>

//             {addressLoading ? (
//               <div
//                 style={{
//                   padding: 18,
//                   borderRadius: 14,
//                   background: "#f9fafb",
//                   color: "#6b7280",
//                   border: "1px solid #eef2f7",
//                 }}
//               >
//                 Loading addresses...
//               </div>
//             ) : addresses.length === 0 ? (
//               <div
//                 style={{
//                   padding: 18,
//                   borderRadius: 14,
//                   background: "#f9fafb",
//                   color: "#6b7280",
//                   border: "1px solid #eef2f7",
//                 }}
//               >
//                 No saved address yet.
//               </div>
//             ) : (
//               <div style={{ display: "grid", gap: 14 }}>
//                 {addresses.map((a) => {
//                   const isSelected = selectedAddressId === a.id;

//                   return (
//                     <label
//                       key={a.id}
//                       style={{
//                         border: isSelected
//                           ? "1.5px solid #111827"
//                           : "1px solid #e5e7eb",
//                         borderRadius: 18,
//                         padding: 16,
//                         cursor: "pointer",
//                         background: isSelected ? "#f9fafb" : "#fff",
//                         boxShadow: isSelected
//                           ? "0 10px 24px rgba(17,24,39,0.08)"
//                           : "0 2px 10px rgba(15,23,42,0.03)",
//                         transition: "all 0.2s ease",
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           gap: 16,
//                           alignItems: "flex-start",
//                         }}
//                       >
//                         <div style={{ display: "flex", gap: 12, flex: 1 }}>
//                           <input
//                             type="radio"
//                             name="selectedAddress"
//                             checked={isSelected}
//                             onChange={() => setSelectedAddressId(a.id)}
//                             style={{ marginTop: 4 }}
//                           />

//                           <div style={{ flex: 1 }}>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 flexWrap: "wrap",
//                                 gap: 8,
//                                 alignItems: "center",
//                                 marginBottom: 8,
//                               }}
//                             >
//                               <strong
//                                 style={{
//                                   fontSize: 16,
//                                   color: "#111827",
//                                   fontWeight: 700,
//                                 }}
//                               >
//                                 {a.fullName}
//                               </strong>

//                               {a.isDefault && (
//                                 <span
//                                   style={{
//                                     display: "inline-flex",
//                                     alignItems: "center",
//                                     padding: "4px 10px",
//                                     borderRadius: 999,
//                                     fontSize: 12,
//                                     fontWeight: 700,
//                                     background: "#ecfdf3",
//                                     color: "#166534",
//                                     border: "1px solid #bbf7d0",
//                                   }}
//                                 >
//                                   Default
//                                 </span>
//                               )}
//                             </div>

//                             <div
//                               style={{
//                                 display: "grid",
//                                 gap: 4,
//                                 fontSize: 14,
//                                 color: "#4b5563",
//                                 lineHeight: 1.5,
//                               }}
//                             >
//                               <div>{a.phone}</div>
//                               <div>{a.line1}</div>
//                               {a.line2 && <div>{a.line2}</div>}
//                               <div>
//                                 {a.city}, {a.state} - {a.pincode}
//                               </div>
//                               <div>{a.country}</div>
//                             </div>
//                           </div>
//                         </div>

//                         {!a.isDefault && (
//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               dispatch(setDefaultAddress(a.id));
//                             }}
//                             style={{
//                               border: "1px solid #d1d5db",
//                               background: "#fff",
//                               color: "#111827",
//                               borderRadius: 10,
//                               padding: "10px 12px",
//                               fontSize: 13,
//                               fontWeight: 600,
//                               cursor: "pointer",
//                               whiteSpace: "nowrap",
//                             }}
//                           >
//                             Make Default
//                           </button>
//                         )}
//                       </div>
//                     </label>
//                   );
//                 })}
//               </div>
//             )}

//             {addressError && (
//               <p
//                 style={{
//                   color: "#dc2626",
//                   marginTop: 14,
//                   marginBottom: 0,
//                   fontSize: 14,
//                   fontWeight: 500,
//                 }}
//               >
//                 {addressError}
//               </p>
//             )}
//           </div>

//           <form
//             onSubmit={handleCreateAddress}
//             style={{
//               background: "#fff",
//               border: "1px solid #e5e7eb",
//               borderRadius: 22,
//               padding: 24,
//               boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
//             }}
//           >
//             <div style={{ marginBottom: 18 }}>
//               <h2
//                 style={{
//                   margin: 0,
//                   fontSize: 24,
//                   fontWeight: 750,
//                   color: "#111827",
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 Add New Address
//               </h2>
//               <p
//                 style={{
//                   margin: "8px 0 0 0",
//                   fontSize: 14,
//                   color: "#6b7280",
//                 }}
//               >
//                 Save a delivery address for this and future orders.
//               </p>
//             </div>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 14,
//               }}
//             >
//               <input
//                 name="fullName"
//                 value={form.fullName}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 style={inputStyle}
//               />
//               <input
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//                 style={inputStyle}
//               />
//             </div>

//             <input
//               name="line1"
//               value={form.line1}
//               onChange={handleChange}
//               placeholder="Address Line 1"
//               style={inputStyle}
//             />
//             <input
//               name="line2"
//               value={form.line2}
//               onChange={handleChange}
//               placeholder="Address Line 2 (Optional)"
//               style={inputStyle}
//             />

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 14,
//               }}
//             >
//               <input
//                 name="city"
//                 value={form.city}
//                 onChange={handleChange}
//                 placeholder="City"
//                 style={inputStyle}
//               />
//               <input
//                 name="state"
//                 value={form.state}
//                 onChange={handleChange}
//                 placeholder="State"
//                 style={inputStyle}
//               />
//             </div>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 14,
//               }}
//             >
//               <input
//                 name="pincode"
//                 value={form.pincode}
//                 onChange={handleChange}
//                 placeholder="Pincode"
//                 style={inputStyle}
//               />
//               <input
//                 name="country"
//                 value={form.country}
//                 onChange={handleChange}
//                 placeholder="Country"
//                 style={inputStyle}
//               />
//             </div>

//             <label
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 10,
//                 marginTop: 16,
//                 fontSize: 14,
//                 fontWeight: 500,
//                 color: "#374151",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="isDefault"
//                 checked={form.isDefault}
//                 onChange={handleChange}
//               />
//               Set this as default address
//             </label>

//             <button
//               type="submit"
//               style={{
//                 marginTop: 18,
//                 border: "none",
//                 background: "#111827",
//                 color: "#fff",
//                 padding: "14px 18px",
//                 borderRadius: 14,
//                 fontSize: 15,
//                 fontWeight: 700,
//                 cursor: "pointer",
//                 boxShadow: "0 10px 24px rgba(17,24,39,0.16)",
//               }}
//             >
//               Save Address
//             </button>
//           </form>
//         </div>

//         <div
//           style={{
//             position: "sticky",
//             top: 20,
//           }}
//         >
//           <div
//             style={{
//               border: "1px solid #e5e7eb",
//               borderRadius: 24,
//               padding: 24,
//               background: "#ffffff",
//               boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
//               width: "100%",
//             }}
//           >
//             <div style={{ marginBottom: 20 }}>
//               <h2
//                 style={{
//                   margin: 0,
//                   fontSize: 26,
//                   fontWeight: 800,
//                   color: "#111827",
//                   letterSpacing: "-0.03em",
//                 }}
//               >
//                 Order Summary
//               </h2>
//               <p
//                 style={{
//                   margin: "8px 0 0 0",
//                   fontSize: 14,
//                   color: "#6b7280",
//                 }}
//               >
//                 Review your order before placing it.
//               </p>
//             </div>

//             <div
//               style={{
//                 border: "1px solid #eef2f7",
//                 borderRadius: 18,
//                 padding: 16,
//                 background: "#f9fafb",
//                 marginBottom: 20,
//               }}
//             >
//               {cartLoading ? (
//                 <p style={{ margin: 0, color: "#6b7280" }}>Loading cart...</p>
//               ) : items.length === 0 ? (
//                 <p style={{ margin: 0, color: "#6b7280" }}>Your cart is empty.</p>
//               ) : (
//                 items.map((item, index) => (
//                   <div
//                     key={item.itemId || item.id}
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       gap: 14,
//                       paddingBottom: 14,
//                       marginBottom: index !== items.length - 1 ? 14 : 0,
//                       borderBottom:
//                         index !== items.length - 1
//                           ? "1px solid #e5e7eb"
//                           : "none",
//                     }}
//                   >
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <div
//                         style={{
//                           fontSize: 15,
//                           fontWeight: 650,
//                           color: "#111827",
//                           lineHeight: 1.45,
//                         }}
//                       >
//                         {item.title}
//                       </div>
//                       <div
//                         style={{
//                           marginTop: 5,
//                           fontSize: 13,
//                           color: "#6b7280",
//                           fontWeight: 500,
//                         }}
//                       >
//                         Qty: {item.quantity}
//                       </div>
//                     </div>

//                     <div
//                       style={{
//                         fontSize: 15,
//                         fontWeight: 750,
//                         color: "#111827",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       ₹{item.lineTotal}
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             <div
//               style={{
//                 borderTop: "1px solid #e5e7eb",
//                 paddingTop: 16,
//               }}
//             >
//               <div style={summaryRowStyle}>
//                 <span>Items</span>
//                 <span>{totalItems}</span>
//               </div>

//               <div style={summaryRowStyle}>
//                 <span>Subtotal</span>
//                 <span>₹{subtotal}</span>
//               </div>

//               <div style={summaryRowStyle}>
//                 <span>Shipping</span>
//                 <span style={{ color: "#059669", fontWeight: 700 }}>Free</span>
//               </div>

//               {couponResult?.valid && (
//                 <div
//                   style={{
//                     ...summaryRowStyle,
//                     color: "#166534",
//                     fontWeight: 700,
//                   }}
//                 >
//                   <span>Coupon ({couponResult.code})</span>
//                   <span>-₹{couponResult.discountAmount}</span>
//                 </div>
//               )}

//               <div
//                 style={{
//                   marginTop: 16,
//                   paddingTop: 16,
//                   borderTop: "1px dashed #d1d5db",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <span
//                   style={{
//                     fontSize: 17,
//                     fontWeight: 800,
//                     color: "#111827",
//                   }}
//                 >
//                   Total
//                 </span>
//                 <span
//                   style={{
//                     fontSize: 28,
//                     fontWeight: 850,
//                     color: "#111827",
//                     letterSpacing: "-0.03em",
//                   }}
//                 >
//                   ₹{finalTotal}
//                 </span>
//               </div>
//             </div>

//             <div
//               style={{
//                 marginTop: 24,
//                 padding: 18,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: 18,
//                 background: "#fcfcfd",
//               }}
//             >
//               <h3
//                 style={{
//                   margin: "0 0 12px 0",
//                   fontSize: 18,
//                   fontWeight: 750,
//                   color: "#111827",
//                 }}
//               >
//                 Coupon Code
//               </h3>

//               <div style={{ display: "flex", gap: 10 }}>
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                   placeholder="Enter coupon code"
//                   style={{
//                     flex: 1,
//                     padding: "12px 14px",
//                     border: "1px solid #d1d5db",
//                     borderRadius: 12,
//                     fontSize: 14,
//                     outline: "none",
//                     background: "#fff",
//                     color: "#111827",
//                   }}
//                 />

//                 <button
//                   type="button"
//                   onClick={handleApplyCoupon}
//                   disabled={couponLoading || !subtotal}
//                   style={{
//                     padding: "12px 18px",
//                     border: "none",
//                     borderRadius: 12,
//                     background: couponLoading || !subtotal ? "#9ca3af" : "#111827",
//                     color: "#fff",
//                     cursor: couponLoading || !subtotal ? "not-allowed" : "pointer",
//                     fontWeight: 700,
//                     fontSize: 14,
//                   }}
//                 >
//                   {couponLoading ? "Applying..." : "Apply"}
//                 </button>
//               </div>

//               {couponResult?.valid && (
//                 <div
//                   style={{
//                     marginTop: 12,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     gap: 10,
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <span
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 700,
//                       color: "#166534",
//                       background: "#ecfdf3",
//                       border: "1px solid #bbf7d0",
//                       borderRadius: 999,
//                       padding: "6px 10px",
//                     }}
//                   >
//                     Applied: {couponResult.code}
//                   </span>

//                   <button
//                     type="button"
//                     onClick={handleRemoveCoupon}
//                     style={{
//                       padding: "9px 12px",
//                       border: "1px solid #d1d5db",
//                       borderRadius: 10,
//                       background: "#fff",
//                       color: "#111827",
//                       cursor: "pointer",
//                       fontWeight: 600,
//                       fontSize: 13,
//                     }}
//                   >
//                     Remove Coupon
//                   </button>
//                 </div>
//               )}

//               {couponError && (
//                 <p
//                   style={{
//                     color: "#dc2626",
//                     marginTop: 10,
//                     marginBottom: 0,
//                     fontSize: 14,
//                     fontWeight: 500,
//                   }}
//                 >
//                   {couponError}
//                 </p>
//               )}
//             </div>

//             <div
//               style={{
//                 marginTop: 24,
//                 padding: 18,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: 18,
//                 background: "#fcfcfd",
//               }}
//             >
//               <h3
//                 style={{
//                   margin: "0 0 14px 0",
//                   fontSize: 18,
//                   fontWeight: 750,
//                   color: "#111827",
//                 }}
//               >
//                 Payment Method
//               </h3>

//               <label
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 12,
//                   padding: "14px 14px",
//                   border:
//                     paymentMethod === "COD"
//                       ? "1.5px solid #111827"
//                       : "1px solid #e5e7eb",
//                   borderRadius: 14,
//                   background: paymentMethod === "COD" ? "#f9fafb" : "#fff",
//                   marginBottom: 10,
//                   cursor: "pointer",
//                 }}
//               >
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   checked={paymentMethod === "COD"}
//                   onChange={() => setPaymentMethod("COD")}
//                 />
//                 <div>
//                   <div
//                     style={{
//                       fontSize: 14,
//                       fontWeight: 700,
//                       color: "#111827",
//                     }}
//                   >
//                     Cash on Delivery
//                   </div>
//                   <div
//                     style={{
//                       marginTop: 3,
//                       fontSize: 12,
//                       color: "#6b7280",
//                     }}
//                   >
//                     Pay with cash when your order is delivered
//                   </div>
//                 </div>
//               </label>

//               <label
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 12,
//                   padding: "14px 14px",
//                   border:
//                     paymentMethod === "ONLINE"
//                       ? "1.5px solid #111827"
//                       : "1px solid #e5e7eb",
//                   borderRadius: 14,
//                   background: paymentMethod === "ONLINE" ? "#f9fafb" : "#fff",
//                   cursor: "pointer",
//                 }}
//               >
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   checked={paymentMethod === "ONLINE"}
//                   onChange={() => setPaymentMethod("ONLINE")}
//                 />
//                 <div>
//                   <div
//                     style={{
//                       fontSize: 14,
//                       fontWeight: 700,
//                       color: "#111827",
//                     }}
//                   >
//                     Online Payment
//                   </div>
//                   <div
//                     style={{
//                       marginTop: 3,
//                       fontSize: 12,
//                       color: "#6b7280",
//                     }}
//                   >
//                     Pay securely using Razorpay
//                   </div>
//                 </div>
//               </label>
//             </div>

//             {orderError && (
//               <p
//                 style={{
//                   color: "#dc2626",
//                   marginTop: 14,
//                   marginBottom: 0,
//                   fontSize: 14,
//                   fontWeight: 600,
//                 }}
//               >
//                 {orderError}
//               </p>
//             )}

//             <button
//               onClick={handlePlaceOrder}
//               disabled={disablePlaceOrder}
//               style={{
//                 width: "100%",
//                 marginTop: 24,
//                 padding: "16px 18px",
//                 border: "none",
//                 borderRadius: 16,
//                 background: disablePlaceOrder ? "#9ca3af" : "#111827",
//                 color: "#fff",
//                 fontSize: 15,
//                 fontWeight: 800,
//                 cursor: disablePlaceOrder ? "not-allowed" : "pointer",
//                 boxShadow: disablePlaceOrder
//                   ? "none"
//                   : "0 14px 30px rgba(17,24,39,0.18)",
//                 letterSpacing: "0.01em",
//               }}
//             >
//               {disablePlaceOrder
//                 ? "Processing..."
//                 : paymentMethod === "COD"
//                 ? "Place COD Order"
//                 : "Pay Now"}
//             </button>

//             <p
//               style={{
//                 margin: "12px 0 0 0",
//                 textAlign: "center",
//                 fontSize: 12,
//                 color: "#6b7280",
//                 lineHeight: 1.5,
//               }}
//             >
//               By continuing, you confirm that your order details, address, and
//               payment selection are correct.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
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









"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, clearCart } from "@/features/cart/cartSlice";
import {
  createAddress,
  fetchAddresses,
  setDefaultAddress,
} from "@/features/address/addressSlice";
import { clearPlacedOrder, placeOrder } from "@/features/orders/orderSlice";
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
import { useRouter, useSearchParams } from "next/navigation";
import { redirectToLogin } from "@/lib/authRedirect";

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

  const source = searchParams.get("source") === "giftset" ? "giftset" : "cart";
  const isGiftSetMode = source === "giftset";

  const { token, user, loading: authLoading } = useSelector((state) => state.auth);

  const {
    items: cartItems = [],
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

  const [form, setForm] = useState(initialForm);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [successMessage, setSuccessMessage] = useState("");
  const [processingOnlinePayment, setProcessingOnlinePayment] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponResult, setCouponResult] = useState(null);

  const [mounted, setMounted] = useState(false);

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId) || null,
    [addresses, selectedAddressId]
  );

  const checkoutItems = useMemo(() => {
    if (isGiftSetMode) return giftSetSummary?.items || [];
    return cartItems || [];
  }, [isGiftSetMode, giftSetSummary, cartItems]);

  const subtotal = isGiftSetMode
    ? Number(giftSetSummary?.subtotalInr || 0)
    : Number(cartSubtotal || 0);

  const totalItems = isGiftSetMode
    ? Number(giftSetSummary?.totalProducts || 0)
    : Number(cartTotalItems || 0);

  const baseDiscount = isGiftSetMode
    ? Number(giftSetSummary?.discountAmountInr || 0)
    : 0;

  const couponDiscount = couponResult?.valid
    ? Number(couponResult.discountAmount || 0)
    : 0;

  const finalTotal = Math.max(subtotal - baseDiscount - couponDiscount, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch(clearPlacedOrder());
    dispatch(clearPlacedGiftSetOrder());
  }, [dispatch]);

  useEffect(() => {
    if (!mounted || authLoading) return;

    if (!token) {
      redirectToLogin(router, isGiftSetMode ? "/checkout?source=giftset" : "/checkout");
      return;
    }

    if (isGiftSetMode) {
      dispatch(fetchGiftSetCart());
    } else {
      dispatch(fetchCart());
    }

    dispatch(fetchAddresses());
  }, [mounted, dispatch, token, authLoading, router, isGiftSetMode]);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddress?.id || null);
    }
  }, [addresses]);

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
        router.replace(`/account/giftset-orders/${orderId}?success=cod`);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [placedGiftSetOrder, dispatch, router, isGiftSetMode]);

  useEffect(() => {
    if (!couponResult?.valid) return;

    const expectedDiscount = Number(couponResult.discountAmount || 0);
    const couponFinalTotal = Number(couponResult.finalTotal || 0);
    const recalculatedFinal = Math.max(subtotal - expectedDiscount, 0);

    if (Math.abs(recalculatedFinal - couponFinalTotal) > 0.01) {
      setCouponResult(null);
      setCouponError("Cart changed. Please apply coupon again.");
    }
  }, [subtotal, couponResult]);

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

    const result = await dispatch(createAddress(form));

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

  const handleCodOrder = async () => {
    if (isGiftSetMode) {
      const result = await dispatch(
        placeGiftSetOrder({
          addressId: selectedAddressId,
          paymentMethod: "COD",
          couponCode: couponResult?.valid ? couponResult.code : null,
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
        couponCode: couponResult?.valid ? couponResult.code : null,
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
            couponCode: couponResult?.valid ? couponResult.code : null,
          })
        );

        if (createGiftSetRazorpayOrder.rejected.match(result)) {
          setProcessingOnlinePayment(false);
          alert(result.payload || "Failed to create gift set payment order");
          return;
        }

        razorpayOrder = result.payload;
      } else {
        razorpayOrder = await createRazorpayOrderApi({
          addressId: selectedAddressId,
          couponCode: couponResult?.valid ? couponResult.code : null,
        });
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || razorpayOrder.key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Trendz Firenze",
        description: isGiftSetMode ? "Gift Set Order Payment" : "Order Payment",
        order_id: razorpayOrder.razorpayOrderId,
        prefill: {
          name: user?.name || selectedAddress?.fullName || "",
          email: user?.email || "",
          contact: selectedAddress?.phone || "",
        },
        notes: {
          internalOrderId: String(razorpayOrder.orderId),
          couponCode: couponResult?.valid ? couponResult.code : "",
          source,
        },
        handler: async function (response) {
          try {
            if (isGiftSetMode) {
              const verifyAction = await dispatch(
                verifyGiftSetRazorpayPayment({
                  orderId: razorpayOrder.orderId,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                })
              );

              if (verifyGiftSetRazorpayPayment.fulfilled.match(verifyAction)) {
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
                alert(verifyAction.payload || "Payment verification failed");
              }
            } else {
              const verifyResponse = await verifyRazorpayPaymentApi({
                orderId: razorpayOrder.orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });

              setSuccessMessage(
                verifyResponse.message ||
                  "Payment successful. Your order has been confirmed."
              );

              dispatch(fetchCart());
              dispatch(clearCart());

              setTimeout(() => {
                router.replace(`/account/orders/${verifyResponse.orderId}?success=paid`);
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

    if (!selectedAddressId) {
      alert("Please select address");
      return;
    }

    if (!checkoutItems.length) {
      alert(isGiftSetMode ? "Gift set cart is empty" : "Cart is empty");
      return;
    }

    if (paymentMethod === "COD") {
      await handleCodOrder();
      return;
    }

    await handleOnlinePayment();
  };

  if (!mounted || authLoading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  if (!token) return null;

  const disablePlaceOrder =
    orderLoading || giftSetLoading || processingOnlinePayment || checkoutItems.length === 0;

  const pageTitle = isGiftSetMode ? "Gift Set Checkout" : "Secure Checkout";
  const pageDescription = isGiftSetMode
    ? "Complete your gift set order by selecting a delivery address, reviewing your gift bundle, and choosing your payment method."
    : "Complete your order by selecting a delivery address, reviewing your cart, and choosing your preferred payment method.";

  const currentError = isGiftSetMode ? giftSetError : orderError;

  return (
    <div
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "32px 20px 60px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 600,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Trendz Firenze {isGiftSetMode ? "Gift Set" : ""} Checkout
        </p>

        <h1
          style={{
            margin: "8px 0 0 0",
            fontSize: 34,
            lineHeight: 1.15,
            fontWeight: 800,
            color: "#111827",
            letterSpacing: "-0.03em",
          }}
        >
          {pageTitle}
        </h1>

        <p
          style={{
            margin: "10px 0 0 0",
            fontSize: 15,
            color: "#6b7280",
            maxWidth: 720,
          }}
        >
          {pageDescription}
        </p>
      </div>

      {successMessage && (
        <div
          style={{
            marginBottom: 20,
            padding: "16px 18px",
            borderRadius: 16,
            background: "linear-gradient(180deg, #ecfdf3 0%, #f0fdf4 100%)",
            color: "#166534",
            border: "1px solid #bbf7d0",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(22,101,52,0.08)",
          }}
        >
          {successMessage}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.25fr) minmax(340px, 0.75fr)",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div style={{ display: "grid", gap: 22 }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 22,
              padding: 24,
              boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
            }}
          >
            <div style={{ marginBottom: 18 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 24,
                  fontWeight: 750,
                  color: "#111827",
                  letterSpacing: "-0.02em",
                }}
              >
                Select Address
              </h2>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: 14,
                  color: "#6b7280",
                }}
              >
                Choose your delivery location for this order.
              </p>
            </div>

            {addressLoading ? (
              <div
                style={{
                  padding: 18,
                  borderRadius: 14,
                  background: "#f9fafb",
                  color: "#6b7280",
                  border: "1px solid #eef2f7",
                }}
              >
                Loading addresses...
              </div>
            ) : addresses.length === 0 ? (
              <div
                style={{
                  padding: 18,
                  borderRadius: 14,
                  background: "#f9fafb",
                  color: "#6b7280",
                  border: "1px solid #eef2f7",
                }}
              >
                No saved address yet.
              </div>
            ) : (
              <div style={{ display: "grid", gap: 14 }}>
                {addresses.map((a) => {
                  const isSelected = selectedAddressId === a.id;

                  return (
                    <label
                      key={a.id}
                      style={{
                        border: isSelected
                          ? "1.5px solid #111827"
                          : "1px solid #e5e7eb",
                        borderRadius: 18,
                        padding: 16,
                        cursor: "pointer",
                        background: isSelected ? "#f9fafb" : "#fff",
                        boxShadow: isSelected
                          ? "0 10px 24px rgba(17,24,39,0.08)"
                          : "0 2px 10px rgba(15,23,42,0.03)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 16,
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={{ display: "flex", gap: 12, flex: 1 }}>
                          <input
                            type="radio"
                            name="selectedAddress"
                            checked={isSelected}
                            onChange={() => setSelectedAddressId(a.id)}
                            style={{ marginTop: 4 }}
                          />

                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 8,
                                alignItems: "center",
                                marginBottom: 8,
                              }}
                            >
                              <strong
                                style={{
                                  fontSize: 16,
                                  color: "#111827",
                                  fontWeight: 700,
                                }}
                              >
                                {a.fullName}
                              </strong>

                              {a.isDefault && (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "4px 10px",
                                    borderRadius: 999,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    background: "#ecfdf3",
                                    color: "#166534",
                                    border: "1px solid #bbf7d0",
                                  }}
                                >
                                  Default
                                </span>
                              )}
                            </div>

                            <div
                              style={{
                                display: "grid",
                                gap: 4,
                                fontSize: 14,
                                color: "#4b5563",
                                lineHeight: 1.5,
                              }}
                            >
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
                            style={{
                              border: "1px solid #d1d5db",
                              background: "#fff",
                              color: "#111827",
                              borderRadius: 10,
                              padding: "10px 12px",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Make Default
                          </button>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {addressError && (
              <p
                style={{
                  color: "#dc2626",
                  marginTop: 14,
                  marginBottom: 0,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {addressError}
              </p>
            )}
          </div>

          <form
            onSubmit={handleCreateAddress}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 22,
              padding: 24,
              boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
            }}
          >
            <div style={{ marginBottom: 18 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 24,
                  fontWeight: 750,
                  color: "#111827",
                  letterSpacing: "-0.02em",
                }}
              >
                Add New Address
              </h2>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: 14,
                  color: "#6b7280",
                }}
              >
                Save a delivery address for this and future orders.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
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
              placeholder="Address Line 2 (Optional)"
              style={inputStyle}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
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

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
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

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 16,
                fontSize: 14,
                fontWeight: 500,
                color: "#374151",
              }}
            >
              <input
                type="checkbox"
                name="isDefault"
                checked={form.isDefault}
                onChange={handleChange}
              />
              Set this as default address
            </label>

            <button
              type="submit"
              style={{
                marginTop: 18,
                border: "none",
                background: "#111827",
                color: "#fff",
                padding: "14px 18px",
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(17,24,39,0.16)",
              }}
            >
              Save Address
            </button>
          </form>
        </div>

        <div
          style={{
            position: "sticky",
            top: 20,
          }}
        >
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 24,
              padding: 24,
              background: "#ffffff",
              boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
              width: "100%",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "-0.03em",
                }}
              >
                Order Summary
              </h2>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: 14,
                  color: "#6b7280",
                }}
              >
                Review your order before placing it.
              </p>
            </div>

            <div
              style={{
                border: "1px solid #eef2f7",
                borderRadius: 18,
                padding: 16,
                background: "#f9fafb",
                marginBottom: 20,
              }}
            >
              {cartLoading || giftSetLoading ? (
                <p style={{ margin: 0, color: "#6b7280" }}>Loading order...</p>
              ) : checkoutItems.length === 0 ? (
                <p style={{ margin: 0, color: "#6b7280" }}>
                  {isGiftSetMode ? "Your gift set cart is empty." : "Your cart is empty."}
                </p>
              ) : isGiftSetMode ? (
                checkoutItems.map((item, index) => (
                  <div
                    key={item.cartItemId || `${item.productId}-${item.giftBoxId}-${index}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 14,
                      paddingBottom: 14,
                      marginBottom: index !== checkoutItems.length - 1 ? 14 : 0,
                      borderBottom:
                        index !== checkoutItems.length - 1
                          ? "1px solid #e5e7eb"
                          : "none",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 650,
                          color: "#111827",
                          lineHeight: 1.45,
                        }}
                      >
                        {item.productTitle}
                      </div>
                      <div
                        style={{
                          marginTop: 5,
                          fontSize: 13,
                          color: "#6b7280",
                          fontWeight: 500,
                        }}
                      >
                        Gift Box: {item.giftBoxName}
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 750,
                        color: "#111827",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₹{item.lineTotalInr}
                    </div>
                  </div>
                ))
              ) : (
                checkoutItems.map((item, index) => (
                  <div
                    key={item.itemId || item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 14,
                      paddingBottom: 14,
                      marginBottom: index !== checkoutItems.length - 1 ? 14 : 0,
                      borderBottom:
                        index !== checkoutItems.length - 1
                          ? "1px solid #e5e7eb"
                          : "none",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 650,
                          color: "#111827",
                          lineHeight: 1.45,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          marginTop: 5,
                          fontSize: 13,
                          color: "#6b7280",
                          fontWeight: 500,
                        }}
                      >
                        Qty: {item.quantity}
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 750,
                        color: "#111827",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₹{item.lineTotal}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: 16,
              }}
            >
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
                <span style={{ color: "#059669", fontWeight: 700 }}>Free</span>
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

              <div
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: "1px dashed #d1d5db",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 850,
                    color: "#111827",
                    letterSpacing: "-0.03em",
                  }}
                >
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                padding: 18,
                border: "1px solid #e5e7eb",
                borderRadius: 18,
                background: "#fcfcfd",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px 0",
                  fontSize: 18,
                  fontWeight: 750,
                  color: "#111827",
                }}
              >
                Coupon Code
              </h3>

              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    border: "1px solid #d1d5db",
                    borderRadius: 12,
                    fontSize: 14,
                    outline: "none",
                    background: "#fff",
                    color: "#111827",
                  }}
                />

                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || !subtotal}
                  style={{
                    padding: "12px 18px",
                    border: "none",
                    borderRadius: 12,
                    background: couponLoading || !subtotal ? "#9ca3af" : "#111827",
                    color: "#fff",
                    cursor: couponLoading || !subtotal ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {couponLoading ? "Applying..." : "Apply"}
                </button>
              </div>

              {couponResult?.valid && (
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#166534",
                      background: "#ecfdf3",
                      border: "1px solid #bbf7d0",
                      borderRadius: 999,
                      padding: "6px 10px",
                    }}
                  >
                    Applied: {couponResult.code}
                  </span>

                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    style={{
                      padding: "9px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: 10,
                      background: "#fff",
                      color: "#111827",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    Remove Coupon
                  </button>
                </div>
              )}

              {couponError && (
                <p
                  style={{
                    color: "#dc2626",
                    marginTop: 10,
                    marginBottom: 0,
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {couponError}
                </p>
              )}
            </div>

            <div
              style={{
                marginTop: 24,
                padding: 18,
                border: "1px solid #e5e7eb",
                borderRadius: 18,
                background: "#fcfcfd",
              }}
            >
              <h3
                style={{
                  margin: "0 0 14px 0",
                  fontSize: 18,
                  fontWeight: 750,
                  color: "#111827",
                }}
              >
                Payment Method
              </h3>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 14px",
                  border:
                    paymentMethod === "COD"
                      ? "1.5px solid #111827"
                      : "1px solid #e5e7eb",
                  borderRadius: 14,
                  background: paymentMethod === "COD" ? "#f9fafb" : "#fff",
                  marginBottom: 10,
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    Cash on Delivery
                  </div>
                  <div
                    style={{
                      marginTop: 3,
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    Pay with cash when your order is delivered
                  </div>
                </div>
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 14px",
                  border:
                    paymentMethod === "ONLINE"
                      ? "1.5px solid #111827"
                      : "1px solid #e5e7eb",
                  borderRadius: 14,
                  background: paymentMethod === "ONLINE" ? "#f9fafb" : "#fff",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "ONLINE"}
                  onChange={() => setPaymentMethod("ONLINE")}
                />
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    Online Payment
                  </div>
                  <div
                    style={{
                      marginTop: 3,
                      fontSize: 12,
                      color: "#6b7280",
                    }}
                  >
                    Pay securely using Razorpay
                  </div>
                </div>
              </label>
            </div>

            {currentError && (
              <p
                style={{
                  color: "#dc2626",
                  marginTop: 14,
                  marginBottom: 0,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {currentError}
              </p>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={disablePlaceOrder}
              style={{
                width: "100%",
                marginTop: 24,
                padding: "16px 18px",
                border: "none",
                borderRadius: 16,
                background: disablePlaceOrder ? "#9ca3af" : "#111827",
                color: "#fff",
                fontSize: 15,
                fontWeight: 800,
                cursor: disablePlaceOrder ? "not-allowed" : "pointer",
                boxShadow: disablePlaceOrder
                  ? "none"
                  : "0 14px 30px rgba(17,24,39,0.18)",
                letterSpacing: "0.01em",
              }}
            >
              {disablePlaceOrder
                ? "Processing..."
                : paymentMethod === "COD"
                ? isGiftSetMode
                  ? "Place Gift Set COD Order"
                  : "Place COD Order"
                : "Pay Now"}
            </button>

            <p
              style={{
                margin: "12px 0 0 0",
                textAlign: "center",
                fontSize: 12,
                color: "#6b7280",
                lineHeight: 1.5,
              }}
            >
              By continuing, you confirm that your order details, address, and
              payment selection are correct.
            </p>
          </div>
        </div>
      </div>
    </div>
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