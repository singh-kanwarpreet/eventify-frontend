import axios from "./axios";

// Get organizer list
export const organizerList = async () => {
  const res = await axios.get("/reviews/organizers");
  return res.data;
};

// Get reviews and details for an organizer
export const getOrganizerDetails = async (organizerId) => {
  const res = await axios.get(`/reviews/organizer/${organizerId}`);
  return res.data;
};

// Add a review
export const createOrganizerReview = async (payload) => {
  const res = await axios.post(`/reviews/organizer/${payload.organizerId}/reviews`, payload);
  return res.data;
};