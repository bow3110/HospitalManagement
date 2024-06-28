const express = require("express");
const {
  getPatientRecords,
  getMyRecords,
  updatePatientInfo,
  getPatientData,
} = require("../controllers/patientController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/data", verifyToken, authorizeRoles("doctor"), getPatientData);

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
