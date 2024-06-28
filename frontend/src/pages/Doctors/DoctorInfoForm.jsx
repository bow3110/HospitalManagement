import React, { useState } from "react";

const DoctorInfoForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    birthday: "",
    gender: "male",
    city: "",
    address: "",
    graduatedYear: "",
    major: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
                placeholder="Placeholder"
              />
              <button className="ml-2 p-2 bg-black text-white rounded-lg">
                Đổi mật khẩu
              </button>
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
              Tỉnh/ Thành phố
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="Placeholder"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Năm ra trường
            </label>
            <input
              type="text"
              name=" graduatedYear"
              value={formData.graduatedYear}
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
              name=" major"
              value={formData.major}
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
                />
                <span className="ml-2">Nữ</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-black text-white rounded-lg">
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoForm;
