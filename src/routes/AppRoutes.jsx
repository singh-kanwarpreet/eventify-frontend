import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import EventDetails from "../pages/EventDetails";
import Navbar from "../components/Navbar.jsx";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/event/:id" element={<EventDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
