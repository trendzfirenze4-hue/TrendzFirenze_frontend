"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import giftSetApi from "./giftSetApi";
import { getToken, removeToken } from "@/lib/tokenStorage";

function hasToken() {
  if (typeof window === "undefined") return false;
  return !!getToken();
}

const emptySummary = {
  items: [],
  totalProducts: 0,
  subtotalInr: 0,
  discountPercent: 0,
  discountAmountInr: 0,
  finalTotalInr: 0,
};

const initialState = {
  cartId: null,
  summary: emptySummary,
  loading: false,
  error: null,
  initialized: false,
};

function normalizeCartResponse(data) {
  return {
    cartId: data?.cartId ?? null,
    summary: data?.summary ?? emptySummary,
  };
}

export const fetchGiftSetCart = createAsyncThunk(
  "giftSet/fetchGiftSetCart",
  async (_, thunkAPI) => {
    try {
      if (!hasToken()) {
        return normalizeCartResponse({ cartId: null, summary: emptySummary });
      }

      const data = await giftSetApi.getGiftSetCart();
      return normalizeCartResponse(data);
    } catch (err) {
      if (err?.response?.status === 401) {
        removeToken();
        return normalizeCartResponse({ cartId: null, summary: emptySummary });
      }

      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: err.message }
      );
    }
  }
);

export const addGiftSetCartItem = createAsyncThunk(
  "giftSet/addGiftSetCartItem",
  async ({ productId, giftBoxId }, thunkAPI) => {
    try {
      if (!hasToken()) {
        return thunkAPI.rejectWithValue({
          message: "Please login to add items to gift set"
        });
      }

      const data = await giftSetApi.addGiftSetCartItem({ productId, giftBoxId });
      return normalizeCartResponse(data);
    } catch (err) {
      if (err?.response?.status === 401) {
        removeToken();
      }

      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: err.message }
      );
    }
  }
);

export const removeGiftSetCartItem = createAsyncThunk(
  "giftSet/removeGiftSetCartItem",
  async (itemId, thunkAPI) => {
    try {
      if (!hasToken()) {
        return normalizeCartResponse({ cartId: null, summary: emptySummary });
      }

      const data = await giftSetApi.removeGiftSetCartItem(itemId);
      return normalizeCartResponse(data);
    } catch (err) {
      if (err?.response?.status === 401) {
        removeToken();
        return normalizeCartResponse({ cartId: null, summary: emptySummary });
      }

      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: err.message }
      );
    }
  }
);

export const clearGiftSetCart = createAsyncThunk(
  "giftSet/clearGiftSetCart",
  async (_, thunkAPI) => {
    try {
      if (!hasToken()) {
        return normalizeCartResponse({ cartId: null, summary: emptySummary });
      }

      const data = await giftSetApi.clearGiftSetCart();
      return normalizeCartResponse(data);
    } catch (err) {
      if (err?.response?.status === 401) {
        removeToken();
        return normalizeCartResponse({ cartId: null, summary: emptySummary });
      }

      return thunkAPI.rejectWithValue(
        err?.response?.data || { message: err.message }
      );
    }
  }
);

function applyGiftSetState(state, action) {
  state.cartId = action.payload.cartId;
  state.summary = action.payload.summary || emptySummary;
  state.loading = false;
  state.error = null;
  state.initialized = true;
}

function applyGiftSetError(state, action, fallback) {
  state.loading = false;
  state.initialized = true;
  state.error = action.payload?.message || fallback;
}

const giftSetSlice = createSlice({
  name: "giftSet",
  initialState,
  reducers: {
    clearGiftSetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiftSetCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGiftSetCart.fulfilled, applyGiftSetState)
      .addCase(fetchGiftSetCart.rejected, (state, action) => {
        applyGiftSetError(state, action, "Failed to load gift set cart");
      })

      .addCase(addGiftSetCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGiftSetCartItem.fulfilled, applyGiftSetState)
      .addCase(addGiftSetCartItem.rejected, (state, action) => {
        applyGiftSetError(state, action, "Failed to add item to gift set");
      })

      .addCase(removeGiftSetCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeGiftSetCartItem.fulfilled, applyGiftSetState)
      .addCase(removeGiftSetCartItem.rejected, (state, action) => {
        applyGiftSetError(state, action, "Failed to remove gift set item");
      })

      .addCase(clearGiftSetCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearGiftSetCart.fulfilled, applyGiftSetState)
      .addCase(clearGiftSetCart.rejected, (state, action) => {
        applyGiftSetError(state, action, "Failed to clear gift set");
      });
  },
});

export const { clearGiftSetError } = giftSetSlice.actions;
export default giftSetSlice.reducer;