// src/components/PatientDetailsModal/PatientDetailsModal.jsx
import React, { useEffect, useState } from "react";

const PatientDetailsModal = ({ patientId, onClose }) => {
  const [patient, setPatient] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/patient/data?patientID=${patientId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching patient info:", errorData.message);
          return;
        }

        const data = await response.json();
        console.log(data);
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient info:", error);
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (!patient) {
    return <div>Không tìm thấy bệnh nhân</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white shadow-md rounded p-6 w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-5 text-gray-600 text-[25px]"
        >
          &times;
        </button>
        <h2 className="text-center text-xl font-bold mb-4">
          THÔNG TIN BỆNH NHÂN
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Họ và Tên</label>
          <input
            type="text"
            value={patient.fullname}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Giới tính</label>
          <input
            type="text"
            value={patient.gender === "male" ? "Nam" : "Nữ"}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ngày sinh</label>
          <input
            type="text"
            value={formatDate(patient.birthday)}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Số thẻ BHYT</label>
          <input
            type="text"
            value={patient.health_card}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
