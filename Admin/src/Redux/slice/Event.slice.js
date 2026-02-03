import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Api/Api";

/* =======================
   CREATE EVENT
======================= */
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/event/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.event;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* =======================
   FETCH EVENTS
======================= */
export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/event");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* =======================
   DELETE EVENT
======================= */
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/event/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE */
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
      })

      /* DELETE */
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (e) => e._id !== action.payload
        );
      });
  },
});

export default eventSlice.reducer;
