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
      { username: "bacsiA", password: "matkhauA", role: "doctor" },
      { username: "bacsiB", password: "matkhauB", role: "doctor" },
      { username: "benhnhanA", password: "matkhauC", role: "patient" },
      { username: "benhnhanB", password: "matkhauD", role: "patient" },
      { username: "benhnhanC", password: "matkhauE", role: "patient" },
      { username: "benhnhanD", password: "matkhauF", role: "patient" },
      { username: "benhnhanE", password: "matkhauG", role: "patient" },
    ];
    for (const user of users) {
      await connection.query(
        "INSERT INTO user (username, password, role) VALUES (?, ?, ?)",
        [user.username, user.password, user.role]
      );
    }

    // Insert data into department table
    const departments = [
      { name: "Khoa Chấn thương chỉnh hình" },
      { name: "Khoa Da liễu" },
    ];
    for (const department of departments) {
      await connection.query("INSERT INTO department (name) VALUES (?)", [
        department.name,
      ]);
    }

    // Insert data into doctor table
    const doctors = [
      {
        doctorid: 1,
        fullname: "Lý Thị A",
        birthday: "1975-03-10",
        gender: "female",
        graduation_year: 1999,
        department_id: 1,
        phone_number: "1010101010",
      },
      {
        doctorid: 2,
        fullname: "Đinh Văn C",
        birthday: "1982-08-20",
        gender: "male",
        graduation_year: 2006,
        department_id: 2,
        phone_number: "2020202020",
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
        fullname: "Trần Văn B",
        birthday: "1995-06-12",
        gender: "male",
        city: "Saigon",
        address: "789 Birch St",
        phone_number: "3030303030",
        health_card: "HC67890",
      },
      {
        patient_id: 4,
        fullname: "Phạm Thị A",
        birthday: "1991-11-04",
        gender: "female",
        city: "Saigon",
        address: "123 Maple St",
        phone_number: "4040404040",
        health_card: "HC78901",
      },
      {
        patient_id: 5,
        fullname: "Hoàng Văn C",
        birthday: "1987-02-25",
        gender: "male",
        city: "Saigon",
        address: "456 Cedar St",
        phone_number: "5050505050",
        health_card: "HC89012",
      },
      {
        patient_id: 6,
        fullname: "Nguyễn Thị B",
        birthday: "1993-09-15",
        gender: "female",
        city: "Saigon",
        address: "321 Walnut St",
        phone_number: "6060606060",
        health_card: "HC90123",
      },
      {
        patient_id: 7,
        fullname: "Nguyễn Văn A",
        birthday: "1998-05-05",
        gender: "male",
        city: "Saigon",
        address: "654 Aspen St",
        phone_number: "7070707070",
        health_card: "HC01234",
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
      {
        patient_id: 3,
        doctor_id: 1,
        date: "2024-02-10",
        time: "10:00 AM",
        status: "approved",
      },
      {
        patient_id: 4,
        doctor_id: 1,
        date: "2024-02-11",
        time: "11:00 AM",
        status: "approved",
      },
      {
        patient_id: 5,
        doctor_id: 2,
        date: "2024-02-12",
        time: "01:00 PM",
        status: "pending",
      },
      {
        patient_id: 6,
        doctor_id: 2,
        date: "2024-02-13",
        time: "02:00 PM",
        status: "unapproved",
      },
      {
        patient_id: 7,
        doctor_id: 1,
        date: "2024-02-14",
        time: "03:00 PM",
        status: "approved",
      },
    ];
    for (const schedule of schedules) {
      await connection.query(
        "INSERT INTO schedule (patient_id, doctor_id, date, time, status) VALUES (?, ?, ?, ?, ?)",
        [
          schedule.patient_id,
          schedule.doctor_id,
          schedule.date,
          schedule.time,
          schedule.status,
        ]
      );
    }

    // Insert data into image table
    const images = [
      {
        imagename: "MRI",
        result: "Bình thường",
        date: "2024-02-10",
        image_url: "http://example.com/mri.jpg",
      },
      {
        imagename: "Siêu âm",
        result: "Bất thường",
        date: "2024-02-11",
        image_url: "http://example.com/ultrasound.jpg",
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
        name: "Hồ sơ y tế A",
        patient_id: 3,
        doctor_id: 1,
        summary: "Kiểm tra định kỳ",
        treatment_regimen: "Không",
        date: "2024-02-10",
        image_id: 1,
      },
      {
        name: "Hồ sơ y tế B",
        patient_id: 4,
        doctor_id: 1,
        summary: "Triệu chứng cảm lạnh",
        treatment_regimen: "Nghỉ ngơi và uống nước",
        date: "2024-02-11",
        image_id: 1,
      },
      {
        name: "Hồ sơ y tế C",
        patient_id: 5,
        doctor_id: 2,
        summary: "Đau đầu",
        treatment_regimen: "Thuốc giảm đau",
        date: "2024-02-12",
        image_id: 2,
      },
      {
        name: "Hồ sơ y tế D",
        patient_id: 6,
        doctor_id: 2,
        summary: "Đau bụng",
        treatment_regimen: "Thuốc kháng axit",
        date: "2024-02-13",
        image_id: 2,
      },
      {
        name: "Hồ sơ y tế E",
        patient_id: 7,
        doctor_id: 1,
        summary: "Cúm",
        treatment_regimen: "Nghỉ ngơi và uống nước",
        date: "2024-02-14",
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
    console.log("Tất cả dữ liệu giả đã được chèn thành công!");
  } catch (error) {
    await connection.rollback();
    console.error("Lỗi khi chèn dữ liệu giả:", error);
  } finally {
    connection.release();
  }
};

insertMockData();
