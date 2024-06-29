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
      [patientId, userId, date, time, "pending"]
    );

    if (insertAppointmentRows.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to make appointment" });
    }

    res.status(201).json({ message: "Appointment created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDoctorById = async (req, res) => {
  const doctorId = req.query.doctorId;

  try {
    const [rows] = await pool.query("SELECT * FROM doctor WHERE doctorid = ?", [
      doctorId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const [departments] = await pool.query(
      "SELECT dp.name FROM department dp JOIN doctor d on dp.id = d.department_id WHERE d.doctorid = ?",
      [doctorId]
    );

    rows[0].department_name = departments[0];

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
