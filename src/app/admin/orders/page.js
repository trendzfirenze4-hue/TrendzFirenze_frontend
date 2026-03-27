"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminOrders,
  updateAdminOrderStatus,
} from "@/features/orders/orderSlice";

const statuses = ["PLACED", "CONFIRMED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrdersPage() {
  const dispatch = useDispatch();
  const { adminOrders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Orders</h1>

      <div style={{ display: "grid", gap: 16 }}>
        {adminOrders.map((order) => (
          <div
            key={order.id}
            style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}
          >
            <h3>{order.orderNumber}</h3>
            <p>Status: {order.status}</p>
            <p>Payment: {order.paymentMethod}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>
              Address: {order.addressFullName}, {order.addressPhone},{" "}
              {order.addressLine1}, {order.addressCity}, {order.addressState} -{" "}
              {order.addressPincode}
            </p>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    dispatch(updateAdminOrderStatus({ id: order.id, status }))
                  }
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}