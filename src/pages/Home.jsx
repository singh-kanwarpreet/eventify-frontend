import { useState } from "react";
import EventCard from "../components/EventCard";
import { events as mockEvents } from "../data/mockData";

export default function Home() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");

  // frontend filtering
  const filteredEvents = mockEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) &&
      (mode ? event.mode === mode : true),
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <section className="relative h-105 flex flex-col items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Discover Upcoming Events
          </h1>
          <p className="text-gray-200 text-sm md:text-lg">
            Find and register for exciting events near you
          </p>
        </div>

        {/*FLOATING SEARCH BAR*/}
        <div className="absolute -bottom-10 w-full px-4 flex justify-center z-20">
          <div className="bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-3 w-full max-w-4xl">
            {/*Search Input*/}
            <div className="flex-1 flex items-center gap-2 border rounded-xl px-4 py-3">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full outline-none text-gray-700 text-sm md:text-base"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/*Mode Select with Right Arrow*/}
            <div className="relative flex-1">
              <select
                className="border rounded-xl w-full px-4 py-3 text-gray-700 text-sm md:text-base appearance-none"
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>

              {/* Custom Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/*Search Button*/}
            <button className="bg-black hover:bg-gray-900 text-white px-6 md:px-8 py-3 rounded-xl font-medium text-sm md:text-base transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/*EVENTS GRID*/}
      <section className="max-w-7xl mx-auto px-6 py-12 pt-24">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-900 tracking-wide">
          Upcoming Events
        </h2>

        {filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-base md:text-lg">No events found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
