import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "../components/EventCard";
import { fetchEvents } from "../features/events";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useDispatch();

  const { events, loading, error, pagination } = useSelector(
    (state) => state.events
  );

  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6; 

  // Fetch events whenever page changes
  useEffect(() => {
    try{
      dispatch(fetchEvents({ page: currentPage, limit: eventsPerPage })).unwrap();
    }
    catch(error){
      toast.error("Failed to fetch events");
    }
  }, [dispatch, currentPage]);

  // Filter events after fetching
  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
      .filter((e) => (mode ? e.mode === mode : true));
  }, [events, search, mode]);

  // Total pages based on pagination info from backend
  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-5 mt-18 text-black-600">
        Events
      </h1>

      {/* Search and Mode Filter */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1"
        />

        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="">All</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading events...
        </p>
      </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

          {/* Pagination Controls */}
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
      )}
    </div>
  );
}
