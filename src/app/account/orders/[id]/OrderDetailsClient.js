"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  clearSelectedOrder,
  fetchMyOrderById,
} from "@/features/orders/orderSlice";

export default function OrderDetailsClient() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { token } = useSelector((state) => state.auth);
  const { selectedOrder, loading, error } = useSelector((state) => state.orders);

  const successType = searchParams.get("success");

  useEffect(() => {
    if (!token) {
      router.replace(`/login?next=/account/orders/${params.id}`);
      return;
    }

    if (params?.id) {
      dispatch(fetchMyOrderById(params.id));
    }

    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [dispatch, token, params?.id, router]);

  if (!token) return null;

  if (loading) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
        Loading order details...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
        <p>Order not found.</p>
      </div>
    );
  }

  const order = selectedOrder;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      {/* SUCCESS MESSAGE */}
      {successType === "cod" && (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            borderRadius: 10,
            background: "#e8f7e8",
            color: "#136c13",
            border: "1px solid #b7e3b7",
          }}
        >
          Your Cash on Delivery order has been placed successfully.
        </div>
      )}

      {successType === "paid" && (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            borderRadius: 10,
            background: "#e8f7e8",
            color: "#136c13",
            border: "1px solid #b7e3b7",
          }}
        >
          Payment successful. Your order has been confirmed.
        </div>
      )}

      {/* BACK BUTTON */}
      <button
        onClick={() => router.push("/account/orders")}
        style={{
          marginBottom: 16,
          padding: "10px 14px",
          border: "1px solid #ccc",
          borderRadius: 8,
          background: "#fff",
          cursor: "pointer",
        }}
      >
        ← Back to Orders
      </button>

      {/* ORDER SUMMARY */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>{order.orderNumber}</h1>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Payment Method: <strong>{order.paymentMethod}</strong></p>
            <p>
              Payment Status:{" "}
              <strong>{order.paymentStatus || "PENDING"}</strong>
            </p>
            {order.createdAt && (
              <p>
                Ordered On:{" "}
                <strong>
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </strong>
              </p>
            )}
          </div>

          <div style={{ textAlign: "right" }}>
            <p>Subtotal: ₹{order.subtotalAmount}</p>
            <p>Shipping: ₹{order.shippingAmount}</p>
            <p style={{ fontSize: 18 }}>
              Total: <strong>₹{order.totalAmount}</strong>
            </p>
          </div>
        </div>

        {/* ADDRESS */}
        <div style={{ borderTop: "1px solid #eee", paddingTop: 16 }}>
          <h3>Delivery Address</h3>
          <p>{order.addressFullName}</p>
          <p>{order.addressPhone}</p>
          <p>
            {order.addressLine1}
            {order.addressLine2 ? `, ${order.addressLine2}` : ""}
          </p>
          <p>
            {order.addressCity}, {order.addressState} -{" "}
            {order.addressPincode}
          </p>
          <p>{order.addressCountry}</p>
        </div>

        {/* ITEMS */}
        <div style={{ borderTop: "1px solid #eee", paddingTop: 16 }}>
          <h3>Ordered Items</h3>

          {order.items?.map((item) => (
            <div key={item.id} style={{ marginBottom: 10 }}>
              {item.productTitle} — Qty: {item.quantity} — ₹{item.lineTotal}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}