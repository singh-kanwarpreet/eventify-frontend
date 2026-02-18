import axios from "./axios";

export const fetchMyRegistrationsAPI = async ({ page = 1, limit = 6, status } = {}) => {
  const res = await axios.get(
    `events/registrations/my?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`
  );
  return res.data;
};
  

export const registerAPI = async (eventId) => {
  const res = await axios.post(`events/register/${eventId}`);
  return res.data;
};

export const fetchRegistrationsForEventAPI = async (eventId) => {
  const res = await axios.get(`events/${eventId}/registrations`);
  return res.data;
};


