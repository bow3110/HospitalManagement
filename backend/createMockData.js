const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "hospital_db",
});

const insertMockData = async () => {
  const connection = await pool.promise().getConnection();

  try {
    await connection.beginTransaction();

    // Insert data into user table
    const users = [
      { username: "doctor1", password: "password1", role: "doctor" },
      { username: "doctor2", password: "password2", role: "doctor" },
      { username: "patient1", password: "password3", role: "patient" },
      { username: "patient2", password: "password4", role: "patient" },
      { username: "patient3", password: "password5", role: "patient" },
      { username: "patient4", password: "password6", role: "patient" },
      { username: "patient5", password: "password7", role: "patient" },
    ];
    for (const user of users) {
      await connection.query(
        "INSERT INTO user (username, password, role) VALUES (?, ?, ?)",
        [user.username, user.password, user.role]
      );
    }

    // Insert data into department table
    const departments = [{ name: "Cardiology" }, { name: "Neurology" }];
    for (const department of departments) {
      await connection.query("INSERT INTO department (name) VALUES (?)", [
        department.name,
      ]);
    }

    // Insert data into doctor table
    const doctors = [
      {
        doctorid: 1,
        fullname: "Dr. John Doe",
        birthday: "1980-01-01",
        gender: "male",
        graduation_year: 2004,
        department_id: 1,
        phone_number: "123456789",
      },
      {
        doctorid: 2,
        fullname: "Dr. Jane Smith",
        birthday: "1985-05-15",
        gender: "female",
        graduation_year: 2008,
        department_id: 2,
        phone_number: "987654321",
      },
    ];
    for (const doctor of doctors) {
      await connection.query(
        "INSERT INTO doctor (doctorid, fullname, birthday, gender, graduation_year, department_id, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          doctor.doctorid,
          doctor.fullname,
          doctor.birthday,
          doctor.gender,
          doctor.graduation_year,
          doctor.department_id,
          doctor.phone_number,
        ]
      );
    }

    // Insert data into patient table
    const patients = [
      {
        patient_id: 3,
        fullname: "Jane Doe",
        birthday: "1990-01-01",
        gender: "female",
        city: "Hanoi",
        address: "123 Main St",
        phone_number: "987654321",
        health_card: "HC12345",
      },
      {
        patient_id: 4,
        fullname: "John Smith",
        birthday: "1992-02-02",
        gender: "male",
        city: "Hanoi",
        address: "456 Elm St",
        phone_number: "123456789",
        health_card: "HC23456",
      },
      {
        patient_id: 5,
        fullname: "Alice Johnson",
        birthday: "1995-03-03",
        gender: "female",
        city: "Hanoi",
        address: "789 Oak St",
        phone_number: "234567890",
        health_card: "HC34567",
      },
      {
        patient_id: 6,
        fullname: "Bob Brown",
        birthday: "1988-04-04",
        gender: "male",
        city: "Hanoi",
        address: "321 Pine St",
        phone_number: "345678901",
        health_card: "HC45678",
      },
      {
        patient_id: 7,
        fullname: "Carol White",
        birthday: "1993-05-05",
        gender: "female",
        city: "Hanoi",
        address: "654 Cedar St",
        phone_number: "456789012",
        health_card: "HC56789",
      },
    ];
    for (const patient of patients) {
      await connection.query(
        "INSERT INTO patient (patient_id, fullname, birthday, gender, city, address, phone_number, health_card) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          patient.patient_id,
          patient.fullname,
          patient.birthday,
          patient.gender,
          patient.city,
          patient.address,
          patient.phone_number,
          patient.health_card,
        ]
      );
    }

    // Insert data into schedule table
    const schedules = [
      { user_id: 3, doctor_id: 1, date: "2024-01-01", status: "approved" },
      { user_id: 4, doctor_id: 1, date: "2024-01-02", status: "approved" },
      { user_id: 5, doctor_id: 2, date: "2024-01-03", status: "approved" },
      { user_id: 6, doctor_id: 2, date: "2024-01-04", status: "unapproved" },
      { user_id: 7, doctor_id: 1, date: "2024-01-05", status: "approved" },
    ];
    for (const schedule of schedules) {
      await connection.query(
        "INSERT INTO schedule (user_id, doctor_id, date, status) VALUES (?, ?, ?, ?)",
        [schedule.user_id, schedule.doctor_id, schedule.date, schedule.status]
      );
    }

    // Insert data into image table
    const images = [
      {
        imagename: "X-Ray",
        result: "Normal",
        date: "2024-01-01",
        image_url: "http://example.com/xray.jpg",
      },
      {
        imagename: "CT Scan",
        result: "Abnormal",
        date: "2024-01-02",
        image_url: "http://example.com/ctscan.jpg",
      },
    ];
    for (const image of images) {
      await connection.query(
        "INSERT INTO image (imagename, result, date, image_url) VALUES (?, ?, ?, ?)",
        [image.imagename, image.result, image.date, image.image_url]
      );
    }

    // Insert data into record table
    const records = [
      {
        name: "Medical Record 1",
        patient_id: 3,
        doctor_id: 1,
        summary: "Healthy",
        treatment_regimen: "None",
        date: "2024-01-01",
        image_id: 1,
      },
      {
        name: "Medical Record 2",
        patient_id: 4,
        doctor_id: 1,
        summary: "Minor Cold",
        treatment_regimen: "Rest",
        date: "2024-01-02",
        image_id: 1,
      },
      {
        name: "Medical Record 3",
        patient_id: 5,
        doctor_id: 2,
        summary: "Headache",
        treatment_regimen: "Painkillers",
        date: "2024-01-03",
        image_id: 2,
      },
      {
        name: "Medical Record 4",
        patient_id: 6,
        doctor_id: 2,
        summary: "Stomach Pain",
        treatment_regimen: "Antacids",
        date: "2024-01-04",
        image_id: 2,
      },
      {
        name: "Medical Record 5",
        patient_id: 7,
        doctor_id: 1,
        summary: "Flu",
        treatment_regimen: "Rest and fluids",
        date: "2024-01-05",
        image_id: 1,
      },
    ];
    for (const record of records) {
      await connection.query(
        "INSERT INTO record (name, patient_id, doctor_id, summary, treatment_regimen, date, image_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          record.name,
          record.patient_id,
          record.doctor_id,
          record.summary,
          record.treatment_regimen,
          record.date,
          record.image_id,
        ]
      );
    }

    await connection.commit();
    console.log("All mock data inserted successfully!");
  } catch (error) {
    await connection.rollback();
    console.error("Error inserting mock data:", error);
  } finally {
    connection.release();
  }
};

insertMockData();
