import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import avatarIcon from "../../assets/images/avatar-icon.png";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Trang chủ",
  },
  {
    path: "/info",
    display: "Thông tin cá nhân",
  },
  {
    path: "/calendar",
    display: "Lịch hẹn của tôi",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* logo */}
          <div>
            <img src={logo} alt="" />
          </div>
          {/* menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primacyColor "
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* nav right */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <img
                    src={avatarIcon}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-xl">{user.username}</span>
                </div>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-20">
                    {user.role === "patient" ? (
                      <>
                        <Link
                          to="/patient/info"
                          className="block px-2 py-1 text-sm text-gray-800 hover:bg-gray-100"
                          onClick={() => setShowDropdown(false)}
                        >
                          Thông tin cá nhân
                        </Link>
                        <Link
                          to="/patient/info"
                          className="block px-2 py-1 text-sm text-gray-800 hover:bg-gray-100"
                          onClick={() => setShowDropdown(false)}
                        >
                          Quản lý thông tin
                        </Link>
                      </>
                    ) : user.role === "doctor" ? (
                      <>
                        <Link
                          to="/patients"
                          className="block px-2 py-1 text-sm text-gray-800 hover:bg-gray-100"
                          onClick={() => setShowDropdown(false)}
                        >
                          Quản lý bệnh nhân
                        </Link>
                      </>
                    ) : null}
                    <button
                      className="block w-full text-left px-2 py-1 text-sm text-gray-800 hover:bg-gray-100"
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-row">
                <Link to="/login">
                  <button className=" bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] mr-[5px]">
                    Đăng nhập
                  </button>
                </Link>

                <Link to="/signup">
                  <button className=" bg-slate-400 py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] ">
                    Đăng ký bệnh nhân
                  </button>
                </Link>
              </div>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
export const FaqItem = () => {
  return <div>FaqItem</div>;
};
