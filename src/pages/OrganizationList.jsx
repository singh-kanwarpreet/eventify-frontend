import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganizerList } from "../features/organizerReview";
import { Link } from "react-router-dom";

const OrganizationList = () => {
  const dispatch = useDispatch();
  const { organizers, loadingOrganizers } = useSelector(
    (state) => state.organizer
  );
  useEffect(() => {
    dispatch(fetchOrganizerList())
      .unwrap()
      .catch((err) => {
        console.error("Failed to load organizers:", err);
      });
  }, [dispatch]);

  if (loadingOrganizers)
    return (
      <p className="p-4 text-center text-gray-500 font-medium mt-20">
        Loading organizers...
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 mt-20 text-indigo-500 text-center">
        Organizations
      </h2>

      {organizers.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No organizers found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {organizers.map((org) => (
            <div
              key={org._id}
              className="border rounded-xl p-5 flex flex-col items-center text-center bg-linear-to-br from-white to-indigo-50 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-72"
            >
              {/* Circular avatar */}
              <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-2xl font-semibold overflow-hidden">
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

              <h3 className="font-semibold text-xl text-gray-800 mb-1">
                {org.organizationName}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
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
