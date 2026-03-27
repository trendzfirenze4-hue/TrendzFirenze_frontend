// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { fetchMyOrders } from "@/features/orders/orderSlice";

// export default function MyOrdersPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { orders, loading, error } = useSelector((state) => state.orders);

//   useEffect(() => {
//     dispatch(fetchMyOrders());
//   }, [dispatch]);

//   if (loading) {
//     return <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>Loading orders...</div>;
//   }

//   return (
//     <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
//       <h1>My Orders</h1>

//       {error && (
//         <p style={{ color: "red", marginBottom: 16 }}>{error}</p>
//       )}

//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <div style={{ display: "grid", gap: 16 }}>
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               style={{
//                 border: "1px solid #ddd",
//                 borderRadius: 12,
//                 padding: 16,
//                 background: "#fff",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   gap: 16,
//                   flexWrap: "wrap",
//                   marginBottom: 12,
//                 }}
//               >
//                 <div>
//                   <h3 style={{ margin: 0 }}>{order.orderNumber}</h3>
//                   <p style={{ margin: "6px 0 0" }}>
//                     Status: <strong>{order.status}</strong>
//                   </p>
//                   <p style={{ margin: "6px 0 0" }}>
//                     Payment: <strong>{order.paymentMethod}</strong>
//                   </p>
//                 </div>

//                 <div style={{ textAlign: "right" }}>
//                   <p style={{ margin: 0 }}>
//                     Total: <strong>₹{order.totalAmount}</strong>
//                   </p>
//                   <p style={{ margin: "6px 0 0" }}>
//                     Items: {order.items?.length || 0}
//                   </p>
//                 </div>
//               </div>

//               <div
//                 style={{
//                   borderTop: "1px solid #eee",
//                   paddingTop: 12,
//                   marginTop: 12,
//                 }}
//               >
//                 <p style={{ margin: "0 0 10px" }}>
//                   <strong>Delivery Address:</strong>
//                 </p>
//                 <p style={{ margin: 0 }}>{order.addressFullName}</p>
//                 <p style={{ margin: "4px 0" }}>{order.addressPhone}</p>
//                 <p style={{ margin: "4px 0" }}>
//                   {order.addressLine1}
//                   {order.addressLine2 ? `, ${order.addressLine2}` : ""}
//                 </p>
//                 <p style={{ margin: "4px 0" }}>
//                   {order.addressCity}, {order.addressState} - {order.addressPincode}
//                 </p>
//                 <p style={{ margin: "4px 0 0" }}>{order.addressCountry}</p>
//               </div>

//               <div style={{ marginTop: 16 }}>
//                 {order.items.map((item) => (
//                   <div
//                     key={item.id}
//                     style={{
//                       display: "flex",
//                       gap: 12,
//                       alignItems: "center",
//                       marginBottom: 12,
//                       border: "1px solid #f1f1f1",
//                       borderRadius: 10,
//                       padding: 10,
//                     }}
//                   >
//                     <img
//                       src={
//                         item.imageUrl
//                           ? `${process.env.NEXT_PUBLIC_API_BASE}${item.imageUrl}`
//                           : "/placeholder.png"
//                       }
//                       alt={item.productTitle}
//                       width={70}
//                       height={70}
//                       style={{
//                         objectFit: "cover",
//                         borderRadius: 8,
//                         flexShrink: 0,
//                       }}
//                     />

//                     <div style={{ flex: 1 }}>
//                       <div style={{ fontWeight: 600 }}>{item.productTitle}</div>
//                       <small>
//                         Qty: {item.quantity} | Unit: ₹{item.unitPrice} | Total: ₹{item.lineTotal}
//                       </small>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={() => router.push(`/account/orders/${order.id}`)}
//                 style={{
//                   marginTop: 12,
//                   padding: "10px 14px",
//                   border: "1px solid #111",
//                   borderRadius: 8,
//                   background: "#111",
//                   color: "#fff",
//                   cursor: "pointer",
//                 }}
//               >
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchMyOrders } from "@/features/orders/orderSlice";

export default function MyOrdersPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { token, loading: authLoading } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (authLoading) return;

    if (!token) {
      router.replace("/login?next=/account/orders");
      return;
    }

    dispatch(fetchMyOrders());
  }, [dispatch, token, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
        Loading orders...
      </div>
    );
  }

  if (!token) return null;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      <h1>My Orders</h1>

      {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
                background: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>{order.orderNumber}</h3>
                  <p style={{ margin: "6px 0 0" }}>
                    Status: <strong>{order.status}</strong>
                  </p>
                  <p style={{ margin: "6px 0 0" }}>
                    Payment: <strong>{order.paymentMethod}</strong>
                  </p>
                  <p style={{ margin: "6px 0 0" }}>
                    Payment Status: <strong>{order.paymentStatus || "PENDING"}</strong>
                  </p>
                  {order.createdAt && (
                    <p style={{ margin: "6px 0 0" }}>
                      Ordered On:{" "}
                      <strong>{new Date(order.createdAt).toLocaleString("en-IN")}</strong>
                    </p>
                  )}
                </div>

                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0 }}>
                    Total: <strong>₹{order.totalAmount}</strong>
                  </p>
                  <p style={{ margin: "6px 0 0" }}>
                    Items: {order.items?.length || 0}
                  </p>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid #eee",
                  paddingTop: 12,
                  marginTop: 12,
                }}
              >
                <p style={{ margin: "0 0 10px" }}>
                  <strong>Delivery Address:</strong>
                </p>
                <p style={{ margin: 0 }}>{order.addressFullName}</p>
                <p style={{ margin: "4px 0" }}>{order.addressPhone}</p>
                <p style={{ margin: "4px 0" }}>
                  {order.addressLine1}
                  {order.addressLine2 ? `, ${order.addressLine2}` : ""}
                </p>
                <p style={{ margin: "4px 0" }}>
                  {order.addressCity}, {order.addressState} - {order.addressPincode}
                </p>
                <p style={{ margin: "4px 0 0" }}>{order.addressCountry}</p>
              </div>

              <div style={{ marginTop: 16 }}>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      marginBottom: 12,
                      border: "1px solid #f1f1f1",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <img
                      src={
                        item.imageUrl
                          ? `${process.env.NEXT_PUBLIC_API_BASE}${item.imageUrl}`
                          : "/placeholder.png"
                      }
                      alt={item.productTitle}
                      width={70}
                      height={70}
                      style={{
                        objectFit: "cover",
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{item.productTitle}</div>
                      <small>
                        Qty: {item.quantity} | Unit: ₹{item.unitPrice} | Total: ₹{item.lineTotal}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push(`/account/orders/${order.id}`)}
                style={{
                  marginTop: 12,
                  padding: "10px 14px",
                  border: "1px solid #111",
                  borderRadius: 8,
                  background: "#111",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}