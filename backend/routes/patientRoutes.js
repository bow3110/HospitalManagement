const express = require("express");
const {
  getPatientRecords,
  getMyRecords,
  updatePatientInfo,
} = require("../controllers/patientController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.get(
//   "/records",
//   verifyToken,
//   authorizeRoles("doctor"),
//   getPatientRecords
// );
// router.get("/myrecords", verifyToken, authorizeRoles("patient"), getMyRecords);
// router.post(
//   "/update",
//   verifyToken,
//   authorizeRoles("patient"),
//   updatePatientInfo
// );

module.exports = router;
