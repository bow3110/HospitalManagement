import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import formatDate from "../../utils/formatDate";
import { Link } from "react-router-dom";
const TaskList = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/schedule/getSchedules?doctorId=${user.id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        const tasksWithPatientData = await Promise.all(
          data.map(async (task) => {
            const patientResponse = await fetch(
              `http://localhost:5000/api/patient/data?patientID=${task.patient_id}`,
              {
                credentials: "include",
              }
            );
            const patientData = await patientResponse.json();
            return {
              ...task,
              patient: patientData,
            };
          })
        );

        setTasks(tasksWithPatientData);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm bệnh nhân"
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
            <th className="border p-2 text-left">Tên bệnh nhân</th>
            <th className="border p-2 text-left">Ngày</th>
            <th className="border p-2 text-left">Giờ</th>
            <th className="border p-2 text-left">Trạng thái</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border p-2">{task.id}</td>
              <td className="border p-2">{task.patient.fullname}</td>
              <td className="border p-2">{formatDate(task.date)}</td>
              <td className="border p-2">{task.time}</td>
              <td className="border p-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    task.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="border p-2">
                <Link to={`/records?patientId=${task.patient.patient_id}`}>
                  <button className="bg-black text-white p-2 rounded mr-2">
                    Xem bệnh án
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
