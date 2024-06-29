const express = require("express");
const {
  getPatientData,
  signUp,
  getAllPatients,
  getPatientRecords,
} = require("../controllers/patientController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/data", verifyToken, authorizeRoles("doctor"), getPatientData);
router.post("/signup", signUp);
router.get(
  "/getAllPatients",
  verifyToken,
  authorizeRoles("doctor"),
  getAllPatients
);
router.get(
  "/records",
  verifyToken,
  authorizeRoles("doctor"),
  getPatientRecords
);

module.exports = router;
