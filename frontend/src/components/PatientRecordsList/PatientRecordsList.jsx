import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("vi-VN", options);
};

const PatientRecordsList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const patientId = queryParams.get("patientId");
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorNames, setDoctorNames] = useState({});

  useEffect(() => {
    const fetchPatientRecords = async () => {
      try {
        const patientResponse = await fetch(
          `http://localhost:5000/api/patient/data?patientID=${patientId}`,
          {
            credentials: "include",
          }
        );

        if (!patientResponse.ok) {
          const errorData = await patientResponse.json();
          console.error("Error fetching patient info:", errorData.message);
          return;
        }

        const patientData = await patientResponse.json();
        setPatient(patientData);

        const recordsResponse = await fetch(
          `http://localhost:5000/api/patient/records?patientId=${patientId}`,
          {
            credentials: "include",
          }
        );

        const recordsData = await recordsResponse.json();
        if (recordsResponse.ok) {
          setRecords(recordsData);
          const doctorIds = recordsData.map((record) => record.doctor_id);
          const uniqueDoctorIds = [...new Set(doctorIds)];
          const doctorPromises = uniqueDoctorIds.map((doctorId) =>
            fetch(
              `http://localhost:5000/api/doctor/data?doctorId=${doctorId}`,
              {
                credentials: "include",
              }
            ).then((res) => res.json())
          );

          const doctorsData = await Promise.all(doctorPromises);

          const doctorNamesMap = {};
          doctorsData.forEach((doctor) => {
            doctorNamesMap[doctor.doctorid] = doctor.fullname;
          });
          setDoctorNames(doctorNamesMap);
        } else {
          setError(recordsData.message);
        }
      } catch (error) {
        console.log(error);
        setError("An error occurred while fetching patient records");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientRecords();
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md relative">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-black text-white px-3 py-1 rounded"
        >
          &larr; Quay lại
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">
        Hồ Sơ Bệnh Án - {patient.fullname}
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm bệnh án"
          className="mb-4 p-2 border rounded w-full"
        />
      </div>
      <div className="bg-white shadow-md rounded">
        {records.map((record) => (
          <div
            key={record.id}
            className="flex justify-between items-center p-4 border-b"
          >
            <div className="flex-1">
              <div className="text-lg font-bold">
                Mã số bệnh án: {record.id}
              </div>
              <div className="text-sm">
                Thời gian điều trị: {formatDate(record.date)}
              </div>
              <div className="text-sm">
                Bác sĩ điều trị: {doctorNames[record.doctor_id]}
              </div>
              <div className="text-sm">Tóm tắt: {record.summary}</div>
            </div>
            <div className="flex space-x-2">
              <Link to={`/record/details?recordId=${record.id}`}>
                <button className="bg-black text-white px-3 py-1 rounded">
                  Xem bệnh án
                </button>
              </Link>
              <Link to={`/record/images?recordId=${record.id}`}>
                <button className="bg-black text-white px-3 py-1 rounded">
                  Xem hình ảnh
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientRecordsList;
