import React, { useState } from "react";

const AppointmentForm = () => {
  const [form, setForm] = useState({
    doctorName: "",
    patientName: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-gray-200 p-8 rounded-md shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">HẸN LỊCH KHÁM</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Tên Bác sĩ</label>
          <input
            type="text"
            name="doctorName"
            value={form.doctorName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Placeholder"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tên Bệnh nhân</label>
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Placeholder"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ngày tái khám</label>
          <input
            type="date"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Placeholder"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Giờ khám</label>
          <input
            type="time"
            name="appointmentTime"
            value={form.appointmentTime}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Placeholder"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-black text-white p-2 rounded-md">
            Hẹn lịch khám
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
