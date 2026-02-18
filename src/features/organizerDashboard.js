import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrganizerDashboardAPI,
  fetchEventRegistrationsAPI,
  markAttendanceBulkAPI,
  deleteEventAPI,
  archiveEventAPI,
  unarchiveEventAPI,
} from "../api/organizerDashboard";

//  Fetch organizer dashboard stats + events
export const fetchOrganizerDashboard = createAsyncThunk(
  "organizer/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchOrganizerDashboardAPI();
      return res;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch dashboard",
      );
    }
  },
);

// Mark attendance in bulk for an event
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

export const deleteEvent = createAsyncThunk(
  "organizer/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await deleteEventAPI(eventId);
      return eventId;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete event",
      );
    }
  },
);

// Fetch registrations for a specific event
export const fetchEventRegistrations = createAsyncThunk(
  "organizer/fetchEventRegistrations",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await fetchEventRegistrationsAPI(eventId);
      return { eventId, registrations: res.registrations };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch event registrations",
      );
    }
  },
);

export const archiveEvent = createAsyncThunk(
  "organizer/archiveEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await archiveEventAPI(eventId);
      return res;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to archive event",
      );
    }
  },
);

export const unarchiveEvent = createAsyncThunk(
  "organizer/unarchiveEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await unarchiveEventAPI(eventId);
      return res;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to unarchieve event",
      );
    }
  },
);

const organizerSlice = createSlice({
  name: "organizer",
  initialState: {
    stats: { totalEvents: 0, totalRegistrations: 0, avgRating: 0 },
    events: [],
    eventRegistrations: {},
    loading: false,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrganizerDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrganizerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = {
          ...action.payload.stats,
          avgRating: Number(action.payload.stats.avgRating) || 0,
        };
        state.events = action.payload.events || [];
      })
      .addCase(fetchOrganizerDashboard.rejected, (state, action) => {
        state.loading = false;
      })

      // Event registrations
      .addCase(fetchEventRegistrations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        const { eventId, registrations } = action.payload;
        state.eventRegistrations[eventId] = registrations;
      })
      .addCase(fetchEventRegistrations.rejected, (state, action) => {
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
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((e) => e._id !== action.payload);
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(archiveEvent.fulfilled, (state, action) => {
        const updatedEvent = action.payload.event;
        state.events = state.events.map((e) =>
          e._id === updatedEvent._id ? updatedEvent : e,
        );
        state.loading = false;
      })
      .addCase(archiveEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(archiveEvent.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(unarchiveEvent.fulfilled, (state, action) => {
        const updatedEvent = action.payload.event;
        state.events = state.events.map((e) =>
          e._id === updatedEvent._id ? updatedEvent : e,
        );
        state.loading = false;
      })
      .addCase(unarchiveEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(unarchiveEvent.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default organizerSlice.reducer;
