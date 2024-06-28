// src/components/PatientRecord/PatientRecord.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { patientsData } from "../../data/patientsData";

const PatientRecord = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const recordId = queryParams.get("recordId");
  const navigate = useNavigate();

  const record = patientsData
    .flatMap((p) => p.records)
    .find((r) => r.id === recordId);

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
          <p>Cơ quan chủ quản:</p>
          <p>Cơ sở KB, CB:</p>
        </div>
        <div className="text-right">
          <p>MS: {record.id}</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">I. HÀNH CHÍNH</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Họ và tên: _______________________</p>
          </div>
          <div>
            <p>Ngày sinh: ______ / ______ / ______</p>
          </div>
        </div>
        <p>Giới tính: _______________________</p>
        <p>Địa chỉ: _______________________</p>
        <p>Ngày khám: _______________________</p>
        <p>Bác sĩ khám bệnh: _______________________</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">II. CHẨN ĐOÁN</h3>
        <p>Triệu chứng bệnh: _______________________</p>
        <p>Chẩn đoán bệnh: _______________________</p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">III. PHÁC ĐỒ ĐIỀU TRỊ BỆNH</h3>
        <p>______________________________________________</p>
      </div>
      <div className="flex justify-end mt-8">
        <button className="bg-black text-white px-4 py-2 rounded">
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default PatientRecord;
