const pool = require("../config/database");

exports.getRecordById = async (req, res) => {
  const recordId = req.query.recordId;

  try {
    const [rows] = await pool.query("SELECT * FROM record WHERE id = ?", [
      recordId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRecordImage = async (req, res) => {
  const recordId = req.query.recordId;

  try {
    const [rows] = await pool.query(
      "SELECT img.imagename, img.result, img.date, img.image_url, r.patient_id, r.doctor_id FROM record r JOIN image img ON r.image_id = img.id WHERE r.id = ?",
      [recordId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Image for requested record not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createRecordImage = async (req, res) => {
  const { date, image_url, imagename, result } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO image (imagename, result, date, image_url) VALUES (?, ?, ?, ?)",
      [imagename, result, date, image_url]
    );

    if (rows.affectedRows === 0) {
      return res.status(400).json({ message: "Failed to create image" });
    }
    res
      .status(201)
      .json({ message: "Image created successfully", imageId: rows.insertId });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createRecord = async (req, res) => {
  const {
    name,
    patient_id,
    doctor_id,
    summary,
    treatment_regimen,
    date,
    image_id,
  } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO record (name, patient_id, doctor_id, summary, treatment_regimen, date, image_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, patient_id, doctor_id, summary, treatment_regimen, date, image_id]
    );

    if (rows.affectedRows === 0) {
      return res.status(400).json({ message: "Failed to create record" });
    }
    res.status(201).json({ message: "Record created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
