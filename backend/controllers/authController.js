const jwt = require("jsonwebtoken");
const pool = require("../config/database");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT id, username, password, role FROM user WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: "Logged in successfully",
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
