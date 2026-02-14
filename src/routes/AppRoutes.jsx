import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import EventDetails from "../pages/EventDetails";
import EventRegistrationPage from "../pages/user/MyRegistrations";
import ManageAttendance from "../pages/organizer/ManageAttendance";
import OrganizationList from "../pages/user/OrganizationList";
import OrganizerReview from "../pages/user/OrganizerReview";
import Navbar from "../components/Navbar";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import RoleRoute from "./RoleRoute";

/* Organizer pages */
// import Dashboard from "../organizer/Dashboard";
import CreateEvent from "../pages/organizer/CreateEvent";
// import ManageEvent from "../organizer/ManageEvent";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Guest only */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Logged-in users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/event/:id" element={<EventDetails />} />
        </Route>

        {/* USER only routes */}
        <Route element={<RoleRoute allowedRoles={["USER"]} />}>
          <Route path="/myregistrations" element={<EventRegistrationPage />} />
          <Route path="/organizerreview" element={<OrganizationList />} />
          <Route path="/organizer/:id/reviews" element={<OrganizerReview />} />
        </Route>

        {/* ORGANIZER only routes */}
        <Route element={<RoleRoute allowedRoles={["ORGANIZER"]} />}>
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/manageattendance/:id" element={<ManageAttendance />} />
          {/* <Route path="/organizer/dashboard" element={<Dashboard />} />
          
          <Route path="/organizer/manageevent" element={<ManageEvent />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
