import React from "react";

const tasks = [
  {
    id: "FIG-123",
    title: "Task 1",
    category: "Project 1",
    priority: "High",
    date: "Dec 5",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: "FIG-122",
    title: "Task 2",
    category: "Acme GTM",
    priority: "Low",
    date: "Dec 5",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    id: "FIG-121",
    title: "Write blog post for demo day",
    category: "Acme GTM",
    priority: "High",
    date: "Dec 5",
    time: "12:00 PM",
    status: "Pending",
  },
  {
    id: "FIG-120",
    title: "Publish blog page",
    category: "Website launch",
    priority: "Low",
    date: "Dec 5",
    time: "01:00 PM",
    status: "Pending",
  },
  {
    id: "FIG-119",
    title: "Add gradients to design system",
    category: "Design backlog",
    priority: "Medium",
    date: "Dec 5",
    time: "02:00 PM",
    status: "Pending",
  },
  // Add more tasks as needed
];

const TaskList = () => {
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
              <td className="border p-2">{task.title}</td>
              <td className="border p-2">{task.date}</td>
              <td className="border p-2">{task.time}</td>
              <td className="border p-2">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    task.status === "Confirmed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="border p-2">
                <button className="bg-black text-white p-2 rounded mr-2">
                  Xem bệnh án
                </button>
                <button className="bg-black text-white p-2 rounded">
                  Xem hình ảnh
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
