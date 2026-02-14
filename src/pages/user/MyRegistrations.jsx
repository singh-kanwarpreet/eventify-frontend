import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyRegistrations } from "../../features/registrations";
import EventCard from "../../components/EventCard";

export default function EventRegistrationPage() {
  const dispatch = useDispatch();

  const { registeredEvents = [], loading } = useSelector(
    (state) => state.registrations,
  );

  const [activeTab, setActiveTab] = useState("UPCOMING");

  useEffect(() => {
    if (!registeredEvents || registeredEvents.length === 0) {
      dispatch(fetchMyRegistrations());
    }
  }, [dispatch]);

  const filteredEvents = registeredEvents.filter(
    (event) => event.eventId?.status === activeTab,
  );

  const counts = {
    UPCOMING: registeredEvents.filter((e) => e.eventId?.status === "UPCOMING")
      .length,
    ONGOING: registeredEvents.filter((e) => e.eventId?.status === "ONGOING")
      .length,
    COMPLETED: registeredEvents.filter((e) => e.eventId?.status === "COMPLETED")
      .length,
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg animate-pulse">
        Loading events...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <h1 className="text-2xl mt-20 sm:text-3xl font-bold mb-6">
          My Registrations
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["UPCOMING", "ONGOING", "COMPLETED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-5 py-2 rounded-full text-sm sm:text-base font-medium
                transition-all duration-200 shadow-sm
                flex items-center gap-2
                ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white border hover:bg-gray-100"
                }
              `}
            >
              {tab}
              <span
                className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${
                    activeTab === tab
                      ? "bg-white text-blue-600"
                      : "bg-gray-200 text-gray-600"
                  }
                `}
              >
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event.eventId} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">No events found</p>
            <p className="text-sm">Try another category</p>
          </div>
        )}
      </div>
    </div>
  );
}
