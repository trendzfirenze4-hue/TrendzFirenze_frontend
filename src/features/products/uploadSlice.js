

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/apiClient";

export const uploadProductImages = createAsyncThunk(
  "products/uploadImages",
  async (files, { rejectWithValue }) => {

    try {

      const formData = new FormData();

      files.forEach(file => {
        formData.append("files", file);
      });

      const res = await api.post(
        "/api/admin/upload/product-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      return res.data;

    } catch (err) {

      return rejectWithValue("Upload failed");

    }

  }
);

const uploadSlice = createSlice({

  name: "upload",

  initialState: {
    images: [],
    loading: false
  },

  reducers: {
    clearImages: (state) => {
      state.images = [];
    }
  },

  extraReducers: (builder) => {

    builder
      .addCase(uploadProductImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProductImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(uploadProductImages.rejected, (state) => {
        state.loading = false;
      });

  }

});

export const { clearImages } = uploadSlice.actions;

export default uploadSlice.reducer;