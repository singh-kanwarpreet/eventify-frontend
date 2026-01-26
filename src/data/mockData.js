// SAME structure as your mongoose models

export const events = [
  {
    _id: "1",
    title: "Tech Conference 2026",
    description: "Latest tech trends and networking",
    location: "Chandigarh",
    mode: "offline",
    capacity: 100,
    availableSeats: 45,
    startTime: new Date(),
    endTime: new Date(),
    image: {
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    },
    organizerId: "org1",
  },
  {
    _id: "2",
    title: "Startup Workshop",
    description: "Learn startup basics",
    location: "Online",
    mode: "online",
    capacity: 200,
    availableSeats: 120,
    startTime: new Date(),
    endTime: new Date(),
    image: {
      url: "https://images.unsplash.com/photo-1515169067868-5387ec356754",
    },
    organizerId: "org1",
  },
];

export const registrations = [
  {
    _id: "r1",
    eventId: events[0],
    attended: true,
    certificateSent: true,
  },
];

export const reviews = [
  {
    _id: "rev1",
    rating: 5,
    comment: "Amazing organizer 🔥",
  },
];
