import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchEventById, updateSelectedEvent } from "../features/events";
import { registerForEvent} from "../features/registrations";
const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.events.selectedEvent);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    if (id) dispatch(fetchEventById(id));
  }, [dispatch, id]);

  const handleRegister = async (e) => {
    e.preventDefault();
  try {
    await dispatch(registerForEvent(id)).unwrap();
    alert("Registration successful!");
    dispatch(updateSelectedEvent({
      ...event,
      isRegistered: true,
      availableSeats: event.availableSeats - 1,
    }));
  } catch (err) {
    console.error("Error during registration:", err);
  }
};


  if (loading) {
    return (
      <p className="pt-20 p-8 text-center text-gray-500">Loading event...</p>
    );
  }

  if (error) {
    return <p className="pt-20 p-8 text-center text-red-500">{error}</p>;
  }

  if (!event) {
    return (
      <p className="pt-20 p-8 text-center text-gray-500">Event not found</p>
    );
  }

  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  return (
    <div className="pt-20 p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
      {/* Event Image */}
      {event.image?.url && (
        <img
          src={event.image.url}
          alt={event.title}
          className="w-full mt-6 h-64 object-cover rounded-xl mb-6"
        />
      )}

      {/* Title & Status */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            event.status === "COMPLETED"
              ? "bg-gray-200 text-gray-700"
              : "bg-green-100 text-green-800"
          }`}
        >
          {event.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-6">{event.description}</p>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-gray-500 text-sm">Start Time</h2>
          <p className="text-gray-800">{start.toLocaleString()}</p>
        </div>
        <div>
          <h2 className="text-gray-500 text-sm">End Time</h2>
          <p className="text-gray-800">{end.toLocaleString()}</p>
        </div>
      </div>

      {/* Location & Mode */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-gray-500 text-sm">Location</h2>
          <p className="text-gray-800">{event.location}</p>
        </div>
        <div>
          <h2 className="text-gray-500 text-sm">Mode</h2>
          <p className="text-gray-800 capitalize">{event.mode}</p>
        </div>
      </div>

      {/* Capacity & Available Seats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-gray-500 text-sm">Capacity</h2>
          <p className="text-gray-800">{event.capacity}</p>
        </div>
        <div>
          <h2 className="text-gray-500 text-sm">Available Seats</h2>
          <p className="text-gray-800">{event.availableSeats}</p>
        </div>
      </div>

      {/* Eligibility */}
      {event.eligibilityRules && (
        <div className="mb-6">
          <h2 className="text-gray-500 text-sm mb-1">Eligibility Age</h2>
          <p className="text-gray-800">
            {event.eligibilityRules.minAge} - {event.eligibilityRules.maxAge}{" "}
            years
          </p>
        </div>
      )}

      {/* Register Button */}
      <div className="mt-8 text-center">
        {["COMPLETED", "ARCHIVED", "ONGOING"].includes(event.status) ? (
          <button
            disabled
            className="px-6 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed"
          >
            Event Closed
          </button>
        ) : event.isRegistered ? (
          <button
            disabled
            className="px-6 py-2 rounded-lg bg-blue-200 text-blue-800 cursor-not-allowed"
          >
            Registered ✓
          </button>
        ) : event.availableSeats === 0 ? (
          <button
            disabled
            className="px-6 py-2 rounded-lg bg-red-200 text-red-700 cursor-not-allowed"
          >
            Full
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRegister}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Register Now
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
