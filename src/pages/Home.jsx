import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "../components/EventCard";
import { fetchEvents } from "../features/events";

export default function Home() {
  const dispatch = useDispatch();

  const { events, loading, error } = useSelector((state) => state.events);

  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.status === "UPCOMING" || e.status === "ONGOING")
      .filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((e) => (mode ? e.mode === mode : true));
  }, [events, search, mode]);

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-5 mt-9">Upcoming Events</h1>

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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
