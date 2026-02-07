import axios from "./axios";

export const fetchEventsAPI = async () => {
  const res = await axios.get("events");
  return res.data;
};

export const fetchEventByIdAPI = async (id) => {
  const res = await axios.get(`events/${id}`);
  return res.data;
};

export const createEventAPI = async (eventData) => {
  const res = await axios.post("/events/organizer/create", eventData);
  return res.data;
};
