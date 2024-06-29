const express = require("express");
const {
  getRecordById,
  getRecordImage,
} = require("../controllers/recordController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/details",
  verifyToken,
  authorizeRoles("doctor", "patient"),
  getRecordById
);

router.get(
  "/image",
  verifyToken,
  authorizeRoles("doctor", "patient"),
  getRecordImage
);

module.exports = router;
