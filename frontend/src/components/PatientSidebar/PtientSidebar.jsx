// src/components/PatientSidebar/PatientSidebar.jsx
import React from "react";
import SideBarItem from "../SideBarItem";

const PatientSidebar = () => {
  const patientSidebarItems = [
    { srcImg: "/home.svg", alt: "home", text: "Trang chủ", link: "/" },
    {
      srcImg: "/calendar.svg",
      alt: "calendar",
      text: "Lịch hẹn của tôi",
      link: "/patient/appointmenttable",
    },
    {
      srcImg: "/user.svg",
      alt: "info",
      text: "Thông tin cá nhân",
      link: "/patient/info",
    },
    {
      srcImg: "/search.svg",
      alt: "records",
      text: "Bệnh án của tôi",
      link: "/patients/myrecords",
    },
  ];

  return (
    <div className="w-64 h-full fixed top-0 left-0 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-[50px]">Quản lý cá nhân</h2>
        <div className="flex flex-col gap-5">
          {patientSidebarItems.map((item, index) => (
            <SideBarItem
              key={index}
              srcImg={item.srcImg}
              alt={item.alt}
              text={item.text}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientSidebar;
