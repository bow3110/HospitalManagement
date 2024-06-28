// src/components/PatientCard/PatientCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const PatientCard = ({ id, name, onShowDetails }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex-1">
        <div className="text-lg font-bold">{name}</div>
        <div className="text-sm">MSBN: {id}</div>
      </div>
      <div className="flex space-x-2">
        <Link to={`/records?patientId=${id}`}>
          <button className="bg-black text-white px-3 py-1 rounded">
            Danh sách bệnh án
          </button>
        </Link>
        <button
          onClick={() => onShowDetails(id)}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Thông tin bệnh nhân
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
