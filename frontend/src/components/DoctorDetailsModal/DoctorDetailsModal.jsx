// src/components/DoctorDetailsModal/DoctorDetailsModal.jsx
import React, { useEffect, useState } from "react";

const DoctorDetailsModal = ({ doctorId, onClose }) => {
  const [doctor, setDoctor] = useState(null);
  const [department, setDepartment] = useState(null);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  useEffect(() => {
    const fetchdoctorData = async () => {
      if (!doctorId) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/doctor/data?doctorId=${doctorId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching doctor info:", errorData.message);
          return;
        }

        const data = await response.json();
        console.log(data);
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchdoctorData();
  }, [doctorId]);

  if (!doctor) {
    return <div>Không tìm thấy bác sĩ</div>;
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
        <h2 className="text-center text-xl font-bold mb-4">THÔNG TIN BÁC SĨ</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Họ và Tên</label>
          <input
            type="text"
            value={doctor.fullname}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Giới tính</label>
          <input
            type="text"
            value={doctor.gender === "male" ? "Nam" : "Nữ"}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ngày sinh</label>
          <input
            type="text"
            value={formatDate(doctor.birthday)}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Chuyên ngành</label>
          <input
            type="text"
            value={doctor.department_name.name}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Năm tốt nghiệp</label>
          <input
            type="text"
            value={doctor.graduation_year}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsModal;
