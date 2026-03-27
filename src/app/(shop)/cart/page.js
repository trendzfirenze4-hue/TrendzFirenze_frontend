// "use client";

// import { useEffect } from "react";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart, fetchCart, removeCartItem, updateCartItem } from "@/features/cart/cartSlice";

// export default function CartPage() {
//   const dispatch = useDispatch();
//   const { items, subtotal, totalItems, loading } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   if (loading) {
//     return <div style={{ padding: 30 }}>Loading cart...</div>;
//   }

//   return (
//     <div style={{ padding: 30, maxWidth: 1100, margin: "0 auto" }}>
//       <h1>Shopping Cart</h1>
//       <p>Total Items: {totalItems}</p>

//       {items.length === 0 ? (
//         <div>
//           <p>Your cart is empty.</p>
//           <Link href="/products">Continue Shopping</Link>
//         </div>
//       ) : (
//         <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
//           <div>
//             {items.map((item) => (
//               <div
//                 key={item.itemId}
//                 style={{
//                   display: "flex",
//                   gap: 16,
//                   border: "1px solid #ddd",
//                   padding: 16,
//                   borderRadius: 12,
//                   marginBottom: 16
//                 }}
//               >
            

//                 <img
//   src={
//     item.images?.[0]
//       ? `${process.env.NEXT_PUBLIC_API_BASE}${item.images[0]}`
//       : "/placeholder.png"
//   }
//   alt={item.title}
//   width="120"
//   height="120"
//   style={{ objectFit: "cover", borderRadius: 10 }}
// />



//                 <div style={{ flex: 1 }}>
//                   <h3 style={{ marginTop: 0 }}>{item.title}</h3>
//                   <p>Price: ₹{item.unitPrice}</p>
//                   <p>Line Total: ₹{item.lineTotal}</p>

//                   <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//                     <button
//                       onClick={() =>
//                         item.quantity > 1 &&
//                         dispatch(updateCartItem({ itemId: item.itemId, quantity: item.quantity - 1 }))
//                       }
//                     >
//                       -
//                     </button>

//                     <span>{item.quantity}</span>

//                     <button
//                       onClick={() =>
//                         dispatch(updateCartItem({ itemId: item.itemId, quantity: item.quantity + 1 }))
//                       }
//                     >
//                       +
//                     </button>

//                     <button onClick={() => dispatch(removeCartItem(item.itemId))}>
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
//           </div>

//           <div
//             style={{
//               border: "1px solid #ddd",
//               padding: 20,
//               borderRadius: 12,
//               height: "fit-content"
//             }}
//           >
//             <h3>Order Summary</h3>
//             <p>Items: {totalItems}</p>
//             <p>Subtotal: ₹{subtotal}</p>
//             <p>Shipping: Free</p>
//             <hr />
//             <h2>Total: ₹{subtotal}</h2>

//             <Link
//               href="/checkout"
//               style={{
//                 display: "inline-block",
//                 marginTop: 12,
//                 background: "#111",
//                 color: "#fff",
//                 padding: "12px 18px",
//                 borderRadius: 8,
//                 textDecoration: "none"
//               }}
//             >
//               Proceed to Checkout
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from "@/features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();

  const { items, subtotal, totalItems, loading } = useSelector((state) => state.cart);
  const { loading: authLoading, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authLoading) return;
    dispatch(fetchCart());
  }, [dispatch, authLoading, token]);

  if (loading || authLoading) {
    return <div style={{ padding: 30 }}>Loading cart...</div>;
  }

  return (
    <div style={{ padding: 30, maxWidth: 1100, margin: "0 auto" }}>
      <h1>Shopping Cart</h1>
      <p>Total Items: {totalItems}</p>

      {items.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link href="/products">Continue Shopping</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          <div>
            {items.map((item) => {
              const itemKey = item.itemId ?? item.productId;
              const itemId = item.itemId ?? item.productId;
              const imagePath = item.images?.[0] || item.image || "";

              return (
                <div
                  key={itemKey}
                  style={{
                    display: "flex",
                    gap: 16,
                    border: "1px solid #ddd",
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 16,
                  }}
                >
                  <img
                    src={
                      imagePath
                        ? `${process.env.NEXT_PUBLIC_API_BASE}${imagePath}`
                        : "/placeholder.png"
                    }
                    alt={item.title}
                    width="120"
                    height="120"
                    style={{ objectFit: "cover", borderRadius: 10 }}
                  />

                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                    <p>Price: ₹{item.unitPrice}</p>
                    <p>Line Total: ₹{item.lineTotal}</p>

                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          dispatch(
                            updateCartItem({
                              itemId,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          dispatch(
                            updateCartItem({
                              itemId,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        +
                      </button>

                      <button onClick={() => dispatch(removeCartItem(itemId))}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
          </div>

          <div
            style={{
              border: "1px solid #ddd",
              padding: 20,
              borderRadius: 12,
              height: "fit-content",
            }}
          >
            <h3>Order Summary</h3>
            <p>Items: {totalItems}</p>
            <p>Subtotal: ₹{subtotal}</p>
            <p>Shipping: Free</p>
            <hr />
            <h2>Total: ₹{subtotal}</h2>

            <Link
              href={token ? "/checkout" : "/login?next=/checkout"}
              style={{
                display: "inline-block",
                marginTop: 12,
                background: "#111",
                color: "#fff",
                padding: "12px 18px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}