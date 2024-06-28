import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
const AppointmentForm = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    patientID: "",
    patientName: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      if (form.patientID === "") {
        setForm((prevForm) => ({ ...prevForm, patientName: "" }));
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/patient/data?patientID=${form.patientID}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching patient info:", errorData.message);
          setForm((prevForm) => ({ ...prevForm, patientName: "" }));
          return;
        }

        const data = await response.json();

        setForm((prevForm) => ({
          ...prevForm,
          patientID: data.patient_id,
          patientName: data.fullname,
        }));
      } catch (error) {
        setForm((prevForm) => ({ ...prevForm, patientName: "" }));
      }
    };

    fetchPatientData();
  }, [form.patientID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit form logic here

    try {
      const response = await fetch(
        "http://localhost:5000/api/doctor/makeSchedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            patientId: form.patientID,
            date: form.appointmentDate,
            time: form.appointmentTime,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error making appointment:", errorData.message);
        return;
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error making appointment:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-gray-200 p-8 rounded-md shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">HẸN LỊCH KHÁM</h1>
        <div className="mb-4">
          <label className="block text-gray-700">ID Bệnh nhân</label>
          <input
            type="text"
            name="patientID"
            value={form.patientID}
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
            readOnly
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
