// src/components/PatientList/PatientList.jsx
import React, { useState } from "react";
import PatientCard from "./PatientCard";
import PatientDetailsModal from "../PatientDetailsModal/PatientDetailsModal";

const patientsData = [
  { id: "1", name: "Hoang Duy Anh" },
  { id: "2", name: "Hoang Thi Kieu Thuong" },
];

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const filteredPatients = patientsData.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            key={patient.id}
            id={patient.id}
            name={patient.name}
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
