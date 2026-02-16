import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEventsAPI,
  fetchEventByIdAPI,
  createEventAPI,
} from "../api/eventsAPI";

/*FETCH ALL*/
export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async ({ page = 1, limit = 6 } = {}, { rejectWithValue }) => {
    try {
      const data = await fetchEventsAPI(page, limit);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch events",
      );
    }
  },
);

/*CREATE*/
export const createEvent = createAsyncThunk(
  "events/create",
  async (eventData, { rejectWithValue }) => {
    try {
      const data = await createEventAPI(eventData);
      return data.event;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create event",
      );
    }
  },
);

/*FETCH BY ID*/
export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchEventByIdAPI(id);
      return data.event;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch event",
      );
    }
  },
);

const initialState = {
  events: [],
  selectedEvent: null,
  loading: false,
  pagination: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    updateSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      /* FETCH ALL */
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
      })

      /* FETCH BY ID */
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
      })

      /* CREATE */
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
        state.selectedEvent = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { updateSelectedEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
