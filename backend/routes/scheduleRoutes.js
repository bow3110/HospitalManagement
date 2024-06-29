const express = require("express");

const { verifyToken, authorizeRoles } = require("../middleware/auth");
const {
  getSchedules,
  getSchedulesPatient,
  modifySchedule,
} = require("../controllers/scheduleController");

const router = express.Router();

router.get(
  "/getSchedules",
  verifyToken,
  authorizeRoles("doctor"),
  getSchedules
);

router.get(
  "/getSchedulesPatient",
  verifyToken,
  authorizeRoles("patient"),
  getSchedulesPatient
);

router.post(
  "/modifySchedule",
  verifyToken,
  authorizeRoles("doctor", "patient"),
  modifySchedule
);

module.exports = router;
