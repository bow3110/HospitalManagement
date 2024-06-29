// src/components/RecordImages/RecordImages.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
const RecordImage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const recordId = queryParams.get("recordId");
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/record/image?recordId=${recordId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch image");
          return;
        }

        const data = await response.json();
        console.log(data);
        setImage(data);
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
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }
    };

    fetchImage();
  }, [recordId]);

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
        <p className="text-lg">{image.imagename}</p>
      </div>
      <div className="flex justify-between mb-6">
        <div>
          <p>Cơ quan chủ quản: Đại học Bách Khoa Hà Nội</p>
          <p>Cơ sở KB, CB: Bệnh viện Bách Khoa</p>
        </div>
        <div className="text-right">
          <p>MS: {recordId}</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">I. HÀNH CHÍNH</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Họ và tên: {patient.fullname}</p>
            <p>Giới tính: {patient.gender === "male" ? "Nam" : "Nữ"}</p>
            <p>Địa chỉ: {patient.address}</p>
            <p>Nhân viên thực hiện: {doctor.fullname}</p>
          </div>
          <div>
            <p className="text-right">
              Ngày sinh: {formatDate(patient.birthday)}
            </p>
            <p className="text-right">Ngày khám: {formatDate(image.date)}</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">II. HÌNH ẢNH</h3>
        <img
          src="https://www.lompocvmc.com/images/blog/ct-scan.jpg"
          alt={`Record ${recordId}`}
          className="w-full h-auto"
        />
      </div>
      <div className="mb-6">
        <h3 className="font-bold text-lg">III. KẾT QUẢ</h3>
        <p>{image.result}</p>
      </div>
    </div>
  );
};

export default RecordImage;
