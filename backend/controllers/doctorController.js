const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "hospital_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.get("/doctor/:id", (req, res) => {
  const doctorId = req.params.id;
  db.query(
    "SELECT * FROM doctor WHERE doctorid = ?",
    [doctorId],
    (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});

app.put("/doctor/:id", (req, res) => {
  const doctorId = req.params.id;
  const doctorData = req.body;
  db.query(
    "UPDATE doctor SET fullname = ?, birthday = ?, gender = ?, graduation_year = ?, department_id = ?, phone_number = ? WHERE doctorid = ?",
    [
      doctorData.fullname,
      doctorData.birthday,
      doctorData.gender,
      doctorData.graduation_year,
      doctorData.department_id,
      doctorData.phone_number,
      doctorId,
    ],
    (err, result) => {
      if (err) throw err;
      res.send({ message: "Doctor updated successfully" });
    }
  );
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
