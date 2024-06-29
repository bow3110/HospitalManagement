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

exports.getSchedulesPatient = async (req, res) => {
  const patientId = req.query.patientId;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM schedule WHERE patient_id = ?",
      [patientId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: `Schedule not found for patient id ${patientId}` });
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.modifySchedule = async (req, res) => {
  const scheduleId = req.query.scheduleId;
  const { status } = req.body;

  try {
    const [rows] = await pool.query(
      "UPDATE schedule SET status = ? WHERE id = ?",
      [status, scheduleId]
    );

    if (rows.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to update schedule" });
    }

    res.status(200).json({ message: "Schedule updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
