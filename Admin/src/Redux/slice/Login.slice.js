import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/Api";

// LOGIN API CALL
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/admin/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: localStorage.getItem("token") || null,
    role: null,
    name: localStorage.getItem("name") || null, // ✅
    lastLogin: null,
    lastLogin: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.name = null;
      localStorage.removeItem("token");
      localStorage.removeItem("name");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.name = action.payload.name; // ✅
        state.lastLogin = action.payload.lastLogin;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("name", action.payload.name); // ✅
      })

      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
