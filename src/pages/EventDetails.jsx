import { useParams } from "react-router-dom";
const EventDetails = () => {
  const params = useParams();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Event Details</h1>
      <p className="text-lg mt-4">Event ID: {params.id}</p>
    </div>
  );
};

export default EventDetails;
