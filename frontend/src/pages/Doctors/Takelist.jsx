import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import formatDate from "../../utils/formatDate";
import { Link } from "react-router-dom";

const TaskList = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");

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
        setFilteredTasks(tasksWithPatientData);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user.id]);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.patient.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "latest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredTasks(filtered);
  }, [searchTerm, tasks, sortOption]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm bệnh nhân"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-1/3"
        />
        <div className="relative inline-block text-left">
          <button
            className="p-2 border border-gray-300 rounded-lg"
            onClick={() =>
              document
                .getElementById("dropdown-menu")
                .classList.toggle("hidden")
            }
          >
            Bộ lọc
          </button>
          <div
            id="dropdown-menu"
            className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-20"
          >
            <button
              className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setSortOption("latest")}
            >
              Mới nhất
            </button>
            <button
              className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setSortOption("oldest")}
            >
              Lâu nhất
            </button>
          </div>
        </div>
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
          {filteredTasks.map((task) => (
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
                      : task.status === "unapproved"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {task.status === "approved"
                    ? "Đồng ý"
                    : task.status === "unapproved"
                    ? "Đã từ chối"
                    : "Đang chờ xác nhận"}
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
