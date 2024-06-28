// src/layouts/Layout.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Routers from "../routes/Routers";
import DoctorSidebar from "../components/DoctorSidebar/DocSideBar";
import PatientSidebar from "../components/PatientSidebar/PtientSidebar";

import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const location = useLocation();
  const { user } = useAuth();

  const showSidebar =
    location.pathname.startsWith("/patients") ||
    location.pathname.startsWith("/records") ||
    location.pathname.startsWith("/record") ||
    location.pathname.startsWith("/patient") ||
    location.pathname.startsWith("/doctor");

  return (
    <>
      {showSidebar ? (
        <div className="flex">
          {user.role === "doctor" ? <DoctorSidebar /> : <PatientSidebar />}
          <main className="ml-64 flex-1 p-4">
            <Routers />
          </main>
        </div>
      ) : (
        <>
          <Header />
          <main>
            <Routers />
          </main>
        </>
      )}
    </>
  );
};

export default Layout;
