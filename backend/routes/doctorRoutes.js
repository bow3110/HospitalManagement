const express = require("express");
const {
  updatePatientInfo,
  makeSchedule,
} = require("../controllers/doctorController");
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

router.post(
  "/makeSchedule",
  verifyToken,
  authorizeRoles("doctor"),
  makeSchedule
);

module.exports = router;
