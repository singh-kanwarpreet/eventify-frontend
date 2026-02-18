import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import eventReducer from "../features/events";
import registrationReducer from "../features/registrations";
import organizationReducer from "../features/organizerReview";
import organizerDashboardReducer from "../features/organizerDashboard";
const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    registrations: registrationReducer,
    organizer: organizationReducer,
    organizerDashboard: organizerDashboardReducer,
  },
});
export default store;
