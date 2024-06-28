// src/components/RecordImages/RecordImages.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { patientsData } from "../../data/patientsData";
const RecordImage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const recordId = queryParams.get("recordId");
  const navigate = useNavigate();

  const record = patientsData
    .flatMap((p) => p.records)
    .find((r) => r.id === recordId);

  if (!record) {
    return <div>Record image not found</div>;
  }

  const { imageUrl } = record;

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
        <h2 className="text-2xl font-bold mt-4">HÌNH ẢNH XÉT NGHIỆM</h2>
        <p className="text-lg">Nội soi dạ dày, máu....</p>
      </div>
      <div className="flex justify-between mb-6">
        <div>
          <p>Cơ quan chủ quản:</p>
          <p>Cơ sở KB, CB:</p>
        </div>
        <div className="text-right">
          <p>MS: {recordId}</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">I. HÀNH CHÍNH</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Họ và tên: _______________________</p>
            <p>Giới tính: _______________________</p>
            <p>Địa chỉ: _______________________</p>
            <p>Nhân viên thực hiện: _______________________</p>
          </div>
          <div>
            <p className="text-right">Ngày sinh: ______ / ______ / ______</p>
            <p className="text-right">Ngày khám: _______________________</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">II. HÌNH ẢNH</h3>
        <img
          src={imageUrl}
          alt={`Record ${recordId}`}
          className="w-full h-auto"
        />
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">III. KẾT QUẢ</h3>
        <p>______________________________________________</p>
      </div>
    </div>
  );
};

export default RecordImage;
