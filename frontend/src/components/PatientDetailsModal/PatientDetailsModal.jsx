// src/components/PatientDetailsModal/PatientDetailsModal.jsx
import React from "react";

const patientsData = [
  {
    id: "1",
    name: "Hoang Duy Anh",
    gender: "Nam",
    birthDate: "01/01/1990",
    healthCardNumber: "123456789",
  },
  {
    id: "2",
    name: "Hoang Thi Kieu Thuong",
    gender: "Nữ",
    birthDate: "02/02/1992",
    healthCardNumber: "987654321",
  },
];

const PatientDetailsModal = ({ patientId, onClose }) => {
  const patient = patientsData.find((p) => p.id === patientId);

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
            value={patient.name}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Giới tính</label>
          <input
            type="text"
            value={patient.gender}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ngày sinh</label>
          <input
            type="text"
            value={patient.birthDate}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Số thẻ BHYT</label>
          <input
            type="text"
            value={patient.healthCardNumber}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
