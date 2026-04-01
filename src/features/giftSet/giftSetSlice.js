"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { calculateGiftSetApi } from "../giftBoxes/giftBoxApi";

const initialState = {
  selectedItems: [],
  summary: null,
  loading: false,
  error: null,
};

export const calculateGiftSet = createAsyncThunk(
  "giftSet/calculateGiftSet",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const items = state.giftSet.selectedItems.map((item) => ({
        productId: item.productId,
        giftBoxId: item.giftBoxId,
      }));

      return await calculateGiftSetApi({ items });
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to calculate gift set"
      );
    }
  }
);

const giftSetSlice = createSlice({
  name: "giftSet",
  initialState,
  reducers: {
    addProductToGiftSet(state, action) {
      const product = action.payload;
      const exists = state.selectedItems.find(
        (item) => item.productId === product.id
      );

      if (exists) return;
      if (state.selectedItems.length >= 5) return;

      state.selectedItems.push({
        productId: product.id,
        productTitle: product.title,
        productPriceInr: product.priceInr,
        productImagePath: product.images?.[0]?.imagePath || null,
        giftBoxId: null,
      });

      state.summary = null;
      state.error = null;
    },

    removeProductFromGiftSet(state, action) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.productId !== action.payload
      );
      state.summary = null;
      state.error = null;
    },

    setGiftBoxForProduct(state, action) {
      const { productId, giftBoxId } = action.payload;
      const item = state.selectedItems.find((x) => x.productId === productId);
      if (item) item.giftBoxId = giftBoxId;
      state.summary = null;
      state.error = null;
    },

    clearGiftSet(state) {
      state.selectedItems = [];
      state.summary = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateGiftSet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateGiftSet.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(calculateGiftSet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addProductToGiftSet,
  removeProductFromGiftSet,
  setGiftBoxForProduct,
  clearGiftSet,
} = giftSetSlice.actions;

export default giftSetSlice.reducer;