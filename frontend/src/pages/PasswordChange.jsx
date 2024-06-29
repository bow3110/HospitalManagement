import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordChange = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast("Mật khẩu mới không khớp", {
        type: "error",
        position: "top-center",
      });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast("Mật khẩu đã được thay đổi", {
          type: "success",
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/home");
        }, 2000); // Wait for 2 seconds before navigating
      } else {
        toast(result.message, {
          type: "error",
          position: "top-center",
        });
      }
    } catch (error) {
      toast("An error occurred. Please try again later.", {
        type: "error",
        position: "top-center",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        THAY ĐỔI MẬT KHẨU
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Mật khẩu cũ
        </label>
        <input
          type="password"
          placeholder="Mật khẩu cũ"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Mật khẩu mới
        </label>
        <input
          type="password"
          placeholder="Mật khẩu mới"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nhập lại mật khẩu mới
        </label>
        <input
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdate}
        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Cập nhật
      </button>
      <ToastContainer />
    </div>
  );
};

export default PasswordChange;
