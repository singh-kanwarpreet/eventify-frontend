import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEventsAPI,
  fetchEventByIdAPI,
  createEventAPI,
} from "../api/eventsAPI";

/*FETCH ALL*/
export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchEventsAPI();
      return data.events;
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
  error: null,
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
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH BY ID */
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CREATE */
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
        state.selectedEvent = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateSelectedEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
