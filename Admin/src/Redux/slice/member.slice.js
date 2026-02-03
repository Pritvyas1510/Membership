import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/Api";

// 🔹 Fetch all members
export const fetchMembers = createAsyncThunk(
  "member/fetchMembers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/member");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// 🔹 Reject member (Admin only)
export const rejectMember = createAsyncThunk(
  "member/rejectMember",
  async (id, { rejectWithValue }) => {
    try {
      await api.patch(`/member/reject/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// 🔹 Delete member (Admin only)
export const deleteMember = createAsyncThunk(
  "member/deleteMember",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/member/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const makeSubAdmin = createAsyncThunk(
  "member/makeSubAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await api.post(`/admin/make-sub-admin/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

const memberSlice = createSlice({
  name: "member",
  initialState: {
    members: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH MEMBERS
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REJECT MEMBER
      .addCase(rejectMember.fulfilled, (state, action) => {
        const member = state.members.find((m) => m._id === action.payload);
        if (member) member.status = "rejected";
      })

      // DELETE MEMBER
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.members = state.members.filter((m) => m._id !== action.payload);
      });
  },
});

export default memberSlice.reducer;
