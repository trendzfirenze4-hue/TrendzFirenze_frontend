"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import giftSetApi from "./giftSetApi";

export const fetchGiftSetCart = createAsyncThunk(
  "giftSet/fetchGiftSetCart",
  async (_, thunkAPI) => {
    try {
      return await giftSetApi.getGiftSetCart();
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e?.response?.data?.message || "Failed to fetch gift set cart",
        status: e?.response?.status || null,
      });
    }
  }
);

export const addGiftSetCartItem = createAsyncThunk(
  "giftSet/addGiftSetCartItem",
  async (payload, thunkAPI) => {
    try {
      return await giftSetApi.addGiftSetCartItem(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e?.response?.data?.message || "Failed to add item",
        status: e?.response?.status || null,
      });
    }
  }
);

export const removeGiftSetCartItem = createAsyncThunk(
  "giftSet/removeGiftSetCartItem",
  async (itemId, thunkAPI) => {
    try {
      return await giftSetApi.removeGiftSetCartItem(itemId);
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e?.response?.data?.message || "Failed to remove item",
        status: e?.response?.status || null,
      });
    }
  }
);

export const clearGiftSetCart = createAsyncThunk(
  "giftSet/clearGiftSetCart",
  async (_, thunkAPI) => {
    try {
      return await giftSetApi.clearGiftSetCart();
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e?.response?.data?.message || "Failed to clear cart",
        status: e?.response?.status || null,
      });
    }
  }
);

export const placeGiftSetOrder = createAsyncThunk(
  "giftSet/placeGiftSetOrder",
  async (payload, thunkAPI) => {
    try {
      return await giftSetApi.placeGiftSetOrder(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e?.response?.data?.message || "Failed to place gift set order",
        status: e?.response?.status || null,
      });
    }
  }
);

export const createGiftSetRazorpayOrder = createAsyncThunk(
  "giftSet/createGiftSetRazorpayOrder",
  async (payload, thunkAPI) => {
    try {
      return await giftSetApi.createGiftSetRazorpayOrder(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e?.response?.data?.message || "Failed to create Razorpay order",
        status: e?.response?.status || null,
      });
    }
  }
);

export const verifyGiftSetRazorpayPayment = createAsyncThunk(
  "giftSet/verifyGiftSetRazorpayPayment",
  async (payload, thunkAPI) => {
    try {
      return await giftSetApi.verifyGiftSetRazorpayPayment(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e?.response?.data?.message || "Failed to verify payment",
        status: e?.response?.status || null,
      });
    }
  }
);

export const fetchMyGiftSetOrders = createAsyncThunk(
  "giftSet/fetchMyGiftSetOrders",
  async (_, thunkAPI) => {
    try {
      return await giftSetApi.fetchMyGiftSetOrders();
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e?.response?.data?.message || "Failed to fetch gift set orders",
        status: e?.response?.status || null,
      });
    }
  }
);

export const fetchMyGiftSetOrderById = createAsyncThunk(
  "giftSet/fetchMyGiftSetOrderById",
  async (id, thunkAPI) => {
    try {
      return await giftSetApi.fetchMyGiftSetOrderById(id);
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message:
          e?.response?.data?.message || "Failed to fetch gift set order details",
        status: e?.response?.status || null,
      });
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

const emptySummary = {
  items: [],
  totalProducts: 0,
  subtotalInr: 0,
  discountPercent: 0,
  discountAmountInr: 0,
  finalTotalInr: 0,
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

        const status = action.payload?.status;

        // Ignore auth errors and silent network/cold-start fetch errors
        if (status === 401 || status === 403 || !status) {
          state.error = null;
        } else {
          state.error = action.payload?.message || "Something went wrong";
        }
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
        state.error = action.payload?.message || "Failed to add item";
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
        state.error = action.payload?.message || "Failed to remove item";
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
        state.error = action.payload?.message || "Failed to clear cart";
      })

      .addCase(placeGiftSetOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeGiftSetOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.placedOrder = action.payload;
        state.summary = emptySummary;
      })
      .addCase(placeGiftSetOrder.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to place gift set order";
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
        state.error =
          action.payload?.message || "Failed to create Razorpay order";
      })

      .addCase(verifyGiftSetRazorpayPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyGiftSetRazorpayPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentVerified = action.payload;
        state.summary = emptySummary;
      })
      .addCase(verifyGiftSetRazorpayPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to verify payment";
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
        state.error =
          action.payload?.message || "Failed to fetch gift set orders";
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
        state.error =
          action.payload?.message || "Failed to fetch gift set order details";
      });
  },
});

export const {
  clearGiftSetError,
  clearPlacedGiftSetOrder,
  clearSelectedGiftSetOrder,
} = giftSetSlice.actions;

export default giftSetSlice.reducer;