import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchOrganizerDashboard,
  deleteEvent,
  archiveEvent,
  unarchiveEvent,
} from "../../features/organizerDashboard";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, events, loading } = useSelector(
    (state) => state.organizerDashboard,
  );

  useEffect(() => {
    try {
      dispatch(fetchOrganizerDashboard());
    } catch (err) {
      toast.error("Failed to fetch dashboard");
    }
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await dispatch(deleteEvent(id));
        toast.success("Event deleted successfully");
      } catch (err) {
        toast.error("Failed to delete event");
      }
    }
  };

  const handleArchive = async (id) => {
    if (window.confirm("Are you sure you want to archive this event?")) {
      try {
        await dispatch(archiveEvent(id));
        toast.success("Event archived successfully");
      } catch (err) {
        toast.error("Failed to archive event");
      }
    }
  };

  const handleUnarchive = async (id) => {
    if (window.confirm("Are you sure you want to unarchive this event?")) {
      try {
        await dispatch(unarchiveEvent(id));
        toast.success("Event unarchived successfully");
      } catch (err) {
        toast.error("Failed to unarchive event");
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mt-20 mb-6">Organizer Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2>Total Events</h2>
          <p className="text-2xl">{stats.totalEvents}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2>Total Registrations</h2>
          <p className="text-2xl">{stats.totalRegistrations}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2>Average Rating</h2>
          <p className="text-2xl">{Number(stats.avgRating || 0).toFixed(1)}</p>
        </div>
      </div>

      {/* Events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold">{event.title}</h3>
            <p className="text-sm text-gray-600">
              {new Date(event.startTime).toLocaleString()}
            </p>
            <p className="text-sm font-medium mt-1">Status: {event.status}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Link
                to={`/manageattendance/${event._id}`}
                className="inline-block px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Manage Attendance
              </Link>

              {event.status === "COMPLETED" && (
                <button
                  onClick={() => handleArchive(event._id)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                >
                  Archive
                </button>
              )}

              {event.status === "ARCHIVED" && (
                <button
                  onClick={() => handleUnarchive(event._id)}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded"
                >
                  Unarchive
                </button>
              )}

              <button
                onClick={() => handleDelete(event._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
