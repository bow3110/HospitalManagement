import React from "react";

const appointments = [
  {
    id: "FIG-123",
    task: "Task 1",
    project: "Project 1",
    priority: "High",
    date: "Dec 5",
  },
  {
    id: "FIG-123",
    task: "Task 2",
    project: "Acme GTM",
    priority: "Low",
    date: "Dec 5",
  },
  {
    id: "FIG-120",
    task: "Write blog post for demo day",
    project: "Acme GTM",
    priority: "High",
    date: "Dec 5",
  },
];

const AppointmentsTable = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">ID</th>
              <th className="py-2 px-4 border-b border-gray-300">Task</th>
              <th className="py-2 px-4 border-b border-gray-300">Project</th>
              <th className="py-2 px-4 border-b border-gray-300">Priority</th>
              <th className="py-2 px-4 border-b border-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {appointment.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {appointment.task}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {appointment.project}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {appointment.priority}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {appointment.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;
