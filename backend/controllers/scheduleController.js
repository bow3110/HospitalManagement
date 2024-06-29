const pool = require("../config/database");

exports.getSchedules = async (req, res) => {
  const doctorId = req.query.doctorId;
  console.log(doctorId);
  try {
    const [rows] = await pool.query(
      "SELECT * FROM schedule WHERE doctor_id = ?",
      [doctorId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Schedule not found for doctor id ${doctorId}` });
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
