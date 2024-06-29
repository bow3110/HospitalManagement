// src/components/PatientList/PatientList.jsx
import React, { useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import PatientDetailsModal from "../PatientDetailsModal/PatientDetailsModal";

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const [allPatients, setAllPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/patient/getAllPatients",
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          console.error("Failed to fetch patients");
          return;
        }

        const data = await response.json();
        console.log(data);
        setAllPatients(data);
      } catch (error) {
        console.log(error);
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = allPatients.filter((patient) =>
    patient.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowDetails = (id) => {
    setSelectedPatientId(id);
  };

  const handleCloseModal = () => {
    setSelectedPatientId(null);
  };

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Tìm kiếm bệnh nhân"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="bg-white shadow-md rounded">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.patient_id}
            id={patient.patient_id}
            name={patient.fullname}
            onShowDetails={handleShowDetails}
          />
        ))}
      </div>
      {selectedPatientId && (
        <PatientDetailsModal
          patientId={selectedPatientId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PatientList;
