const express = require("express");
const {
  updatePatientInfo,
  makeSchedule,
  getDoctorById,
} = require("../controllers/doctorController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/makeSchedule",
  verifyToken,
  authorizeRoles("doctor"),
  makeSchedule
);

router.get("/data", verifyToken, getDoctorById);

module.exports = router;
