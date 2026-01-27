import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={event.image?.url}
        alt={event.title}
        className="h-44 w-full object-cover"
      />

      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg md:text-xl text-gray-900">
          {event.title}
        </h3>

        <p className="text-sm md:text-base text-gray-500">
          {new Date(event.startTime).toLocaleDateString()}
        </p>

        <p className="text-sm md:text-base text-gray-500">
          Seats left:{" "}
          <span className="font-medium text-gray-700">
            {event.availableSeats}
          </span>
        </p>

        <Link
          to={`/event/${event._id}`}
          className="block text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 font-medium transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
