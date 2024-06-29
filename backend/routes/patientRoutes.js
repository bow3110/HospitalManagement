const express = require("express");
const {
  getPatientData,
  signUp,
  getAllPatients,
} = require("../controllers/patientController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/data", verifyToken, authorizeRoles("doctor"), getPatientData);

router.get(
  "/getAllPatients",
  verifyToken,
  authorizeRoles("doctor"),
  getAllPatients
);

router.post("/signup", signUp);

module.exports = router;
