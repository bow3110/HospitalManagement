const pool = require("../config/database");

exports.getPatientData = async (req, res) => {
  const patientId = req.query.patientID;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM patient WHERE patient_id = ?",
      [patientId]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPatientRecords = async (req, res) => {
  const patientId = req.query.patientId;

  try {
    const [rows] = await pool.query(
      "SELECT p.id, p.name, r.id AS record_id, r.date, r.summary, r.image_url FROM patient p JOIN record r ON p.id = r.patient_id WHERE p.id = ?",
      [patientId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patient = {
      id: rows[0].id,
      name: rows[0].name,
      record: rows.map((row) => ({
        id: row.record_id,
        date: row.date,
        summary: row.summary,
        imageUrl: row.image_url,
      })),
    };

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyRecords = async (req, res) => {
  const userId = req.user.id;

  try {
    const [patientRows] = await pool.query(
      "SELECT p.id, p.name, p.phone, p.birthday, p.gender, p.city, p.address, p.health_card FROM patient p JOIN user u ON p.id = u.id WHERE u.id = ?",
      [userId]
    );

    if (patientRows.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientId = patientRows[0].id;
    const [recordRows] = await pool.query(
      "SELECT id AS record_id, date, summary, image_url FROM record WHERE patient_id = ?",
      [patientId]
    );

    const patient = {
      id: patientRows[0].id,
      name: patientRows[0].name,
      phone: patientRows[0].phone,
      birthday: patientRows[0].birthday,
      gender: patientRows[0].gender,
      city: patientRows[0].city,
      address: patientRows[0].address,
      healthCard: patientRows[0].health_card,
      record: recordRows.map((row) => ({
        id: row.record_id,
        date: row.date,
        summary: row.summary,
        imageUrl: row.image_url,
      })),
    };

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.signUp = async (req, res) => {
  const {
    username,
    password,
    fullName,
    phoneNumber,
    dateOfBirth,
    healthCardNum,
    gender,
    city,
    address,
  } = req.body;
  try {
    console.log(req.body);
    const [userRows] = await pool.query(
      "SELECT * FROM user WHERE username = ?",
      [username]
    );

    if (userRows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const [insertUserRows] = await pool.query(
      "INSERT INTO user (username, password, role) VALUES (?, ?, ?)",
      [username, password, "patient"]
    );

    // get inserted user id
    console.log(insertUserRows.insertId);
    const userId = insertUserRows.insertId;

    const [insertPatientRows] = await pool.query(
      "INSERT INTO patient (patient_id, fullname, birthday, gender, city, address, phone_number, health_card) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        fullName,
        dateOfBirth,
        gender,
        city,
        address,
        phoneNumber,
        healthCardNum,
      ]
    );

    if (insertPatientRows.affectedRows === 0) {
      return res
        .status(500)
        .json({ message: "Please check your details again" });
    }

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
