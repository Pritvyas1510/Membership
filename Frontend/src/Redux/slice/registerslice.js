import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/*
  MEMBER REGISTER (PUBLIC)
*/
export const registerMember = createAsyncThunk(
  "member/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/member/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const registerSlice = createSlice({
  name: "memberRegister",

  initialState: {
    loading: false,
    success: false,
    error: null,
    member: null,
  },

  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.member = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // API start
      .addCase(registerMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // API success
      .addCase(registerMember.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.member = action.payload.member;
      })

      // API failed
      .addCase(registerMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
