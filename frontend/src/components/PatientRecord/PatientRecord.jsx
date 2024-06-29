// src/components/PatientRecord/PatientRecord.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("vi-VN", options);
};
const PatientRecord = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const recordId = queryParams.get("recordId");
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/record/details?recordId=${recordId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch record");
          return;
        }

        const data = await response.json();
        console.log(data);
        const patient_id = data.patient_id;
        const doctor_id = data.doctor_id;

        // Fetch patient data
        const patientResponse = await fetch(
          `http://localhost:5000/api/patient/data?patientID=${patient_id}`,
          {
            credentials: "include",
          }
        );
        if (!patientResponse.ok) {
          console.error("Error fetching patient info");
          return;
        }
        const patientData = await patientResponse.json();

        // Fetch doctor data
        const doctorResponse = await fetch(
          `http://localhost:5000/api/doctor/data?doctorId=${doctor_id}`,
          {
            credentials: "include",
          }
        );
        if (!doctorResponse.ok) {
          console.error("Error fetching doctor info");
          return;
        }
        const doctorData = await doctorResponse.json();

        setDoctor(doctorData);
        setPatient(patientData);
        setRecord(data);
      } catch (error) {
        console.error("Failed to fetch record:", error);
      }
    };

    fetchRecord();
  }, [recordId]);

  if (!record) {
    return <div>Record not found</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md relative">
      <button
        onClick={() => navigate(-1)}
        className="bg-black text-white px-3 py-1 rounded absolute top-4 left-4"
      >
        &larr; Quay lại
      </button>
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold">
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </h1>
        <p className="text-sm">Độc lập - Tự do - Hạnh phúc</p>
        <p className="text-sm">---------------------------</p>
        <h2 className="text-2xl font-bold mt-4">BẢN TÓM TẮT HỒ SƠ BỆNH ÁN</h2>
      </div>
      <div className="flex justify-between mb-6">
        <div>
          <p>Cơ quan chủ quản: Đại học Bách Khoa Hà Nội</p>
          <p>Cơ sở KB, CB: Bệnh viện Bách Khoa </p>
        </div>
        <div className="text-right">
          <p>MS: {record.id}</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">I. HÀNH CHÍNH</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Họ và tên: {patient.fullname}</p>
          </div>
          <div>
            <p>Ngày sinh: {formatDate(patient.birthday)}</p>
          </div>
        </div>
        <p>Giới tính: {patient.gender === "male" ? "Nam" : "Nữ"}</p>
        <p>Địa chỉ: {patient.address}</p>
        <p>Ngày khám: {formatDate(record.date)}</p>
        <p>Bác sĩ khám bệnh: {doctor.fullname}</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">II. CHẨN ĐOÁN</h3>
        <p>Chẩn đoán bệnh: {record.summary}</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">III. PHÁC ĐỒ ĐIỀU TRỊ BỆNH</h3>
        <p>{record.treatment_regimen}</p>
      </div>
    </div>
  );
};

export default PatientRecord;
