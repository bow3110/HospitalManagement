// src/components/LeftSidebar/LeftSidebar.jsx
import React from "react";
import SideBarItem from "./SideBarItem";

const LeftSidebar = () => {
  const LeftSidebarItems = [
    { srcImg: "/home.svg", alt: "home", text: "Trang chủ", link: "/" },
    {
      srcImg: "/search.svg",
      alt: "search",
      text: "Tìm kiếm bệnh nhân",
      link: "/patients",
    },
    {
      srcImg: "/calendar.svg",
      alt: "calendar",
      text: "Hẹn lịch khám",
      link: "/doctor/setappointment",
    },
  ];
  return (
    <div className="w-64 h-full fixed top-0 left-0 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-[50px]">Quản lý bệnh nhân</h2>
        <div className="flex flex-col gap-5">
          {LeftSidebarItems.map((item, index) => (
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

export default LeftSidebar;
