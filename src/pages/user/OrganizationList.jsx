import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizerList } from "../../features/organizerReview";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const OrganizationList = () => {
  const dispatch = useDispatch();
  const { organizers, loadingOrganizers } = useSelector(
    (state) => state.organizer,
  );

  const [search, setSearch] = useState("");
  const [filteredOrganizers, setFilteredOrganizers] = useState([]);

  useEffect(() => {
    dispatch(fetchOrganizerList())
      .unwrap()
      .catch((err) => {
        toast.error(err || "Failed to load organizers");
      });
  }, [dispatch]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredOrganizers(organizers);
    } else {
      setFilteredOrganizers(
        organizers.filter((org) =>
          org.organizationName.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [search, organizers]);

  if (loadingOrganizers)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading organizers...
        </p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-6 mt-16 text-indigo-500 text-center">
        Organizations
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search organizations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {filteredOrganizers.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No organizers found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredOrganizers.map((org) => (
            <div
              key={org._id}
              className="border rounded-xl p-4 sm:p-5 flex flex-col items-center text-center bg-linear-to-br from-white to-indigo-50 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Circular avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xl sm:text-2xl font-semibold overflow-hidden">
                {org.imageUrl ? (
                  <img
                    src={org.imageUrl}
                    alt={org.organizationName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  org.organizationName
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()
                )}
              </div>

              <h3 className="font-semibold text-lg sm:text-xl text-gray-800 mb-1">
                {org.organizationName}
              </h3>

              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {org.description || "No description available."}
              </p>

              <div className="text-sm mb-3 flex items-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-gray-700 font-medium">
                  {org.averageRating || 0}
                </span>
                <span className="text-orange-400">
                  ({org.reviewCount || 0} reviews)
                </span>
              </div>

              <Link
                to={`/organizer/${org._id}/reviews`}
                className="text-indigo-600 font-medium text-sm hover:underline"
              >
                View Reviews
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizationList;
