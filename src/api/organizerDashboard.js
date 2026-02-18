import axios from "./axios";

export const fetchOrganizerDashboardAPI = async () => {
  const res = await axios.get("/organizer/dashboard");
  return res.data;
};

export const fetchEventRegistrationsAPI = async (eventId) => {
  const res = await axios.get(`/organizer/event/${eventId}/registrations`);
  return res.data;
};

export const markAttendanceBulkAPI = async (eventId, attendanceData) => {
  const res = await axios.post(
    `organizer/${eventId}/registrations/mark-attendance`,
    { attendance: attendanceData }
  );
  return res.data;
};

export const deleteEventAPI = async (eventId) => {
  const res = await axios.delete(`organizer/event/${eventId}`);
  return res.data;
}

export const archiveEventAPI = async (eventId) => {
  const res = await axios.put(`organizer/event/${eventId}/archive`);
  return res.data;
}
export const unarchiveEventAPI = async (eventId) => {
  const res = await axios.put(`organizer/event/${eventId}/unarchive`);
  return res.data;
}