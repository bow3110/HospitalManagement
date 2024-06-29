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
    console.log(rows[0]);
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
    console.log(rows[0]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
