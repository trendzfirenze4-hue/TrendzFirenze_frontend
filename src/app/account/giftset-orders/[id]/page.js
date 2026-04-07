"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyGiftSetOrderById,
  clearSelectedGiftSetOrder,
} from "@/features/giftSet/giftSetSlice";

export default function GiftSetOrderDetailsPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const { selectedOrder, loading, error } = useSelector((state) => state.giftSet);

  useEffect(() => {
    if (params?.id) {
      dispatch(fetchMyGiftSetOrderById(params.id));
    }

    return () => {
      dispatch(clearSelectedGiftSetOrder());
    };
  }, [dispatch, params?.id]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!selectedOrder) {
    return <div className="p-8">Order not found.</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Gift Set Order #{selectedOrder.orderNumber}</h1>
      <p className="mt-2 text-sm text-gray-600">
        Status: {selectedOrder.status} | Payment: {selectedOrder.paymentStatus}
      </p>

      <div className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Items</h2>

        <div className="mt-4 space-y-4">
          {selectedOrder.items?.map((item) => (
            <div key={item.id} className="rounded-xl border p-4">
              <p className="font-semibold">{item.productTitle}</p>
              <p className="text-sm text-gray-600">Product: ₹{item.productPrice}</p>
              <p className="text-sm text-gray-600">
                Gift Box: {item.giftBoxName} — ₹{item.giftBoxPrice}
              </p>
              <p className="text-sm font-semibold">Line Total: ₹{item.lineTotal}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Shipping Address</h2>
        <p className="mt-3">{selectedOrder.addressFullName}</p>
        <p>{selectedOrder.addressPhone}</p>
        <p>{selectedOrder.addressLine1}</p>
        {selectedOrder.addressLine2 ? <p>{selectedOrder.addressLine2}</p> : null}
        <p>
          {selectedOrder.addressCity}, {selectedOrder.addressState} - {selectedOrder.addressPincode}
        </p>
        <p>{selectedOrder.addressCountry}</p>
      </div>

      <div className="mt-6 rounded-2xl border bg-white p-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{selectedOrder.subtotalAmount}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span>Discount</span>
          <span>-₹{selectedOrder.discountAmount}</span>
        </div>
        <div className="mt-4 flex justify-between border-t pt-4 font-bold">
          <span>Total</span>
          <span>₹{selectedOrder.totalAmount}</span>
        </div>
      </div>
    </div>
  );
}