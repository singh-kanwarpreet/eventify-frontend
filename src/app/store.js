import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth";
import eventReducer from "../features/events";
import registrationReducer from "../features/registrations";

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    registrations: registrationReducer,
  },
});
export default store;
