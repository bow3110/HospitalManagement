import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RecordForm = () => {
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patientId = queryParams.get("patientId");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient_id: patientId || "",
    patient_fullname: "",
    doctor_id: user.id || "",
    doctor_fullname: "",
    record_name: "",
    summary: "",
    treatment_regimen: "",
    date: "",
    image_url: "",
    imagename: "",
    result: "",
  });

  useEffect(() => {
    const fetchPatientName = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/patient/data?patientID=${formData.patient_id}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.error("Error fetching patient info");
          return;
        }

        const data = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          patient_fullname: data.fullname,
        }));
      } catch (error) {
        console.error("Failed to fetch patient name:", error);
      }
    };

    if (formData.patient_id) {
      fetchPatientName();
    }
  }, [formData.patient_id]);

  useEffect(() => {
    const fetchDoctorName = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/doctor/data?doctorId=${formData.doctor_id}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.error("Error fetching doctor info");
          return;
        }

        const data = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          doctor_fullname: data.fullname,
        }));
      } catch (error) {
        console.error("Failed to fetch doctor name:", error);
      }
    };

    fetchDoctorName();
  }, [formData.doctor_id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Insert into the image table if image data is provided
      let imageId = null;
      if (formData.image_url || formData.imagename || formData.result) {
        const imageResponse = await fetch(
          "http://localhost:5000/api/record/createRecordImage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: formData.date,
              image_url: formData.image_url,
              imagename: formData.imagename,
              result: formData.result,
            }),
            credentials: "include",
          }
        );

        if (!imageResponse.ok) {
          throw new Error("Failed to insert image data");
        }

        const imageData = await imageResponse.json();
        imageId = imageData.imageId;
      }

      // Insert into the record table
      const recordResponse = await fetch(
        "http://localhost:5000/api/record/createRecord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patient_id: formData.patient_id,
            doctor_id: formData.doctor_id,
            name: formData.record_name,
            summary: formData.summary,
            treatment_regimen: formData.treatment_regimen,
            date: formData.date,
            image_id: imageId,
          }),
          credentials: "include",
        }
      );

      if (!recordResponse.ok) {
        throw new Error("Failed to insert record data");
      }

      toast("Bệnh án đã được tạo thành công", {
        type: "success",
        position: "top-center",
      });
      setFormData({
        patient_id: patientId || "",
        patient_fullname: "",
        doctor_id: "",
        doctor_fullname: "",
        record_name: "",
        summary: "",
        treatment_regimen: "",
        date: "",
        image_url: "",
        imagename: "",
        result: "",
      });

      navigate(-1);
    } catch (error) {
      console.error(error);
      toast(`Đã xảy ra lỗi ${error.message}`, {
        type: "error",
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold mb-8">BỆNH ÁN</h1>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="patient_fullname"
          >
            Tên bệnh nhân
          </label>
          <input
            id="patient_fullname"
            type="text"
            value={formData.patient_fullname}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="doctor_fullname"
          >
            Tên bác sĩ
          </label>
          <input
            id="doctor_fullname"
            type="text"
            value={formData.doctor_fullname}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="record_name"
          >
            Tên bệnh án
          </label>
          <input
            id="record_name"
            type="text"
            value={formData.record_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Ngày khám
          </label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="summary"
          >
            Chẩn đoán
          </label>
          <textarea
            id="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Chẩn đoán bệnh..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="treatment_regimen"
          >
            Phác đồ điều trị
          </label>
          <textarea
            id="treatment_regimen"
            value={formData.treatment_regimen}
            onChange={handleChange}
            placeholder="Phác đồ điều trị..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[100px]"
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image_url"
          >
            Đường link tới ảnh chụp
          </label>
          <input
            id="image_url"
            type="text"
            value={formData.image_url}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imagename"
          >
            Tên ảnh chụp
          </label>
          <input
            id="imagename"
            type="text"
            value={formData.imagename}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="result"
          >
            Kết quả
          </label>
          <textarea
            id="result"
            value={formData.result}
            onChange={handleChange}
            placeholder="Kết quả..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordForm;
