import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    navigate("/login");
  };

  /*ROLE BASED MENU */
  const menuItems = useMemo(() => {
    /* Guest */
    if (!isLoggedIn) {
      return [
        { label: "Home", path: "/" },
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];
    }

    /* Organizer*/
    if (user?.role === "ORGANIZER") {
      return [
        { label: "Home", path: "/" },
        { label: "Dashboard", path: "/organizer/dashboard" },
        { label: "Create Event", path: "/createevent" },
        { label: "Manage Event", path: "/organizer/manageevent" },
        { label: "Manage Attendance", path: "/manageattendance/:id" },
        { label: "Logout", action: handleLogout },
      ];
    }

    /* Normal USER */
    return [
      { label: "Home", path: "/" },
      { label: "My Registrations", path: "/myregistrations" },
      { label: "Organizer Review", path: "/organizerreview" },
      { label: "Logout", action: handleLogout },
    ];
  }, [isLoggedIn, user]);

  /* ------------------------- */

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Eventify
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item, i) => {
              /* Action button (Logout) */
              if (item.action) {
                return (
                  <button
                    key={i}
                    onClick={item.action}
                    className="px-4 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    {item.label}
                  </button>
                );
              }

              /* Normal link */
              return (
                <Link
                  key={i}
                  to={item.path}
                  className="font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          {menuItems.map((item, i) => {
            if (item.action) {
              return (
                <button
                  key={i}
                  onClick={item.action}
                  className="block w-full text-left px-4 py-2 text-red-600"
                >
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={i}
                to={item.path}
                className="block px-4 py-2 hover:bg-blue-50"
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
