import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";
import Services from "../pages/Services";
import PasswordChange from "../pages/Patients/PasswordChange";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import PatientList from "../components/PatientList/PatientList";
import PatientRecordsList from "../components/PatientRecordsList/PatientRecordsList";
import PatientRecord from "../components/PatientRecord/PatientRecord";
import RecordImage from "../components/RecordImage/RecordImage";
import PatientSignUp from "../pages/Patients/PatientSignUp";
import AppointmentForm from "../pages/Appointment/AppointmentForm";
import AppointmentTable from "../pages/Patients/AppointmentTable";
import Takelist from "../pages/Doctors/Takelist";
import PersonalInfoForm from "../pages/Patients/PersonalnfoForm";
import DoctorInfoForm from "../pages/Doctors/DoctorInfoForm";
import MyRecord from "../pages/MyRecord/MyRecord"; // Import the new component

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && role !== user.role) {
    return <Navigate to="/home" />;
  }

  return children;
};

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/doctors"
        element={
          <ProtectedRoute role="doctor">
            <Doctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/:id"
        element={
          <ProtectedRoute role="doctor">
            <DoctorDetails />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/passwordchange"
        element={
          <ProtectedRoute role="patient">
            <PasswordChange />
          </ProtectedRoute>
        }
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route
        path="/patients"
        element={
          <ProtectedRoute role="doctor">
            <PatientList />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<PatientSignUp />} />
      <Route
        path="/doctor/setappointment"
        element={
          <ProtectedRoute role="doctor">
            <AppointmentForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/appointmenttable"
        element={
          <ProtectedRoute role="patient">
            <AppointmentTable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/info"
        element={
          <ProtectedRoute role="patient">
            <PersonalInfoForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/info"
        element={
          <ProtectedRoute role="doctor">
            <DoctorInfoForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/takelist"
        element={
          <ProtectedRoute role="doctor">
            <Takelist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/records"
        element={
          <ProtectedRoute role="doctor">
            <PatientRecordsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/record/details"
        element={
          <ProtectedRoute role="doctor">
            <PatientRecord />
          </ProtectedRoute>
        }
      />
      <Route
        path="/record/images"
        element={
          <ProtectedRoute role="doctor">
            <RecordImage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myrecord"
        element={
          <ProtectedRoute role="patient">
            <MyRecord />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
