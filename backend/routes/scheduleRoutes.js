const express = require("express");

const { verifyToken, authorizeRoles } = require("../middleware/auth");
const { getSchedules } = require("../controllers/scheduleController");

const router = express.Router();

router.get(
  "/getSchedules",
  verifyToken,
  authorizeRoles("doctor"),
  getSchedules
);

module.exports = router;
