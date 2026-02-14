import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrganizerDetails, addOrganizerReview } from "../../features/organizerReview";
import { useForm } from "react-hook-form";

const OrganizerReview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedOrganizer, reviews, loadingDetails, addingReview } = useSelector(
    (state) => state.organizer
  );

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { rating: 5, comment: "" },
  });

  // Fetch organizer + reviews
  useEffect(() => {
    if (id) {
      dispatch(fetchOrganizerDetails(id))
        .unwrap()
        .catch((err) => console.error("Failed to load organizer details:", err));
    }
  }, [dispatch, id]);

  const onSubmit = (data) => {
    dispatch(addOrganizerReview({ organizerId: id, ...data }))
      .unwrap()
      .then(() => reset({ rating: 5, comment: "" }))
      .catch((err) => console.error("Failed to add review:", err));
  };

  if (loadingDetails)
    return <p className="text-gray-500 text-center p-4 mt-20">Loading organizer details...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Organizer Info */}
      {selectedOrganizer && (
        <div className="mt-20 p-6 rounded-xl shadow-md bg-linear-to-br from-white to-indigo-50">
          <h2 className="text-3xl font-bold text-indigo-700 mb-2">
            {selectedOrganizer.organizationName}
          </h2>
          <p className="text-gray-700 mb-2">{selectedOrganizer.description || "No description available."}</p>
          <div className="flex items-center gap-4 text-gray-600 mb-2">
            <span>⭐ {selectedOrganizer.averageRating || 0}</span>
            <span>({selectedOrganizer.reviewCount || 0} reviews)</span>
          </div>
          <p className="italic text-gray-500">Managed by: {selectedOrganizer.managedBy?.name || "N/A"}</p>
        </div>
      )}

      {/* Leave a Review */}
      <div className="p-6 rounded-xl shadow-md bg-white">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave a Review</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Rating</label>
            <select
              {...register("rating", { required: "Rating is required" })}
              className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 ${
                errors.rating ? "focus:ring-red-400 border-red-400" : "focus:ring-indigo-400"
              }`}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} ⭐</option>
              ))}
            </select>
            {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Comment</label>
            <textarea
              {...register("comment", {
                required: "Comment is required",
                minLength: { value: 5, message: "Comment must be at least 5 characters" },
              })}
              rows={3}
              placeholder="Write your review here..."
              className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 ${
                errors.comment ? "focus:ring-red-400 border-red-400" : "focus:ring-indigo-400"
              }`}
            />
            {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
          </div>

          <button
            type="submit"
            disabled={addingReview}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-300 transition"
          >
            {addingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-gray-800">{review.userId?.name || "Anonymous"}</div>
                <div className="text-yellow-400 font-semibold">⭐ {review.rating}</div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrganizerReview;
