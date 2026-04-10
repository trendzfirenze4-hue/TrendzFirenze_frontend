


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authApi";
import { saveToken, removeToken, getToken } from "../../lib/tokenStorage";
import { loadUser } from "../../lib/loadUser";

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerUser(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Register failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginUser(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

export const loadCurrentUser = createAsyncThunk(
  "auth/loadCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await loadUser();
      return user;
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: getToken(),
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.initialized = true;
      removeToken();
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    markAuthInitialized: (state) => {
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload || null;
        state.error = null;
        state.initialized = true;
      })
      .addCase(loadCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.initialized = true;
        removeToken();
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.initialized = true;

        state.user = {
          id: action.payload.userId,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
        };

        state.token = action.payload.accessToken;
        saveToken(action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.initialized = true;

        state.user = {
          id: action.payload.userId,
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role,
        };

        state.token = action.payload.accessToken;
        saveToken(action.payload.accessToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      });
  },
});

export const { logout, setUser, markAuthInitialized } = authSlice.actions;
export default authSlice.reducer;