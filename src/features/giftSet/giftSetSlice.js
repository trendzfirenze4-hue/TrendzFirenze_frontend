// "use client";

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import giftSetApi from "./giftSetApi";
// import { getToken, removeToken } from "@/lib/tokenStorage";

// function hasToken() {
//   if (typeof window === "undefined") return false;
//   return !!getToken();
// }

// const emptySummary = {
//   items: [],
//   totalProducts: 0,
//   subtotalInr: 0,
//   discountPercent: 0,
//   discountAmountInr: 0,
//   finalTotalInr: 0,
// };

// const initialState = {
//   cartId: null,
//   summary: emptySummary,
//   loading: false,
//   error: null,
//   initialized: false,
// };

// function normalizeCartResponse(data) {
//   return {
//     cartId: data?.cartId ?? null,
//     summary: data?.summary ?? emptySummary,
//   };
// }

// export const fetchGiftSetCart = createAsyncThunk(
//   "giftSet/fetchGiftSetCart",
//   async (_, thunkAPI) => {
//     try {
//       if (!hasToken()) {
//         return normalizeCartResponse({ cartId: null, summary: emptySummary });
//       }

//       const data = await giftSetApi.getGiftSetCart();
//       return normalizeCartResponse(data);
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         removeToken();
//         return normalizeCartResponse({ cartId: null, summary: emptySummary });
//       }

//       return thunkAPI.rejectWithValue(
//         err?.response?.data || { message: err.message }
//       );
//     }
//   }
// );

// export const addGiftSetCartItem = createAsyncThunk(
//   "giftSet/addGiftSetCartItem",
//   async ({ productId, giftBoxId }, thunkAPI) => {
//     try {
//       if (!hasToken()) {
//         return thunkAPI.rejectWithValue({
//           message: "Please login to add items to gift set"
//         });
//       }

//       const data = await giftSetApi.addGiftSetCartItem({ productId, giftBoxId });
//       return normalizeCartResponse(data);
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         removeToken();
//       }

//       return thunkAPI.rejectWithValue(
//         err?.response?.data || { message: err.message }
//       );
//     }
//   }
// );

// export const removeGiftSetCartItem = createAsyncThunk(
//   "giftSet/removeGiftSetCartItem",
//   async (itemId, thunkAPI) => {
//     try {
//       if (!hasToken()) {
//         return normalizeCartResponse({ cartId: null, summary: emptySummary });
//       }

//       const data = await giftSetApi.removeGiftSetCartItem(itemId);
//       return normalizeCartResponse(data);
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         removeToken();
//         return normalizeCartResponse({ cartId: null, summary: emptySummary });
//       }

//       return thunkAPI.rejectWithValue(
//         err?.response?.data || { message: err.message }
//       );
//     }
//   }
// );

// export const clearGiftSetCart = createAsyncThunk(
//   "giftSet/clearGiftSetCart",
//   async (_, thunkAPI) => {
//     try {
//       if (!hasToken()) {
//         return normalizeCartResponse({ cartId: null, summary: emptySummary });
//       }

//       const data = await giftSetApi.clearGiftSetCart();
//       return normalizeCartResponse(data);
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         removeToken();
//         return normalizeCartResponse({ cartId: null, summary: emptySummary });
//       }

//       return thunkAPI.rejectWithValue(
//         err?.response?.data || { message: err.message }
//       );
//     }
//   }
// );

// function applyGiftSetState(state, action) {
//   state.cartId = action.payload.cartId;
//   state.summary = action.payload.summary || emptySummary;
//   state.loading = false;
//   state.error = null;
//   state.initialized = true;
// }

// function applyGiftSetError(state, action, fallback) {
//   state.loading = false;
//   state.initialized = true;
//   state.error = action.payload?.message || fallback;
// }

// const giftSetSlice = createSlice({
//   name: "giftSet",
//   initialState,
//   reducers: {
//     clearGiftSetError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchGiftSetCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchGiftSetCart.fulfilled, applyGiftSetState)
//       .addCase(fetchGiftSetCart.rejected, (state, action) => {
//         applyGiftSetError(state, action, "Failed to load gift set cart");
//       })

//       .addCase(addGiftSetCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addGiftSetCartItem.fulfilled, applyGiftSetState)
//       .addCase(addGiftSetCartItem.rejected, (state, action) => {
//         applyGiftSetError(state, action, "Failed to add item to gift set");
//       })

//       .addCase(removeGiftSetCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeGiftSetCartItem.fulfilled, applyGiftSetState)
//       .addCase(removeGiftSetCartItem.rejected, (state, action) => {
//         applyGiftSetError(state, action, "Failed to remove gift set item");
//       })

//       .addCase(clearGiftSetCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(clearGiftSetCart.fulfilled, applyGiftSetState)
//       .addCase(clearGiftSetCart.rejected, (state, action) => {
//         applyGiftSetError(state, action, "Failed to clear gift set");
//       });
//   },
// });

// export const { clearGiftSetError } = giftSetSlice.actions;
// export default giftSetSlice.reducer;













"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import giftSetApi from "./giftSetApi";

export const fetchGiftSetCart = createAsyncThunk(
  "giftSet/fetchGiftSetCart",
  async (_, thunkAPI) => {
    try {
      return await giftSetApi.getGiftSetCart();
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || "Failed to fetch gift set cart"
      );
    }
  }
);

export const addGiftSetCartItem = createAsyncThunk(
  "giftSet/addGiftSetCartItem",
  async (payload, thunkAPI) => {
    try {
      return await giftSetApi.addGiftSetCartItem(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || "Failed to add item"
      );
    }
  }
);

export const removeGiftSetCartItem = createAsyncThunk(
  "giftSet/removeGiftSetCartItem",
  async (itemId, thunkAPI) => {
    try {
      return await giftSetApi.removeGiftSetCartItem(itemId);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

export const clearGiftSetCart = createAsyncThunk(
  "giftSet/clearGiftSetCart",
  async (_, thunkAPI) => {
    try {
      return await giftSetApi.clearGiftSetCart();
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

export const placeGiftSetOrder = createAsyncThunk(
  "giftSet/placeGiftSetOrder",
  async (payload, thunkAPI) => {
    try {
      return await giftSetApi.placeGiftSetOrder(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || "Failed to place gift set order"
      );
    }
  }
);

export const createGiftSetRazorpayOrder = createAsyncThunk(
  "giftSet/createGiftSetRazorpayOrder",
  async (payload, thunkAPI) => {
    try {
      return await giftSetApi.createGiftSetRazorpayOrder(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || "Failed to create Razorpay order"
      );
    }
  }
);

export const verifyGiftSetRazorpayPayment = createAsyncThunk(
  "giftSet/verifyGiftSetRazorpayPayment",
  async (payload, thunkAPI) => {
    try {
      return await giftSetApi.verifyGiftSetRazorpayPayment(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || "Failed to verify payment"
      );
    }
  }
);

export const fetchMyGiftSetOrders = createAsyncThunk(
  "giftSet/fetchMyGiftSetOrders",
  async (_, thunkAPI) => {
    try {
      return await giftSetApi.fetchMyGiftSetOrders();
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || "Failed to fetch gift set orders"
      );
    }
  }
);

export const fetchMyGiftSetOrderById = createAsyncThunk(
  "giftSet/fetchMyGiftSetOrderById",
  async (id, thunkAPI) => {
    try {
      return await giftSetApi.fetchMyGiftSetOrderById(id);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.response?.data?.message || "Failed to fetch gift set order details"
      );
    }
  }
);

const initialState = {
  summary: null,
  orders: [],
  selectedOrder: null,
  placedOrder: null,
  razorpayOrder: null,
  paymentVerified: null,
  loading: false,
  error: null,
};

const giftSetSlice = createSlice({
  name: "giftSet",
  initialState,
  reducers: {
    clearGiftSetError(state) {
      state.error = null;
    },
    clearPlacedGiftSetOrder(state) {
      state.placedOrder = null;
      state.razorpayOrder = null;
      state.paymentVerified = null;
    },
    clearSelectedGiftSetOrder(state) {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiftSetCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGiftSetCart.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload?.summary || null;
      })
      .addCase(fetchGiftSetCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addGiftSetCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGiftSetCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload?.summary || null;
      })
      .addCase(addGiftSetCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeGiftSetCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeGiftSetCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload?.summary || null;
      })
      .addCase(removeGiftSetCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(clearGiftSetCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearGiftSetCart.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload?.summary || null;
      })
      .addCase(clearGiftSetCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(placeGiftSetOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeGiftSetOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.placedOrder = action.payload;
        state.summary = {
          items: [],
          totalProducts: 0,
          subtotalInr: 0,
          discountPercent: 0,
          discountAmountInr: 0,
          finalTotalInr: 0,
        };
      })
      .addCase(placeGiftSetOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createGiftSetRazorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGiftSetRazorpayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.razorpayOrder = action.payload;
      })
      .addCase(createGiftSetRazorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyGiftSetRazorpayPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyGiftSetRazorpayPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentVerified = action.payload;
        state.summary = {
          items: [],
          totalProducts: 0,
          subtotalInr: 0,
          discountPercent: 0,
          discountAmountInr: 0,
          finalTotalInr: 0,
        };
      })
      .addCase(verifyGiftSetRazorpayPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMyGiftSetOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyGiftSetOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || [];
      })
      .addCase(fetchMyGiftSetOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMyGiftSetOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedOrder = null;
      })
      .addCase(fetchMyGiftSetOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchMyGiftSetOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearGiftSetError,
  clearPlacedGiftSetOrder,
  clearSelectedGiftSetOrder,
} = giftSetSlice.actions;

export default giftSetSlice.reducer;