const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Duyanh123000",
  database: "hospital_db",
});

module.exports = pool.promise();
