const jwt = require("jsonwebtoken");
const pool = require("../config/database");

exports.getMyInfo = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  if (userRole == "patient") {
    try {
      const [myInfoRows] = await pool.query(
        "SELECT p.patient_id, p.fullname, p.phone_number, p.birthday, p.gender, p.city, p.address, p.health_card, u.username FROM patient p JOIN user u ON p.patient_id = u.id WHERE u.id = ?",
        [userId]
      );

      if (myInfoRows.length === 0) {
        return res.status(404).json({ message: "User info not found" });
      }
      res.status(200).json(myInfoRows[0]);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else if (userRole == "doctor") {
    try {
      const [myInfoRows] = await pool.query(
        "SELECT u.username, d.doctorid, d.fullname, d.birthday, d.gender, d.graduation_year, d.department_id, d.phone_number FROM doctor d JOIN user u ON d.doctorid = u.id WHERE u.id = ?",
        [userId]
      );

      if (myInfoRows.length === 0) {
        return res.status(404).json({ message: "User info not found" });
      }
      res.status(200).json(myInfoRows[0]);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

exports.updateMyInfo = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  const { phone_number, city, address, health_card } = req.body;
  if (userRole == "patient") {
    try {
      const [updateInfoRows] = await pool.query(
        "UPDATE patient SET phone_number = ?, city = ?, address = ?, health_card = ? WHERE patient_id = ?",
        [phone_number, city, address, health_card, userId]
      );

      if (updateInfoRows.affectedRows === 0) {
        return res.status(404).json({ message: "User info not found" });
      }
      res.status(200).json({ message: "User info updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  try {
    const [userRows] = await pool.query(
      "SELECT password FROM user WHERE id = ?",
      [userId]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userRows[0];
    if (user.password != oldPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const [updatePasswordRows] = await pool.query(
      "UPDATE user SET password = ? WHERE id = ?",
      [newPassword, userId]
    );

    if (updatePasswordRows.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password changed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
