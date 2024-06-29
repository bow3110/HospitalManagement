import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const MyRecord = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientRecords = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/patients/myrecords`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setPatient(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("An error occurred while fetching patient records");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientRecords();
  }, []);

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
      <h2 className="text-2xl font-bold mb-4">
        Hồ Sơ Bệnh Án - {patient.name}
      </h2>
      <div className="bg-white shadow-md rounded">
        {patient.records.map((record) => (
          <div
            key={record.id}
            className="flex justify-between items-center p-4 border-b"
          >
            <div className="flex-1">
              <div className="text-lg font-bold">{record.id}</div>
              <div className="text-sm">{record.date}</div>
              <div className="text-sm">{record.summary}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecord;
