import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyRegistrations } from "../../features/registrations";
import EventCard from "../../components/EventCard";
import { toast } from "react-toastify";
export default function EventRegistrationPage() {
  const dispatch = useDispatch();

  const {
    registeredEvents = [],
    loading,
    pagination,
  } = useSelector((state) => state.registrations);

  const [activeTab, setActiveTab] = useState("UPCOMING");
  const [currentPage, setCurrentPage] = useState(1);

  const eventsPerPage = pagination?.limit || 6;
  const totalPages = pagination?.totalPages || 1;

  // Fetch registrations on page or tab change
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchMyRegistrations({
            page: currentPage,
            limit: eventsPerPage,
            status: activeTab,
          }),
        ).unwrap();
      } catch (err) {
        toast.error(err || "Failed to fetch registrations");
      }
    };
    fetchData();
  }, [dispatch, currentPage, activeTab]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading registrations...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {registeredEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {registeredEvents.map((event) => (
                <EventCard key={event._id} event={event.eventId} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg mb-2">No events found</p>
            <p className="text-sm">Try another category</p>
          </div>
        )}
      </div>
    </div>
  );
}
