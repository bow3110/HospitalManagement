const express = require("express");
const {
  getRecordById,
  getRecordImage,
  createRecordImage,
  createRecord,
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

router.post(
  "/createRecordImage",
  verifyToken,
  authorizeRoles("doctor"),
  createRecordImage
);
router.post(
  "/createRecord",
  verifyToken,
  authorizeRoles("doctor"),
  createRecord
);

module.exports = router;
