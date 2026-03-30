import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "@/features/user/userSlice";
import categoryReducer from "@/features/categories/categorySlice";
import productReducer from "../features/products/productSlice";
import uploadReducer from "../features/products/uploadSlice";
import cartReducer from "@/features/cart/cartSlice";
import addressReducer from "@/features/address/addressSlice";
import orderReducer from "@/features/orders/orderSlice";
import adminProductsReducer from "@/features/adminProducts/adminProductSlice";




export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    upload: uploadReducer,
    user: userReducer,
    cart: cartReducer,
    address: addressReducer,
    orders: orderReducer,
    adminProducts: adminProductsReducer,
  },
});