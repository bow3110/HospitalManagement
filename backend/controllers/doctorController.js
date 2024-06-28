const pool = require("../config/database");

exports.makeSchedule = async (req, res) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  if (userRole !== "doctor") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { patientId, date, time } = req.body;

  try {
    // insert appointment into database
    const [insertAppointmentRows] = await pool.query(
      "INSERT INTO schedule (patient_id, doctor_id, date, time, status) VALUES (?, ?, ?, ?, ?)",
      [patientId, userId, date, time, "unapproved"]
    );

    if (insertAppointmentRows.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to make appointment" });
    }

    res.status(201).json({ message: "Appointment created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
