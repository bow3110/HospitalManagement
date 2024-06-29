import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import formatDate from "../../utils/formatDate";
import DoctorDetailsModal from "../../components/DoctorDetailsModal/DoctorDetailsModal";

const AppointmentsTable = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/schedule/getSchedulesPatient?patientId=${user.id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        const appointmentsWithDoctorData = await Promise.all(
          data.map(async (appointment) => {
            const doctorResponse = await fetch(
              `http://localhost:5000/api/doctor/data?doctorId=${appointment.doctor_id}`,
              {
                credentials: "include",
              }
            );
            const doctorData = await doctorResponse.json();
            return {
              ...appointment,
              doctor: doctorData,
            };
          })
        );
        setAppointments(appointmentsWithDoctorData);
        setFilteredAppointments(appointmentsWithDoctorData);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user.id]);

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter((appointment) =>
        appointment.doctor.fullname
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, appointments]);

  const handleShowDetails = (doctorId) => {
    setSelectedDoctorId(doctorId);
  };

  const handleCloseModal = () => {
    setSelectedDoctorId(null);
  };

  const handleUpdateStatus = async (scheduleId, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/schedule/modifySchedule?scheduleId=${scheduleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update schedule status");
      }

      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === scheduleId ? { ...appointment, status } : appointment
      );
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error updating schedule status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm bác sĩ"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-1/3"
        />
        <button className="p-2 border border-gray-300 rounded-lg">
          Filter
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Tên bác sĩ</th>
            <th className="border p-2 text-left">Ngày</th>
            <th className="border p-2 text-left">Giờ</th>
            <th className="border p-2 text-left">Trạng thái</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="border p-2">{appointment.id}</td>
              <td
                className="border p-2 hover:font-bold cursor-pointer"
                onClick={() => handleShowDetails(appointment.doctor_id)}
              >
                {appointment.doctor.fullname}
              </td>
              <td className="border p-2">{formatDate(appointment.date)}</td>
              <td className="border p-2">{appointment.time}</td>
              <td className="border p-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    appointment.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : appointment.status === "unapproved"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {appointment.status === "approved"
                    ? "Đã chấp nhận"
                    : appointment.status === "unapproved"
                    ? "Đã từ chối"
                    : "Đang chờ xác nhận"}
                </span>
              </td>
              <td className="border p-2">
                {appointment.status === "pending" && (
                  <>
                    <button
                      className="bg-green-400 text-white p-2 rounded mr-2"
                      onClick={() =>
                        handleUpdateStatus(appointment.id, "approved")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={() =>
                        handleUpdateStatus(appointment.id, "unapproved")
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDoctorId && (
        <DoctorDetailsModal
          doctorId={selectedDoctorId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AppointmentsTable;
