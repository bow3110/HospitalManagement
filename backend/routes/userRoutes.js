const express = require("express");

const {
  getMyInfo,
  updateMyInfo,
  changePassword,
} = require("../controllers/userController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/myinfo",
  verifyToken,
  authorizeRoles("patient", "doctor"),
  getMyInfo
);

router.post(
  "/update",
  verifyToken,
  authorizeRoles("patient", "doctor"),
  updateMyInfo
);

router.post("/change-password", verifyToken, changePassword);

module.exports = router;
