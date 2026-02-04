import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMyRegistrationsAPI,
  registerAPI,
} from "../api/registerationAPI";

export const fetchMyRegistrations = createAsyncThunk(
  "registrations/fetchMine",
  async () => {
    const data = await fetchMyRegistrationsAPI();
    return data.registrations;
  }
);

export const registerForEvent = createAsyncThunk(
  "registrations/register",
  async (eventId) => {
    await registerAPI(eventId);
    return eventId;
  }
);

const slice = createSlice({
  name: "registrations",
  initialState: {
    items: [],
    error: null,
    loading: false,
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRegistrations.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyRegistrations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyRegistrations.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.items.push({ event: { _id: action.payload } });
        state.loading = false;
      })
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default slice.reducer;
