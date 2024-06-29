const express = require("express");
const { getRecordById } = require("../controllers/recordController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/details",
  verifyToken,
  authorizeRoles("doctor", "patient"),
  getRecordById
);

module.exports = router;
