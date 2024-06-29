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
