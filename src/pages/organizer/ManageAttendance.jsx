import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEventRegistrations,markAttendanceBulk } from "../../features/organizerDashboard";

const ManageAttendance = () => {
  const { id: eventId } = useParams();
  const dispatch = useDispatch();

  const registrationsFromRedux = useSelector(
    (state) => state.organizer.eventRegistrations
  );

  // local attendance state
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    dispatch(fetchEventRegistrations(eventId));
  }, [dispatch, eventId]);

  // copy redux to local
  useEffect(() => {
    setRegistrations(registrationsFromRedux || []);
  }, [registrationsFromRedux]);


  const handleAttendance = (id) => {
    setRegistrations((prev) =>
      prev.map((reg) =>
        reg._id === id ? { ...reg, attended: !reg.attended } : reg
      )
    );
  };

  // submit attendance data to backend
  const handleSubmit = async() => {
    const attendanceData = registrations.map((r) => ({
      id: r._id,
      attended: r.attended,
    }));
    try{
      await dispatch(markAttendanceBulk({ eventId, attendanceData })).unwrap();
      alert("Attendance marked successfully!");
    }
    catch(error){
      console.error("Error marking attendance:", error);
    }
    console.log("Final Attendance Data:", attendanceData);

    
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Attendance</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Registered At</th>
              <th className="p-3 text-center">Attended</th>
            </tr>
          </thead>

          <tbody>
            {registrations?.map((reg) => (
              <tr key={reg._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 font-medium">{reg.userId?.name}</td>
                <td className="p-3 text-gray-600">{reg.userId?.email}</td>
                <td className="p-3">
                  {new Date(reg.registeredAt).toLocaleDateString()}
                </td>

                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={reg.attended}
                    onChange={() => handleAttendance(reg._id)}
                    className="h-5 w-5 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {registrations?.length === 0 && (
          <p className="text-center p-6 text-gray-500">
            No registrations found
          </p>
        )}

        {/*Submit button */}
        <div className="p-4 text-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAttendance;
