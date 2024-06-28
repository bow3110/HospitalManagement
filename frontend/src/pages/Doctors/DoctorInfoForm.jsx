import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PersonalInfoForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    birthday: "",
    gender: "male",
    department: "",
    graduation_year: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/myinfo", {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          console.log("Fetched patient info:", data);
          setFormData({
            username: data.username || "",
            name: data.fullname || "",
            phone: data.phone_number || "",
            birthday: data.birthday
              ? new Date(data.birthday).toISOString().split("T")[0]
              : "",
            gender: data.gender || "male",
            city: data.city || "",
            department: data.department_name || "",
            graduation_year: data.graduation_year || "",
          });
        } else {
          console.error("Error fetching patient info:", data.message);
        }
      } catch (error) {
        console.error("Error fetching patient info:", error);
      }
    };

    fetchUserInfo();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value !== undefined ? value : "",
    }));
  };

  const handleUpdate = async () => {
    try {
      console.log("Updating patient info with data:", formData);

      const response = await fetch("http://localhost:5000/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          phone_number: formData.phone,
          department_name: formData.department,
          graduation_year: formData.graduation_year,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
        console.error("Error updating patient info:", result);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error("Error updating patient info:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          THÔNG TIN CÁ NHÂN
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tài khoản
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="Placeholder"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <div className="flex">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-lg w-full"
                placeholder="******"
                disabled
              />
              <Link to="/passwordchange">
                <button className="ml-2 p-2 bg-black text-white rounded-lg">
                  Đổi mật khẩu
                </button>
              </Link>
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Họ và Tên
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="Placeholder"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số Điện Thoại
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="Placeholder"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chuyên ngành
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="Placeholder"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ngày sinh
            </label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="Placeholder"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Năm ra trường
            </label>
            <input
              type="text"
              name="graduation_year"
              value={formData.graduation_year}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="Placeholder"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giới tính
            </label>
            <div className="mt-1 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="form-radio"
                  disabled
                />
                <span className="ml-2">Nam</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="form-radio"
                  disabled
                />
                <span className="ml-2">Nữ</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
