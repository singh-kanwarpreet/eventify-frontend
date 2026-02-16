import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMyRegistrationsAPI,
  registerAPI,
  fetchRegistrationsForEventAPI,
  markAttendanceBulkAPI,
} from "../api/registerationAPI";

// FETCH MY REGISTRATIONS
export const fetchMyRegistrations = createAsyncThunk(
  "registrations/fetchMine",
  async ({ page = 1, limit = 6, status } = {}, { rejectWithValue }) => {
    try {
      const data = await fetchMyRegistrationsAPI({ page, limit, status });
      return data; 
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch registrations");
    }
  }
);


export const fetchRegistrationsForEvent = createAsyncThunk(
  "registrations/fetchForEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const data = await fetchRegistrationsForEventAPI(eventId);
      return data.registrations;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to fetch registrations for event",
      );
    }
  },
);

export const markAttendanceBulk = createAsyncThunk(
  "registrations/markAttendanceBulk",
  async ({ eventId, attendanceData }, { rejectWithValue }) => {
    try {
      const data = await markAttendanceBulkAPI(eventId, attendanceData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to mark attendance",
      );
    }
  },
);

export const registerForEvent = createAsyncThunk(
  "registrations/register",
  async (eventId, { rejectWithValue }) => {
    try {
      await registerAPI(eventId);
      return eventId;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to register for event",
      );
    }
  },
);

const slice = createSlice({
  name: "registrations",
  initialState: {
    registeredEvents: [],
    loading: false,
    pagination: { page: 1, limit: 6, totalPages: 1, total: 0 },
    eventRegistrations: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyRegistrations.fulfilled, (state, action) => {
        state.registeredEvents = action.payload.registrations || [];
        state.pagination = action.payload.pagination || {
          page: 1,
          limit: 6,
          totalPages: 1,
          total: 0,
        };
        state.loading = false;
      })
      .addCase(fetchMyRegistrations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyRegistrations.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.registeredEvents.push({ event: { _id: action.payload } });
        state.loading = false;
      })
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchRegistrationsForEvent.fulfilled, (state, action) => {
        state.eventRegistrations = action.payload;
        state.loading = false;
      })
      .addCase(fetchRegistrationsForEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegistrationsForEvent.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(markAttendanceBulk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(markAttendanceBulk.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAttendanceBulk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default slice.reducer;
