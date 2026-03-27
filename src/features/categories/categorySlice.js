import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/apiClient";

/* ---------------- GET LIST ---------------- */

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const res = await api.get("/api/categories");
    return res.data;
  }
);

/* ---------------- CREATE ---------------- */

export const createCategory = createAsyncThunk(
  "categories/create",
  async (data) => {
    const res = await api.post("/api/admin/categories", data);
    return res.data;
  }
);

/* ---------------- UPDATE ---------------- */

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }) => {
    const res = await api.put(`/api/admin/categories/${id}`, data);
    return res.data;
  }
);

/* ---------------- DELETE ---------------- */

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id) => {
    await api.delete(`/api/admin/categories/${id}`);
    return id;
  }
);

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    items: [],
    loading: false
  },

  reducers: {},

  extraReducers: (builder) => {

    builder.addCase(fetchCategories.pending,(state)=>{
      state.loading = true;
    });

    builder.addCase(fetchCategories.fulfilled,(state,action)=>{
      state.loading = false;
      state.items = action.payload;
    });

    builder.addCase(createCategory.fulfilled,(state,action)=>{
      state.items.push(action.payload);
    });

    builder.addCase(updateCategory.fulfilled,(state,action)=>{
      const index = state.items.findIndex(
        c => c.id === action.payload.id
      );
      if(index !== -1){
        state.items[index] = action.payload;
      }
    });

    builder.addCase(deleteCategory.fulfilled,(state,action)=>{
      state.items = state.items.filter(
        c => c.id !== action.payload
      );
    });

  }

});

export default categorySlice.reducer;