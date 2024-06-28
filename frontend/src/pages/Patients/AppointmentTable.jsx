import React from "react";

const appointments = [
  {
    id: "FIG-123",
    name: "Bác sĩ A",
    date: "Dec 5",
    time: "10:00 AM",
    status: "Placeholder",
    accept: true,
    cancel: false,
  },
  {
    id: "FIG-122",
    name: "Bác sĩ B",
    date: "Dec 5",
    time: "11:00 AM",
    status: "Placeholder",
    accept: true,
    cancel: false,
  },
  {
    id: "FIG-120",
    name: "Bác sĩ C",
    date: "Dec 5",
    time: "12:00 PM",
    status: "Placeholder",
    accept: true,
    cancel: false,
  },
];

const AppointmentsTable = () => {
  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Tên bác sĩ
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Ngày
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Giờ
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Xác nhận
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {appointment.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {appointment.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {appointment.date}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {appointment.time}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {appointment.status}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    className={`p-2 rounded ${
                      appointment.cancel
                        ? "bg-red-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {appointment.cancel ? "Cancel" : "Accept"}
                  </button>
                  <button
                    className={`p-2 rounded ${
                      appointment.accept
                        ? "bg-red-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {appointment.accept ? "Cancel" : "Accept"}
                  </button>
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
