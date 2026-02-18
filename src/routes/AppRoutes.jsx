import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx";
import EventDetails from "../pages/EventDetails.jsx";
import EventRegistrationPage from "../pages/user/MyRegistrations.jsx";
import ManageAttendance from "../pages/organizer/ManageAttendance.jsx";
import OrganizationList from "../pages/user/OrganizationList.jsx";
import OrganizerReview from "../pages/user/OrganizerReview.jsx";
import Navbar from "../components/Navbar.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import GuestRoute from "./GuestRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";

/* Organizer pages */
import Dashboard from "../pages/organizer/Dashboard";
import CreateEvent from "../pages/organizer/CreateEvent";

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
          <Route path="/organizer/dashboard" element={<Dashboard />} />
          
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
