import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { organizerList, getOrganizerDetails, createOrganizerReview } from "../api/organizerReview";

// Fetch organizers list
export const fetchOrganizerList = createAsyncThunk(
  "organizer/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      return await organizerList();
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch organizers");
    }
  }
);

// Fetch single organizer + reviews
export const fetchOrganizerDetails = createAsyncThunk(
  "organizer/fetchDetails",
  async (organizerId, { rejectWithValue }) => {
    try {
      return await getOrganizerDetails(organizerId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch organizer details");
    }
  }
);

// Add review for an organizer
export const addOrganizerReview = createAsyncThunk(
  "organizer/addReview",
  async (payload, { rejectWithValue }) => {
    try {
      return await createOrganizerReview(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to add review");
    }
  }
);

const initialState = {
  organizers: [],
  selectedOrganizer: null,
  reviews: [],
  loadingOrganizers: false,
  loadingDetails: false,
  addingReview: false,
};

const organizerSlice = createSlice({
  name: "organizer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Fetch list */
      .addCase(fetchOrganizerList.pending, (state) => {
        state.loadingOrganizers = true;
      })
      .addCase(fetchOrganizerList.fulfilled, (state, action) => {
        state.loadingOrganizers = false;
        state.organizers = action.payload;
      })
      .addCase(fetchOrganizerList.rejected, (state) => {
        state.loadingOrganizers = false;
      })

      /* Organizer Details + Reviews */
      .addCase(fetchOrganizerDetails.pending, (state) => {
        state.loadingDetails = true;
      })
      .addCase(fetchOrganizerDetails.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.selectedOrganizer = action.payload.organizer;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchOrganizerDetails.rejected, (state) => {
        state.loadingDetails = false;
      })

      /* Add Review */
      .addCase(addOrganizerReview.pending, (state) => {
        state.addingReview = true;
      })
      .addCase(addOrganizerReview.fulfilled, (state, action) => {
        state.addingReview = false;
        state.reviews.unshift(action.payload);
      })
      .addCase(addOrganizerReview.rejected, (state) => {
        state.addingReview = false;
      });
  },
});

export default organizerSlice.reducer;