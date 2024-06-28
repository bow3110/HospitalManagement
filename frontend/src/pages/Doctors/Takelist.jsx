import React from "react";

const TaskList = () => {
  const tasks = [
    {
      id: "FIG-123",
      title: "Task 1",
      category: "Project 1",
      priority: "High",
      date: "",
      confirmed: true,
    },
    {
      id: "FIG-122",
      title: "Task 2",
      category: "Acme GTM",
      priority: "Low",
      date: "Dec 5",
      confirmed: false,
    },
    {
      id: "FIG-121",
      title: "Write blog post for demo day",
      category: "Acme GTM",
      priority: "High",
      date: "Dec 5",
      confirmed: false,
    },
    {
      id: "FIG-120",
      title: "Publish blog page",
      category: "Website launch",
      priority: "Low",
      date: "Dec 5",
      confirmed: false,
    },
    {
      id: "FIG-119",
      title: "Add gradients to design system",
      category: "Design backlog",
      priority: "Medium",
      date: "Dec 5",
      confirmed: false,
    },
    // Add more tasks as needed
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="p-2 border rounded-lg w-1/3"
        />
        <button className="p-2 border rounded-lg">Filter</button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Task Name</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Priority</th>
            <th className="border p-2 text-left">Date</th>
            <th className="border p-2 text-left">Confirmed</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="border p-2">{task.id}</td>
              <td className="border p-2">{task.title}</td>
              <td className="border p-2">{task.category}</td>
              <td className="border p-2">{task.priority}</td>
              <td className="border p-2">{task.date}</td>
              <td className="border p-2 text-center">
                {task.confirmed ? "✔️" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
